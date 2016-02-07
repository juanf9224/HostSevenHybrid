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


mainModule.controller('FindPartnerCtrl', function($scope, $state, $http, partnerInfoService, $ionicPopup) {
        // create a message to display in our view
        $scope.userNum = '';
        $scope.jsonData = {};
        $scope.buscarSocio = function(userNum){
          var url = 'http://hostseven.lq3.net:8091/VeoCRM/webservice/call_webservice.asp?VEOCIACRC=6764O1240&USERNAME=uuuu&PASSWORD=pppp&WC=DW2.2ARED.CALL&CALL=GYMPOWER&WS=GETMEMBER&PAR01='+userNum;
                  
          $http.get(url).success(function(data){
            
              jsonData = data;
              console.log(jsonData.responseObject[0].ID);
                partnerInfoService.setData(jsonData.responseObject[0]);
          });


          console.log(partnerInfoService.getData().ID);
          if(partnerInfoService.getData().numeroSocio === userNum){

            $state.go('partner');
          }else{
              var alertPopup = $ionicPopup.alert({
                  title: 'Error',
                  template: 'No existe usuario con ese numero.'
            });
                alertPopup;

            return;

          }
        }

        

    });

    mainModule.controller('PartnerInfoCtrl', function($scope, $state, $ionicPopup) {
        $scope.message = 'Look! I am an about page.';


        $scope.partnerInfo = {'nombre':'prueba', 'id': 800050, 'numeroSocio': 4242};
        $scope.days = [{'dia':'1'}, {'dia':'2'}, {'dia':'3'}];

        var num = null;

        $scope.rutinasDia = function(num){
              var alertPopup = $ionicPopup.alert({
                  title: 'Aviso',
                  template: 'Datos del dia'+ num
                  });

            $state.go('routines');
            
        };

    });

    mainModule.controller('RoutinesCtrl', function($scope, $state) {
        $scope.message = 'Contact us! JK. This is just a demo.';
        $scope.routines = [{'grupo':'hombros', 'ejercicios': 'push ups', 'repeticiones': '12', 'series': '4'},
        {'grupo':'hombros', 'ejercicios': 'push ups', 'repeticiones': '12', 'series': '4'},
        {'grupo':'hombros', 'ejercicios': 'push ups', 'repeticiones': '12', 'series': '4'},
        {'grupo':'hombros', 'ejercicios': 'push ups', 'repeticiones': '12', 'series': '4'}]
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

     mainModule.service('routinesInfoService', function(){
      return {
        data: [{'grupo':'hombros', 'ejercicios': 'push ups', 'repeticiones': '12', 'series': '4'},
        {'grupo':'hombros', 'ejercicios': 'push ups', 'repeticiones': '12', 'series': '4'},
        {'grupo':'hombros', 'ejercicios': 'push ups', 'repeticiones': '12', 'series': '4'},
        {'grupo':'hombros', 'ejercicios': 'push ups', 'repeticiones': '12', 'series': '4'}],
      getData: function(){
        return this.data;
      },
      setData: function(data){
        return this.data = data;
      }}
    })