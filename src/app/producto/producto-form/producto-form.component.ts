import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { Producto } from '../interfaces/producto.interface';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  productoNew:Producto = {
    id:0,
    nombre:''
  };

  public id!:string|null;

  constructor(
    private servicio:ProductoService,
    private router:Router,
    private usuarioService:UsuarioService,
    private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {

    if(this.usuarioService.token == ""){
      swal("No esta autenticado","usuario no autenticado","info");
      this.router.navigate(['/login'])
    }else{
      this.activateRoute.paramMap.subscribe(
        params => {
         this.id =  params.get('id');
         if(this.id){
          this.servicio.mostrarProducto( parseInt(this.id) ).subscribe(
            resp => {this.productoNew = resp }
          );
         }
        }
      );
    }
  }

  guardarProducto():void{

    this.servicio.guardarProducto( this.productoNew ).subscribe(
      resp=> {
        console.log("esto responde",resp);
        swal("Nuevo Producto",`${this.productoNew.nombre} creado con éxito`,'success');
        this.router.navigate(['']);
      },
      error=> {
        console.log("error: ",error);
        swal("Error",`error al crear cliente ${error.status}`,'error');
      }

    )
  }

  editarProducto():void{
    console.log("esto edita",this.productoNew);
    this.servicio.actualizarProducto( this.productoNew ).subscribe(
      resp=> {
        console.log("esto responde",resp);
        swal("Producto editado",`${this.productoNew.nombre} editado con éxito`,'success');
        this.router.navigate(['']);
      },
      error=> {
        console.log("error: ",error);
        swal("Error",`error al editar cliente ${error.status}`,'error');
      }

    )
  }

}
