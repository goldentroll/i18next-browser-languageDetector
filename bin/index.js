!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.i18nextBrowserLanguageDetector=e()}}(function(){return function e(t,o,n){function r(i,u){if(!o[i]){if(!t[i]){var s="function"==typeof require&&require;if(!u&&s)return s(i,!0);if(a)return a(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var c=o[i]={exports:{}};t[i][0].call(c.exports,function(e){var o=t[i][1][e];return r(o?o:e)},c,c.exports,e,t,o,n)}return o[i].exports}for(var a="function"==typeof require&&require,i=0;i<n.length;i++)r(n[i]);return r}({1:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n={create:function(e,t,o,n){var r=void 0;if(o){var a=new Date;a.setTime(a.getTime()+60*o*1e3),r="; expires="+a.toGMTString()}else r="";n=n?"domain="+n+";":"",document.cookie=e+"="+t+r+";"+n+"path=/"},read:function(e){for(var t=e+"=",o=document.cookie.split(";"),n=0;n<o.length;n++){for(var r=o[n];" "===r.charAt(0);)r=r.substring(1,r.length);if(0===r.indexOf(t))return r.substring(t.length,r.length)}return null},remove:function(e){this.create(e,"",-1)}};o["default"]={name:"cookie",lookup:function(e){var t=void 0;if(e.lookupCookie&&"undefined"!=typeof document){var o=n.read(e.lookupCookie);o&&(t=o)}return t},cacheUserLanguage:function(e,t){t.lookupCookie&&"undefined"!=typeof document&&n.create(t.lookupCookie,e,t.cookieMinutes,t.cookieDomain)}},t.exports=o["default"]},{}],2:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n={setItem:function(e,t){if(window.localStorage)try{window.localStorage.setItem(e,t)}catch(o){}},getItem:function(e,t){if(window.localStorage)try{return window.localStorage.getItem(e,t)}catch(o){return void 0}}};o["default"]={name:"localStorage",lookup:function(e){var t=void 0;if(e.lookupLocalStorage&&"undefined"!=typeof window&&window.localStorage){var o=n.getItem(e.lookupLocalStorage);o&&(t=o)}return t},cacheUserLanguage:function(e,t){t.lookupLocalStorage&&"undefined"!=typeof window&&window.localStorage&&n.setItem(t.lookupLocalStorage,e)}},t.exports=o["default"]},{}],3:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o["default"]={name:"navigator",lookup:function(e){var t=[];if("undefined"!=typeof navigator){if(navigator.languages)for(var o=0;o<navigator.languages.length;o++)t.push(navigator.languages[o]);navigator.userLanguage&&t.push(navigator.userLanguage),navigator.language&&t.push(navigator.language)}return t.length>0?t:void 0}},t.exports=o["default"]},{}],4:[function(e,t,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o["default"]={name:"querystring",lookup:function(e){var t=void 0;if("undefined"!=typeof window)for(var o=window.location.search.substring(1),n=o.split("&"),r=0;r<n.length;r++){var a=n[r].indexOf("=");if(a>0){var i=n[r].substring(0,a);i===e.lookupQuerystring&&(t=n[r].substring(a+1))}}return t}},t.exports=o["default"]},{}],5:[function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t["default"]=e,t}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(){return{order:["querystring","cookie","localStorage","navigator"],lookupQuerystring:"lng",lookupCookie:"i18next",lookupLocalStorage:"i18nextLng",caches:["localStorage"]}}Object.defineProperty(o,"__esModule",{value:!0});var u=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),s=e("./utils"),l=r(s),c=e("./browserLookups/cookie"),f=n(c),d=e("./browserLookups/querystring"),g=n(d),p=e("./browserLookups/localStorage"),v=n(p),h=e("./browserLookups/navigator"),k=n(h),y=function(){function e(t){var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];a(this,e),this.type="languageDetector",this.detectors={},this.init(t,o)}return u(e,[{key:"init",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];this.services=e,this.options=l.defaults(t,this.options||{},i()),this.addDetector(f["default"]),this.addDetector(g["default"]),this.addDetector(v["default"]),this.addDetector(k["default"])}},{key:"addDetector",value:function(e){this.detectors[e.name]=e}},{key:"detect",value:function(e){var t=this;e||(e=this.options.order);var o=[];e.forEach(function(e){if(t.detectors[e]){var n=t.detectors[e].lookup(t.options);n&&"string"==typeof n&&(n=[n]),n&&(o=o.concat(n))}});var n=void 0;return o.forEach(function(e){if(!n){var o=t.services.languageUtils.formatLanguageCode(e);t.services.languageUtils.isWhitelisted(o)&&(n=o)}}),n||this.options.fallbackLng&&this.options.fallbackLng.length?this.options.fallbackLng[0]:void 0}},{key:"cacheUserLanguage",value:function(e,t){var o=this;t||(t=this.options.caches),t.forEach(function(t){o.detectors[t]&&o.detectors[t].cacheUserLanguage(e,o.options)})}}]),e}();y.type="languageDetector",o["default"]=y,t.exports=o["default"]},{"./browserLookups/cookie":1,"./browserLookups/localStorage":2,"./browserLookups/navigator":3,"./browserLookups/querystring":4,"./utils":6}],6:[function(e,t,o){"use strict";function n(e){return i.call(u.call(arguments,1),function(t){if(t)for(var o in t)void 0===e[o]&&(e[o]=t[o])}),e}function r(e){return i.call(u.call(arguments,1),function(t){if(t)for(var o in t)e[o]=t[o]}),e}Object.defineProperty(o,"__esModule",{value:!0}),o.defaults=n,o.extend=r;var a=[],i=a.forEach,u=a.slice},{}]},{},[5])(5)});