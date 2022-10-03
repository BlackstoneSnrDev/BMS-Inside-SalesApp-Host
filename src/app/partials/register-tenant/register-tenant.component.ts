import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from "../../services/auth.service";
import { DataService } from "../../services/services.service";

@Component({

    selector: 'register-tenant-component',
    templateUrl: './register-tenant.component.html',
    styleUrls: ['./register-tenant.component.css',
    '../../css/neumorphism.component.css',]

})
export class RegisterTenant {

    public tenantForm!: FormGroup;
    public name: string = '';
    public username: string = '';
    public password: string = '';

    public statusMsg: any;

    constructor(public router: Router, public userService: UsersService, public dataService: DataService ) { }

    ngOnInit() {

 
        this.tenantForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(1)]),
            username: new FormControl('', [Validators.required, Validators.minLength(1)]),
            password: new FormControl('', [Validators.required, Validators.minLength(1)])
        });

      
    }

    saveNewTenant() {


        this.dataService.createNewTenant();

    /*  
    INITIAL ADMIN: 
        create phone numbers in Twilio for new tenant 
        (have the fake json numbers connect to twilio numbers to play recorded message)

    INPUTS:
        tenant name
        tenant admin user - email and password
        tenant's phone numbers 
        twilio phone numbers for tenant 

    IN DATABASE
        create user in firebase auth
        create tenant 
        add admin uid to tenants uids array
        add admin user to users collection
        create initial template with just name, emails, and phone numbers 
            create status 'active' and 'no active'

    IN TENANT'S ACCOUNT PAGE
        make roles 
        create first template
        create users
    */
        console.log('Saved')
    }
}
