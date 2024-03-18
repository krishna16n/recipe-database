import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../modules/recipes/recipes.service';
import { Recipe } from '../../modules/recipes/recipe/recipe.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  // Array of recipes to be displayed on the dashboard
  recipes: Recipe[];

  /**
   * Constructs the DashboardComponent.
   * @param recipesService - The service for managing recipe-related operations.
   */
  constructor(private recipesService: RecipesService) { }

  /**
   * Initializes the component by retrieving recipe data.
   */
  ngOnInit(): void {
    this.initData();
  }

  /**
   * Initializes data by retrieving all recipes.
   */
  initData() {
    this.getAllRecipes();
  }

  /**
   * Retrieves all recipes from the server.
   */
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

