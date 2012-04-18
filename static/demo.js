
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
  setupLocalStorage();
  setupSessionStorage();
  setupOnlineProperty();
  setupOnlineOfflineEvents();

};

function setupTouch() {

  var slide = document.querySelector("section.view.touch section.slide.demo");
  var marker = slide.querySelector("div");

  slide.addEventListener('touchstart', function(e) {
    var slideRect = this.getBoundingClientRect();
    var markerRect = marker.getBoundingClientRect();
    var touch = e.touches[0];
    var x = touch.clientX - slideRect.left - markerRect.width / 2;
    var y = touch.clientY - slideRect.top - markerRect.height / 2;
    var translate = "translate3d(" + x + "px, " + y + "px, 0)";
    marker.style['-webkit-transform'] = translate; 
  }, false);

  slide.addEventListener('mousedown', function(e) {
    var slideRect = this.getBoundingClientRect();
    var markerRect = marker.getBoundingClientRect();
    var x = e.clientX - slideRect.left - markerRect.width / 2;
    var y = e.clientY - slideRect.top - markerRect.height / 2;
    marker.style['-webkit-transform'] = "translate3d(" + x + "px, " + y + "px, 0)";
  }, false);

}

function setupLocalStorage() {

  var slide = document.querySelector("section.view.webstorage section.slide.demo.local");
  var set = slide.querySelector("ul > li.set");
  var get = slide.querySelector("ul > li.get");
  var time = slide.querySelector("ul > li.time");

  set.addEventListener('click', setTime, false);
  function setTime() {
    localStorage['time'] = (new Date()).toString();
  }

  get.addEventListener('click', getTime, false);
  function getTime() {
    time.innerHTML = localStorage['time'];
  }

  time.addEventListener('click', clearTimeField, false);
  function clearTimeField() {
    time.innerHTML = "";
  }

}

function setupSessionStorage() {

  var slide = document.querySelector("section.view.webstorage section.slide.demo.session");
  var set = slide.querySelector("ul > li.set");
  var get = slide.querySelector("ul > li.get");
  var time = slide.querySelector("ul > li.time");

  set.addEventListener('click', setTime, false);
  function setTime() {
    sessionStorage['time'] = (new Date()).toString();
  }

  get.addEventListener('click', getTime, false);
  function getTime() {
    time.innerHTML = sessionStorage['time'];
  }

  time.addEventListener('click', clearTimeField, false);
  function clearTimeField() {
    time.innerHTML = "";
  }

}

function setupOnlineProperty() {

  var slide = document.querySelector("section.view.onlineoffline section.slide.demo.online-property");
  var check = slide.querySelector("ul > li.check");
  var status = slide.querySelector("ul > li.status");

  check.addEventListener('click', checkStatus, false);
  function checkStatus() {
    if (navigator.onLine) {
      status.innerHTML = "Online";
    } else {
      status.innerHTML = "Offline";
    }
  }

  status.addEventListener('click', clearStatusField, false);
  function clearStatusField() {
    status.innerHTML = "";
  }

}

function setupOnlineOfflineEvents() {

  var slide = document.querySelector("section.view.onlineoffline section.slide.demo.online-offline-events");
  var status = slide.querySelector("ul > li.status");

  window.addEventListener('online', onlineEvent, false);
  function onlineEvent() {
    status.innerHTML = "Online";
  }

  window.addEventListener('offline', offlineEvent, false);
  function offlineEvent() {
    status.innerHTML = "Offline";
  }

  status.addEventListener('click', clearStatusField, false);
  function clearStatusField() {
    status.innerHTML = "";
  }

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
    return controller;
  }

  setupViewController('media-query');
  setupViewController('form-fields');
  setupViewController('transitions');
  setupViewController('animations');
  setupViewController('touch');
  setupViewController('webstorage');
  setupViewController('onlineoffline');
  setupViewController('orientation');

}

function setupDoneButton(view, pageController) {
  var button = view.querySelector(".button.done");
  button.addEventListener('click', click, false);

  function click(e) {
    pageController.dismissViewController(true);
    e.stopPropagation();
  }
}
