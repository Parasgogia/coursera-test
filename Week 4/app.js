(function () {
    'use strict';
  
    angular.module('ShoppingListComponentApp', [])
      .controller('ShoppingListController', ShoppingListController)
      .factory('ShoppingListFactory', ShoppingListFactory)
      .component('shoppingList', {
        templateUrl: 'shoppingList.html',
        controller:   ShoppingListComponentController,
        bindings : {
          items: '<',
          myTitle: '@title',
          onRemove: '&'
        }
      });
  
  
    // function ShoppingListDirective() {
    //   var ddo = {
    //     templateUrl: 'shoppingList.html',
    //     scope: {
    //       items: '<',
    //       myTitle: '@title',
    //       onRemove: '&'
    //     },
    //     controller: ShoppingListDirectiveController,
    //     controllerAs: 'list',
    //     bindToController: true,
    //     link: ShoppingListDirectiveLink
    //   };
  
    //   return ddo;
    // }
  
  
    // function ShoppingListDirectiveLink(scope, element, attrs, controller) {
    //   console.log("Link scope is: ", scope);
    //   console.log("Controller instance is: ", controller);
    //   console.log("Element is: ", element);
  
    //   scope.$watch('list.cookiesInList()', function (newValue, oldValue) {
    //     console.log("Old value: ", oldValue);
    //     console.log("New value: ", newValue);
  
    //     if (newValue === true) {
    //       displayCookieWarning();
    //     }
    //     else {
    //       removeCookieWarning();
    //     }
  
    //   });
  
    //   function displayCookieWarning() {
    //     // Using Angluar jqLite
    //     // var warningElem = element.find("div");
    //     // console.log(warningElem);
    //     // warningElem.css('display', 'block');
  
    //     // If jQuery included before Angluar
    //     var warningElem = element.find("div.error");
    //     warningElem.slideDown(900);
    //   }
  
  
    //   function removeCookieWarning() {
    //     // Using Angluar jqLite
    //     // var warningElem = element.find("div");
    //     // warningElem.css('display', 'none');
  
    //     // If jQuery included before Angluar
    //     var warningElem = element.find("div.error");
    //     warningElem.slideUp(900);
    //   }
    // }
  
  
    function ShoppingListComponentController() {
      var $ctrl = this;
  
      $ctrl.cookiesInList = function () {
        for (var i = 0; i < $ctrl.items.length; i++) {
          var name = $ctrl.items[i].name;
          if (name.toLowerCase().indexOf("cookie") !== -1) {
            return true;
          }
        }
  
        return false;
      };
      $ctrl.remove=function(myIndex){
          $ctrl.onRemove({index:myIndex});
      }

      $ctrl.$onInit = function(){
          console.log('We are $onInit');
      }

      $ctrl.$onChanges = function(changeObj){
          console.log(changeObj);
      }
      $ctrl.$doCheck = function () {
        if ($ctrl.items.length !== totalItems) {
          console.log("# of items changed. Checking for Cookies!");
          totalItems = $ctrl.items.length;
          if ($ctrl.cookiesInList()) {
            console.log("Oh, NO! COOKIES!!!!!");
            var warningElem = $element.find('div.error');
            warningElem.slideDown(900);
          }
          else {
            console.log("No cookies here. Move right along!");
            var warningElem = $element.find('div.error');
            warningElem.slideUp(900);
          }
        }
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
        this.lastRemoved = "Last item removed was " + this.items[itemIndex].name +' ' +' of ' + ' quantity ' +( this.items[itemIndex].quantity);
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
  