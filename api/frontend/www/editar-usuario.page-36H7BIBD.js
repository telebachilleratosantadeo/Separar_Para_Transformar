import {
  UserService
} from "./chunk-FBM4A2ZM.js";
import {
  IonCard,
  IonCardContent,
  IonContent,
  IonicModule,
  ToastController
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
  FormsModule,
  NavController,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵsanitizeUrl
} from "./chunk-6FBQLITM.js";
import "./chunk-B4QRZDQS.js";
import "./chunk-P4JTPYNW.js";
import "./chunk-LZJBBD2J.js";
import "./chunk-OL3WNRC6.js";
import "./chunk-7D2IXJO2.js";
import "./chunk-AVKBR3MH.js";
import "./chunk-CODWS2MM.js";
import "./chunk-YAS4LRVC.js";
import {
  __async
} from "./chunk-UL2P3LPA.js";

// src/app/editar-usuario/editar-usuario.page.ts
var _EditarUsuarioPage = class _EditarUsuarioPage {
  constructor(userService, navCtrl, toastController) {
    this.userService = userService;
    this.navCtrl = navCtrl;
    this.toastController = toastController;
    this.usuario = {
      nombre: "",
      apellidos: "",
      curp: "",
      foto: null
    };
  }
  ngOnInit() {
    if (this.userService.usuarioSeleccionado) {
      this.usuario = this.userService.usuarioSeleccionado;
    }
  }
  guardar() {
    this.userService.actualizarUsuario(this.usuario.id, this.usuario).subscribe((res) => __async(this, null, function* () {
      const toast = yield this.toastController.create({
        message: "Usuario actualizado",
        duration: 2e3,
        color: "success"
      });
      toast.present();
      this.navCtrl.back();
    }));
  }
};
_EditarUsuarioPage.\u0275fac = function EditarUsuarioPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _EditarUsuarioPage)(\u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(NavController), \u0275\u0275directiveInject(ToastController));
};
_EditarUsuarioPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EditarUsuarioPage, selectors: [["app-editar-usuario"]], decls: 4, vars: 1, consts: [[1, "ion-padding"], [3, "src"]], template: function EditarUsuarioPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "ion-card");
    \u0275\u0275element(2, "img", 1)(3, "ion-card-content");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275property("src", ctx.usuario.foto ? "data:image/jpeg;base64," + ctx.usuario.foto : "assets/no-avatar.png", \u0275\u0275sanitizeUrl);
  }
}, dependencies: [IonicModule, IonCard, IonCardContent, IonContent, CommonModule, FormsModule], encapsulation: 2 });
var EditarUsuarioPage = _EditarUsuarioPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditarUsuarioPage, [{
    type: Component,
    args: [{ selector: "app-editar-usuario", standalone: true, imports: [IonicModule, CommonModule, FormsModule], template: `<ion-content class="ion-padding">\r
  <ion-card>\r
  <img [src]="usuario.foto ? 'data:image/jpeg;base64,' + usuario.foto : 'assets/no-avatar.png'" />\r
  <ion-card-content>\r
    </ion-card-content>\r
</ion-card>\r
</ion-content>\r
` }]
  }], () => [{ type: UserService }, { type: NavController }, { type: ToastController }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EditarUsuarioPage, { className: "EditarUsuarioPage", filePath: "src/app/editar-usuario/editar-usuario.page.ts", lineNumber: 14 });
})();
export {
  EditarUsuarioPage
};
//# sourceMappingURL=editar-usuario.page-36H7BIBD.js.map
