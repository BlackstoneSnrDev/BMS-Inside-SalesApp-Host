import { Component, OnInit, Input, Output } from '@angular/core';
import { UsersService } from '../../services/auth.service';
import { DataService } from '../../services/services.service';


@Component({

    selector: 'tenant-component',
    templateUrl: './tenant.component.html',
    styleUrls: ['./tenant.component.css',
    '../../css/neumorphism.component.css',]

})
export class TenantComponent {

    @Input() tenantInfo: any;
    public tenantLists: any

    constructor(
        public DataService: DataService,
        private usersService: UsersService
      ) {}

    ngOnInit() {
        for (const [i, value] of this.tenantInfo.entries()) {
            this.tenantLists = value.tenantName;
        }
       
        console.log(this.tenantLists)
        
        
    }
  
}
