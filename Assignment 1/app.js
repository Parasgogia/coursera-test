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