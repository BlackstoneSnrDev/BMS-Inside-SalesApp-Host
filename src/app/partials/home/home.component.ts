import { Component } from '@angular/core';
import { UsersService } from '../../services/auth.service';
import { DataService } from '../../services/services.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../css/neumorphism.component.css'],
})
export class HomeComponent {
  public tenantList: any[] = [];

  public tenantTitles: any;
  public tenantContent: any;
  public currentItem: any;

  public thData: any;
  public tdData: any;
  public loading: boolean = true;
  indexAcc: any;
  lastIndex = -1;
  
  constructor(
    public dataService: DataService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.usersService.userInfo.subscribe((userInfo: any) => {
      if (userInfo && userInfo.clients) {
        this.dataService.getClientList(userInfo.clients).then((res: any) => {
          this.tenantList = res;
        });
      }
    });
  }

  showContent(index: number, indexTab: any, elementId: number) {
    this.currentItem = indexTab;
    let tenant = this.tenantList.filter((array: any, i: any) => i == index);

    this.dataService.getMyTDData().subscribe(
      (response) => {
        this.loading = true;
        if (this.currentItem == 'templates') {
          tenant[0]['templates'] = response.tableTemplate_td;
        } else if (this.currentItem == 'users') {
          tenant[0]['users'] = response.tableUser_td;
        } else if (this.currentItem == 'roles') {
          tenant[0]['roles'] = response.tableRole_td;
        }
        this.loading = false;
        this.tenantContent = tenant[0][indexTab];
      },

      (error) => {
        console.error(error);
      }
    );

    this.dataService.getMyTHData().subscribe(
      (response) => {
        this.loading = true;
        if (this.currentItem == 'templates') {
          this.thData = response.tableTemplate_th;
        } else if (this.currentItem == 'users') {
          this.thData = response.tableUser_th;
        } else if (this.currentItem == 'roles') {
          this.thData = response.tableRole_th;
        }
        this.loading = false;
      },

      (error) => {
        console.error(error);
      }
    );

    console.log(this.tenantContent);

    let modifyLastElmActive = document.getElementsByClassName(
      'button-neumorphism-active'
    );
    while (modifyLastElmActive.length > 0) {
      modifyLastElmActive[0].classList.remove('button-neumorphism-active');
    }
    document
      .getElementById('menuTenant' + index + elementId)
      ?.classList.toggle('button-neumorphism-active');
  }

  onTabOpen(index: number) {
    this.indexAcc = this.lastIndex--;

    this.tenantList.forEach((array: any, i: any) => {
      if (index == i) {
        this.tenantTitles = Object.keys(array);
      }
    });

    console.log(this.tenantList);
    this.tenantTitles = [
      { label: 'Templates', field: 'templates' },
      { label: 'Users', field: 'users' },
      { label: 'Roles', field: 'roles' },
      { label: 'Phone numbers', field: 'phoneNumbers' },
    ];
  }
}
