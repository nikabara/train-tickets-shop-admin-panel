import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentStatus'
})
export class PaymentStatusPipe implements PipeTransform {

  transform(value: number | null): string | null {
    if (typeof value !== 'number') {
      return value;
    }

    switch(value){
      case 1:
        return 'Completed'
      case 2:
        return 'Pending'
      case 3:
        return 'Reserved'
      case 4:
        return 'Canceled'

      default:
        return 'Unidentified'
    }
  }
}
