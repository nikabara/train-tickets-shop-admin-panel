import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainService } from '../../services/AppServices/train.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateTrain } from '../../interfaces/UpdateTrain.interface';

@Component({
  selector: 'app-edit-train',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-train.component.html',
  styleUrl: './edit-train.component.sass'
})
export class EditTrainComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly trainService: TrainService = inject(TrainService);

  private trainId: number | undefined;

  public trainToEdit: any | undefined;

  public updateForm: FormGroup = new FormGroup({
    trainId: new FormControl(null),
    trainNumber: new FormControl(null),
    trainName: new FormControl('')
  })

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');

      if (idString) {
        let trainId: number = Number.parseInt(idString);
        this.trainId = trainId;

        this.trainService.GetTrain(trainId).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.trainToEdit = response.data;
              console.log(this.trainToEdit);
            }
          }
        })
      }
    })
  }

  updateTrain(): void {
    if (this.updateForm.valid) {
      const formData = this.updateForm.value;
      console.log(formData)

      let newTrain: UpdateTrain = {
        trainId: this.trainId!,
        trainNumber: formData.trainNumber,
        trainName: formData.trainName
      }

      this.trainService.UpdateTrain(newTrain).subscribe({
        error: (msg) => {
          console.log(msg)
        }
      });
    }
  }
}
