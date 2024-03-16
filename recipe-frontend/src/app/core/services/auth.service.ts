import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  signin(payload: any) {
    return this.http.post(`${this.apiUrl}/auth/signin`, payload, {
      withCredentials: true,
    })
  }

  getRecipes(payload: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

      withCredentials: true,
      observe: 'response' as 'response'
    };
    return this.http.get(`${this.apiUrl}/recipes`, {
      withCredentials: true
    }, );
  }
}