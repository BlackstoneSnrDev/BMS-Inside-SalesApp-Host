import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css', '../../css/neumorphism.component.css'],
})
export class TableComponent {
  @Input() public thData: any;
  @Input() public tdData: any;
  @Input() public currentItem: any;
  public loading: boolean = true;

  constructor() {}

  ngOnInit() {
    if (this.tdData) {
      this.loading = false;
    }
  }
}
