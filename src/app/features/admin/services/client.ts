import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:3000';

  private http = inject(HttpClient);

  getClients() {
    return this.http.get(`${this.apiUrl}/client`);
  }

  createClient(clientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/client`, clientData);
  }

  updateClient(id: number, data: any) {
    return this.http.put(`http://localhost:3000/client/${id}`, data);
  }

  deleteClent(id: number) {
    return this.http.delete(`http://localhost:3000/client/${id}`);
  }
}
