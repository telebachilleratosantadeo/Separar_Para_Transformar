import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, 
  IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonList, IonItem, IonLabel, IonIcon, IonGrid, IonRow, IonCol, IonSpinner 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { leaf, sync, book, openOutline, bookOutline, beaker, 
  documentText, 
  wine, 
  closeCircle, 
  warning } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule, HttpClientModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, 
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonList, IonItem, IonLabel, IonIcon, IonGrid, IonRow, IonCol, IonSpinner
  ]
})
export class Tab2Page implements OnInit {
  enlaces: any[] = [];
  apiUrl = 'http://localhost:3000/enlaces';

  constructor(private http: HttpClient) {
    addIcons({ leaf, sync, book, openOutline, bookOutline, beaker, 'document-text': documentText, // Para que reconozca el guion medio
      wine, 
      'close-circle': closeCircle, 
      warning });
  }

  ngOnInit() {
    this.obtenerEnlaces();
  }

  obtenerEnlaces() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => { this.enlaces = data; },
      error: (err) => { console.error('Error cargando enlaces', err); }
    });
  }
}