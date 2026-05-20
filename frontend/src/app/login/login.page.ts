import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonInput, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, HttpClientModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonItem, IonInput, IonButton
  ]
})
export class LoginPage {
  login = { curp: '', password: '' };
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  iniciarSesion() {
  this.http.post<any>(`${this.apiUrl}/login`, this.login).subscribe({
    next: (res) => {
      // Si tu API devuelve un 200 pero manejas una propiedad .success dentro del JSON
      if (res.success) {
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
      } else {
        alert('❌ CURP o contraseña incorrectos');
      }
    },
    error: (err) => {
      // 💡 Aquí atrapamos el error y revisamos su código de estado HTTP
      if (err.status === 401) {
        alert('❌ Credenciales inválidas: CURP o contraseña incorrectos');
      } else if (err.status === 0) {
        alert('❌ No se pudo conectar con el servidor. Verifica tu internet o si la API está encendida.');
      } else {
        alert(`❌ Error inesperado (${err.status}): ${err.message}`);
      }
    }
  });
  }
} 