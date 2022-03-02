import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from "../actions";


@Injectable({
    providedIn: 'root'
})
export class UsuariosEffects {

    constructor(private actions$: Actions,
        private usuarioService: UsuarioService) { }

    // 1. Escuchamos la accion
    // 2. Mostramos la info 
    // 3. Unimos el nuevo observable a la solicitud anterior
    cargarUsuarios$ = createEffect( // lo primero que recibe es un callback que regresa un observable
        // es necesario indicar que esté pendiente de una acción en particular; en el momento que se llame dicha acción, se disparará este efecto
        () => this.actions$.pipe(
            ofType(cargarUsuarios), // 1.escuchamos la acción
            // 2.mostramos info
            // tap(data => console.log('effect tap ', data)), 
            mergeMap( // 3.unimos el nuevo observable al resto de la solicitud
                // mergeMap nos permite disparar un nuevo observable (encargado de obtener la información) y mezclarlo con el observable anterior
                // necesita un callback (que es el observable que voy a disparar)    
                () => this.usuarioService.getUsers()
                    .pipe(
                        // tap(data => console.log('getUsers effect', data))
                        // DISPARAMOS LA ACCIÓN que permitirá crear un nuevo estado
                        map(users => cargarUsuariosSuccess({ usuarios: users })),
                        catchError(error => of(cargarUsuariosError({ payload: error }))) // atrapa cualquier error que suceda en la petición
                        // el efecto debe regresar un observable, y el catchError no devuelve un observable, por lo que utilizaremos of()
                    )
            )
        )
    );
}