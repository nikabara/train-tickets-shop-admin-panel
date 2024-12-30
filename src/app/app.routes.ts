import { Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ComposeComponent } from './components/compose/compose.component';
import { ValidateTicketComponent } from './components/validate-ticket/validate-ticket.component';
import { ValidateQrComponent } from './components/validate-qr/validate-qr.component';
import { AccessGuard } from './guards/access-guard.guard';

export const routes: Routes = [
    { path: '', component: LogInComponent },
    { path: 'log-in', component: LogInComponent, title: 'Log In' },
    { 
        path: 'dashboard', 
        title: 'Dashboard', 
        canActivate: [AccessGuard],
        loadComponent: () => import('./components/dashboard/dashboard.component')
            .then((m) => m.DashboardComponent)
    },
    { path: 'compose', component: ComposeComponent, title: 'Compose', canActivate: [AccessGuard] },
    { path: 'validate-ticket', component: ValidateTicketComponent, title: 'Validate Ticket', canActivate: [AccessGuard] },
    { path: 'validate-qr', component: ValidateQrComponent, title: 'Validate QR', canActivate: [AccessGuard] },
    { path: '**', component: LogInComponent }
];
