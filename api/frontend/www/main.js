import {
  bootstrapLazy,
  promiseResolve
} from "./chunk-YB2U3FKI.js";
import {
  addIcons
} from "./chunk-GCUUTFL4.js";
import {
  alertCircleOutline,
  bookOutline,
  leafOutline,
  libraryOutline,
  locateOutline,
  personOutline
} from "./chunk-4OLBXMDD.js";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  provideIonicAngular
} from "./chunk-E5QEEIGS.js";
import {
  Component,
  EnvironmentInjector,
  IonicRouteStrategy,
  PreloadAllModules,
  RouteReuseStrategy,
  bootstrapApplication,
  inject,
  provideHttpClient,
  provideRouter,
  setClassMetadata,
  withPreloading,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
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

// src/app/tabs/tabs.page.ts
var _TabsPage = class _TabsPage {
  constructor() {
    this.environmentInjector = inject(EnvironmentInjector);
    addIcons({ leafOutline, bookOutline, locateOutline, libraryOutline, personOutline, alertCircleOutline });
  }
};
_TabsPage.\u0275fac = function TabsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _TabsPage)();
};
_TabsPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TabsPage, selectors: [["app-tabs"]], decls: 18, vars: 0, consts: [["slot", "bottom"], ["tab", "tab1"], ["name", "leaf-outline"], ["tab", "tab2"], ["name", "book-outline"], ["tab", "tab4"], ["name", "alert-circle-outline"], ["tab", "tab5"], ["name", "person-outline"]], template: function TabsPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-tabs")(1, "ion-tab-bar", 0)(2, "ion-tab-button", 1);
    \u0275\u0275element(3, "ion-icon", 2);
    \u0275\u0275elementStart(4, "ion-label");
    \u0275\u0275text(5, "Inicio");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "ion-tab-button", 3);
    \u0275\u0275element(7, "ion-icon", 4);
    \u0275\u0275elementStart(8, "ion-label");
    \u0275\u0275text(9, "Educaci\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "ion-tab-button", 5);
    \u0275\u0275element(11, "ion-icon", 6);
    \u0275\u0275elementStart(12, "ion-label");
    \u0275\u0275text(13, "Alertas");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "ion-tab-button", 7);
    \u0275\u0275element(15, "ion-icon", 8);
    \u0275\u0275elementStart(16, "ion-label");
    \u0275\u0275text(17, "Perfil");
    \u0275\u0275elementEnd()()()();
  }
}, dependencies: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel], encapsulation: 2 });
var TabsPage = _TabsPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabsPage, [{
    type: Component,
    args: [{ selector: "app-tabs", standalone: true, imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel], template: '<ion-tabs>\r\n  <ion-tab-bar slot="bottom">\r\n    <ion-tab-button tab="tab1">\r\n      <ion-icon name="leaf-outline"></ion-icon>\r\n      <ion-label>Inicio</ion-label>\r\n    </ion-tab-button>\r\n\r\n    <ion-tab-button tab="tab2">\r\n      <ion-icon name="book-outline"></ion-icon>\r\n      <ion-label>Educaci\xF3n</ion-label>\r\n    </ion-tab-button>\r\n\r\n    <ion-tab-button tab="tab4">\r\n<ion-icon name="alert-circle-outline"></ion-icon>\r\n      <ion-label>Alertas</ion-label>\r\n    </ion-tab-button>\r\n\r\n    <ion-tab-button tab="tab5">\r\n      <ion-icon name="person-outline"></ion-icon>\r\n      <ion-label>Perfil</ion-label>\r\n    </ion-tab-button>\r\n  </ion-tab-bar>\r\n</ion-tabs>' }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TabsPage, { className: "TabsPage", filePath: "src/app/tabs/tabs.page.ts", lineNumber: 13 });
})();

// src/app/app.routes.ts
var routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "tab1",
        loadComponent: () => import("./tab1.page-RJBHGNYS.js").then((m) => m.Tab1Page)
      },
      {
        path: "tab2",
        loadComponent: () => import("./tab2.page-GPDDIDL5.js").then((m) => m.Tab2Page)
      },
      {
        path: "tab4",
        loadComponent: () => import("./tab4.page-GGFECG6I.js").then((m) => m.Tab4Page)
      },
      {
        path: "tab5",
        loadComponent: () => import("./tab5.page-SIPPYAF7.js").then((m) => m.Tab5Page)
      },
      // Ruta para ver la lista de usuarios dentro de los tabs (Opcional)
      {
        path: "lista-usuarios",
        loadComponent: () => import("./lista-usuarios.page-OYWK5W7R.js").then((m) => m.ListaUsuariosPage)
      },
      {
        path: "",
        redirectTo: "/tabs/tab1",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "login",
    loadComponent: () => import("./login.page-JOKZK5FY.js").then((m) => m.LoginPage)
  },
  // RUTAS DE ADMINISTRACIÓN (Pantalla completa)
  {
    path: "lista-usuarios",
    loadComponent: () => import("./lista-usuarios.page-OYWK5W7R.js").then((m) => m.ListaUsuariosPage)
  },
  {
    path: "editar-usuario",
    loadComponent: () => import("./editar-usuario.page-36H7BIBD.js").then((m) => m.EditarUsuarioPage)
  },
  // RUTA POR DEFECTO: Si no estás logueado, mandarlo al login
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  // Captura cualquier ruta inexistente y manda al login o tabs
  {
    path: "**",
    redirectTo: "login",
    pathMatch: "full"
  }
];

// src/app/app.component.ts
var _AppComponent = class _AppComponent {
  constructor() {
  }
};
_AppComponent.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AppComponent)();
};
_AppComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-app");
    \u0275\u0275element(1, "ion-router-outlet");
    \u0275\u0275elementEnd();
  }
}, dependencies: [IonApp, IonRouterOutlet], encapsulation: 2 });
var AppComponent = _AppComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", imports: [IonApp, IonRouterOutlet], template: "<ion-app>\r\n  <ion-router-outlet></ion-router-outlet>\r\n</ion-app>\r\n" }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 9 });
})();

// node_modules/@ionic/pwa-elements/dist/esm/loader.js
var patchEsm = () => {
  return promiseResolve();
};
var defineCustomElements = (win, options) => {
  if (typeof window === "undefined") return Promise.resolve();
  return patchEsm().then(() => {
    return bootstrapLazy([["pwa-camera-modal", [[1, "pwa-camera-modal", { "facingMode": [1, "facing-mode"], "hidePicker": [4, "hide-picker"], "present": [64], "dismiss": [64] }]]], ["pwa-action-sheet", [[1, "pwa-action-sheet", { "header": [1], "cancelable": [4], "options": [16], "open": [32] }]]], ["pwa-toast", [[1, "pwa-toast", { "message": [1], "duration": [2], "closing": [32] }]]], ["pwa-camera", [[1, "pwa-camera", { "facingMode": [1, "facing-mode"], "handlePhoto": [16], "hidePicker": [4, "hide-picker"], "handleNoDeviceError": [16], "noDevicesText": [1, "no-devices-text"], "noDevicesButtonText": [1, "no-devices-button-text"], "photo": [32], "photoSrc": [32], "showShutterOverlay": [32], "flashIndex": [32], "hasCamera": [32], "rotation": [32], "deviceError": [32] }]]], ["pwa-camera-modal-instance", [[1, "pwa-camera-modal-instance", { "facingMode": [1, "facing-mode"], "hidePicker": [4, "hide-picker"], "noDevicesText": [1, "no-devices-text"], "noDevicesButtonText": [1, "no-devices-button-text"] }, [[16, "keyup", "handleBackdropKeyUp"]]]]]], options);
  });
};

// src/main.ts
defineCustomElements(window);
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient()
  ]
});
//# sourceMappingURL=main.js.map
