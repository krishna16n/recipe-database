import { Component, Input } from '@angular/core';
import { Recipe } from '../../modules/recipes/recipe/recipe.component';

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  @Input() data: Recipe;
}
