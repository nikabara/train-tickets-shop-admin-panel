import { Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: LogInComponent },
    { path: 'log-in', component: LogInComponent, title: 'Log In' },
    { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
    { path: '**', component: DashboardComponent }
];
