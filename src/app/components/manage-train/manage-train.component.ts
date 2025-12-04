import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeEventArgs, DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-add-train',
  imports: [FormsModule, DatePickerModule],
  templateUrl: './manage-train.component.html',
  styleUrl: './manage-train.component.sass'
})
export class AddTrainComponent {

  public selectedDate: Date | null | undefined = null;

  onDateChange(args: ChangeEventArgs): void {
    this.selectedDate = args.value;
    console.log('Date changed:', this.selectedDate);
    // Perform other actions with the selected date
  }
}
