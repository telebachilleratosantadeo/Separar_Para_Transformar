import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// --- AGREGADO PARA LA GRÁFICA ---
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
// --------------------------------

// Ionic
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonItem, IonLabel,
  IonInput, IonButton, IonButtons, IonBackButton, IonIcon, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonList, IonSegment,
  IonSegmentButton, IonSegmentContent, IonSegmentView, IonInfiniteScroll,
  IonInfiniteScrollContent, IonGrid, IonRow, IonCol, IonBadge
} from '@ionic/angular/standalone';

// Íconos
import { addIcons } from 'ionicons';
import { 
  personOutline, idCardOutline, mailOutline, callOutline, 
  keyOutline, createOutline, saveOutline, closeOutline,
  cameraOutline, documentTextOutline, statsChartOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, HttpClientModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonAvatar, IonItem, IonLabel, IonInput, IonButton, IonButtons,
    IonBackButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonList, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView,
    IonInfiniteScroll, IonInfiniteScrollContent, IonGrid, IonRow, IonCol, IonBadge
  ]
})
export class Tab5Page implements OnInit {

  usuario: any = null;
  usuarioOriginal: any = null;
  modoEdicion: boolean = false;

  reciclajes: any[] = [];
  reciclajesMostrados: any[] = [];
  estadisticas: any[] = []; // Personales
  estadisticasGlobales: any[] = []; // Reporte del plantel
  estadisticasMostradas: any[] = [];

  materiales: { [key: number]: string } = {
    1: 'Plástico',
    2: 'Vidrio',
    3: 'Papel',
    4: 'Orgánico'
  };

  private _selectedSegment: string = 'first';

  get selectedSegment(): string {
    return this._selectedSegment;
  }

set selectedSegment(value: string) {
    this._selectedSegment = value;
    
    if (value === 'third') {
      // Esta función buscará el canvas varias veces hasta que aparezca
      this.intentarGenerarGraficas(0);
    }
  }

  // Nueva función para ayudar a encontrar el canvas
  intentarGenerarGraficas(intentos: number) {
    const canvas = document.getElementById('canvasGrafica');
    
    if (canvas) {
      // Si ya existe el canvas en el HTML, dibujamos
      this.generarGrafica();
      this.generarGraficaGlobal();
    } else if (intentos < 10) {
      // Si no existe, esperamos 100ms y volvemos a buscar (máximo 10 veces)
      setTimeout(() => this.intentarGenerarGraficas(intentos + 1), 100);
    }
  }

  apiUrl = 'http://localhost:3000/usuario';
  apiReciclajes = 'http://localhost:3000/reciclajes';
  apiEstadisticas = 'http://localhost:3000/estadisticas';

  private batchSize = 5;

  public chart: any;
  public chartGlobal: any;

  constructor(private http: HttpClient) {
    addIcons({ 
      personOutline, idCardOutline, mailOutline, callOutline, 
      keyOutline, createOutline, saveOutline, closeOutline,
      cameraOutline, documentTextOutline, statsChartOutline 
    });
  }

  ngOnInit() {
    this.obtenerUsuario();
    this.obtenerReciclajes();
    this.obtenerEstadisticas();
    this.obtenerEstadisticasGlobales();
  }

  obtenerUsuario() {
    const usuarioLog = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (!usuarioLog.id) return;

    this.http.get<any>(`${this.apiUrl}/${usuarioLog.id}`).subscribe({
      next: (data) => {
        if (data.foto) data.foto = 'data:image/jpeg;base64,' + data.foto;
        this.usuario = data;
        this.usuarioOriginal = JSON.parse(JSON.stringify(data));
      },
      error: (err) => console.error('Error al obtener usuario:', err)
    });
  }

  obtenerReciclajes() {
    const usuarioLog = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (!usuarioLog.id) return;

    this.http.get<any[]>(`${this.apiReciclajes}/${usuarioLog.id}`).subscribe({
      next: (data) => {
        this.reciclajes = data || [];
        this.reciclajesMostrados = this.reciclajes.slice(0, this.batchSize);
      },
      error: (err) => console.error('Error al cargar reciclajes:', err)
    });
  }

  obtenerEstadisticas() {
    const usuarioLog = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (!usuarioLog.id) return;

    this.http.get<any[]>(`${this.apiEstadisticas}/${usuarioLog.id}`).subscribe({
      next: (data) => {
        this.estadisticas = data || [];
        this.estadisticasMostradas = this.estadisticas.slice(0, this.batchSize);
        if (this.selectedSegment === 'third') {
          setTimeout(() => this.generarGrafica(), 300);
        }
      },
      error: (err) => console.error('Error al cargar estadísticas:', err)
    });
  }

  obtenerEstadisticasGlobales() {
    this.http.get<any[]>('http://localhost:3000/admin/estadisticas-globales').subscribe({
      next: (data) => {
        this.estadisticasGlobales = data || [];
        console.log('✅ Globales cargadas:', this.estadisticasGlobales);
        if (this.selectedSegment === 'third') {
          setTimeout(() => this.generarGraficaGlobal(), 400);
        }
      },
      error: (err) => console.error('❌ Error en globales:', err)
    });
  }

  generarGrafica() {
    const ctx = document.getElementById('canvasGrafica') as HTMLCanvasElement;
    
    if (!ctx) {
      console.error('❌ ERROR: No encontré el canvas "canvasGrafica" en el HTML');
      return;
    }

    if (this.estadisticas.length === 0) {
      console.warn('⚠️ ADVERTENCIA: No hay datos personales (estadisticas está vacío)');
      return;
    }

    if (this.chart) { this.chart.destroy(); }

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.estadisticas.map(e => e.material),
        datasets: [{
          data: this.estadisticas.map(e => e.total),
          backgroundColor: this.estadisticas.map(e => this.obtenerColor(e.material)),
          borderWidth: 2
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
    console.log('🎨 Gráfica Personal dibujada con éxito');
  }

  generarGraficaGlobal() {
    const ctx = document.getElementById('canvasGraficaGlobal') as HTMLCanvasElement;
    
    if (!ctx) {
      console.error('❌ ERROR: No encontré el canvas "canvasGraficaGlobal" en el HTML');
      return;
    }

    if (this.estadisticasGlobales.length === 0) {
      console.warn('⚠️ ADVERTENCIA: No hay datos globales (estadisticasGlobales está vacío)');
      return;
    }

    if (this.chartGlobal) { this.chartGlobal.destroy(); }

    this.chartGlobal = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.estadisticasGlobales.map(e => e.material),
        datasets: [{
          data: this.estadisticasGlobales.map(e => e.total),
          backgroundColor: this.estadisticasGlobales.map(e => this.obtenerColor(e.material)),
          borderWidth: 2
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
    console.log('🎨 Gráfica Global dibujada con éxito');
  }

  obtenerColor(material: string): string {
    const colores: { [key: string]: string } = {
      'Plástico': '#ffd534', 'Vidrio': '#2dd36f',
      'Papel': '#3880ff', 'Orgánico': '#7e522a'
    };
    const clave = Object.keys(colores).find(c => material.includes(c));
    return clave ? colores[clave] : '#92949c';
  }

  cargarMasReciclajes(event: any) {
    const nextIndex = this.reciclajesMostrados.length;
    const nuevos = this.reciclajes.slice(nextIndex, nextIndex + this.batchSize);
    this.reciclajesMostrados = [...this.reciclajesMostrados, ...nuevos];
    setTimeout(() => event.target.complete(), 500);
  }

  activarEdicion() { this.modoEdicion = true; }

  cancelarEdicion() {
    this.usuario = JSON.parse(JSON.stringify(this.usuarioOriginal));
    this.modoEdicion = false;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.usuario.foto = (reader.result as string).split(',')[1];
      reader.readAsDataURL(file);
    }
  }

  guardarCambios() {
    const usuarioLog = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (!usuarioLog.id) return;
    const datos = {
      ...this.usuario,
      foto: this.usuario.foto ? this.usuario.foto.replace(/^data:image\/[a-z]+;base64,/, "") : null
    };
    this.http.put(`${this.apiUrl}/${usuarioLog.id}`, datos).subscribe({
      next: (res: any) => {
        alert('✅ Cambios guardados');
        this.modoEdicion = false;
        this.obtenerUsuario();
      },
      error: (err) => alert('❌ Error al guardar')
    });
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  }

  obtenerTotalGeneral(): number {
    return this.estadisticas.reduce((acc, est) => acc + parseFloat(est.total || 0), 0);
  }

  obtenerTotalGlobal(): number {
    return this.estadisticasGlobales.reduce((acc, est) => acc + parseFloat(est.total || 0), 0);
  }
}