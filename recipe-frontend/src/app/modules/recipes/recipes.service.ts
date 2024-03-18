import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe/recipe.component';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  // Base API URL
  private apiUrl = 'http://localhost:3000';

  /**
   * Constructs the RecipesService.
   * @param http - The HTTP client for making requests.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves a specific recipe by its ID.
   * @param recipeId - The ID of the recipe to retrieve.
   * @returns An observable of the HTTP response.
   */
  getRecipe(recipeId: string) {
    return this.http.get(`${this.apiUrl}/recipes/` + recipeId);
  }

  /**
   * Retrieves all recipes.
   * @returns An observable of the HTTP response.
   */
  getAllRecipes() {
    return this.http.get(`${this.apiUrl}/recipes`);
  }

  /**
   * Retrieves recipes associated with a specific user.
   * @param userId - The ID of the user whose recipes are to be retrieved.
   * @returns An observable of the HTTP response.
   */
  getRecipesByUserId(userId: string) {
    return this.http.get(`${this.apiUrl}/recipes/user/` + userId);
  }

  /**
   * Creates a new recipe.
   * @param payload - The recipe data to be created.
   * @returns An observable of the HTTP response.
   */
  createRecipe(payload: Recipe) {
    return this.http.post(`${this.apiUrl}/recipes/create/`, payload);
  }

  /**
   * Updates an existing recipe.
   * @param recipeId - The ID of the recipe to update.
   * @param payload - The updated recipe data.
   * @returns An observable of the HTTP response.
   */
  updateRecipe(recipeId: string, payload: Recipe) {
    return this.http.put(`${this.apiUrl}/recipes/` + recipeId, payload);
  }

  /**
   * Deletes a recipe.
   * @param recipeId - The ID of the recipe to delete.
   * @returns An observable of the HTTP response.
   */
  deleteRecipe(recipeId: string) {
    return this.http.delete(`${this.apiUrl}/recipes/` + recipeId);
  }
}

