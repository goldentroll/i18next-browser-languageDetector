import * as utils from './utils.js';
import cookie from './browserLookups/cookie.js';
import querystring from './browserLookups/querystring.js';
import localStorage from './browserLookups/localStorage.js';
import navigator from './browserLookups/navigator.js';
import htmlTag from './browserLookups/htmlTag.js';
import url from './browserLookups/url.js';

function getDefaults() {
  return {
    order: ['url', 'querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',

    // cache user language
    caches: ['localStorage'],
    excludeCacheFor: ['cimode']
    //cookieMinutes: 10,
    //cookieDomain: 'myDomain'
  };
}

class Browser {
  constructor(services, options = {}) {
    this.type = 'languageDetector';
    this.detectors = {};

    this.init(services, options);
  }

  init(services, options = {}, i18nOptions = {}) {
    this.services = services;
    this.options = utils.defaults(options, this.options || {}, getDefaults());
    this.i18nOptions = i18nOptions;

    this.addDetector(cookie);
    this.addDetector(querystring);
    this.addDetector(localStorage);
    this.addDetector(navigator);
    this.addDetector(htmlTag);
    this.addDetector(url);
  }

  addDetector(detector) {
    this.detectors[detector.name] = detector;
  }

  detect(detectionOrder) {
    if (!detectionOrder) detectionOrder = this.options.order;

    let detected = [];
    detectionOrder.forEach(detectorName => {
      if (this.detectors[detectorName]) {
        let lookup = this.detectors[detectorName].lookup(this.options);
        if (lookup && typeof lookup === 'string') lookup = [lookup];
        if (lookup) detected = detected.concat(lookup);
      }
    });

    let found;
    detected.forEach(lng => {
      if (found) return;
      let cleanedLng = this.services.languageUtils.formatLanguageCode(lng);
      if (this.services.languageUtils.isWhitelisted(cleanedLng)) found = cleanedLng;
    });

    if (!found) {
      let fallbacks = this.i18nOptions.fallbackLng;
      if (typeof fallbacks === 'string') fallbacks = [fallbacks];
      if (!fallbacks) fallbacks = [];

      if (Object.prototype.toString.apply(fallbacks) === '[object Array]') {
        found = fallbacks[0];
      } else {
        found = fallbacks[0] || fallbacks.default && fallbacks.default[0];
      }
    };

    return found;
  }

  cacheUserLanguage(lng, caches) {
    if (!caches) caches = this.options.caches;
    if (!caches) return;
    if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
    caches.forEach(cacheName => {
      if (this.detectors[cacheName]) this.detectors[cacheName].cacheUserLanguage(lng, this.options);
    });
  }
}

Browser.type = 'languageDetector';

export default Browser;
