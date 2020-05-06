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

  */

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