import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  createUser(UserData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, UserData);
  }

  updateEmployees(id: number, data: any) {
    return this.http.put(`http://localhost:3000/employees/${id}`, data);
  }

  deleteEmployees(id: number) {
    return this.http.delete(`http://localhost:3000/user/${id}`);
  }
}
