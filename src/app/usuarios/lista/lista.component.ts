import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(public usuariosService: UsuarioService) { }

  ngOnInit(): void {
    this.usuariosService.getUsers().subscribe(data => {
      console.log(data);
      this.usuarios = data;
    })
  }

}
