export let cfg = {
  page: {
    // Page zoom set by user
    // E.g. retrieve this from a WebExtension
    zoomFactor: undefined
  },

  client: {
    // e.g. this will be guestimated automatically in the top window,
    // but it has to be set by the caller in iframes
    x: undefined,
    y: undefined
  },

  window: {
    borderSize: undefined,
    viewport: {
      x: undefined,
      y: undefined
    }
  },

  screen: {
    // e.g. set via external means, otherwise this will be guestimated
    osZoomFactor: undefined,

    // e.g. set via external means, otherwise this will be guestimated
    pixelRatio: undefined
  },

  throttle: undefined
};

export default cfg;
