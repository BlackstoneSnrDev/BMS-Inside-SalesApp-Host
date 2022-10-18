import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, from } from 'rxjs'
import { UsersService } from './auth.service';
import {
    AngularFirestore,
    AngularFirestoreDocument,
  } from '@angular/fire/compat/firestore'; 
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { arrayUnion, arrayRemove, Timestamp, DocumentReference, DocumentData, deleteField } from '@angular/fire/firestore'
import { RandomId } from './services.randomId';
import firebase from 'firebase/compat/app';

let len = 12;
let pattern = 'aA0';


@Injectable({

  providedIn: 'root'

})

export class DataService {

  public navbarDataURL: string;
  public initialTemplateCustomers: string;

  public thURL: string;
  public tdURL: string;

  public dbObjKey: any;
  public userInfo: any;
  public currentUid: string;

  constructor(

    private _http: HttpClient,
    private afs: AngularFirestore,
    private usersService: UsersService,
    private fns: AngularFireFunctions,

  ){

    this.navbarDataURL = "../../assets/json/navbar-data.json";
    this.initialTemplateCustomers = "../../assets/json/initialTemplateCustomers.json";

    this.thURL = "../../assets/json/thData.json";
    this.tdURL = "../../assets/json/tdData.json";

    this.usersService.userInfo.subscribe(
        (userInfo) => (this.userInfo = userInfo, console.log(userInfo))
      );
    this.currentUid = this.userInfo.uid;


  }

  getMyTHData(): Observable<any> {
    return this._http.get(this.thURL);
  }
  getMyTDData(): Observable<any> {
    return this._http.get(this.tdURL);
  }

createNewTenant(email: any, password: any, tenantName: any) {

    console.log(this.userInfo.uid);

//  IN DATABASE
//    create user in firebase auth
    var config = {
        apiKey: "AIzaSyBWe_LKvR_EOjbu6mjcDJKFYjohoabNyAM",
        authDomain: "insidesalesapi.firebaseapp.com",
        projectId: "insidesalesapi",
    };
    var secondaryApp = firebase.initializeApp(config, "Secondary");
    const promise = secondaryApp.auth().createUserWithEmailAndPassword(email, password).then((employee: any) => {
        if (employee) {
            employee.user.updateProfile({
                displayName: 'testy'
            })
        }
        let newUid = secondaryApp?.auth()?.currentUser?.uid;
        console.log(newUid);
        secondaryApp.auth().signOut();
//    create tenant 
//    add admin uid to tenants uids array
        this.afs.collection('Tenant').doc(tenantName).set({ 
            tenantName: tenantName,
            uids: [newUid],
        })
//    add admin user to users collection
        this.afs.collection('Tenant').doc(tenantName).collection('users').doc(newUid).set({
            tenant: tenantName,
            uid: newUid,
            admin: true,
            // ** add rest of user data here **
        })
//    create initial template with just name, emails, and phone numbers 
        this.afs.collection('Tenant').doc(tenantName).collection('templates').doc('Demo Template').set({ 
            test: 'test'
        })
//    add phone numbers to phoneNumbers collection

//    create status 'active' and 'no active'
        const batch = this.afs.firestore.batch();
        let customers = this._http.get(this.initialTemplateCustomers);
        customers.subscribe((data) => {
            Object.values(data).forEach((customer) => {
                customer.uid = RandomId(len, pattern);
                console.log(customer);
                const ref: any = this.afs
                .collection('Tenant')
                .doc(tenantName)
                .collection('templates')
                .doc('Demo Template')
                .collection('customers')
                .doc(customer.uid).ref;
              batch.set(ref, {
                ...customer,
                group: [],
                lastContact: null,
                notes: [],
                template: 'Demo Template',
                uid: customer.uid ,
              });

            })
            return batch.commit()
        })

    })  


//   add new tenant to currentUser/coach 
    this.afs.collection('Coach').doc(this.userInfo.uid).update({ 
        clients: arrayUnion(tenantName)
    })
    promise.catch(function (e: any) {
        if (e) {
            secondaryApp.auth().signOut();
        }
    });


        
    }


async getClientList(clientArray: any) {
        let clientList: any[] = [];
        await clientArray.forEach((client: string | undefined) => {
            this.afs.collection('Tenant').doc(client).ref.get().then((docs) => {
                clientList.push(docs.data());
            })
        })
        return clientList;
    }


  getNavbarData(): Observable<any>{

    return this._http.get(this.navbarDataURL);

  }


}



// Add username to menu like main app
// phone numbers into array
// remove caps lock and error message
// add dropdown of coaches 
