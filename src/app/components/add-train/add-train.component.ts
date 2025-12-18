import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrainService } from '../../services/AppServices/train.service';

@Component({
  selector: 'app-add-train',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-train.component.html',
  styleUrl: './add-train.component.sass'
})
export class AddTrainComponent {

  private readonly trainService: TrainService = inject(TrainService);

  public addForm: FormGroup = new FormGroup({
    trainNumber: new FormControl(null, Validators.required),
    trainName: new FormControl('', Validators.required)
  });

  public get validation_error() { return this.addForm.controls }


  addTrain(): void {
    if (this.addForm.valid) {
      const formData = this.addForm.value;

      let newTrain: any = {
        trainName: formData.trainName,
        trainNumber: formData.trainNumber
      }

      console.log(newTrain)

      this.trainService.AddTrain(newTrain).subscribe({
        error: (err) => {
          console.log(err)
        }
      });
    }
  }
}
