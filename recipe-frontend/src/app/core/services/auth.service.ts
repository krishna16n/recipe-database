import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserPayload } from '../../pages/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  signin(payload: UserPayload) {
    return this.http.post(`${this.apiUrl}/auth/signin`, payload)
  }

  signup(payload: UserPayload) {
    return this.http.post(`${this.apiUrl}/auth/signup`, payload)
  }

  signout(){
    return this.http.get(`${this.apiUrl}/auth/signout`);
  }

  getRecipes(payload: any) {
    return this.http.get(`${this.apiUrl}/recipes`);
  }
}