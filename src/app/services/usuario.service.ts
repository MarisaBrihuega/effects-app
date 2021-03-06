import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.url}/users?per_page=6&delay=3`)
      .pipe(
        map((info: any) => info['data']) // es lo mismo que poner return info['data']
      );
  }

  getUserById(id: number) {
    return this.http.get(`${this.url}/users/${id}`)
      .pipe(
        map((info: any) => info['data'])
      );
  }
}
