
function SlideShow(viewport) {
  var slides = viewport.querySelectorAll("section.slide");
  var width = (slides.length * 100).toString() + "%";
  viewport.style.width = width;
  viewport.addEventListener('touchstart', touchStart, false);
  viewport.addEventListener('touchend', touchEnd, false);
  var index = 0;
  update();
  var clientX, clientY;
  function touchStart(e) {
    var touch = e.touches[0];
    clientX = touch.clientX;
    clientY = touch.clientY;
  }
  function touchEnd(e) {
    var touch = e.changedTouches[0];
    var dx = touch.clientX - clientX;
    var dy = touch.clientY - clientY;
    if (Math.abs(dx) > 20 && Math.abs(dx) > Math.abs(dy)) {
      document.activeElement.blur();
      if (dx < 0) {
        left();    
      } else {
        right();    
      }
    }
  }
  viewport.addEventListener('mousedown', mouseStart, false);
  viewport.addEventListener('mouseup', mouseEnd, false);
  function mouseStart(e) {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  function mouseEnd(e) {
    var dx = e.clientX - clientX;
    var dy = e.clientY - clientY;
    if (Math.abs(dx) > 20 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        left();    
      } else {
        right();    
      }
      console.log(document.activeElement);
    }
  }
  function right() {
    if (index > 0) {
      index--;
      update();
    }
  }
  function left() {
    if (index < slides.length - 1) {
      index++;
      update();
    }
  }
  function update() {
    var offset = "-" + (index * 100 / slides.length).toString() + "%";
    viewport.style["-webkit-transform"] = "translate3d(" + offset + ", 0, 0)";
  }
}
