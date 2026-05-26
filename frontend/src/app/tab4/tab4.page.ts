import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { water, closeCircle, bulb, playCircle } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem, 
  IonIcon, 
  IonLabel, 
  IonNote,
  IonButton, 
  IonSpinner, 
  IonListHeader, 
  IonBadge
} from '@ionic/angular/standalone';
interface Alerta {
  id: number;
  prioridad: 'alta' | 'media' | 'baja';  
  icono: string;
  badge: string;
  titulo: string;
  descripcion: string;
}
interface AlertaAPI {
  id?: number;
  titulo: string;
  descripcion: string;
  enlace?: string;
}

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
imports: [
    IonSpinner,
    IonButton,
    IonLabel,
    IonIcon,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonList,
    IonItem,
    HttpClientModule
  ],
})
export class Tab4Page implements OnInit {
  bancoAlertas: Alerta[] = [
    { id: 1, prioridad: 'alta', icono: 'alert-circle', badge: '⚠️ ALERTA', titulo: '🛑 ¡Contaminación de Lote!', descripcion: 'Una sola botella con restos de líquido puede echar a perder todo el contenedor... ¡Enjuaga antes de reciclar!' },
    { id: 2, prioridad: 'alta', icono: 'flame', badge: '⚠️ PELIGRO', titulo: '🧨 Peligro: Químicos', descripcion: 'Las baterías contienen componentes químicos peligrosos. ¡Busca el contenedor especial!' },
    { id: 3, prioridad: 'media', icono: 'warning', badge: '⚠️ ATENCIÓN', titulo: '⚠️ Error de Clasificación', descripcion: 'El papel manchado de comida NO es reciclable. Arruina todo el proceso.' },
    { id: 4, prioridad: 'media', icono: 'archive', badge: '📦 CONSEJO', titulo: '📦 Obstrucción de Espacio', descripcion: 'El PET sin aplastar reduce la capacidad del contenedor en un 70%. ¡Aplasta!' },
    { id: 5, prioridad: 'alta', icono: 'alert-circle', badge: '⚠️ PELIGRO', titulo: '🚫 ¡Peligro de Corte!', descripcion: 'El vidrio roto debe ir envuelto. ¡Protege a los recolectores!' },
    { id: 6, prioridad: 'baja', icono: 'leaf', badge: '🌱 TIPS VERDES', titulo: '♻️ Nutre la Tierra', descripcion: 'Los orgánicos se convierten en composta. ¡No mezcles plásticos!' },
    { id: 7, prioridad: 'alta', icono: 'medkit', badge: '⚠️ PELIGRO', titulo: '💊 Medicamentos Vencidos', descripcion: 'No van a la basura común. ¡Llévalos a un punto de acopio!' },
    { id: 8, prioridad: 'media', icono: 'restaurant', badge: '⚠️ ATENCIÓN', titulo: '🫒 Aceite de Cocina', descripcion: '1 litro contamina 1000 litros de agua. ¡Guárdalo y recíclalo!' },
    { id: 9, prioridad: 'alta', icono: 'battery', badge: '⚠️ PELIGRO', titulo: '🔋 Pilas y Baterías', descripcion: 'Contienen metales pesados tóxicos. ¡Nunca a la basura común!' },
    { id: 10, prioridad: 'alta', icono: 'bulb', badge: '⚠️ PELIGRO', titulo: '💡 Focos Ahorradores', descripcion: 'Contienen mercurio. ¡Reciclaje especial!' },
    { id: 11, prioridad: 'baja', icono: 'shirt', badge: '🌱 TIPS VERDES', titulo: '👕 Ropa y Textiles', descripcion: 'Ropa en buen estado = donación. ¡Dale una segunda vida!' },
    { id: 12, prioridad: 'media', icono: 'cube', badge: '📦 CONSEJO', titulo: '🥛 Tetrapak', descripcion: 'Envases de leche y jugo SÍ son reciclables. ¡Enjuaga y aplasta!' }
  ];

  alertasSemana: Alerta[] = [];
  numeroSemana: number = 0;
  alertasAPI: AlertaAPI[] = [];
  apiUrl = 'http://localhost:3000/alertas';
  cargando: boolean = true;

 
  private readonly ordenPrioridad: Record<'alta' | 'media' | 'baja', number> = {
    'alta': 1,
    'media': 2,
    'baja': 3
  };

  constructor(private http: HttpClient) {
    console.log({ water, closeCircle, bulb, playCircle });
  }

  ngOnInit() {
    this.cargarAlertasCompletas();
  }


  cargarAlertasCompletas() {
    this.cargando = true;
    
  
    this.obtenerAlertasDeAPI();
  }

  obtenerAlertasDeAPI() {
    this.http.get<AlertaAPI[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.alertasAPI = data;
      
        this.cargarAlertasRotativas();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando alertas de API', err);
        this.cargarAlertasRotativas();
        this.cargando = false;
      }
    });
  }

  cargarAlertasRotativas() {
    const semanaActual = this.obtenerSemanaActual();
    this.numeroSemana = semanaActual;
    
    const semanaGuardada = localStorage.getItem('semana_alertas');
    const alertasGuardadas = localStorage.getItem('alertas_semana');
    
    if (semanaGuardada && parseInt(semanaGuardada) === semanaActual && alertasGuardadas) {
      this.alertasSemana = JSON.parse(alertasGuardadas) as Alerta[];
    } else {

      this.generarAlertasNuevas(semanaActual);
    }
  }

  obtenerSemanaActual(): number {
    const hoy = new Date();
    const inicioAño = new Date(hoy.getFullYear(), 0, 1);
    const dias = Math.floor((hoy.getTime() - inicioAño.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil(dias / 7);
  }

  generarAlertasNuevas(semana: number) {

    const mezcladas = [...this.bancoAlertas];
    for (let i = mezcladas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mezcladas[i], mezcladas[j]] = [mezcladas[j], mezcladas[i]];
    }
    
    this.alertasSemana = mezcladas.slice(0, 6);
    
    this.alertasSemana.sort((a, b) => {
      return this.ordenPrioridad[a.prioridad] - this.ordenPrioridad[b.prioridad];
    });
    
    localStorage.setItem('semana_alertas', semana.toString());
    localStorage.setItem('alertas_semana', JSON.stringify(this.alertasSemana));
  }

  getAlertaDestacada(): Alerta | null {
    if (this.alertasSemana.length > 0) {
      return this.alertasSemana[0]; 
    }
    return null;
  }

  refrescarAlertas(event?: any) {
    const semanaActual = this.obtenerSemanaActual();
    this.generarAlertasNuevas(semanaActual);
    
    if (event) {
      setTimeout(() => {
        event.target.complete();
      }, 500);
    }
  }

  actualizarAlertasManual() {
    const semanaActual = this.obtenerSemanaActual();
    this.generarAlertasNuevas(semanaActual);
    
    console.log('✅ Alertas actualizadas manualmente');
  }
}