import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { Timestamp } from '@angular/fire/firestore';
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    // SidebarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {

  constructor(private firebaseService: FirebaseService) { }

  addInfo(): void {
    this.firebaseService.addInfo(
      "Testing info",
      "This is testing info subbmit function from admin panel",
      Timestamp.now(),
      Timestamp.now(),
      "https://cdn.create.vista.com/api/media/small/136287766/stock-photo-blue-ridge-parkway-summer-appalachian-mountains-sunset"
    ).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
