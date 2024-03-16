import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {

  }

  signin(payload: any) {
    return this.http.post(`${this.apiUrl}/auth/signin`, payload)
  }

  getRecipes(payload: any) {
    return this.http.get(`${this.apiUrl}/recipes`);
  }
}