import {
  addIcons
} from "./chunk-GCUUTFL4.js";
import {
  beaker,
  bookOutline,
  closeCircle,
  documentText,
  leaf,
  openOutline,
  warning,
  wine
} from "./chunk-4OLBXMDD.js";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTitle,
  IonToolbar
} from "./chunk-E5QEEIGS.js";
import {
  CommonModule,
  Component,
  HttpClient,
  HttpClientModule,
  NgForOf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
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

// src/app/tab2/tab2.page.ts
function Tab2Page_ion_item_113_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item", 26);
    \u0275\u0275element(1, "ion-icon", 27);
    \u0275\u0275elementStart(2, "ion-label")(3, "p", 28);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "h2", 29);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Haz clic para abrir el enlace");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(9, "ion-icon", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const enlace_r1 = ctx.$implicit;
    \u0275\u0275property("href", enlace_r1.url);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(enlace_r1.categoria || "Recurso Educativo");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(enlace_r1.titulo);
  }
}
var _Tab2Page = class _Tab2Page {
  constructor(http) {
    this.http = http;
    this.enlaces = [];
    addIcons({
      leaf,
      beaker,
      wine,
      warning,
      "document-text": documentText,
      "close-circle": closeCircle,
      "book-outline": bookOutline,
      "open-outline": openOutline
    });
  }
  ngOnInit() {
    this.obtenerEnlaces();
  }
  obtenerEnlaces() {
    this.http.get("http://localhost:3000/enlaces").subscribe({
      next: (data) => {
        this.enlaces = data;
        console.log("Enlaces cargados:", this.enlaces);
      },
      error: (err) => {
        console.error("Error al obtener enlaces de la BD:", err);
      }
    });
  }
};
_Tab2Page.\u0275fac = function Tab2Page_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _Tab2Page)(\u0275\u0275directiveInject(HttpClient));
};
_Tab2Page.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Tab2Page, selectors: [["app-tab2"]], decls: 114, vars: 1, consts: [[1, "ion-no-border"], [1, "custom-toolbar"], [1, "header-image-container"], ["src", "../assets/TBCST.jpeg", "alt", "Logo"], [1, "ion-padding"], [1, "welcome-text"], [1, "underline"], [1, "section-title"], [1, "ion-no-padding"], ["size", "6"], [1, "guide-card", "card-organico"], [1, "icon-container"], ["name", "leaf"], [1, "guide-card", "card-plastico"], ["name", "beaker"], [1, "guide-card", "card-papel"], ["name", "document-text"], [1, "guide-card", "card-vidrio"], ["name", "wine"], [1, "guide-card", "card-no-reciclable"], ["name", "close-circle"], [1, "guide-card", "card-peligroso"], ["name", "warning"], [1, "resources-card"], ["lines", "full"], ["button", "", "target", "_blank", "class", "enlace-item", 3, "href", 4, "ngFor", "ngForOf"], ["button", "", "target", "_blank", 1, "enlace-item", 3, "href"], ["name", "book-outline", "slot", "start", "color", "primary"], [1, "enlace-categoria"], [1, "enlace-titulo"], ["name", "open-outline", "slot", "end", "size", "small"]], template: function Tab2Page_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header", 0)(1, "ion-toolbar", 1)(2, "div", 2);
    \u0275\u0275element(3, "img", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-title");
    \u0275\u0275text(5, "Educaci\xF3n Ambiental");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "ion-content", 4)(7, "div", 5)(8, "h2");
    \u0275\u0275text(9, "Separar para Transformar");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "div", 6);
    \u0275\u0275elementStart(11, "p");
    \u0275\u0275text(12, "Aprende a clasificar tus residuos correctamente para darle un respiro al planeta.");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "h3", 7);
    \u0275\u0275text(14, "Gu\xEDa de Separaci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "ion-grid", 8)(16, "ion-row")(17, "ion-col", 9)(18, "ion-card", 10)(19, "div", 11);
    \u0275\u0275element(20, "ion-icon", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "ion-card-header")(22, "ion-card-subtitle");
    \u0275\u0275text(23, "Org\xE1nico");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "ion-card-content");
    \u0275\u0275text(25, " -Restos de comida.");
    \u0275\u0275element(26, "br");
    \u0275\u0275text(27, " -C\xE1scaras de fruta.");
    \u0275\u0275element(28, "br");
    \u0275\u0275text(29, " -Hojas y plantas.");
    \u0275\u0275element(30, "br");
    \u0275\u0275text(31, " -Caf\xE9 y t\xE9. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "ion-col", 9)(33, "ion-card", 13)(34, "div", 11);
    \u0275\u0275element(35, "ion-icon", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "ion-card-header")(37, "ion-card-subtitle");
    \u0275\u0275text(38, "Pl\xE1stico");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "ion-card-content");
    \u0275\u0275text(40, " -Botellas PET.");
    \u0275\u0275element(41, "br");
    \u0275\u0275text(42, " -Envases vac\xEDos.");
    \u0275\u0275element(43, "br");
    \u0275\u0275text(44, " -Tapas de pl\xE1stico.");
    \u0275\u0275element(45, "br");
    \u0275\u0275text(46, " -Bolsas limpias. ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(47, "ion-row")(48, "ion-col", 9)(49, "ion-card", 15)(50, "div", 11);
    \u0275\u0275element(51, "ion-icon", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "ion-card-header")(53, "ion-card-subtitle");
    \u0275\u0275text(54, "Papel");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "ion-card-content");
    \u0275\u0275text(56, " -Hojas y folios.");
    \u0275\u0275element(57, "br");
    \u0275\u0275text(58, " -Cart\xF3n y cajas.");
    \u0275\u0275element(59, "br");
    \u0275\u0275text(60, " -Peri\xF3dicos.");
    \u0275\u0275element(61, "br");
    \u0275\u0275text(62, " -Revistas. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(63, "ion-col", 9)(64, "ion-card", 17)(65, "div", 11);
    \u0275\u0275element(66, "ion-icon", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "ion-card-header")(68, "ion-card-subtitle");
    \u0275\u0275text(69, "Vidrio");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(70, "ion-card-content");
    \u0275\u0275text(71, " -Botellas de vidrio.");
    \u0275\u0275element(72, "br");
    \u0275\u0275text(73, " -Frascos limpios.");
    \u0275\u0275element(74, "br");
    \u0275\u0275text(75, " -Envases perfume.");
    \u0275\u0275element(76, "br");
    \u0275\u0275text(77, " -Tarros. ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(78, "ion-row")(79, "ion-col", 9)(80, "ion-card", 19)(81, "div", 11);
    \u0275\u0275element(82, "ion-icon", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "ion-card-header")(84, "ion-card-subtitle");
    \u0275\u0275text(85, "No Reciclable");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(86, "ion-card-content");
    \u0275\u0275text(87, " -Papel sanitario.");
    \u0275\u0275element(88, "br");
    \u0275\u0275text(89, " -Colillas.");
    \u0275\u0275element(90, "br");
    \u0275\u0275text(91, " -Pa\xF1ales.");
    \u0275\u0275element(92, "br");
    \u0275\u0275text(93, " -Servilletas. ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(94, "ion-col", 9)(95, "ion-card", 21)(96, "div", 11);
    \u0275\u0275element(97, "ion-icon", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(98, "ion-card-header")(99, "ion-card-subtitle");
    \u0275\u0275text(100, "Peligrosos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(101, "ion-card-content");
    \u0275\u0275text(102, " -Pilas y bater\xEDas.");
    \u0275\u0275element(103, "br");
    \u0275\u0275text(104, " -Focos y luces.");
    \u0275\u0275element(105, "br");
    \u0275\u0275text(106, " -Medicamentos.");
    \u0275\u0275element(107, "br");
    \u0275\u0275text(108, " -Qu\xEDmicos. ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(109, "h3", 7);
    \u0275\u0275text(110, "Recursos Externos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(111, "ion-card", 23)(112, "ion-list", 24);
    \u0275\u0275template(113, Tab2Page_ion_item_113_Template, 10, 3, "ion-item", 25);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(113);
    \u0275\u0275property("ngForOf", ctx.enlaces);
  }
}, dependencies: [
  CommonModule,
  NgForOf,
  HttpClientModule,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonCardSubtitle,
  IonCardContent,
  IonLabel,
  IonList,
  IonItem,
  IonCard,
  IonCardHeader
], styles: ['@charset "UTF-8";\n\n\n\nion-content[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      135deg,\n      #e8f5e9,\n      #c8e6c9);\n}\n.custom-toolbar[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      90deg,\n      #2e7d32,\n      #66bb6a);\n  --color: #ffffff;\n  padding: 10px 0;\n}\n.custom-toolbar[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%] {\n  font-weight: 800;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  font-size: 1.1rem;\n  text-align: center;\n}\n.header-image-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 5px;\n}\n.header-image-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 3px solid white;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n}\n.welcome-text[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 15px 10px 25px 10px;\n}\n.welcome-text[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-weight: 800;\n  color: #1b5e20;\n  margin-bottom: 5px;\n}\n.welcome-text[_ngcontent-%COMP%]   .underline[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 3px;\n  background: #66bb6a;\n  margin: 0 auto 10px;\n}\n.welcome-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #4e7e4e;\n  font-size: 0.95rem;\n}\n.section-title[_ngcontent-%COMP%] {\n  padding-left: 15px;\n  font-weight: bold;\n  color: #2e7d32;\n  font-size: 1.1rem;\n  margin-top: 20px;\n}\n.guide-card[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);\n  margin: 8px;\n  background: #ffffff;\n  min-height: 210px;\n  transition: transform 0.2s;\n}\n.guide-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.96);\n}\n.guide-card[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%] {\n  text-align: center;\n  padding-top: 15px;\n  font-size: 2.5rem;\n}\n.guide-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n  padding: 10px 15px 5px 15px;\n}\n.guide-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-subtitle[_ngcontent-%COMP%] {\n  font-weight: 800;\n  color: #333;\n  font-size: 0.85rem;\n}\n.guide-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  line-height: 1.4;\n  color: #666;\n  text-align: left;\n  padding: 0 15px 15px 15px;\n}\n.card-organico[_ngcontent-%COMP%] {\n  border-bottom: 6px solid #8b5e3c;\n}\n.card-organico[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%] {\n  color: #8b5e3c;\n}\n.card-plastico[_ngcontent-%COMP%] {\n  border-bottom: 6px solid #ffd534;\n}\n.card-plastico[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%] {\n  color: #ffd534;\n}\n.card-papel[_ngcontent-%COMP%] {\n  border-bottom: 6px solid #3880ff;\n}\n.card-papel[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%] {\n  color: #3880ff;\n}\n.card-vidrio[_ngcontent-%COMP%] {\n  border-bottom: 6px solid #2dd36f;\n}\n.card-vidrio[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%] {\n  color: #2dd36f;\n}\n.card-no-reciclable[_ngcontent-%COMP%] {\n  border-bottom: 6px solid #616161;\n}\n.card-no-reciclable[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%] {\n  color: #616161;\n}\n.card-peligroso[_ngcontent-%COMP%] {\n  border-bottom: 6px solid #d32f2f;\n}\n.card-peligroso[_ngcontent-%COMP%]   .icon-container[_ngcontent-%COMP%] {\n  color: #d32f2f;\n}\n.resources-card[_ngcontent-%COMP%] {\n  margin: 15px 10px;\n  border-radius: 20px;\n  background: rgba(255, 255, 255, 0.9);\n}\n.resources-card[_ngcontent-%COMP%]   .enlace-item[_ngcontent-%COMP%] {\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n}\n.resources-card[_ngcontent-%COMP%]   .enlace-item[_ngcontent-%COMP%]   .enlace-categoria[_ngcontent-%COMP%] {\n  font-size: 0.65rem;\n  font-weight: bold;\n  color: #388e3c;\n}\n.resources-card[_ngcontent-%COMP%]   .enlace-item[_ngcontent-%COMP%]   .enlace-titulo[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #2e7d32;\n  font-size: 1rem;\n  margin: 2px 0;\n}\n/*# sourceMappingURL=tab2.page.css.map */'] });
var Tab2Page = _Tab2Page;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tab2Page, [{
    type: Component,
    args: [{ selector: "app-tab2", standalone: true, imports: [
      CommonModule,
      HttpClientModule,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonGrid,
      IonRow,
      IonCol,
      IonIcon,
      IonCardSubtitle,
      IonCardContent,
      IonLabel,
      IonList,
      IonItem,
      IonCard,
      IonCardHeader
    ], template: `<ion-header class="ion-no-border">\r
  <ion-toolbar class="custom-toolbar">\r
    <div class="header-image-container">\r
      <img src="../assets/TBCST.jpeg" alt="Logo">\r
    </div>\r
    <ion-title>Educaci\xF3n Ambiental</ion-title>\r
  </ion-toolbar>\r
</ion-header>\r
\r
<ion-content class="ion-padding">\r
  <div class="welcome-text">\r
    <h2>Separar para Transformar</h2>\r
    <div class="underline"></div>\r
    <p>Aprende a clasificar tus residuos correctamente para darle un respiro al planeta.</p>\r
  </div>\r
\r
  <h3 class="section-title">Gu\xEDa de Separaci\xF3n</h3>\r
\r
  <ion-grid class="ion-no-padding">\r
    <ion-row>\r
  \r
      <ion-col size="6">\r
        <ion-card class="guide-card card-organico">\r
          <div class="icon-container"><ion-icon name="leaf"></ion-icon></div>\r
          <ion-card-header>\r
            <ion-card-subtitle>Org\xE1nico</ion-card-subtitle>\r
          </ion-card-header>\r
          <ion-card-content>\r
            -Restos de comida.<br>\r
            -C\xE1scaras de fruta.<br>\r
            -Hojas y plantas.<br>\r
            -Caf\xE9 y t\xE9.\r
          </ion-card-content>\r
        </ion-card>\r
      </ion-col>\r
\r
    \r
      <ion-col size="6">\r
        <ion-card class="guide-card card-plastico">\r
          <div class="icon-container"><ion-icon name="beaker"></ion-icon></div>\r
          <ion-card-header>\r
            <ion-card-subtitle>Pl\xE1stico</ion-card-subtitle>\r
          </ion-card-header>\r
          <ion-card-content>\r
            -Botellas PET.<br>\r
            -Envases vac\xEDos.<br>\r
            -Tapas de pl\xE1stico.<br>\r
            -Bolsas limpias.\r
          </ion-card-content>\r
        </ion-card>\r
      </ion-col>\r
    </ion-row>\r
\r
    <ion-row>\r
  \r
      <ion-col size="6">\r
        <ion-card class="guide-card card-papel">\r
          <div class="icon-container"><ion-icon name="document-text"></ion-icon></div>\r
          <ion-card-header>\r
            <ion-card-subtitle>Papel</ion-card-subtitle>\r
          </ion-card-header>\r
          <ion-card-content>\r
            -Hojas y folios.<br>\r
            -Cart\xF3n y cajas.<br>\r
            -Peri\xF3dicos.<br>\r
            -Revistas.\r
          </ion-card-content>\r
        </ion-card>\r
      </ion-col>\r
\r
\r
      <ion-col size="6">\r
        <ion-card class="guide-card card-vidrio">\r
          <div class="icon-container"><ion-icon name="wine"></ion-icon></div>\r
          <ion-card-header>\r
            <ion-card-subtitle>Vidrio</ion-card-subtitle>\r
          </ion-card-header>\r
          <ion-card-content>\r
            -Botellas de vidrio.<br>\r
            -Frascos limpios.<br>\r
            -Envases perfume.<br>\r
            -Tarros.\r
          </ion-card-content>\r
        </ion-card>\r
      </ion-col>\r
    </ion-row>\r
\r
    <ion-row>\r
\r
      <ion-col size="6">\r
        <ion-card class="guide-card card-no-reciclable">\r
          <div class="icon-container"><ion-icon name="close-circle"></ion-icon></div>\r
          <ion-card-header>\r
            <ion-card-subtitle>No Reciclable</ion-card-subtitle>\r
          </ion-card-header>\r
          <ion-card-content>\r
            -Papel sanitario.<br>\r
            -Colillas.<br>\r
            -Pa\xF1ales.<br>\r
            -Servilletas.\r
          </ion-card-content>\r
        </ion-card>\r
      </ion-col>\r
      <ion-col size="6">\r
        <ion-card class="guide-card card-peligroso">\r
          <div class="icon-container"><ion-icon name="warning"></ion-icon></div>\r
          <ion-card-header>\r
            <ion-card-subtitle>Peligrosos</ion-card-subtitle>\r
          </ion-card-header>\r
          <ion-card-content>\r
            -Pilas y bater\xEDas.<br>\r
            -Focos y luces.<br>\r
            -Medicamentos.<br>\r
            -Qu\xEDmicos.\r
          </ion-card-content>\r
        </ion-card>\r
      </ion-col>\r
    </ion-row>\r
  </ion-grid>\r
\r
  <h3 class="section-title">Recursos Externos</h3>\r
  <ion-card class="resources-card">\r
    <ion-list lines="full">\r
      <ion-item *ngFor="let enlace of enlaces" button [href]="enlace.url" target="_blank" class="enlace-item">\r
        <ion-icon name="book-outline" slot="start" color="primary"></ion-icon>\r
        <ion-label>\r
          <p class="enlace-categoria">{{ enlace.categoria || 'Recurso Educativo' }}</p>\r
          <h2 class="enlace-titulo">{{ enlace.titulo }}</h2>\r
          <p>Haz clic para abrir el enlace</p>\r
        </ion-label>\r
        <ion-icon name="open-outline" slot="end" size="small"></ion-icon>\r
      </ion-item>\r
    </ion-list>\r
  </ion-card>\r
</ion-content>`, styles: ['@charset "UTF-8";\n\n/* src/app/tab2/tab2.page.scss */\nion-content {\n  --background:\n    linear-gradient(\n      135deg,\n      #e8f5e9,\n      #c8e6c9);\n}\n.custom-toolbar {\n  --background:\n    linear-gradient(\n      90deg,\n      #2e7d32,\n      #66bb6a);\n  --color: #ffffff;\n  padding: 10px 0;\n}\n.custom-toolbar ion-title {\n  font-weight: 800;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  font-size: 1.1rem;\n  text-align: center;\n}\n.header-image-container {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 5px;\n}\n.header-image-container img {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 3px solid white;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n}\n.welcome-text {\n  text-align: center;\n  margin: 15px 10px 25px 10px;\n}\n.welcome-text h2 {\n  font-weight: 800;\n  color: #1b5e20;\n  margin-bottom: 5px;\n}\n.welcome-text .underline {\n  width: 40px;\n  height: 3px;\n  background: #66bb6a;\n  margin: 0 auto 10px;\n}\n.welcome-text p {\n  color: #4e7e4e;\n  font-size: 0.95rem;\n}\n.section-title {\n  padding-left: 15px;\n  font-weight: bold;\n  color: #2e7d32;\n  font-size: 1.1rem;\n  margin-top: 20px;\n}\n.guide-card {\n  border-radius: 20px;\n  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);\n  margin: 8px;\n  background: #ffffff;\n  min-height: 210px;\n  transition: transform 0.2s;\n}\n.guide-card:active {\n  transform: scale(0.96);\n}\n.guide-card .icon-container {\n  text-align: center;\n  padding-top: 15px;\n  font-size: 2.5rem;\n}\n.guide-card ion-card-header {\n  padding: 10px 15px 5px 15px;\n}\n.guide-card ion-card-header ion-card-subtitle {\n  font-weight: 800;\n  color: #333;\n  font-size: 0.85rem;\n}\n.guide-card ion-card-content {\n  font-size: 0.75rem;\n  line-height: 1.4;\n  color: #666;\n  text-align: left;\n  padding: 0 15px 15px 15px;\n}\n.card-organico {\n  border-bottom: 6px solid #8b5e3c;\n}\n.card-organico .icon-container {\n  color: #8b5e3c;\n}\n.card-plastico {\n  border-bottom: 6px solid #ffd534;\n}\n.card-plastico .icon-container {\n  color: #ffd534;\n}\n.card-papel {\n  border-bottom: 6px solid #3880ff;\n}\n.card-papel .icon-container {\n  color: #3880ff;\n}\n.card-vidrio {\n  border-bottom: 6px solid #2dd36f;\n}\n.card-vidrio .icon-container {\n  color: #2dd36f;\n}\n.card-no-reciclable {\n  border-bottom: 6px solid #616161;\n}\n.card-no-reciclable .icon-container {\n  color: #616161;\n}\n.card-peligroso {\n  border-bottom: 6px solid #d32f2f;\n}\n.card-peligroso .icon-container {\n  color: #d32f2f;\n}\n.resources-card {\n  margin: 15px 10px;\n  border-radius: 20px;\n  background: rgba(255, 255, 255, 0.9);\n}\n.resources-card .enlace-item {\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n}\n.resources-card .enlace-item .enlace-categoria {\n  font-size: 0.65rem;\n  font-weight: bold;\n  color: #388e3c;\n}\n.resources-card .enlace-item .enlace-titulo {\n  font-weight: 700;\n  color: #2e7d32;\n  font-size: 1rem;\n  margin: 2px 0;\n}\n/*# sourceMappingURL=tab2.page.css.map */\n'] }]
  }], () => [{ type: HttpClient }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Tab2Page, { className: "Tab2Page", filePath: "src/app/tab2/tab2.page.ts", lineNumber: 29 });
})();
export {
  Tab2Page
};
//# sourceMappingURL=tab2.page-GPDDIDL5.js.map
