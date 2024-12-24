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
    SidebarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {

  constructor(private firebaseService: FirebaseService) { }

}
