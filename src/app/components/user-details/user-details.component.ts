import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/AppServices/user.service';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.sass'
})
export class UserDetailsComponent implements OnInit {

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly userService: UserService = inject(UserService);

  private userId: number | undefined;

  private user: any | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id');

      if (idString) {
        this.userId = Number.parseInt(idString);

        this.userService.GetUser(this.userId).subscribe({
          next: (response) => {
            this.user = response;
          }
        })
      }
    })
  }
}
