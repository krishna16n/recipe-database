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
  data: UserPayload = {
    email: '',
    password: ''
  };

  router = inject(Router);

  constructor(private authService: AuthService) { }

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
