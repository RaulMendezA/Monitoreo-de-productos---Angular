import { Producto } from '../producto';
import { ProductosService } from '../productos.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.scss']
})
export class ProductosListaComponent implements OnInit {
  productos: Producto[];
  monitor: Producto[];
  monitorTemp: Producto[] = [];
  contMonitor: number;
  isInProductos: boolean;

  busqueda = "";
  activar = false;
  resBusqueda = this.productos;
  existencia = false;
  ordenar = false;
  ex3 = false;

  private subscript: Subscription;
  private subscriptMonitor: Subscription;

  constructor(private productosService: ProductosService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.productos = this.productosService.getProductos();
    this.monitor = this.productosService.getMonitor();
    this.monitorTemp = [];
    this.contMonitor = 0;
    this.isInProductos = true;

    if (this.router.url.match('products')) {
      this.isInProductos = true;
    } else {
      this.isInProductos = false;
      this.subscriptMonitor = this.productosService.cambiaProducto.
        subscribe((arregloProductos: Producto[]) => { this.monitor = arregloProductos; });
    }
    this.buscar();
  }

  addToMonitor(producto) {
    const pos = this.monitorTemp.findIndex(pro => pro.uid == producto.uid);
    if (pos < 0) {
      this.monitorTemp.push(Object.assign({}, producto));
      this.contMonitor++;
    } else {
      if (this.monitorTemp.length > 0) {
        this.contMonitor--;
        this.monitorTemp.splice(pos, 1);
      }
    }
  }

  sendToMonitor() {
    if (this.monitorTemp.length > 0) {
      this.monitorTemp.forEach(p => {
        if (!this.productosService.addToMonitor(this.productosService.getProducto(p.uid))) {
        }
      });
    }
  }

  detalleProducto(producto) {
    this.router.navigate([producto.uid], { relativeTo: this.activatedRoute });
  }

  /* editProducto(producto) {
    this.router.navigate([producto.uid], { relativeTo: this.activatedRoute });
    console.log("edit debugging") //sí lo llama pero abre detalle y no sé por qué ¿¿??
  } */
  editProducto(producto) {
    this.router.navigate([producto.uid + '/edit'], { relativeTo: this.activatedRoute });
  }

  borrarProducto(producto) {
    this.productosService.borrarProducto(producto.uid);
  }

  borrarProductoInv(producto) {
    this.productosService.borrarProductoInv(producto.uid);
  }

  activateButton() {
    this.activar = this.busqueda.length > 0;
  }

  onKeydown(event) {
    this.buscar();
  }

  buscar(): void {
    this.resBusqueda = this.productos.filter(o =>
      o.nombre.toUpperCase().includes(this.busqueda.toUpperCase()) || o.descripcion.toUpperCase().includes(this.busqueda.toUpperCase()) || o.marca.toUpperCase().includes(this.busqueda.toUpperCase())
    );
    console.log('Búsqueda test');
    console.log(this.resBusqueda);
  }
}
