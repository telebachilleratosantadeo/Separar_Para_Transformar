import {
  HttpClient,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6FBQLITM.js";

// src/app/services/user.service.ts
var _UserService = class _UserService {
  constructor(http) {
    this.http = http;
    this.API_URL = "http://localhost:3000";
  }
  getTodosLosUsuarios() {
    return this.http.get(`${this.API_URL}/admin/usuarios`);
  }
  actualizarUsuario(id, datos) {
    return this.http.put(`${this.API_URL}/usuario/${id}`, datos);
  }
};
_UserService.\u0275fac = function UserService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _UserService)(\u0275\u0275inject(HttpClient));
};
_UserService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
var UserService = _UserService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UserService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  UserService
};
//# sourceMappingURL=chunk-FBM4A2ZM.js.map
