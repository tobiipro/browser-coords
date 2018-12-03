# browser-coords [![Build Status][2]][1]

`browser-coords` gives access to screen, window, client and page coordinates in device pixels.


## Example

```javascript
// top-window

import _ from 'lodash';
import browserCoords from 'browser-coords';

// optional function, since browser-coords will guess these
let updateCfg = function(cfg = {}) {
  // NOTE: the following structure is just for documentation purposes
  _.merge(cfg, {
    window: {
      viewport: {
        x: undefined,
        y: undefined
      }
    },

    screen: {
      osZoomFactor: undefined,
      pixelRatio: undefined
    }
  });

  _.merge(browserCoords.cfg, cfg);
};

let updateClientPageCfg = function(cfg = {}) {
  // NOTE: the following structure is just for documentation purposes
  _.merge(cfg, {
    page: {
      zoomFactor: undefined // guess or get from a WebExtension
    },

    client: {
      x: undefined,
      y: undefined
    }
  });

  _.merge(browserCoords.cfg, cfg);
};

if (window === window.top) {
  browserCoords.init();

  // guess or get via a WebExtension
  browserCoords.cfg.page.zoomFactor = undefined;
} else {
  // in an iframe, you need to figure out where the iframe is
  // via iframeElement.getBoundingClientRect() in the parent window
  // and send that information over to the iframe,
  // maybe via iframeElement.contentWindow.postMessage(),
  // and call updateClientPageCfg()

  window.addEventListener('message', function(e) {
    if (!e.data || !e.data.browserCoordsIframeCfg) {
      return;
    }

    updateClientPageCfg(e.data.browserCoordsIframeCfg);
  });
}

setInterval(function() {
  document.body.innerHTML = JSON.stringify(_.pick(browserCoords, [
    'cfg',
    'page',
    'client',
    'window',
    'screen'
  ]), null, 2);
}, 1000);
```


## `window.devicePixelRatio`

In order to get correct coordinates, one must know an array of multipliers.

Those multipliers make up the value of `window.devicePixelRatio`:
`actualDevicePixelRatio * displayZoom * pageZoom`.

Those multipliers are reflected in `browser-coords`
as `screen.pixelRatio() * screen.osZoomFactor() * page.zoomFactor()`.

## Page zoom

One of them is the page zoom that the user sets via the browser.

It is close to impossible to get the page zoom from within the web page,
but [priv/guess-zoom.js](priv/guess-zoom.js) is a proof of concept to guess it.

The only way to get the real value is via a WebExtension
and the [tabs.getZoom()](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/getZoom) API.

If you are on OSX, that might be enough, but if you're on Windows, read on.


## Display zoom and actual device pixel ratio

Another one is the the display scaling as set by the OS.

On Windows systems,
the OS actually scales a display, while the actual device pixel ratio remains 1.

On OSX systems, with retina displays,
the OS will affect the actual device pixel ratio, while the device scaling remains 100%.

Both will end up changing the value of `window.devicePixelRatio`,
but the distinction is important in order to get the real screen resolution.


## Throttling

We currently throttle reading the values at 1000ms = 1s, in order to gain some performance.

As you can check for yourself [here](https://jsperf.com/coords),
some of the APIs are not performant.
Unfortunately the behaviour doesn't seem uniform across browsers and operating systems,
so we throttle all APIs.


## References

* https://www.w3.org/community/respimg/2013/04/06/devicenormalpixelratio-proposal-for-zoom-independent-devicepixelratio-for-hd-retina-games/
* http://www.canbike.org/CSSpixels/
* https://github.com/WICG/ViewportAPI


## License

[Apache 2.0](LICENSE)


  [1]: https://travis-ci.com/tobiipro/browser-coords
  [2]: https://travis-ci.com/tobiipro/browser-coords.svg?branch=master
