
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

  var presentFoo = mainViewController.view.querySelector("button.present-foo");
  presentFoo.addEventListener('click', function(e) {
    pageController.presentViewController(navController, true);
    e.stopPropagation();
  }, false);

};
