import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UserPayload } from '../../pages/login/login.component';

export interface User {
  email: string;
  password: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Base API URL
  private apiUrl = 'http://localhost:3000';

  /**
   * Constructs the AuthService.
   * @param http - The HTTP client for making requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Sends a POST request to sign in a user.
   * @param payload - The user payload containing credentials.
   * @returns An observable of the HTTP response.
   */
  signin(payload: UserPayload) {
    return this.http.post(`${this.apiUrl}/auth/signin`, payload);
  }

  /**
   * Sends a POST request to sign up a user.
   * @param payload - The user payload containing credentials.
   * @returns An observable of the HTTP response.
   */
  signup(payload: UserPayload) {
    return this.http.post(`${this.apiUrl}/auth/signup`, payload);
  }

  /**
   * Sends a GET request to sign out the currently authenticated user.
   * @returns An observable of the HTTP response.
   */
  signout() {
    return this.http.get(`${this.apiUrl}/auth/signout`);
  }

  /**
   * Sends a GET request to retrieve recipes.
   * @returns An observable of the HTTP response.
   */
  getRecipes() {
    return this.http.get(`${this.apiUrl}/recipes`);
  }
}