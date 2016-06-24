
//Global variable
window.globalVariable={
  //custom color style variable
  color:{
    appPrimaryColor: ""
  },//end custom color style variable
  startPage:{
    url:"/app/dashboard",
    state:"app.dashboard"
  }
};//End Global variable

angular.module('starter', ['ionic','starter.controllers','ngMaterial'])
// $ionicHistory: get data of before page
.run(function($ionicPlatform,$state,$rootScope,$ionicHistory) {
  //initial $rootScope
  function initialRootScope() {
          $rootScope.appPrimaryColor = appPrimaryColor;// Add value of appPrimaryColor to rootScope for use it to base color.
          $rootScope.isAndroid = ionic.Platform.isAndroid();// Check platform of running device is android or not.
          $rootScope.isIOS = ionic.Platform.isIOS();// Check platform of running device is ios or not.
  }//End initial $rootScope
  // Create custom defaultStyle.
  function getDefaultStyle() {
      return "" +
          ".material-background-nav-bar { " +
          "   background-color        : " + appPrimaryColor + " !important; " +
          "   border-style            : none;" +
          "}" +
          ".md-primary-color {" +
          "   color                     : " + appPrimaryColor + " !important;" +
          "}";
  }// End create custom defaultStyle

  // createCustomStyle will change a style of view while view changing.
  // Parameter :
  // stateName = name of state that going to change for add style of that page.
  function createCustomStyle(stateName){
    var customStyle = 
        ".material-background {"+
        "   background-color        : "+appPrimaryColor + " !important;"+
        "   border-style            : none;"+
        "}"+
        ".spinner-android {"+
        "    stroke                 : "+ appPrimaryColor + " !important;"+
        "}";

    switch (stateName){
      default:
        customStyle += getDefaultStyle();
        break;
    }
    return customStyle;
  }

  //Add custom style while initial application
  $rootScope.customStyle = createCustomStyle(window.globalVariable.startPage.state);
  $ionicPlatform.ready(function() {
    ionic.Platform.isFullScreen =true;
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    initialRootScope();
    $rootScope.$on('$ioncView.beforeEnter',function(){
      //Add custom style for this view
      $rootScope.customStyle = createCustomStyle($ionicHistory.currentStateName());
    });
  });
  //End Add custom style while initial application
  
})

.config(function($ionicConfigProvider,$stateProvider,$urlRouterProvider,$mdThemingProvider,$mdColorPalette){
  //mdThemingProvider use for change theme color of zwilling Application.
    $mdThemingProvider
            .theme('default')
            .primaryPalette('pink')
            .accentPalette('red');

    appPrimaryColor = $mdColorPalette[$mdThemingProvider._THEMES.default.colors.primary.name]["500"];

     $stateProvider
         .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu/html/menu.html",
                controller: 'menuCtrl'
          })

         .state('app.dashboard',{
                url : "/dashboard",
                params:{
                  isAnimated:false
                },
                views:{
                  'menuContent':{
                      templateUrl:"templates/dashboard/html/dashboard.html",
                      controller: 'dashboardCtrl'
                  }
                }
         })



    //Use $urlRouterProvider.otherwise(Url);
    $urlRouterProvider.otherwise(window.globalVariable.startPage.url);
});
