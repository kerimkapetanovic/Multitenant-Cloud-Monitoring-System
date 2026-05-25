import { Routes } from '@angular/router';
import { ServerDashboardComponent } from './components/server-dashboard/server-dashboard.component';

export const routes: Routes = [
    { path: 'dashboard', component: ServerDashboardComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];