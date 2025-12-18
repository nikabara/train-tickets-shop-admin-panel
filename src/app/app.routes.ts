import { Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
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
    {
      path: 'schedule/manage-schedules',
      title: 'Manage shcedules',
      canActivate: [AccessGuard],
      loadComponent: () => import('./components/manage-schedule/manage-schedule.component')
        .then((m) => m.AddTrainComponent)
    },
    {
      path: 'schedule/edit-schedule/:id',
      title: 'Edit schedule',
      canActivate: [AccessGuard],
      loadComponent: () => import('./components/edit-schedule/edit-schedule.component')
        .then((m) => m.EditScheduleComponent)
    },
    {
      path: 'schedule/add-schedule',
      title: 'Add schedule',
      canActivate: [AccessGuard],
      loadComponent: () => import('./components/add-schedule/add-schedule.component')
        .then((m) => m.AddScheduleComponent)
    },
    {
      path: 'user/manage-user',
      title: 'Manage users',
      canActivate: [AccessGuard],
      loadComponent: () => import('./components/manage-user/manage-user.component')
        .then((m) => m.ManageUserComponent)
    },
    {
      path: 'user/user-details/:id',
      title: 'User details',
      canActivate: [AccessGuard],
      loadComponent: () => import('./components/user-details/user-details.component')
        .then((m) => m.UserDetailsComponent)
    },
    {
      path: 'train/manage-trains',
      title: 'Manage trains',
      canActivate: [AccessGuard],
      loadComponent: () => import('./components/manage-trains/manage-trains.component')
        .then((m) => m.ManageTrainsComponent)
    },
    {
      path: 'train/edit-train/:id',
      title: 'Edit train',
      canActivate: [AccessGuard],
      loadComponent: () => import('./components/edit-train/edit-train.component')
        .then((m) => m.EditTrainComponent)
    },
    {
      path: 'train/add-train',
      title: 'Add train',
      canActivate: [AccessGuard],
      loadComponent: () => import('./components/add-train/add-train.component')
        .then((m) => m.AddTrainComponent)
    },
    { path: 'compose', component: ComposeComponent, title: 'Compose', canActivate: [AccessGuard] },
    { path: 'validate-ticket', component: ValidateTicketComponent, title: 'Validate Ticket', canActivate: [AccessGuard] },
    { path: 'validate-qr', component: ValidateQrComponent, title: 'Validate QR', canActivate: [AccessGuard] },
    { path: '**', component: LogInComponent }
];
