import { CommonModule } from '@angular/common';
import { ScheduleFilter } from '../../interfaces/ScheduleFilter.interface';
import { ScheduleFilterService } from '../../services/AppServices/schedule-filter.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeEventArgs, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { RouterLink, RouterModule } from "@angular/router";
import { ScheduleService } from '../../services/AppServices/schedule.service';

@Component({
  selector: 'app-add-train',
  imports: [FormsModule, DatePickerModule, ReactiveFormsModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './manage-schedule.component.html',
  styleUrl: './manage-schedule.component.sass'
})
export class AddTrainComponent {

  private scheduleFilterService: ScheduleFilterService = inject(ScheduleFilterService);
  private scheduleService: ScheduleService = inject(ScheduleService);

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


  filterForm: FormGroup = new FormGroup({
    trainName: new FormControl(''),
    trainNumber: new FormControl(null),
    departureFrom: new FormControl(''),
    arrivalAt: new FormControl('')
  })

  public filteredSchedules: ScheduleFilter[] = [];

  searchSchedule(){
    if (this.filterForm.valid) {
      const formData = this.filterForm.value;

      let fitlerModel: any = {
        trainName: formData.trainName,
        trainNumber: formData.trainNumber == "" ? null :  formData.trainNumber,
        departureFrom: formData.departureFrom,
        arrivalAt: formData.arrivalAt,
        departureDate: this.departureDate == null || this.departureDate == undefined ? null : new Date(this.departureDate).toISOString(),
        arrivalDate: this.arrivalDate == null || this.arrivalDate == undefined ? null : new Date(this.arrivalDate).toISOString()
      }

      this.scheduleFilterService.FilterSchedules(fitlerModel).subscribe({
        next: (response) => {
          this.filteredSchedules = []
          this.filteredSchedules = response.data;
          console.log(response);
        },
        error: (message) => {
          console.log(message);
        }
      })

      console.log(fitlerModel);
    }
  }

  removeSchedule(scheduleId: number){
    this.scheduleService.RemoveSchedule(scheduleId).subscribe({
      next: (response: any) => {
        if (response.data) {
          this.searchSchedule();
        }
      }
    })
  }
}
