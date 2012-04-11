
document.addEventListener('DOMContentLoaded', setup, false);

function setup() {
  
  var page = document.querySelector("#page");
  var views = document.querySelector("#views");

  var pageController = new PageController(page);
  var bundle = new Bundle(views);

  var mainViewController = bundle.viewControllers.main;
  pageController.presentViewController(mainViewController, false);

  var navController = bundle.viewControllers.nav;
  var fooViewController = bundle.viewControllers.foo;
  var barViewController = bundle.viewControllers.bar;

  navController.pushViewController(barViewController);

  var pushFoo = barViewController.view.querySelector("button.push-foo");
  pushFoo.addEventListener('click', function(e) {
    navController.pushViewController(fooViewController, true);
    e.stopPropagation();
  }, false);  

  var dismissFoo = fooViewController.view.querySelector("button.dismiss-foo");
  dismissFoo.addEventListener('click', function(e) {
    pageController.dismissViewController(true);
    e.stopPropagation();
  }, false);

  var presentFoo = mainViewController.view.querySelector(".present-foo");
  presentFoo.addEventListener('click', function(e) {
    pageController.presentViewController(navController, true);
    e.stopPropagation();
  }, false);

  setupMainMenu(mainViewController.view, bundle, pageController);

  var slides = document.querySelector("section.content > section.slide-show > section.slides");
  var slideShow = new SlideShow(slides);

};

function setupMainMenu(content, bundle, pageController) {

  var formFieldsController = bundle.viewControllers['form-fields'];
  setupDoneButton(formFieldsController.view, pageController);

  content.querySelector(".button.form-fields").addEventListener('click', function(e) {
    pageController.presentViewController(formFieldsController, true);
    e.stopPropagation();
  }, false);
}

function setupDoneButton(view, pageController) {
  var button = view.querySelector(".button.done");
  button.addEventListener('click', click, false);

  function click(e) {
    pageController.dismissViewController(true);
    e.stopPropagation();
  }
}


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
      if (dx < 0) {
        left();    
      } else {
        right();    
      }
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
