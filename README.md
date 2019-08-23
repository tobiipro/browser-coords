# browser-coords [![Build Status][2]][1]

`browser-coords` gives access to screen, window, client and page coordinates **in device pixels**, with the following API (all except `cfg` are functions to call):

```javascript
{
  // convert {screenX, screenY} coords to {clientX, clientY} coords
  screenToClient,

  // configuration object, see example below
  cfg,

  // current screen
  // coordinates in device px
  screen: {
    cfg,

    width,
    height,

    available: {left, top, width, height},
    orientation: {angle, type},
    osZoomFactorPercentile,
    pixelRatioPercentile
  },

  // browser window
  // coordinates in device px relative to screen
  window: {
    cfg,

    x,
    y,
    width,
    height,

    viewport: {x, y}, // browser window + chrome + borderSize (address bar, left sidebar)
    borderSize // Windows
  },

  // client aka visual-viewport/viewport/client-area of the top/iframe
  // coordinates in device px relative to browser window
  client: {
    cfg,

    x,
    y,
    width,
    height,

    isIframe,
    scroll: {x, y}
  },

  // page aka layout-viewport/document
  // coordinates in device px relative to client
  page: {
    cfg,

    x,
    y,
    width,
    height,

    url,
    zoomFactor
  }
}
```

## Example

See the [demo code](docs/demo.js).


## `window.devicePixelRatio`

In order to get correct coordinates, one must know an array of multipliers.

Those multipliers make up the value of `window.devicePixelRatio`:
`actualDevicePixelRatio * displayZoom * pageZoom`.

Those multipliers are reflected in `browser-coords`
as `screen.pixelRatio() * screen.osZoomFactor() * page.zoomFactor()`.


## Page zoom

One of them is the page zoom that the user sets via the browser.

The only way to get the real value is via a WebExtension
and the [tabs.getZoom()](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/getZoom) API.

**NOTE** It is close to impossible to get the page zoom from within the web page,
but [docs/guess-zoom-percentile.js](docs/guess-zoom-percentile.js) is a proof of concept to guess it.

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

As you can check for yourself [here](https://jsperf.com/coords),
some of the APIs are not performant.
Unfortunately the behaviour doesn't seem uniform across browsers and operating systems,
so we added the ability to throttle all APIs.


## References

* https://www.w3.org/community/respimg/2013/04/06/devicenormalpixelratio-proposal-for-zoom-independent-devicepixelratio-for-hd-retina-games/
* http://www.canbike.org/CSSpixels/
* https://github.com/WICG/ViewportAPI


## License

[Apache 2.0](LICENSE)


  [1]: https://travis-ci.com/tobiipro/browser-coords
  [2]: https://travis-ci.com/tobiipro/browser-coords.svg?branch=master
