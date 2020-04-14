import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductEditComponent } from './productos/product-main/product-edit/product-edit.component';
import { ProductosListaComponent } from './productos/product-main/product-list/productos-lista.component';
import { ProductoDetalleComponent } from './productos/product-main/product-detail/producto-detalle.component';
import { ProductoItemComponent } from './productos/product-main/product-list/product-item/producto-item.component';
import { ProductMainComponent } from './productos/product-main/product-main.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductMainComponent,
    ProductosListaComponent,
    ProductoDetalleComponent,
    ProductoItemComponent,
    NotFoundComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
