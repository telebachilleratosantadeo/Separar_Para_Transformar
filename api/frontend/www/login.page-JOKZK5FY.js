import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar
} from "./chunk-E5QEEIGS.js";
import {
  CommonModule,
  Component,
  FormsModule,
  HttpClient,
  HttpClientModule,
  NgControlStatus,
  NgModel,
  Router,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
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

// src/app/login/login.page.ts
var _LoginPage = class _LoginPage {
  constructor(http, router) {
    this.http = http;
    this.router = router;
    this.login = { curp: "", password: "" };
    this.apiUrl = "http://localhost:3000";
  }
  iniciarSesion() {
    this.http.post(`${this.apiUrl}/login`, this.login).subscribe({
      next: (res) => {
        if (res.success) {
          localStorage.setItem("usuario", JSON.stringify(res.usuario));
          this.router.navigateByUrl("/tabs/tab1", { replaceUrl: true });
        } else {
          alert("\u274C CURP o contrase\xF1a incorrectos");
        }
      },
      error: (err) => {
        if (err.status === 401) {
          alert("\u274C Credenciales inv\xE1lidas: CURP o contrase\xF1a incorrectos");
        } else if (err.status === 0) {
          alert("\u274C No se pudo conectar con el servidor. Verifica tu internet o si la API est\xE1 encendida.");
        } else {
          alert(`\u274C Error inesperado (${err.status}): ${err.message}`);
        }
      }
    });
  }
};
_LoginPage.\u0275fac = function LoginPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoginPage)(\u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(Router));
};
_LoginPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginPage, selectors: [["app-login"]], decls: 30, vars: 3, consts: [[1, "ion-no-border"], [1, "custom-toolbar"], [3, "fullscreen"], [1, "header-image-container"], ["src", "assets/TBCST.jpeg", "alt", "Logo"], [1, "project-title"], [1, "project-author"], ["fill", "outline"], ["label", "CURP", "labelPlacement", "floating", 3, "ngModelChange", "ngModel"], ["fill", "outline", 1, "ion-margin-top"], ["label", "Contrase\xF1a", "labelPlacement", "floating", "type", "password", 3, "ngModelChange", "ngModel"], ["expand", "block", 1, "ion-margin-top", 3, "click"], [1, "admin-notice-container"], [1, "admin-notice-text"]], template: function LoginPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header", 0)(1, "ion-toolbar", 1)(2, "ion-title");
    \u0275\u0275text(3, "LOGIN");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(4, "ion-content", 2)(5, "div", 3);
    \u0275\u0275element(6, "img", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h1", 5);
    \u0275\u0275text(8, '"Separar para transformar"');
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 6);
    \u0275\u0275text(10, "By Noe Valle Trinidad");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ion-card")(12, "ion-card-header")(13, "ion-card-title");
    \u0275\u0275text(14, "Iniciar Sesi\xF3n");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "ion-card-content")(16, "ion-item", 7)(17, "ion-input", 8);
    \u0275\u0275twoWayListener("ngModelChange", function LoginPage_Template_ion_input_ngModelChange_17_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.login.curp, $event) || (ctx.login.curp = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "ion-item", 9)(19, "ion-input", 10);
    \u0275\u0275twoWayListener("ngModelChange", function LoginPage_Template_ion_input_ngModelChange_19_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.login.password, $event) || (ctx.login.password = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "ion-button", 11);
    \u0275\u0275listener("click", function LoginPage_Template_ion_button_click_20_listener() {
      return ctx.iniciarSesion();
    });
    \u0275\u0275text(21, " ENTRAR ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 12)(23, "p", 13);
    \u0275\u0275text(24, " \xBFNo tienes una cuenta? ");
    \u0275\u0275element(25, "br");
    \u0275\u0275text(26, " Por favor, ");
    \u0275\u0275elementStart(27, "strong");
    \u0275\u0275text(28, "comun\xEDcate con el administrador");
    \u0275\u0275elementEnd();
    \u0275\u0275text(29, " para que te asigne tus credenciales. ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(13);
    \u0275\u0275twoWayProperty("ngModel", ctx.login.curp);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx.login.password);
  }
}, dependencies: [
  CommonModule,
  FormsModule,
  NgControlStatus,
  NgModel,
  HttpClientModule,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton
], styles: ['@charset "UTF-8";\n\n\n\nion-content[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      135deg,\n      #e8f5e9,\n      #c8e6c9);\n}\nion-toolbar[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      90deg,\n      #2e7d32,\n      #66bb6a);\n  --color: #ffffff;\n  text-align: center;\n}\n.header-image-container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-bottom: 8px;\n}\n.header-image-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 120px;\n  height: 120px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 4px solid white;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n}\nion-card[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n  margin-bottom: 20px;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\nion-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);\n}\nion-card-title[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 1.2rem;\n  color: #2e7d32;\n  text-align: center;\n}\nion-item[_ngcontent-%COMP%] {\n  --background: #ffffff;\n  border-radius: 12px;\n  margin-bottom: 10px;\n}\nion-input[_ngcontent-%COMP%] {\n  --padding-start: 10px;\n}\nion-button[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  border-radius: 12px;\n  font-weight: bold;\n  letter-spacing: 0.5px;\n}\n.header-image-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\n.header-image-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  max-width: 150px;\n  height: auto;\n  margin-bottom: 15px;\n}\n.project-title[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: bold;\n  color: var(--ion-color-dark);\n  margin: 0 0 5px 0;\n  text-align: center;\n}\n.project-author[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n  margin: 0;\n  text-align: center;\n  font-style: italic;\n}\n.admin-notice-container[_ngcontent-%COMP%] {\n  margin-top: 25px;\n  padding: 0 20px;\n  text-align: center;\n}\n.admin-notice-text[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n  line-height: 1.4;\n}\n.admin-notice-text[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--ion-color-dark);\n}\n.project-author[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n  text-align: center;\n  margin-top: 5px;\n  margin-bottom: 0;\n  font-weight: 500;\n  letter-spacing: 0.5px;\n}\n/*# sourceMappingURL=login.page.css.map */'] });
var LoginPage = _LoginPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginPage, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent,
      IonItem,
      IonInput,
      IonButton
    ], template: '<ion-header class="ion-no-border">\r\n  <ion-toolbar class="custom-toolbar">\r\n    <ion-title>LOGIN</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content [fullscreen]="true">\r\n\r\n  <div class="header-image-container">\r\n    <img src="assets/TBCST.jpeg" alt="Logo">\r\n  </div>\r\n  \r\n  <h1 class="project-title">"Separar para transformar"</h1>\r\n  <p class="project-author">By Noe Valle Trinidad</p>\r\n\r\n  <ion-card>\r\n    <ion-card-header>\r\n      <ion-card-title>Iniciar Sesi\xF3n</ion-card-title>\r\n    </ion-card-header>\r\n\r\n    <ion-card-content>\r\n      <ion-item fill="outline">\r\n        <ion-input label="CURP" labelPlacement="floating" [(ngModel)]="login.curp"></ion-input>\r\n      </ion-item>\r\n\r\n      <ion-item fill="outline" class="ion-margin-top">\r\n        <ion-input label="Contrase\xF1a" labelPlacement="floating" type="password" [(ngModel)]="login.password"></ion-input>\r\n      </ion-item>\r\n\r\n      <ion-button expand="block" (click)="iniciarSesion()" class="ion-margin-top">\r\n        ENTRAR\r\n      </ion-button>\r\n    </ion-card-content>\r\n  </ion-card>\r\n\r\n  <div class="admin-notice-container">\r\n    <p class="admin-notice-text">\r\n      \xBFNo tienes una cuenta? <br>\r\n      Por favor, <strong>comun\xEDcate con el administrador</strong> para que te asigne tus credenciales.\r\n    </p>\r\n  </div>\r\n\r\n</ion-content>', styles: ['@charset "UTF-8";\n\n/* src/app/login/login.page.scss */\nion-content {\n  --background:\n    linear-gradient(\n      135deg,\n      #e8f5e9,\n      #c8e6c9);\n}\nion-toolbar {\n  --background:\n    linear-gradient(\n      90deg,\n      #2e7d32,\n      #66bb6a);\n  --color: #ffffff;\n  text-align: center;\n}\n.header-image-container {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-bottom: 8px;\n}\n.header-image-container img {\n  width: 120px;\n  height: 120px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 4px solid white;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n}\nion-card {\n  border-radius: 20px;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n  margin-bottom: 20px;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\nion-card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);\n}\nion-card-title {\n  font-weight: bold;\n  font-size: 1.2rem;\n  color: #2e7d32;\n  text-align: center;\n}\nion-item {\n  --background: #ffffff;\n  border-radius: 12px;\n  margin-bottom: 10px;\n}\nion-input {\n  --padding-start: 10px;\n}\nion-button {\n  margin-top: 10px;\n  border-radius: 12px;\n  font-weight: bold;\n  letter-spacing: 0.5px;\n}\n.header-image-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\n.header-image-container img {\n  max-width: 150px;\n  height: auto;\n  margin-bottom: 15px;\n}\n.project-title {\n  font-size: 1.4rem;\n  font-weight: bold;\n  color: var(--ion-color-dark);\n  margin: 0 0 5px 0;\n  text-align: center;\n}\n.project-author {\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n  margin: 0;\n  text-align: center;\n  font-style: italic;\n}\n.admin-notice-container {\n  margin-top: 25px;\n  padding: 0 20px;\n  text-align: center;\n}\n.admin-notice-text {\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n  line-height: 1.4;\n}\n.admin-notice-text strong {\n  color: var(--ion-color-dark);\n}\n.project-author {\n  font-size: 0.9rem;\n  color: var(--ion-color-medium);\n  text-align: center;\n  margin-top: 5px;\n  margin-bottom: 0;\n  font-weight: 500;\n  letter-spacing: 0.5px;\n}\n/*# sourceMappingURL=login.page.css.map */\n'] }]
  }], () => [{ type: HttpClient }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginPage, { className: "LoginPage", filePath: "src/app/login/login.page.ts", lineNumber: 24 });
})();
export {
  LoginPage
};
//# sourceMappingURL=login.page-JOKZK5FY.js.map
