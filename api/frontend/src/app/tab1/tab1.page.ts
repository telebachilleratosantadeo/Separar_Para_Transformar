import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonItem,
  IonLabel, IonSelect, IonSelectOption, IonInput, IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline, imageOutline, leafOutline, saveOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent, IonItem,
    IonLabel, IonSelect, IonSelectOption, IonInput, IonButton,
    IonIcon
  ]
})
export class Tab1Page {
  
  material: number | 'otro' | null = null;
  otroMaterial: string = '';
  cantidad: number | null = null;
  fotoBase64: string | undefined = undefined;
  fechaRegistro: string = new Date().toISOString().split('T')[0];

API = 'https://separar-para-transformar.onrender.com';

  constructor(
    private toastController: ToastController,
    private http: HttpClient
  ) {
    addIcons({ cameraOutline, imageOutline, leafOutline, saveOutline });
  }

  obtenerPlaceholderCantidad(): string {
    if (this.material === 1) return 'Ej. 2 kg de Plástico';
    if (this.material === 2) return 'Ej. 5 botellas de Vidrio';
    if (this.material === 3) return 'Ej. 3 kg de Papel';
    if (this.material === 4) return 'Ej. 1 kg de Orgánico';
    return 'Ingresa la cantidad';
  }
  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });
      this.fotoBase64 = image.base64String || undefined;
    } catch (error) {
      console.error('Error cámara', error);
    }
  }

  async elegirDeGaleria() {
    try {
      const image = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos
      });
      this.fotoBase64 = image.base64String || undefined;
    } catch (error) {
      console.error('Error galería', error);
    }
  }
  async registrarReciclaje() {
    if (!this.material || !this.cantidad || this.cantidad <= 0) {
      this.mostrarMensaje('Completa material y cantidad válidos', 'warning');
      return;
    }

    if (this.material === 'otro' && !this.otroMaterial.trim()) {
      this.mostrarMensaje('Especifica el material en "Otro"', 'warning');
      return;
    }

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (!usuario.id) {
      this.mostrarMensaje('Inicia sesión para registrar', 'danger');
      return;
    }

    const datos = {
      residuo_id: this.material === 'otro' ? null : this.material,
      cantidad: this.cantidad,
      usuario_id: usuario.id,
      otro_material: this.material === 'otro' ? this.otroMaterial.trim() : null,
      foto: this.fotoBase64 || null,
      fecha: this.fechaRegistro 
    };

    
    this.http.post(`${this.API}/reciclaje`, datos).subscribe({
      next: () => {
        this.mostrarMensaje('✅ Registro guardado en San Tadeo', 'success');
        this.resetearFormulario();
      },
      error: (err) => {
        console.error('Error al guardar:', err);
        this.mostrarMensaje('❌ Error de conexión al servidor', 'danger');
      }
    });
  }

  resetearFormulario() {
    this.material = null;
    this.otroMaterial = '';
    this.cantidad = null;
    this.fotoBase64 = undefined;
  }

  async mostrarMensaje(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }
}