import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from "../../services/auth.service";

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

    constructor(public router: Router, public userService: UsersService) { }

    ngOnInit() {

 
        this.tenantForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(1)]),
            username: new FormControl('', [Validators.required, Validators.minLength(1)]),
            password: new FormControl('', [Validators.required, Validators.minLength(1)])
        });

      
    }

    saveNewTenant() {
        console.log('Saved')
    }
}
