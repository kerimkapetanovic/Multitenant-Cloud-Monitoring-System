import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TenantService } from '../core/services/tenant';
export interface Server {
  id: number;
  name: string;
  ip_address: string;
  status: 'Online' | 'Offline' | 'Warning';
  cpu_usage?: number;
  ram_usage?: number;
  last_ping: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private get apiUrl(): string {
    return this.tenantService.getApiUrl('api/servers/');
  }

  constructor(
    private http: HttpClient,
    private tenantService: TenantService
  ) { }

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