import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/AppServices/user.service';
import { TransactionService } from '../../services/AppServices/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.sass'
})
export class UserDetailsComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly userService: UserService = inject(UserService);
  private readonly transactionService: TransactionService = inject(TransactionService);

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


}
