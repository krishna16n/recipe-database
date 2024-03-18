import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

export interface UserPayload {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // Data object containing user credentials
  data: UserPayload = {
    email: '',
    password: ''
  };
  // Router instance for navigating between routes
  router = inject(Router);

  /**
   * Constructs the LoginComponent.
   * @param authService - The service for managing authentication-related operations.
   */
  constructor(private authService: AuthService) { }

  /**
   * Initiates the signin process using provided credentials.
   * Upon successful signin, stores user information in local storage and navigates to the dashboard.
   */
  signin() {
    const signinPromise = this.authService.signin(this.data).toPromise();
    signinPromise.then((data: any) => {
      console.log(data);
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        this.router.navigateByUrl('/dashboard');
      }
    }).catch(error => {
      alert("Invalid credentials")
    })
  }
}
