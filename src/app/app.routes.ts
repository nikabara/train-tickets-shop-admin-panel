import { Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComposeComponent } from './components/compose/compose.component';
import { ValidateTicketComponent } from './components/validate-ticket/validate-ticket.component';

export const routes: Routes = [
    { path: '', component: LogInComponent },
    { path: 'log-in', component: LogInComponent, title: 'Log In' },
    { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
    { path: 'compose', component: ComposeComponent, title: 'Compose' },
    { path: 'validate-ticket', component: ValidateTicketComponent, title: 'Validate Ticket' },
    { path: '**', component: DashboardComponent }
];
