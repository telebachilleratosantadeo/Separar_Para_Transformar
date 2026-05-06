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
  IonInfiniteScrollContent, IonGrid, IonRow, IonCol, IonBadge, IonProgressBar, IonModal
} from '@ionic/angular/standalone';

// Íconos
import { addIcons } from 'ionicons';
import { 
  personOutline, idCardOutline, mailOutline, callOutline, 
  keyOutline, createOutline, saveOutline, closeOutline,
  cameraOutline, documentTextOutline, statsChartOutline,
  checkmarkCircleOutline, closeCircleOutline,
  earthSharp, happyOutline , searchOutline,
  checkmarkOutline
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
    IonInfiniteScroll, IonInfiniteScrollContent, IonGrid, IonRow, IonCol, IonBadge, IonProgressBar, IonModal
  ]
})
export class Tab5Page implements OnInit {

  usuario: any = null;
  usuarioOriginal: any = null;
  modoEdicion: boolean = false;
  totalGlobal: number = 0; 

  // --- VARIABLES DE IMPACTO AMBIENTAL ---
  aportacionTotal: number = 0;
  impactoCO2: number = 0;
  arbolesSalvados: number = 0;
  aguaAhorrada: number = 0;
  
  reciclajes: any[] = [];
  reciclajesMostrados: any[] = [];
  estadisticas: any[] = []; 
  estadisticasGlobales: any[] = []; 
  estadisticasMostradas: any[] = [];

  reciclajesPendientes: any[] = [];

  materiales: { [key: number]: string } = {
    1: 'Plástico',
    2: 'Vidrio',
    3: 'Papel',
    4: 'Orgánico'
  };
  metaPlantel: number = 100; 
  metaPersonal: number = 5;
  isModalOpen: boolean = false;
  fotoSeleccionada: string = '';
  // LÓGICA DE SEGMENT (Corregida para que el HTML no de error)
  private _selectedSegment: string = 'first';
  get selectedSegment(): string { return this._selectedSegment; }
  set selectedSegment(value: string) {
    this._selectedSegment = value;
    if (value === 'third') {
      setTimeout(() => {
        this.generarGrafica();
        this.generarGraficaGlobal();
      }, 300);
    }
  }

  apiUrl = 'http://localhost:3000/usuario';
  apiReciclajes = 'http://localhost:3000/reciclajes';
  apiEstadisticas = 'http://localhost:3000/estadisticas';
  apiAdmin = 'http://localhost:3000/admin';

  private batchSize = 5;
  public chart: any;
  public chartGlobal: any;

  constructor(private http: HttpClient) {
    addIcons({ 
      personOutline, idCardOutline, mailOutline, callOutline, 
      keyOutline, createOutline, saveOutline, closeOutline,
      cameraOutline, documentTextOutline, statsChartOutline,
      checkmarkCircleOutline, closeCircleOutline,
      earthSharp, happyOutline , searchOutline,
  checkmarkOutline
    });
  }

  ngOnInit() {
    this.obtenerUsuario();
    this.obtenerReciclajes();
    this.obtenerEstadisticas();
    this.obtenerEstadisticasGlobales();

    const usuarioLog = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuarioLog.rol === 'comite' || usuarioLog.rol === 'evaluacion' || usuarioLog.rol === 'admin' || usuarioLog.rol === 'usuario') {
      this.obtenerPendientes();
    }
  }

  // --- LÓGICA DE ROLES (INTACTA) ---
  esAdmin(): boolean { return this.usuario?.rol === 'admin'; }
  esComite(): boolean { return this.usuario?.rol === 'comite' || this.usuario?.rol === 'evaluacion'; }
  esAlumno(): boolean { return this.usuario?.rol === 'alumno'; }
  get userRole(): string { return this.usuario?.rol || 'alumno'; }

  // --- IMPACTO AMBIENTAL (NUEVO MÉTODO) ---
  calcularImpactoAmbiental(totalKg: number) {
    this.aportacionTotal = totalKg;
    this.impactoCO2 = totalKg * 1.2;
    this.arbolesSalvados = totalKg / 50;
    this.aguaAhorrada = totalKg * 5;
  }

  // --- GESTIÓN DE DATOS ---
  obtenerPendientes() {
    this.http.get<any[]>(`${this.apiAdmin}/pendientes`).subscribe({
      next: (data) => this.reciclajesPendientes = data || [],
      error: (err) => console.error('Error al cargar pendientes:', err)
    });
  }

  validarReciclaje(id: number, estado: string) {
    this.http.put(`http://localhost:3000/admin/validar/${id}`, { estado }).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.reciclajesPendientes = this.reciclajesPendientes.filter(p => p.id !== id);
          this.obtenerEstadisticas(); // Recalcular impacto tras validar
        }
      },
      error: (err) => console.error('Error al validar', err)
    });
  }

obtenerEstadisticas() {
  const usuarioLog = JSON.parse(localStorage.getItem('usuario') || '{}');
  if (!usuarioLog.id) return;

  this.http.get<any[]>(`${this.apiEstadisticas}/${usuarioLog.id}`).subscribe({
    next: (data) => {
      const estadisticasFiltradas = data.filter(e => e.usuario_id === usuarioLog.id || !e.usuario_id); 
      
      this.estadisticas = data || []; 
      this.estadisticasMostradas = estadisticasFiltradas.slice(0, this.batchSize);
      const sumaTotal = this.obtenerTotalGeneral();
      this.calcularImpactoAmbiental(sumaTotal);

      if (this._selectedSegment === 'third') {
        setTimeout(() => this.generarGrafica(), 300);
      }
    },
    error: (err) => console.error('Error al cargar estadísticas:', err)
  });
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
      const todosLosDatos = data || [];
      this.reciclajes = todosLosDatos.filter(r => r.usuario_id === usuarioLog.id);
      this.reciclajesMostrados = this.reciclajes.slice(0, this.batchSize);

      if (this.esAdmin() || this.esComite()) {
        this.reciclajesPendientes = todosLosDatos.filter(r => r.estado === 'pendiente');
      }
    },
    error: (err) => console.error('Error al cargar reciclajes:', err)
  });
}

  obtenerEstadisticasGlobales() {
    this.http.get<any[]>('http://localhost:3000/admin/estadisticas-globales').subscribe({
      next: (data) => {
        this.estadisticasGlobales = data || [];
        this.actualizarTotalGlobal();
        if (this._selectedSegment === 'third') {
          setTimeout(() => this.generarGraficaGlobal(), 400);
        }
      },
      error: (err) => console.error('❌ Error en globales:', err)
    });
  }

  actualizarTotalGlobal() {
    this.totalGlobal = this.estadisticasGlobales.reduce((acc, item) => acc + (Number(item.total) || 0), 0);
  }

  generarGrafica() {
    const ctx = document.getElementById('canvasGrafica') as HTMLCanvasElement;
    if (!ctx || this.estadisticas.length === 0) return;
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
  }

  generarGraficaGlobal() {
    const ctx = document.getElementById('canvasGraficaGlobal') as HTMLCanvasElement;
    if (!ctx || this.estadisticasGlobales.length === 0) return;
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
    const datos = { ...this.usuario, foto: this.usuario.foto ? this.usuario.foto.replace(/^data:image\/[a-z]+;base64,/, "") : null };
    this.http.put(`${this.apiUrl}/${usuarioLog.id}`, datos).subscribe({
      next: () => { alert('✅ Cambios guardados'); this.modoEdicion = false; this.obtenerUsuario(); },
      error: () => alert('❌ Error al guardar')
    });
  }

  cerrarSesion() { localStorage.removeItem('usuario'); window.location.href = '/login'; }
  obtenerTotalGeneral(): number { return this.estadisticas.reduce((acc, est) => acc + (Number(est.total) || 0), 0); }
}