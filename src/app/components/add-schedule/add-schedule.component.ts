import Swal  from 'sweetalert2';
import { ScheduleService } from './../../services/AppServices/schedule.service';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeEventArgs, DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { AddTrainSchedule } from '../../interfaces/ISchedule/AddTrainSchedule.interface';

@Component({
  selector: 'app-add-schedule',
  imports: [DateTimePickerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-schedule.component.html',
  styleUrl: './add-schedule.component.sass'
})
export class AddScheduleComponent {

  private readonly ScheduleService: ScheduleService = inject(ScheduleService);

  public departureDate: Date | null | undefined = null;
  public arrivalDate: Date | null | undefined = null;

  onDateChangeDeparture(args: ChangeEventArgs): void {
    this.departureDate = args.value;
    console.log('Date changed:', this.departureDate);
    // Perform other actions with the selected date
  }

  onDateChangeArrival(args: ChangeEventArgs): void {
    this.arrivalDate = args.value;
    console.log('Date changed:', this.arrivalDate);
    // Perform other actions with the selected date
  }

  public addForm: FormGroup = new FormGroup({
    trainId: new FormControl(null),
    departureFrom: new FormControl(''),
    arrivalAt: new FormControl('')
  })

  addSchedule() {
    if (this.addForm.valid) {
      const formData = this.addForm.value;

      let newSchedule: AddTrainSchedule = {
        trainId: formData.trainId == "" ? null : formData.trainId,
        departureFrom: formData.departureFrom,
        arrivalAt: formData.arrivalAt,
        departureDate: this.departureDate != null && this.departureDate != undefined ? this.departureDate : null,
        arrivalDate: this.arrivalDate != null && this.arrivalDate != undefined ? this.arrivalDate : null
      }

      console.log(newSchedule);

      this.ScheduleService.AddSchedule(newSchedule).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            Swal.fire({
              title: "Schedule added",
              text: `Schedule with the id: ${response.data} was added`,
              icon: "success"
            })
          }
          else {
            Swal.fire({
              title: "Failure",
              text: `${response.message}`,
              icon: "error"
            });
          }
        }
      })

    }
  }
}
