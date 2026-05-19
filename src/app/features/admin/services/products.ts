import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.apiUrl}/product`);
  }

  // getProducts() {
  //   return this.http.get(`${this.apiUrl}/product`).pipe(delay(20000));
  // }

  createProduct(clientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/product`, clientData);
  }

  updateProduct(id: number, data: any) {
    return this.http.put(`http://localhost:3000/product/${id}`, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/product/${id}`);
  }
}
