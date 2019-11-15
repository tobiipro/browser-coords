export let cfg = {
  throttle: undefined as number,

  screen: {
    // NOTE set via external means, otherwise guestimated
    osZoomFactor: undefined as number,

    // NOTE set via external means, otherwise guestimated
    pixelRatio: undefined as number
  },

  window: {
    borderSize: undefined as number,
    viewport: {
      x: undefined as number,
      y: undefined as number
    }
  },

  client: {
    // NOTE set via external means, otherwise guestimated (top window only)
    x: undefined as number,
    y: undefined as number
  },

  page: {
    // NOTE a WebExtension can retrieve the user's page zoom
    zoomFactor: undefined as number
  }
};

export default cfg;
