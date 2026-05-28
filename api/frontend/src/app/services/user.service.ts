import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:3000';
  public usuarioSeleccionado: any;

  constructor(private http: HttpClient) { }
  getTodosLosUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/admin/usuarios`);
  }
  actualizarUsuario(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.API_URL}/usuario/${id}`, datos);
  }
}
