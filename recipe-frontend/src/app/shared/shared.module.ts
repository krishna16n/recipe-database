import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderModule } from './loader/loader.module';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    RecipeCardComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    LoaderModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    MatDividerModule
  ],
  exports: [
    LoaderModule,
    RecipeCardComponent
  ]
})
export class SharedModule { }
