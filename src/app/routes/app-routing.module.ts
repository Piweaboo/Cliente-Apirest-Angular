import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDetailComponent } from '../cliente/cliente-detail/cliente-detail.component';
import { ClienteFormComponent } from '../cliente/cliente-form/cliente-form.component';
import { ClienteMainComponent } from '../cliente/cliente-main/cliente-main.component';
import { ProductoFormComponent } from '../producto/producto-form/producto-form.component';
import { ProductoMainComponent } from '../producto/producto-main/producto-main.component';
import { LoginComponent } from '../usuario/login/login.component';

const routes: Routes = [

  {
    path:'',
    component:ClienteMainComponent,
    pathMatch:'full'
  },
  {
    path:'cliente/new',
    component:ClienteFormComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'cliente/edit/:id',
    component:ClienteFormComponent
  },
  {
    path:'producto',
    component: ProductoMainComponent
  },
  {
    path:'producto/new',
    component: ProductoFormComponent
  },
  {
    path:'producto/edit/:id',
    component: ProductoFormComponent
  },
  {
    path:'**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
