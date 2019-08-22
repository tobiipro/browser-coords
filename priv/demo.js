let _ = require('lodash-firecloud');
let browserCoords = require('..');

let query = _.replace(location.search || '', /^\?/, '');
query = decodeURI(query);
let fragmentCfg = JSON.parse(query || '{}');
_.merge(browserCoords.cfg, fragmentCfg);
browserCoords.init();

// force scrollbars
let pageWidth = browserCoords.client.width() * 2;
let pageHeight = browserCoords.client.height() * 2;
document.body.style.width = `${pageWidth}px`;
document.body.style.height = `${pageHeight}px`;

// nested
if (window === window.top) {
  document.getElementById('nested').innerHTML = '<iframe id="nestedIframe" src="demo.iframe.html"></iframe>';
}
if (window === window.top) {
  setInterval(function() {
    let nestedIframe = document.getElementById('nestedIframe');
    if (_.isUndefined(nestedIframe)) {
      return;
    }

    let iframeCfg = {
      screen: browserCoords.screen.cfg,
      window: browserCoords.window.cfg,
      client: {
        ...browserCoords.client.cfg,
        x: nestedIframe.getBoundingClientRect().left,
        y: nestedIframe.getBoundingClientRect().top
      }
    };
    nestedIframe.contentWindow.postMessage(iframeCfg, '*');
  }, 1000);
} else {
  window.addEventListener('message', function(e) {
    _.merge(browserCoords.cfg, e.data);
  });
}

// snapshot
setInterval(function() {
  let snapshot = _.pick(browserCoords, [
    'cfg',
    'screen',
    'window',
    'client',
    'page'
  ]);
  // eslint-disable-next-line no-null/no-null
  snapshot = JSON.stringify(snapshot, null, 2);
  document.getElementById('snapshot').innerHTML = `<pre>${snapshot}</pre>`;
}, 1000);
