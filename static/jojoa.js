
document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
  }, false);
}, false);


function PageController(page) {
  this.page = page;
  this.viewControllers = [];
}
PageController.prototype.presentViewController = presentViewController;
PageController.prototype.dismissViewController = dismissViewController;

function presentViewController(viewController, animated) {
  this.page.appendChild(viewController.view);
  this.viewControllers.push(viewController);
  viewController.pageController = this;
  if (animated) {
    viewController.view.classList.add('appear');
  } else {
    if (viewController.viewWillAppear) {
      viewController.viewWillAppear(false);
    }
    if (viewController.viewDidAppear) {
      viewController.viewDidAppear(false);
    }
  }
}

function dismissViewController(animated) {
  var controller = this.viewControllers.pop();
  if (animated) {
    controller.view.classList.add('disappear');
  } else {
    if (controller.viewWillDisappear) {
      controller.viewWillDisappear(false);
    }
    controller.pageController.page.removeChild(controller.view);
    controller.pageController = null;
    if (controller.viewDidDisappear) {
      controller.viewDidDisappear(false);
    }
  }
}


function AbstractViewController() { }
AbstractViewController.prototype.init = function(view) {
  this.view = view;
  this.pageController = null;
  var t = this;
  this.view.addEventListener('webkitAnimationStart', function(e) {
    if (e.animationName === "modal-appear") {
      if (t.viewWillAppear) t.viewWillAppear(true);
    } else if (e.animationName === "modal-disappear") {
      if (t.viewWillDisappear) t.viewWillDisappear(true);
    }
    e.stopPropagation();
  }, false);
  this.view.addEventListener('webkitAnimationEnd', function(e) {
    if (e.animationName === "modal-appear") {
      this.classList.remove('appear');
      if (t.viewDidAppear) t.viewDidAppear(true);
    } else if (e.animationName === "modal-disappear") {
      t.pageController.page.removeChild(this);
      this.classList.remove('disappear');
      t.pageController = null;
      if (t.viewDidDisappear) t.viewDidDisappear(true);
    }
    e.stopPropagation();
  }, false);
}

function ViewController(view) {
  this.init(view);
}
ViewController.prototype = new AbstractViewController();


function NavigationController(view) {
  this.init(view);
  this.container = view.querySelector("section.container");
  this.back = view.querySelector("header > nav.left > *.back");
  var t = this;
  if (this.back) {
    this.back.addEventListener('click', function(e) {
      t.popViewController(true);
    }, false);
  }
  this.viewControllers = [];
  var t = this;
  this.container.addEventListener('webkitAnimationStart', function(e) {
    var controller = t.viewControllers[t.viewControllers.length - 1];
    if (e.animationName === "navigation-push") {
      if (controller.viewWillAppear) controller.viewWillAppear(true);
    } else if (e.animationName === "navigation-pop") {
      if (controller.viewWillDisappear) controller.viewWillDisappear(true);
    }
    e.stopPropagation();
  }, false);
  this.container.addEventListener('webkitAnimationEnd', function(e) {
    var controller;
    if (e.animationName === "navigation-push") {
      controller = t.viewControllers[t.viewControllers.length - 1];
      this.classList.remove('push');
      if (controller.viewDidAppear) controller.viewDidAppear(true);
    } else if (e.animationName === "navigation-pop") {
      controller = t.viewControllers.pop();
      this.removeChild(controller.view);
      this.classList.remove('pop');
      controller.navigationController = null;
      if (controller.viewDidDisappear) controller.viewDidDisappear(true);
    }
    e.stopPropagation();
  }, false);
}
NavigationController.prototype = new AbstractViewController();
NavigationController.prototype.pushViewController = pushViewController;
NavigationController.prototype.popViewController = popViewController;

function pushViewController(viewController, animated) {
  this.container.appendChild(viewController.view);
  this.viewControllers.push(viewController);
  viewController.navigationController = this;
  if (animated) {
    this.container.classList.add('push');
  } else {
    if (viewController.viewWillAppear) {
      viewController.viewWillAppear(false);
    }
    if (viewController.viewDidAppear) {
      viewController.viewDidAppear(false);
    }
  }
}

function popViewController(animated) {
  if (this.viewControllers.length > 1) {
    if (animated) {
      this.container.classList.add('pop');
    } else {
      var controller = this.viewControllers.pop();
      if (controller.viewWillDisappear) {
        controller.viewWillDisappear(false);
      }
      this.container.removeChild(controller.view);
      controller.navigationController = null;
      if (controller.viewDidDisappear) {
        controller.viewDidDisappear(false);
      }
    }
  }
}



function Bundle(bundle) {
  this.viewControllers = {};
  var views = bundle.querySelectorAll("section.view:not(.navigation)");
  for (var i = 0; i < views.length; i++) {
    var view = views[i];
    var controller = new ViewController(view);
    var name = view.dataset.name;
    this.viewControllers[name] = controller;
  }
  this.navigationControllers = {};
  var navs = bundle.querySelectorAll("section.view.navigation");
  for (var i = 0; i < navs.length; i++) {
    var nav = navs[i];
    var controller = new NavigationController(nav);
    var name = nav.dataset.name;
    this.navigationControllers[name] = controller;
    this.viewControllers[name] = controller;
  }
}
Bundle.prototype.createNavigationController = function(template) {
  template = template || 'default';
  var controller = this.navigationControllers[template];
  var clone = controller.cloneNode();
  clone.innerHTML = controller.innerHTML;
  return clone;
}
