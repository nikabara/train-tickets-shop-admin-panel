import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/Auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.sass'
})
export class AddUserComponent {

  private readonly authService: AuthService = inject(AuthService);

  public addForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl(null),
    email: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
    password: new FormControl('', Validators.required)
  });

  get get_error(): any { return this.addForm.controls }

  addUser(): void {
    if (this.addForm.valid) {
      const formData = this.addForm.value;

      const newUser: any = {
        name: formData.name,
        lastName: formData.lastName,
        age: Number.parseInt(formData.age),
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password
      }

      console.log(newUser)

      this.authService.RegisterUser(newUser).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            Swal.fire({
              title: "User registered succesfully",
              icon: "success",
              text: `User id: ${response.data} returned`
            });
          }
          else {
            Swal.fire({
              title: "User registration failed",
              icon: "error",
              text: `Error: ${response.message}`
            });
          }
        },
        error: (error_msg) => {
          console.log(error_msg);
          Swal.fire({
            title: "Error registering user",
            icon: "error",
            text: `Error: ${error_msg.message}`
          });
        }
      });
    }
  }
}
