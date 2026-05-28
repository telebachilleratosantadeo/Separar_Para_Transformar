import {
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
  addIcons
} from "./chunk-GCUUTFL4.js";
import {
  cameraOutline,
  imageOutline,
  leafOutline,
  saveOutline
} from "./chunk-4OLBXMDD.js";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
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
  NgIf,
  NgModel,
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
import {
  __async
} from "./chunk-UL2P3LPA.js";

// node_modules/@capacitor/core/dist/index.js
var ExceptionCode;
(function(ExceptionCode2) {
  ExceptionCode2["Unimplemented"] = "UNIMPLEMENTED";
  ExceptionCode2["Unavailable"] = "UNAVAILABLE";
})(ExceptionCode || (ExceptionCode = {}));
var CapacitorException = class extends Error {
  constructor(message, code, data) {
    super(message);
    this.message = message;
    this.code = code;
    this.data = data;
  }
};
var getPlatformId = (win) => {
  var _a, _b;
  if (win === null || win === void 0 ? void 0 : win.androidBridge) {
    return "android";
  } else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
    return "ios";
  } else {
    return "web";
  }
};
var createCapacitor = (win) => {
  const capCustomPlatform = win.CapacitorCustomPlatform || null;
  const cap = win.Capacitor || {};
  const Plugins = cap.Plugins = cap.Plugins || {};
  const getPlatform = () => {
    return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
  };
  const isNativePlatform = () => getPlatform() !== "web";
  const isPluginAvailable = (pluginName) => {
    const plugin = registeredPlugins.get(pluginName);
    if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
      return true;
    }
    if (getPluginHeader(pluginName)) {
      return true;
    }
    return false;
  };
  const getPluginHeader = (pluginName) => {
    var _a;
    return (_a = cap.PluginHeaders) === null || _a === void 0 ? void 0 : _a.find((h) => h.name === pluginName);
  };
  const handleError = (err) => win.console.error(err);
  const registeredPlugins = /* @__PURE__ */ new Map();
  const registerPlugin2 = (pluginName, jsImplementations = {}) => {
    const registeredPlugin = registeredPlugins.get(pluginName);
    if (registeredPlugin) {
      console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
      return registeredPlugin.proxy;
    }
    const platform = getPlatform();
    const pluginHeader = getPluginHeader(pluginName);
    let jsImplementation;
    const loadPluginImplementation = () => __async(null, null, function* () {
      if (!jsImplementation && platform in jsImplementations) {
        jsImplementation = typeof jsImplementations[platform] === "function" ? jsImplementation = yield jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
      } else if (capCustomPlatform !== null && !jsImplementation && "web" in jsImplementations) {
        jsImplementation = typeof jsImplementations["web"] === "function" ? jsImplementation = yield jsImplementations["web"]() : jsImplementation = jsImplementations["web"];
      }
      return jsImplementation;
    });
    const createPluginMethod = (impl, prop) => {
      var _a, _b;
      if (pluginHeader) {
        const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find((m) => prop === m.name);
        if (methodHeader) {
          if (methodHeader.rtype === "promise") {
            return (options) => cap.nativePromise(pluginName, prop.toString(), options);
          } else {
            return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
          }
        } else if (impl) {
          return (_a = impl[prop]) === null || _a === void 0 ? void 0 : _a.bind(impl);
        }
      } else if (impl) {
        return (_b = impl[prop]) === null || _b === void 0 ? void 0 : _b.bind(impl);
      } else {
        throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
      }
    };
    const createPluginMethodWrapper = (prop) => {
      let remove;
      const wrapper = (...args) => {
        const p = loadPluginImplementation().then((impl) => {
          const fn = createPluginMethod(impl, prop);
          if (fn) {
            const p2 = fn(...args);
            remove = p2 === null || p2 === void 0 ? void 0 : p2.remove;
            return p2;
          } else {
            throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
          }
        });
        if (prop === "addListener") {
          p.remove = () => __async(null, null, function* () {
            return remove();
          });
        }
        return p;
      };
      wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;
      Object.defineProperty(wrapper, "name", {
        value: prop,
        writable: false,
        configurable: false
      });
      return wrapper;
    };
    const addListener = createPluginMethodWrapper("addListener");
    const removeListener = createPluginMethodWrapper("removeListener");
    const addListenerNative = (eventName, callback) => {
      const call = addListener({ eventName }, callback);
      const remove = () => __async(null, null, function* () {
        const callbackId = yield call;
        removeListener({
          eventName,
          callbackId
        }, callback);
      });
      const p = new Promise((resolve) => call.then(() => resolve({ remove })));
      p.remove = () => __async(null, null, function* () {
        console.warn(`Using addListener() without 'await' is deprecated.`);
        yield remove();
      });
      return p;
    };
    const proxy = new Proxy({}, {
      get(_, prop) {
        switch (prop) {
          // https://github.com/facebook/react/issues/20030
          case "$$typeof":
            return void 0;
          case "toJSON":
            return () => ({});
          case "addListener":
            return pluginHeader ? addListenerNative : addListener;
          case "removeListener":
            return removeListener;
          default:
            return createPluginMethodWrapper(prop);
        }
      }
    });
    Plugins[pluginName] = proxy;
    registeredPlugins.set(pluginName, {
      name: pluginName,
      proxy,
      platforms: /* @__PURE__ */ new Set([...Object.keys(jsImplementations), ...pluginHeader ? [platform] : []])
    });
    return proxy;
  };
  if (!cap.convertFileSrc) {
    cap.convertFileSrc = (filePath) => filePath;
  }
  cap.getPlatform = getPlatform;
  cap.handleError = handleError;
  cap.isNativePlatform = isNativePlatform;
  cap.isPluginAvailable = isPluginAvailable;
  cap.registerPlugin = registerPlugin2;
  cap.Exception = CapacitorException;
  cap.DEBUG = !!cap.DEBUG;
  cap.isLoggingEnabled = !!cap.isLoggingEnabled;
  return cap;
};
var initCapacitorGlobal = (win) => win.Capacitor = createCapacitor(win);
var Capacitor = /* @__PURE__ */ initCapacitorGlobal(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
var registerPlugin = Capacitor.registerPlugin;
var WebPlugin = class {
  constructor() {
    this.listeners = {};
    this.retainedEventArguments = {};
    this.windowListeners = {};
  }
  addListener(eventName, listenerFunc) {
    let firstListener = false;
    const listeners = this.listeners[eventName];
    if (!listeners) {
      this.listeners[eventName] = [];
      firstListener = true;
    }
    this.listeners[eventName].push(listenerFunc);
    const windowListener = this.windowListeners[eventName];
    if (windowListener && !windowListener.registered) {
      this.addWindowListener(windowListener);
    }
    if (firstListener) {
      this.sendRetainedArgumentsForEvent(eventName);
    }
    const remove = () => __async(this, null, function* () {
      return this.removeListener(eventName, listenerFunc);
    });
    const p = Promise.resolve({ remove });
    return p;
  }
  removeAllListeners() {
    return __async(this, null, function* () {
      this.listeners = {};
      for (const listener in this.windowListeners) {
        this.removeWindowListener(this.windowListeners[listener]);
      }
      this.windowListeners = {};
    });
  }
  notifyListeners(eventName, data, retainUntilConsumed) {
    const listeners = this.listeners[eventName];
    if (!listeners) {
      if (retainUntilConsumed) {
        let args = this.retainedEventArguments[eventName];
        if (!args) {
          args = [];
        }
        args.push(data);
        this.retainedEventArguments[eventName] = args;
      }
      return;
    }
    listeners.forEach((listener) => listener(data));
  }
  hasListeners(eventName) {
    var _a;
    return !!((_a = this.listeners[eventName]) === null || _a === void 0 ? void 0 : _a.length);
  }
  registerWindowListener(windowEventName, pluginEventName) {
    this.windowListeners[pluginEventName] = {
      registered: false,
      windowEventName,
      pluginEventName,
      handler: (event) => {
        this.notifyListeners(pluginEventName, event);
      }
    };
  }
  unimplemented(msg = "not implemented") {
    return new Capacitor.Exception(msg, ExceptionCode.Unimplemented);
  }
  unavailable(msg = "not available") {
    return new Capacitor.Exception(msg, ExceptionCode.Unavailable);
  }
  removeListener(eventName, listenerFunc) {
    return __async(this, null, function* () {
      const listeners = this.listeners[eventName];
      if (!listeners) {
        return;
      }
      const index = listeners.indexOf(listenerFunc);
      this.listeners[eventName].splice(index, 1);
      if (!this.listeners[eventName].length) {
        this.removeWindowListener(this.windowListeners[eventName]);
      }
    });
  }
  addWindowListener(handle) {
    window.addEventListener(handle.windowEventName, handle.handler);
    handle.registered = true;
  }
  removeWindowListener(handle) {
    if (!handle) {
      return;
    }
    window.removeEventListener(handle.windowEventName, handle.handler);
    handle.registered = false;
  }
  sendRetainedArgumentsForEvent(eventName) {
    const args = this.retainedEventArguments[eventName];
    if (!args) {
      return;
    }
    delete this.retainedEventArguments[eventName];
    args.forEach((arg) => {
      this.notifyListeners(eventName, arg);
    });
  }
};
var encode = (str) => encodeURIComponent(str).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
var decode = (str) => str.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
var CapacitorCookiesPluginWeb = class extends WebPlugin {
  getCookies() {
    return __async(this, null, function* () {
      const cookies = document.cookie;
      const cookieMap = {};
      cookies.split(";").forEach((cookie) => {
        if (cookie.length <= 0)
          return;
        let [key, value] = cookie.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
        key = decode(key).trim();
        value = decode(value).trim();
        cookieMap[key] = value;
      });
      return cookieMap;
    });
  }
  setCookie(options) {
    return __async(this, null, function* () {
      try {
        const encodedKey = encode(options.key);
        const encodedValue = encode(options.value);
        const expires = options.expires ? `; expires=${options.expires.replace("expires=", "")}` : "";
        const path = (options.path || "/").replace("path=", "");
        const domain = options.url != null && options.url.length > 0 ? `domain=${options.url}` : "";
        document.cookie = `${encodedKey}=${encodedValue || ""}${expires}; path=${path}; ${domain};`;
      } catch (error) {
        return Promise.reject(error);
      }
    });
  }
  deleteCookie(options) {
    return __async(this, null, function* () {
      try {
        document.cookie = `${options.key}=; Max-Age=0`;
      } catch (error) {
        return Promise.reject(error);
      }
    });
  }
  clearCookies() {
    return __async(this, null, function* () {
      try {
        const cookies = document.cookie.split(";") || [];
        for (const cookie of cookies) {
          document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, `=;expires=${(/* @__PURE__ */ new Date()).toUTCString()};path=/`);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    });
  }
  clearAllCookies() {
    return __async(this, null, function* () {
      try {
        yield this.clearCookies();
      } catch (error) {
        return Promise.reject(error);
      }
    });
  }
};
var CapacitorCookies = registerPlugin("CapacitorCookies", {
  web: () => new CapacitorCookiesPluginWeb()
});
var readBlobAsBase64 = (blob) => __async(null, null, function* () {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      resolve(base64String.indexOf(",") >= 0 ? base64String.split(",")[1] : base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(blob);
  });
});
var normalizeHttpHeaders = (headers = {}) => {
  const originalKeys = Object.keys(headers);
  const loweredKeys = Object.keys(headers).map((k) => k.toLocaleLowerCase());
  const normalized = loweredKeys.reduce((acc, key, index) => {
    acc[key] = headers[originalKeys[index]];
    return acc;
  }, {});
  return normalized;
};
var buildUrlParams = (params, shouldEncode = true) => {
  if (!params)
    return null;
  const output = Object.entries(params).reduce((accumulator, entry) => {
    const [key, value] = entry;
    let encodedValue;
    let item;
    if (Array.isArray(value)) {
      item = "";
      value.forEach((str) => {
        encodedValue = shouldEncode ? encodeURIComponent(str) : str;
        item += `${key}=${encodedValue}&`;
      });
      item.slice(0, -1);
    } else {
      encodedValue = shouldEncode ? encodeURIComponent(value) : value;
      item = `${key}=${encodedValue}`;
    }
    return `${accumulator}&${item}`;
  }, "");
  return output.substr(1);
};
var buildRequestInit = (options, extra = {}) => {
  const output = Object.assign({ method: options.method || "GET", headers: options.headers }, extra);
  const headers = normalizeHttpHeaders(options.headers);
  const type = headers["content-type"] || "";
  if (typeof options.data === "string") {
    output.body = options.data;
  } else if (type.includes("application/x-www-form-urlencoded")) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(options.data || {})) {
      params.set(key, value);
    }
    output.body = params.toString();
  } else if (type.includes("multipart/form-data") || options.data instanceof FormData) {
    const form = new FormData();
    if (options.data instanceof FormData) {
      options.data.forEach((value, key) => {
        form.append(key, value);
      });
    } else {
      for (const key of Object.keys(options.data)) {
        form.append(key, options.data[key]);
      }
    }
    output.body = form;
    const headers2 = new Headers(output.headers);
    headers2.delete("content-type");
    output.headers = headers2;
  } else if (type.includes("application/json") || typeof options.data === "object") {
    output.body = JSON.stringify(options.data);
  }
  return output;
};
var CapacitorHttpPluginWeb = class extends WebPlugin {
  /**
   * Perform an Http request given a set of options
   * @param options Options to build the HTTP request
   */
  request(options) {
    return __async(this, null, function* () {
      const requestInit = buildRequestInit(options, options.webFetchExtra);
      const urlParams = buildUrlParams(options.params, options.shouldEncodeUrlParams);
      const url = urlParams ? `${options.url}?${urlParams}` : options.url;
      const response = yield fetch(url, requestInit);
      const contentType = response.headers.get("content-type") || "";
      let { responseType = "text" } = response.ok ? options : {};
      if (contentType.includes("application/json")) {
        responseType = "json";
      }
      let data;
      let blob;
      switch (responseType) {
        case "arraybuffer":
        case "blob":
          blob = yield response.blob();
          data = yield readBlobAsBase64(blob);
          break;
        case "json":
          data = yield response.json();
          break;
        case "document":
        case "text":
        default:
          data = yield response.text();
      }
      const headers = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
      return {
        data,
        headers,
        status: response.status,
        url: response.url
      };
    });
  }
  /**
   * Perform an Http GET request given a set of options
   * @param options Options to build the HTTP request
   */
  get(options) {
    return __async(this, null, function* () {
      return this.request(Object.assign(Object.assign({}, options), { method: "GET" }));
    });
  }
  /**
   * Perform an Http POST request given a set of options
   * @param options Options to build the HTTP request
   */
  post(options) {
    return __async(this, null, function* () {
      return this.request(Object.assign(Object.assign({}, options), { method: "POST" }));
    });
  }
  /**
   * Perform an Http PUT request given a set of options
   * @param options Options to build the HTTP request
   */
  put(options) {
    return __async(this, null, function* () {
      return this.request(Object.assign(Object.assign({}, options), { method: "PUT" }));
    });
  }
  /**
   * Perform an Http PATCH request given a set of options
   * @param options Options to build the HTTP request
   */
  patch(options) {
    return __async(this, null, function* () {
      return this.request(Object.assign(Object.assign({}, options), { method: "PATCH" }));
    });
  }
  /**
   * Perform an Http DELETE request given a set of options
   * @param options Options to build the HTTP request
   */
  delete(options) {
    return __async(this, null, function* () {
      return this.request(Object.assign(Object.assign({}, options), { method: "DELETE" }));
    });
  }
};
var CapacitorHttp = registerPlugin("CapacitorHttp", {
  web: () => new CapacitorHttpPluginWeb()
});
var SystemBarsStyle;
(function(SystemBarsStyle2) {
  SystemBarsStyle2["Dark"] = "DARK";
  SystemBarsStyle2["Light"] = "LIGHT";
  SystemBarsStyle2["Default"] = "DEFAULT";
})(SystemBarsStyle || (SystemBarsStyle = {}));
var SystemBarType;
(function(SystemBarType2) {
  SystemBarType2["StatusBar"] = "StatusBar";
  SystemBarType2["NavigationBar"] = "NavigationBar";
})(SystemBarType || (SystemBarType = {}));
var SystemBarsPluginWeb = class extends WebPlugin {
  setStyle() {
    return __async(this, null, function* () {
      this.unavailable("not available for web");
    });
  }
  setAnimation() {
    return __async(this, null, function* () {
      this.unavailable("not available for web");
    });
  }
  show() {
    return __async(this, null, function* () {
      this.unavailable("not available for web");
    });
  }
  hide() {
    return __async(this, null, function* () {
      this.unavailable("not available for web");
    });
  }
};
var SystemBars = registerPlugin("SystemBars", {
  web: () => new SystemBarsPluginWeb()
});

// node_modules/@capacitor/camera/dist/esm/definitions.js
var CameraSource;
(function(CameraSource2) {
  CameraSource2["Prompt"] = "PROMPT";
  CameraSource2["Camera"] = "CAMERA";
  CameraSource2["Photos"] = "PHOTOS";
})(CameraSource || (CameraSource = {}));
var CameraDirection;
(function(CameraDirection2) {
  CameraDirection2["Rear"] = "REAR";
  CameraDirection2["Front"] = "FRONT";
})(CameraDirection || (CameraDirection = {}));
var CameraResultType;
(function(CameraResultType2) {
  CameraResultType2["Uri"] = "uri";
  CameraResultType2["Base64"] = "base64";
  CameraResultType2["DataUrl"] = "dataUrl";
})(CameraResultType || (CameraResultType = {}));

// node_modules/@capacitor/camera/dist/esm/web.js
var CameraWeb = class extends WebPlugin {
  getPhoto(options) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => __async(this, null, function* () {
        if (options.webUseInput || options.source === CameraSource.Photos) {
          this.fileInputExperience(options, resolve, reject);
        } else if (options.source === CameraSource.Prompt) {
          let actionSheet = document.querySelector("pwa-action-sheet");
          if (!actionSheet) {
            actionSheet = document.createElement("pwa-action-sheet");
            document.body.appendChild(actionSheet);
          }
          actionSheet.header = options.promptLabelHeader || "Photo";
          actionSheet.cancelable = true;
          actionSheet.options = [
            { title: options.promptLabelPhoto || "From Photos" },
            { title: options.promptLabelPicture || "Take Picture" }
          ];
          actionSheet.addEventListener("onSelection", (e) => __async(this, null, function* () {
            const selection = e.detail;
            if (selection === 0) {
              this.fileInputExperience(options, resolve, reject);
            } else {
              this.cameraExperience(options, resolve, reject);
            }
          }));
          actionSheet.addEventListener("onCanceled", () => __async(this, null, function* () {
            reject(new CapacitorException("User cancelled photos app"));
          }));
        } else {
          this.cameraExperience(options, resolve, reject);
        }
      }));
    });
  }
  pickImages(_options) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => __async(this, null, function* () {
        this.multipleFileInputExperience(resolve, reject);
      }));
    });
  }
  cameraExperience(options, resolve, reject) {
    return __async(this, null, function* () {
      if (customElements.get("pwa-camera-modal")) {
        const cameraModal = document.createElement("pwa-camera-modal");
        cameraModal.facingMode = options.direction === CameraDirection.Front ? "user" : "environment";
        document.body.appendChild(cameraModal);
        try {
          yield cameraModal.componentOnReady();
          cameraModal.addEventListener("onPhoto", (e) => __async(this, null, function* () {
            const photo = e.detail;
            if (photo === null) {
              reject(new CapacitorException("User cancelled photos app"));
            } else if (photo instanceof Error) {
              reject(photo);
            } else {
              resolve(yield this._getCameraPhoto(photo, options));
            }
            cameraModal.dismiss();
            document.body.removeChild(cameraModal);
          }));
          cameraModal.present();
        } catch (e) {
          this.fileInputExperience(options, resolve, reject);
        }
      } else {
        console.error(`Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/web/pwa-elements.`);
        this.fileInputExperience(options, resolve, reject);
      }
    });
  }
  fileInputExperience(options, resolve, reject) {
    let input = document.querySelector("#_capacitor-camera-input");
    const cleanup = () => {
      var _a;
      (_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(input);
    };
    if (!input) {
      input = document.createElement("input");
      input.id = "_capacitor-camera-input";
      input.type = "file";
      input.hidden = true;
      document.body.appendChild(input);
      input.addEventListener("change", (_e) => {
        const file = input.files[0];
        let format = "jpeg";
        if (file.type === "image/png") {
          format = "png";
        } else if (file.type === "image/gif") {
          format = "gif";
        }
        if (options.resultType === "dataUrl" || options.resultType === "base64") {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            if (options.resultType === "dataUrl") {
              resolve({
                dataUrl: reader.result,
                format
              });
            } else if (options.resultType === "base64") {
              const b64 = reader.result.split(",")[1];
              resolve({
                base64String: b64,
                format
              });
            }
            cleanup();
          });
          reader.readAsDataURL(file);
        } else {
          resolve({
            webPath: URL.createObjectURL(file),
            format
          });
          cleanup();
        }
      });
      input.addEventListener("cancel", (_e) => {
        reject(new CapacitorException("User cancelled photos app"));
        cleanup();
      });
    }
    input.accept = "image/*";
    input.capture = true;
    if (options.source === CameraSource.Photos || options.source === CameraSource.Prompt) {
      input.removeAttribute("capture");
    } else if (options.direction === CameraDirection.Front) {
      input.capture = "user";
    } else if (options.direction === CameraDirection.Rear) {
      input.capture = "environment";
    }
    input.click();
  }
  multipleFileInputExperience(resolve, reject) {
    let input = document.querySelector("#_capacitor-camera-input-multiple");
    const cleanup = () => {
      var _a;
      (_a = input.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(input);
    };
    if (!input) {
      input = document.createElement("input");
      input.id = "_capacitor-camera-input-multiple";
      input.type = "file";
      input.hidden = true;
      input.multiple = true;
      document.body.appendChild(input);
      input.addEventListener("change", (_e) => {
        const photos = [];
        for (let i = 0; i < input.files.length; i++) {
          const file = input.files[i];
          let format = "jpeg";
          if (file.type === "image/png") {
            format = "png";
          } else if (file.type === "image/gif") {
            format = "gif";
          }
          photos.push({
            webPath: URL.createObjectURL(file),
            format
          });
        }
        resolve({ photos });
        cleanup();
      });
      input.addEventListener("cancel", (_e) => {
        reject(new CapacitorException("User cancelled photos app"));
        cleanup();
      });
    }
    input.accept = "image/*";
    input.click();
  }
  _getCameraPhoto(photo, options) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const format = photo.type.split("/")[1];
      if (options.resultType === "uri") {
        resolve({
          webPath: URL.createObjectURL(photo),
          format,
          saved: false
        });
      } else {
        reader.readAsDataURL(photo);
        reader.onloadend = () => {
          const r = reader.result;
          if (options.resultType === "dataUrl") {
            resolve({
              dataUrl: r,
              format,
              saved: false
            });
          } else {
            resolve({
              base64String: r.split(",")[1],
              format,
              saved: false
            });
          }
        };
        reader.onerror = (e) => {
          reject(e);
        };
      }
    });
  }
  checkPermissions() {
    return __async(this, null, function* () {
      if (typeof navigator === "undefined" || !navigator.permissions) {
        throw this.unavailable("Permissions API not available in this browser");
      }
      try {
        const permission = yield window.navigator.permissions.query({
          name: "camera"
        });
        return {
          camera: permission.state,
          photos: "granted"
        };
      } catch (_a) {
        throw this.unavailable("Camera permissions are not available in this browser");
      }
    });
  }
  requestPermissions() {
    return __async(this, null, function* () {
      throw this.unimplemented("Not implemented on web.");
    });
  }
  pickLimitedLibraryPhotos() {
    return __async(this, null, function* () {
      throw this.unavailable("Not implemented on web.");
    });
  }
  getLimitedLibraryPhotos() {
    return __async(this, null, function* () {
      throw this.unavailable("Not implemented on web.");
    });
  }
};
var Camera = new CameraWeb();

// node_modules/@capacitor/camera/dist/esm/index.js
var Camera2 = registerPlugin("Camera", {
  web: () => new CameraWeb()
});

// src/app/tab1/tab1.page.ts
function Tab1Page_ion_item_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-item")(1, "ion-input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function Tab1Page_ion_item_26_Template_ion_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.otroMaterial, $event) || (ctx_r1.otroMaterial = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.otroMaterial);
  }
}
function Tab1Page_ion_item_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-item");
    \u0275\u0275element(1, "img", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", "data:image/jpeg;base64," + ctx_r1.fotoBase64, \u0275\u0275sanitizeUrl);
  }
}
var _Tab1Page = class _Tab1Page {
  constructor(toastController, http) {
    this.toastController = toastController;
    this.http = http;
    this.material = null;
    this.otroMaterial = "";
    this.cantidad = null;
    this.fotoBase64 = void 0;
    this.fechaRegistro = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    this.API = "http://localhost:3000";
    addIcons({ cameraOutline, imageOutline, leafOutline, saveOutline });
  }
  obtenerPlaceholderCantidad() {
    if (this.material === 1)
      return "Ej. 2 kg de Pl\xE1stico";
    if (this.material === 2)
      return "Ej. 5 botellas de Vidrio";
    if (this.material === 3)
      return "Ej. 3 kg de Papel";
    if (this.material === 4)
      return "Ej. 1 kg de Org\xE1nico";
    return "Ingresa la cantidad";
  }
  tomarFoto() {
    return __async(this, null, function* () {
      try {
        const image = yield Camera2.getPhoto({
          quality: 70,
          allowEditing: false,
          resultType: CameraResultType.Base64,
          source: CameraSource.Camera
        });
        this.fotoBase64 = image.base64String || void 0;
      } catch (error) {
        console.error("Error c\xE1mara", error);
      }
    });
  }
  elegirDeGaleria() {
    return __async(this, null, function* () {
      try {
        const image = yield Camera2.getPhoto({
          quality: 70,
          allowEditing: false,
          resultType: CameraResultType.Base64,
          source: CameraSource.Photos
        });
        this.fotoBase64 = image.base64String || void 0;
      } catch (error) {
        console.error("Error galer\xEDa", error);
      }
    });
  }
  registrarReciclaje() {
    return __async(this, null, function* () {
      if (!this.material || !this.cantidad || this.cantidad <= 0) {
        this.mostrarMensaje("Completa material y cantidad v\xE1lidos", "warning");
        return;
      }
      if (this.material === "otro" && !this.otroMaterial.trim()) {
        this.mostrarMensaje('Especifica el material en "Otro"', "warning");
        return;
      }
      const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
      if (!usuario.id) {
        this.mostrarMensaje("Inicia sesi\xF3n para registrar", "danger");
        return;
      }
      const datos = {
        residuo_id: this.material === "otro" ? null : this.material,
        cantidad: this.cantidad,
        usuario_id: usuario.id,
        otro_material: this.material === "otro" ? this.otroMaterial.trim() : null,
        foto: this.fotoBase64 || null,
        fecha: this.fechaRegistro
      };
      this.http.post(`${this.API}/reciclaje`, datos).subscribe({
        next: () => {
          this.mostrarMensaje("\u2705 Registro guardado en San Tadeo", "success");
          this.resetearFormulario();
        },
        error: (err) => {
          console.error("Error al guardar:", err);
          this.mostrarMensaje("\u274C Error de conexi\xF3n al servidor", "danger");
        }
      });
    });
  }
  resetearFormulario() {
    this.material = null;
    this.otroMaterial = "";
    this.cantidad = null;
    this.fotoBase64 = void 0;
  }
  mostrarMensaje(mensaje, color) {
    return __async(this, null, function* () {
      const toast = yield this.toastController.create({
        message: mensaje,
        duration: 2e3,
        color,
        position: "bottom"
      });
      yield toast.present();
    });
  }
};
_Tab1Page.\u0275fac = function Tab1Page_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _Tab1Page)(\u0275\u0275directiveInject(ToastController), \u0275\u0275directiveInject(HttpClient));
};
_Tab1Page.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Tab1Page, selectors: [["app-tab1"]], decls: 41, vars: 9, consts: [[1, "custom-toolbar"], [1, "header-image-container"], ["src", "../assets/TBCST.jpeg", "alt", "Logo"], [1, "ion-padding"], [3, "ngModelChange", "ngModel"], [3, "value"], ["value", "otro"], [4, "ngIf"], ["type", "number", 3, "ngModelChange", "placeholder", "ngModel"], ["position", "stacked"], ["fill", "outline", "expand", "block", 2, "margin-top", "10px", 3, "click"], ["slot", "start", "name", "camera-outline"], ["fill", "outline", "expand", "block", "color", "secondary", 2, "margin-top", "10px", 3, "click"], ["slot", "start", "name", "image-outline"], ["expand", "block", 3, "click"], ["placeholder", "Especifica qu\xE9 material es...", 3, "ngModelChange", "ngModel"], [2, "width", "100%", "border-radius", "8px", 3, "src"]], template: function Tab1Page_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header")(1, "ion-toolbar", 0)(2, "div", 1);
    \u0275\u0275element(3, "img", 2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-title");
    \u0275\u0275text(5, "Registro Reciclaje");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "ion-content", 3)(7, "ion-card")(8, "ion-card-header")(9, "ion-card-title");
    \u0275\u0275text(10, "Registro de Reciclaje");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "ion-card-content")(12, "ion-item")(13, "ion-label");
    \u0275\u0275text(14, "Material");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "ion-select", 4);
    \u0275\u0275twoWayListener("ngModelChange", function Tab1Page_Template_ion_select_ngModelChange_15_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.material, $event) || (ctx.material = $event);
      return $event;
    });
    \u0275\u0275elementStart(16, "ion-select-option", 5);
    \u0275\u0275text(17, "Pl\xE1stico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "ion-select-option", 5);
    \u0275\u0275text(19, "Vidrio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "ion-select-option", 5);
    \u0275\u0275text(21, "Papel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "ion-select-option", 5);
    \u0275\u0275text(23, "Org\xE1nico");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "ion-select-option", 6);
    \u0275\u0275text(25, "Otro");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(26, Tab1Page_ion_item_26_Template, 2, 1, "ion-item", 7);
    \u0275\u0275elementStart(27, "ion-item")(28, "ion-input", 8);
    \u0275\u0275twoWayListener("ngModelChange", function Tab1Page_Template_ion_input_ngModelChange_28_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.cantidad, $event) || (ctx.cantidad = $event);
      return $event;
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "ion-item")(30, "ion-label", 9);
    \u0275\u0275text(31, "Evidencia (Foto)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "ion-button", 10);
    \u0275\u0275listener("click", function Tab1Page_Template_ion_button_click_32_listener() {
      return ctx.tomarFoto();
    });
    \u0275\u0275element(33, "ion-icon", 11);
    \u0275\u0275text(34, " Tomar Foto ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "ion-button", 12);
    \u0275\u0275listener("click", function Tab1Page_Template_ion_button_click_35_listener() {
      return ctx.elegirDeGaleria();
    });
    \u0275\u0275element(36, "ion-icon", 13);
    \u0275\u0275text(37, " Elegir de Galer\xEDa ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(38, Tab1Page_ion_item_38_Template, 2, 1, "ion-item", 7);
    \u0275\u0275elementStart(39, "ion-button", 14);
    \u0275\u0275listener("click", function Tab1Page_Template_ion_button_click_39_listener() {
      return ctx.registrarReciclaje();
    });
    \u0275\u0275text(40, " Registrar ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(15);
    \u0275\u0275twoWayProperty("ngModel", ctx.material);
    \u0275\u0275advance();
    \u0275\u0275property("value", 1);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 2);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 3);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", 4);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx.material === "otro");
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", ctx.obtenerPlaceholderCantidad());
    \u0275\u0275twoWayProperty("ngModel", ctx.cantidad);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngIf", ctx.fotoBase64);
  }
}, dependencies: [
  CommonModule,
  NgIf,
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
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonIcon
], styles: ['@charset "UTF-8";\n\n\n\nion-content[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      135deg,\n      #e8f5e9,\n      #c8e6c9);\n}\nion-toolbar[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      90deg,\n      #2e7d32,\n      #66bb6a);\n  --color: #ffffff;\n  text-align: center;\n}\nion-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  border-radius: 15px;\n  height: 200px;\n  object-fit: cover;\n  width: 100%;\n}\nion-card[_ngcontent-%COMP%] {\n  border-radius: 20px;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n  margin-bottom: 20px;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\nion-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);\n}\nion-card-title[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 1.2rem;\n  color: #2e7d32;\n  text-align: center;\n}\nion-item[_ngcontent-%COMP%] {\n  --background: #ffffff;\n  border-radius: 12px;\n  margin-bottom: 10px;\n}\nion-input[_ngcontent-%COMP%], \nion-select[_ngcontent-%COMP%] {\n  --padding-start: 10px;\n}\nion-button[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  border-radius: 12px;\n  font-weight: bold;\n  letter-spacing: 0.5px;\n}\nion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  background: #f1f8e9;\n  padding: 10px;\n  border-radius: 10px;\n  margin-top: 10px;\n  font-weight: 500;\n}\n.custom-toolbar[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      90deg,\n      #2e7d32,\n      #66bb6a);\n  --color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 10px;\n  padding-bottom: 15px;\n}\n.header-image-container[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-bottom: 8px;\n}\n.header-image-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 120px;\n  height: 120px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 4px solid white;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n}\n/*# sourceMappingURL=tab1.page.css.map */'] });
var Tab1Page = _Tab1Page;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tab1Page, [{
    type: Component,
    args: [{ selector: "app-tab1", standalone: true, imports: [
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
      IonLabel,
      IonSelect,
      IonSelectOption,
      IonInput,
      IonButton,
      IonIcon
    ], template: `<ion-header>\r
  <ion-toolbar class="custom-toolbar">\r
    <div class="header-image-container">\r
      <img src="../assets/TBCST.jpeg" alt="Logo">\r
    </div>\r
    <ion-title>Registro Reciclaje</ion-title>\r
  </ion-toolbar>\r
</ion-header>\r
\r
<ion-content class="ion-padding">\r
\r
  <ion-card>\r
    <ion-card-header>\r
      <ion-card-title>Registro de Reciclaje</ion-card-title>\r
    </ion-card-header>\r
\r
    <ion-card-content>\r
      <ion-item>\r
        <ion-label>Material</ion-label>\r
        <ion-select [(ngModel)]="material">\r
          <ion-select-option [value]="1">Pl\xE1stico</ion-select-option>\r
          <ion-select-option [value]="2">Vidrio</ion-select-option>\r
          <ion-select-option [value]="3">Papel</ion-select-option>\r
          <ion-select-option [value]="4">Org\xE1nico</ion-select-option>\r
          <ion-select-option value="otro">Otro</ion-select-option>\r
        </ion-select>\r
      </ion-item>\r
      <ion-item *ngIf="material === 'otro'">\r
        <ion-input\r
          placeholder="Especifica qu\xE9 material es..."\r
          [(ngModel)]="otroMaterial">\r
        </ion-input>\r
      </ion-item>\r
      <ion-item>\r
        <ion-input\r
          type="number"\r
          [placeholder]="obtenerPlaceholderCantidad()"\r
          [(ngModel)]="cantidad">\r
        </ion-input>\r
      </ion-item>\r
      <ion-item>\r
        <ion-label position="stacked">Evidencia (Foto)</ion-label>\r
\r
        <ion-button fill="outline" expand="block" (click)="tomarFoto()" style="margin-top: 10px;">\r
          <ion-icon slot="start" name="camera-outline"></ion-icon>\r
          Tomar Foto\r
        </ion-button>\r
\r
        <ion-button fill="outline" expand="block" color="secondary" (click)="elegirDeGaleria()" style="margin-top: 10px;">\r
          <ion-icon slot="start" name="image-outline"></ion-icon>\r
          Elegir de Galer\xEDa\r
        </ion-button>\r
      </ion-item>\r
       <ion-item *ngIf="fotoBase64">\r
        <img [src]="'data:image/jpeg;base64,' + fotoBase64" style="width: 100%; border-radius: 8px;" />\r
      </ion-item>\r
      <ion-button expand="block" (click)="registrarReciclaje()">\r
        Registrar\r
      </ion-button>\r
\r
    </ion-card-content>\r
  </ion-card>\r
\r
</ion-content>\r
`, styles: ['@charset "UTF-8";\n\n/* src/app/tab1/tab1.page.scss */\nion-content {\n  --background:\n    linear-gradient(\n      135deg,\n      #e8f5e9,\n      #c8e6c9);\n}\nion-toolbar {\n  --background:\n    linear-gradient(\n      90deg,\n      #2e7d32,\n      #66bb6a);\n  --color: #ffffff;\n  text-align: center;\n}\nion-card img {\n  border-radius: 15px;\n  height: 200px;\n  object-fit: cover;\n  width: 100%;\n}\nion-card {\n  border-radius: 20px;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);\n  margin-bottom: 20px;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}\nion-card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);\n}\nion-card-title {\n  font-weight: bold;\n  font-size: 1.2rem;\n  color: #2e7d32;\n  text-align: center;\n}\nion-item {\n  --background: #ffffff;\n  border-radius: 12px;\n  margin-bottom: 10px;\n}\nion-input,\nion-select {\n  --padding-start: 10px;\n}\nion-button {\n  margin-top: 10px;\n  border-radius: 12px;\n  font-weight: bold;\n  letter-spacing: 0.5px;\n}\nion-text p {\n  background: #f1f8e9;\n  padding: 10px;\n  border-radius: 10px;\n  margin-top: 10px;\n  font-weight: 500;\n}\n.custom-toolbar {\n  --background:\n    linear-gradient(\n      90deg,\n      #2e7d32,\n      #66bb6a);\n  --color: #ffffff;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding-top: 10px;\n  padding-bottom: 15px;\n}\n.header-image-container {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  margin-bottom: 8px;\n}\n.header-image-container img {\n  width: 120px;\n  height: 120px;\n  object-fit: cover;\n  border-radius: 50%;\n  border: 4px solid white;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n}\n/*# sourceMappingURL=tab1.page.css.map */\n'] }]
  }], () => [{ type: ToastController }, { type: HttpClient }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Tab1Page, { className: "Tab1Page", filePath: "src/app/tab1/tab1.page.ts", lineNumber: 31 });
})();
export {
  Tab1Page
};
/*! Bundled license information:

@capacitor/core/dist/index.js:
  (*! Capacitor: https://capacitorjs.com/ - MIT License *)
*/
//# sourceMappingURL=tab1.page-RJBHGNYS.js.map
