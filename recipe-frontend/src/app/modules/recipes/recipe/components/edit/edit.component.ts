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

  @Input() recipe: Recipe;
  @Input() action: FormAction;

  @Output() actionEmitter = new EventEmitter();

  user: User;

  get isCreate() {
    return !!(this.action == FormAction.create);
  }

  get title() {
    return (this.isCreate) ? 'Create' : 'Edit';
  }

  constructor(
    private recipesService: RecipesService,
    private route: Router,
  ) {
    this.recipe = {
      title: '',
      description: '',
      ingredients: [''],
      instructions: '',
    }

    this.user = JSON.parse(localStorage.getItem('user') as string);
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Recipe saved:', this.recipe);

      const payload: Recipe = {
        title: this.recipe.title,
        description: this.recipe.description,
        ingredients: this.recipe.ingredients,
        instructions: this.recipe.instructions,
        authorId: this.user.id,
      }

      if (this.action === FormAction.create) this.createRecipe(payload);
      if (this.action === FormAction.update) this.updateRecipe(payload);
    } else {
      // Handle form validation errors
      console.log('Form validation failed.');
    }
  }

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
      alert(error.error.message[0])
    })
  }

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
      alert(error.error.message[0])
    })
  }

  cancel() {
    this.actionEmitter.emit(this.action);
  }
}
