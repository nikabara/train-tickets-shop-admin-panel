import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { Timestamp } from '@angular/fire/firestore';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    SidebarComponent,
    CommonModule,
    ZXingScannerModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {

  constructor(private firebaseService: FirebaseService, private router: Router) { }

  isLoginRoute: boolean = false;

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isLoginRoute = this.router.url === '/log-in' || this.router.url === '' || this.router.url === '/';
    });
  }
}
