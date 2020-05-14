/*
(function () {
    'use strict';
    
    angular.module('ShoppingListPromiseApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .service('ShoppingListService', ShoppingListService)
    .service('WeightLossFilterService', WeightLossFilterService);
    
    ShoppingListController.$inject = ['ShoppingListService'];
    function ShoppingListController(ShoppingListService) {
      var list = this;
    
      list.items = ShoppingListService.getItems();
    
      list.itemName = "";
      list.itemQuantity = "";
      list.message='';
    
      list.addItem = function () {
        ShoppingListService.addItem(list.itemName, list.itemQuantity);
      };
    
      list.removeItem = function (itemIndex) {
        ShoppingListService.removeItem(itemIndex);
      };
    }
    
    
    ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
    function ShoppingListService($q, WeightLossFilterService) {
      var service = this;
    
      // List of shopping items
      var items = [];
    
      //1st Method
      // service.addItem = function (name, quantity) {
      //   var promise = WeightLossFilterService.checkName(name);
      //
      //   promise.then(function (response) {
      //     var nextPromise = WeightLossFilterService.checkQuantity(quantity);
      //
      //     nextPromise.then(function (result) {
      //       var item = {
      //         name: name,
      //         quantity: quantity
      //       };
      //       items.push(item);
      //     }, function (errorResponse) {
      //       console.log(errorResponse.message);
      //     });
      //   }, function (errorResponse) {
      //     console.log(errorResponse.message);
      //   });
      // };
    
    // 2nd Method
      // service.addItem = function (name, quantity) {
      //   var promise = WeightLossFilterService.checkName(name);
      //
      //   promise
      //   .then(function (response) {
      //     return WeightLossFilterService.checkQuantity(quantity);
      //   })
      //   .then(function (response) {
      //     var item = {
      //       name: name,
      //       quantity: quantity
      //     };
      //     items.push(item);
      //   })
      //   .catch(function (errorResponse) {
      //     console.log(errorResponse.message);
      //   });
      // };
    
    // 3rd method is best
      service.addItem = function (name, quantity) {
        var namePromise = WeightLossFilterService.checkName(name);
        var quantityPromise = WeightLossFilterService.checkQuantity(quantity);
    
        $q.all([namePromise, quantityPromise]).
        then(function (response) {
          var item = {
            name: name,
            quantity: quantity
          };
          items.push(item);
        })
        .catch(function (errorResponse) {
          console.log( errorResponse.message);
          return errorResponse.message;
        });
      };
    
      service.removeItem = function (itemIndex) {
        items.splice(itemIndex, 1);
      };
    
      service.getItems = function () {
        return items;
      };
    }
    
    
    WeightLossFilterService.$inject = ['$q', '$timeout'];
    function WeightLossFilterService($q, $timeout) {
      var service = this;
    
      service.checkName = function (name) {
        var deferred = $q.defer();
    
        var result = {
          message: ""
        };
    
        $timeout(function () {
          // Check for cookies
          if (name.toLowerCase().indexOf('cookie') === -1) {
            deferred.resolve(result)
          }
          else {
            result.message = "Stay away from cookies, Paras!";
            deferred.reject(result);
          }
        }, 2000);
    
        return deferred.promise;
      };
    
    
      service.checkQuantity = function (quantity) {
        var deferred = $q.defer();
        var result = {
          message: ""
        };
    
        $timeout(function () {
          // Check for too many boxes
          if (quantity < 6) {
            deferred.resolve(result);
          }
          else {
            result.message = "That's too much, Paras!";
            deferred.reject(result);
          }
        }, 1000);
    
        return deferred.promise;
      };
    }
    
    })();
*/


(function () {
  'use strict';

  angular.module('MenuCategoriesApp', [])
    .controller('MenuCategoriesController', MenuCategoriesController)
    .service('MenuCategoriesService', MenuCategoriesService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


  MenuCategoriesController.$inject = ['MenuCategoriesService'];
  function MenuCategoriesController(MenuCategoriesService) {
    var menu = this;

    var promise = MenuCategoriesService.getMenuCategories();

    promise.then(function (response) {
      menu.categories = response.data;
      console.log(menu.categories);
    })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });

    menu.logMenuItems = function (shortName) {
      var promise = MenuCategoriesService.getMenuForCategory(shortName);

      promise.then(function (response) {
        console.log(response.data);
      })
        .catch(function (error) {
          console.log(error);
        })
    };

  }


  MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
  function MenuCategoriesService($http, ApiBasePath) {
    var service = this;

    service.getMenuCategories = function () {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      });

      return response;
    };


    service.getMenuForCategory = function (shortName) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {
          category: shortName
        }
      });
      console.log(response);
      return response;
    };

  }

})();

/*

(function () {
'use strict';

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('listItemDescription', ListItemDescription)
.directive('listItem', ListItem);

function ListItem() {
var ddo = {
  restrict: 'E',
  templateUrl: ' listItem.html',
  scope: {
    list: '=myList',
    title: '@title'
  }
};
return ddo;
}

function ListItemDescription() {
var ddo = {  //ddo refers to Directive Definition Object
  template: '{{item.quantity}} of {{item.name}}'
};
return ddo;
}






// LIST #1 - controller
ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {
var list = this;

// Use factory to create new shopping list service
var shoppingList = ShoppingListFactory();

list.items = shoppingList.getItems();
var origTitle = "Shopping List #1";
list.title = origTitle + " (" + list.items.length + " items )";

list.itemName = "";
list.itemQuantity = "";

list.addItem = function () {
  shoppingList.addItem(list.itemName, list.itemQuantity);
  list.title = origTitle + " (" + list.items.length + " items )";
};

list.removeItem = function (itemIndex) {
  shoppingList.removeItem(itemIndex);
  list.title = origTitle + " (" + list.items.length + " items )";
};
}


// LIST #2 - controller
ShoppingListController2.$inject = ['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory) {
var list = this;

// Use factory to create new shopping list service
var shoppingList = ShoppingListFactory(3);

list.items = shoppingList.getItems();

list.itemName = "";
list.itemQuantity = "";

list.addItem = function () {
  try {
    shoppingList.addItem(list.itemName, list.itemQuantity);
  } catch (error) {
    list.errorMessage = error.message;
  }

};

list.removeItem = function (itemIndex) {
  shoppingList.removeItem(itemIndex);
};
}


// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
var service = this;

// List of shopping items
var items = [];

service.addItem = function (itemName, quantity) {
  if ((maxItems === undefined) ||
    (maxItems !== undefined) && (items.length < maxItems)) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  }
  else {
    throw new Error("Max items (" + maxItems + ") reached.");
  }
};

service.removeItem = function (itemIndex) {
  items.splice(itemIndex, 1);
};

service.getItems = function () {
  return items;
};
}


function ShoppingListFactory() {
var factory = function (maxItems) {
  return new ShoppingListService(maxItems);
};

return factory;
}

})();

*/
/*

(function () {
'use strict';
 
angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
.directive('shoppingList', ShoppingListDirective);
 
function ShoppingListDirective(){
  var ddo={
    templateUrl:'shoppingList.html',
    scope : {
      items:'<',
      title:'@'
    },
    controller: 'ShoppingListDirectiveController',
    controllerAs: 'list',
    bindToController : true
  };
  return ddo;

}
 
 
function ShoppingListDirectiveController() {
  var list = this;
 
  list.cookiesInList = function () {
    for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }
 
    return false;
  };
}
 
 
ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
  var list = this;
 
  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();
 
  list.items = shoppingList.getItems();
  var origTitle = "Shopping List #1";
  list.title = origTitle + " (" + list.items.length + " items )";
 
  list.itemName = "";
  list.itemQuantity = "";
 
  list.addItem = function () {
    shoppingList.addItem(list.itemName, list.itemQuantity);
    list.title = origTitle + " (" + list.items.length + " items )";
  };
 
  list.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
    list.title = origTitle + " (" + list.items.length + " items )";
  };
}
 
 
// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;
 
  // List of shopping items
  var items = [];
 
  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };
 
  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };
 
  service.getItems = function () {
    return items;
  };
}
 
 
function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };
 
  return factory;
}
 
})();
*/

/*
(function () {
  'use strict';
  
  angular.module('ShoppingListDirectiveApp', [])
  .controller('ShoppingListController', ShoppingListController)
  .factory('ShoppingListFactory', ShoppingListFactory)
  .directive('shoppingList', ShoppingListDirective);
  
  
  function ShoppingListDirective() {
    var ddo = {
      templateUrl: 'shoppingList1.html',
      scope: {
        items: '<',
        myTitle: '@title',
        badRemove: '=',
        onRemove: '&'
      },
      controller: ShoppingListDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
  
    return ddo;
  }
  
  
  function ShoppingListDirectiveController() {
    var list = this;
  
    list.cookiesInList = function () {
      for (var i = 0; i < list.items.length; i++) {

        var name = list.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          return true;
        }
      }
  
      return false;
    };
  }
  
  
  ShoppingListController.$inject = ['ShoppingListFactory'];
  function ShoppingListController(ShoppingListFactory) {
    var list = this;
  
    // Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory();
  
    list.items = shoppingList.getItems();
    var origTitle = "Shopping List #1";
    list.title = origTitle + " (" + list.items.length + " items )";
  
    list.itemName = "";
    list.itemQuantity = "";
  
    list.addItem = function () {
      shoppingList.addItem(list.itemName, list.itemQuantity);
      list.title = origTitle + " (" + list.items.length + " items )";
    };
  
    list.removeItem = function (itemIndex) {
      console.log("'this' is: ", this);
      this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
      shoppingList.removeItem(itemIndex);
      this.title = origTitle + " (" + list.items.length + " items )";
    };
  }
  
  
  // If not specified, maxItems assumed unlimited
  function ShoppingListService(maxItems) {
    var service = this;
  
    // List of shopping items
    var items = [];
  
    service.addItem = function (itemName, quantity) {
      if ((maxItems === undefined) ||
          (maxItems !== undefined) && (items.length < maxItems)) {
        var item = {
          name: itemName,
          quantity: quantity
        };
        items.push(item);
      }
      else {
        throw new Error("Max items (" + maxItems + ") reached.");
      }
    };
  
    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };
  
    service.getItems = function () {
      return items;
    };
  }
  
  
  function ShoppingListFactory() {
    var factory = function (maxItems) {
      return new ShoppingListService(maxItems);
    };
  
    return factory;
  }
  
  })();

  */

(function () {
  'use strict';

  angular.module('ShoppingListDirectiveApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .directive('shoppingList', ShoppingListDirective);


  function ShoppingListDirective() {
    var ddo = {
      templateUrl: 'shoppingList.html',
      scope: {
        items: '<',
        myTitle: '@title',
        onRemove: '&'
      },
      controller: ShoppingListDirectiveController,
      controllerAs: 'list',
      bindToController: true,
      link: ShoppingListDirectiveLink
    };

    return ddo;
  }


  function ShoppingListDirectiveLink(scope, element, attrs, controller) {
    console.log("Link scope is: ", scope);
    console.log("Controller instance is: ", controller);
    console.log("Element is: ", element);

    scope.$watch('list.cookiesInList()', function (newValue, oldValue) {
      console.log("Old value: ", oldValue);
      console.log("New value: ", newValue);

      if (newValue === true) {
        displayCookieWarning();
      }
      else {
        removeCookieWarning();
      }

    });

    function displayCookieWarning() {
      // Using Angluar jqLite
      // var warningElem = element.find("div");
      // console.log(warningElem);
      // warningElem.css('display', 'block');

      // If jQuery included before Angluar
      var warningElem = element.find("div.error");
      warningElem.slideDown(900);
    }


    function removeCookieWarning() {
      // Using Angluar jqLite
      // var warningElem = element.find("div");
      // warningElem.css('display', 'none');

      // If jQuery included before Angluar
      var warningElem = element.find("div.error");
      warningElem.slideUp(900);
    }
  }


  function ShoppingListDirectiveController() {
    var list = this;

    list.cookiesInList = function () {
      for (var i = 0; i < list.items.length; i++) {
        var name = list.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          return true;
        }
      }

      return false;
    };
  }


  ShoppingListController.$inject = ['ShoppingListFactory'];
  function ShoppingListController(ShoppingListFactory) {
    var viewList = this;

    // Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory();

    viewList.items = shoppingList.getItems();
    var origTitle = "Shopping List #1";
    viewList.title = origTitle + " (" + viewList.items.length + " items )";

    viewList.itemName = "";
    viewList.itemQuantity = "";

    viewList.addItem = function () {
      shoppingList.addItem(viewList.itemName, viewList.itemQuantity);
      viewList.title = origTitle + " (" + viewList.items.length + " items )";
    };

    viewList.removeItem = function (itemIndex) {
      console.log("'this' is: ", this);
      this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
      shoppingList.removeItem(itemIndex);
      this.title = origTitle + " (" + viewList.items.length + " items )";
    };
  }


  // If not specified, maxItems assumed unlimited
  function ShoppingListService(maxItems) {
    var service = this;

    // List of shopping items
    var items = [];

    service.addItem = function (itemName, quantity) {
      if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
        var item = {
          name: itemName,
          quantity: quantity
        };
        items.push(item);
      }
      else {
        throw new Error("Max items (" + maxItems + ") reached.");
      }
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };

    service.getItems = function () {
      return items;
    };
  }


  function ShoppingListFactory() {
    var factory = function (maxItems) {
      return new ShoppingListService(maxItems);
    };

    return factory;
  }

})();
