import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importante para la API
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonIcon, 
  IonCardSubtitle, IonCardContent, IonLabel, IonList, IonItem,
  IonCard, IonCardHeader 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  leaf, beaker, documentText, wine, 
  warning, bookOutline, openOutline, closeCircle 
} from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule, HttpClientModule, // Asegúrate de que estén aquí
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonIcon, 
    IonCardSubtitle, IonCardContent, IonLabel, IonList, IonItem,
    IonCard, IonCardHeader
  ]
})
export class Tab2Page implements OnInit {
  // Arreglo donde se guardarán los enlaces de la BD
  enlaces: any[] = [];

  constructor(private http: HttpClient) {
    addIcons({ 
      leaf, beaker, wine, warning, 
      'document-text': documentText, 
      'close-circle': closeCircle,
      'book-outline': bookOutline, 
      'open-outline': openOutline 
    });
  }

  ngOnInit() {
    this.obtenerEnlaces();
  }

  obtenerEnlaces() {
    // Cambia esta URL por la de tu endpoint real (ej: http://localhost:3000/enlaces)
    this.http.get<any[]>('http://localhost:3000/enlaces').subscribe({
      next: (data) => {
        this.enlaces = data;
        console.log('Enlaces cargados:', this.enlaces);
      },
      error: (err) => {
        console.error('Error al obtener enlaces de la BD:', err);
      }
    });
  }
}