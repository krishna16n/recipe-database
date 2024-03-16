import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit {

  user: any;
  recipes: any;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.initData();
  }

  getRecipesByUserId(userId: string) {
    const prom = this.recipesService.getRecipesByUserId(userId).toPromise();
    prom.then((data: any) => {
      if (data) {
        this.recipes = data;
      }
    }).catch(error => {
      alert("Invalid credentials")
    })
  }

  initData() {
    const user = localStorage.getItem('user');
    if (!user) {
      throw 'User not found'
    }
    this.user = JSON.parse(user);;
    this.getRecipesByUserId(this.user.id);
  }
}