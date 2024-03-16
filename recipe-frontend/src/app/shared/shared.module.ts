import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderModule } from './loader/loader.module';



@NgModule({
  declarations: [
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    LoaderModule,
  ],
  exports: [
    LoaderModule
  ]
})
export class SharedModule { }
