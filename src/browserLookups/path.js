export default {
  name: 'path',

  lookup(options) {
    let found;
    if (typeof window !== 'undefined') {
      const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      if (language instanceof Array) {
        if (typeof options.lookupFromUrlIndex === 'number') {
          found = language[options.lookupFromPathIndex].replace('/', '');
        } else {
          found = language[0].replace('/', '');
        }
      }
    }
    return found;
  }
};
