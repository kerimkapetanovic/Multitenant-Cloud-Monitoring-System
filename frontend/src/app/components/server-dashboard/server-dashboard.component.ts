import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Server } from '../../service/server.service';
import { ServerService } from '../../service/server.service';
@Component({
  selector: 'app-server-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './server-dashboard.component.html',
  styleUrl: './server-dashboard.component.css'
})
export class ServerDashboardComponent implements OnInit {
  servers: Server[] = [];
  
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    this.loadServer();
  }

  loadServer(): void {
    this.loading = true;
    this.serverService.getServers().subscribe({
      next: (data) => {
        this.servers = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error occurred while loading servers. Please check if your Django backend is running!';
        this.loading = false;
      }
    });
  }

  deleteServer(id: number): void {
    if (confirm('Are you sure you want to delete this server?')) {
      this.serverService.deleteServer(id).subscribe({
        next: () => {
          this.servers = this.servers.filter(s => s.id !== id);
        },
        error: (err) => {
          alert('Error occurred while deleting the server!');
        }
      });
    }
  }
}