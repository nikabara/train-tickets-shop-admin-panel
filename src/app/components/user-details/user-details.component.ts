import { SuperAdminService } from './../../services/AppServices/SuperAdminService/super-admin.service';
import { Component, inject, InjectionToken, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/AppServices/user.service';
import { TransactionService } from '../../services/AppServices/transaction.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RoleIdToRoleNamePipe } from "../../pipes/role-id-to-role-name.pipe";

@Component({
  selector: 'app-user-details',
  imports: [CommonModule, RoleIdToRoleNamePipe],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.sass'
})
export class UserDetailsComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly userService: UserService = inject(UserService);
  private readonly transactionService: TransactionService = inject(TransactionService);

  private readonly superAdminService: SuperAdminService = inject(SuperAdminService);

  private userId: number | undefined;

  public user: any | undefined;
  public transactions: any[] | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');

      if (idString) {
        this.userId = Number.parseInt(idString);

        this.userService.GetUser(this.userId).subscribe({
          next: (response) => {
            this.user = response.data;
            console.log(this.user);

            this.transactionService.GetTransactionsByUserId(this.user.userId).subscribe({
              next: (getTransactionResponse) => {
                this.transactions = getTransactionResponse.data;
                console.log(this.transactions)
              }
            })
          }
        })
      }
    })
  }

  makeUserAdmin(): void {
    Swal.fire({
      title: "Are you sure?",
      text: `You are promoting [${this.user.name} ${this.user.userLastName}] to admin`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm"
    }).then((result) => {
      if (result.isConfirmed) {
        this.superAdminService.MakeAdmin(this.userId!).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              Swal.fire({
                title: "User promoted to admin",
                icon: "success"
              });
            }
          },
          error: (message) => {
            Swal.fire({
              title: "Failed to promote",
              text: `${message}`,
              icon: "warning"
            });
          }
        })
      }
    });
  }


  verifyUser(): void {
    Swal.fire({
      title: "Are you sure?",
      text: `You are verifying [${this.user.name} ${this.user.userLastName}]`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm"
    }).then((result) => {
      if (result.isConfirmed) {
        const verifyUserModel = {
          userId: this.userId,
          name: this.user.name,
          lastName: this.user.lastName,
          age: this.user.age,
          phoneNumber: this.user.phoneNumber,
          email: this.user.email,
          UserRoleType: this.user.userRoleId,
          isVerified: true
        }

        this.userService.UpdateUser(verifyUserModel).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              Swal.fire({
                title: "User verified",
                icon: "success"
              });
            }
          },
          error: (message) => {
            Swal.fire({
              title: "Failed to verify user",
              text: `${message}`,
              icon: "warning"
            });
          }
        })
      }
    });
  }

}
