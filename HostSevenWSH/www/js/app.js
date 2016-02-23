// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var mainModule = angular.module('hostSeven', ['ionic']);
var serviceCall = "http://hostseven.lq3.net:8091/VeoCRM/webservice/call_webservice.asp?VEOCIACRC=6764O1240&USERNAME=uuuu&PASSWORD=pppp&WC=DW2.2ARED.CALL&CALL=";


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
          var url = serviceCall + 'GYMPOWER&WS=GETMEMBER&PAR01='+userNum;
                  
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
          })
           .catch(function (e){
            var alertPopup = $ionicPopup.alert({
                  title: 'Error',
                  template: 'Error en la peticion.'+e.toString()
            });
                alertPopup;
           });
        }

    });

    mainModule.controller('PartnerInfoCtrl', function($scope, $http, $state, $ionicPopup, $timeout, partnerInfoService, routineDaysService, retreivedDaysService, routinesInfoService) {
        $scope.message = 'Look! I am an about page.';


        $scope.partnerInfo = partnerInfoService.getData().responseObject[0];
        
        $scope.days = {};
        $scope.partnerInfo = partnerInfoService.getData().responseObject[0];
        var url = serviceCall + 'GYMPOWER&WS=GETRUTINADAY&PAR01='+$scope.partnerInfo.ID ;
        $http.get(url).success(function(data){
              
              jsonData = data;
              console.log(jsonData.responseObject);
              routineDaysService.setData(jsonData.responseObject);
              for(var i=0; i<routineDaysService.getData().length; i++){
                $scope.days = routineDaysService.getData(); 
                retreivedDaysService.setData($scope.days);
                 
                
                console.log('variable days: '+ $scope.days[i].DIA +'array de dias en retreivedDaysService: '+retreivedDaysService.getData()[i].DIA);              
              }
              
          })
        .catch(function (e){
            var alertPopup = $ionicPopup.alert({
                  title: 'Error',
                  template: 'Error en la peticion.'+e.toString()
            });
                alertPopup;
           });;

          $timeout(function(){
     $scope.retreivedDays = retreivedDaysService.getData();
          console.log('Dia: '+$scope.retreivedDays[0].DIA);
  }, 2000);
         

        $scope.rutinasDia = function(num){
          var url=serviceCall + 'GYMPOWER&WS=GETRUTINA&PAR01='+$scope.partnerInfo.ID +'&PAR02='+num;
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
              
          })
    .catch(function (e){
            var alertPopup = $ionicPopup.alert({
                  title: 'Error',
                  template: 'Error en la peticion.'+e.toString()
            });
                alertPopup;
           });;

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