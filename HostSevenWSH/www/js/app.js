// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var mainModule = angular.module('hostSeven', ['ionic']);

mainModule.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

mainModule.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('index', {
    url: '/index', 
    //If in a folder, templates/welcome.html    
    templateUrl: 'templates/find-partner.html'
  })
  
    .state('partner', { 
      url: '/partner-info', 
      //If in a folder, template/login.html
      templateUrl: 'templates/partner-info.html'
    })

    .state('routines', { 
      url: '/routines', 
      //If in a folder, template/login.html
      templateUrl: 'templates/routines.html'
    })
 

  $urlRouterProvider.otherwise("/index");
})


mainModule.controller('FindPartnerCtrl', function($scope, $state, $http, $timeout, partnerInfoService, $ionicPopup) {
        // create a message to display in our view
        $scope.userNum = '';
        $scope.jsonData = {};
        $scope.buscarSocio = function(userNum){
          var url = 'http://hostseven.lq3.net:8091/VeoCRM/webservice/call_webservice.asp?VEOCIACRC=6764O1240&USERNAME=uuuu&PASSWORD=pppp&WC=DW2.2ARED.CALL&CALL=GYMPOWER&WS=GETMEMBER&PAR01='+userNum;
                  
           $http.get(url).success(function(data){
            
              jsonData = data;
                partnerInfoService.setData(jsonData);
                if(partnerInfoService.getData().success == false){
                  var alertPopup = $ionicPopup.alert({
                  title: 'Error',
                  template: 'No existe usuario con ese numero.'
            });
                alertPopup;

            return;
          }else if(partnerInfoService.getData().responseObject[0].NumeroSocio == userNum){

            $state.go('partner');
          }else{
              var alertPopup = $ionicPopup.alert({
                  title: 'Error',
                  template: 'No existe usuario con ese numero.'
            });
                alertPopup;

            return;

          }
          });
        }

    });

    mainModule.controller('PartnerInfoCtrl', function($scope, $http, $state, $ionicPopup, $timeout, partnerInfoService, routineDaysService, retreivedDaysService, routinesInfoService) {
        $scope.message = 'Look! I am an about page.';


        $scope.partnerInfo = partnerInfoService.getData().responseObject[0];
        
        $scope.days = {};
        $scope.partnerInfo = partnerInfoService.getData().responseObject[0];
        var url = 'http://hostseven.lq3.net:8091/VeoCRM/webservice/call_webservice.asp?VEOCIACRC=6764O1240&USERNAME=uuuu&PASSWORD=pppp&WC=DW2.2ARED.CALL&CALL=GYMPOWER&WS=GETRUTINADAY&PAR01='+$scope.partnerInfo.ID ;
        $http.get(url).success(function(data){
              
              jsonData = data;
              console.log(jsonData.responseObject);
              routineDaysService.setData(jsonData.responseObject);
              for(var i=0; i<routineDaysService.getData().length; i++){
                $scope.days = routineDaysService.getData(); 
                retreivedDaysService.setData($scope.days);
                 
                
                console.log('variable days: '+ $scope.days[i].DIA +'array de dias en retreivedDaysService: '+retreivedDaysService.getData()[i].DIA);              
              }
              
          });

          $timeout(function(){
     $scope.retreivedDays = retreivedDaysService.getData();
          console.log('Dia: '+$scope.retreivedDays[0].DIA);
  }, 2000);
         

        $scope.rutinasDia = function(num){
          var url='http://hostseven.lq3.net:8091/VeoCRM/webservice/call_webservice.asp?VEOCIACRC=6764O1240&USERNAME=uuuu&PASSWORD=pppp&WC=DW2.2ARED.CALL&CALL=GYMPOWER&WS=GETRUTINA&PAR01='+$scope.partnerInfo.ID +'&PAR02='+num;
          console.log(url);
          routinesInfoService.setData(url);
              $state.go('routines');
            
        };

    });

    mainModule.controller('RoutinesCtrl', function($scope, $state, $http, partnerInfoService, routinesInfoService, $timeout, routineService) {


        $scope.partnerInfo = partnerInfoService.getData().responseObject[0];
        $scope.routines = {};

        var url = routinesInfoService.getData();
        console.log(url);
    
    $http.get(url).success(function(data){
              
              jsonData = data;
              console.log(jsonData.responseObject);
              routineService.setData(jsonData.responseObject);
              for(var i=0; i<routineService.getData().length; i++){
                $scope.routines = routineService.getData(); 
                
                console.log('routine: '+ $scope.routines);              
              }
              
          });

          $timeout(function(){
          console.log('rutina: '+$scope.routines[0].Grupo);
  }, 2000);
    });



    mainModule.service('partnerInfoService', function(){
      return {
        data: {},
      getData: function(){
        return this.data;
      },
      setData: function(data){
        return this.data = data;
      }}
    })

    mainModule.service('routineDaysService', function(){
      return {
        data: {},
      getData: function(){
        return this.data;
      },
      setData: function(data){
        return this.data = data;
      }}
    })

    mainModule.service('retreivedDaysService', function(){
      return {
        data: {},
        getData: function(){
          return this.data;
        },
        setData: function(data){
          return this.data = data;
        }
      }
    })

     mainModule.service('routinesInfoService', function(){
      return {
        data: {},
      getData: function(){
        return this.data;
      },
      setData: function(data){
        return this.data = data;
      }}
    })

     mainModule.service('routineService', function(){
      return { 
        data:{},
        getData: function(){
          return this.data;
        },
        setData: function(data){
          return this.data = data;
        }
    }
     })