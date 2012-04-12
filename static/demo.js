
document.addEventListener('DOMContentLoaded', setup, false);

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

  var slides = document.querySelector("section.content > section.slide-show > section.slides");
  var slideShow = new SlideShow(slides);

};

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

  setupViewController('form-fields');


}

function setupDoneButton(view, pageController) {
  var button = view.querySelector(".button.done");
  button.addEventListener('click', click, false);

  function click(e) {
    pageController.dismissViewController(true);
    e.stopPropagation();
  }
}
