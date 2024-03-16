import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../modules/recipes/recipes.service';
import { Recipe } from '../../modules/recipes/recipe/recipe.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.getAllRecipes();
  }

  getAllRecipes() {
    const prom = this.recipesService.getAllRecipes().toPromise();
    prom.then((data: any) => {
      if (data) {
        this.recipes = data;
      }
    }).catch(error => {
      alert("Invalid credentials")
    })
  }

}
