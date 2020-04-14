import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { ProductosListaComponent } from './productos/product-main/product-list/productos-lista.component';
import { ProductoDetalleComponent } from './productos/product-main/product-detail/producto-detalle.component';
import { ProductMainComponent } from './productos/product-main/product-main.component';
import { ProductEditComponent } from './productos/product-main/product-edit/product-edit.component';
import { NotFoundComponent } from './not-found/not-found.component';



const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path: 'new', component: ProductEditComponent}, //testing
  {path:'products', component: ProductMainComponent, children:[
    {path:'', component: ProductosListaComponent},
    {path:':id', component: ProductoDetalleComponent},
    {path:':id/edit', component: ProductEditComponent},
    {path: 'new', component: ProductEditComponent} //no funciona, idk why?
  ]} ,
  {path:'monitoreo', component: ProductMainComponent, children:[
    {path:'', component: ProductosListaComponent},
    {path:':id/edit', component: ProductEditComponent},
    {path:':id', component: ProductoDetalleComponent},
  ]},
  {path: '**', component: NotFoundComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
