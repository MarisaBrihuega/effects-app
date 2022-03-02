import { cargarUsuarios } from './../../store/actions/usuarios.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AppState } from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;
  usersSubscription: Subscription | undefined;


  constructor(/*public usuariosService: UsuarioService*/
    private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.usuariosService.getUsers().subscribe(data => {
    //   console.log(data);
    //   this.usuarios = data;
    // });
    this.store.select('usuarios').subscribe(({ users, loading, error }) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });

    this.store.dispatch(cargarUsuarios());
  }

  ngOnDestroy(): void {
    this.usersSubscription?.unsubscribe();
  }
}
