import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetTrainSchedule } from '../../interfaces/ISchedule/GetTrainSchedule.interface';
import { ScheduleService } from '../../services/AppServices/schedule.service';
import { ChangeEventArgs, DatePickerModule, DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTrainSchedule } from '../../interfaces/ISchedule/UpdateTrainSchedule.interface';
import Swal from 'sweetalert2'
import { response } from 'express';

@Component({
  selector: 'app-edit-train',
  imports: [DatePickerModule, DateTimePickerModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-schedule.component.html',
  styleUrl: './edit-schedule.component.sass'
})
export class EditScheduleComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly scheduleService: ScheduleService = inject(ScheduleService);

  private scheduleId: number| undefined;

  public scheduleToEdit: GetTrainSchedule | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');

      if (idString) {
        let trainId: number = Number.parseInt(idString);
        this.scheduleId = trainId;

        this.scheduleService.GetSchedule(trainId).subscribe({
          next: (response) => {
            this.scheduleToEdit = response.data;
          },
          error: (msg) => {
            console.log(msg);
          }
        });
      }
      else {
        Swal.fire({
          title: "FAIL",
          text: "Something went wrong",
          icon: "error"
        });
      }
    });
  }

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

  public updateForm: FormGroup = new FormGroup({
    trainId: new FormControl(null),
    departureFrom: new FormControl(''),
    arrivalAt: new FormControl('')
  })

  public updateSchedule() {
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;

      let newSchedule: UpdateTrainSchedule = {
        trainScheduleId: this.scheduleId,
        trainId: formData.trainId,
        departureFrom: formData.departureFrom,
        arrivalAt: formData.arrivalAt,
        departureDate: this.departureDate != null && this.departureDate != undefined ? this.departureDate : null,
        arrivalDate: this.arrivalDate != null && this.arrivalDate != undefined ? this.arrivalDate : null
      }

      this.scheduleService.EditSchedule(newSchedule).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            Swal.fire({
              title: "Success",
              text: "Schedule edited sucessfully",
              icon: "success"
            });
          }
        }
      })
    }
  }



}
