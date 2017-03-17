// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in logincontrollers.js
'use strict';
angular.module('kuwaitlocal', ['ionic', 'ionic.contrib.ui.cards','login.controllers', 'listing.controllers','profile.controllers','klStock.controllers','Events.controllers','global.services', 'ngCordova', 'listing.services','profile.services', 'angular-carousel', 'ui_directives', 'angucomplete-alt', 'angular-md5', 'addBusinessCtrls','addbizservices', 'addbiz_directives', 'classifieds.controllers', 'facebook.controllers', 'facebook.services', 'LocalStorageModule', 'addClassifiedControllers', 'classifieds.services', 'dynform','cordovacommon.services','angular-accordion','youtube-embed'])
.run(function($ionicPlatform, $rootScope, $window, $state, fbAccess, localStorageService, $ionicViewService,$cordovaKeyboard,$cordovaGoogleAnalytics,$cordovaInAppBrowser) {
  //Back button handlers

  $ionicPlatform.ready(function(){

// $scope.deviceInformation = ionic.Platform.device();




 if (typeof analytics !== undefined){

          window.analytics.startTrackerWithId('UA-76235169-1');
          window.analytics.setUserId('USER_ID');
         // analytics.debugMode();
          window.analytics.enableUncaughtExceptionReporting(true, function(){}, function(){});

    }
        else
        {

          console.log("Google Analytics plugin could not be loaded.")
        }

   $ionicPlatform.onHardwareBackButton(function(e){
          if( $state.is('menuView.listingView.categorytabs.search')  ){
              if (confirm('Are you sure you want to Exit?')) {
                  ionic.Platform.exitApp();
                  return false;
              }
          }

      });


  });
    $rootScope.Ads_Array=[];
  $rootScope.myListings_present = false;
  $rootScope.Current_typeName='Recent;'
  $rootScope.kuwaitGovernates_array=[];
    $rootScope.prevState = '';
  $rootScope.detailBack = '';
  $rootScope.ADDLocation_Data={
  coords:{
  latitude: 29.3667,
  longitude : 47.9667,
  }
  };
 $rootScope.ADSlinkopen=function(link){

    // alert(link);

     var options = {
     location: 'yes',
     clearcache: 'yes',
     toolbar: 'yes'
     };
     if(link !=""){

     $cordovaInAppBrowser.open(link, '_blank', options).then(function(event){}).catch(function(event){});
     }
     };
 $ionicPlatform.ready(function() {

  $rootScope.keyboardOpen = false;
  ionic.Platform.isFullScreen = true;
   //Custom loader function, true enables it, disabled by default, use vn-loader directive
    $rootScope.miniLoader = false;
    $rootScope.mapModal = false;

    //Photo upload modal box
    $rootScope.isBackdropActive = false;
    $rootScope.isPlayerModalview =false;
    //module to module bus
    $rootScope.fbPic = null;
    $rootScope.dataHolder = {};
    $rootScope.clearSearch = false;
    $rootScope.cleanupS5 = false;
    $rootScope.$on('parentCleaner', function(){
        $rootScope.$broadcast('cleanup');
    });
    $rootScope.$watch('clearSearch', function(){
        if($rootScope.clearSearch === true){
            $rootScope.$broadcast('clearSearch');
            $rootScope.clearSearch = false;
        }
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
 });
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
       var fSt = fromState.name;
        var tSt = toState.name;

cordova.plugins.Keyboard.close();

if($rootScope.isPlayerModalview){

$rootScope.isPlayerModalview=false;
event.preventDefault();
}

if($rootScope.mapModal){

$rootScope.mapModal=false;
event.preventDefault();
}
        if(tSt === 'menuView.addBusiness.step6' && fSt === 'menuView.addBusiness.step5'){
         }
        if(fSt === 'menuView.addBusiness.step6' && tSt === 'menuView.profile.home'){
          event.preventDefault();
            }

if(fSt === 'menuView.profile.myListings' && tSt === 'menuView.addBusiness.step6' ){

event.preventDefault();
}
if(fSt === 'menuView.profile.myListings' && tSt === 'menuView.addBusiness.step10' ){

event.preventDefault();
}
        if(fromState.name === 'menuView.writeReview' || fromState.name === 'menuView.ratings'){
        }
        else{
            $rootScope.prevState = fromState.name;
        }




        if(fromState.name === 'menuView.listingView.tabs.recent' ||
           fromState.name === 'menuView.listingView.tabs.nearby' ||
           fromState.name === 'menuView.listingView.tabs.ratings' ||
           fromState.name === 'menuView.listingView.categorytabs.search' ||
           fromState.name === 'menuView.listingView.categorytabs.b2b'  &&
           toState.name === 'menuView.detailView'){

            $rootScope.detailBack = fromState.name;
        }



        else{


//     event.preventDefault();


        }
    });
    $rootScope.$watch('dataHolder', function(data){
        if(data.hasOwnProperty('id')){

            $rootScope.$emit('listingClick', data);
        }
    });
    //Can cause crashes, only to be used as little as possible
    $rootScope.restartApp = function(){
        fbAccess.logout();
        localStorageService.remove('kl.fb_session');
        $window.location = "#";
        $window.location.reload(true);
    };
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.$watch(function() {

  if(window.cordova && window.cordova.plugins && window.cordova.plugins.keyboard){

   return $cordovaKeyboard.isVisible();
   }
   else{
   window.addEventListener('native.keyboardshow', function(){
     // document.body.classList.add('keyboard-open');
     $rootScope.keyboardOpen = true;
    });
    window.addEventListener('native.keyboardhide', function(){
         // document.body.classList.add('keyboard-open');
         $rootScope.keyboardOpen = false;
        });

   }
    }, function(value) {
      $rootScope.keyboardOpen = value;
      });
      })

.run(function($ionicPlatform,$cordovaPush,$http,globalVars,$cordovaBadge,$rootScope,$state) {

 var androidConfig = {
    "senderID": "525993721031",
    "icon": "push_icon", // It will search for pin.png in your android drawable folder
    "iconColor": "blue",
    "sound":false


    };

  document.addEventListener("deviceready", function(){
    $cordovaPush.register(androidConfig).then(function(result) {
      // Success

    }, function(err) {
      // Error

    })

    $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {


      switch(notification.event) {
        case 'registered':
          if (notification.regid.length > 0 ) {
          //  alert('registration ID = ' + notification.regid);

            var deviceToken = notification.regid;
              if(deviceToken !=""){
                var Os="Android";
                 //var url =globalVars.siteURL+'AppPushNotifications.php?function=DeviceTokensinsert&Os='+Os+'&tokenID='+deviceToken;
                  var url =globalVars.siteURL+'AppPushNotifications.php?function=DeviceTokensinsert&Os='+Os+'&tokenID='+deviceToken;

                 $http.get(url).then(function(data){});

                 }


          }
          break;

        case 'message':
          // this is the actual push notification. its format depends on the data model from the push server
        //  alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
          //console.log(notification);

           var push_message = notification.message;



      //      var gold_rate = push_message.includes('Gold Rates');

          //  var Exchange_Rates =  push_message.includes('Exchange Rates');

          var gold_rate = push_message.indexOf("Gold Rates") !=-1 ? true : false;

          var Exchange_Rates =  push_message.indexOf('Exchange Rates')  !=-1 ? true : false;




            if(gold_rate == true){
            $state.go('menuView.GoldRates');
            }
            if(Exchange_Rates ==true){

             $state.go('menuView.ExchangeRates');
            }


          break;

        case 'error':
          alert('GCM error = ' + notification.msg);
          break;

        default:
          alert('An unknown GCM event has occurred');
          break;
      }
    });


    // WARNING: dangerous to unregister (results in loss of tokenID)
//    $cordovaPush.unregister(options).then(function(result) {
//      // Success!
//
//
//
//
//    }, function(err) {
//      // Error
//    })

  }, false);


})

/**
  Type : Filter
  Description : Use trusted filter in case of sce delegate blacklisting / whitelisting issues in urls
*/
.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}])
/**
  Type : Filter
  Description : MySQL date to regular mm/dd/yyyy formatting
*/
.filter('DateFormatter', function() {
    return function(dateSTR) {
        var exception= "no data available";
        if(dateSTR){
            var o = dateSTR.replace(/-/g, "/"); // Replaces hyphens with slashes
            return Date.parse(o + " -0000"); // No TZ subtraction on this sample
        }
        else{
            return exception;
        }
    };
})
.filter('badDateToISO', function() {
    return function(badTime) {
        var goodTime = badTime.replace(/(.+) (.+)/, "$1T$2Z");
        return goodTime;
    };
})

.filter('unique', function() {
   return function(collection, keyname) {
      var output = [],
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
})
.filter('imgUrlreplace', function(){
                  return function(text) {
                   var return_replace = "\\'";
                    var regular_ext=/(')/g ;
                     return text.replace(regular_ext, return_replace);
                      };
                      })

.config(function($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider, $compileProvider) {
            //$ionicConfigProvider.scrolling.jsScrolling(false);
            //Whitelist external functions to the list below

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|geo|tel):/);
            localStorageServiceProvider.setPrefix('kl');    //Local storage key prefix identifier
           // if none of the above states are matched, use this as the fallback
                 $urlRouterProvider.otherwise('/layout');
              $stateProvider
                 .state('layout', {
                 url: "/layout",
                 controller: 'layoutController'
                 })
                 .state('loginView', {
                 url: "/login",
                 templateUrl: "templates/loginview/login.html",
                 controller: 'loginController'
                 })
                 .state('loginMailView', {
                 url: "/loginmail",
                 templateUrl: "templates/loginview/loginmail.html",
                 controller: 'loginMailController'
                 })
                 .state('signupView', {
                 url: "/login/signup",
                 templateUrl: "templates/loginview/signup.html",
                 controller: 'signupController'
                 })
                 .state('offlineview', {
                 url: "/offline_view",
                 templateUrl:"templates/loginview/Offline.html",
                 controller:"offlineController"
                 })
                 .state('menuView', {
                 url: "/mview",
                 templateUrl: "templates/listingview/menu.html",
                 controller: 'menuController'
                 })
                 .state('menuView.AboutUsview', {
                 url:"/Aboutus_view",
                 views: {
                 'menuContent' :{
                 templateUrl:"templates/AboutUs.html",
                 }
                 }
                 })
                 .state('menuView.ContactUsview', {
                  url:"/Contactus_view",
                  views: {
                  'menuContent' :{
                  templateUrl:"templates/ContactUs.html",
                  controller: 'ContactUScontroller'
                  }
                  }
                  })
                  .state('menuView.listingView', {
                  url:"/listings",
                  views: {
                  'menuContent' :{
                  templateUrl: "templates/listingview/listings.html",
                  controller: 'listingsController'
                  }
                  }
                  })
                  //sub categeries
                  .state('menuView.b2b', {
                  url:"/suncategoty_view",
                  views: {
                  'menuContent' :{
                  templateUrl: "templates/listingview/categorytabs/b2b.html",
                  controller: 'subcategorycontroller'
                  }
                  }
                  })
                  .state('menuView.BizSearch',{
                  url:"/BizSearch_view",
                  views: {
                  'menuContent' :{
                  templateUrl: "templates/listingview/categorytabs/BizSearch.html",
                  controller: 'BizSearchcontroller'
                  }
                  }
                  })
                  .state('menuView.BizListview',{
                  url:"/Bizlist_view",
                  views: {
                  'menuContent' :{
                  templateUrl: "templates/listingview/Bizlistview.html",
                  controller: 'Bizlistviewcontroller'
                  }
                  }
                  })
                  /*Listing tabs*/
                  .state('menuView.listingView.tabs', {
                  url:"/tabs",
                  abstract:true,
                  views: {
                  'tabContent' :{
                  templateUrl: "templates/listingview/listingtabs/tabhead.html"
                  }
                  }
                  })
                  // Default landing state
                  .state('menuView.listingView.tabs.recent', {
                  url:"/recent",
                  views: {
                  'recent-tab' :{
                  templateUrl: "templates/listingview/listingtabs/recent.html"
                  }
                  }
                  })
                  .state('menuView.listingView.tabs.nearby', {
                  url:"/nearby",
                  views: {
                  'nearby-tab' :{
                  templateUrl: "templates/listingview/listingtabs/nearby.html"
                  }
                  }
                  })
                  .state('menuView.listingView.tabs.ratings', {
                  url:"/ratings",
                  views: {
                  'rating-tab' :{
                  templateUrl: "templates/listingview/listingtabs/ratings.html"
                  }
                  }
                  })
                  /*Category tabs*/
                  .state('menuView.listingView.categorytabs', {
                  url:"/categorytabs",
                  abstract:true,
                  views: {
                  'tabContent' :{
                  templateUrl: "templates/listingview/categorytabs/tabhead.html"
                  }
                  }
                  })
                  // Default landing state
                  .state('menuView.listingView.categorytabs.search', {
                  url:"/searchcategories",
                  views: {
                  'search-tab' :{
                  templateUrl: "templates/listingview/categorytabs/search.html"
                  }
                  }
                  })
                  .state('menuView.listingView.categorytabs.b2b', {
                  url:"/b2b",
                  views: {
                  'b2b-tab' :{
                  templateUrl: "templates/listingview/categorytabs/BizSearch.html"
                  }
                  }
                  })
                  .state('menuView.detailView', {
                  url:"/detailView",
                  views: {
                  'menuContent' :{
                  templateUrl: "templates/detailview/detail.html",
                  controller: 'detailController'
                  }
                  }
                  })
                  .state('menuView.categorieslist', {
                  url:"/category_View",
                  views: {
                  'menuContent' :{
                  templateUrl: "templates/detailview/categorieslist.html",
                  controller: 'listingsController'
                  }
                  }
                  })
                  .state('menuView.notifications', {
                  url:"/notifications",
                  views: {
                  'menuContent' :{
                  templateUrl: "templates/dashboard/notifications.html",
                  controller: 'notifyController'
                  }
                  }
                  })
                  .state('menuView.services', {
                  url:"/servicedetails",
                  views: {
                  'menuContent' :{
                  templateUrl: "templates/detailview/views/services.html",
                  controller: 'detailedServiceController'
                  }
                  }
                  })
                  .state('menuView.products', {
                  url:"/productdetails",
                  views: {
                  'menuContent' :{
                  templateUrl: "templates/detailview/views/products.html",
                  controller: 'detailedProductController'
                  }
                  }
                  })
                  .state('menuView.videos', {
                  url:"/videos",
                  views: {
                  'menuContent' :{
                  templateUrl: "templates/detailview/views/videos.html",
                  controller: 'detailedVideosController'
                  }
                  }
                  })
                  .state('menuView.ratings', {
                  url:"/ratings",
                  views: {
                  'menuContent' :{
                  templateUrl: "templates/detailview/views/ratings.html",
                  controller: 'detailedRatingsController'
                  }
                  }
                  })
                  .state('menuView.writeReview', {
                  url:"/writeReview",
                  views: {
                  'menuContent' :{
                  templateUrl: "templates/detailview/views/review.html",
                  controller: 'detailReviewController'
                  }
                  }
                  })
                 .state('menuView.photoGallery', {
                  url:"/photoGallery",
                  views: {
                  'menuContent' :{
                  templateUrl: "templates/detailview/views/photogallery.html",
                  controller: 'detailGalleryController'
                   }
                   }
                   })
                   .state('menuView.workingHours', {
                   url:"/workingHours",
                   views: {
                   'menuContent' :{
                   templateUrl: "templates/detailview/views/workinghours.html",
                   controller: 'detailHoursController'
                   }
                   }
                   })
                   .state('menuView.Enquiry', {
                   url:"/businessEnquiry",
                   views: {
                   'menuContent' :{
                   templateUrl: "templates/detailview/views/enquiry.html",
                   controller: 'detailEnquiryController'
                   }
                   }
                   })
                   .state('menuView.ownThis', {
                   url:"/ownthis",
                   views: {
                   'menuContent' :{
                   templateUrl: "templates/detailview/views/ownthis.html",
                   controller: 'detailOwnthisController'
                   }
                   }
                   })
                   .state('menuView.directions', {
                   url:"/directions",
                   views: {
                   'menuContent' :{
                   templateUrl: "templates/detailview/views/directions.html",
                   controller: 'detailDirectionsController'
                   }
                   }
                   })
                   //Add business parent state
                   .state('menuView.addBusiness',{
                   url:"/addbusiness",
                   views: {
                  'menuContent' :{
                  templateUrl: "templates/addbusiness/addbusiness.html",
                  controller :'addBusinessCtrl'
                  }
                  }
                  })
                  //Default landing page for business add
                  .state('menuView.main',{
                  url:"/addbusinessmain",
                  views : {
                 'menuContent' : {
                 templateUrl : "templates/addbusiness/views/addbizlanding.html",
                 controller  : "paymentController"
                 }
                 }
                 })
                 //Premium payment and coupon
                 .state('menuView.payment',{
                 url:"/addbusinesspayment",
                 views : {
                 'menuContent' : {
                 templateUrl : "templates/addbusiness/views/payment.html",
                 controller  : "paymentController"
                 }
                 }
                 })
    //Business name and description
    .state('menuView.addBusiness.step1',{
        url:"/step1",
        views : {
            'formContent' : {
                templateUrl : "templates/addbusiness/views/step1.html"
            }
        }
    })
    //Category selection
    .state('menuView.addBusiness.step2',{
        url:"/step2",
        views : {
            'formContent' : {
                templateUrl : "templates/addbusiness/views/step2.html"
            }
        }
    })
    //Full contact details
    .state('menuView.addBusiness.step3',{
        url:"/step3",
        views : {
            'formContent' : {
                templateUrl : "templates/addbusiness/views/step3.html"
            }
        }
    })
    //Location and address settings
    .state('menuView.addBusiness.step4',{
        url:"/step4",
        views : {
            'formContent' : {
                templateUrl : "templates/addbusiness/views/step4.html"
            }
        }
    })
    //Keyword add ons
    .state('menuView.addBusiness.step5',{
        url:"/step5",
        views : {
            'formContent' : {
                templateUrl : "templates/addbusiness/views/step5.html",
               // controller : 'step5Controller'
            }
        }
    })
    //End of form 1 , images upload
    .state('menuView.addBusiness.step6',{
        url:"/step6",
        views : {
            'formContent' : {
                templateUrl : "templates/addbusiness/views/step6.html"
            }
        }
    })
    //Working hours
    .state('menuView.addBusiness.step7',{
        url:"/step7",
        views : {
            'formContent' : {
                templateUrl : "templates/addbusiness/views/step7.html",
                controller  : "workingHoursController"
            }
        }
    })
    //product
    .state('menuView.addBusiness.step8',{
        url:"/step8",
        views : {
            'formContent' : {
                templateUrl : "templates/addbusiness/views/step8.html",
                controller : 'productController'
            }
        }
    })
    .state('menuView.addBusiness.step8.prodlist',{
        url:"/productlist",
        views : {
            'productContent' : {
                templateUrl : "templates/addbusiness/views/step8_2.html"
            }
        }
    })
    //product - add one
    .state('menuView.addBusiness.step8.addprod',{
        url:"/addprod",
        views : {
            'productContent' : {
                templateUrl : "templates/addbusiness/views/step8_1.html"
            }
        }
    })

    //service
    .state('menuView.addBusiness.step9',{
        url:"/step8",
        views : {
            'formContent' : {
                templateUrl : "templates/addbusiness/views/step9.html",
                controller : 'servicesController'
            }
        }
    })
    .state('menuView.addBusiness.step9.servicelist',{
        url:"/servicelist",
        views : {
            'serviceContent' : {
                templateUrl : "templates/addbusiness/views/step9_2.html"
            }
        }
    })
    //Services - add one
    .state('menuView.addBusiness.step9.addservice',{
        url:"/addservice",
        views : {
            'serviceContent' : {
                templateUrl : "templates/addbusiness/views/step9_1.html"
            }
        }
    })
    .state('menuView.addBusiness.step10',{
        url:"/addvideos",
        views : {
            'formContent' : {
                templateUrl : "templates/addbusiness/views/step10.html",
                controller  : 'videourlController'
            }
        }
    })
    //Profile_view

    .state('menuView.profile',{
            url:"/profileview",
            views : {
                'menuContent' : {
                   templateUrl : "templates/myprofile/Profile.html",
                   controller : 'myprofileHomeController'

                }
            }
        })

        .state('menuView.profile.home',{
                url:"/Profile_view",
                views : {
                    'profileContent' : {
                        templateUrl : "templates/myprofile/myprofilehome.html",
                        controller : 'myprofileHomeController'
                    }
                }
            })
    .state('menuView.profile.myListings',{
        url:"/mylistings_view",
        views : {
            'profileContent' : {
                templateUrl : "templates/myprofile/mylistings.html",
                controller : 'myBizsController'
            }
        }
    })
    .state('menuView.profile.myevents',{
            url:"/myevent_view",
            views : {
                'profileContent' : {
                    templateUrl : "templates/myprofile/myevents.html",
                    controller : 'myEventsController'
                }
            }
        })
    .state('menuView.profile.myGallery',{
            url:"/mygallery_view?businessID",
            views : {
                'profileContent' : {
                    templateUrl : "templates/myprofile/myphotogallery.html",
                    controller : 'myBizsGalleryController'
                }
            }
        })
     .state('menuView.profile.Editprofile',{
                    url:"/Editprofile_view",
                    views : {
                        'profileContent' : {
                            templateUrl : "templates/myprofile/EditProfile.html",
                            controller : 'myprofileHomeController'
                        }
                    }
                })
                .state('menuView.profile.profileblogs',{
            url:"/myblogs_view",
            views : {
                'profileContent' : {
                    templateUrl : "templates/myprofile/myblogs.html",
                    controller : 'myprofileBlogsController'
                }
            }
        })


.state('menuView.profile.profileforums',{
            url:"/myforums_view",
            views : {
                'profileContent' : {
                    templateUrl : "templates/myprofile/myforums.html",
                    controller : 'myprofileForumsController'
                }
            }
        })


.state('menuView.profile.profileAds',{
            url:"/myAds_view",
            views : {
                'profileContent' : {
                    templateUrl : "templates/myprofile/myAds.html",
                    controller : 'myprofileAdsController'
                }
            }
        })




    .state('menuView.testingZone', {
        url : "/testingzone",
        views : {
            'menuContent' : {
                templateUrl : "templates/testing/testing.html",
                controller : 'testingController'
            }
        }
    })
    .state('menuView.myClassifieds',{
        url:"/myClassifieds",
        views : {
            'menuContent' : {
                templateUrl : "templates/classifieds/myclassifieds.html",
                controller : 'myClassifiedsController'
            }
        }
    })
    .state('menuView.classifieds', {
    url:"/classifieds",
    views: {
    'menuContent' :{
    templateUrl: "templates/classifieds/classifieds.html",
    controller:'ClassifiedsController'
    }
    }
    })
    .state('menuView.classfiedrecentads', {
                url:"/classrecent_View",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/classifieds/classifiedAds.html",
                        controller: 'ClassifiedsController'
                    }
                }
            })
        /*Listing tabs*/
        .state('menuView.classifiedlistview', {
                        url:"/classfiedlist_view",
                        views: {
                            'menuContent' :{
                                templateUrl: "templates/classifieds/ClassifiedList.html",
                                controller: 'ClassifiedListController'
                            }
                        }
                    })
/*===================classified search view=====================*/
.state('menuView.ClassifiedSearch', {
                        url:"/ClassifiedSearch_view",
                        views: {
                            'menuContent' :{
                                templateUrl: "templates/classifieds/classifiedSearcview.html",
                                controller: 'ClassifiedSearchController'
                            }
                        }
                    })


    .state('menuView.classifieds.tabs', {
        url:"/tabs",
        abstract:true,
        views: {
            'tabContent' :{
                templateUrl: "templates/classifieds/listingtabs/tabhead.html"
            }
        }
    })
        // Default landing state
    .state('menuView.classifieds.tabs.recent', {
        url:"/recent",
        views: {
            'recent-tab' :{
                templateUrl: "templates/classifieds/listingtabs/recent.html"
            }
        }
    })
    .state('menuView.classifieds.tabs.nearby', {
        url:"/nearby",
        views: {
            'near-tab' :{
                templateUrl: "templates/classifieds/listingtabs/ratings.html"
            }
        }
    })
        /*Category tabs*/
    .state('menuView.classifieds.categorytabs', {
        url:"/categorytabs",
        views: {
            'tabContent' :{
                templateUrl: "templates/classifieds/categorytabs/tabhead.html"
            }
        }
    })
    .state('menuView.classtypes', {
            url:"/classtypes",
            views: {
            'menuContent' :{
             templateUrl: "templates/classifieds/categorytabs/classifiedtypes.html",
               controller: 'ClassifiedssubcatController'
                                             }
            }
        })
        .state('menuView.classifieds.categorytabs.recentads', {
                url:"/recentads",
                views: {
                    'recent-tab' :{
                         templateUrl: "templates/classifieds/categorytabs/RecentAds.html"
                    }
                }
            })

    .state('menuView.classifiedDetailView', {
        url:"/classifieddetailview",
        views: {
            'menuContent' :{
                templateUrl: "templates/classifieddetailview/detail.html",
                controller: 'classifieddetailController'
            }
        }
    })
    .state('menuView.Adsgallery', {
            url:"/Adsgallery_view",
            views: {
                'menuContent' :{
                    templateUrl: "templates/classifieddetailview/AdsGallery.html",
                    controller: 'classifiedGalleryController'
                }
            }
        })
    .state('menuView.classifiedEnquiry', {
        url:"/classifiedenquiry",
        views: {
            'menuContent' :{
                templateUrl: "templates/classifieddetailview/views/enquiry.html",
                controller: 'classifiedEnquiryController'
            }
        }
    })
    .state('menuView.addClassifieds', {
        url:"/addclassifieds",
        views: {
            'menuContent' :{
                templateUrl: "templates/addclassified/addclassified.html",
                controller: 'addClassified'
            }
        }
    })
    .state('menuView.addClassifieds.step1', {
        url:"/step1",
        views: {
            'formContent' :{
                templateUrl: "templates/addclassified/views/step1.html"
            }
        }
    })
    .state('menuView.addClassifieds.step2', {
        url:"/step2",
        views: {
            'formContent' :{
                templateUrl: "templates/addclassified/views/step2.html"
            }
        }
    })
    .state('menuView.addClassifieds.step3', {
        url:"/step3",
        views: {
            'formContent' :{
                templateUrl: "templates/addclassified/views/step3.html"
            }
        }
    })
    .state('menuView.facebook', {
        url:"/facebook",
        views: {
            'menuContent' :{
                templateUrl: "templates/facebook/facebookmain.html",
                controller : 'checkinController'
            }
        }
    })
    .state('menuView.locationBasedPlaces', {
        url:"/locationresults",
        views: {
            'menuContent' :{
                templateUrl: "templates/facebook/locationresults.html",
                controller : 'localeResultController',

            }
        }
    })
    .state('menuView.suggestlocation', {
            url:"/suggestlocation",
            views: {
                'menuContent' :{
                    templateUrl: "templates/facebook/suggestlocation.html",
                    controller : 'localeResultController'
                }
            }
        })
    .state('menuView.friendlist', {
        url:"/friendslist",
        views: {
            'menuContent' :{
                templateUrl: "templates/facebook/friendslist.html",
                controller : 'friendlistController'
            }
        }
    })
    .state('menuView.facebookcheckins', {
        url:"/checkins",
        views: {
            'menuContent' :{
                templateUrl: "templates/facebook/checkins.html",
                controller : 'checkinlistController'
            }
        }
    })
    .state('menuView.facebook.checkin', {
        url:"/checkin",
        views: {
            'fbContent' :{
                templateUrl: "templates/facebook/checkin/checkinmain.html",
                controller : 'checkinController'
            }
        }
    })
    .state('menuView.facebook.checkin.createTemplate', {
        url:"/checkinhere",
        views: {
            'checkinContent' :{
                templateUrl: "templates/facebook/checkin/createcheckin.html"
            }
        }
    })
    .state('menuView.facebook.checkin.chooseFriends', {
        url:"/choosefriends",
        views: {
            'checkinContent' :{
                templateUrl: "templates/facebook/checkin/choosefriends.html"
            }
        }
    })
    //BLOGS AND FORUMS VIEWS CALLING
    //BLOGS VIEW LISTVIEW
    .state('menuView.blogslist', {
                url:"/Blogs",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/blogforums/Blogs.html",
                        controller: 'bloglistcontroller'
                    }
                }
            })

             /*blog tabs*/
                .state('menuView.blogslist.tabs', {
                    url:"/tabs",
                    abstract:true,
                    views: {
                        'tabContent' :{
                            templateUrl: "templates/blogforums/blogtabs/tabhead.html"
                        }
                    }
                })

                .state('menuView.blogslist.tabs.recent', {
                        url:"/recent",
                        views: {
                            'recent-tab' :{
                                templateUrl: "templates/blogforums/Blogslist.html"
                            }
                        }
                    })

            //BLOG details VIEW LISTVIEW
            .state('menuView.blogdetails', {
                            url:"/Blogdetail_view",
                            views: {
                                'menuContent' :{
                                    templateUrl: "templates/blogforums/BlogDetails.html",
                                    controller: 'blogdetailcontroller'
                                }
                            }
                        })
                        //RELATED BLOGS AND COMMENTS VIEW NAVIGATION
            .state('menuView.relatedandcomments', {
            url:"/relatedblog_view",
            views: {
            'menuContent' :{
            templateUrl: "templates/blogforums/blogtabs/relatedandcomments.html",
            controller: 'relatedcommentscontroller'
            }
            }
            })
            //FORUM LIST VIEW
            .state('menuView.forumlist', {
            url:"/forums",
            views: {
            'menuContent' :{
            templateUrl: "templates/blogforums/forums.html",
            controller: 'forumlistcontroller'
            }
            }
            })
            /*blog tabs*/
            .state('menuView.forumlist.tabs', {
            url:"/tabs",
            abstract:true,
            views: {
            'tabContent' :{
            templateUrl: "templates/blogforums/forumtabs/tabhead.html"
            }
            }
            })
            .state('menuView.forumlist.tabs.recent', {
            url:"/recent",
            views: {
            'recent-tab' :{
            templateUrl: "templates/blogforums/Forumslist.html"
            }
            }
            })
            //forum details VIEW LISTVIEW
            .state('menuView.forumdetails', {
            url:"/Forumdetail_view",
            views: {
            'menuContent' :{
            templateUrl: "templates/blogforums/ForumDetails.html",
            controller: 'forumdetailcontroller'
            }
            }
            })
            .state('menuView.relatedforums', {
            url:"/relatedforum_view",
            views: {
            'menuContent' :{
            templateUrl: "templates/blogforums/forumtabs/relatedforums.html",
            controller: 'relatedforumcontroller'
            }
            }
            })
            //favorite business LISTVIEW
            .state('menuView.favoritelist', {
            url:"/Favoritebiz_view",
            views: {
            'menuContent' :{
            templateUrl: "templates/detailview/FavoriteBizview.html",
            controller:'listingsController'
            }
            }
            })
            .state('menuView.Gustcomment', {
            url:"/Gustusercomment_view?params",
            views: {
            'menuContent' :{
            templateUrl: "templates/GustuserCommentView.html",
            controller:'GustCommnetController'
            }
            }
            })
            .state('menuView.ExchangeRates', {
                           url:"/ExchangeRates_view",
                           views: {
                           'menuContent' :{
                           templateUrl: "templates/klstock/exchangeRates.html",
                          controller:'ExchangeRateController'
                           }
                           }
                           })

                    .state('menuView.GoldRates', {
                           url:"/Goldrate_view",
                           views: {
                           'menuContent' :{
                           templateUrl: "templates/klstock/GoldRates.html",
                           controller:'GoldRateController'
                           }
                           }
                           })
                           /*events state controllers */

                                   .state('menuView.EventsHome', {
                                          url:"/Event_view",
                                          views: {
                                          'menuContent' :{
                                          templateUrl: "templates/Events/Home.html",
                                          controller:'EventHomeController'
                                          }
                                          }
                                          })
                                   .state('menuView.EventDetail', {
                                          url:"/EventDetail_view",
                                          views: {
                                          'menuContent' :{
                                          templateUrl: "templates/Events/EventDetail.html",
                                          controller:'EventDetailController'
                                          }
                                          }
                                          })
                                   .state('menuView.EventwriteReview', {
                                           url:"/event_writeReview?Event_id",

                                           views: {
                                           'menuContent' :{
                                           templateUrl: "templates/Events/review.html",
                                           controller: 'EventReviewController'
                                           }
                                           }
                                          })
                                   .state('menuView.EventGallery', {
                                          url:"/EventGallery?Event_id&Logged_id&slug",

                                          views: {
                                          'menuContent' :{
                                          templateUrl: "templates/Events/photogallery.html",
                                          controller: 'EventGalleryController'
                                          }
                                          }
                                          })
                                   .state('menuView.EventSearch', {
                                          url:"/eventsearch_view",

                                          views: {
                                          'menuContent' :{
                                          templateUrl: "templates/Events/Search.html",
                                          controller: 'EventSearchController'
                                          }
                                          }
                                          })

                                   .state('menuView.Eventenquiry', {
                                          url:"/eventEnquiry_view?Event_id&Event_mail&slug",

                                          views: {
                                          'menuContent' :{
                                          templateUrl: "templates/Events/enquiry.html",
                                          controller: 'EventEnquiryController'
                                          }
                                          }
                                          });
            });
