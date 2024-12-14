import { FirebaseService } from './../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminUser } from '../../interfaces/AminUser.interface';
import { Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.sass'
})
export class LogInComponent implements OnInit {
  firebaseService: FirebaseService = inject(FirebaseService);
  router: Router = inject(Router);

  isEyeVisible: boolean = false;

  toggleEyeVisibility(): void {
    this.isEyeVisible = !this.isEyeVisible;
  }

  loginFormGroup!: FormGroup;

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(/^[^@\s]+@(gmail|yahoo|mail)+\.(com|io|info)$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    })

    this.firebaseService.getAdminUsers().subscribe(
      (response) => {
        this.adminUsers = response;
        console.log(this.adminUsers);
      }
    )
  }

  userRole: string | undefined;

  getUserRole(email: string, password: string): void {
    this.userRole = this.adminUsers
    .find((x: AdminUser) => 
      (x.password === this.loginFormGroup.value.password) && 
      (x.email === this.loginFormGroup.value.email))?.role;
  }

  isAdminUserFound(): boolean {
    return !!this.adminUsers
      .find((x: AdminUser) => 
        (x.password === this.loginFormGroup.value.password) && 
        (x.email === this.loginFormGroup.value.email));
  }

  onSubbmit(): void {
    if (this.loginFormGroup.valid && typeof sessionStorage !== 'undefined' && this.isAdminUserFound()) {
      sessionStorage.setItem('isAuthed', this.isAdminUserFound().toString());
      this.getUserRole(this.loginFormGroup.value.email, this.loginFormGroup.value.password);
      sessionStorage.setItem('userType', `${this.userRole}`);

      this.router.navigate(['/dashboard'])
    } else {
      console.log('Form is invalid');
    }
  }

  adminUsers!: AdminUser[];
}
