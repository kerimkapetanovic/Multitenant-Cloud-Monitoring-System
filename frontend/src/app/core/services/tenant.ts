import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private currentTenant: string = 'public';
  private backendBaseUrl: string = 'http://localhost:8000';

  constructor() {
    this.determineTenant();
  }

  private determineTenant(): void {
    const hostname = window.location.hostname; // npr. "firma-a.localhost" ili "localhost"
    const parts = hostname.split('.');

    // Ako imamo poddomen (npr. "firma-a.localhost" ima 2 dijela u lokalnom razvoju)
    if (parts.length > 1 && parts[0] !== 'localhost' && parts[0] !== 'www') {
      this.currentTenant = parts[0];
      this.backendBaseUrl = `http://${this.currentTenant}.localhost:8000`;
    } else {
      this.currentTenant = 'public';
      this.backendBaseUrl = 'http://localhost:8000';
    }

    console.log(`[TenantService] Detektovan tenant: ${this.currentTenant}`);
    console.log(`[TenantService] Backend URL postavljen na: ${this.backendBaseUrl}`);
  }

  getTenantName(): string {
    return this.currentTenant;
  }

  getApiUrl(endpoint: string): string {
    // Čisti kose crte da ne dobijemo duple (npr. //api/)
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    return `${this.backendBaseUrl}/${cleanEndpoint}`;
  }
}