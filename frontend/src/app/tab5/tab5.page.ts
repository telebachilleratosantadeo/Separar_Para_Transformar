import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// --- IMPORTACIONES PARA PDF ---
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
// ------------------------------

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonItem, IonLabel,
  IonInput, IonButton, IonButtons, IonBackButton, IonIcon, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonList, IonSegment,
  IonSegmentButton, IonSegmentContent, IonSegmentView, IonInfiniteScroll,
  IonInfiniteScrollContent, IonGrid, IonRow, IonCol, IonBadge, IonProgressBar, IonModal, IonFab, IonFabButton, IonCardSubtitle
} from '@ionic/angular/standalone';


import { addIcons } from 'ionicons';
import { 
  personOutline, idCardOutline, mailOutline, callOutline, 
  keyOutline, createOutline, saveOutline, closeOutline,
  cameraOutline, documentTextOutline, statsChartOutline,
  checkmarkCircleOutline, closeCircleOutline,
  earthSharp, happyOutline , searchOutline,
  checkmarkOutline,cloudDownloadOutline, documentOutline
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
    IonInfiniteScroll, IonInfiniteScrollContent, IonGrid, IonRow, IonCol, IonBadge, IonProgressBar, IonModal,IonFab, IonFabButton, IonCardSubtitle
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
      checkmarkOutline,cloudDownloadOutline, documentOutline, 'cloud-download-outline': cloudDownloadOutline,
    'document-text-outline': documentTextOutline,
    'document-outline': documentOutline
    });
  }

ngOnInit() {
  this.obtenerUsuario();
  this.obtenerReciclajes(); 
  this.obtenerEstadisticas();
  this.obtenerEstadisticasGlobales();
}

  esAdmin(): boolean { return this.usuario?.rol === 'admin'; }
  esComite(): boolean { return this.usuario?.rol === 'comite' || this.usuario?.rol === 'evaluacion'; }
  esAlumno(): boolean { return this.usuario?.rol === 'alumno'; }
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
      // El servidor ya envía 'material' en el JSON gracias al JOIN
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
        
        // Actualizar TODOS los datos
        this.obtenerEstadisticas();        // Para gráfica personal
        this.obtenerEstadisticasGlobales(); // Para gráfica global ← CLAVE
        this.obtenerReciclajes();           // Para la lista de reciclajes
        
        // Forzar refresco de gráficas si es necesario
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
  console.log('🔍 [DEBUG] usuarioLog:', usuarioLog);
  console.log('🔍 [DEBUG] usuarioLog.id:', usuarioLog.id);
  
  if (!usuarioLog.id) {
    console.error('❌ No hay ID de usuario');
    return;
  }
  
  const url = `${this.apiReciclajes}/${usuarioLog.id}`;
  console.log('📡 [DEBUG] Llamando a:', url);
  
  this.http.get<any[]>(url).subscribe({
    next: (data) => {
      console.log('✅ [DEBUG] Reciclajes recibidos:', data);
      console.log('✅ [DEBUG] Cantidad de registros:', data?.length);
      
      if (data && data.length > 0) {
        console.log('✅ [DEBUG] Primer registro:', data[0]);
      }
      
      this.reciclajes = data || [];
      this.reciclajesMostrados = this.reciclajes.slice(0, this.batchSize);
      console.log('✅ [DEBUG] reciclajesMostrados:', this.reciclajesMostrados.length);
      
      if (this.esComite() || this.esAdmin()) {
        this.obtenerPendientes();
      }
    },
    error: (err) => {
      console.error('❌ [DEBUG] Error:', err);
    }
  });
}
obtenerEstadisticasGlobales() {
  this.http.get<any[]>('http://localhost:3000/admin/estadisticas-globales').subscribe({
    next: (data) => {
      console.log('📊 Datos originales:', data);
      
      // Agrupar "Otro" materiales
      let totalOtros = 0;
      const materialesNormales = ['Plástico', 'Vidrio', 'Papel', 'Orgánico'];
      const estadisticasAgrupadas: any[] = [];
      
      // Primero, procesar los datos del backend
      data.forEach(item => {
        if (materialesNormales.includes(item.material)) {
          // Material normal - mantener igual
          estadisticasAgrupadas.push({ ...item });
        } else {
          // Material "otro" - sumar al total
          totalOtros += item.total;
        }
      });
      
      // Agregar la categoría "Otro" si tiene algún kg
      if (totalOtros > 0) {
        estadisticasAgrupadas.push({
          material: 'Otro',
          total: totalOtros
        });
      }
      
      // Asegurar que todos los materiales base aparezcan (incluso con 0)
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

  // ✨ AQUÍ EMPIEZA LA FUNCIÓN DEL PDF (PUNTO 7)
  // ============================================================
 
exportarPDF() {
  const usuarioLog = JSON.parse(localStorage.getItem('usuario') || '{}');

  // 🛡️ Validación de seguridad: Solo admin o comite
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
  // ... tu lógica de diseño que ya tienes ...

    // 1. Título y Estilo del encabezado
    doc.setFontSize(18);
    doc.setTextColor(45, 211, 111); // Color verde
    doc.text('REPORTE DE IMPACTO AMBIENTAL', 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text('Telebachillerato Comunitario "San Tadeo"', 14, 30);
    doc.text(`Fecha de reporte: ${new Date().toLocaleDateString()}`, 14, 38);
    doc.text(`Alumno: ${this.usuario?.nombre} ${this.usuario?.apellidos}`, 14, 46);

    // 2. Preparar los datos de la tabla (usamos tus estadísticas reales)
    // Esto toma lo que ya tienes en la pantalla y lo pone en el PDF
    const cuerpoTabla = this.estadisticas.map(est => [
      est.material,        // Columna Material
      est.total + ' kg',   // Columna Cantidad
      '2026'                // Puedes poner el año o fecha
    ]);

    // 3. Crear la tabla en el PDF
    autoTable(doc, {
      startY: 55,
      head: [['Material Reciclado', 'Cantidad Total', 'Periodo']],
      body: cuerpoTabla,
      theme: 'grid',
      headStyles: { fillColor: [45, 211, 111] }, // Encabezado verde
    });

    // 4. Descargar el archivo
    doc.save(`Reporte_Reciclaje_${this.usuario?.nombre}.pdf`);
  }
  // ============================================================
  // ✨ AQUÍ TERMINA LA FUNCIÓN DEL PDF
  // ============================================================
}