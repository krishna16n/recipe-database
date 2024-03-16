import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { SharedModule } from '../../shared/shared.module';
import { RecipesService } from './recipes.service';
import { RouterModule, Routes } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { RecipeComponent } from './recipe/recipe.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { EditComponent } from './recipe/components/edit/edit.component';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path: ':id', component: RecipeComponent },
  { path: 'create', component: RecipeComponent }
];

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [RecipesService]
})
export class RecipesModule { }
