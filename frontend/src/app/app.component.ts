import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServerDashboardComponent } from './components/server-dashboard/server-dashboard.component';
@Component({
  selector: 'app-root',
  imports: [ServerDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cloud-monitor-frontend';
}