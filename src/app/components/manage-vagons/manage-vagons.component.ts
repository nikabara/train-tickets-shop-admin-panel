import { VagonService } from './../../services/AppServices/vagon.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VagonFilterService } from '../../services/AppServices/vagon-filter.service';
import { VagonTypePipe } from "../../pipes/vagon-type.pipe";
import { response } from 'express';

@Component({
  selector: 'app-manage-vagons',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, VagonTypePipe],
  templateUrl: './manage-vagons.component.html',
  styleUrl: './manage-vagons.component.sass'
})
export class ManageVagonsComponent {

  private readonly vagonFilterService: VagonFilterService = inject(VagonFilterService);
  private readonly vagonService: VagonService = inject(VagonService);

  public filterForm: FormGroup = new FormGroup({
    vagonId: new FormControl(null),
    trainId: new FormControl(null),
    vagonType: new FormControl(''),
    capacity: new FormControl(null)
  });

  filteredVagons: any[] | undefined;

  searchVagons(): void {
    if (this.filterForm.valid) {
      const formData = this.filterForm.value;

      const vagonModel = {
        vagonId: Number.parseInt(formData.vagonId),
        trainId: Number.parseInt(formData.trainId),
        capacity: Number.parseInt(formData.capacity),
        vagonType: Number.parseInt(formData.vagonType),
      }

      console.log(vagonModel)

      this.vagonFilterService.FilterVagons(vagonModel).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.filteredVagons = response.data;
          }
        }
      })
    }
  }

  removeVagon(vagonId: number): void {
    this.vagonService.RemoveVagon(vagonId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.searchVagons();
        }
      }
    });
  }
}
