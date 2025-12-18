import { TrainService } from './../../services/AppServices/train.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TrainFilterService } from '../../services/AppServices/train-filter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-trains',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './manage-trains.component.html',
  styleUrl: './manage-trains.component.sass'
})
export class ManageTrainsComponent {

  private readonly trainFilterService: TrainFilterService = inject(TrainFilterService);
  private readonly trainService: TrainService = inject(TrainService);

  public filteredTrains: any[] | undefined;

  filterForm: FormGroup = new FormGroup({
    TrainId: new FormControl(null),
    TrainNumber: new FormControl(null),
    TrainName: new FormControl("")
  });

  searchTrains() {
    if (this.filterForm.valid) {
      const formData = this.filterForm.value;

      let filterModel: any = {
        trainId: formData.TrainId,
        trainNumber: formData.TrainNumber,
        trainName: formData.TrainName
      }

      this.trainFilterService.FilterTrains(filterModel).subscribe({
        next: (response) => {
          this.filteredTrains = [];
          this.filteredTrains = response.data;
        }
      })
    }
  }

  removeTrain(trainId: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#28A745",
      cancelButtonColor: "#DC3545",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // actual deletion
        this.trainService.RemoveTrain(trainId).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.searchTrains();
            }
          }
        });

        Swal.fire({
          title: "Deleted!",
          text: "Train has been deleted.",
          icon: "success"
        });
      }
    });
  }
}
