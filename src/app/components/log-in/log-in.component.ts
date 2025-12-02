import { JwtService } from './../../services/JWT/jwt.service';
import { FirebaseService } from './../../services/firebase.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AdminUser } from '../../interfaces/AminUser.interface';
import { Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { RateLimiterService } from '../../services/rate-limiter.service';
import Swal from 'sweetalert2';
import { RailwayticketsApiService } from '../../services/railwaytickets-api.service';
import { AuthService } from '../../services/Auth/auth.service';
import { FormsModule } from '@angular/forms';
import {
  OtpInputEventArgs,
  OtpInputModule,
} from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, OtpInputModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.sass',
})
export class LogInComponent implements OnInit {
  private firebaseService: FirebaseService = inject(FirebaseService);
  private rateLimiter: RateLimiterService = inject(RateLimiterService);
  private router: Router = inject(Router);

  // testing
  // private railwayTicketsService: RailwayticketsApiService = inject(RailwayticketsApiService);

  private authService: AuthService = inject(AuthService);
  private jwtService: JwtService = inject(JwtService);

  isEyeVisible: boolean = false;

  toggleEyeVisibility(): void {
    this.isEyeVisible = !this.isEyeVisible;
  }

  loginFormGroup!: FormGroup;

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(/^[^@\s]+@(gmail|yahoo|mail)+\.(com|io|info)$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });

    this.firebaseService.getAdminUsers().subscribe((response) => {
      this.adminUsers = response;
      console.log(this.adminUsers);
    });

    // // testing
    // this.railwayTicketsService.getTrain(2).subscribe(
    //   (response) => {
    //     console.log(response);
    //   }
    // )
  }

  private code: string = '';
  public showVerificationCodePanel: boolean = false;
  public isButtonDisabled: boolean = true;

  public input(args: OtpInputEventArgs) {
    if ('value' in args) {
      this.code = args.value.toString();
      console.log(this.code);
    }

    if (this.code.length == 6) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  }

  userRole: string | undefined;

  getUserRole(email: string, password: string): void {
    this.userRole = this.adminUsers.find(
      (x: AdminUser) =>
        x.password === this.loginFormGroup.value.password &&
        x.email === this.loginFormGroup.value.email
    )?.role;
  }

  isAdminUserFound(): boolean {
    return !!this.adminUsers.find(
      (x: AdminUser) =>
        x.password === this.loginFormGroup.value.password &&
        x.email === this.loginFormGroup.value.email
    );
  }


  verifyCode(): void {
    console.log('first');

    if (this.tempJwt.length != null) {
      console.log('second');
      var userEmail = this.jwtService.getClaim(this.tempJwt, 'email');

      this.authService.VerifyVerificationCode(userEmail, this.code).subscribe({
        next: (response) => {
          if (response.isSuccess && response.data) {
            console.log('third');
            this.router.navigate(['/dashboard']);
            localStorage.setItem('jwt_access_token', this.tempJwt);
          }
        },
      });
    }
  }

  private tempJwt: string = '';

  onSubbmitNew(): void {
    if (
      this.loginFormGroup.valid &&
      typeof sessionStorage !== 'undefined' &&
      this.rateLimiter.canAttempt()
    ) {
      this.authService
        .LogIn(
          this.loginFormGroup.value.email,
          this.loginFormGroup.value.password
        )
        .subscribe({
          next: (response) => {
            if (response.isSuccess && response.data) {
              console.log("we in")
              if (localStorage.getItem('jwt_access_token')){
                this.router.navigate(['/dashboard']);
              }
              else {
                const payload = this.jwtService.decodeToken(response.data);

                console.log(payload);

                let userId = this.jwtService.getClaim(response.data, 'nameid');

                console.log(`userid : ${userId}`);

                this.authService.IsUserVerified(userId).subscribe({
                  next: (verifiedResponse) => {
                    if (verifiedResponse.data == true) {
                      localStorage.setItem('jwt_access_token', response.data);
                      this.router.navigate(['/dashboard']);
                    }
                    else {
                      this.showVerificationCodePanel = true;
                      this.authService.SendVerificationCode(userId).subscribe();
                      this.tempJwt = response.data;
                    }
                  }
                })
              }
            }
          },
          error: (message) => {
            console.log(message);
          },
        });

      // sessionStorage.setItem('isAuthed', this.isAdminUserFound().toString());
      // this.getUserRole(this.loginFormGroup.value.email, this.loginFormGroup.value.password);
      // sessionStorage.setItem('userType', `${this.userRole}`);

      // this.router.navigate(['/dashboard'])
    } else {
      console.log('Form is invalid');
    }

    if (!this.rateLimiter.canAttempt()) {
      Swal.fire({
        icon: 'error',
        title: 'Too many Log-in attempts. Try again in 1 minute.',
      });
    }

    if (this.loginFormGroup.valid) {
      this.rateLimiter.recordAttempt();
    }
  }

  adminUsers!: AdminUser[];
}
