/* eslint-disable no-null/no-null */

let _ = require('lodash-firecloud');

// prepopulate with example event
document.getElementById('events').value = JSON.stringify(
  {
    id: 'example',
    screen: {
      width: 100,
      height: 100
    },
    window: {
      x: 10,
      y: 10,
      width: 80,
      height: 80
    },
    client: {
      x: 10,
      y: 10,
      width: 60,
      height: 60
    },
    page: {
      x: 20,
      y: 20,
      width: 40,
      height: 40
    }
  }, null, 2);

let playing = false;
let events = [];
let eventsIndex = 0;

// render
let render = function(e) {
  document.title = `[${eventsIndex}]: ${e.id}`;
  let multiplier = _.min([
    window.screen.width / e.screen.width * 0.8,
    window.screen.height / e.screen.height * 0.8
  ]);

  let el;

  el = document.body;
  el.title = JSON.stringify(e, null, 2);

  el = document.getElementsByClassName('screen')[0];
  el.title = JSON.stringify(e.screen, null, 2);
  el.style = `
    width: ${e.screen.width * multiplier}px;
    height: ${e.screen.height * multiplier}px;
  `;

  el = document.getElementsByClassName('window')[0];
  el.title = JSON.stringify(e.window, null, 2);
  el.style = `
    left: ${e.window.x * multiplier}px;
    top: ${e.window.y * multiplier}px;
    width: ${e.window.width * multiplier}px;
    height: ${e.window.height * multiplier}px;
  `;

  el = document.getElementsByClassName('client')[0];
  el.title = JSON.stringify(e.client, null, 2);
  el.style = `
    left: ${e.client.x * multiplier}px;
    top: ${e.client.y * multiplier}px;
    width: ${e.client.width * multiplier}px;
    height: ${e.client.height * multiplier}px;
  `;

  el = document.getElementsByClassName('page')[0];
  el.title = JSON.stringify(e.page, null, 2);
  el.style = `
    left: ${(e.page.x - e.client.x) * multiplier}px;
    top: ${(e.page.y - e.client.y) * multiplier}px;
    width: ${e.page.width * multiplier}px;
    height: ${e.page.height * multiplier}px;
  `;
};

let playEvents = async function() {
  playing = true;
  for (let e of _.slice(events, eventsIndex)) {
    if (!playing) {
      break;
    }

    eventsIndex = eventsIndex + 1;
    render(e);
    await _.sleep(1000);
  }
  playing = false;
};

document.getElementById('load').addEventListener('click', function() {
  eventsIndex = 0;
  playing = false;

  events = document.getElementById('events').value;
  events = _.trim(events);
  events = _.split(events, '\n');
  events = _.map(events, function(e) {
    e = JSON.parse(e);
    if (_.isNil(e)) {
      return;
    }

    let eId = e.id;
    // allow event record with 'content' property (atex specific)
    e = _.get(e, 'content', e);
    eId = _.get(e, 'id', eId);
    // allow event with 'browser' property (atex specific)
    e = _.get(e, 'browser', e);
    e.id = eId;
    return e;
  });
  events = _.compact(events);

  if (events.length) {
    render(_.head(events));
  }
});

document.getElementById('play_pause').addEventListener('click', function() {
  if (playing) {
    playing = false;
  } else {
    playEvents();
  }
});

document.getElementById('first').addEventListener('click', function() {
  playing = false;
  eventsIndex = 0;
  render(events[eventsIndex]);
});

document.getElementById('prev').addEventListener('click', function() {
  playing = false;
  eventsIndex = _.max([
    0,
    eventsIndex - 1
  ]);
  render(events[eventsIndex]);
});

document.getElementById('next').addEventListener('click', function() {
  playing = false;
  eventsIndex = _.min([
    _.max([
      0,
      events.length - 1
    ]),
    eventsIndex + 1
  ]);
  render(events[eventsIndex]);
});
