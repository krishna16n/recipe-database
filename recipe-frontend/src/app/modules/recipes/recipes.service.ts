import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe/recipe.component';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getRecipe(recipeId: string) {
    return this.http.get(`${this.apiUrl}/recipes/` + recipeId);
  }

  getAllRecipes() {
    return this.http.get(`${this.apiUrl}/recipes`);
  }

  getRecipesByUserId(userId: string) {
    return this.http.get(`${this.apiUrl}/recipes/user/` + userId);
  }

  createRecipe(payload: Recipe) {
    return this.http.post(`${this.apiUrl}/recipes/create/`, payload);
  }

  updateRecipe(recipeId: string, payload: Recipe) {
    return this.http.put(`${this.apiUrl}/recipes/` + recipeId, payload);
  }

  deleteRecipe(recipeId: string) {
    return this.http.delete(`${this.apiUrl}/recipes/` + recipeId);
  }
}
