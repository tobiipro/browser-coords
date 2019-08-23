let _ = require('lodash-firecloud');
let browserCoords = require('..');
let drag = require('./demo.drag');

// cfg from query
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
  drag(document.querySelector('#nested'), document.querySelector('body'));

  document.getElementById('nestedIframe').src = 'demo.iframe.html';
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
  }, 100);
} else {
  document.getElementById('nested').style = 'display: none';
  window.addEventListener('message', function(e) {
    _.merge(browserCoords.cfg, e.data);
  });
}

// render
setInterval(function() {
  document.getElementsByClassName('screen')[0].style = `
    left: 0px;
    top: 0px;
    width: ${browserCoords.screen.width() / 10}px;
    height: ${browserCoords.screen.height() / 10}px;
  `;
  document.getElementsByClassName('window')[0].style = `
    left: ${browserCoords.window.x() / 10}px;
    top: ${browserCoords.window.y() / 10}px;
    width: ${browserCoords.window.width() / 10}px;
    height: ${browserCoords.window.height() / 10}px;
  `;
  document.getElementsByClassName('client')[0].style = `
    left: ${browserCoords.client.x() / 10}px;
    top: ${browserCoords.client.y() / 10}px;
    width: ${browserCoords.client.width() / 10}px;
    height: ${browserCoords.client.height() / 10}px;
  `;
  document.getElementsByClassName('page')[0].style = `
    left: ${browserCoords.page.x() / 10}px;
    top: ${browserCoords.page.y() / 10}px;
    width: ${browserCoords.page.width() / 10}px;
    height: ${browserCoords.page.height() / 10}px;
  `;
}, 100);

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
}, 100);
