import { Component, Input } from '@angular/core';
import { DataService } from '../../services/services.service';

@Component({
  selector: 'tenant-component',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css', '../../css/neumorphism.component.css'],
})
export class TenantComponent {
  @Input() tenantInfo: any;

  public tenantTitles: any;
  public tenantContent: any;
  public currentItem: any;

  public indexAccordion: any;
  public lastIndexAcc = -1;

  constructor(public DataService: DataService) {}

  ngOnInit() {}

  onTabOpen(index: number) {
    this.indexAccordion = this.lastIndexAcc--;

    this.tenantInfo.forEach((array: any, i: any) => {
      if (index == i) {
        this.tenantTitles = Object.keys(array);
      }
    });

    console.log(this.tenantTitles);
  }

  showContent(index: number, tabName: any, elementId: number) {
    this.currentItem = tabName;

    let tenant = this.tenantInfo.filter((array: any, i: any) => i == index);
    this.tenantContent = tenant[0][tabName];
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
}
