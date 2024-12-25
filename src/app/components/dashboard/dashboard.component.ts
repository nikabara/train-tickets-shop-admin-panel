import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import { FirebaseService } from '../../services/firebase.service';
import { InfoComponent } from "./info/info.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    InfoComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {
  private firebaseService: FirebaseService= inject(FirebaseService);

  firebaseInfo!: any[];

  ngOnInit() : void {
    this.firebaseService.getInfo().subscribe(info => {
      this.firebaseInfo = info.sort((a, b) => b.info.occured.seconds - a.info.occured.seconds);      ;
      console.log(this.firebaseInfo);
    })

  }
}
