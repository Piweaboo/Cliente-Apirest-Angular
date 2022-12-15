import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  user_name!:string;
  constructor(public service:UsuarioService, private router:Router) { }


  cerrarSesion():void{
    this.user_name = this.service.usuario.username;

    this.service.logout();
    swal('Logout',`${this.user_name}, has cerrado sesión con éxito`,'success');

    this.router.navigate(['/login']);

  }


  ngOnInit(): void {

  }

}
