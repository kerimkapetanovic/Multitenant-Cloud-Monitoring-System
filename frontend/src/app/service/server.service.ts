import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Server {
  id: number;
  name: string;
  ip_address: string;
  status: 'Online' | 'Offline' | 'Warning';
  last_ping: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    const currentHost = window.location.hostname; 
    
    if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
      this.apiUrl = 'http://firma-a.localhost:8000/api/servers/';
    } else {
      const tenant = currentHost.split('.')[0];
      
      if (currentHost.includes('localhost')) {
        this.apiUrl = `http://${tenant}.localhost:8000/api/servers/`;
      } else {
        this.apiUrl = `https://${currentHost}/api/servers/`;
      }
    }
  }

  getServers(): Observable<Server[]> {
    return this.http.get<Server[]>(this.apiUrl);
  }

  addServer(server: Partial<Server>): Observable<Server> {
    return this.http.post<Server>(this.apiUrl, server);
  }

  deleteServer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}