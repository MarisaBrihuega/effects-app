import { cargarUsuario } from './../../store/actions/usuario.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { AppState } from 'src/app/store/app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit, OnDestroy {

  usuario: Usuario | null = null;
  loading: boolean = false;
  error: any = '';
  userSubscription: Subscription | undefined;

  constructor(private activateRoute: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('usuario').subscribe(({ user, loading, error }) => {
      this.usuario = user;
      this.loading = loading;
      this.error = error;
    });

    this.activateRoute.params.subscribe(params => { // tambien podría usar la desestructuración y poner: ({id}) en lugar de params
      this.store.dispatch(cargarUsuario({ id: params['id'] }));
    })
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}
