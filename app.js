/*
(function(){
  'use strict';

  angular.module('MyFirstApp' , [])

  .controller('MyFirstController' , function($scope){
    $scope.name='Paras';
    $scope.sayhello=function(){
      return 'Hello '
    };

  });

})();
*/

// Name Calculator

/* (function () {
  'use strict';
  
  angular.module('NameCalculator', [])
  
  .controller('NameCalculatorController', function ($scope) {
    $scope.name = "";
    $scope.totalValue = 0;
  
    $scope.displayNumeric = function () {
      var totalNameValue = calculateNumericForString($scope.name);
      $scope.totalValue = totalNameValue;
    };
  
  
    function calculateNumericForString(string) {
      var totalStringValue = 0;
      for (var i = 0; i < string.length; i++) {
        totalStringValue += string.charCodeAt(i);
      }
  
      return totalStringValue;
    }
  
  });
  
  
  })(); */
  //

  /*
  (function(){
    'use strict';
    angular.module('DiApp' , [])

    .controller('DiController' , DiController);

    function DiController($scope , $filter){
      $scope.name='Paras';
      $scope.stateOfBeing='hungry';
      $scope.cookie= .45;

      $scope.upper=function(){
        var upCase =  $filter('uppercase');
        $scope.name=upCase($scope.name);
      }
      $scope.feedParas=function(){
        $scope.stateOfBeing='feed';
        $scope.name="I am Full!"
      };
    };

    //Custom filter

    
   
  })();
  
 (function () {
  'use strict';
  
  angular.module('MsgApp', [])
  .controller('MsgController', MsgController)
  .filter('loves', LovesFilter)
  .filter('truth', TruthFilter);
  
  MsgController.$inject = ['$scope', 'lovesFilter'];
  function MsgController($scope, lovesFilter) {
    $scope.stateOfBeing = "hungry";
  
    $scope.sayMessage = function () {
      var msg = "Yaakov likes to eat healthy snacks at night!";
      return msg;
    };
  
    $scope.sayLovesMessage = function () {
      var msg = "Yaakov likes to eat healthy snacks at night!";
      msg = lovesFilter(msg)
      return msg;
    };
  
    $scope.feedYaakov = function () {
      $scope.stateOfBeing = "feed";
    };
  }
  
  function LovesFilter() {
    return function (input) {
      input = input || "";
      input = input.replace("likes", "loves");
      return input;
    };
  }
  
  function TruthFilter(){
    return function(input , target , replace){
      input = input || "";
      input = input.replace(target, replace);
      return input;
    }
  }
  
  })();

 

 (function () {
  'use strict';
  
  angular.module('CounterApp', [])
  .controller('CounterController', CounterController);

  CounterController.$inject = ['$scope'];

  function CounterController($scope) {
    $scope.counter = 0;
  
    $scope.upCounter = function () {
      $scope.counter++;
    };
  }
 })();
  


  (function(){
    'user strict';

    angular.module('BindingApp' , [])

    .controller('BindingController' , BindingController);

    BindingController.inject = ['$scope'];

    function BindingController($scope){
      $scope.firstName= 'Paras';

      $scope.setFullName=function(){
        $scope.fullName= $scope.firstName + ' ' + ' Gogia ';

      }

      $scope.logFirstName = function () {
        console.log("First name is: ", $scope.firstName);
      };
    
      $scope.logFullName = function () {
        console.log("Full name is: ", $scope.fullName);
      };

    };

  })();

  

  (function(){
    'user strict';

    angular.module('ShoppingListApp' , [])

    .controller('ShoppingListController' , ShoppingListController);

    ShoppingListController.inject = ['$scope'];

    var shoppingList1 = [
      "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter", "Pepto Bismol", "Pepto Bismol (Chocolate flavor)", "Pepto Bismol (Cookie flavor)"
    ];

    var shoppingList2 = [
      {
        name: "Milk",
        quantity: "2"
      },
      {
        name: "Donuts",
        quantity: "200"
      },
      {
        name: "Cookies",
        quantity: "300"
      },
      {
        name: "Chocolate",
        quantity: "5"
      }
    ];

    function ShoppingListController($scope){
      $scope.shoppingList1= shoppingList1;
      $scope.shoppingList2= shoppingList2;

      $scope.addToList = function () {
        var newItem = {
          name: $scope.newItemName,
          quantity: $scope.newItemQuantity
        };
    
        $scope.shoppingList2.push(newItem);
      };

    }


    
    
  })();


 (function(){
  'user strict';

  angular.module('LunchCheck' , [])
  

  .controller('LunchBox' , LunchCheckController);
  LunchCheckController.inject=['$scope'];
  
  function LunchCheckController($scope){
    $scope.name='';
    $scope.message='';
    $scope.LuchCheckBox= function(){
      

      var str= $scope.name;
      var string = str.split('');
      console.log(string.length);
      console.log(string);
      if(string.length>3){
        
        $scope.message='Too much!';
      }
      if(string.length<=3 & string.length>0){
        $scope.message='Enjoy!';
      }
      if(string.length==0 | str ==','){
        $scope.message='Please enter data first';
        
      }
      else{
        return '';
      }


    };

  };
    



})();



(function(){
  'user strict';

  angular.module('ControllerAsApp' , [])

  .controller('ParentController1' , ParentController1)
  .controller('ChildController1' , ChildController1)
  .controller('ParentController2' , ParentController2)
  .controller('ChildController2' , ChildController2);

  ParentController1.inject=['$scope'];

  function ParentController1($scope){
    $scope.parentValue = 1;
    $scope.pc = this;
    $scope.pc.parentValue = 1;

  }
  ChildController1.$inject = ['$scope'];
function ChildController1($scope) {

   console.log("$scope.parentValue: ", $scope.parentValue);
   console.log("CHILD $scope: ", $scope);
  //
  // $scope.parentValue = 5;
  // console.log("*** CHANGED: $scope.parentValue = 5 ***");
  // console.log("$scope.parentValue: ", $scope.parentValue);
  // console.log($scope);
  //
  // console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
  // $scope.pc.parentValue = 5;
  // console.log("** CHANGED: $scope.pc.parentValue = 5; ***");
  // console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
  // console.log("$scope: ", $scope);
  //
  // console.log("$scope.$parent.parentValue: ", $scope.$parent.parentValue);
}

// ** Controller As syntax
function ParentController2() {
  var parent = this;
  parent.value = 1;
}
ChildController2.$inject = ['$scope'];
function ChildController2($scope) {
  var child = this;
  child.value = 5;
  console.log("ChildController2 $scope: ", $scope);
}



})();



(function () {
  'use strict';
  
  angular.module('ShoppingListApp', [])
  .controller('ShoppingListAddController', ShoppingListAddController)
  .controller('ShoppingListShowController', ShoppingListShowController)
  .service('ShoppingListService', ShoppingListService);
  
  ShoppingListAddController.$inject = ['ShoppingListService'];
  function ShoppingListAddController(ShoppingListService) {
    var itemAdder = this;
  
    itemAdder.itemName = "";
    itemAdder.itemQuantity = "";
  
    itemAdder.addItem = function () {
      ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
    }
  }
  
  
  ShoppingListShowController.$inject = ['ShoppingListService'];
  function ShoppingListShowController(ShoppingListService) {
    var showList = this;
  
    showList.items = ShoppingListService.getItems();
  
    showList.removeItem = function (itemIndex) {
      ShoppingListService.removeItem(itemIndex);
    };
  }
  
  
  function ShoppingListService() {
    var service = this;
  
    // List of shopping items
    var items = [];
  
    service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    };
  
    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };
  
    service.getItems = function () {
      return items;
    };
  }
  
  })();

  

 (function () {
  'use strict';
  
  angular.module('ControllerAsApp', [])
  .controller('ShoppingListController1', ShoppingListController1)
  .controller('ShoppingListController2', ShoppingListController2)
  .factory('ShoppingListFactory', ShoppingListFactory);
  
  // LIST #1 - controller
  ShoppingListController1.$inject = ['ShoppingListFactory'];
  function ShoppingListController1(ShoppingListFactory) {
    var list1 = this;
  
    // Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory();
  
    list1.items = shoppingList.getItems();
  
    list1.itemName = "";
    list1.itemQuantity = "";
  
    list1.addItem = function () {
      shoppingList.addItem(list1.itemName, list1.itemQuantity);
    }
  
    list1.removeItem = function (itemIndex) {
      shoppingList.removeItem(itemIndex);
    };
  }
  
  
  // LIST #2 - controller
  ShoppingListController2.$inject = ['ShoppingListFactory'];
  function ShoppingListController2(ShoppingListFactory) {
    var list2 = this;
  
    // Use factory to create new shopping list service
    var shoppingList = ShoppingListFactory(3);
  
    list2.items = shoppingList.getItems();
  
    list2.itemName = "";
    list2.itemQuantity = "";
  
    list2.addItem = function () {
      try {
        shoppingList.addItem(list2.itemName, list2.itemQuantity);
      } catch (error) {
        list2.errorMessage = error.message;
      }
  
    }
  
    list2.removeItem = function (itemIndex) {
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

  