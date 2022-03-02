import { UsuarioService } from 'src/app/services/usuario.service';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from './../actions/usuario.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioEffects {

    constructor(private actions$: Actions,
        private userService: UsuarioService) { }

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType(cargarUsuario),
            mergeMap(
                (action) => this.userService.getUserById(action.id)
                    .pipe(
                        map(user => cargarUsuarioSuccess({ usuario: user })),
                        catchError(error => of(cargarUsuarioError({ payload: error })))
                    )
            )
        )
    );
}