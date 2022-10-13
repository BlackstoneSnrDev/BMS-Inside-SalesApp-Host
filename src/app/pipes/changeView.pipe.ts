import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeView',
})
export class ChangeView implements PipeTransform {
  transform(tdData: any, modifyBy: string): any {
    switch (modifyBy) {
      case 'templates':
        return tdData.templateFields;

      default:
        return tdData;
    }
  }
}
