import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vagonType'
})
export class VagonTypePipe implements PipeTransform {

  transform(value: number | null): string | null {
    if (typeof value !== 'number') {
      return value;
    }

    switch(value){
      case 0:
        return 'First Class'
      case 1:
        return 'Second Class'
      case 2:
        return 'Business Class'

      default:
        return 'Unidentified'
    }
  }
}
