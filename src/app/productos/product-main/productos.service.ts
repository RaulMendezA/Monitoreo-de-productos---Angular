import { Injectable } from '@angular/core';
import { Producto, Especificacion } from './producto';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  cambiaProducto = new Subject<Producto[]>();
  monitor: Producto[] = []; //monitored array
  private lastID = 0;

  productos: Producto[] = [
    new Producto(1, 'Surface pro 3', 'microsoft', 'Lorem ipsum, dolor sit amet consectetur', 12345, 69, [new Especificacion('RAM', '16', 'GB'), new Especificacion('OS', 'Windows 10', ''), new Especificacion('Screen', '5', 'inches'), new Especificacion('Rating', '5', 'stars')]),
    new Producto(2, 'Alienware 17', 'alienware', 'Lorem ipsum, dolor sit amet consectetur', 5999, 12, [new Especificacion('RAM', '8', 'GB'), new Especificacion('OS', 'Windows 98', ''), new Especificacion('Screen', '6', 'inches'), new Especificacion('Rating', '3', 'stars')]),
    new Producto(3, 'ROG', 'asus', 'Lorem ipsum, dolor sit amet consectetur', 1499, 5, [new Especificacion('RAM', '6', 'GB'), new Especificacion('OS', 'Windows 8', ''), new Especificacion('Screen', '15', 'inches'), new Especificacion('Rating', '4', 'stars')]),
    new Producto(4, 'Pixel 3', 'google', 'Lorem ipsum, dolor sit amet consectetur', 999, 8, [new Especificacion('RAM', '2', 'GB'), new Especificacion('OS', 'Windows 10', ''), new Especificacion('Screen', '7', 'inches'), new Especificacion('Rating', '5', 'stars')]),
    new Producto(5, 'Hydrogen One', 'red', 'phone', 6969, 69, [new Especificacion('RAM', '4', 'GB'), new Especificacion('OS', 'Windows 10', ''), new Especificacion('Screen', '8', 'inches'), new Especificacion('Rating', '2', 'stars')]),
    new Producto(6, 'Poco F1', 'pocophone', 'Lorem ipsum, dolor sit amet consectetur', 299, 13, [new Especificacion('RAM', '16', 'GB'), new Especificacion('OS', 'Windows 8', ''), new Especificacion('Screen', '9', 'inches'), new Especificacion('Rating', '3', 'stars')]),
    new Producto(7, 'Mi Note 9', 'xioami', 'Lorem ipsum, dolor sit amet consectetur', 199, 40, [new Especificacion('RAM', '8', 'GB'), new Especificacion('OS', 'Windows 98', ''), new Especificacion('Screen', '10', 'inches'), new Especificacion('Rating', '4', 'stars')]),
    new Producto(8, 'Galaxy S10 Plus', 'Samsung', 'Lorem ipsum, dolor sit amet consectetur', 1199, 8, [new Especificacion('RAM', '2', 'GB'), new Especificacion('OS', 'Windows 8', ''), new Especificacion('Screen', '11', 'inches'), new Especificacion('Rating', '1', 'stars')]),
    new Producto(9, '3310', 'nokia', 'Lorem ipsum, dolor sit amet consectetur', 59, 1, [new Especificacion('RAM', '2', 'GB'), new Especificacion('OS', 'Windows 10', ''), new Especificacion('Screen', '5', 'inches'), new Especificacion('Rating', '5', 'stars')]),
    new Producto(10, 'iMac', 'apple', 'Lorem ipsum, dolor sit amet consectetur', 4999, 8, [new Especificacion('RAM', '32', 'GB'), new Especificacion('OS', 'Windows 10', ''), new Especificacion('Screen', '5', 'inches'), new Especificacion('Rating', '1', 'stars')]),
    new Producto(11, 'Surface Studio', 'microsoft', 'Lorem ipsum, dolor sit amet consectetur', 3999, 1, [new Especificacion('RAM', '8', 'GB'), new Especificacion('OS', 'Windows 8', ''), new Especificacion('Screen', '17', 'inches'), new Especificacion('Rating', '1', 'stars')]),
    new Producto(12, 'Blade Pro', 'razer', 'Lorem ipsum, dolor sit amet consectetur', 1299, 1, [new Especificacion('RAM', '8', 'GB'), new Especificacion('OS', 'Windows xp', ''), new Especificacion('Screen', '9', 'inches'), new Especificacion('Rating', '2', 'stars')]),
  ];


  constructor() { }

  getNextID(): number { return this.lastID; }

  getProductos(): Producto[] { return this.productos.slice(); }

  getMonitor(): Producto[] { return this.monitor.slice(); }

  getProducto(id: number): Producto {
    const pos = this.productos.findIndex(p => p.uid === id);
    return Object.assign({}, this.productos[pos]);
  }

  addToMonitor(producto: Producto): boolean {
    const pos = this.monitor.findIndex(p => p.nombre === producto.nombre);
    if (pos < 0) {
      this.monitor.push(Object.assign({}, producto));
      this.notificarCambiosMonitor();
      return true;
    }
    return false;
  }

  notificarCambios() {
    this.cambiaProducto.next(this.productos.slice());
  }

  notificarCambiosMonitor() {
    this.cambiaProducto.next(this.monitor.slice());
  }

  borrarProducto(id: number): boolean {
    const pos = this.monitor.findIndex(p => p.uid == id);
    if (pos >= 0) {
      this.monitor.splice(pos, 1); //pop
      this.notificarCambiosMonitor();
      return true;
    }
    return false;
  }

  borrarProductoInv(id: number): boolean {
    const pos = this.productos.findIndex(p => p.uid == id);
    if (pos >= 0) {
      this.productos.splice(pos, 1);
      this.notificarCambios();
      return true;
    }
    return false;
  }
}
