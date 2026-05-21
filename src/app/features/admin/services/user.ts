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

  // getProducts() {
  //   return this.http.get(`${this.apiUrl}/product`).pipe(delay(20000));
  // }

  updateUser(id: number, data: any) {
    return this.http.put(`http://localhost:3000/user/${id}`, data);
  }
}
