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
  data: UserPayload = {
    email: '',
    password: ''
  };

  router = inject(Router);

  constructor(private authService: AuthService) { }

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
