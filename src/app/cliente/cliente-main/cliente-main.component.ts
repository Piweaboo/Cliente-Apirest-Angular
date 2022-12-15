import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../interfaces/cliente.interface';

@Component({
  selector: 'app-cliente-main',
  templateUrl: './cliente-main.component.html',
  styleUrls: ['./cliente-main.component.css']
})
export class ClienteMainComponent implements OnInit {

  clientes:Cliente[]=[];
  imagenSrc!:string;

  constructor(private servicio:ClienteService, public servicioUsuario:UsuarioService) { }

  ngOnInit(): void {

    this.imagenSrc = 'assets/avatar.png';

    this.servicio.mostrarCliente().subscribe(
      resp => { this.clientes=resp ;console.log("Esto me responde"+this.clientes)}
    );

  }

  borrarCliente(cliente:Cliente):void{
    swal({
      title:"Está seguro?",
      text:`Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
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
        this.servicio.delete(cliente.id).subscribe(
          resp => {this.clientes = this.clientes.filter( cli => cli !== cliente)
            swal('Cliente eliminado',`Cliente ${cliente.nombre} ha sido eliminado con éxito`,'success');
            }
        )
      }
    });
  }

}
