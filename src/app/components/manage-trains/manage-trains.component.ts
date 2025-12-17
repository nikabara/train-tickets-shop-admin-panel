import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-trains',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './manage-trains.component.html',
  styleUrl: './manage-trains.component.sass'
})
export class ManageTrainsComponent {

}
