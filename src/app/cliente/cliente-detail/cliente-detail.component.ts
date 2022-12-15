import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../interfaces/cliente.interface';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styles: [
  ]
})
export class ClienteDetailComponent implements OnInit {

  cliente!:Cliente;
  fotoSeleccionada!:File;

  constructor( private servicioCliente:ClienteService,private activateRoute:ActivatedRoute,
    private usuarioService:UsuarioService,private router:Router) { }

  ngOnInit(): void {

    if(this.usuarioService.token == ""){
      swal("No esta autenticado","usuario no autenticado","info");
      this.router.navigate(['/login'])
    }else{

        this.activateRoute.paramMap.subscribe(
          params =>{

            let id:number = parseInt( params.get('id')! );
            if (id){
              this.servicioCliente.getCliente(id).subscribe(
                resp => {this.cliente = resp; console.log("detalle cliente:",this.cliente)}
              );
            }
          }

        );

    }

  }


  seleccionarImagen(event:any):void{
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }

  subirImagen():void{
    if(!this.fotoSeleccionada){
      swal("Error","Debe seleccionar una imagen","error");
    }else{
      this.servicioCliente.subirImagen(this.fotoSeleccionada,this.cliente.id).subscribe(
        event => {
          if (event.type === HttpEventType.Response){
              let response:any = event.body;
              this.cliente = response.cliente as Cliente;
              swal('La imagen se ha subido correctamente!',response.mensaje,'success');
          }
        }

      );
    }


  }



}
