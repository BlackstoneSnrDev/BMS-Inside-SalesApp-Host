import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, from } from 'rxjs'
import { UsersService } from './auth.service';
import {
    AngularFirestore,
    AngularFirestoreDocument,
  } from '@angular/fire/compat/firestore'; 
import { RandomId } from './services.randomId';

let len = 12;
let pattern = 'aA0';
// let randomstring = RandomId(len, pattern);


@Injectable({

  providedIn: 'root'

})

export class DataService {

  public navbarDataURL: string;
  public initialTemplateCustomers: string;

  public thURL: string;
  public tdURL: string;

  public dbObjKey: any;

  constructor(

    private _http: HttpClient,
    private afs: AngularFirestore,
    private usersService: UsersService

  ){

    this.navbarDataURL = "../../assets/json/navbar-data.json";
    this.initialTemplateCustomers = "../../assets/json/initialTemplateCustomers.json";


    this.thURL = "../../assets/json/thData.json";
    this.tdURL = "../../assets/json/tdData.json";


  }

  getMyTHData(): Observable<any> {
    return this._http.get(this.thURL);
  }
  getMyTDData(): Observable<any> {
    return this._http.get(this.tdURL);
  }
    createNewTenant() {

//     IN DATABASE
//         create user in firebase auth
//         create tenant 
//         add admin uid to tenants uids array
//         add admin user to users collection
//         create initial template with just name, emails, and phone numbers 
//             create status 'active' and 'no active'

        let customers = this._http.get(this.initialTemplateCustomers);
        customers.subscribe((data) => {
            Object.values(data).forEach((customer) => {
                customer.uid = RandomId(len, pattern);
                console.log(customer);
            })
        })
        
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

