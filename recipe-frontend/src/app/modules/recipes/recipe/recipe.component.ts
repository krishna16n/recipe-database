import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { FormAction } from './components/edit/edit.component';
import { User } from '../../../core/services/auth.service';

export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  id?: string;
  authorId?: string;
}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit {
  // The currently displayed recipe
  recipe: Recipe;
  // The editable recipe
  eRecipe: Recipe;
  // The action being performed on the recipe form
  action = FormAction.none;
  // Enum representing form actions
  enumFormAction = FormAction;
  // The currently logged-in user
  user: User;

  /**
   * Constructs the RecipeComponent.
   * @param recipesService - The service for managing recipe-related operations.
   * @param aRoute - The activated route service for retrieving route parameters.
   * @param dialog - The material dialog service for displaying confirmation dialogs.
   * @param route - The router service for navigation.
   */
  constructor(
    private recipesService: RecipesService,
    private aRoute: ActivatedRoute,
    public dialog: MatDialog,
    private route: Router,
  ) {
    // Retrieve the logged-in user from local storage
    this.user = JSON.parse(localStorage.getItem('user') as string);
  }

  /**
   * Initializes the component by retrieving recipe data.
   */
  ngOnInit(): void {
    this.initData();
  }

  /**
   * Retrieves the recipe data based on the route parameter.
   */
  getRecipe(userId: string) {
    const prom = this.recipesService.getRecipe(userId).toPromise();
    prom.then((data: any) => {
      if (data) {
        this.eRecipe = this.recipe = data;
      }
    }).catch(error => {
      alert(error)
    })
  }

  /**
   * Initializes data by retrieving recipe information.
   * Throws an error if recipe ID is not found in the route parameters.
   */
  initData() {
    const recipeId = this.aRoute.snapshot.params['id'];
    if (!recipeId) {
      throw 'Recipe id not found';
    }
    this.getRecipe(recipeId);
  }

  /**
   * Deletes the current recipe after confirming with the user.
   */
  delete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this recipe?' // You can pass any data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const prom = this.recipesService.deleteRecipe(this.recipe.id as string).toPromise();
        prom.then((data: any) => {
          if (data) {
            alert('Recipe deleted')
            this.route.navigateByUrl('/recipes');
          }
        }).catch(error => {
          alert(error)
        })
      } else {
        return null;
      }
    });
  }

  /**
   * Handles the cancellation of form actions.
   * Navigates to the recipe list if creating a new recipe, otherwise resets the form action.
   * @param action - The form action being cancelled.
   */
  handleCancel(action: FormAction): void {
    if (action === FormAction.create) {
      this.route.navigateByUrl('/recipes');
    }
    if (action === FormAction.update) {
      this.action = FormAction.none;
    }
  }

  /**
   * Checks if the current user is the author of the displayed recipe.
   * @returns True if the user is the author, otherwise false.
   */
  get isAuthor() {
    if (!this.user) return;
    return (this.user.id === this.recipe.authorId);
  }
}

