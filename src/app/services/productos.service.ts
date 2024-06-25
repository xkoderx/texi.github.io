import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }
  private cargarProductos() {
    return new Promise<void>((resolve, reject) => {
      this.http.get('https://sj38-1565552456225.firebaseio.com/productos_idx.json').subscribe((resp: any) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
  }
  getProducto(id: string) {
    return this.http.get(`https://sj38-1565552456225.firebaseio.com/productos/${id}.json`);
  }
  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      //cargar productos
      this.cargarProductos().then(() => {
        //ejecutar despues de tener filtro
        //aplicar filtro
        this.flitrarProductos(termino);
      });
    } else {
      //aplicar el filtro
      this.flitrarProductos(termino);
    }
  }
  private flitrarProductos(termino: string) {
    // console.log(this.productos);
    //purgar el arreglo
    this.productosFiltrado=[];
    termino=termino.toLocaleLowerCase();
    this.productos.forEach(prod=>{
      const tituloLower=prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino)>=0 || tituloLower.indexOf(termino)>=0){
        this.productosFiltrado.push(prod);
      }
    });
  }
}
