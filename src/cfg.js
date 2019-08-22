export let cfg = {
  throttle: undefined,

  screen: {
    // e.g. set via external means, otherwise this will be guestimated
    osZoomFactor: undefined,

    // e.g. set via external means, otherwise this will be guestimated
    pixelRatio: undefined
  },

  window: {
    borderSize: undefined,
    viewport: {
      x: undefined,
      y: undefined
    }
  },

  client: {
    // e.g. this will be guestimated automatically in the top window,
    // but it has to be set by the caller in iframes
    x: undefined,
    y: undefined
  },

  page: {
    // Page zoom set by user
    // E.g. retrieve this from a WebExtension
    zoomFactor: undefined
  }
};

export default cfg;
