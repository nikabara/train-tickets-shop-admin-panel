import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VagonService } from '../../services/AppServices/vagon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-vagon',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-vagon.component.html',
  styleUrl: './add-vagon.component.sass'
})
export class AddVagonComponent {

  private readonly vagonService: VagonService = inject(VagonService);

  public addForm: FormGroup = new FormGroup({
    vagons: new FormArray([]) // Dynamic list starts empty
  });

  // Getter for easy access to the FormArray
  get vagonControls() {
    return (this.addForm.get('vagons') as FormArray).controls;
  }

  // Helper to create a new vagon form group
  private createVagonGroup(): FormGroup {
    return new FormGroup({
      trainId: new FormControl(null, Validators.required),
      capacity: new FormControl(null, [Validators.required, Validators.min(1)]),
      vagonType: new FormControl(null, Validators.required)
    });
  }

  // Method triggered by the "Add Vagon" button
  addNewVagon(): void {
    const control = <FormArray>this.addForm.controls['vagons'];
    control.insert(0, this.createVagonGroup());
  }

  // Remove a specific vagon if needed
  removeVagon(index: number): void {
    const control = <FormArray>this.addForm.controls['vagons'];
    control.removeAt(index);
  }

  submitVagons(): void {
    if (this.addForm.valid) {
      // formData.vagons will be an array of {trainId, capacity, vagonType}
      const finalData = this.addForm.value.vagons;
      console.log('Packed Array:', finalData);

      Swal.fire({
        title: "Are you sure you want to add given vagons?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Add vagons"
      }).then((result) => {
        if (result.isConfirmed && finalData) {
          if (finalData) {
            finalData.forEach((vagon: any) => {
              this.vagonService.AddVagon(vagon).subscribe();
            });
          }

          Swal.fire({
            title: "Vagons added",
            icon: "success"
          });
        }
      });


      // Call your service here: this.vagonService.AddVagons(finalData).subscribe(...)
    } else {
      this.addForm.markAllAsTouched();
    }
  }
}
