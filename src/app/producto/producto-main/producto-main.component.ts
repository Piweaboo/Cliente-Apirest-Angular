import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { Producto } from '../interfaces/producto.interface';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-main',
  templateUrl: './producto-main.component.html',
  styleUrls: ['./producto-main.component.css']
})
export class ProductoMainComponent implements OnInit {

  productos:Producto[] = [];

  constructor(
    private servicio:ProductoService,
    public servicioUsuario:UsuarioService) { }

  ngOnInit(): void {

    this.servicio.mostrarProductos().subscribe(
      res=> {
        this.productos = res;
        console.log("Esto me devuelve: ",this.productos);
      }
    );
  }

  borrarProducto(producto:Producto){
    swal({
      title:"Está seguro?",
      text:`Seguro que desea eliminar al producto ${producto.nombre}`,
      type:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Si, eliminar!',
      cancelButtonText:'No, cancelar',
      confirmButtonClass:'btn btn-info',
      cancelButtonClass:'btn btn-danger',
      buttonsStyling:false,
      reverseButtons:true
    }).then((result)=>{
      if(result.value){
        this.servicio.borrarProducto(producto.id).subscribe(
          resp => {this.productos = this.productos.filter( cli => cli !== producto)
            swal('Producto eliminado',`Producto ${producto.nombre} ha sido eliminado con éxito`,'success');
            }
        )
      }
    });
  }



}
