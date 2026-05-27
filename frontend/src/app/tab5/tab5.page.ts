import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

Chart.register(...registerables);

import {
  IonAvatar,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem, 
  IonLabel,
  IonList,
  IonModal,
  IonProgressBar,
  IonSegment,
  IonSegmentButton, 
  IonSegmentView
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  callOutline,
  cameraOutline,
  checkmarkCircleOutline,
  checkmarkOutline,
  closeCircleOutline,
  closeOutline,
  cloudDownloadOutline,
  createOutline,
  documentOutline,
  documentTextOutline,
  earthSharp, 
  happyOutline,
  idCardOutline,
  keyOutline,
  mailOutline,
  personOutline,
  saveOutline,
  searchOutline,
  statsChartOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, HttpClientModule, 
    IonContent, IonAvatar, IonItem, IonLabel, IonInput, IonButton, 
    IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonList, IonSegment, IonSegmentButton, IonSegmentView,
    IonInfiniteScroll, IonInfiniteScrollContent, IonBadge, IonProgressBar, IonModal
  ]
})
export class Tab5Page implements OnInit {

  usuario: any = null;
  usuarioOriginal: any = null;
  modoEdicion: boolean = false;
  totalGlobal: number = 0; 
  
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
  mesActualNombre: string = '';
  fotoGrande: string = '';
  isModalOpen: boolean = false;

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
    if (value === 'second') {
      this.obtenerReciclajes();
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    }
  }

  get totalAprobados(): number {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    const añoActual = fechaActual.getFullYear();

    return this.reciclajes.filter(r => {
      const fechaR = new Date(r.fecha);
      return r.estado?.toLowerCase() === 'aprobado' && 
             fechaR.getMonth() === mesActual && 
             fechaR.getFullYear() === añoActual;
    }).length;
  }

  apiUrl = 'http://localhost:3000/usuario';
  apiReciclajes = 'http://localhost:3000/reciclajes';
  apiEstadisticas = 'http://localhost:3000/estadisticas';
  apiAdmin = 'http://localhost:3000/admin';

  private batchSize = 5;
  public chart: any;
  public chartGlobal: any;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
    addIcons({ 
      personOutline, idCardOutline, mailOutline, callOutline, 
      keyOutline, createOutline, saveOutline, closeOutline,
      cameraOutline, documentTextOutline, statsChartOutline,
      checkmarkCircleOutline, closeCircleOutline,
      earthSharp, happyOutline, searchOutline,
      checkmarkOutline, cloudDownloadOutline, documentOutline, 
      'cloud-download-outline': cloudDownloadOutline,
      'document-text-outline': documentTextOutline,
      'document-outline': documentOutline
    });
  }

  ngOnInit() {
    this.establecerMesActual();
    this.obtenerUsuario();
    this.obtenerReciclajes(); 
    this.obtenerEstadisticas();
    this.obtenerEstadisticasGlobales();
  }

  ionViewDidEnter() {
    this.obtenerReciclajes();
    this.cdr.detectChanges();
  }

establecerMesActual() {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]; 
    const fecha = new Date();
   this.mesActualNombre = meses[fecha.getMonth()];
    
   this.metaPlantel = 150; 
    this.metaPersonal = 20; 
  }
  esAdmin(): boolean { return this.usuario?.rol === 'admin'; }
  esComite(): boolean { return this.usuario?.rol === 'comite' || this.usuario?.rol === 'evaluacion'; }
  esAlumno(): boolean { return this.usuario?.rol === 'alumno'; }
  esRecolector = () => this.usuario?.rol === 'recolector';
  get userRole(): string { return this.usuario?.rol || 'alumno'; }

  calcularImpactoAmbiental(totalKg: number) {
    this.aportacionTotal = totalKg;
    this.impactoCO2 = totalKg * 1.2;
    this.arbolesSalvados = totalKg / 50;
    this.aguaAhorrada = totalKg * 5;
  }

  obtenerPendientes() {
    this.http.get<any[]>(`http://localhost:3000/admin/pendientes`).subscribe({
      next: (data) => {
        this.reciclajesPendientes = data; 
        console.log('📋 Pendientes recibidos:', this.reciclajesPendientes);
      },
      error: (err) => console.error('Error al cargar pendientes:', err)
    });
  }

  validarReciclaje(id: number, estado: string) {
    this.http.put(`http://localhost:3000/admin/validar/${id}`, { estado }).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.reciclajesPendientes = this.reciclajesPendientes.filter(p => p.id !== id);
          this.obtenerEstadisticas();        
          this.obtenerEstadisticasGlobales(); 
          this.obtenerReciclajes();           
          setTimeout(() => {
            this.generarGrafica();
            this.generarGraficaGlobal();
          }, 500);
          console.log('✅ Registro validado, todo actualizado');
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

      this.estadisticas = Array.isArray(data) ? data : [];
      this.estadisticasMostradas = [...this.estadisticas];
      
      const sumaTotal = this.estadisticas.reduce((acc, curr) => acc + Number(curr.total || 0), 0);
      this.calcularImpactoAmbiental(sumaTotal);
    
      if (this._selectedSegment === 'third') {
        setTimeout(() => this.generarGrafica(), 300);
      }
    },
    error: (err) => console.error('Error al cargar estadísticas:', err)
  });
}
  abrirModal(foto: string) {
    this.fotoGrande = foto;
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
    this.fotoGrande = '';
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
    if (!usuarioLog.id) {
      console.error('❌ No hay ID de usuario');
      return;
    }
    
    const url = `${this.apiReciclajes}/${usuarioLog.id}`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.reciclajes = data || [];
        this.reciclajesMostrados = this.reciclajes.slice(0, 15); 
        this.cdr.detectChanges();
        
        if (this.esComite() || this.esAdmin() || this.esRecolector()) {
          this.obtenerPendientes();
        }
      },
      error: (err) => console.error('❌ [DEBUG] Error:', err)
    });
  }

  obtenerEstadisticasGlobales() {
    this.http.get<any[]>('http://localhost:3000/admin/estadisticas-globales').subscribe({
      next: (data) => {
        console.log('📊 Datos originales:', data);
        let totalOtros = 0;
        const materialesNormales = ['Plástico', 'Vidrio', 'Papel', 'Orgánico'];
        const estadisticasAgrupadas: any[] = [];
        
        (data || []).forEach(item => {
          if (materialesNormales.includes(item.material)) {
            estadisticasAgrupadas.push({ ...item });
          } else {
            totalOtros += item.total;
          }
        });
        
        if (totalOtros > 0) {
          estadisticasAgrupadas.push({
            material: 'Otro',
            total: totalOtros
          });
        }
        
        materialesNormales.forEach(material => {
          if (!estadisticasAgrupadas.some(e => e.material === material)) {
            estadisticasAgrupadas.push({
              material: material,
              total: 0
            });
          }
        });
        
        this.estadisticasGlobales = estadisticasAgrupadas;
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
    if (!ctx) return;
    
    if (this.chart) { this.chart.destroy(); }

    if (this.estadisticas.length === 0) {
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Sin registros este mes'],
          datasets: [{
            data: [1],
            backgroundColor: ['#e0e0e0'],
            borderWidth: 1
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
      return;
    }

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
    if (!ctx) return;
    
    if (this.chartGlobal) { this.chartGlobal.destroy(); }

    const tieneDatos = this.estadisticasGlobales.some(e => Number(e.total) > 0);

    if (!tieneDatos || this.estadisticasGlobales.length === 0) {
      this.chartGlobal = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Sin reciclaje global este mes'],
          datasets: [{
            data: [1],
            backgroundColor: ['#e0e0e0'], 
            borderWidth: 1
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
      return;
    }

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
      'Papel': '#3880ff', 'Orgánico': '#7e522a', "Otro": '#92949c'
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
   
  exportarPDF() {
    const usuarioLog = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuarioLog.rol === 'admin' || usuarioLog.rol === 'comite') {
      const url = 'http://localhost:3000/admin/exportar-pdf';
      window.open(url, '_blank');
    } else {
      alert('No tienes permisos para generar este reporte global.');
    }
  }

  async generarPDF() {
    if (!this.estadisticas || this.estadisticas.length === 0) {
      alert('No hay datos para exportar');
      return;
    }
    
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(45, 211, 111); 
    doc.text('REPORTE DE IMPACTO AMBIENTAL', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text('Telebachillerato Comunitario "San Tadeo"', 14, 30);
    doc.text(`Fecha de reporte: ${new Date().toLocaleDateString()}`, 14, 38);
    doc.text(`Alumno: ${this.usuario?.nombre} ${this.usuario?.apellidos}`, 14, 46);
    
    const cuerpoTabla = this.estadisticas.map(est => [
      est.material,      
      est.total + ' kg',  
      '2026'              
    ]);

    autoTable(doc, {
      startY: 55,
      head: [['Material Reciclado', 'Cantidad Total', 'Periodo']],
      body: cuerpoTabla,
      theme: 'grid',
      headStyles: { fillColor: [45, 211, 111] }, 
    });
    
    doc.save(`Reporte_Reciclaje_${this.usuario?.nombre}.pdf`);
  }
}