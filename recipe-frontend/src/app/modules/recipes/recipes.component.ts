import { Component, OnInit } from '@angular/core';
import { RecipesService } from './recipes.service';
import { User } from '../../core/services/auth.service';
import { Recipe } from './recipe/recipe.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit {
  // The currently logged-in user
  user: User;
  // Array of recipes associated with the user
  recipes: Recipe[];

  /**
   * Constructs the RecipesComponent.
   * @param recipesService - The service for managing recipe-related operations.
   */
  constructor(private recipesService: RecipesService) { }

  /**
   * Initializes the component by retrieving user data and associated recipes.
   */
  ngOnInit(): void {
    this.initData();
  }

  /**
   * Retrieves recipes associated with the specified user ID.
   * @param userId - The ID of the user whose recipes are to be retrieved.
   */
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

  /**
   * Initializes data by retrieving user information and associated recipes.
   * Throws an error if user data is not found in local storage.
   */
  initData() {
    const user = localStorage.getItem('user');
    if (!user) {
      throw 'User not found';
    }
    this.user = JSON.parse(user);
    this.getRecipesByUserId(this.user.id);
  }
}

