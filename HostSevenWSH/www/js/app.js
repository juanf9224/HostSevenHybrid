// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var mainModule = angular.module('HostSeven', ['ionic', 'FindPArtnerCtrl', 'PartnerInfoCtrl', 'RoutinesCtrl', 'ngRoute']);

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
  .state('intro', {
    url: '/', 
    //If in a folder, template/welcome.html    
    templateUrl: 'templates/find-partner.html',
      controller: 'FindPArtnerCtrl'
  })
  
    .state('partner-info', { 
      url: '/templates/partner-info', 
      //If in a folder, template/login.html
      templateUrl: 'templates/partner-info.html',
      controller: 'PartnerInfoCtrl'
    })

    .state('routines', { 
      url: '/templates/routines', 
      //If in a folder, template/login.html
      templateUrl: 'template/routines.html',
      controller: 'RoutinesCtrl'
    })
 

  $urlRouterProvider.otherwise("/");
})


scotchApp.controller('FindPArtnerCtrl', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    scotchApp.controller('PartnerInfoCtrl', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    scotchApp.controller('RoutinesCtrl', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });