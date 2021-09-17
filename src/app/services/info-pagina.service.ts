import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info.Pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina={};
  cargada=false;
  equipo:any[]=[];

  constructor(private http:HttpClient) {
    //leer archivo json
    this.cargarInfo();
    this.cargarEquipo();
   }
   private cargarInfo(){
     //leer archivo json
    this.http.get('assets/data/data-pagina.json').subscribe((resp:InfoPagina)=>{
      this.cargada=true;
      this.info=resp;
    });
   }
   private cargarEquipo(){
     //leer archivo json
    this.http.get('https://sj38-1565552456225.firebaseio.com/equipo.json').subscribe((resp:any)=>{
      this.equipo=resp;
    });
   }
}
