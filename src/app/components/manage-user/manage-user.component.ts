import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangeEventArgs, DatePickerModule } from "@syncfusion/ej2-angular-calendars";
import { UserFilterService } from '../../services/AppServices/user-filter.service';
import { UserFilter } from '../../interfaces/UserFilter.interface';
import { RoleIdToRoleNamePipe } from "../../pipes/role-id-to-role-name.pipe";

@Component({
  selector: 'app-manage-user',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, DatePickerModule, RoleIdToRoleNamePipe],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.sass'
})
export class ManageUserComponent {

  private readonly userFilterService: UserFilterService = inject(UserFilterService);

  public departureDate: Date | null | undefined = null;
  public arrivalDate: Date | null | undefined = null;

  onDateChangeDeparture(args: ChangeEventArgs): void {
    this.departureDate = args.value;
    console.log('Date changed:', this.departureDate);
    // Perform other actions with the selected date
  }

  onDateChangeArrival(args: ChangeEventArgs): void {
    this.arrivalDate = args.value;
    console.log('Date changed:', this.arrivalDate);
    // Perform other actions with the selected date
  }

  filterForm: FormGroup = new FormGroup({
    UserId: new FormControl(null),
    UserRoleId: new FormControl(null),
    Name: new FormControl(''),
    LastName: new FormControl(''),
    Age: new FormControl(null),
    Email: new FormControl(''),
    PhoneNumber: new FormControl('')
  });

  public filteredUsers: UserFilter[]  = [];

  searchUsers() {
    if (this.filterForm.valid) {
      const formData = this.filterForm.value;

      let fitlerModel: UserFilter = {
        userId: formData.UserId == "" ? null : formData.UserId,
        userRoleId: formData.UserRoleId == "" ? null : formData.UserRoleId,
        name: formData.Name,
        lastName: formData.LastName,
        age: formData.Age == "" ? null : formData.Age,
        email: formData.Email,
        phoneNumber: formData.PhoneNumber
      }

      this.userFilterService.FilterUsers(fitlerModel).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.filteredUsers = response.data;
            console.log(this.filteredUsers)
          }
        }
      })
    }
  }

  removeUser(userId: number | null) {

  }
}
