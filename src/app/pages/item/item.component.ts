import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  producto?: ProductoDescripcion;
  id?:string;

  constructor(private route:ActivatedRoute,public productoService:ProductosService) { }

  ngOnInit(){
    this.route.params.subscribe(params=>{
      console.log(params['id']);
      this.productoService.getProducto(params['id']).subscribe((producto:ProductoDescripcion)=>{
        this.id=params['id'];
        this.producto=producto;
        console.log(producto);
      });
    });
  }

}
