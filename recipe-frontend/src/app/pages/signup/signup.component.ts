import { Component, inject } from '@angular/core';
import { UserPayload } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  // Data object containing user signup information
  data: UserPayload = {
    email: '',
    password: ''
  };
  // Router instance for navigating between routes
  router = inject(Router);

  /**
   * Constructs the SignupComponent.
   * @param authService - The service for managing authentication-related operations.
   */
  constructor(private authService: AuthService) { }

  /**
   * Initiates the signup process using provided user information.
   * Upon successful signup, displays a success message, and navigates to the signin page.
   */
  signup() {
    const signinPromise = this.authService.signup(this.data).toPromise();
    signinPromise.then((data: any) => {
      console.log(data);
      if (data) {
        alert('Sign up successful')
        this.router.navigateByUrl('/signin');
      }
    }).catch(error => {
      alert(error.error.message)
    })
  }
}

