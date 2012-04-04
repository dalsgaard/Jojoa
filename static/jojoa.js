
function PageController(page) {
  this.page = page;
  this.viewControllers = [];
}

PageController.prototype.presentViewController = presentViewController;
PageController.prototype.dismissViewController = dismissViewController;

function presentViewController(viewController) {
  viewController.view.classList.add('modal');
  viewController.view.classList.add('appear');
  this.page.appendChild(viewController.view);
  this.viewControllers.push(viewController);
  viewController.pageController = this;
}

function dismissViewController() {
  var viewController = this.viewControllers.pop();
  viewController.view.classList.remove('appear');
  viewController.view.classList.add('disappear');
  window.setTimeout(function() {
    this.page.removeChild(viewController.view);
    viewController.view.classList.remove('disappear');
    viewController.view.classList.remove('modal');
    viewController.pageController = null;
  }, 1000);
}


function ViewController(view) {
  this.view = view;
  this.pageController = null;
}

function Bundle(bundle) {
  this.viewControllers = {};
  var views = bundle.querySelectorAll("section.view");
  for (var i = 0; i < views.length; i++) {
    var view = views[i];
    var controller = new ViewController(view);
    var name = view.getAttribute('data-name');
    this.viewControllers[name] = controller;
  }
}
