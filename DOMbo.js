/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

function setup () {
  const queue = [];

  return (arg) => {
    document.addEventListener("DOMContentLoaded", function() {
      queue.forEach( (el) => {
        el();
      });
    });
  if (typeof arg === 'function') {
    queue.push(arg);
    return null;
  }

  let htmlEls = [];

  if ( typeof arg === 'string' ) {
    let nodes = document.querySelectorAll(arg);
    htmlEls = Array.from(nodes);
  }

  if ( arg instanceof HTMLElement ) {
    htmlEls = Array.from(arg);
  }

  return new DOMNodeCollection(htmlEls);
};
}

window.$l = setup();


window.$l(() => console.log("1"));
window.$l(() => console.log('2'));
window.$l(() => console.log('3'));


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor (htmlEls) {
    this.htmlEls = htmlEls;
  }

  html (string) {
    if (string || string === "") {
      this.htmlEls.forEach( (el) => {
        el.innerHTML = string;
      });
    } else {
      return this.htmlEls[0].innerHTML;
    }
  }

  empty () {
    this.html("");
  }

  append (arg) {
    let results = "";
    if (arg instanceof HTMLElement){
       results = arg.outerHTML;
    } else if (arg instanceof DOMNodeCollection) {
      arg.htmlEls.forEach((el)=> {
        results += el.outerHTML;
      });
    } else {
      results = arg;
    }

    this.htmlEls.forEach((el) => {
      el.innerHTML += results;
    });
  }

  attr (name, value) {
    if (!value) {
      let returns = [];
      this.htmlEls.forEach( (el) => {
        if (el.getAttribute(name)) {
          returns.push(el.getAttribute(name));
        }
      });
      return returns;
    } else {
      this.htmlEls.forEach ( (el) => {
        el.setAttribute(name, value);
      });
    }
  }

  addClass (value) {
    this.htmlEls.forEach ( (el) => {
      el.className += " " + value;
    });
  }

  removeClass (className) {
    this.htmlEls.forEach ( (el) => {
      el.classList.remove(className);
    });
  }

  children(){
    let youth = [];
    this.htmlEls.forEach( (el) => {
      youth = youth.concat(el.children);
    });
    return new DOMNodeCollection(youth);
  }

  parent(){
    let elderly = [];
    this.htmlEls.forEach( (el) => {
      if (!elderly.includes(el.parentElement) ) {
         elderly.push(el.parentElement);
      }
    });

    return new DOMNodeCollection(elderly);
  }

  find(selector){
    let objs =[];
    this.htmlEls.forEach( (el) => {
      objs = objs.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(objs);
  }

  remove(selector){
    let bomb = [];
    if (!selector || selector === this.htmlEls[0].localName) {
      this.htmlEls.forEach( (el) => {
        bomb.push(el);
      });
    } else {
      bomb = this.find(selector);
    }

    bomb.forEach ( (el) => {
      el.remove();
    });
  }

  on (handler, callback) {
    this.htmlEls.forEach( (el) => {
      el.addEventListener(handler, callback);
    });
  }

  off (handler, callback) {
    this.htmlEls.forEach( (el) => {
      el.removeEventListener(handler, callback);
    });
  }

}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
