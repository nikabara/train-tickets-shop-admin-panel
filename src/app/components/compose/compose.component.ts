import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { addDoc, collection, Firestore, Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-compose',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './compose.component.html',
  styleUrl: './compose.component.sass'
})
export class ComposeComponent implements OnInit {
  private firebaseService: FirebaseService = inject(FirebaseService);
  private firestore: Firestore = inject(Firestore)

  composeFormGroup!: FormGroup;

  ngOnInit(): void {
    this.composeFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(5)]),
      imageUrl: new FormControl('', [Validators.required, Validators.minLength(5)]),
      estimatedRenewal: new FormControl(''),
      occured: new FormControl(Timestamp.now()),
    })
  }

  onFormSubmit(): void {
    if (this.composeFormGroup.valid) {
      const dateString: string = this.composeFormGroup.get('estimatedRenewal')?.value;

      // Convert the date string to a timestamp and update the form value
      const timestamp = new Date(dateString).getTime();
      this.composeFormGroup.patchValue({ estimatedRenewal: timestamp });

      // Extract raw form data
      const formData = this.composeFormGroup.value;

      // Call the Firebase service with raw data
      this.firebaseService.addInfo(formData).subscribe(
        (response) => {
          console.log('Document ID:', response);
        },
        (error) => {
          console.error('Error adding document:', error);
        }
      );

      this.composeFormGroup.reset();
    }
  }
}
