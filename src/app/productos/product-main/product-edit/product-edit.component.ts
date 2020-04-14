import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Producto } from '../producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../productos.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  id: number;
  producto: Producto;
  isInEdit: boolean;
  productos: Producto[];
  productoNuevo = {
    uid: "",
    nombre: "",
    marca: "",
    descripcion: "",
    precio: "",
    existencia: "",
    especificacion: [{}]
  };

  @ViewChild('f') form: NgForm;

  constructor(private route: ActivatedRoute,
    private productoService: ProductosService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isInEdit = this.router.url.match('edit') ? true : false;
    console.log("estás en edit?: " + this.isInEdit);

    this.productos = this.productoService.getProductos();
    console.log(this.productos);

    this.route.params.subscribe(
      (params) => {
        this.id = Number(params.id);
        this.producto = this.productoService.getProducto(this.id);
      }
    );
  }
  cancelar() { this.location.back(); }
  rout() {
    this.router.navigate(['/new'], { relativeTo: this.activatedRoute });
  }


  validoTodo(): boolean {
    return this.nombreCorrecto() && this.form.valid;
  }

  procesarFormulario(form: NgForm) {
    console.log('aquí se guardan los datos procesados');
  }


  nombreCorrecto(): boolean {

    if (this.productoNuevo.nombre.length >= 2) {
      return true;
    }
    return false;
  }

  editar() {
    this.productoNuevo = {
      uid: "00",
      nombre: "00",
      marca: "00",
      descripcion: "00",
      precio: "00",
      existencia: "00",
      especificacion: [{}]
    }
  }

}
