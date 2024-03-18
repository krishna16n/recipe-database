import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.component';
import { NgForm } from '@angular/forms';
import { RecipesService } from '../../../recipes.service';
import { Router } from '@angular/router';
import { User } from '../../../../../core/services/auth.service';

export enum FormAction {
  none = 0,
  create = 1,
  update = 2,
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  /** Input property to receive the recipe to edit or create. */
  @Input() recipe: Recipe;
  /** Input property to specify the action (create or edit) to perform. */
  @Input() action: FormAction;
  /** Output event emitter for emitting actions. */
  @Output() actionEmitter = new EventEmitter();

  /** User object obtained from local storage. */
  user: User;

  /** Returns true if the action is to create a new recipe, false otherwise. */
  get isCreate() {
    return !!(this.action == FormAction.create);
  }

  /** Returns the title of the edit component based on the action (create or edit). */
  get title() {
    return (this.isCreate) ? 'Create' : 'Edit';
  }

  /**
   * Constructs the EditComponent.
   * Initializes the recipe and user objects.
   * Retrieves the user from local storage.
   * @param recipesService - The service for managing recipes.
   * @param route - The router service for navigation.
   */
  constructor(
    private recipesService: RecipesService,
    private route: Router,
  ) {
    // Initialize recipe object
    this.recipe = {
      title: '',
      description: '',
      ingredients: [''],
      instructions: '',
    };

    // Retrieve user from local storage
    this.user = JSON.parse(localStorage.getItem('user') as string);
  }

  /**
   * Handles form submission.
   * Saves or updates the recipe based on the action.
   * @param form - The form containing recipe details.
   */
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Recipe saved:', this.recipe);

      const payload: Recipe = {
        title: this.recipe.title,
        description: this.recipe.description,
        ingredients: this.recipe.ingredients,
        instructions: this.recipe.instructions,
        authorId: this.user.id,
      };

      // Perform appropriate action based on the form action
      if (this.action === FormAction.create) this.createRecipe(payload);
      if (this.action === FormAction.update) this.updateRecipe(payload);
    } else {
      // Handle form validation errors
      console.log('Form validation failed.');
    }
  }

  /**
   * Creates a new recipe.
   * @param payload - The recipe data to be created.
   */
  createRecipe(payload: Recipe) {
    const prom = this.recipesService.createRecipe(payload).toPromise();
    prom.then((data: any) => {
      if (data) {
        this.recipe = data;
        console.log(data);
        this.action = FormAction.none;
        this.route.navigateByUrl('/recipes');
      }
    }).catch(error => {
      // Display error message if creation fails
      alert(error.error.message[0]);
    });
  }

  /**
   * Updates an existing recipe.
   * @param payload - The updated recipe data.
   */
  updateRecipe(payload: Recipe) {
    const prom = this.recipesService.updateRecipe(this.recipe.id as string, payload).toPromise();
    prom.then((data: any) => {
      if (data) {
        this.recipe = data;
        console.log(data);
        this.action = FormAction.none;
        this.route.navigateByUrl('/recipes');
      }
    }).catch(error => {
      // Display error message if update fails
      alert(error.error.message[0]);
    });
  }

  /**
   * Cancels the current action and emits the action event.
   */
  cancel() {
    this.actionEmitter.emit(this.action);
  }
}
