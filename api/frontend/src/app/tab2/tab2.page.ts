import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 
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
    CommonModule, HttpClientModule, 
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol, IonIcon, 
    IonCardSubtitle, IonCardContent, IonLabel, IonList, IonItem,
    IonCard, IonCardHeader
  ]
})
export class Tab2Page implements OnInit {

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
    this.http.get<any[]>('https://separar-para-transformar.onrender.com/tabs/tab2').subscribe({
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