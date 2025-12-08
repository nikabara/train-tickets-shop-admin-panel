import { CommonModule } from '@angular/common';
import { TrainFilter } from './../../interfaces/TrainFilter.interface';
import { TrainFilterService } from './../../services/AppServices/train-filter.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeEventArgs, DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { RouterLink } from "@angular/router";
import { TrainService } from '../../services/AppServices/train.service';

@Component({
  selector: 'app-add-train',
  imports: [FormsModule, DatePickerModule, ReactiveFormsModule, CommonModule],
  templateUrl: './manage-train.component.html',
  styleUrl: './manage-train.component.sass'
})
export class AddTrainComponent {

  private trainFilterService: TrainFilterService = inject(TrainFilterService);
  private trainService: TrainService = inject(TrainService);

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

  public filteredTrains: TrainFilter[] = [];

  searchTrain(){
    if (this.filterForm.valid) {
      const formData = this.filterForm.value;

      let fitlerModel: any = {
        trainName: formData.trainName,
        trainNumber: formData.trainNumber,
        departureFrom: formData.departureFrom,
        arrivalAt: formData.arrivalAt,
        departureDate: this.departureDate == null || this.departureDate == undefined ? null : new Date(this.departureDate).toISOString(),
        arrivalDate: this.arrivalDate == null || this.arrivalDate == undefined ? null : new Date(this.arrivalDate).toISOString()
      }

      this.trainFilterService.FilterTrains(fitlerModel).subscribe({
        next: (response) => {
          this.filteredTrains = []
          this.filteredTrains = response.data;
          console.log(response);
        },
        error: (message) => {
          console.log(message);
        }
      })

      console.log(fitlerModel);
    }
  }

  removeTrain(trainId: number){
    this.trainService.RemoveTrain(trainId).subscribe({
      next: (response) => {
        if (response.data) {
          this.searchTrain();
        }
      }
    })
  }
}
