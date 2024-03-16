import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Recipe } from '../../recipe.component';
import { NgForm } from '@angular/forms';
import { RecipesService } from '../../../recipes.service';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(
    private recipesService: RecipesService,
  ) { }


  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Recipe saved:', this.recipe);
      const payload: Recipe = {
        title: this.recipe.title,
        description: this.recipe.description,
        ingredients: this.recipe.ingredients,
        instructions: this.recipe.instructions,
      }

      if (this.action === FormAction.create) this.createRecipe(payload);
      if (this.action === FormAction.update) this.updateRecipe(payload);
      this.action = FormAction.none;
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
      }
    }).catch(error => {
      alert(error)
    })
  }

  updateRecipe(payload: Recipe) {
    const prom = this.recipesService.updateRecipe(this.recipe.id as string, payload).toPromise();
    prom.then((data: any) => {
      if (data) {
        this.recipe = data;
        console.log(data);
      }
    }).catch(error => {
      alert(error)
    })
  }

  cancel() {
    this.actionEmitter.emit(true);
  }
}
