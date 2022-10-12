import { Component } from "@angular/core";
import { UsersService } from '../../services/auth.service';
import { DataService } from '../../services/services.service';


@Component({

    selector: 'home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css',
    '../../css/neumorphism.component.css',]

})
export class HomeComponent {

    public tenantList: any[] = [];

    constructor(
        public DataService: DataService,
        private usersService: UsersService
      ) {}

    ngOnInit() {
        this.usersService.userInfo.subscribe((userInfo: any) => {
            if (userInfo && userInfo.clients) {
                this.DataService.getClientList(userInfo.clients).then((res: any) => {
                    console.log(res);
                        this.tenantList = res;
                    }
                )
            }
        })
        
    }
  
}
