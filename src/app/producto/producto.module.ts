import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoMainComponent } from './producto-main/producto-main.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductoFormComponent,
    ProductoMainComponent
  ],
  exports:[
    ProductoMainComponent,
    ProductoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ProductoModule { }
