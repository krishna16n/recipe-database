import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  isNavbarCollapsed = false;
  router = inject(Router);

  constructor(private authService: AuthService) { }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }


  signout() {
    const signinPromise = this.authService.signout().toPromise();
    signinPromise.then((data: any) => {
      if (data) {
        localStorage.clear();
        this.router.navigateByUrl('/signin');
      }
    }).catch(error => {
      alert(error)
    })
  }
}
