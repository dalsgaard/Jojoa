
function SlideShow(content) {
  var viewport = content.querySelector("section.slides");
  var slides = viewport.querySelectorAll("section.slide");
  var pageControl = null;
  if (content.querySelector("ul.page-control")) {
    pageControl = new PageControl(content.querySelector("ul.page-control"), slides.length);
  }
  var width = (slides.length * 100).toString() + "%";
  viewport.style.width = width;
  viewport.addEventListener('touchstart', touchStart, false);
  viewport.addEventListener('touchend', touchEnd, false);
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.width = (100 / slides.length).toString() + "%";
  }
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
    if (pageControl) {
      pageControl.currentPage(index);
    }
  }
}

function PageControl(ul, length) {
  this.lis = [];
  for (var i = 0; i < length; i++) {
    var li = document.createElement('li');
    ul.appendChild(li);
    this.lis.push(li);
  }
  this.currentIndex = 0;
  this.lis[this.currentIndex].classList.add('selected');
}
PageControl.prototype.currentPage = function(index) {
  this.lis[this.currentIndex].classList.remove('selected');
  this.currentIndex = index;
  this.lis[this.currentIndex].classList.add('selected');  
}

