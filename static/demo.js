
document.addEventListener('DOMContentLoaded', setup, false);

var slideShows = [];

function setup() {
  
  var page = document.querySelector("#page");

  var pageController = new PageController(page);
  var bundle = new Bundle(document.querySelector(".bundle.default"));

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

  var slideShowElements = document.querySelectorAll("section.content > section.slide-show");
  for (var i = 0; i < slideShowElements.length; i++) {
    slideShows.push(new SlideShow(slideShowElements[i]));    
  }

  // Transitions
  document.querySelector("section.view.transitions section.slide.demo div").addEventListener('click', function(e) {
    this.classList.toggle('selected');
  }, false);

  // Animations
  document.querySelector("section.view.animations section.slide.demo div").addEventListener('click', function(e) {
    this.classList.toggle('selected');
  }, false);

  document.querySelector("section.view.animations section.slide.demo div").addEventListener('webkitAnimationEnd', function(e) {
    this.classList.remove('selected');
  }, false);

  setupTouch();

};

function setupTouch() {

  var slide = document.querySelector("section.view.touch section.slide.demo");
  var marker = slide.querySelector("div");
  slide.addEventListener('touchstart', function(e) {
    marker.style['-webkit-transform'] = "translate3d(" + e.clientX + "px, " + e.clientY + "px, 0)";
  }, false);
  slide.addEventListener('mousedown', function(e) {
    marker.style['-webkit-transform'] = "translate3d(" + e.clientX + "px, " + e.clientY + "px, 0)";
  }, false);

}

function setupMainMenu(content, bundle, pageController) {

  var controllers = {};

  function setupViewController(name) {
    var controller = bundle.viewControllers[name];
    setupDoneButton(controller.view, pageController);
    content.querySelector(".button." + name).addEventListener('click', function(e) {
      pageController.presentViewController(controller, true);
      e.stopPropagation();
    }, false);
    controllers[name] = controller;
  }

  setupViewController('media-query');
  setupViewController('form-fields');
  setupViewController('transitions');
  setupViewController('animations');
  setupViewController('touch');

}

function setupDoneButton(view, pageController) {
  var button = view.querySelector(".button.done");
  button.addEventListener('click', click, false);

  function click(e) {
    pageController.dismissViewController(true);
    e.stopPropagation();
  }
}
