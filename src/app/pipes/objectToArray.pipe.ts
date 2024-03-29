import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray',
})
export class ObjectToArray implements PipeTransform {
  // The object parameter represents the values of the properties or index.
  transform = (objects: any = []) => {
    return Object.values(objects);
  }
}