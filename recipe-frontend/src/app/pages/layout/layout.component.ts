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
  // Flag to indicate whether the navbar is collapsed or expanded
  isNavbarCollapsed = false;
  // Router instance for navigating between routes
  router = inject(Router);

  /**
   * Constructs the LayoutComponent.
   * @param authService - The service for managing authentication-related operations.
   */
  constructor(private authService: AuthService) { }

  /**
   * Toggles the navbar between collapsed and expanded states.
   */
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  /**
   * Signs out the currently authenticated user.
   * Clears local storage and navigates to the signin route upon successful signout.
   */
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

