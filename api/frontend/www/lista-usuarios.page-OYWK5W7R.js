import {
  UserService
} from "./chunk-FBM4A2ZM.js";
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonicModule
} from "./chunk-ZKEBGSOY.js";
import "./chunk-JOKYH6EE.js";
import "./chunk-W7NNY2EY.js";
import "./chunk-LQCMKDHO.js";
import "./chunk-KG4FNADJ.js";
import "./chunk-IMOXAELS.js";
import "./chunk-2ARKWVXQ.js";
import "./chunk-2KALOVRJ.js";
import "./chunk-3IM67RMO.js";
import "./chunk-OM75IFBM.js";
import "./chunk-GUTKGPI6.js";
import "./chunk-W6ER52DC.js";
import "./chunk-PLJOXF7D.js";
import "./chunk-F3JJ4YWB.js";
import "./chunk-QOQL43QQ.js";
import "./chunk-CIJRZ76T.js";
import "./chunk-IVBL4Y7V.js";
import "./chunk-5XZD3KOY.js";
import {
  CommonModule,
  Component,
  NgForOf,
  Router,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-6FBQLITM.js";
import "./chunk-B4QRZDQS.js";
import "./chunk-P4JTPYNW.js";
import "./chunk-LZJBBD2J.js";
import "./chunk-OL3WNRC6.js";
import "./chunk-7D2IXJO2.js";
import "./chunk-AVKBR3MH.js";
import "./chunk-CODWS2MM.js";
import "./chunk-YAS4LRVC.js";
import "./chunk-UL2P3LPA.js";

// src/app/lista-usuarios/lista-usuarios.page.ts
function ListaUsuariosPage_ion_item_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-avatar", 2);
    \u0275\u0275element(2, "img", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ion-label")(4, "h2");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "ion-button", 4);
    \u0275\u0275listener("click", function ListaUsuariosPage_ion_item_6_Template_ion_button_click_8_listener() {
      const usuario_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.irAEditar(usuario_r2));
    });
    \u0275\u0275element(9, "ion-icon", 5);
    \u0275\u0275text(10, " Editar ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const usuario_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", usuario_r2.foto ? "data:image/jpeg;base64," + usuario_r2.foto : "assets/no-avatar.png", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(usuario_r2.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("CURP: ", usuario_r2.curp);
  }
}
var _ListaUsuariosPage = class _ListaUsuariosPage {
  constructor(userService, router) {
    this.userService = userService;
    this.router = router;
    this.usuarios = [];
  }
  ionViewWillEnter() {
    this.cargarUsuarios();
  }
  ngOnInit() {
  }
  cargarUsuarios() {
    this.userService.getTodosLosUsuarios().subscribe((res) => {
      this.usuarios = res;
    });
  }
  irAEditar(u) {
    this.userService.usuarioSeleccionado = u;
    this.router.navigate(["/editar-usuario"]);
  }
};
_ListaUsuariosPage.\u0275fac = function ListaUsuariosPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ListaUsuariosPage)(\u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(Router));
};
_ListaUsuariosPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListaUsuariosPage, selectors: [["app-lista-usuarios"]], decls: 7, vars: 1, consts: [["color", "primary"], [4, "ngFor", "ngForOf"], ["slot", "start"], [3, "src"], ["slot", "end", "fill", "clear", 3, "click"], ["name", "create-outline"]], template: function ListaUsuariosPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar", 0)(2, "ion-title");
    \u0275\u0275text(3, "Administrar Usuarios");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(4, "ion-content")(5, "ion-list");
    \u0275\u0275template(6, ListaUsuariosPage_ion_item_6_Template, 11, 3, "ion-item", 1);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx.usuarios);
  }
}, dependencies: [IonicModule, IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar, CommonModule, NgForOf], encapsulation: 2 });
var ListaUsuariosPage = _ListaUsuariosPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ListaUsuariosPage, [{
    type: Component,
    args: [{ selector: "app-lista-usuarios", standalone: true, imports: [IonicModule, CommonModule], template: `<ion-header>\r
  <ion-toolbar color="primary">\r
    <ion-title>Administrar Usuarios</ion-title>\r
  </ion-toolbar>\r
</ion-header>\r
\r
<ion-content>\r
  <ion-list>\r
    <ion-item *ngFor="let usuario of usuarios">\r
      <ion-avatar slot="start">\r
  <img [src]="usuario.foto ? 'data:image/jpeg;base64,' + usuario.foto : 'assets/no-avatar.png'" />\r
</ion-avatar>\r
\r
      <ion-label>\r
        <h2>{{ usuario.nombre }}</h2>\r
        <p>CURP: {{ usuario.curp }}</p>\r
      </ion-label>\r
\r
      <ion-button slot="end" fill="clear" (click)="irAEditar(usuario)">\r
        <ion-icon name="create-outline"></ion-icon>\r
        Editar\r
      </ion-button>\r
    </ion-item>\r
  </ion-list>\r
</ion-content>\r
` }]
  }], () => [{ type: UserService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListaUsuariosPage, { className: "ListaUsuariosPage", filePath: "src/app/lista-usuarios/lista-usuarios.page.ts", lineNumber: 14 });
})();
export {
  ListaUsuariosPage
};
//# sourceMappingURL=lista-usuarios.page-OYWK5W7R.js.map
