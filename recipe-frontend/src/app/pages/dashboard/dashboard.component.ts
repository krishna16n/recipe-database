import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private authService: AuthService) { }

  getit() {
    const prom = this.authService.getRecipes(null).toPromise();
    prom.then((data: any) => {
      console.log(data);
      // if (data.token) {
      //   localStorage.setItem('token', JSON.stringify(data));
      //   this.router.navigateByUrl('/dashboard');
      // }
    }).catch(error => {
      alert("Invalid credentials")
    })
  }
}
