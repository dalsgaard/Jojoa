
document.addEventListener('DOMContentLoaded', setup, false);

function setup() {
  
  var page = document.querySelector("#page");
  var views = document.querySelector("#views");

  var pageController = new PageController(page);
  var bundle = new Bundle(views);

  var mainViewController = bundle.viewControllers.main;
  pageController.presentViewController(mainViewController);

  var fooViewController = bundle.viewControllers.foo;
  var dismissFoo = fooViewController.view.querySelector("button.dismiss-foo");
  dismissFoo.addEventListener('click', function(e) {
    fooViewController.pageController.dismissViewController();
    e.stopPropagation();
  }, false);

  var presentFoo = mainViewController.view.querySelector("button.present-foo");
  presentFoo.addEventListener('click', function(e) {
    pageController.presentViewController(fooViewController);
    e.stopPropagation();
  }, false);

  /*
  var mainPage = document.querySelector("section.view.main-page");
  var fooPage = document.querySelector("section.view.foo-page");
  var bazPage = document.querySelector("section.view.baz-page");
  var fooNav = fooPage.querySelector("section.navigation");

  mainPage.addEventListener('click', clickMain, false);
  fooPage.addEventListener('click', clickFoo, false);
  fooNav.addEventListener('click', clickFooNav, false);
  bazPage.addEventListener('click', clickBaz, false);

  page.appendChild(mainPage);

  function clickMain(e) {
    presentView(fooPage);
  }

  function clickFoo(e) {
    dismissView(fooPage);
  }
  
  function clickFooNav(e) {
    pushView(fooNav, bazPage);
    e.stopPropagation();
  }

  function clickBaz(e) {
    popView(fooNav, bazPage);
    e.stopPropagation();
  }

  function pushView(navigation, view) {
    navigation.classList.add('push');
    navigation.querySelector("section.container").appendChild(view);
    window.setTimeout(function() {
      navigation.classList.remove('push');
    }, 1000);
  }

  function popView(navigation, view) {
    navigation.classList.add('pop');
    window.setTimeout(function() {
      views.appendChild(view);
      navigation.classList.remove('pop');
    }, 2000);
  }

  function presentView(view) {
    view.classList.add('modal');
    view.classList.add('appear');
    page.appendChild(view);
  }

  function dismissView(view) {
    view.classList.remove('appear');
    view.classList.add('disappear');
    window.setTimeout(function() {
      views.appendChild(view);
      view.classList.remove('disappear');
      view.classList.remove('modal');
    }, 1000);
  }
  */

};
