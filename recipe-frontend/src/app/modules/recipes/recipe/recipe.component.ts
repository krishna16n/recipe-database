import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { FormAction } from './components/edit/edit.component';

export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  id?: string
}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit {
  recipe: any;
  eRecipe: any;
  action: FormAction;
  enumFormAction = FormAction;

  constructor(
    private recipesService: RecipesService,
    private aRoute: ActivatedRoute,
    public dialog: MatDialog,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.initData();
  }

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

  initData() {
    const recipeId = this.aRoute.snapshot.params['id'];
    if (!recipeId) {
      throw 'Recipe id not found'
    }
    this.getRecipe(recipeId);
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this recipe?' // You can pass any data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const prom = this.recipesService.deleteRecipe(this.recipe.id).toPromise();
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

  handleAction(): void {
    this.action = FormAction.none;
  }
}
