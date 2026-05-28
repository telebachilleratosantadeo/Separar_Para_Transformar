import {
  bulb,
  closeCircle,
  playCircle,
  water
} from "./chunk-4OLBXMDD.js";
import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonTitle,
  IonToolbar
} from "./chunk-E5QEEIGS.js";
import {
  CommonModule,
  Component,
  HttpClient,
  HttpClientModule,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-6FBQLITM.js";
import "./chunk-XHJY2F2U.js";
import "./chunk-ZANXXOCD.js";
import "./chunk-B4QRZDQS.js";
import "./chunk-P4JTPYNW.js";
import "./chunk-LZJBBD2J.js";
import "./chunk-OL3WNRC6.js";
import "./chunk-6GY55RSK.js";
import "./chunk-7D2IXJO2.js";
import "./chunk-FZZSIR43.js";
import "./chunk-X4NBNE3H.js";
import "./chunk-AVKBR3MH.js";
import "./chunk-CODWS2MM.js";
import "./chunk-YAS4LRVC.js";
import "./chunk-UL2P3LPA.js";

// src/app/tab4/tab4.page.ts
var _forTrack0 = ($index, $item) => $item.id || $index;
function Tab4Page_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275element(1, "ion-spinner", 7);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando alertas...");
    \u0275\u0275elementEnd()();
  }
}
function Tab4Page_Conditional_8_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-card", 20)(1, "ion-item", 21)(2, "div", 22);
    \u0275\u0275element(3, "ion-icon", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-label")(5, "div", 24);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h2", 25);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 26);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const alerta_r1 = ctx.$implicit;
    const \u0275$index_54_r2 = ctx.$index;
    \u0275\u0275styleProp("animation-delay", \u0275$index_54_r2 * 0.05 + "s");
    \u0275\u0275classProp("alerta-alta", alerta_r1.prioridad === "alta")("alerta-media", alerta_r1.prioridad === "media")("alerta-baja", alerta_r1.prioridad === "baja");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("icono-alerta-rojo", alerta_r1.prioridad === "alta")("icono-alerta-naranja", alerta_r1.prioridad === "media")("icono-alerta-verde", alerta_r1.prioridad === "baja");
    \u0275\u0275advance();
    \u0275\u0275property("name", alerta_r1.icono);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("badge-rojo", alerta_r1.prioridad === "alta")("badge-naranja", alerta_r1.prioridad === "media")("badge-verde", alerta_r1.prioridad === "baja");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", alerta_r1.badge, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alerta_r1.titulo);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alerta_r1.descripcion);
  }
}
function Tab4Page_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "ion-list", 8)(2, "ion-card", 9)(3, "ion-item", 10);
    \u0275\u0275element(4, "ion-icon", 11);
    \u0275\u0275elementStart(5, "ion-label")(6, "h2");
    \u0275\u0275text(7, "\u{1F30E} \xBFQu\xE9 pasa si NO reciclamos bien?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "Conoce el destino real de la basura mal gestionada y el impacto en nuestro planeta. \xA1Haz clic para ver el reportaje!");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "ion-button", 12);
    \u0275\u0275element(11, "ion-icon", 13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 14);
    \u0275\u0275element(13, "ion-icon", 15);
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "\u2728 Alertas nuevas cada semana \u2728");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "ion-icon", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(17, Tab4Page_Conditional_8_For_18_Template, 11, 24, "ion-card", 17, _forTrack0);
    \u0275\u0275elementStart(19, "div", 18);
    \u0275\u0275element(20, "ion-icon", 19);
    \u0275\u0275elementStart(21, "p");
    \u0275\u0275text(22, "Peque\xF1as acciones, grandes cambios. \u{1F331}");
    \u0275\u0275element(23, "br");
    \u0275\u0275text(24, "\xA1Gracias por reciclar correctamente!");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r2.alertasSemana);
  }
}
var _Tab4Page = class _Tab4Page {
  constructor(http) {
    this.http = http;
    this.bancoAlertas = [
      { id: 1, prioridad: "alta", icono: "alert-circle", badge: "\u26A0\uFE0F ALERTA", titulo: "\u{1F6D1} \xA1Contaminaci\xF3n de Lote!", descripcion: "Una sola botella con restos de l\xEDquido puede echar a perder todo el contenedor... \xA1Enjuaga antes de reciclar!" },
      { id: 2, prioridad: "alta", icono: "flame", badge: "\u26A0\uFE0F PELIGRO", titulo: "\u{1F9E8} Peligro: Qu\xEDmicos", descripcion: "Las bater\xEDas contienen componentes qu\xEDmicos peligrosos. \xA1Busca el contenedor especial!" },
      { id: 3, prioridad: "media", icono: "warning", badge: "\u26A0\uFE0F ATENCI\xD3N", titulo: "\u26A0\uFE0F Error de Clasificaci\xF3n", descripcion: "El papel manchado de comida NO es reciclable. Arruina todo el proceso." },
      { id: 4, prioridad: "media", icono: "archive", badge: "\u{1F4E6} CONSEJO", titulo: "\u{1F4E6} Obstrucci\xF3n de Espacio", descripcion: "El PET sin aplastar reduce la capacidad del contenedor en un 70%. \xA1Aplasta!" },
      { id: 5, prioridad: "alta", icono: "alert-circle", badge: "\u26A0\uFE0F PELIGRO", titulo: "\u{1F6AB} \xA1Peligro de Corte!", descripcion: "El vidrio roto debe ir envuelto. \xA1Protege a los recolectores!" },
      { id: 6, prioridad: "baja", icono: "leaf", badge: "\u{1F331} TIPS VERDES", titulo: "\u267B\uFE0F Nutre la Tierra", descripcion: "Los org\xE1nicos se convierten en composta. \xA1No mezcles pl\xE1sticos!" },
      { id: 7, prioridad: "alta", icono: "medkit", badge: "\u26A0\uFE0F PELIGRO", titulo: "\u{1F48A} Medicamentos Vencidos", descripcion: "No van a la basura com\xFAn. \xA1Ll\xE9valos a un punto de acopio!" },
      { id: 8, prioridad: "media", icono: "restaurant", badge: "\u26A0\uFE0F ATENCI\xD3N", titulo: "\u{1FAD2} Aceite de Cocina", descripcion: "1 litro contamina 1000 litros de agua. \xA1Gu\xE1rdalo y rec\xEDclalo!" },
      { id: 9, prioridad: "alta", icono: "battery", badge: "\u26A0\uFE0F PELIGRO", titulo: "\u{1F50B} Pilas y Bater\xEDas", descripcion: "Contienen metales pesados t\xF3xicos. \xA1Nunca a la basura com\xFAn!" },
      { id: 10, prioridad: "alta", icono: "bulb", badge: "\u26A0\uFE0F PELIGRO", titulo: "\u{1F4A1} Focos Ahorradores", descripcion: "Contienen mercurio. \xA1Reciclaje especial!" },
      { id: 11, prioridad: "baja", icono: "shirt", badge: "\u{1F331} TIPS VERDES", titulo: "\u{1F455} Ropa y Textiles", descripcion: "Ropa en buen estado = donaci\xF3n. \xA1Dale una segunda vida!" },
      { id: 12, prioridad: "media", icono: "cube", badge: "\u{1F4E6} CONSEJO", titulo: "\u{1F95B} Tetrapak", descripcion: "Envases de leche y jugo S\xCD son reciclables. \xA1Enjuaga y aplasta!" }
    ];
    this.alertasSemana = [];
    this.numeroSemana = 0;
    this.alertasAPI = [];
    this.apiUrl = "http://localhost:3000/alertas";
    this.cargando = true;
    this.ordenPrioridad = {
      "alta": 1,
      "media": 2,
      "baja": 3
    };
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
    this.http.get(this.apiUrl).subscribe({
      next: (data) => {
        this.alertasAPI = data;
        this.cargarAlertasRotativas();
        this.cargando = false;
      },
      error: (err) => {
        console.error("Error cargando alertas de API", err);
        this.cargarAlertasRotativas();
        this.cargando = false;
      }
    });
  }
  cargarAlertasRotativas() {
    const semanaActual = this.obtenerSemanaActual();
    this.numeroSemana = semanaActual;
    const semanaGuardada = localStorage.getItem("semana_alertas");
    const alertasGuardadas = localStorage.getItem("alertas_semana");
    if (semanaGuardada && parseInt(semanaGuardada) === semanaActual && alertasGuardadas) {
      this.alertasSemana = JSON.parse(alertasGuardadas);
    } else {
      this.generarAlertasNuevas(semanaActual);
    }
  }
  obtenerSemanaActual() {
    const hoy = /* @__PURE__ */ new Date();
    const inicioA\u00F1o = new Date(hoy.getFullYear(), 0, 1);
    const dias = Math.floor((hoy.getTime() - inicioA\u00F1o.getTime()) / (24 * 60 * 60 * 1e3));
    return Math.ceil(dias / 7);
  }
  generarAlertasNuevas(semana) {
    const mezcladas = [...this.bancoAlertas];
    for (let i = mezcladas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [mezcladas[i], mezcladas[j]] = [mezcladas[j], mezcladas[i]];
    }
    this.alertasSemana = mezcladas.slice(0, 6);
    this.alertasSemana.sort((a, b) => {
      return this.ordenPrioridad[a.prioridad] - this.ordenPrioridad[b.prioridad];
    });
    localStorage.setItem("semana_alertas", semana.toString());
    localStorage.setItem("alertas_semana", JSON.stringify(this.alertasSemana));
  }
  getAlertaDestacada() {
    if (this.alertasSemana.length > 0) {
      return this.alertasSemana[0];
    }
    return null;
  }
  refrescarAlertas(event) {
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
    console.log("\u2705 Alertas actualizadas manualmente");
  }
};
_Tab4Page.\u0275fac = function Tab4Page_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _Tab4Page)(\u0275\u0275directiveInject(HttpClient));
};
_Tab4Page.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Tab4Page, selectors: [["app-tab4"]], decls: 9, vars: 3, consts: [[3, "translucent"], [1, "custom-toolbar"], [1, "header-image-container"], ["src", "../assets/TBCST.jpeg", "alt", "Logo"], [3, "fullscreen"], [1, "loading-container"], [1, "ion-list-container"], ["name", "crescent", "color", "success"], ["lines", "none", 1, "ion-padding-horizontal"], ["mode", "ios", 1, "card-guia"], ["button", "", "href", "https://youtu.be/67pZW5hcQC4?si=IbeRaDvaQWDwqfvg", "target", "_blank", "detail", "false", "lines", "none"], ["name", "alert-circle", "slot", "start", "color", "danger", 1, "guia-icon"], ["slot", "end", "fill", "clear", "color", "danger"], ["name", "play-circle", 2, "font-size", "2rem"], [1, "indicador-semana"], ["name", "calendar-outline"], ["name", "sparkles"], ["mode", "ios", 1, "card-alerta", 3, "alerta-alta", "alerta-media", "alerta-baja", "animation-delay"], [1, "mensaje-final"], ["name", "heart-circle-outline"], ["mode", "ios", 1, "card-alerta"], ["detail", "false", "lines", "none"], [1, "icono-alerta"], [3, "name"], [1, "badge-alerta"], [1, "titulo-alerta"], [1, "descripcion-alerta"]], template: function Tab4Page_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header", 0)(1, "ion-toolbar", 1)(2, "div", 2);
    \u0275\u0275element(3, "img", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-title");
    \u0275\u0275text(5, "Alertas");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "ion-content", 4);
    \u0275\u0275conditionalCreate(7, Tab4Page_Conditional_7_Template, 4, 0, "div", 5)(8, Tab4Page_Conditional_8_Template, 25, 0, "div", 6);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("translucent", true);
    \u0275\u0275advance(6);
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.cargando ? 7 : 8);
  }
}, dependencies: [
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
], styles: ['@charset "UTF-8";\n\n\n\nion-content[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      135deg,\n      #e8f5e9,\n      #c8e6c9);\n  --padding-bottom: 20px;\n}\n.custom-toolbar[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      90deg,\n      #2e7d32,\n      #66bb6a);\n  --color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 10px;\n  padding-bottom: 15px;\n}\n.header-image-container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-bottom: 8px;\n}\n.header-image-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 120px;\n  height: 120px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 4px solid white;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n}\nion-title[_ngcontent-%COMP%] {\n  font-weight: 800;\n  letter-spacing: 2px;\n  font-size: 1.3rem;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 60vh;\n  gap: 15px;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #2e7d32;\n  font-weight: 600;\n  font-size: 1rem;\n  margin: 0;\n}\n.card-guia[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  margin-bottom: 20px;\n  margin-top: 10px;\n  margin-left: 0;\n  margin-right: 0;\n  width: 100%;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border: 1px solid #e0e0e0;\n}\n.card-guia[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --background: transparent;\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n}\n.guia-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  margin-right: 12px;\n}\n.card-guia[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 800;\n  color: #c62828;\n  margin-bottom: 6px;\n}\n.card-guia[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #666;\n  margin: 0;\n  line-height: 1.4;\n}\n.indicador-semana[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  margin: 15px 0 20px 0;\n  padding: 10px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(46, 125, 50, 0.85),\n      rgba(102, 187, 106, 0.85));\n  border-radius: 40px;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n}\n.indicador-semana[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 0.85rem;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n}\n.indicador-semana[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: #ffd700;\n}\n.card-alerta[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  margin-bottom: 14px;\n  margin-left: 0;\n  margin-right: 0;\n  width: 100%;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  border: 1px solid #f0f0f0;\n  transition: all 0.3s ease;\n}\n.card-alerta[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);\n}\n.card-alerta[_ngcontent-%COMP%]:active {\n  transform: scale(0.99);\n}\n.card-alerta[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --background: transparent;\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 14px;\n  --padding-bottom: 14px;\n}\n.alerta-alta[_ngcontent-%COMP%] {\n  border-left: 5px solid #d32f2f;\n  background:\n    linear-gradient(\n      135deg,\n      #ffffff 0%,\n      #ffebee 100%);\n}\n.alerta-media[_ngcontent-%COMP%] {\n  border-left: 5px solid #f57c00;\n  background:\n    linear-gradient(\n      135deg,\n      #ffffff 0%,\n      #fff3e0 100%);\n}\n.alerta-baja[_ngcontent-%COMP%] {\n  border-left: 5px solid #4caf50;\n  background:\n    linear-gradient(\n      135deg,\n      #ffffff 0%,\n      #e8f5e9 100%);\n}\n.icono-alerta-rojo[_ngcontent-%COMP%], \n.icono-alerta-naranja[_ngcontent-%COMP%], \n.icono-alerta-verde[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 14px;\n  flex-shrink: 0;\n}\n.icono-alerta-rojo[_ngcontent-%COMP%] {\n  background: #ffebee;\n}\n.icono-alerta-rojo[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: #d32f2f;\n}\n.icono-alerta-naranja[_ngcontent-%COMP%] {\n  background: #fff3e0;\n}\n.icono-alerta-naranja[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: #f57c00;\n}\n.icono-alerta-verde[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n}\n.icono-alerta-verde[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: #388e3c;\n}\n.badge-rojo[_ngcontent-%COMP%], \n.badge-naranja[_ngcontent-%COMP%], \n.badge-verde[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 0.7rem;\n  font-weight: 800;\n  padding: 4px 12px;\n  border-radius: 20px;\n  margin-bottom: 8px;\n  letter-spacing: 0.5px;\n  font-family: inherit;\n}\n.badge-rojo[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #d32f2f;\n}\n.badge-naranja[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #f57c00;\n}\n.badge-verde[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #388e3c;\n}\n.titulo-alerta-rojo[_ngcontent-%COMP%], \n.titulo-alerta-naranja[_ngcontent-%COMP%], \n.titulo-alerta-verde[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 800;\n  margin-bottom: 6px;\n  font-family: inherit;\n}\n.titulo-alerta-rojo[_ngcontent-%COMP%] {\n  color: #d32f2f;\n}\n.titulo-alerta-naranja[_ngcontent-%COMP%] {\n  color: #f57c00;\n}\n.titulo-alerta-verde[_ngcontent-%COMP%] {\n  color: #388e3c;\n}\n.descripcion-alerta[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #555;\n  line-height: 1.4;\n  margin: 0;\n  font-family: inherit;\n}\n.descripcion-alerta[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: inherit;\n}\n.separador-api[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  margin: 25px 0 15px 0;\n  padding: 10px;\n}\n.separador-api[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: #1976d2;\n}\n.separador-api[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #1976d2;\n  font-weight: 800;\n  font-size: 0.85rem;\n  letter-spacing: 1px;\n}\n.card-api[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  margin-bottom: 14px;\n  margin-left: 0;\n  margin-right: 0;\n  width: 100%;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  border: 1px solid #e3f2fd;\n  transition: all 0.3s ease;\n}\n.card-api[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);\n}\n.card-api[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --background: transparent;\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 14px;\n  --padding-bottom: 14px;\n}\n.card-api[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  color: #1976d2;\n  margin-bottom: 4px;\n}\n.card-api[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #666;\n  margin: 0;\n}\n.mensaje-final[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 30px 0 40px 0;\n  padding: 20px;\n  background: rgba(255, 255, 255, 0.3);\n  border-radius: 20px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.mensaje-final[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  color: #ffd700;\n  margin-bottom: 10px;\n}\n.mensaje-final[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #2e7d32;\n  font-size: 0.85rem;\n  line-height: 1.5;\n  margin: 0;\n  font-weight: 500;\n}\n.card-guia[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeInUp 0.4s ease-out backwards;\n  animation-delay: 0.05s;\n}\n.card-alerta[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeInUp 0.4s ease-out backwards;\n}\n.card-alerta[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0.1s;\n}\n.card-alerta[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.15s;\n}\n.card-alerta[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.2s;\n}\n.card-alerta[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 0.25s;\n}\n.card-alerta[_ngcontent-%COMP%]:nth-child(5) {\n  animation-delay: 0.3s;\n}\n.card-alerta[_ngcontent-%COMP%]:nth-child(6) {\n  animation-delay: 0.35s;\n}\n.card-api[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeInUp 0.4s ease-out backwards;\n  animation-delay: 0.4s;\n}\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (min-width: 768px) {\n  ion-list[_ngcontent-%COMP%] {\n    max-width: 100%;\n    margin: 0;\n    padding-left: 16px;\n    padding-right: 16px;\n  }\n  .card-guia[_ngcontent-%COMP%], \n   .card-alerta[_ngcontent-%COMP%], \n   .card-api[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .card-guia[_ngcontent-%COMP%], \n   .card-alerta[_ngcontent-%COMP%], \n   .card-api[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=tab4.page.css.map */'] });
var Tab4Page = _Tab4Page;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tab4Page, [{
    type: Component,
    args: [{ selector: "app-tab4", standalone: true, imports: [
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
    ], template: `<ion-header [translucent]="true">\r
  <ion-toolbar class="custom-toolbar">\r
    <div class="header-image-container">\r
      <img src="../assets/TBCST.jpeg" alt="Logo">\r
    </div>\r
    <ion-title>Alertas</ion-title>\r
  </ion-toolbar>\r
</ion-header>\r
\r
<ion-content [fullscreen]="true">\r
  \r
  @if (cargando) {\r
    <div class="loading-container">\r
      <ion-spinner name="crescent" color="success"></ion-spinner>\r
      <p>Cargando alertas...</p>\r
    </div>\r
  } @else {\r
    <div class="ion-list-container">\r
      <ion-list lines="none" class="ion-padding-horizontal">\r
        \r
        <ion-card class="card-guia" mode="ios">\r
          <ion-item button href="https://youtu.be/67pZW5hcQC4?si=IbeRaDvaQWDwqfvg" target="_blank" detail="false" lines="none">\r
            <ion-icon name="alert-circle" slot="start" color="danger" class="guia-icon"></ion-icon>\r
            <ion-label>\r
              <h2>\u{1F30E} \xBFQu\xE9 pasa si NO reciclamos bien?</h2>\r
              <p>Conoce el destino real de la basura mal gestionada y el impacto en nuestro planeta. \xA1Haz clic para ver el reportaje!</p>\r
            </ion-label>\r
            <ion-button slot="end" fill="clear" color="danger">\r
              <ion-icon name="play-circle" style="font-size: 2rem;"></ion-icon>\r
            </ion-button>\r
          </ion-item>\r
        </ion-card>\r
\r
        <div class="indicador-semana">\r
          <ion-icon name="calendar-outline"></ion-icon>\r
          <span>\u2728 Alertas nuevas cada semana \u2728</span>\r
          <ion-icon name="sparkles"></ion-icon>\r
        </div>\r
\r
        @for (alerta of alertasSemana; track alerta.id || $index; let i = $index) {\r
          <ion-card class="card-alerta" mode="ios" \r
                    [class.alerta-alta]="alerta.prioridad === 'alta'"\r
                    [class.alerta-media]="alerta.prioridad === 'media'"\r
                    [class.alerta-baja]="alerta.prioridad === 'baja'"\r
                    [style.animation-delay]="(i * 0.05) + 's'">\r
            <ion-item detail="false" lines="none">\r
              <div class="icono-alerta" \r
                   [class.icono-alerta-rojo]="alerta.prioridad === 'alta'"\r
                   [class.icono-alerta-naranja]="alerta.prioridad === 'media'"\r
                   [class.icono-alerta-verde]="alerta.prioridad === 'baja'">\r
                <ion-icon [name]="alerta.icono"></ion-icon>\r
              </div>\r
              <ion-label>\r
                <div class="badge-alerta" \r
                     [class.badge-rojo]="alerta.prioridad === 'alta'"\r
                     [class.badge-naranja]="alerta.prioridad === 'media'"\r
                     [class.badge-verde]="alerta.prioridad === 'baja'">\r
                  {{ alerta.badge }}\r
                </div>\r
                <h2 class="titulo-alerta">{{ alerta.titulo }}</h2>\r
                <p class="descripcion-alerta">{{ alerta.descripcion }}</p>\r
              </ion-label>\r
            </ion-item>\r
          </ion-card>\r
        }\r
\r
        <div class="mensaje-final">\r
          <ion-icon name="heart-circle-outline"></ion-icon>\r
          <p>Peque\xF1as acciones, grandes cambios. \u{1F331}<br>\xA1Gracias por reciclar correctamente!</p>\r
        </div>\r
\r
      </ion-list>\r
    </div>\r
  }\r
\r
</ion-content>`, styles: ['@charset "UTF-8";\n\n/* src/app/tab4/tab4.page.scss */\nion-content {\n  --background:\n    linear-gradient(\n      135deg,\n      #e8f5e9,\n      #c8e6c9);\n  --padding-bottom: 20px;\n}\n.custom-toolbar {\n  --background:\n    linear-gradient(\n      90deg,\n      #2e7d32,\n      #66bb6a);\n  --color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 10px;\n  padding-bottom: 15px;\n}\n.header-image-container {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-bottom: 8px;\n}\n.header-image-container img {\n  width: 120px;\n  height: 120px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 4px solid white;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n}\nion-title {\n  font-weight: 800;\n  letter-spacing: 2px;\n  font-size: 1.3rem;\n}\n.loading-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 60vh;\n  gap: 15px;\n}\n.loading-container p {\n  color: #2e7d32;\n  font-weight: 600;\n  font-size: 1rem;\n  margin: 0;\n}\n.card-guia {\n  background: white;\n  border-radius: 16px;\n  margin-bottom: 20px;\n  margin-top: 10px;\n  margin-left: 0;\n  margin-right: 0;\n  width: 100%;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  border: 1px solid #e0e0e0;\n}\n.card-guia ion-item {\n  --background: transparent;\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n}\n.guia-icon {\n  font-size: 2rem;\n  margin-right: 12px;\n}\n.card-guia h2 {\n  font-size: 1.1rem;\n  font-weight: 800;\n  color: #c62828;\n  margin-bottom: 6px;\n}\n.card-guia p {\n  font-size: 0.85rem;\n  color: #666;\n  margin: 0;\n  line-height: 1.4;\n}\n.indicador-semana {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  margin: 15px 0 20px 0;\n  padding: 10px 16px;\n  background:\n    linear-gradient(\n      135deg,\n      rgba(46, 125, 50, 0.85),\n      rgba(102, 187, 106, 0.85));\n  border-radius: 40px;\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);\n}\n.indicador-semana span {\n  color: white;\n  font-size: 0.85rem;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n}\n.indicador-semana ion-icon {\n  font-size: 1.2rem;\n  color: #ffd700;\n}\n.card-alerta {\n  background: white;\n  border-radius: 16px;\n  margin-bottom: 14px;\n  margin-left: 0;\n  margin-right: 0;\n  width: 100%;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  border: 1px solid #f0f0f0;\n  transition: all 0.3s ease;\n}\n.card-alerta:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);\n}\n.card-alerta:active {\n  transform: scale(0.99);\n}\n.card-alerta ion-item {\n  --background: transparent;\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 14px;\n  --padding-bottom: 14px;\n}\n.alerta-alta {\n  border-left: 5px solid #d32f2f;\n  background:\n    linear-gradient(\n      135deg,\n      #ffffff 0%,\n      #ffebee 100%);\n}\n.alerta-media {\n  border-left: 5px solid #f57c00;\n  background:\n    linear-gradient(\n      135deg,\n      #ffffff 0%,\n      #fff3e0 100%);\n}\n.alerta-baja {\n  border-left: 5px solid #4caf50;\n  background:\n    linear-gradient(\n      135deg,\n      #ffffff 0%,\n      #e8f5e9 100%);\n}\n.icono-alerta-rojo,\n.icono-alerta-naranja,\n.icono-alerta-verde {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 14px;\n  flex-shrink: 0;\n}\n.icono-alerta-rojo {\n  background: #ffebee;\n}\n.icono-alerta-rojo ion-icon {\n  font-size: 28px;\n  color: #d32f2f;\n}\n.icono-alerta-naranja {\n  background: #fff3e0;\n}\n.icono-alerta-naranja ion-icon {\n  font-size: 28px;\n  color: #f57c00;\n}\n.icono-alerta-verde {\n  background: #e8f5e9;\n}\n.icono-alerta-verde ion-icon {\n  font-size: 28px;\n  color: #388e3c;\n}\n.badge-rojo,\n.badge-naranja,\n.badge-verde {\n  display: inline-block;\n  font-size: 0.7rem;\n  font-weight: 800;\n  padding: 4px 12px;\n  border-radius: 20px;\n  margin-bottom: 8px;\n  letter-spacing: 0.5px;\n  font-family: inherit;\n}\n.badge-rojo {\n  background: #ffebee;\n  color: #d32f2f;\n}\n.badge-naranja {\n  background: #fff3e0;\n  color: #f57c00;\n}\n.badge-verde {\n  background: #e8f5e9;\n  color: #388e3c;\n}\n.titulo-alerta-rojo,\n.titulo-alerta-naranja,\n.titulo-alerta-verde {\n  font-size: 1rem;\n  font-weight: 800;\n  margin-bottom: 6px;\n  font-family: inherit;\n}\n.titulo-alerta-rojo {\n  color: #d32f2f;\n}\n.titulo-alerta-naranja {\n  color: #f57c00;\n}\n.titulo-alerta-verde {\n  color: #388e3c;\n}\n.descripcion-alerta {\n  font-size: 0.85rem;\n  color: #555;\n  line-height: 1.4;\n  margin: 0;\n  font-family: inherit;\n}\n.descripcion-alerta strong {\n  color: inherit;\n}\n.separador-api {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  margin: 25px 0 15px 0;\n  padding: 10px;\n}\n.separador-api ion-icon {\n  font-size: 22px;\n  color: #1976d2;\n}\n.separador-api span {\n  color: #1976d2;\n  font-weight: 800;\n  font-size: 0.85rem;\n  letter-spacing: 1px;\n}\n.card-api {\n  background: white;\n  border-radius: 16px;\n  margin-bottom: 14px;\n  margin-left: 0;\n  margin-right: 0;\n  width: 100%;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  border: 1px solid #e3f2fd;\n  transition: all 0.3s ease;\n}\n.card-api:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);\n}\n.card-api ion-item {\n  --background: transparent;\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 14px;\n  --padding-bottom: 14px;\n}\n.card-api h2 {\n  font-size: 1rem;\n  font-weight: 700;\n  color: #1976d2;\n  margin-bottom: 4px;\n}\n.card-api p {\n  font-size: 0.8rem;\n  color: #666;\n  margin: 0;\n}\n.mensaje-final {\n  text-align: center;\n  margin: 30px 0 40px 0;\n  padding: 20px;\n  background: rgba(255, 255, 255, 0.3);\n  border-radius: 20px;\n  -webkit-backdrop-filter: blur(4px);\n  backdrop-filter: blur(4px);\n}\n.mensaje-final ion-icon {\n  font-size: 2rem;\n  color: #ffd700;\n  margin-bottom: 10px;\n}\n.mensaje-final p {\n  color: #2e7d32;\n  font-size: 0.85rem;\n  line-height: 1.5;\n  margin: 0;\n  font-weight: 500;\n}\n.card-guia {\n  animation: fadeInUp 0.4s ease-out backwards;\n  animation-delay: 0.05s;\n}\n.card-alerta {\n  animation: fadeInUp 0.4s ease-out backwards;\n}\n.card-alerta:nth-child(1) {\n  animation-delay: 0.1s;\n}\n.card-alerta:nth-child(2) {\n  animation-delay: 0.15s;\n}\n.card-alerta:nth-child(3) {\n  animation-delay: 0.2s;\n}\n.card-alerta:nth-child(4) {\n  animation-delay: 0.25s;\n}\n.card-alerta:nth-child(5) {\n  animation-delay: 0.3s;\n}\n.card-alerta:nth-child(6) {\n  animation-delay: 0.35s;\n}\n.card-api {\n  animation: fadeInUp 0.4s ease-out backwards;\n  animation-delay: 0.4s;\n}\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (min-width: 768px) {\n  ion-list {\n    max-width: 100%;\n    margin: 0;\n    padding-left: 16px;\n    padding-right: 16px;\n  }\n  .card-guia,\n  .card-alerta,\n  .card-api {\n    max-width: 100%;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .card-guia,\n  .card-alerta,\n  .card-api {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=tab4.page.css.map */\n'] }]
  }], () => [{ type: HttpClient }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Tab4Page, { className: "Tab4Page", filePath: "src/app/tab4/tab4.page.ts", lineNumber: 59 });
})();
export {
  Tab4Page
};
//# sourceMappingURL=tab4.page-GGFECG6I.js.map
