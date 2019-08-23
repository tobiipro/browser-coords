// from https://www.kirupa.com/html5/drag.htm

module.exports = function(dragItem, container) {
  let active = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  let dragStart = function(e) {
    if (e.type === 'touchstart') {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }

    if (e.target === dragItem) {
      active = true;
    }
  };

  let dragEnd = function(_e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
  };

  let drag = function(e) {
    if (!active) {
      return;
    }

    e.preventDefault();

    if (e.type === 'touchmove') {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, dragItem);
  };

  let setTranslate = function(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  };

  container.addEventListener('touchstart', dragStart, false);
  container.addEventListener('touchend', dragEnd, false);
  container.addEventListener('touchmove', drag, false);

  container.addEventListener('mousedown', dragStart, false);
  container.addEventListener('mouseup', dragEnd, false);
  container.addEventListener('mousemove', drag, false);
};
