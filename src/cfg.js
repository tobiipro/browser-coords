export let cfg = {
  throttle: undefined,

  screen: {
    // NOTE set via external means, otherwise guestimated
    osZoomFactor: undefined,

    // NOTE set via external means, otherwise guestimated
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
    // NOTE set via external means, otherwise guestimated (top window only)
    x: undefined,
    y: undefined
  },

  page: {
    // NOTE a WebExtension can retrieve the user's page zoom
    zoomFactor: undefined
  }
};

export default cfg;
