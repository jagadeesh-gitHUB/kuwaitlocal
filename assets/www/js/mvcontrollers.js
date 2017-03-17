    //Export module definition
angular.module('listing.controllers', [])
 //menu base controller
 .controller('menuController', function($scope,$timeout,$state,$rootScope,bizglobalVars,globalVars,$cordovaContacts,facebookData,fetchListing, $ionicPlatform, $ionicViewService, resourceRequistion,fbAccess,cordovareturn,$cordovaSocialSharing,$cordovaFacebook,$cordovaOauth,$ionicModal,localStorageService,resourceRequistion,$cordovaInAppBrowser,AdsService){
  $scope.$on('$destroy', $scope.backButton);
    //Initialize friend list
//     if(globalVars.userInfo.id && globalVars.userInfo.id.length > 0){
//     facebookData.getFriendList().success(function(res){
//      facebookData.myfriends = res;
//       });
//         }
//           fetchListing.getLists(globalVars.userInfo.id).then(function(data){
//            if(data.data.length === 0){
//             $rootScope.myListings_present = false;
//             }
//              else{
//               $rootScope.myListings_present = true;
//               }
//               });
                 if(globalVars.userInfo.id !=undefined){
                  resourceRequistion.fetchuserdetails(globalVars.userInfo.id).then(function(data){
                   globalVars.userdetails=data.data;
                    var TempUser_logo=globalVars.userPic || 'img/defaultuser.png';
                     $scope.userName=globalVars.userdetails[0].username.length == 0 ?  globalVars.userdetails[0].first_name : globalVars.userdetails[0].username;
                   //  $scope.userLogo= globalVars.userdetails[0].user_logo.length == 0 ? TempUser_logo : $scope.logourl+'/'+globalVars.userdetails[0].id +'_'+globalVars.userdetails[0].user_logo;
                     $scope.userLogo= globalVars.userdetails[0].user_logo.length == 0 ? TempUser_logo : $scope.logourl+'/'+globalVars.userdetails[0].user_logo;
                     sessionStorage.userLogo=$scope.userLogo;
                     });
                      }
                       else{
                        globalVars.userdetails=[];
                        $scope.userName = globalVars.userInfo.first_name + ' ' + globalVars.userInfo.last_name || 'UserName here';
                        $scope.userLogo = globalVars.userPic || 'img/defaultuser.png';
                        sessionStorage.userLogo=$scope.userLogo;
                        }
                        ///$scope.userName = globalVars.userInfo.first_name + ' ' + globalVars.userInfo.last_name || 'UserName here';
                        $scope.userDetails=globalVars.userdetails;
                        $scope.logourl=globalVars.userLogoFolder;
                        AdsService.AdsCall('Business').then(function(data){
                                                                         globalVars.AdsData =data.data;

                                                                         $rootScope.Ads_Array=data.data[0];

                                                                         });
 /*======================================Menu Events (ckick)===========================================================*/
 $scope.menuaddNewBusiness = function(){
  bizglobalVars.flushEditData();
  analytics.trackEvent('Menu Events', 'Click on Add business ', 'Navigate to Add Business view', 100);
  };
  $scope.menufavbizlist=function(){
  analytics.trackEvent('Menu Events', 'Click on Favorite ', 'Navigate to User favorite Business list view if user login otherwise naviagte login view', 100);
  if(globalVars.userInfo.id == undefined){
   globalVars.loginstatus="notlogged";
   globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
    $state.go('loginView');
    }
     else{
      $state.go("menuView.favoritelist");
       }
        };
  $scope.menushareit=function(){
            analytics.trackEvent('Menu Events', 'Click on Share KL ', 'Sahre App Play store link ', 100);
            $cordovaSocialSharing.share(" ","share KL App Playstore link", "", "https://play.google.com/apps/testing/com.ionicframework.kuwaitlocalbusiness270518") // Share via native share sheet
            .then(function(result) { }, function(err) {
              // An error occured. Show a message to the user
              });
              };

   $scope.menuhomeclick=function(){

               AdsCallfromview('Business');

     analytics.trackEvent('Menu Events', 'Click on Home ', 'Navigate to Home view (Business Module) ', 100);
     };

     $scope.menuprofileclick=function(){
     analytics.trackEvent('Menu Events', 'Click on my profile ', 'Navigate to my profile view ', 100);
     };

     $scope.menuAdsclick=function(){

               AdsCallfromview('Classified');
     analytics.trackEvent('Menu Events', 'Click on Classifieds ', 'Navigate to Classified home view (Classifed module) ', 100);
     };

     $scope.menuforumclick=function(){

               AdsCallfromview('Forum');

     analytics.trackEvent('Menu Events', 'Click on forums  ', 'Navigate to forums view(forum module) ', 100);
     };

     $scope.menunewsclick=function(){

               AdsCallfromview('Blog');

               $rootScope.Current_typeName='Recent';

     analytics.trackEvent('Menu Events', 'Click on news  ', 'Navigate to news view(News module) ', 100);
     };

     $scope.menucheckinclick=function(){

      analytics.trackEvent('Menu Events', 'Click on check-in   ', 'Navigate to check in  view (check module) ', 100);
      };

     $scope.menufriendsclick=function(){

     analytics.trackEvent('Menu Events', 'Click on invite friends  ', 'Navigate to invite view ', 100);
     };

     $scope.menuAboutusclick=function(){

      analytics.trackEvent('Menu Events', 'Click on about us  ', 'Navigate to Abous us view ', 100);
      };

     $scope.menucontactusclick=function(){

     analytics.trackEvent('Menu Events', 'Click on Contanct us  ', 'Navigate to contact us view ', 100);
     };

               $scope.menuevents=function(){

               AdsCallfromview('Event');

               analytics.trackEvent('Menu Events', 'Click on Events  ', 'Navigate to events view ', 100);
               };

               $scope.menuexchange=function(){

               AdsCallfromview('Exchange Rate');

               analytics.trackEvent('Menu Events', 'Click on exchange rate  ', 'Navigate to exchange rate view ', 100);
               };


               $scope.menugold=function(){

               AdsCallfromview('Gold Rate');

               analytics.trackEvent('Menu Events', 'Click on gold rate  ', 'Navigate to gold rate view ', 100);
               };
   $scope.hitLogout = function(){
   analytics.trackEvent('Menu Events', 'Click on Sign out'  , 'logout current user and navigate to log in view  ', 100);
   fbAccess.logout(function(response) {
   // user is now logged out
   },function(err){ });
    localStorageService.clearAll();
    $rootScope.restartApp();
    };
    $scope.menulogin=function(){
    analytics.trackEvent('Menu Events', 'Click on  login'  , 'Navigate to login view', 100);
    $state.go('loginView');
    };
 function AdsCallfromview(module){

             $rootScope.Ads_Array = [];

             AdsService.AdsCall(module).then(function(data){
                                             globalVars.AdsData =data.data;

                                            $rootScope.Ads_Array=data.data[0];

                                                 });

             }
})
    //Listings Controller
.controller('listingsController', function($scope, $state, $ionicPlatform, $ionicViewService, $cordovaGeolocation, geoCode, resourceRequistion, $timeout,$interval, globalVars, $rootScope, $ionicLoading, globalDataTemp, businessDetailData,cordovareturn,$ionicScrollDelegate,$http,androidServices,localStorageService ){
                    //cordovareturn.Getcurrentlocation();
                    if(window.cordova && window.cordova.plugins && window.analytics){

                    analytics.trackView('Business Home view');
                    }
                    localStorageService.set('kl.Temp_loginID', globalVars.userInfo.id);
                    globalVars.preventRotate();
                    globalVars.searchKeyvalue="";
                    globalVars.Searchobj=[];
                   // if(globalVars.currentcityGovernorate==""){

                                    //$scope.currentgname="";
                                    //alert($scope.currentgname);
                                    //alert(globalVars.currentcityGovernorate);
                                    var watchID=null;
                                    var dataobj=[];
                                    $scope.startcurrentgname="Kuwait";

                  watchID = navigator.geolocation.getCurrentPosition(function(position) {

                    $rootScope.ADDLocation_Data=position;
                  getReverseGeocodingData(position.coords.latitude,position.coords.longitude);
                    globalVars.currentlat=position.coords.latitude;
                    globalVars.currentlng=position.coords.longitude;
                  /* geoCode.reverseFind(position.coords.latitude,position.coords.longitude ).then(function(data){
                    var dataobj=data.data.results;

                    angular.forEach(dataobj, function(v, k){
                    angular.forEach(v.types,function(type,k){

                    if(type=="administrative_area_level_1"){

                    var governoratesname = v.formatted_address.split(",");

                    $scope.startcurrentgname=governoratesname[0];
                    globalVars.currentlat=position.coords.latitude;
                    globalVars.currentlng=position.coords.longitude;
                    }
                    });
                    });
                    },
                    function(err){
                    $scope.startcurrentgname='kuwait';
                    });*/
                    },
                    function(err){});
                   // }
                    function clearWatch() {
                                   if (watchID != null) {
                                       navigator.geolocation.clearWatch(watchID);
                                       watchID = null;
                                   }
                                   dataobj=[];
                               }
                               clearWatch();
                               function getReverseGeocodingData(lat, lng) {
                                   var latlng = new google.maps.LatLng(lat, lng);
                                   // This is making the Geocode request
                                   var geocoder = new google.maps.Geocoder();
                                   geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                                       if (status !== google.maps.GeocoderStatus.OK) {
                                          // alert(status);
                                          $scope.startcurrentgname="kuwait";
                                       }
                                       // This is checking to see if the Geoeode Status is OK before proceeding
                                       if (status == google.maps.GeocoderStatus.OK) {

                                           var address = (results[0].formatted_address);
                               angular.forEach(results, function(v, k){
                               angular.forEach(v.types,function(type,k){
                               if(type=="administrative_area_level_1"){
                               var governoratesname = v.formatted_address.split(",");

                                $scope.startcurrentgname=governoratesname[0];
                                 globalVars.currentcityGovernorate=governoratesname[0];
                                 //globalVars.currentlat=position.coords.latitude;
                                // globalVars.currentlng=position.coords.longitude;
                                  }
                                  });
                                   });
                                   }
                                   });
                               }

                   var pageli=20;//this default value for server limit;
                   if(globalVars.userInfo.id != undefined){
                   resourceRequistion.fetchuserdetails(globalVars.userInfo.id).then(function(data){
                   globalVars.userdetails=data.data;
                   });
                   }
                   else{
                   globalVars.userdetails=[];
                   }
                   $scope.sampletxt='Res';
                   $rootScope.miniLoader = false;
                   $rootScope.setSearch = 'business';
                   $scope.autoLocation = '';
                   $scope.returnedSearch = {};
                   $scope.searchAutoComplete = 0;
                   $scope.searchTerm = '';
                   $scope.selectgoverareaid=0;
                   $scope.selectgoverareaname="Area";//placeholder for choose area in header
                   $scope.seachdataclass=true;//this for search result list view hide name, default its in true
                   //areas list calling
                   $scope.hidecategories=false;//home categories hide name default its false
                   $scope.citieshide=true;//this for area listview default its true
                   var rootingobj=$rootScope;
                   $scope.entersearchtext='';
                   $scope.mobilecategories=[];
                   $scope.mainListings==[];
                   $scope.imageurl=globalVars.MainklURl+'img/BusinessLogo/logo_folder/';
                   $scope.moredatabtn=true;
                   $scope.listviewwithbg=true;
                   var globledatabiz=[];
                   var filreddata;
                   $scope.popularcatlistdiv=$rootScope.$viewHistory.currentView.stateName=='menuView.listingView.categorytabs.search'?false:true;
                   $scope.gridcatlistdiv=$rootScope.$viewHistory.currentView.stateName=='menuView.categorieslist'?false:true;
                   if($rootScope.$viewHistory.currentView.stateName=="menuView.favoritelist"){
                   $rootScope.miniLoader=true;
                   resourceRequistion.favlist(globalVars.userInfo.id).then(function(data){
                   $rootScope.miniLoader=false;
                   if(typeof(data.data)=="string"){
                   $scope.favlists=[];
                   }
                   else{
                   $scope.favlists=data.data;
                   }
                   });
                   analytics.trackView('Favorite List view');
                   }
                   //$scope.popularCategories=[];
                   if($rootScope.$viewHistory.currentView.stateName=='menuView.categorieslist'){
                   /* if(globalVars.popularcatdata.length == 0){*/
                   resourceRequistion.fetchpopularCats().then(function(data){
                   var ppdata=data.data;
                   angular.forEach(ppdata, function(v, k){
                   ppdata[k].logo=globalVars.catImgURL+v['id']+'_'+v['logo'];
                   });
                   $scope.popularCategories = ppdata;
                   globalVars.popularcatdata= $scope.popularCategories;
                   $rootScope.miniLoader = false;
                   });
                   /* }*/
                   //         else{
                   //                  $scope.popularCategories=globalVars.popularcatdata;
                   //                  }
                    analytics.trackView('Business popular categories list view');
                   }
                    $scope.openpopularcategories=function(){
                    analytics.trackEvent('Business Events','Click on list button','Navigate to popular categories list view',100);
                    sessionStorage.cattype="popList";
                    $state.go('menuView.categorieslist');
                    };
                    $scope.opengridcatlist=function(){
                    analytics.trackEvent('Business Events','Click on grid button','Navigate to Business home  view',100);
                    sessionStorage.cattype="popGrid";
                    $state.go('menuView.listingView.categorytabs.search');
                    };
//                    var i = 0;
//                    $scope.countries = [
//                     {name: "Adventure Sports",logo:"img/catimgs/Adventure Sports.jpg",id:"2102" },
//                     {name: "ATM",logo:"img/catimgs/Atm.jpg",id:"1216"},
//                     {name: "Beauty & Personal Care",logo:"img/catimgs/Beauty and Personal Care.jpg",id:"286"},
//                     {name: "Cars ",logo:"img/catimgs/Cars.jpg",id:"1183"},
//                     {name: "Coffee Shops",logo:"img/catimgs/Coffee  Shops.jpg",id:"1071"},
//                     {name: "Entertainment",logo:"img/catimgs/Entertainment.jpg",id:"93"},
//                     {name: "Exchange",logo:"img/catimgs/Exchange.jpg",id:"375"},
//                     {name: "Fitness",logo:"img/catimgs/Fitness.jpg",id:"290"},
//                     {name: "Government",logo:"img/catimgs/Government.jpg",id:"370"},
//                     {name: "Handy Man",logo:"img/catimgs/Handyman.jpg",id:"274"},
//                     {name: "Hospitals & Clinics",logo:"img/catimgs/Hospitals and Clinics.jpg",id:"281"},
//                     {name: "Hotels & Resorts",logo:"img/catimgs/Hotels & Resorts.jpg",id:"35"},
//                     {name: "Mobile",logo:"img/catimgs/Mobile.jpg",id:"2384"},
//                     {name: "Mosque",logo:"img/catimgs/Mosque.jpg",id:"350"},
//                     {name: "Petrol Pump",logo:"img/catimgs/Petrol Pump.jpg",id:"162"},
//                     {name: "Restaurants ",logo:"img/catimgs/Restaurants.jpg",id:"87"},
//                     {name: "Sheesha",logo:"img/catimgs/Shisha.jpg",id:"2444"},
//                     {name: "Shopping",logo:"img/catimgs/Shopping.jpg",id:"2266"},
//                     {name: "Taxi",logo:"img/catimgs/Taxi.jpg",id:"373"},
//                     {name: "Travel",logo:"img/catimgs/Travel.jpg",id:"288"}, ];
//                     $scope.ads={};
//                     var images=$scope.countries;
//                     function changeBackground() {
//                     if (i >= images.length) {
//                     i = 0;
//                     }
//                     $scope.adsimg=images[i++].img;
//                     $scope.ads=images[i++];
//                     return $scope.ads;
//                     }
//                     changeBackground();
//                      // Set an interval to continue
//                      $interval(changeBackground, 6000);
                      $scope.hidelists=function(){
                      $scope.seachdataclass=true;
                      $scope.hidecategories=false;
                      $scope.citieshide=true;
                       analytics.trackEvent('Business Events','Click on Back icon','Reset Previous Data',100);
                      },
                      $scope.searchfiledclick=function(){

                      if(stateStore !=$rootScope.$viewHistory.currentView.stateName){
                      analytics.trackEvent('Business Events','Click on search box','Navigate to business search view',100);
                      $state.go(stateStore);
                      }
                      else{
                      analytics.trackEvent('Business Events','Click on seach box','Navigate to home view',100);
                      $state.go('menuView.listingView.categorytabs.search');
                      }
                      },
                      $scope.searchfiledclickd=function(){
                      analytics.trackEvent('Business Events','Click on search box','Navigate to business search view',100);
                      $state.go('menuView.BizSearch');
                      },
                      $scope.unfavrate=function(data){
                      //unfav
                      resourceRequistion.unfav(data.id,globalVars.userInfo.id).then(function(data){
                      //var dt=data.data;
                      resourceRequistion.favlist(globalVars.userInfo.id).then(function(data){
                      if(typeof(data.data)=="string"){
                      $scope.favlists=[];
                      }
                      else{
                      $scope.favlists=data.data;
                      }
                      });
                      analytics.trackEvent('Business Events','Click on unfavorite icon','Delete selected '+item.title +' business from favorite list view',100);
                      androidServices.showToast("Unfavorited");
                      });
                      },
                      $scope.viewResult = function(selected){
                      };
                      $scope.viewCityResult =function(city) {
                      $scope.cityvalue=city.originalObject.name;
                      $scope.cityid=city.originalObject.id;
                      };
                      $scope.changegovernate=function(){
                      $scope.searchresultdatas=[];
                      $scope.selectgoverareaid=0;
                      $scope.selectgoverareaname="Area";
                      //alert($scope.register.governorateId);
                      sessionStorage.selectedcityid=$scope.register.governorateId;
                      if($scope.register.governorateId==0){
                      $scope.zerogovernorate=true;
                      $scope.class = "angucomplete-normal";
                      }
                      else{
                      $scope.zerogovernorate=false;
                      resourceRequistion.fetchgovernoratecity($scope.register.governorateId).then(function(data){
                      $scope.governorateareas=data.data;
                      });
                      }
                      analytics.trackEvent('Business Events','Click on governate select','change governate from list',100);
                      };
                      $scope.citySet = '';
                      $scope.listingSet = '';
                      $scope.popularCategories = {};
                      $scope.b2bCategories = [];
                      var functionalBlock = 0;
                      $scope.curLat = '';
                      $scope.curLng = '';
                      $scope.imgbaseURL = globalVars.catImgURL;                      //Slider data (ng-repeat)
                      $scope.mainListings = globalDataTemp.currentListings || [];    //Listings in listing view loaded into this (ng-repeat data)
                      $scope.loadComplete = false;
                      var currentView = 'recent';
                      var stateStore = $state.current.name;
                      $scope.searchfield=true;
                      //$scope.searchlsitdata=[];
                      //Loading indicator
                      //Current location getter
                      $scope.backButton = $ionicPlatform.registerBackButtonAction(function() {
                      {
                      $ionicViewService.nextViewOptions({ disableBack: true });
                      analytics.trackEvent('Business Events','Click on Back','Navigate to home view',100);
                      $state.go('menuView.listingView.categorytabs.search');
                      }
                      }, 105 );
                      $scope.$on('$destroy', $scope.backButton);
                      $cordovaGeolocation.getCurrentPosition().then(function(position) {
                      $scope.curLat = position.coords.latitude;
                      $scope.curLng = position.coords.longitude;
                      globalVars.deviceLat = position.coords.latitude;
                      globalVars.deviceLng = position.coords.longitude;
                      geoCode.reverseFind(position.coords.latitude, position.coords.longitude).then(function(data){
                      $scope.autoLocation = data.data.results[0].address_components[1].long_name;
                      }, function(err){});
                      }, function(err) {});
                      //get Governorates list for search
                      $scope.register = {};
                      $scope.register.governorateId = "0";
                      resourceRequistion.fetchgovernorateslist().then(function(data){

                      $scope.register.governorates=data;
                      $scope.currentgname=globalVars.currentcityGovernorate;
                      //$scope.governoratedata=data.data;
                      angular.forEach($scope.register.governorates,function(index,key){
                      if(globalVars.currentcityGovernorate!=""){
                      if(index.alias_name==globalVars.currentcityGovernorate){
                      $scope.register.governorateId=index.id;
                      return;
                      }
                      }
                      });
                      });
                      $scope.getareaslist=function(){
                      $ionicScrollDelegate.scrollTop();
                      $scope.seachdataclass=true;
                      $scope.citieshide=false;
                      $scope.hidecategories=true;
                      if($scope.register.governorateId ==1){
                      resourceRequistion.fetchgovernoratecity($scope.register.governorateId).then(function(data){
                      $scope.governorateareas=data.data;
                      });
                      }
                      },
                      $scope.clearareaclivk=function(){
                      $scope.selectgoverareaid=0;
                      $scope.selectgoverareaname="Area";
                      },
                      $scope.selectgoverarea=function(id,name){
                      $scope.selectgoverareaid=id;
                      sessionStorage.selectedcityid=$scope.selectgoverareaid;
                      $scope.selectgoverareaname=name;
                      $scope.hidecategories=false;
                      $scope.citieshide=true;
                      $scope.seachdataclass=true;
                       analytics.trackEvent('Business Events','Click on Area name','select area and close pop view',100);
                      };
                      $scope.getingfromlist=function(){
                      analytics.trackEvent('Business Events','Click on Back','Navigate to Previous view',100);
                      $state.go('menuView.listingView.categorytabs.search');
                      },
                      //get mobile categoieDD:
 // $scope.mobilecatimgs = [{name: "Restaurants ",logo:"img/catimgs/Restaurants.jpg",id:"87"},
 //
 //                                              {name: "Coffee Shops",logo:"img/catimgs/Coffee  Shops.jpg",id:"1071"},
 //
 //                                              {name: "Sheesha",logo:"img/catimgs/Shisha.jpg",id:"2444"},
 //
 //                                              {name: "Shopping",logo:"img/catimgs/Shopping.jpg",id:"2266"},
 //
 //                                              {name: "Beauty & Personal Care",logo:"img/catimgs/Beauty and Personal Care.jpg",id:"286"},
 //
 //                                              {name: "Hotels & Resorts",logo:"img/catimgs/Hotels & Resorts.jpg",id:"35"},
 //
 //                                              {name: "Entertainment",logo:"img/catimgs/Entertainment.jpg",id:"93"},
 //
 //                                              {name: "Travel",logo:"img/catimgs/Travel.jpg",id:"288"},
 //
 //                                              {name: "Adventure Sports",logo:"img/catimgs/Adventure Sports.jpg",id:"2102"},
 //
 //                                              {name: "Fitness",logo:"img/catimgs/Fitness.jpg",id:"290"},
 //
 //                                              {name: "ATM",logo:"img/catimgs/Atm.jpg",id:"1216"},
 //
 //                                              {name: "Exchange",logo:"img/catimgs/Exchange.jpg",id:"375"},
 //
 //                                              {name: "Hospitals & Clinics",logo:"img/catimgs/Hospitals and Clinics.jpg",id:"281"},
 //
 //                                              {name: "Handy Man",logo:"img/catimgs/Handyman.jpg",id:"274"},
 //
 //                                              {name: "Mobile",logo:"img/catimgs/Mobile.jpg",id:"2384"},
 //
 //                                              {name: "Petrol Pump",logo:"img/catimgs/Petrol Pump.jpg",id:"162"},
 //
 //                                              {name: "Mosque",logo:"img/catimgs/Mosque.jpg",id:"350"},
 //
 //                                              {name: "Cars ",logo:"img/catimgs/Cars.jpg",id:"1183"},
 //
 //                                              {name: "Taxi",logo:"img/catimgs/Taxi.jpg",id:"373"},
 //
 //                                              {name: "Government",logo:"img/catimgs/Government.jpg",id:"370"},
 //                                              ];


             $scope.mobilecatimgs = [

                                     {name: "Restaurants ",logo:"img/catimgs/Restaurants.jpg",id:"87" ,order:"1"},

                                     {name: "Coffee Shops",logo:"img/catimgs/Coffee  Shops.jpg",id:"1071" ,order :"2"},

                                     {name: "Sheesha",logo:"img/catimgs/Shisha.jpg",id:"2444" ,order:"3"},

                                     {name: "Beauty & Personal Care",logo:"img/catimgs/Beauty and Personal Care.jpg",id:"286" ,order:"4"},

                                     {name: "Fitness",logo:"img/catimgs/Fitness.jpg",id:"290",order:"5"},

                                     {name: "Hotels & Resorts",logo:"img/catimgs/Hotels & Resorts.jpg",id:"35",order:"6"},

                                     {name: "Entertainment",logo:"img/catimgs/Entertainment.jpg",id:"93",order:"7"},

                                     {name: "Shopping",logo:"img/catimgs/Shopping.jpg",id:"2266",order:"8"},

                                     {name: "Travel",logo:"img/catimgs/Travel.jpg",id:"288",order:"9"},

                                     {name: "Electronics",logo:"img/catimgs/Electronics.jpg",id:"89",order:"10"},

                                     {name: "Florist",logo:"img/catimgs/Florist.jpg",id:"310",order:"11"},

                                     {name: "Jewellery",logo:"img/catimgs/Jewellery.jpg",id:"492",order:"12"},

                                     {name: "Cars ",logo:"img/catimgs/Cars.jpg",id:"1183",order:"13"},

                                     {name: "Exchange",logo:"img/catimgs/Exchange.jpg",id:"375",order:"14"},

                                     {name: "Government",logo:"img/catimgs/Government.jpg",id:"370",order:"15"},

                                     {name: "Hospitals & Clinics",logo:"img/catimgs/Hospitals and Clinics.jpg",id:"281",order:"16"},

                                     {name: "Education",logo:"img/catimgs/Education.jpg",id:"91",order:"17"},

                                     {name: "Companies",logo:"img/catimgs/Companies.jpg",id:"3230",order:"18"},

                                     {name: "Communication",logo:"img/catimgs/Communication.jpg",id:"2626",order:"19"},

                                     {name: "Photography",logo:"img/catimgs/Photography.jpg",id:"335",order:"20"},


                                     ];
              var finalmcdata=$scope.mobilecatimgs;
                      // if(globalVars.Mobile_PopCat.length == 0){
 //                      resourceRequistion.fetchmobilecat().then(function(data){
 //                      var mcdata=data.data;
 //                      $scope.mobilecatdata=[];
 //                      angular.forEach(mcdata, function(v, k){
 //                      if(v.name ==finalmcdata[k]['name']){
 //                      mcdata[k].logo=finalmcdata[k]['img'];
 //                      }
 //                      });


 //                      $scope.mobilecategories = mcdata;
 //                      globalVars.Mobile_PopCat =mcdata;
 //                      $rootScope.miniLoader = false;
 //                      });
                      // }
                      // else{



                      // $scope.mobilecategories=globalVars.Mobile_PopCat;
                      // }
                      checkareavisible($rootScope);//chec
                      $scope.flashSearch = function(){
                      $rootScope.clearSearch = true;
                       analytics.trackEvent('Business Events','Click on Seaarch icon','Clear the search data',100);
                      },
                      //location icon click
                      $scope.getcurrentgover=function(){
                      cordovareturn.Getcurrentlocation();
                      },

    $scope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
    if(toState.name === 'menuView.listingView.categorytabs.search' || toState.name === 'menuView.listingView.categorytabs.b2b'){
              $scope.listingSet = '';
              $scope.citySet = '';
              $rootScope.clearSearch = true;
              stateStore = 'menuView.listingView.categorytabs.search';
              // analytics.trackEvent('Business Events','Click on search box','Navigate to business search view',100);
          }
          if(toState.name == 'menuView.listingView.tabs.recent'){
           analytics.trackEvent('Business Events','Click on Recent tab','open to Recent list view',100);
              $scope.loadComplete = false;
              currentView = 'recent';
              pageli=20;
              delegateStateEvent();
          }
          if(toState.name == 'menuView.listingView.tabs.nearby'){
           analytics.trackEvent('Business Events','Click on near by tab','open to near by list view',100);
              $scope.loadComplete = false;
              currentView = 'nearby';
              pageli=20;
              delegateStateEvent();
          }
          if(toState.name == 'menuView.listingView.tabs.ratings'){
          analytics.trackEvent('Business Events','Click on popular tab','open to popular list view',100);
              $scope.loadComplete = false;
              currentView = 'rating';
              pageli=20;
              delegateStateEvent();
          }
    });

       $scope.gotoListing = function(id){
       currentCatID = id;
       $rootScope.clearSearch = true;
       $rootScope.miniLoader = true;
       $scope.loadComplete = false;
       ProcessACRequests(id, 'rating');
        analytics.trackEvent('Business Events','Click on List Item','Navigate to Business list view',100);
       };
    //fetch more data more data
    $scope.limitarrload=function(){
    var returndata=filreddata.slice($scope.mainListings.length,pageli);
    pageli=pageli+20
    $scope.mainListings=$scope.mainListings.concat(returndata);
    };
    //filreddata
    $scope.fetchmoredata=function(e){
    $rootScope.miniLoader=true;
    resourceRequistion.fetchListingsAll(undefined, undefined, currentCatID,undefined, 'rating', undefined,pageli).then(function(data){
    pageli=pageli+20;
    if(typeof(data)=="object"){
    globalDataTemp.currentListings = data;
    var moredata = distanceInject(data);
    $scope.mainListings=$scope.mainListings.concat(moredata);
    $rootScope.miniLoader = false;
    $scope.loadComplete = true;
    }
    else{
    $scope.mainListings = [];
    $rootScope.miniLoader = false;
    androidServices.showToast('No Businesses found this category');
    }
    });
    //$scope.$broadcast('scroll.infiniteScrollComplete');
    }
    //subcategories
    $scope.gotosubCategories=function(data,from){
    globalVars.Categoryarr=data
    sessionStorage.searchtxt=data.name;
    $rootScope.miniLoader=true;
    resourceRequistion.fetchsubCats(globalVars.Categoryarr.id).then(function(data){
    $rootScope.miniLoader=false;
    if(typeof(data.data)=="string"){
    $scope.gotoListing(globalVars.Categoryarr.id);
    globalVars.PreviiousStatename=$rootScope.$viewHistory.currentView.stateName;
    }
    else{
    sessionStorage.cattype=from;
    globalVars.Subcategoriesdata=data.data;
    $state.go('menuView.b2b');
    }
    //$scope.subcategories=data.data;
    });
     analytics.trackEvent('Business Events','Click on Category name','Navigate to '+ data.name +' subcategory view',100);
    };
    $scope.gobacktoprevies=function(){
    if(globalVars.PreviiousStatename=="menuView.b2b"){
    $state.go(globalVars.PreviiousStatename);
    }
   else if(globalVars.PreviiousStatename=="menuView.BizSearch"){
   $state.go(globalVars.PreviiousStatename);
   }
   else{
   $state.go('menuView.listingView.categorytabs.search');
   if($scope.entersearchtext.length>2){
   $scope.seachdataclass=false;
   $scope.hidecategories=true;
   }
   else{
   $scope.seachdataclass=true;
   $scope.hidecategories=false;
   }
   }
    analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
   // $state.go('menuView.categorieslist');
   };
   $scope.gotoMainDetail = function(id){
   $rootScope.miniLoader = true;
   businessDetailData.fetchDetails(id,globalVars.userInfo.id).then(function (data) {
   globalDataTemp.setCurrentBID(id);
   globalDataTemp.setCurrentBusinessDetail(data.data[0]);
   $rootScope.miniLoader = false;
    analytics.trackEvent('Business Events','Click on business list','Navigate to Business detail view',100);
   $state.go('menuView.detailView');

   });
   };
    //Auto complete broadcast catcher (event broadcasted from auto complete plugin (custom changes))
    //DO NOT REMOVE cleanThisUp variable declaration , causes massive leak by jagadeesh
    var cleanThisUp = $rootScope.$on('listingClick', function(event, data){
    $rootScope.miniLoader = true;
    if(data.id == 'search'){
            //IF clicked item is business
    if(data.data.originalObject.type && data.data.originalObject.type == 'Business' && data.data.originalObject.business_id.length > 0){
    var tempHolder = data.data.originalObject.business_id;
    businessDetailData.fetchDetails(tempHolder,globalVars.userInfo.id).then(function (data) {
    globalDataTemp.setCurrentBID(tempHolder);
    globalDataTemp.setCurrentBusinessDetail(data.data[0]);
    $rootScope.miniLoader = false;
    $state.go('menuView.detailView');
    });
    }
        //IF clicked item is keyword
    if(data.data.originalObject.type && data.data.originalObject.type == 'Keyword' && data.data.originalObject.title.length > 0){
    //  $scope.listingSet = data.data.originalObject.title;
    $rootScope.miniLoader = false;
    //   $state.go('menuView.keywordlist');
    //  ProcessACRequests(undefined, currentView);
    }
    }
    if(data.id == 'cities'){
    $scope.citySet = data.data.title;
    ProcessACRequests(undefined, currentView);
    }
    });
    //Dispatches requests to services
   function ProcessACRequests(id, loadType){
      if(!$scope.listingSet && !$scope.citySet || $scope.listingSet.length === 0 && $scope.citySet.length === 0){
      if(typeof(id)==='object'){
      resourceRequistion.fetchListingsAll(undefined, undefined, undefined,id, loadType, undefined,0).then(function(data){
      if(processNullValues(data)){
      globalDataTemp.currentListings = data;
      globledatabiz=distanceInject(data);
      globalVars.subcategortybizdata=globledatabiz;
      $scope.moredatabtn=data.lengrh > 0?false:true;
      $rootScope.miniLoader = false;
      $scope.loadComplete = true;
       //One time event, going from cat page to listings event after data retrieval
      if(loadType === 'rating' && stateStore === 'menuView.listingView.categorytabs.search' || stateStore === 'menuView.listingView.categorytabs.b2b' ||stateStore==='menuView.categorieslist' ||$state.current.name === ''){
     state.go('menuView.BizListview');
      // $state.go('menuView.listingView.tabs.ratings');
       }
       }
       else{
       $scope.mainListings = [];
       $rootScope.miniLoader = false;
        }
        });
     }else{
            resourceRequistion.fetchListingsAll(undefined, undefined, id,undefined, loadType, undefined,0).then(function(data){
                if(processNullValues(data)){
                    globalDataTemp.currentListings = data;
                  //  $scope.mainListings = distanceInject(data);
                     globledatabiz=distanceInject(data);
//                       filreddata =  globledatabiz.sort(function(a, b){
//                        return sortingbasedontype(loadType,a,b) });
//                         filreddata.sort(function(a,b){
//                                                                        return b.is_premium-a.is_premium;
//                                                                        });
globalVars.subcategortybizdata=globledatabiz;
                     $scope.moredatabtn=data.lengrh > 0?false:true;
                    $rootScope.miniLoader = false;
                    $scope.loadComplete = true;

                  //One time event, going from cat page to listings event after data retrieval
                  if(loadType === 'rating' && stateStore === 'menuView.listingView.categorytabs.search' || stateStore === 'menuView.listingView.categorytabs.b2b' ||stateStore==='menuView.categorieslist' ||$state.current.name === ''){
                    //$state.go('menuView.listingView.tabs.recent');
                   //  $state.go('menuView.listingView.tabs.ratings');
$state.go('menuView.BizListview');
                  }
                }
                else{
                    $scope.mainListings = [];
                    $rootScope.miniLoader = false;
                }
            });}
        }
        //IF both city and keyword are present
        if($scope.listingSet.length > 0 && $scope.citySet.length > 0){
            resourceRequistion.fetchListingsAll($scope.listingSet, $scope.citySet, undefined,undefined, loadType, undefined,0).then(function(data){
                if(processNullValues(data)){
                    $scope.mainListings = distanceInject(data);
                    $scope.moredatabtn=data.lengrh > 0?false:true;
                    $rootScope.miniLoader = false;
                    $scope.loadComplete = true;
                    if(loadType === 'recent' && stateStore === 'menuView.listingView.categorytabs.search' || stateStore === 'menuView.listingView.categorytabs.b2b'){
                      $state.go('menuView.listingView.tabs.recent');
                    }
                }
                else{
                    $scope.mainListings = [];
                    $rootScope.miniLoader = false;
                }
            });
        }
        //IF only city's present
        if($scope.citySet.length > 0 && $scope.listingSet.length === 0){
            resourceRequistion.fetchListingsAll(undefined, $scope.citySet, undefined,undefined, loadType, undefined,0).then(function(data){
                if(processNullValues(data)){
                  $scope.mainListings = distanceInject(data);
                  $scope.moredatabtn=data.lengrh > 0?false:true;
                  $rootScope.miniLoader = false;
                  $scope.loadComplete = true;
                  if(loadType === 'recent' && stateStore === 'menuView.listingView.categorytabs.search' || stateStore === 'menuView.listingView.categorytabs.b2b'){
                    $state.go('menuView.listingView.tabs.recent');
                  }
                }
                else{
                    $scope.mainListings = [];
                    $rootScope.miniLoader = false;
                }
            });
        }
        //IF only keyword's present
        if($scope.listingSet.length > 0 && $scope.citySet.length === 0){
            resourceRequistion.fetchListingsAll($scope.listingSet, undefined, undefined,undefined, loadType, undefined,0).then(function(data){
                if(processNullValues(data)){
                $scope.mainListings = distanceInject(data);
                $scope.moredatabtn=data.lengrh > 0?false:true;
                $rootScope.miniLoader = false;
                $scope.loadComplete = true;
                if(loadType === 'recent' && stateStore === 'menuView.listingView.categorytabs.search' || stateStore === 'menuView.listingView.categorytabs.b2b'){
                  $state.go('menuView.listingView.tabs.recent');
                }
              }
              else{
                  $scope.mainListings = [];
                  $rootScope.miniLoader = false;
              }
          });
        }
    }
    //Checks for null value returns from server
    function processNullValues(returnedData){
        if(typeof(returnedData) == 'object'){
           return true;
        }
        else{
          return false;
        }
    }
    //Automates functions happening inbetween state transitions
    function delegateStateEvent(){
        $scope.mainListings = {};
        $rootScope.miniLoader = true;
        if(typeof currentCatID !== 'undefined'){
            ProcessACRequests(currentCatID, currentView);
        }
        else{
            ProcessACRequests(undefined, currentView);
        }
    }
    //Calculates distances between each listing lat, lng (VS) current lat, current lng and updates listings
    //Mandatory : gps coords from device
    function distanceInject(dataSet){
        angular.forEach(dataSet, function(v, k){
            var curLat = parseFloat(v.lat);
            var curLng = parseFloat(v.lng);

// $cordovaGeolocation.getCurrentPosition().then(function(position) {
//        $scope.curLat = position.coords.latitude;
//        $scope.curLng = position.coords.longitude;
//        globalVars.deviceLat = position.coords.latitude;
//        globalVars.deviceLng = position.coords.longitude;
//        geoCode.reverseFind(position.coords.latitude, position.coords.longitude).then(function(data){
//            $scope.autoLocation = data.data.results[0].address_components[1].long_name;
//        }, function(err){
//
//        });
//    }, function(err) {
//
//    });

           // dataSet[k].logo=$scope.imageurl+v.id+'_'+v.logo;
            if(curLat > 0 && curLng > 0){
                var dist = globalVars.calcDistance(curLat, curLng, parseFloat($scope.curLat), parseFloat($scope.curLng));
                dataSet[k].distance = (Math.round(dist * 10) / 10);
            }
            else{
                dataSet[k].distance = 99999;
            }
             dataSet[k].view_count = parseInt(v.view_count);
        });

       return dataSet;
    }

    $scope.$on('$destroy', function() {
        cleanThisUp();
    });
})
/*======================Business sub category controller=================================*/
.controller('subcategorycontroller', function($scope, $state, $ionicPlatform, $ionicViewService,androidServices, $cordovaGeolocation, geoCode, resourceRequistion, $timeout, globalVars, $rootScope, $ionicLoading, globalDataTemp, businessDetailData,cordovareturn,$ionicScrollDelegate,$http){
           analytics.trackView(globalVars.Categoryarr.name + 'SubCategory View');
           $scope.catlogoclass=sessionStorage.cattype=="popList"?true:false;
           var view_content_top = sessionStorage.cattype=="popList"?90+'px':336+'px';

           var view_content_top_1=  sessionStorage.cattype=="popList"?90+'px':308+'px';


           $("#subcategory_contentid").css('top',view_content_top);

           $(".platform-android4_4 #subcategory_contentid").css('top',view_content_top_1);


           if($scope.catlogoclass==true){
           $('.subcatclass').children('.list').css( "top", "96px" );
           }
           else{
           $('.subcatclass').children('.list').css( "top", "341px" );
           }
           $scope.seachdataclass=true;
           $scope.sampletxt='Res';
           $rootScope.miniLoader = false;
           $rootScope.setSearch = 'business';
           $scope.entersearchtext=globalVars.Categoryarr.name;
           var globledatabiz=[];
           var filreddata;
           $scope.logo=globalVars.Categoryarr.logo;
           $scope.subcategories=[];
           $scope.moredatabtn=true;
           var stateStore = $state.current.name;
           globalVars.PreviiousStatename=stateStore;
           $scope.gotohomeview=function(){
            analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
           $state.go($rootScope.$viewHistory.backView.stateName);
           };
           if(globalVars.Subcategoriesdata != undefined && globalVars.Subcategoriesdata.length>0){
           $scope.subcategories=globalVars.Subcategoriesdata;
           }
           else{
           resourceRequistion.fetchsubCats(globalVars.Categoryarr.id).then(function(data){
           $scope.subcategories=data.data;
           globalVars.Subcategoriesdata=data.data;
           });
           }
           $scope.setBackAction=function(){
           analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
           $state.go($rootScope.$viewHistory.backView.stateName);
           };
           $scope.gotolisting=function(cid,type,name){
           sessionStorage.searchtxt=type=="sub"?name:globalVars.Categoryarr.name;
           analytics.trackEvent('Business Events','Click on Category Name','Navigate to '+ name +'Category Business listview' ,100);
           var id=cid==0?globalVars.Categoryarr.id:cid;
           currentCatID = id;
            // $state.go('menuView.listingView.tabs.ratings');
            //}
            $rootScope.clearSearch = true;
            $rootScope.miniLoader = true;
            $scope.loadComplete = false;
            loadType='rating';
            resourceRequistion.fetchListingsAll(undefined, undefined, id,undefined, 'rating', undefined,0).then(function(data){
            if(processNullValue(data)){
            globalDataTemp.currentListings = data;
            globledatabiz=distanceInject(data);
            globalVars.subcategortybizdata=globledatabiz;
            $scope.moredatabtn=data.lengrh > 20 ? false:true;
            $rootScope.miniLoader = false;
            $scope.loadComplete = true;
            //One time event, going from cat page to listings event after data retrieval
            if(loadType === 'rating' && stateStore === 'menuView.listingView.categorytabs.search' || stateStore === 'menuView.b2b' ||stateStore==='menuView.categorieslist' ||$state.current.name === ''){
            // $state.go('menuView.listingView.tabs.ratings');
            $state.go('menuView.BizListview');
             }
             }
             else{
             $scope.mainListings = [];
             $rootScope.miniLoader = false;
             androidServices.showToast('No Businesses found this category');
             }
             });

             };
             function distanceInject(dataSet){
             angular.forEach(dataSet, function(v, k){
             var curLat = parseFloat(v.lat);
             var curLng = parseFloat(v.lng);
             if(curLat > 0 && curLng > 0){
             var dist = globalVars.calcDistance(curLat, curLng, parseFloat(globalVars.currentlat), parseFloat(globalVars.currentlng));
             dataSet[k].distance = (Math.round(dist * 10) / 10);
             }
             else{
             dataSet[k].distance = 99999;
             }
              dataSet[k].view_count = parseInt(v.view_count);
             });

             return dataSet;
             }
             function processNullValue(returnedData){
             if(typeof(returnedData) == 'object'){
             return true;
             }
             else{
             return false;
             }
             }
             $scope.subcategorysearchboxclick=function(){
             analytics.trackEvent('Business Events','Click on search box','Navigate to business search view',100);
             $state.go('menuView.BizSearch');
             };
             })

/*=====================Business Search controller===========================================*/
.controller('BizSearchcontroller', function($scope, $state, $ionicModal,$ionicPlatform, $ionicViewService, $cordovaGeolocation, geoCode, resourceRequistion, $timeout,$interval, globalVars, $rootScope, $ionicLoading, globalDataTemp, businessDetailData,cordovareturn,$ionicScrollDelegate,$http,androidServices ){

         //   alert(typeof(sessionStorage.selectedcityid));
             analytics.trackView('Business Search View');
             cordova.plugins.Keyboard.show();
               $scope.list_Loadmore_count=25;
             $scope.selectgoverareaid=sessionStorage.selectedcityid==undefined?0:parseInt(sessionStorage.selectedcityid);
             $scope.selectgoverareaname= sessionStorage.selectedcityname==undefined?"Area": sessionStorage.selectedcityname;
             $scope.sampletxt='Res';
             $rootScope.miniLoader = false;
             $rootScope.setSearch = 'business';
             $scope.autoLocation = '';
             $scope.returnedSearch = {};
             $scope.searchTerm = '';
             $scope.check_error="right";
             $scope.hidecategories=false;//home categories hide name default its false
             $scope.citieshide=true;//this for area listview default its true
             var rootingobj=$rootScope;
             var stateStore = $state.current.name;
             $scope.searchresultdatas=[];
             var globledatabiz=[];
             var filreddata;
             $scope.entersearchtext=globalVars.searchKeyvalue;
             if(globalVars.searchKeyvalue.length>2){
             $scope.searchresultdatas=globalVars.Searchobj;
             }
             //get Governorates list for search
             $scope.register = {};
             $scope.register.governorates=[];
             $scope.register.governorateId = sessionStorage.currentgovenorate==undefined?'0':sessionStorage.currentgovenorate;
             if($scope.register.governorates.length >0 ){
             $scope.register.governorateId = sessionStorage.currentgovenorate==undefined?'0':sessionStorage.currentgovenorate;
             angular.forEach($scope.register.governorates,function(index,key){
             if(globalVars.currentcityGovernorate!=""){
             if(index.id==$scope.register.governorateId){
             $scope.register.governorateId=index.id;
             if($scope.register.governorateId==0){
             $scope.zerogovernorate=true;
             }
             else{
             $scope.zerogovernorate=false;
             }
            return;
            }
            }
            });
            }
            else{
            resourceRequistion.fetchgovernorateslist().then(function(data){

            $scope.register.governorates=data;
            angular.forEach($scope.register.governorates,function(index,key){
            if(globalVars.currentcityGovernorate!=""){
            if(index.alias_name==globalVars.currentcityGovernorate){
            $scope.register.governorateId=sessionStorage.currentgovenorate==undefined?index.id:sessionStorage.currentgovenorate;
            if($scope.register.governorateId==0){
            $scope.zerogovernorate=true;
            }
            else{
            $scope.zerogovernorate=false;
            }
            }
            }
            });
            });
            }
            $scope.hidelists=function(){
            $scope.seachdataclass=true;
            $scope.hidecategories=false;
            $scope.citieshide=true;
             analytics.trackEvent('Business Events','Click on Back icon','Reset Previous Data',100);
            },
            $scope.searcherrorlist=true;
            var globledatabiz=[];
            $scope.curLat = '';
            $scope.curLng = '';
           $cordovaGeolocation.getCurrentPosition().then(function(position) {
           $scope.curLat = position.coords.latitude;
           $scope.curLng = position.coords.longitude;
           globalVars.deviceLat = position.coords.latitude;
           globalVars.deviceLng = position.coords.longitude;
           geoCode.reverseFind(position.coords.latitude, position.coords.longitude).then(function(data){
           $scope.autoLocation = data.data.results[0].address_components[1].long_name;
           }, function(err){
           });
           }, function(err) {
           });
           $scope.searchkeyupbtn=function(){
           globalVars.searchKeyvalue=$scope.entersearchtext;
           if($scope.entersearchtext.length<3){
           $scope.seachdataclass=true;
           $scope.hidecategories=false;
           }
           else{
           $scope.list_Loadmore_count=25;
           sessionStorage.searchtxt=$scope.entersearchtext;
           $ionicScrollDelegate.scrollTop();
           $scope.seachdataclass=false;
           $scope.hidecategories=true;
           $scope.citieshide=true;
           if($scope.register.governorateId==0){
           $rootScope.miniLoader = true;
           resourceRequistion.fetchcatbusiness($scope.entersearchtext).then(function(data){
           $rootScope.miniLoader = false;
           var resultdata=data.data;
           $scope.check_error="error";
           var finalresult=null;
           resultdata.sort(function(a, b) {
           return compareStrings(a.title, b.title);
           });
           if(data.data.length >0){
           startwithtext(resultdata,$scope,$scope.entersearchtext,globalVars,$rootScope);
           }
           else{
           androidServices.showToast('No result found.....');
           var user_id = globalVars.userInfo.id != undefined ? globalVars.userInfo.id : "";
            var city_name = "";
           resourceRequistion.BusinessSearchResult($scope.entersearchtext,user_id,city_name).then(function(data){


           });

           }
           document.activeElement.blur();
           });
           $(".search_class").show();
            analytics.trackEvent('Business Events','Click on Seach icon','Show search text'+ '('+$scope.entersearchtext +') List view',100);
           }
           else{
           $rootScope.miniLoader = true;
           var searchqueryinput=$scope.register.governorateId+"/"+$scope.selectgoverareaid+"/"+$scope.entersearchtext;
           resourceRequistion.searchquerybizlist(searchqueryinput).then(function(data){
           $rootScope.miniLoader = false;
           var resultdata=data.data;
           var finalresult=null;
           if(typeof(resultdata)=="object"){
           $scope.searcherrorlist=true;
           globalDataTemp.currentListings = resultdata;
           globledatabiz=distanceadd(resultdata);
           globalVars.subcategortybizdata=globledatabiz;
           $state.go('menuView.BizListview');
           $scope.check_error="right";
           analytics.trackEvent('Business Events','Click on Seach icon','Naviagate to '+ $scope.entersearchtext+ 'Business list view',100);

           }
           else{
           $scope.searchresultdatas=[];
           $scope.searcherrorlist=false;
           androidServices.showToast('No result found.....');
           var user_id = globalVars.userInfo.id != undefined ? globalVars.userInfo.id : "";
          // alert($scope.selectgoverareaname);
          var city_name = $scope.selectgoverareaname == "Area" ? "" : $scope.selectgoverareaname;

                      resourceRequistion.BusinessSearchResult($scope.entersearchtext,user_id,city_name).then(function(data){


                      });
           }
           document.activeElement.blur();
           });
           }
           }
           };
           $scope.searchkeyup=function(event){
           if(event.keyCode==13){
           $scope.searchkeyupbtn();
           $(".search_class").show();
           }
           else{
           $(".search_class").hide();
           }
           },
           $scope.businessdetailsclick=function(data){
           var tempHolder =data.business_id;
           businessDetailData.fetchDetails(tempHolder,globalVars.userInfo.id).then(function (data) {
           globalDataTemp.setCurrentBID(tempHolder);
           globalDataTemp.setCurrentBusinessDetail(data.data[0]);
           $rootScope.miniLoader = false;
            analytics.trackEvent('Business Events','Click search list item','Navigate to '+ data.title+ ' Business detail view' ,100);
           $state.go('menuView.detailView');

           });
           },
           $scope.tagbusinesslist=function(data){
           sessionStorage.searchtxt=data.title;
           globalVars.PreviiousStatename=stateStore;
           if(data.type=='Category'){
           if(data.parent =='0'){
           sessionStorage.cattype="popList";
           globalVars.Categoryarr.name=data.title;
           globalVars.Categoryarr.logo="";
           globalVars.Categoryarr.id=data.business_id;
           resourceRequistion. fetchsubCats(globalVars.Categoryarr.id).then(function(data){
           if(typeof(data.data)=="string"){
           $scope.gotoListing(globalVars.Categoryarr.id);
           globalVars.PreviiousStatename=$rootScope.$viewHistory.currentView.stateName;
           }
           else{
           globalVars.Subcategoriesdata=data.data;
            analytics.trackEvent('Business Events','Click search list item','Navigate to '+ data.title+ ' subcategory view' ,100);

           $state.go('menuView.b2b');
           }
           //$scope.subcategories=data.data;
           });
           }
           else{
           $scope.seachdataclass=true;
           currentCatID = data.business_id;
           $rootScope.clearSearch = true;
           $rootScope.miniLoader = true;
           $scope.loadComplete = false;
           loadType='rating';
           resourceRequistion.fetchListingsAll(undefined, undefined, currentCatID,undefined, 'rating', undefined,0).then(function(data){
           if(processNullValue(data)){
           globalDataTemp.currentListings = data;
           globledatabiz=distanceInject(data);
           globalVars.subcategortybizdata=globledatabiz;
           $scope.moredatabtn=data.lengrh > 20 ? false:true;
           $rootScope.miniLoader = false;
           $scope.loadComplete = true;
            analytics.trackEvent('Business Events','Click search list item','Navigate to '+ data.title+ ' Business list view' ,100);

           $state.go('menuView.BizListview');
           }
           else{
           $scope.mainListings = [];
           $rootScope.miniLoader = false;
           androidServices.showToast('No Businesses found this category');
           }
           });
           }
           }
           else{
           $scope.seachdataclass=true;
           var tagdata=[];
           tagdata.id=data.business_id;
           tagdata.governorateid=$scope.register.governorateId;
           tagdata.cityid=$scope.selectgoverareaid;
           currentCatID = tagdata;
           $rootScope.clearSearch = true;
           $rootScope.miniLoader = true;
           $scope.loadComplete = false;
           loadType='rating';
           resourceRequistion.fetchListingsAll(undefined, undefined, undefined,tagdata, 'rating', undefined,0).then(function(data){
           if(processNullValue(data)){
           globalDataTemp.currentListings = data;
           globledatabiz=distanceInject(data);
           globalVars.subcategortybizdata=globledatabiz;
           $scope.moredatabtn=data.lengrh > 20 ? false:true;
           $rootScope.miniLoader = false;
           $scope.loadComplete = true;
           $state.go('menuView.BizListview');
           }
           else{
           $scope.mainListings = [];
           $rootScope.miniLoader = false;
           androidServices.showToast('No Businesses found this category');
           }
           });
           }
           function distanceInject(dataSet){
           angular.forEach(dataSet, function(v, k){
           var curLat = parseFloat(v.lat);
           var curLng = parseFloat(v.lng);
           if(curLat > 0 && curLng > 0){
           var dist = globalVars.calcDistance(curLat, curLng, parseFloat(globalVars.currentlat), parseFloat(globalVars.currentlng));
           dataSet[k].distance = (Math.round(dist * 10) / 10);
           }
           else{
           dataSet[k].distance = 99999;
           }
            dataSet[k].view_count = parseInt(v.view_count);
           });
           return dataSet;
           }
           //Checks for null value returns from server
           function processNullValue(returnedData){
           if(typeof(returnedData) == 'object'){
           return true;
           }
           else{
           return false;
           }
           }
           },
           $scope.getcurrentgover=function(){
           $scope.searchresultdatas=[];
           $scope.selectgoverareaid=0;
           $scope.selectgoverareaname="Area";
           sessionStorage.currentgovenorate=$scope.register.governorateId;
           if($scope.register.governorateId==0){
           $scope.zerogovernorate=true;
           $scope.class = "angucomplete-normal";
           }
           else{
           $scope.zerogovernorate=false;
           }
            analytics.trackEvent('Business Events','Click on governate select','change governate from list',100);
           };
           $scope.citySet = '';
           $scope.listingSet = '';
           var functionalBlock = 0;
           // $scope.curLat = '';
           // $scope.curLng = '';
           $scope.imgbaseURL = globalVars.catImgURL;                      //Slider data (ng-repeat)
           $scope.mainListings = globalDataTemp.currentListings || [];    //Listings in listing view loaded into this (ng-repeat data)
           $scope.loadComplete = false;
           var currentView = 'recent';
           var stateStore = $state.current.name;
           $scope.searchfield=true;
           //modal view cretated
           $ionicModal.fromTemplateUrl('governoratecities.html', {
           scope: $scope,
           animation: 'slide-in-up'
           }).then(function(modal) {
           $scope.modal = modal;
           });
           $scope.getareaslist=function(){
           $ionicScrollDelegate.scrollTop();
          // alert($scope.register.governorateId+"__search");
           resourceRequistion.fetchgovernoratecity($scope.register.governorateId).then(function(data){
           $scope.governorateareas=data.data;
           });
           $scope.modal.show();
            analytics.trackEvent('Business Events','Click on Area','open selected governate cities list',100);
           },
           $scope.changegovernate=function(){
                                 $scope.searchresultdatas=[];
                                 $scope.selectgoverareaid=0;
                                 $scope.selectgoverareaname="Area";
                                // alert($scope.register.governorateId);
                                sessionStorage.currentgovenorate=$scope.register.governorateId;
                                // sessionStorage.selectedcityid=$scope.register.governorateId;
                                 if($scope.register.governorateId==0){
                                 $scope.zerogovernorate=true;
                                 $scope.class = "angucomplete-normal";
                                 }
                                 else{
                                 $scope.zerogovernorate=false;
                                 resourceRequistion.fetchgovernoratecity($scope.register.governorateId).then(function(data){
                                 $scope.governorateareas=data.data;
                                 });
                                 }
                                 analytics.trackEvent('Business Events','Click on governate select','change governate from list',100);
                                 },
           $scope.clearareaclivk=function(){
           $scope.selectgoverareaid=0;
           $scope.selectgoverareaname="Area";
            analytics.trackEvent('Business Events','Click on cities pop back','Reset to previous',100);
           },
           $scope.selectgoverarea=function(id,name){
           $scope.selectgoverareaid=id;
           sessionStorage.selectedcityid=$scope.selectgoverareaid;
           $scope.selectgoverareaname=name;
           sessionStorage.selectedcityname=name;
           $scope.modal.hide();
            analytics.trackEvent('Business Events','Click on Area name','select area and close pop view',100);
           },
           $scope.cityclosemodalview=function(){
           $scope.modal.hide();
           $scope.clearareaclivk();
           $scope.selectgoverareaid=0;
           sessionStorage.selectedcityid=0;
           sessionStorage.selectedcityname="";
           $scope.selectgoverareaname="";
          // $scope.postmodel={};

          $scope.postreset();
            analytics.trackEvent('Business Events','Click on close',' close cities  pop view',100);
           },
           //State transition logic
           $scope.flashSearch = function(){
           $rootScope.clearSearch = true;
           },
          //location icon click
          $scope.getcurrentgover=function(){
           analytics.trackEvent('Business Events','Click on Location icon','Get the Current user governate',100);
          cordovareturn.Getcurrentlocation();
          },
          $scope.gotoMainDetail = function(id){
          $rootScope.miniLoader = true;
          businessDetailData.fetchDetails(id,globalVars.userInfo.id).then(function (data) {
          globalDataTemp.setCurrentBID(id);
          globalDataTemp.setCurrentBusinessDetail(data.data[0]);
          $rootScope.miniLoader = false;
          $state.go('menuView.detailView');
          });
          };
          $scope.setbackview=function(){
          globalVars.searchKeyvalue="";
          globalVars.Searchobj=[];
          var prevstate= $rootScope.$viewHistory.backView.stateName;
          if(prevstate=='menuView.listingView.tabs.ratings' || prevstate== 'menuView.listingView.tabs.recent'|| prevstate=='menuView.listingView.tabs.nearby'){
          $state.go('menuView.listingView.categorytabs.search');
          }
          //$state.go('menuView.listingView.tabs.ratings');
          else{
          $state.go($rootScope.$viewHistory.backView.stateName);
          }
          cordova.plugins.Keyboard.close();
          analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
          };
          $ionicPlatform.onHardwareBackButton(function(event){});
          function distanceadd(dataSet){
          angular.forEach(dataSet, function(v, k){
          var curLat = parseFloat(v.lat);
          var curLng = parseFloat(v.lng);
          if(curLat > 0 && curLng > 0){
          var dist = globalVars.calcDistance(curLat, curLng, parseFloat($scope.curLat), parseFloat($scope.curLng));
          dataSet[k].distance = (Math.round(dist * 10) / 10);
          }
          else{
          dataSet[k].distance =99999;
          }
          });
          return dataSet;
          }


          $scope.searchlistloadmore=function(){
                       $scope.list_Loadmore_count=$scope.list_Loadmore_count+25;
                       $scope.$broadcast('scroll.infiniteScrollComplete');
                        };


          })

/*==========================Business List controller===============================================*/
.controller('Bizlistviewcontroller',function($scope, $state, $ionicModal,$ionicPlatform, $ionicViewService, $cordovaGeolocation, geoCode, resourceRequistion, $timeout,$interval, globalVars, $rootScope, $ionicLoading, globalDataTemp, businessDetailData,cordovareturn,$ionicScrollDelegate,$http,androidServices ){
              analytics.trackView(sessionStorage.searchtxt+'Popular Business list view');
              $scope.entersearchtxt=sessionStorage.searchtxt;
              $ionicScrollDelegate.scrollTop();
              var bizlistdata=globalVars.subcategortybizdata;
              if(bizlistdata.length>20){
              $('.loadmorelistclass').show();
              }
              else{
              $('.loadmorelistclass').hide();
              }
              //bar buttons click event
              $scope.loadtype="rating";
              var defaultlistlimitcount=20;
              $scope.mainListings==[];
              $scope.imageurl=globalVars.MainklURl+'img/BusinessLogo/logo_folder/';
              var uniqueBizdata = [];
              if($scope.loadtype=='rating'){

              slicing($scope.loadtype);
              }
              $scope.bizlistsortbybuttonclick=function(type,event){
              $ionicScrollDelegate.scrollTop();
              var tabname=type == 'rating'? 'popular' : type;
               analytics.trackEvent('Business Events','Click on '+tabname + 'tab','open '+tabname+ ' business list view',100);
               analytics.trackView(sessionStorage.searchtxt+' '+ tabname +' Business list view');
              $('.barbuttonselted').removeClass('barbuttonselted');
              $(event.target).addClass('barbuttonselted');
              if(bizlistdata.length>20){
              $('.loadmorelistclass').show();
              }
              else{$('.loadmorelistclass').hide();
              }
              slicing(type);
              if(type=="rating"){
              $('.ratinglist').show();
              $('.nearlist,.recentlist').hide();
              defaultlistlimitcount=20;
              }
              else if(type=="near"){
              $('.nearlist').show()
              $(".ratinglist,.recentlist").hide();
              defaultlistlimitcount=20;
              }
              else if(type=="recent"){
              $('.recentlist').show()
              $(".ratinglist,.nearlist").hide();
              defaultlistlimitcount=20;
              }
              };
              function slicing(type){
              bizlistdata.sort(function(a,b){
              return sortingbasedontype(type,a,b);
              });
              if(type !="near"){
              bizlistdata.sort(function(a,b){return b.is_premium - a.is_premium });
              }
              $.each(bizlistdata, function(i, el){
              if($.inArray(el, uniqueBizdata) === -1) uniqueBizdata.push(el);
              });
              var slicecount=bizlistdata.length>20?20: bizlistdata.length;
              $scope.mainListings=bizlistdata.slice(0,slicecount);
              $ionicScrollDelegate.scrollTop();
              }
              $scope.limitarrload=function(){
              defaultlistlimitcount=defaultlistlimitcount+20;
              var returndata=bizlistdata.slice($scope.mainListings.length,defaultlistlimitcount);
              $scope.mainListings=$scope.mainListings.concat(returndata);
              if($scope.mainListings.length==bizlistdata.length){
              $('.loadmorelistclass').hide();
              }
              else{
              $('.loadmorelistclass').show();
              }
              };
              $scope.limitarrloadScroll=function(){
              defaultlistlimitcount=defaultlistlimitcount+20;
              var returndata=bizlistdata.slice($scope.mainListings.length,defaultlistlimitcount);
              $scope.mainListings=$scope.mainListings.concat(returndata);
              $scope.$broadcast('scroll.infiniteScrollComplete');
              };
              $scope.gotoMainDetail = function(id,title){
              $rootScope.miniLoader = true;

              businessDetailData.fetchDetails(id,globalVars.userInfo.id).then(function (data) {
              globalDataTemp.setCurrentBID(id);
              globalDataTemp.setCurrentBusinessDetail(data.data[0]);
              $rootScope.miniLoader = false;
               analytics.trackEvent('Business Events','Click on Business list item','Navigate to '+title+' Detail view',100);
              $state.go('menuView.detailView');
              });
              };
              $scope.fastTrack = function(id, warpLocation,title){
              var stateSet = '';
              var dData = {};
              $rootScope.miniLoader = true;
              businessDetailData.fetchDetails(id,globalVars.userInfo.id).then(function (data) {
              globalDataTemp.setCurrentBID(id);
              globalDataTemp.setCurrentBusinessDetail(data.data[0]);
              dData = globalDataTemp.currentBusinessDetail;
              $rootScope.miniLoader = false;
              if(warpLocation === 'fav'){
               analytics.trackEvent('Business Events','Click on favorite icon','if user loggin favorite selected '+title +' Business to favorite list otherwsie navigate to login view',100);
              if(globalVars.userInfo.id == undefined){
              globalVars.loginstatus="notlogged";
              globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
              $state.go('loginView');
              }
              else{
              resourceRequistion.updatefavbus(id,globalVars.userInfo.id).then(function(data){
              var dt=data.data;
              androidServices.showToast(data.data);
              });
              }
              }
              if(warpLocation === 'rate'){
               analytics.trackEvent('Business Events','Click on Rate icon','if user loggin rate selected '+title +' Business otherwsie navigate to login view',100);

              globalVars.LTD_switch = 'listing';
              businessDetailData.fetchRatings(id).then(function(data){
              globalDataTemp.setCurrentBusinessRating(dData.business_ratings);
              $state.go('menuView.ratings');
              });
              }
              if(warpLocation === 'locate'){
              if(dData.Address){
               //Strips the special characters and arranges them in a comma sep format for native google maps
                var titleOrig = dData.title;
                var cityOrig = dData.Address.governorate_name;
                if(titleOrig.indexOf('-') !== -1){
                titleOrig = titleOrig.substring(0, titleOrig.indexOf('-'));
                }
                if(cityOrig.indexOf('(') !== -1){
                cityOrig = cityOrig.substring(0, cityOrig.indexOf('('));
                }
                $scope.geo_directions = 'https://maps.google.com/?q=' + dData.Address.lat + ',' + dData.Address.lng;
                globalVars.currentReqLat = dData.Address.lat;
                globalVars.currentReqLng = dData.Address.lng;
                tempDistance = globalVars.calcDistance(dData.Address.lat, dData.Address.lng, globalVars.deviceLat, globalVars.deviceLng);
                $scope.distance = (Math.round(tempDistance * 10) / 10);
                window.open($scope.geo_directions,'_system');
                }
                }
                if(warpLocation === 'enquire'){
                globalVars.LTD_switch = 'listing';
                $state.go('menuView.Enquiry');
                }
               //
               });
               };
               $scope.gotohomeview=function(){
                analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
               $state.go($rootScope.$viewHistory.backView.stateName);
               };
               $scope.searchfiledclickd=function(){
               analytics.trackEvent('Business Events','Click on search box','Navigate to business search view',100);
               $state.go('menuView.BizSearch');
               };
               })


.controller('detailController', function($scope,$rootScope, $state,$ionicSlideBoxDelegate, $timeout,$interval, businessDetailData,resourceRequistion , $ionicSlideBoxDelegate, globalDataTemp, globalVars,cordovareturn,$cordovaSocialSharing,androidServices,$ionicPopover,$http,$cordovaInAppBrowser,$ionicPopup,$ionicModal,$ionicScrollDelegate,$ionicPlatform){
               scrollreset();
               function scrollreset(){
               $ionicScrollDelegate.scrollTop();
               }

               $scope.showmore_text='more';
               $scope.showmoretoll_text='more';
               $scope.showmorefax_text='more';
               $scope.showmoremail_text='more';

               $scope.logourl=globalVars.userLogoFolder;
               $scope.detailData = globalDataTemp.currentBusinessDetail;   //Loads all the detail data from SVC
               $scope.detailviewratelength=$scope.detailData.Business_reviews || ""; //for this getting null so convert to empty string
               $scope.bizrating=parseInt($scope.detailData.business_ratings);
               var businessIDStore = parseInt(globalDataTemp.currentBusinessID);     //Current business id fetched from global service
               analytics.trackView("Business Detail view of "+$scope.detailData.title);
               /*=======================Favorite checking=============================*/
               resourceRequistion.favChecINDetailview(businessIDStore,globalVars.userInfo.id).then(function(data){
               var dt=data.data.trim("");
               $scope.isfavselet= dt == "0"  ? false :true;
                });
                /*======================about Rating icon disply=========================*/
                if($scope.bizrating>0){
                $scope.basedonrate=true;
                $scope.otherratng=false;
                }
                else{
                $scope.basedonrate=false;
                $scope.otherratng=true;
                }
                /*=================about Favorite icon display============================*/
                if(parseInt($scope.detailData.isfav)==0){
                $('#isfavid').addClass('isfavfalsecls');
                }
                else{
                $('#isfavid').addClass('isfavtruecls');
                }
                var temp_BizEmail=$scope.detailData.email || "";//hold the business email id
                sessionStorage.owntoemail=temp_BizEmail; // purrpose for own this
                globalVars.LTD_switch = 'listing'; //Switches back state functionality for sub states
                $scope.tabPage = 0;
                $scope.businessRating = $scope.detailData.business_ratings; //Rating holder
                $scope.imgData = [];
                $scope.distance = null;
                $scope.nullStateData = {};
                $scope.BizOPenstaus="";
                if($scope.detailData.business_ratings && $scope.detailData.business_ratings.length > 0){
                globalVars.setCurrentBusinessRating($scope.detailData.business_ratings);
                }
                //logo insert into slider
                $scope.bizlogoimg="";
                if($scope.detailData.logo){
                var pasta = globalVars.MainklURl+'img/BusinessLogo/logo_folder/' + businessIDStore + '_' + $scope.detailData.logo;
                $scope.bizlogoimg=pasta;
                var cuurentdate="";
                }
                //images insert into slider
                if($scope.detailData.Business_imageCount > 0  ){
                angular.forEach($scope.detailData.Business_image, function(v, k){
                var glue = globalVars.rawImgURL;
                var cuurentdate="";
                $scope.imgData.push({image : glue + v.dir + '/' + v.name,username:v.username,Created:dateforimate(v.Created),gallery_thumbnail:glue+v.Thumbnail_path});
                globalVars.Biz_images.push({image : glue + v.dir + '/' + v.name,username:v.username,Created:dateforimate(v.Created),gallery_thumbnail:glue+v.Thumbnail_path});
                });
                }
                else{
                globalVars.Biz_images=[];
                }
                $scope.publicGalleryImages = [];
                $scope.galleryurl=globalVars.MainklURl+"img/";
                getAllImages();
                function getAllImages(){
                businessDetailData.getPublicGallery().success(function(data){
                if(typeof(data) === 'object'){
                $scope.publicGalleryImages = data;
                if($scope.publicGalleryImages.length>0){
                angular.forEach($scope.publicGalleryImages, function(v, k){
                var glue = globalVars.rawImgURL;
                if(v.dir == undefined){
                $scope.imgData.push({image : glue + '/' + v.image_url,username:v.username,Created:dateforimate(v.Created),gallery_thumbnail:glue+v.Thumbnail_path});
                }
                else{
                $scope.imgData.push({image : glue + v.dir + '/' + v.image_url,username:v.username,Created:dateforimate(v.Created),gallery_thumbnail:glue+v.Thumbnail_path});
                }
                });
                }


                }
                });
                }
                $ionicPopover.fromTemplateUrl('imgagelrge.html', {
                scope: $scope
                }).then(function(popover) {
                $scope.popover = popover;
                });
                 var images=$scope.imgData;
                 globalVars.bizgalleryimgarr=images;//bizgallery images
                 $scope.imglargeclick=function(event){
                 $scope.popover.show();
                 $scope.ionicPopover_staus=true;
                 analytics.trackEvent('Business Events','Click on business logo','Open image enlarge view with selected image ',100);
                 };
                 $scope.slideVisible = function(index){
                 if(  index < $ionicSlideBoxDelegate.currentIndex() -1 || index > $ionicSlideBoxDelegate.currentIndex() + 1){
                 return false;
                 }
                 return true;
                 };
                 var popcount=0;
                 $scope.popimagewipe=function(){
                 $scope.popimage=$scope.imgData[popcount+1]['image'];
                 };
                 $scope.popimagewiperight=function(){
                 $scope.popimage=$scope.imgData[popcount-1]['image'];
                 };
                 $scope.detailimg={};
                 $scope.opacityimg="www/img/verified.png";
                 var i=0;
                 //Initialization function
                 init();
                 $scope.detailendquert=function(bizemail){
                 analytics.trackEvent('Business Events','Click on Send Enquiry','if user loggin  navigate to Business enquiry view  otherwise navigate login view',100);
                 sessionStorage.bizemail=bizemail;
                 if(globalVars.userInfo.id == undefined){
                 globalVars.loginstatus="notlogged";
                 globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
                 $state.go('loginView');
                 }
                 else{
                 $state.go('menuView.Enquiry');
                 }
                 },
                 $scope.phonecall=function(num){
                 analytics.trackEvent('Business Events','Click on Number','Make call to clicked ' +num ,100);
                 var numberis= "tel:"+num;
                 window.open(numberis);
                 },
                 $scope.setBackAction = function(){
                 $ionicScrollDelegate.scrollTop();
                 globalVars.biz_favCheck=0;
                 analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
                 $state.go($rootScope.$viewHistory.backView.stateName);
                 };
                 function init(){
                 // Disable / Enable feature butons based on detail data availability
                 businessDetailData.fetchInnerDetail(businessIDStore).then(function(data){
                 $scope.nullStateData = data;
                 $scope.BizOPenstaus=data.business_timings=='none'?'closed ':bizopenstatus(data.business_timings,$scope.detailData.is_24by7);
                 });
                 businessDetailData.fetchRatings(businessIDStore).then(function(data){});
                 globalDataTemp.setCurrentBusinessRating($scope.detailData.business_ratings);
                 var tempDistance = null;
                 if($scope.detailData.Address){
                 //Strips the special characters and arranges them in a comma sep format for native google maps
                 var titleOrig = $scope.detailData.title;
                 var cityOrig = $scope.detailData.Address.governorate_name;
                 if(titleOrig.indexOf('-') !== -1){
                 titleOrig = titleOrig.substring(0, titleOrig.indexOf('-'));
                 }
                 if(cityOrig.indexOf('(') !== -1){
                 cityOrig = cityOrig.substring(0, cityOrig.indexOf('('));
                 }
                 $scope.geo_directions = 'https://maps.google.com/?q=' + $scope.detailData.Address.lat + ',' + $scope.detailData.Address.lng;
                 globalVars.currentReqLat = $scope.detailData.Address.lat;
                 globalVars.currentReqLng = $scope.detailData.Address.lng;
                 var curLat = parseFloat(globalVars.currentReqLat);
                 var curLng = parseFloat(globalVars.currentReqLng);
                 if(curLat > 0 && curLng > 0){
                 tempDistance = globalVars.calcDistance(curLat, curLng, parseFloat(globalVars.deviceLat), parseFloat(globalVars.deviceLng));
                 $scope.distance = (Math.round(tempDistance * 10) / 10);
                 }
                 else{
                 $scope.distance = 99999;
                 }
                 }
                 }
                 //Slider values delegate
                 $scope.businessImages = businessDetailData.imageData;
                 $scope.checkinhere = function(){
                 globalDataTemp.currentCheckinData.title = $scope.detailData.title;
                 globalDataTemp.currentCheckinData.bid = businessIDStore;
                 globalDataTemp.currentCheckinData.siteurl = $scope.detailData.url;
                 $state.go('menuView.facebook.checkin.createTemplate');
                 };
                 //Tab change function via swipe
                 $scope.tabHoldChange = function(index){
                 $scope.tabPage = index;
                 };
                 $scope.changeTab = function(index){
                 analytics.trackEvent('Business Events','Click on about or ratings','slide for about or ratings detail',100);
                 $ionicSlideBoxDelegate.$getByHandle('rating-tabs').slide(index);
                 };
                 //State change management
                 $scope.sendToServiceDetail = function(){
                 analytics.trackEvent('Business Events','Click on service','Navigate to Business service view of '+$scope.detailData.title,100);
                 businessDetailData.fetchInnerDetail(businessIDStore).then(function(data){
                 $state.go('menuView.services');
                 });
                 };
                 $scope.sendToProductDetail = function(){
                 analytics.trackEvent('Business Events','Click on product','Navigate to Business product view of '+$scope.detailData.title,100);
                 businessDetailData.fetchInnerDetail(businessIDStore).then(function(data){
                 $state.go('menuView.products');
                 });
                 };
                 $scope.sendToVideoView = function(){
                 analytics.trackEvent('Business Events','Click on video','Navigate to Business video view of '+$scope.detailData.title,100);
                 businessDetailData.fetchInnerDetail(businessIDStore).then(function(data){
                 $state.go('menuView.videos');
                 });
                 };
                 $scope.sendToGalleryDetail = function(){
                 $rootScope.miniLoader = true;
                 $state.go('menuView.photoGallery');
                 analytics.trackEvent('Business Events','Click on Gallery','Navigate to Busness Gallery  view of' +$scope.detailData.title ,100);
                 };
                 $scope.sendToRatingDetail = function(){
                 analytics.trackEvent('Business Events','Click on Rate icon or rating list','Navigate to Rating and Review view',100);
                 $state.go('menuView.ratings');
                 };
                 $scope.sendToHourView = function () {
                 businessDetailData.fetchInnerDetail(businessIDStore).then(function(data){
                 $state.go('menuView.workingHours');
                 });
                 analytics.trackEvent('Business Events','Click on view hours or working hours','Navigate to Business working hours view',100);
                 };
                 $scope.sharethisbiz=function(data){

                 //console.log(data);
                 //var title=$scope.detailData.title.split(' ').join('-').toLowerCase();

             //    var title=$scope.detailData.slug.split(' ').join('%20');
                  var title=$scope.detailData.slug;
                // console.log(title);

                 var bizlink=globalVars.MainklURl+"business/"+title;
                 $cordovaSocialSharing.share("i have shared  ",$scope.detailData.title,"", bizlink) // Share via native share sheet
                 .then(function(result) {
                 // Success!
                 }, function(err) {
                 // An error occured. Show a message to the user
                });
                analytics.trackEvent('Business Events','Click on Share icon','Share this ' + bizlink +' link to friends ',100);
                };
                $scope.makeitasfav=function(data){
                if(globalVars.userInfo.id == undefined){
                globalVars.loginstatus="notlogged";
                globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
                $state.go('loginView');
                }
               else{
               resourceRequistion.updatefavbus(businessIDStore,globalVars.userInfo.id).then(function(data){
               var dt=data.data;
               androidServices.showToast(data.data);
               $('#isfavid').removeClass('isfavfalsecls');
               $('#isfavid').addClass('isfavtruecls');
               $scope.isfavselet=true;
               globalVars.biz_favCheck =  $scope.isfavselet ==true ? 1 : 0;
               });
               }
               analytics.trackEvent('Business Events','Click on Favorite icon','If user loggin add to user favorite list otherwise navigate to login view',100);
               };
               $scope.bizownthis=function(){
               if(globalVars.userInfo.id == undefined){
               globalVars.loginstatus="notlogged";
               globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
               $state.go('loginView');
               }
               else{
               if(sessionStorage.owntoemail!=""){
               var bizemail=sessionStorage.owntoemail;
               var own_data = {
               email : {
               id : globalDataTemp.currentBusinessID,
               useremail : globalVars.userdetails[0].email,
               userid:globalVars.userInfo.id,
               bizemail : bizemail,
               biztile:globalDataTemp.currentBusinessDetail.title,
               message:""
               }
               };
               var compiledData = globalVars.MainklURl+'MobileEmail/ownthis';
               return $http.post(compiledData, own_data).success(function(data){
               androidServices.showToast('successfully send ....');
               }, function error(err){
               return err;
               });
               }
               else{
               $state.go("menuView.ownThis");
               }
               }
               analytics.trackEvent('Business Events','Click on Own this','If user loggin own this email successful send otherwise navigate to login view',100);
               };
               $scope.openurlwithin=function(url){
               var link = (url.indexOf('://') == -1) ? 'http://' + url : url;
               var options = {
               location: 'yes',
               clearcache: 'yes',
               toolbar: 'no'
               };
               $cordovaInAppBrowser.open(link, '_blank', options)
               .then(function(event) {
               // success
               })
               .catch(function(event) {
               // error
               });
               analytics.trackEvent('Business Events','Click on Busines Link','Open this '+ link +' in inappbrowser',100);
               };
               $scope.samplemoreevent=function(){
               var alertPopup = $ionicPopup.show({
               scope: $scope,
               templateUrl: 'mobile-more-popup.html'
               });
               };
               //modal view cretated
               $ionicModal.fromTemplateUrl('detialmoreinfo.html', {
               scope: $scope,
               animation: 'slide-in-up'
               }).then(function(modal) {
               $scope.modal = modal;
               });
               $scope.moremodalopen=function(txt,event){
               $scope.modal.show();
               switch(txt){
               case "mobile" :
               $(".mobilemodallcist").show();
               $('.tollmodallcist,.faxmodallcist,mailmodallcist').hide();
               break;
               case "toll" :
               $(".tollmodallcist").show();
               $('.faxmodallcist,mailmodallcist,.mobilemodallcist').hide();
               break;
               case "fax" :
               $(".faxmodallcist").show();
               $('.tollmodallcist,mailmodallcist,.mobilemodallcist').hide();
               break;
               case "mail" :
               $(".mailmodallcist").show();
               $('.tollmodallcist,.faxmodallcist,.mobilemodallcist').hide();
               break;
               }
               };
               $scope.moremodalclose=function(){
               $scope.modal.hide();
               };
               $scope.openMapclick=function(){
               analytics.trackEvent('Business Events','Click on Diredtion','Open current business MAP in google MAP using latitude and longitude',100);
               };
               $scope.SocialMediaClick=function(link,socailMedia){


                 var options = {
                            location: 'yes',
                            clearcache: 'yes',
                            toolbar: 'yes'
                            };

                  +$cordovaInAppBrowser.open(link, '_blank', options).then(function(event){}).catch(function(event){});

                analytics.trackEvent('Business Events','Click on '+socailMedia,'Open this  '+link+' social media link',100);

               };

               $scope.showMore=function(txt,event){

              var click_txt = $(event.currentTarget).text() == 'more' ? 'less' : 'more' ;

              $(event.currentTarget).text(click_txt);

              if(click_txt == 'more'){

               $(event.currentTarget).css('color','orange');
              }

              else{
              $(event.currentTarget).css('color','black');
              }
              switch (txt){

               case 'contacts' :
               $scope.showmore_text = click_txt ;
               $(".mobile_Cls").toggle();

               break;

               case 'tollfree' :
                 $scope.showmoretoll_text=click_txt;
               $(".tollfree_Cls").toggle();
               break;

               case 'fax' :
                $scope.showmorefax_text=click_txt;
               $(".fax_Cls").toggle();
               break;

               case 'email':
                $scope.showmoremail_text=click_txt;
               $(".email_Cls").toggle();
               break;


               }



               }


               })

//Services page
.controller('detailedServiceController', function($scope, $state,$ionicSlideBoxDelegate,$ionicPopover,globalDataTemp,cordovareturn,$ionicPlatform,globalVars,$rootScope){
              analytics.trackView('Business Services view');
              $scope.innerServiceList = [];
              $scope.serviceLimit=10;
              $scope.innerServiceList = globalDataTemp.currentBusinessInnerDetail.business_services;
              $scope.logoURL=globalVars.MainklURl+'img/ServiceLogo/logo_folder/';
              $scope.goBackToDetail = function(){
              analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
              $state.go('menuView.detailView');
              };
              $ionicPlatform.onHardwareBackButton(function(e){});
              $scope.ServiceLoadMore=function(){
              $scope.serviceLimit=$scope.serviceLimit+10;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              };
              $ionicPopover.fromTemplateUrl('imgage_lrge.html', {
              scope: $scope
               }).then(function(popover) {
               $scope.popover = popover;
               });
             var images=$scope.innerServiceList;
             $scope.ServiceZoomPop=function(event,index){
             $scope.popover.show();
             $ionicSlideBoxDelegate.slide(index);
             analytics.trackEvent('Business Events','Click on service logo','open image enlarge pop with selected logo',100);
             };
             $scope.slideVisible = function(index){
             if(  index < $ionicSlideBoxDelegate.currentIndex() -1 || index > $ionicSlideBoxDelegate.currentIndex() + 1){
             return false;
             }
             return true;
             };
             })

//Public Gallery page
.controller('detailGalleryController', function($scope, $state, businessDetailData,$ionicSlideBoxDelegate,$cordovaDialogs, globalDataTemp, $rootScope, $cordovaCamera, fileUpload, $ionicPopover,cordovareturn,globalVars,$ionicPlatform,androidServices,$ionicScrollDelegate,$filter){
             analytics.trackView('Business photo gallery view');
                         $ionicScrollDelegate.scrollTop();
                          $scope.businessImages = [];
                          $rootScope.miniLoader = false;
                          //$scope.publicGalleryImages = [];
                          $scope.url=globalVars.MainklURl+"img/";
             //            $scope.publicGalleryImages= globalVars.bizgalleryimgarr.sort(function(a,b){
             //
             //                                                               return GallerySorting(a,b);
             //
             //
             //                                                                         });
                         getAllImages();

                          $scope.galleryload_count=12;
                          var Temp_BIZimages=globalVars.Biz_images;
                          $scope.galleryerror=$scope.publicGalleryImages.length==0?true:false;
                          //Template for photo modal
                          var photoModalTemplate = '<ion-popover-view class="loading_box gallery_box">' +
                                                   '<div class="galleryList group margin_b_20 align_center font_roboto font_color_blue">'+
                                                   '<div class="action_panel" ng-model="myPicture" ng-click="getPicture(1)">' +
                                                   '<p>From Camera</p>' +
                                                   '<span class="icon ion-camera"></span>' +
                                                   '</div>' +
                                                   '<div class="action_panel" ng-click="getPicture(2)">' +
                                                   '<span class="icon ion-images"></span>' +
                                                   '<p>From Gallery</p>' +
                                                   '</div>' +
                                                   '</ion-popover-view>';
                          //Function call for photo pop over instantiation
                          $scope.photoPopOver = $ionicPopover.fromTemplate(photoModalTemplate, {
                          scope: $scope
                          });
                          $scope.getPicture = function(sourceType){
                          if(sourceType == 2){
                           analytics.trackEvent('Business Events','Click on from gallery','Choose image from gallery',100);
                          $cordovaCamera.getPicture({
                          destinationType: Camera.DestinationType.DATA_URL,
                          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                                     correctOrientation : true
                          }).then(function(datapath){
                          $rootScope.miniLoader = true;
                          $scope.photoPopOver.hide();
                          fileUpload.uploadPhoto(datapath, 'business_galleryimages').success(function(data){
                          $rootScope.miniLoader = false;
                          if(data.trim() == '"faild"'){
                          androidServices.showToast("Image should be more than 200px width & 100px height and size should be more than 10kb and Image size should not be more than 6MB");
                          }
                          getAllImages();
                          }).error(function(data){
                          $rootScope.miniLoader = false;
                          });
                          });
                          }
                          else {
                           analytics.trackEvent('Business Events','Click on from camera','take image from camera',100);
                          $cordovaCamera.getPicture({

                          destinationType: Camera.DestinationType.DATA_URL,
                          sourceType: Camera.PictureSourceType.CAMERA,
                          correctOrientation : true
                          }).then(function(datapath){
                          $rootScope.miniLoader = true;
                          $scope.photoPopOver.hide();


                                //  var return_data=windowfileURI(datapath,$scope,$rootScope);



                         fileUpload.uploadPhoto(datapath, 'business_galleryimages').success(function(data){
                          $rootScope.miniLoader = false;
                          if(data.trim() == '"faild"'){
                          androidServices.showToast("Image should be more than 200px width & 100px height and size should be more than 10kb and Image size should not be more than 6MB");
                          }
                          getAllImages();
                          }).error(function(data){
                          $rootScope.miniLoader = false;
                          });
                          });
                          }
                          };
                           //Toggles photo modal box
                          $scope.goBackToDetail = function(){
                           analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
                          $state.go('menuView.detailView');
                          };
                           //myPopup.show();
                           $scope.togglePhotoModal = function(){
                           if(globalVars.userInfo.id == undefined){
                           globalVars.loginstatus="notlogged";
                           globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
                           $state.go('loginView');
                           }
                           else{
                           $scope.photoPopOver.show();
                           }
                            analytics.trackEvent('Business Events','Click on Camera icon','If user loggin open a pop view with choose from camera/gallery otherwise navigate to login view',100);
                           };
                           $ionicPopover.fromTemplateUrl('imgage_lrge.html', {
                           scope: $scope
                           }).then(function(popover) {
                           $scope.popover = popover;
                           });
                           var images=$scope.publicGalleryImages;
                           $scope.Gallerypopimage=function(event,index){
                           $scope.popimage=$scope.publicGalleryImages[0]['image'];
                           $scope.popimagesel=$("#selectedimgsrc").attr('src');
                           $scope.popover.show();
                         $rootScope.popover=$scope.popover;
                           $ionicSlideBoxDelegate.slide(index);
                           analytics.trackEvent('Business Events','Click on photo gallery thumbnail','Open image enlarge pop view with selected image',100);
                           };
                           $scope.slideVisible = function(index){
                           if(  index < $ionicSlideBoxDelegate.currentIndex() -1
                           || index > $ionicSlideBoxDelegate.currentIndex() + 1){
                           return false;
                           }
                           return true;
                           };
                           var popcount=0;
                           $scope.popimagewipe=function(){
                           $scope.popimage=$scope.url+$scope.publicGalleryImages[popcount++]['image'];
                           };
                           $scope.popimagewiperight=function(){
                           $scope.popimage=$scope.url+$scope.publicGalleryImages[popcount--]['image'];
                           };
                           //}
                            function getAllImages(){
                         $rootScope.miniLoader =true;

                            $scope.imgData=[];
                            $scope.galleryurl=globalVars.MainklURl+"img/";
                            businessDetailData.getPublicGallery().success(function(data){
                           $rootScope.miniLoader =false;
                            $scope.galleryerror=data.length==0?true:false;
                            if(typeof(data) === 'object'){
                            var glue =globalVars.rawImgURL;
                            if(data.length > 0){
                            angular.forEach(data, function(v, k){
                            if(v.dir == undefined){
                                            $scope.imgData.push({image : glue + '/' + v.image_url,username:v.username,Created:dateforimate(v.Created),gallery_thumbnail:glue+v.Thumbnail_path,postDate:v.Created});
                            }
                            else{
                            $scope.imgData.push({image : glue + v.dir + '/' + v.image_url,username:v.username,Created:dateforimate(v.Created),gallery_thumbnail:glue+v.Thumbnail_path,postDate:v.Created});
                            }
                            });
                            }



                            }
                          else{


                                      $scope.publicGalleryImages=[];

                                                                          }

                            });
                      //   if(Temp_BIZimages.length > 0){ angular.extend($scope.imgData, Temp_BIZimages); }

                            $scope.publicGalleryImages=$scope.imgData;


                            }
                            $ionicPlatform.onHardwareBackButton(function(e){});
                            $scope.galleryloadMore=function(){
                            $scope.galleryload_count=$scope.galleryload_count+3;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                            };
               })

//Detail vieww rating controller
.controller('detailedRatingsController', function($scope, $state, globalDataTemp, globalVars, $rootScope,cordovareturn,businessDetailData,$ionicPlatform,$ionicScrollDelegate){
             analytics.trackView('Business Rating lsit view');
             $scope.logourl=globalVars.userLogoFolder
             $scope.innerRatings = {};
             $scope.innerGraphData = {};
             $scope.innerGraphData = globalDataTemp.currentRatings.ratings;
             $scope.innerRatings = globalDataTemp.currentRatings;
             $scope.totalRatingUsers = 0;
             $scope.currentSingleRating = 0;
             $scope.currentSingleRating = globalDataTemp.currentBusinessRating;
             $ionicScrollDelegate.scrollTop();
             $scope.goBackToDetail = function(){
             if(globalVars.LTD_switch === 'detail'){
             businessDetailData.fetchDetails(globalDataTemp.currentBusinessID,globalVars.userInfo.id).then(function(data){
             globalDataTemp.setCurrentBID(temp_Biz_Id);
             globalDataTemp.setCurrentBusinessDetail(data.data[0]);
             $rootScope.miniLoader = false;
             $state.go('menuView.detailView');
             });
             }
             else{
             $state.go($rootScope.$viewHistory.backView.stateName);
             }
              analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
             };
             if($scope.innerGraphData){
             $scope.totalRatingUsers = parseInt($scope.innerGraphData.rates_user_1)
                                       +parseInt($scope.innerGraphData.rates_user_2)
                                       +parseInt($scope.innerGraphData.rates_user_3)
                                       +parseInt($scope.innerGraphData.rates_user_4)
                                       +parseInt($scope.innerGraphData.rates_user_5);
             $scope.user_percentile_5 = calcPercent(parseInt($scope.totalRatingUsers), parseInt($scope.innerGraphData.rates_user_5));
             $scope.user_percentile_4 = calcPercent(parseInt($scope.totalRatingUsers), parseInt($scope.innerGraphData.rates_user_4));
             $scope.user_percentile_3 = calcPercent(parseInt($scope.totalRatingUsers), parseInt($scope.innerGraphData.rates_user_3));
             $scope.user_percentile_2 = calcPercent(parseInt($scope.totalRatingUsers), parseInt($scope.innerGraphData.rates_user_2));
             $scope.user_percentile_1 = calcPercent(parseInt($scope.totalRatingUsers), parseInt($scope.innerGraphData.rates_user_1));
             }
             function calcPercent(Total, users){
             if(users > 0 || Total > 0){
             var setA = users / Total;
             return setA * 100;
             }
             else{
             return 0;
             }
             }
             //write review calling function{
             $scope.writereviewclick=function(){
             if(globalVars.userInfo.id == undefined){
             globalVars.loginstatus="notlogged";
             globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
             $state.go('loginView');
             }
             else{
             $state.go('menuView.writeReview');
             }
              analytics.trackEvent('Business Events','Click on Write Review','Navigate to Business Write Review view',100);
             };
             })

.controller('localeResultController', function($scope, $ionicPlatform, $ionicViewService, $state, globalDataTemp, globalDataTemp, androidServices, globalVars, resourceRequistion, $ionicPopup, $cordovaGeolocation, $rootScope, facebookData, facebookListData,cordovareturn){
cordovareturn.Getcurrentlocation();
analytics.trackView($rootScope.$viewHistory.currentView.stateName);
    $scope.locations = [];
    $scope.mainListings = [];
    $scope.curLat = globalVars.deviceLat;
    $scope.curLng = globalVars.deviceLng;
    $rootScope.miniLoader = true;
    $scope.suggestedCities = [];
    $scope.suggestedCategories = [];
    $scope.checkin_enquiry = {};
    $scope.receivedsearchdata=false;
    $scope.$on('formIsValid', function(e, name){
        if(name === 'default'){
            $scope.defaultFormValid = true;
        }
    });
//$scope.someme=getListings('first');
   // getListings();
    $scope.oniniload=function(){

//return  getListings();
    };
    $scope.searchChanged = true;
    if(!$rootScope.$viewHistory.backView){
        $scope.backButton = $ionicPlatform.registerBackButtonAction( function () {
            $ionicViewService.nextViewOptions({ disableBack: true });

            $state.go('menuView.listingView.categorytabs.search');
        }, 105 );
        $scope.$on('$destroy', $scope.backButton);
    }
    $scope.usersSuggestion= '';
    $scope.$on('formIsNotValid', function(e, name){
        if(name === 'default'){
            $scope.defaultFormValid = false;
        }
    });
    $scope.sendSuggestion = function(){
        $rootScope.miniLoader = true;
        $scope.checkin_enquiry.user_name = globalVars.userdetails[0].first_name;
        $scope.checkin_enquiry.lat = globalVars.deviceLat;
        $scope.checkin_enquiry.lng = globalVars.deviceLng;
        var post_data = {
            checkin_enquiry : $scope.checkin_enquiry
        }

        facebookListData.postSuggestion(post_data)
            .success(function(res){
                $rootScope.miniLoader = false;
                if(parseInt(res) === 1){
                    androidServices.showToast('Suggestion has been sent , thanks for your valuable information');
                    $state.go('menuView.locationBasedPlaces');
                }
                else{
                    androidServices.showToast('There was an error sending , Please try again');
                }
            })
            .error(function(res){
                androidServices.showToast('something went wrong , Please check your network and try again');
                $rootScope.miniLoader = false;
            });
    }
    function getSuggestions(){
        $rootScope.miniLoader = true;
        facebookListData.fetchSuggestedCities()
            .success(function(res){
                $scope.suggestedCities = res;
            })
            .error(function(){
                $rootScope.miniLoader = false;
                androidServices.showToast('There was an error retrieving data from the server');
            });
        facebookListData.fetchSuggestedCategories()
            .success(function(res){
                $scope.suggestedCategories = res;
                $rootScope.miniLoader = false;
            })
            .error(function(){
                $rootScope.miniLoader = false;
                androidServices.showToast('There was an error retrieving data from the server');
            })
    }
    if($state.$current == 'menuView.suggestlocation'){
        $scope.checkin_enquiry.business_name = globalDataTemp.usersCurrentSuggestion;
        getSuggestions();
    }
    function distanceInject(dataSet){
        angular.forEach(dataSet, function(v, k){
            var curLat = parseFloat(v.lat);
            var curLng = parseFloat(v.lng);
//             $cordovaGeolocation.getCurrentPosition().then(function(position) {
//                    $scope.curLat = position.coords.latitude;
//                    $scope.curLng = position.coords.longitude;
//                    globalVars.deviceLat = position.coords.latitude;
//                    globalVars.deviceLng = position.coords.longitude;
//                    geoCode.reverseFind(position.coords.latitude, position.coords.longitude).then(function(data){
//                        $scope.autoLocation = data.data.results[0].address_components[1].long_name;
//                    }, function(err){
//
//                    });
//                }, function(err) {
//
//                });

            if(curLat > 0 && curLng > 0){
                var dist = globalVars.calcDistance(curLat, curLng, parseFloat($scope.curLat), parseFloat($scope.curLng));
                //var dist = globalVars.calcDistance(curLat, curLng, 29.334246, 47.981215);
                dataSet[k].distance = (Math.round(dist * 10) / 10);
            }
            else{
                dataSet[k].distance =99999;
            }
             dataSet[k].view_count = parseInt(v.view_count);
        });
       return dataSet;
    }
    $scope.fetchSearchRecords = function(){
        $scope.searchResult = false;
        $scope.mainListings = [];
        globalDataTemp.usersCurrentSuggestion = $scope.searchterm;

        $rootScope.miniLoader = true;
        if($scope.searchterm.length >=3){
            resourceRequistion.fetchListingsAll($scope.searchterm, undefined, undefined,undefined, 'nearby', 'precision',0).then(function(data){
                if(typeof(data) === 'object'){
                    $scope.mainListings = distanceInject(data);
                    $scope.moredatabtn=data.lengrh > 0?false:true;
                    $rootScope.miniLoader = false;
                }
                else{
                    $rootScope.miniLoader = false;
                    $scope.mainListings = [];
                    $scope.searchResult = true;
                }
            }, function(err){
                $rootScope.miniLoader = false;
                $scope.searchResult = true;
            });
        }
    }
    $scope.suggestaplace = function(){
        $state.go('menuView.suggestlocation');
    };
    $scope.goBackToplaces = function(){
        $state.go('menuView.locationBasedPlaces');
    };
    //Geo-locating debugger using a watch
    var watchOptions = {
        frequency : 1000,
        timeout : 3000,
        enableHighAccuracy: false // may cause errors if true
    };
    $scope.showConfirm = function() {
    $rootScope.miniLoader = false;
        var myPopup = $ionicPopup.show({
            template: 'Please check your GPS and/or turn it on before pressing retry',
            title: 'Geo-Location disabled',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Retry</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $rootScope.miniLoader = true;
                         $scope.receivedsearchdata==false;
                        getListings();
                    }
                }
            ]
        });
    };
    function getListings(){

        var watchID = $cordovaGeolocation.watchPosition(watchOptions);
        watchID.then(function(){},
            function(err) {
                if(watchID != null){
                    $cordovaGeolocation.clearWatch(watchID.watchId);
                }
                $scope.showConfirm();
            },
            function(position) {
                if(watchID != null){
                    $cordovaGeolocation.clearWatch(watchID.watchId);
                }


                if(position){
                    $scope.curLat = globalVars.deviceLat = position.coords.latitude;
                    $scope.curLat = globalVars.deviceLng = position.coords.longitude;


 if($scope.receivedsearchdata==false){
                    resourceRequistion.fetchListingsAll(undefined, undefined, undefined,undefined, 'nearby', 'precision',0).then(function(data){

                       $scope.receivedsearchdata=true;
                        if(typeof(data) === 'object'){
                            $scope.mainListings = distanceInject(data);
                            $scope.moredatabtn=data.lengrh > 0?false:true;
                            $rootScope.miniLoader = false;
                        }
                        else{
                            $rootScope.miniLoader = false;
                            $scope.mainListings = [];
                        }
                    });
                    }
}
                else{
                    if(watchID != null){
                        $cordovaGeolocation.clearWatch(watchID.watchId);
                    }
                    androidServices.showToast("GPS position error");
                }
            });
    }
    getListings();
    $scope.checkinhere = function(bid, title){
        globalDataTemp.currentCheckinData.title = title;
        globalDataTemp.currentCheckinData.bid = bid;
        $state.go('menuView.facebook.checkin.createTemplate');
    };
})
//Products page
.controller('detailedProductController', function($scope,$ionicSlideBoxDelegate,$ionicPopover,$state, globalDataTemp,cordovareturn,$ionicPlatform,globalVars,$rootScope){
              analytics.trackView('Business product view');
              $scope.innerProductList = [];
              $scope.productLimit=10;
              $scope.innerProductList = globalDataTemp.currentBusinessInnerDetail.business_products;
              $scope.logoURL=globalVars.MainklURl+'img/ProductLogo/logo_folder/';
              $scope.goBackToDetail = function(){
              analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
              $state.go('menuView.detailView');
              };
              $ionicPlatform.onHardwareBackButton(function(e){});
              $scope.ProductLoadMore=function(){
              $scope.productLimit=$scope.productLimit+10;
              $scope.$broadcast('scroll.infiniteScrollComplete');
              };
              $ionicPopover.fromTemplateUrl('imgage_lrge.html', {
              scope: $scope
              }).then(function(popover) {
                 $scope.popover = popover;
              });
              var images=$scope.innerServiceList;
              $scope.ProductZoomPop=function(event,index){
              $scope.popover.show();
              $ionicSlideBoxDelegate.slide(index);
              analytics.trackEvent('Business Events','Click on Logo','Open image enlarge view with selected image',100);
              };
              $scope.slideVisible = function(index){
           	  if(  index < $ionicSlideBoxDelegate.currentIndex() -1
                  || index > $ionicSlideBoxDelegate.currentIndex() + 1){
              return false;
              }
              return true;
              };
              })
//Videos page
.controller('detailedVideosController', function($scope, $state, globalDataTemp,cordovareturn,globalVars,$ionicModal,$ionicPlatform,$rootScope){
                     analytics.trackView('Business Video view');
                     $scope.innerVideoList = [];
                     $scope.innerVideoList = globalDataTemp.currentBusinessInnerDetail.business_videos;
                     $scope.videourls=[];
                     var playiframetemp = '<ion-modal-view class="bg_white">' +
                                          '<ion-header-bar>' +
                                          '<button class="button button-icon icon ion-chevron-left" ng-click="closeCatModal();"></button>' +
                                           '<h1 class="title">Business video player</h1>' +
                                           '</ion-header-bar>' +
                                           '<ion-content class=" group margin_b_20 align_center font_roboto font_color_blue">'+
                                           '<youtube-video style="width:100%" video-url="anotherGoodOne" player="bestPlayer" class="biz_videoplayercls">'+'</youtube-video>' +
                                           '</ion-content>' +
                                           '</ion-modal-view>';
                     $scope.player = $ionicModal.fromTemplate(playiframetemp, {
                     scope: $scope,
                     animation: 'slide-in-up'
                     });
                     $scope.aboutvideoedit=function(data){
                     $scope.anotherGoodOne=data.playurl;
                     $scope.player.show();
                     analytics.trackEvent('Business Events','Click on Play video','Open video player pop view',100);
                     };
                     $scope.closeCatModal=function(){
                     $scope.player.hide();
                     $scope.anotherGoodOne="";
                     var player_idsize=$(".biz_videoplayercls").length;
                     var id=$(".biz_videoplayercls").attr('id');
                     //the below line of code is for stop the you tube video
                     $('#'+id)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                     analytics.trackEvent('Business Events','Click on close video','close video player pop view',100);
                     };
                     // Cleanup the modal when we're done with it!
                     $scope.$on('$destroy', function() {
                     $scope.player.remove();
                     });
                     $ionicPlatform.onHardwareBackButton(function(e){
                     var player_idsize=$(".biz_videoplayercls").length;
                     var id=$(".biz_videoplayercls").attr('id');
                     //the below line of code is for stop the you tube video
                     // $('#unique-youtube-embed-id'+'-'+player_idsize)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                     $('#'+id)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                     analytics.trackEvent('Business Events','Click on close video','close video player pop view',100);
                     });
                     angular.forEach($scope.innerVideoList, function(v, k){
                     var vsplite=v.video_url.split('/');
                     var thumb = globalVars.Youtubethumbfun(v.video_url, 'v');
                     var finalthumb=thumb==""?vsplite[vsplite.length-1]:thumb;
                     var url =  { vurl:'http://img.youtube.com/vi/' + finalthumb + '/default.jpg',playurl:v.video_url};
                     $scope.videourls.push(url);
                     });
                     $scope.goBackToDetail = function(){
                     analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
                     $state.go('menuView.detailView');
                     };
                     $scope.$on('youtube.player.playing', function ($event, player) {
                     // play it agai
                     player.playVideo();
                      analytics.trackEvent('Business Events','Click on play video','open video player pop view',100);
                     })
                     })
//Working hours page
.controller('detailHoursController', function($scope, $state, globalDataTemp,cordovareturn,$rootScope){
               analytics.trackView('Business Working hours view');
               $scope.innerWorkingDetails = [];
               $scope.innerWorkingDetails = globalDataTemp.currentBusinessInnerDetail.business_timings;
               $scope.goBackToDetail = function(){
               analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
               $state.go('menuView.detailView');
               };
               })
               //Enquiry page
.controller('detailEnquiryController', function($scope, $state, globalVars, globalDataTemp, businessDetailData, $timeout, $ionicPopup, $rootScope,cordovareturn,$http,androidServices){
            analytics.trackView('Business Enquiry view');
            $scope.formEntry = {
            uname  : globalVars.userdetails[0].first_name + ' ' + globalVars.userdetails[0].last_name || '',
            email : globalVars.userdetails[0].email || '',
            number: globalVars.userdetails[0].contact_number||'',
            msg   : ''
            };
            $scope.enquiryIntegrity = !enquiry_form.$invalid;
            var checkingmail= $scope.formEntry.email.length == 0 ?false:true;
            $("#enquiryemail").attr('disabled',checkingmail);
            $scope.formUpdate = function(){
            if($scope.formEntry.uname && $scope.formEntry.email && $scope.formEntry.number && $scope.formEntry.msg){
            if($scope.formEntry.uname.length > 0 && $scope.formEntry.email.length > 0 && $scope.formEntry.number.length > 0 && $scope.formEntry.msg.length > 0){
            $scope.enquiryIntegrity = false;
            }
            else{
            $scope.enquiryIntegrity = true;
           }
           }
           else{
           $scope.enquiryIntegrity = true;
           }
           };
          $scope.goBackToDetail = function(){
          cleanScope();
          if(globalVars.LTD_switch === 'detail'){
          $state.go('menuView.detailView');
          }
          else{
          $state.go($rootScope.prevState);
          }
          analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
          };
          function cleanScope(){
          $scope.formEntry = {
          uname  : undefined,
          email   : undefined,
          number: undefined,
          msg   : undefined
          };
          }
          $scope.sendEnquiry = function(){
          $rootScope.miniLoader = true;
          businessDetailData.postEnquiry($scope.formEntry.uname, $scope.formEntry.email, $scope.formEntry.number, $scope.formEntry.msg).then(function(data){
          $rootScope.miniLoader = false;
          var trimData = data.data.trim();
          if(trimData == 'saved'){
          var post_data = {
          email : {
          enquirer_name :$scope.formEntry.uname ,
          enquirer_email : $scope.formEntry.email,
          enquirer_phone :$scope.formEntry.number,
          enquirer_msg : $scope.formEntry.msg,
          emailid : sessionStorage.bizemail
          }
          };
          var compiledData = globalVars.MainklURl+'MobileEmail/send_enquiry';
          return $http.post(compiledData, post_data).success(function(data){
          $state.go($rootScope.$viewHistory.backView.stateName);
          androidServices.showToast('Successfull send...');
          }, function error(err){
          return err;
          });
          $scope.showAlert("Success!", "Your enquiry was posted successfully", true);
          }
          else {
          $scope.showAlert("Posting Failed", "There was an issue posting enquiry, please try again", false);
          }
          }, function(err){
          $scope.showAlert("Posting Failed", "There was an issue posting enquiry, please try again", false);
          });
           analytics.trackEvent('Business Events','Click on Send','Send Enquiry email ',100);
          };
          $scope.showAlert = function(title, msgTmpl, changeView) {
          var alertPopup = $ionicPopup.alert({
          title: title,
          template: msgTmpl
          });
          $timeout(function(){
          alertPopup.close();
          if(changeView === true){
          $scope.goBackToDetail();
          }
          }, 1200);
          };
          window.addEventListener('native.keyboardshow', function(){
          $(".bizEnq_cls").hide();
          });
          window.addEventListener('native.keyboardhide', function(){
          $(".bizEnq_cls").show();
          });
          })

//Own this page
.controller('detailOwnthisController', function($scope, $state,globalVars , globalDataTemp,cordovareturn,$cordovaEmailComposer,$http,androidServices,$rootScope ){
                     analytics.trackView('Business Own This view');
                     $scope.affemail="kuwaitlocals@gmail.com";
                     $scope.txtmsg="";
                     $scope.formEntry = {
                     uname  : globalVars.userdetails[0].first_name + ' ' + globalVars.userdetails[0].last_name || '',
                     email : globalVars.userdetails[0].email || '',
                     number: '',
                     msg   : ''
                     }
                     $scope.goBackToDetail = function(){
                      analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
                     $state.go('menuView.detailView');
                     };
                     $scope.SendMail=function(){
                     var bizemail="kuwaitlocals@gmail.com";
                     if(globalDataTemp.currentBusinessDetail.email=="" || globalDataTemp.currentBusinessDetail.email==undefined){
                     bizemail="kuwaitlocals@gmail.com";
                     }
                     else{
                     bizemail =globalDataTemp.currentBusinessDetail.email;
                     }
                     var own_data = {
                     email : {
                     id : globalDataTemp.currentBusinessID,
                     useremail : globalVars.userdetails[0].email,
                     userid:globalVars.userInfo.id,
                     bizemail : bizemail,
                     biztile:globalDataTemp.currentBusinessDetail.title,
                     message:$scope.formEntry.msg
                     }
                     };
                     var compiledData = globalVars.MainklURl+'MobileEmail/ownthis';
                     return $http.post(compiledData, own_data).success(function(data){
                     $state.go('menuView.detailView');
                      androidServices.showToast('successfully send ....');
                      }, function error(err){
                      return err;
                      });
                       analytics.trackEvent('Business Events','Click on Send','Send Own this email ',100);
                      }
                      })

//write review
.controller('detailReviewController', function($scope, $state, globalDataTemp, globalVars, businessDetailData, $ionicPopup, $timeout, $rootScope,cordovareturn){
                    analytics.trackView('Business Write Review  view');
                    $scope.usersRating = 0;   //Gets updated with rating directive
                    $scope.ratingIntegrity = false;
                    $scope.formEntry = {
                    uname  : globalVars.userdetails[0].username.length == 0 ?  globalVars.userdetails[0].first_name : globalVars.userdetails[0].username,
                    email : globalVars.userdetails[0].email || '',
                    number: globalVars.userdetails[0].contact_number||'',
                    msg   : ''
                    };
                    $scope.usersRatingVisual = function(stars){ //Updates form validity after stars have been updated
                    $scope.usersRating = stars;
                    $scope.formUpdate();
                    };
                    $scope.ratingIntegrity = !rating_form.$invalid;
                    $scope.formUpdate = function(){
                    if(/*$scope.formEntry.uname && $scope.formEntry.email && $scope.formEntry.number &&*/ $scope.formEntry.msg){
                    if(/*$scope.formEntry.uname.length > 0 && $scope.formEntry.email.length > 0 && $scope.formEntry.number.length > 0 &&*/ $scope.formEntry.msg.length > 0 && $scope.usersRating > 0){
                    $scope.ratingIntegrity = false;
                    }
                    else{
                    $scope.ratingIntegrity = true;
                    }
                    }
                    else{
                    $scope.ratingIntegrity = true;
                    }
                    };
                    $scope.goBackToDetail = function(){
                    cleanScope();
                    $state.go($rootScope.$viewHistory.backView.stateName);
                     analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
                    };
                    function cleanScope(){
                    $scope.formEntry = {
                    uname  : undefined,
                    email   : undefined,
                    number: undefined,
                    msg   : undefined
                    };
                    }
                    $scope.sendRating = function(){
                    $rootScope.miniLoader = true;
                    var temp_Biz_Id=globalDataTemp.currentBusinessID;
                    businessDetailData.postRating($scope.formEntry.uname, $scope.formEntry.email, $scope.formEntry.number, $scope.usersRating, $scope.formEntry.msg).then(function(data){
                    var trimData = data.data.trim();
                    if(trimData == 'saved'){
                    //fetchRatings
                    businessDetailData.fetchRatings(globalDataTemp.currentBusinessID).then(function(data){
                    globalDataTemp.setCurrentBID(temp_Biz_Id);
                    $rootScope.miniLoader = false;
                    $scope.showAlert("Success!", "Thanks for rating this business", true);
                    });
                    }
                    else {
                    $scope.showAlert("Rate this Failed", "There was an issue rating this business, please try again", false);
                    }
                    }, function(err){
                    $scope.showAlert("Posting Failed", "There was an issue rating this business, please try again", false);
                    });
                     analytics.trackEvent('Business Events','Click on Rate this','Save  user given rating and review in list ',100);
                    };
                    $scope.checkinhere = function(bid, title){
                    globalDataTemp.currentCheckinData.title = title;
                    globalDataTemp.currentCheckinData.bid = bid;
                    $state.go('menuView.facebook.checkin.createTemplate');
                    };
                    $scope.showAlert = function(title, msgTmpl, changeView) {
                    var alertPopup = $ionicPopup.alert({
                    title: title,
                    template: msgTmpl
                    });
                    $timeout(function(){
                    alertPopup.close();
                    if(changeView === true){
                    $scope.goBackToDetail();
                    }
                    }, 1200);
                    };
                    })

.controller('detailDirectionsController', function($scope, $state, globalVars, $rootScope,cordovareturn){
              analytics.trackView('Business Map view');
              cordovareturn.Getcurrentlocation();
              $scope.goBackToDetail = function(){
              if(globalVars.LTD_switch === 'detail'){
              $state.go('menuView.detailView');
              }
              else{
              $state.go($rootScope.prevState);
              }
               analytics.trackEvent('Business Events','Click on Back','Navigate to previous view',100);
              };
              })


.controller('testingController', function($scope, $state, fbAccess, androidServices, $cordovaSocialSharing,cordovareturn,$rootScope){

 cordovareturn.Getcurrentlocation();
  $scope.fbResponse = null;
  $scope.fbPic = null;
  $scope.fbFriends = null;
  $scope.isFBLogged = false;
    $scope.getFb = function(){
        ionic.Platform.ready(function(){
            if(!fbAccess.tokenStore.length){
                fbAccess.login().then(function(data){
                  $scope.isFBLogged = true;
                    androidServices.showToast(data);
                    //Synchronous facebook picture get
                    fbAccess.api('/me?fields=picture').then(function(response){
                        $scope.fbPic = response.picture.data.url;
                        androidServices.showToast("recieved user portrait from FB SDK");
                        //Synchronous facebook user details get
                        fbAccess.api('/me').then(function(response){
                            androidServices.showToast("recieved user data from FB SDK");
                            $scope.fbResponse = response;
                        });
                    });
                });
            }
        });
    };
    $scope.inviteFriends = function(){

    try{
      ionic.Platform.ready(function(){
          fbAccess.showAppDialog().then(function(data){


              androidServices.showToast(data);
          });
      });
      }
      catch(err){

      }
    };
    var message = 'a test share message';
    var image = '';
    var link = globalVars.MainklURl;
    $scope.shareonFacebook = function(){
        $cordovaSocialSharing
            .shareViaFacebook(message, image, link)
            .then(function(result) {

            }, function(err) {

            });
    };
    $scope.shareonTwitter = function(){
        $cordovaSocialSharing
            .shareViaTwitter(message, image, link)
            .then(function(result) {

            }, function(err) {

            });
    };
})

.controller('notifyController', function($scope, $state, globalVars, businessDetailData, $timeout, $ionicPopup, $rootScope,cordovareturn,resourceRequistion ){

    cordovareturn.Getcurrentlocation();
    function dashboardInit(){
        $rootScope.miniLoader = false;
        resourceRequistion.fetchNotifications('bizCancelled')
            .success(function(res){
             globalVars.notifications.bizCancelled = res;
                resourceRequistion.fetchNotifications('bizActive')
                    .success(function(res){
                    globalVars.notifications.bizActive = res;
                        resourceRequistion.fetchNotifications('bizPending')
                            .success(function(res){
                              globalVars.notifications.bizPending = res;
                                resourceRequistion.fetchNotifications('classComments')
                                    .success(function(res){
                                      globalVars.notifications.classComments = res;
                                        resourceRequistion.fetchNotifications('checkins')
                                            .success(function(res){
                                               globalVars.notifications.checkins = res;
                                                resourceRequistion.fetchNotifications('image')
                                                    .success(function(res){
                                                      globalVars.notifications.image = res;

                                                        $rootScope.miniLoader = false;
                                                    })
                                                    .error(function(res){

                                                    })
                                            })
                                            .error(function(res){

                                            })
                                    })
                                    .error(function(res){

                                    })
                            })
                            .error(function(res){

                            })
                    })
                    .error(function(res){

                    })
            })
            .error(function(res){

            })
    }
    dashboardInit();
    $scope.notificationList = globalVars.notifications;
})

//blogs controller
.controller('bloglistcontroller', function($scope, $state, globalVars, $timeout, $ionicPopup, $rootScope,cordovareturn,resourceRequistion, $ionicScrollDelegate,$cordovaSocialSharing,$interval,androidServices,$ionicPlatform){
           analytics.trackView('Recent News List view');

                       $scope.searchBack_btn=true;

                      $scope.imgeurl =globalVars.MainklURl+'img/Blog/';
                      $scope.blogslistshow=false;
                      $scope.blogcathide=true;
                      $scope.slideshowblogs=[];
                      $scope.slideshowblog=[];
                      $scope.autoblogslides=[];
                      $scope.blogcatedat=[];
                      $scope.Loadmore_count=10;
                      var datablog=[];
                      var i=0;
                      $scope.idf=i;
                       resourceRequistion.fetchrecentblogslist().then(function(data){
                                                                      $scope.blogslists=data.data;
                                                                      $rootScope.miniLoader=false;
                                                                      globalVars.Blogcomplete_data=data.data;
                                                                      });

                      $scope.tiltesubstr=function(txt){
                      var temp_text=txt || "";
                      var temp_finaltxt=txt ==undefined ? "" : temp_text;
                      if( temp_finaltxt.length <= 25){  return temp_finaltxt; }
                      else{
                      var text=temp_finaltxt.substr(0,25)+"...";
                      return text;
                      }
                      };
                       $scope.autoslideblogbingview=function(data){
                       var datav=parseInt(data) < 2 ?'view':'views';
                       return data+' '+datav;
                       };
                       $scope.autoslideblogbingcom=function(data){
                       var datav=parseInt(data) < 2 ?'comment':'commnets';
                       return data+' '+datav;
                       };
                       $scope.autosllidecreated=function(data){
                       return dateforimate(data);
                       };
                       //recent blogs
                       if(globalVars.Blogcomplete_data.length > 0){
                       $scope.blogslists=globalVars.Blogcomplete_data;
                       }
                       else{
                       $rootScope.miniLoader=true;
                       resourceRequistion.fetchrecentblogslist().then(function(data){
                                                                      $rootScope.miniLoader=false;
                       $scope.blogslists=data.data;
                       globalVars.Blogcomplete_data=data.data;
                       });
                       }
                       $scope.imgcountries = [ {name: "Accessories",img:"img/accessories.png"},{name: "Adventure Sports",img:"img/adventure_sports.png"},{name: "Agriculture",img:"img/agriculture.png"}, {name: "Air Conditioning",img:"img/air_conditioning.png"},{name: "Appareal",img:"img/appareal.png"}, {name: "ATM",img:"img/atm.png"},{name: "Automotive",img:"img/automotive.png"},{name: "Bank",img:"img/bank.png"}];
                       //html formtate text ng-bind custom function
                       $scope.blogdes=function(e){
                       return globalVars.htmlToPlaintext(e);
                       };
                       //blog detail view
                       $scope.gotoblogdetails=function(data){
                       analytics.trackEvent('News Events', 'Click on News item', 'Navigate to Detail view', 100);
                       globalVars.Blog_individual_Data=data;
                       $rootScope.miniLoader=true;
                       //blog view count update
                       resourceRequistion.updateblogviewcount(data.id).then(function(data){
                                                                             globalVars.Blog_individual_Data.des=data.data[0]['description'];
                                                                            $rootScope.miniLoader=false;
                       $state.go("menuView.blogdetails");
                       });
                       };

                        //recent tab click
                       $scope.recentblog=function(event){
                     //  $('.blogtabcls').removeClass('tab-item-active');
                     //  $(event.currentTarget).addClass('tab-item-active');

                       $('.barbuttonselted').removeClass('barbuttonselted');
                       $(event.currentTarget).addClass('barbuttonselted');

                       $scope.Loadmore_count=10;
                       $scope.blogslistshow=false;
                       $scope.blogcathide=true;
                       $ionicScrollDelegate.scrollTop();
                       $rootScope.miniLoader=true;
                       $rootScope.Current_typeName='Recent';
                       resourceRequistion.fetchrecentblogslist().then(function(data){
                       $scope.blogslists=data.data;
                       $rootScope.miniLoader=false;
                       globalVars.Blogcomplete_data=data.data;
                       });
                       analytics.trackView('Recent news list view');
                       analytics.trackEvent('News Events', 'Click on Recent Tab', 'open Recent News list  view', 100);

                       };
                       //popular tab click
                       $scope.popularblogs=function(event){
                      // $('.blogtabcls').removeClass('tab-item-active');
                       //$(event.currentTarget).addClass('tab-item-active');

                       $('.barbuttonselted').removeClass('barbuttonselted');
                       $(event.currentTarget).addClass('barbuttonselted');


                       $scope.Loadmore_count=10;
                       $scope.blogslistshow=false;
                       $scope.blogcathide=true;
                       $ionicScrollDelegate.scrollTop();
                       $rootScope.miniLoader=true;
                       $rootScope.Current_typeName='Popular';
                       resourceRequistion.fetchpopularblogslist().then(function(data){
                                                                       $rootScope.miniLoader=false;
                       $scope.blogslists=data.data;
                       globalVars.Blogcomplete_data=data.data;
                       });
                       analytics.trackView('Popular news list view');
                       analytics.trackEvent('News Events', 'Click on Popular Tab', 'open Popukar News list  view', 100);
                       };
                       $scope.blogscategorieslist=function(event){
                       $scope.Loadmore_count=10;
                      // $('.blogtabcls').removeClass('tab-item-active');
                     //  $(event.currentTarget).addClass('tab-item-active');

                       $('.barbuttonselted').removeClass('barbuttonselted');
                       $(event.currentTarget).addClass('barbuttonselted');

                       $ionicScrollDelegate.scrollTop();
                       $scope.blogslistshow=true;
                       $scope.blogcathide=false;
                      // if($scope.blogcatedat.length == 0){
                       $rootScope.miniLoader=true;
                        $rootScope.Current_typeName='NewsCategory';
                       resourceRequistion.fetchblogscategorieslist().then(function(data){
                       $scope.blogcatedat=data.data;
                                                                          $rootScope.miniLoader=false;
                       });
                      // }
                       analytics.trackView('news categories list view');
                       analytics.trackEvent('News Events', 'Click on Category Tab', 'open  News category list', 100);
                       };
                       //catgegory tab click
                       $scope.blogcategoryselect=function(id){
                       $rootScope.miniLoader=true;
                         $rootScope.Current_typeName='NewsCategory';
                       resourceRequistion.fetchblogscategoryseltlist(id).then(function(data){
                                                                              $rootScope.miniLoader=false;
                       $scope.blogslists=data.data;
                       if( $scope.blogslists.length >0){
                       $ionicScrollDelegate.scrollTop();
                       $scope.blogslistshow=false;
                       $scope.blogcathide=true;
                       globalVars.Blogcomplete_data=data.data;
                       }
                       else{
                       androidServices.showToast("No Blogs Found");
                       }
                       });
                       analytics.trackEvent('News Events', 'Click on Category Name', 'open selected category news list', 100);
                       };
                       //search button click
                       $scope.blogtitlesearch=function(){
                       $ionicScrollDelegate.scrollTop();

                        analytics.trackEvent('News Events', 'Click on Search', 'open search news lsit view based on search text', 100);
                       $scope.blogslistshow=false;
                       $scope.blogcathide=true;
                       if($scope.blogtext.length>=3){
                       $scope.blogcathide=true;
                       $rootScope.miniLoader=true;
                       resourceRequistion.fetchblogsearchdata($scope.blogtext).then(function(data){

                                                                                    $rootScope.miniLoader=false;


                       if(data.data.length >0){
                       $scope.Loadmore_count=10;

                       var temp_search_data=data.data;
                       $scope.seachblogslists=data.data;
                      globalVars.Blogcomplete_data=data.data;

                       $scope.seachblogslists.sort(function(a,b){

                                              return newssearchSort('recent',a,b);

                                              });
//                                               globalVars.Blogcomplete_data=$scope.blogslists;
                       $scope.blogcathide=false;
                       $scope.searchBack_btn=false;
                       $scope.serach_orderby ='created';
                       $(".barbuttonselted").removeClass('barbuttonselted');
                       $("#serachrecent_tab_id").removeClass('barbuttonselted');
                       $("#serachrecent_tab_id").addClass('barbuttonselted');

                           if($scope.seachblogslists.length >5){
                                               $(".news_paneClass").css("top","0px");
                                                                          }
                                              else{
                                                     $(".news_paneClass").css("top","-44px");

                                                        }


                                                                                    }
                       else{
                       androidServices.showToast("No News Found With The Keyword"+" "+$scope.blogtext);
                       }
                       });
                       }
                       };


                       $scope.getSearchrecentblog=function(event){
                       $scope.serach_orderby ='created';
                       $('.barbuttonselted').removeClass('barbuttonselted');
                       $(event.currentTarget).addClass('barbuttonselted');


                       $scope.seachblogslists.sort(function(a,b){

                       return newssearchSort('recent',a,b);

                       });
//                        globalVars.Blogcomplete_data=$scope.blogslists;




                       };
                       $scope.getSearchpopularblog=function(event){
                       $scope.serach_orderby ='view_count';
                       $('.barbuttonselted').removeClass('barbuttonselted');
                       $(event.currentTarget).addClass('barbuttonselted');
                       $scope.seachblogslists.sort(function(a,b){

                                              return newssearchSort('popular',a,b);

                                              });
//                                               globalVars.Blogcomplete_data=$scope.blogslists;

                       }


                       $scope.backtoindex=function(){
                         $(".news_paneClass").css("top","0px");

                       $(".barbuttonselted").removeClass('barbuttonselted');
                       $("#recent_tab_id").removeClass('barbuttonselted');
                       $("#recent_tab_id").addClass('barbuttonselted');

                       $rootScope.miniLoader=true;
                       $rootScope.Current_typeName="Recent";
                       resourceRequistion.fetchrecentblogslist()
                       .then(function(data){
                        $scope.blogslists=data.data;
                        $rootScope.miniLoader=false;
                        globalVars.Blogcomplete_data=data.data;
                        });
                        $scope.blogcathide =true;


                       };


                       $scope.blogsearchkeyup=function(event){
                       if(event.keyCode==13){
                       $scope.blogtitlesearch();
                       document.activeElement.blur();
                       }
                       };
                       //share icon click
                       $scope.shareblog=function(title,des){
                       sharefunctionfromblogs($cordovaSocialSharing,title,des,globalVars.MainklURl);
                       };
                       $scope.blogloadMore=function(){
                       $scope.Loadmore_count=$scope.Loadmore_count+10;
                       $scope.$broadcast('scroll.infiniteScrollComplete');
                       };

                       $scope.BlogslistRefresh=function(){

                       if($scope.searchBack_btn == true){

                     if($rootScope.Current_typeName == "Recent"){
           $rootScope.miniLoader=true;
                     resourceRequistion.fetchrecentblogslist().then(function(data){
                                 $scope.blogslists=data.data;
                                 $rootScope.miniLoader=false;
                                 globalVars.Blogcomplete_data=data.data;
                                 });

                     }

                     else if($rootScope.Current_typeName == "Popular") {
           $rootScope.miniLoader=true;
                     resourceRequistion.fetchpopularblogslist().then(function(data){
                                 $rootScope.miniLoader=false;
                                 $scope.blogslists=data.data;
                                 globalVars.Blogcomplete_data=data.data;
                                 });
                     }
                       else if($rootScope.Current_typeName == "NewsCategory") {


                       }
                       }

                       else{


                       }
                       $scope.$broadcast('scroll.refreshComplete');
                          $ionicScrollDelegate.scrollTop();


                       };

            })


.controller('blogdetailcontroller', function($scope, $state, globalVars,$http, $timeout,$interval, $ionicPopup, $rootScope,cordovareturn,resourceRequistion,$ionicSlideBoxDelegate,$ionicScrollDelegate,$ionicModal,$cordovaSocialSharing,$cordovaInAppBrowser,$ionicPlatform,$filter){
     analytics.trackView('News Detail view');
     var so = cordova.plugins.screenorientation;
     so.setOrientation(so.Orientations[4]);
     $scope.check_gustornot=globalVars.userInfo.id==undefined? false: true;
     var blog_data=globalVars.Blog_individual_Data;
     $scope.blogdetailed=blog_data;



     $("#blog_desid").html($scope.blogdetailed.des);
     $("#blog_desid .adsbygoogle").click(function(){
     if(window.__google_ad_urls.ob !=undefined){
     window.open(window.__google_ad_urls.ob[Math.floor(Math.random()*window.__google_ad_urls.ob.length)].wl,'_blank')
     }
     });
     $scope.video_url="";
     $scope.userlog=globalVars.MainklURl+'img/users/user_logo_folder';
     $scope.imgData=[];
     $scope.blogcomments=[];
     $scope.postcomnet={
     comment:""
     };
     if($scope.blogdetailed.video_url.length>1){
     var vsplite=$scope.blogdetailed.video_url.split('/');
     var thumb = globalVars.Youtubethumbfun($scope.blogdetailed.video_url, 'v');
     var finalthumb=thumb==""?vsplite[vsplite.length-1]:thumb;
     $scope.video_url ='http://img.youtube.com/vi/' + finalthumb + '/default.jpg';
     }
     if(parseInt(blog_data.imgarr_count) == 0){
     var pasta = blog_data.img;
     $scope.imgData.push({image : pasta});
     }
     else{
     if(blog_data.imgarr!=null){
     if(blog_data.imgarr.length==1){
     var pasta = blog_data.img;
     $scope.imgData.push({image : pasta});
     }
     else{
     angular.forEach(blog_data.imgarr, function(v, k){
     var glue =globalVars.MainklURl+'img/Blog/';
     $scope.imgData.push({image : glue + blog_data.id + '/' + v.name});
     });
     }
     }
     }
     //play video
     var playiframetemp = '<ion-modal-view class="bg_white">' +
                        '<ion-header-bar style="background:orange;">' + '<button class="button button-icon icon ion-android-arrow-back" ng-click="closeCatModal()" style="color:white;"></button>' +
                        '<h1 class="title"> News video</h1>' + '</ion-header-bar>' +'<ion-content class=" group align_center font_roboto font_color_blue" style="background:black">'+
                        '<youtube-video style="width:100%" video-url="anotherGoodOne" class="biz_videoplayercls">'+'</youtube-video>' +
                        '</ion-content>' +
                        '</ion-modal-view>';
     $scope.player = $ionicModal.fromTemplate(playiframetemp,{
     scope: $scope,
     animation: 'slide-in-up'
      });
     $scope.playblogvideo=function(url){
     var temo_yurl=url.split("=");
     var Final_Youtube="";
     if(temo_yurl.length > 2){
     Final_Youtube=url;
     }
    else{
    Final_Youtube=temo_yurl[1];
    }
     $scope.anotherGoodOne=Final_Youtube;
     $scope.player.show();
     analytics.trackEvent('News Events', 'Click on News video', 'open video player modal view with video', 100);
     };
    $scope.closeCatModal=function(){
    $scope.player.hide();
    $scope.anotherGoodOne="";
    var player_idsize=$(".biz_videoplayercls").length;
    var id=$(".biz_videoplayercls").attr('id');
     //unique-youtube-embed-id-1
    //the below line of code is for stop the you tube video
   //$('#unique-youtube-embed-id'+'-'+player_idsize)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
   $('#'+id)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
   analytics.trackEvent('News Events', 'Click on Close', ' player modal view close', 100);
   };
   $ionicPlatform.onHardwareBackButton(function(e){
   var player_idsize=$(".biz_videoplayercls").length;
   var id=$(".biz_videoplayercls").attr('id');
   //unique-youtube-embed-id-1
  //the below line of code is for stop the you tube video
 //$('#unique-youtube-embed-id'+'-'+player_idsize)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
  $('#'+id)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
  analytics.trackEvent('News Events', 'Click on Back', ' player modal view close', 100);
  });
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
  $scope.player.remove();
    });
     var so = cordova.plugins.screenorientation;
     so.setOrientation(so.Orientations[4]);
     var i=0;
     $scope.slideimgs=[];
     function blogimagesslide(){
     if(i >= $scope.imgData.length){
     i=0;
     $scope.slideimgs=$filter('imgUrlreplace')($scope.imgData[i].image);
     return $scope.slideimgs;
     }
     else{
     $scope.slideimgs=$filter('imgUrlreplace')($scope.imgData[i++].image);
     return $scope.slideimgs;
     }
     }
     blogimagesslide();
     $interval(blogimagesslide,3000);
     var blogimage_clss= $(".blog_detail_img_clss").height();
     $(".blog_detail_textclss").css('top','10px');
     $scope.bloddetaild=function(txt){
     return txt;
     // return globalVars.htmlToPlaintext(txt);
     };
     $scope.setBackAction=function(){
     analytics.trackEvent('News Events','Click on Back','Navigate to Previous view',100);
     $state.go($rootScope.$viewHistory.backView.stateName);
     };
      // $scope.getuserComments();
      $scope.temp_Blogcomments=[];
      Getblogcommentsin();//this function getting blog coments
      function Getblogcommentsin(){
      resourceRequistion.fetchblogcomments(blog_data.id).then(function(data){
      if(typeof(data.data)=="object"){
      $scope.blogcomments=data.data.slice(0,5);
      $scope.temp_Blogcomments=data.data;
      if($scope.temp_Blogcomments.length >5 ){
       $("#loadMore").show();
       }
       else{
       $("#loadMore").hide();
       }
       }
       });
       }
       $scope.loadmoreAdComments=function(event){
       var load_AdsComments=$scope.temp_Blogcomments.slice($scope.blogcomments.length,$scope.blogcomments.length+5);
       $scope.blogcomments=$scope.blogcomments.concat(load_AdsComments);
       if($scope.blogcomments.length == $scope.temp_Blogcomments.length){
       $(event.currentTarget).hide();
       }
       else{
       $(event.currentTarget).show();
       }
       };
       $scope.getuserComments=function(){
       if($scope.check_gustornot==false){
       sessionStorage.Gust_generalID=blog_data.id;
       sessionStorage.Gust_Class="Blog";
       var SendParams={
       Gust_data: sessionStorage.Gust_generalID+"_"+"Blog",
       previous_state:$state.current.name
       };
       analytics.trackEvent('News Events', 'Click on post comments', 'Navigate to guest user comment view', 100);
       $state.go("menuView.Gustcomment", {params:SendParams});
       }
       else{
       cordova.plugins.Keyboard.show();
       analytics.trackEvent('News Events', 'Click on post comments', ' open a pop for post comment', 100);
       var myPopup = $ionicPopup.show({
       template: '<textarea ng-model="postcomnet.comment" id="comment_textarea" autofocus style="height:100px;">',
       title: 'Write a Comment',
       scope: $scope,
       buttons: [{ text: 'Cancel' },
       {
       text: '<b>Post</b>',
       type: 'button-positive',
       onTap: function(e) {
       if($scope.postcomnet.comment == "" || $scope.postcomnet.comment == undefined){
       $('#comment_textarea').css('border','1px solid red');
       }
       else{
       cordova.plugins.Keyboard.close();
       $('#comment_textarea').css('border','1px solid gray');
       analytics.trackEvent('News Events', 'Click on Post', 'save comment and close pop', 100);
       var url=globalVars.siteURL+'blogs_forums.php?function=blogpostcomment&userid='+globalVars.userInfo.id+'&comment='+$scope.postcomnet.comment+'&active='+1+'&id='+blog_data.id+'&date='+new Date();
       $http.get(url).then(function(data){
       $scope.postcomnet.comment="";
       Getblogcommentsin();
       },function(err){
       });
       }}}]})}
       };
       $scope.getrelatedblogd=function(){
       globalVars.blogclickfor="Related News";
       globalVars.blogkeywordfromdetail=blog_data.meta_keyword;
       globalVars.blogcatidfromdetail=blog_data.catid;
       globalVars.blogidfromdetail=blog_data.id;
       analytics.trackEvent('News Events', 'Click on Related news', 'Navigate to Related news list view', 100);
       $state.go("menuView.relatedandcomments");
       };
       $scope.autoslideblogbingview=function(data){
       var datav=parseInt(data) < 2 ?'view':'views';
       return data+' '+datav;
       };
       $scope.autoslideblogbingcom=function(data){
       var datav=parseInt(data) < 2 ?'comment':'commnets';
       return data+' '+datav;
       };
       $scope.autosllidecreated=function(data){
        return dateforimate(data);
           };
       //post blog comment post start here
       $scope.checkcomment=function(){
       if($scope.postcomnet.comment == ""){
       }
       else{
       $('.blogpost_cls').css('border','1px solid gray');
       }
       };
        //post coment end here
        $scope.shareblog=function(title,des){
        sharefunctionfromblogs($cordovaSocialSharing,title,des,globalVars.MainklURl);
        };

        $("#blog_desid").find("a").click(function(event){

        var href = "";

        if($(this).attr('href') != undefined){

        var href = $(this).attr('href').replace("<a%20class='serverAClass'>","");
        }
        else{

        var href = $(this).text();
        }

        var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'yes'
        };
                                          event.preventDefault();
        $cordovaInAppBrowser.open(href, '_blank', options)
        .then(function(event) {
        // success
              //alert('rele');
             //  $rootScope.miniLoader=false;
        })
        .catch(function(event) {
        // error
               //alert('fd');
             //  $rootScope.miniLoader=false;
        });
        analytics.trackEvent('News Events', 'Click on Link in news description', ' open seleted link inapp browser', 100);
        });

//            $("a.serverAClass").on('click',function(event){
//                                   var url=$(this).text();
//
//                                   analytics.trackEvent('News Events','Click on link ','Open this '+ url + ' link in inappbrowser',100);
//
//                                   var options = {
//                                   location: 'yes',
//                                   clearcache: 'yes',
//                                   toolbar: 'yes'
//                                   };
//                                   event.preventDefault();
//                                   $cordovaInAppBrowser.open($(this).html(), '_blank', options).then(function(event){}).catch(function(event){});
//                                   });


        })
//RELATED BLOGS AND COMMENTS CONTROLLER
.controller('relatedcommentscontroller', function($scope, $state,$http, globalVars, $timeout, $ionicPopup, $rootScope,cordovareturn,resourceRequistion,$cordovaDialogs,$cordovaSocialSharing){
                  analytics.trackView('Related news lsit view');
                  $rootScope.miniLoader = true;
                  $scope.viewtitle=globalVars.blogclickfor;
                  $scope.autoslideblogbingview=function(data){
                   var datav=parseInt(data) < 2 ?'view':'views'
                   return data+' '+datav;
                   };
                   $scope.autoslideblogbingcom=function(data){
                   var datav=parseInt(data) < 2 ?'comment':'commnets'
                   return data+' '+datav;
                   };
                   $scope.autosllidecreated=function(data){
                   return dateforimate(data);
                   };
                   if(globalVars.blogclickfor=="Related News"){
                   $scope.relatedblogs_class=false;
                   $scope.comments_class=true;
                   $scope.imgeurl = globalVars.MainklURl+'img/Blog/';
                   resourceRequistion.fetchrelatedblogsdata( globalVars.blogkeywordfromdetail, globalVars.blogcatidfromdetail,globalVars.blogidfromdetail).then(function(data){
                   $scope.relatedblogs=data.data;
                   $rootScope.miniLoader = false;
                   });
                   }
                   $scope.gotoblogdetails=function(data){

                   globalVars.Blog_individual_Data=data;
                   resourceRequistion.updateblogviewcount(data.id).then(function(data){
                  globalVars.Blog_individual_Data.des=data.data[0]['description'];
                   $state.go("menuView.blogdetails");
                   });

                   analytics.trackEvent('News Events','Click on News item','Navigate to News detail view',100);
                   };
                   $scope.setBackAction=function(){
                   analytics.trackEvent('News Events','Click on Back','Navigate to previous view',100);
                   $state.go($rootScope.$viewHistory.backView.stateName);
                   };
                   $scope.shareblog=function(title,des){
                   sharefunctionfromblogs($cordovaSocialSharing,title,des,globalVars.MainklURl);
                   };
                   })
//forums business controller

.controller('forumlistcontroller', function($scope, $state, globalVars, $timeout, $ionicPopup, $rootScope,cordovareturn,resourceRequistion,$ionicModal,$http,$cordovaSocialSharing,androidServices,$ionicPlatform,$ionicScrollDelegate){
           analytics.trackView('Forum Recent List view');

            $scope.searchBack_btn =true;

            $scope.formuslistshow=false;
            $scope.forumcatshow=true;
            $scope.catdata = {};
            $scope.postmodel={};
            $scope.postmodel.tilte="";
            $scope.postmodel.description="";
            $scope.catdata.selectid=null;
            $scope.selectcatid="";
            $scope.ForumSLoadmore_count=20;
            $rootScope.miniLoader=true;
            /*=====================Modal view creating========================*/
            $ionicModal.fromTemplateUrl('forumadd.html', {
             scope: $scope,
             animation: 'slide-in-up'
             }).then(function(modal) {
              $scope.modal = modal;
              });
             $scope.openpostforum=function(){
             analytics.trackEvent('Forum Events', 'Click on post forum', 'if user logged in open post forum form module otherwise navigate to login view', 100);
             if(globalVars.userInfo.id == undefined){
             globalVars.loginstatus="notlogged";
             globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
             $state.go('loginView');
             }
             else{
             $scope.modal.show();
             resourceRequistion.fetchforumcatlist().then(function(data){
             $scope.catdata.forumcats=data.data;
             });
             }
             };
             $scope.closemodalview=function(){
              analytics.trackEvent('Forum Events', 'Click on close modal', 'close post forum form modal view', 100);
              $scope.modal.hide();
              $scope.modal.remove();
              $ionicModal.fromTemplateUrl('forumadd.html', {
                           scope: $scope,
                           animation: 'slide-in-up'
                           }).then(function(modal) {
                            $scope.modal = modal;
                            });
                };
             $scope.formforumValid = false;
             $scope.$on('formIsValid', function(e, name){
              if(name === 'forum_add'){
              $scope.formforumValid = true;ƒ
               }
              if(name === 'forum_add'){
              $scope.formforumValid = true;
              }
              if(name === 'forum_add'){
              $scope.formforumValid = true;
               }
              if(name === 'default'){
              $scope.formforumValid = true;
               }
               });
        $scope.$on('formIsNotValid', function(e, name){
        if(name === 'forum_add'){
            $scope.formforumValid = false;
        }
        if(name === 'forum_add'){
            $scope.formforumValid = false;
        }
        if(name === 'forum_add'){
           $scope.formforumValid = false;
        }
        if(name === 'default'){
            $scope.defaultFormValid = false;
        }
    });
         $scope.Addfroumfrommodal=function(){
          analytics.trackEvent('Forum Events', 'Click on post', 'Save forum in database and close the modal', 100);
         if( $scope.postmodel.tilte !="" && $scope.postmodel.tilte !=undefined &&  $scope.postmodel.description !="" && $scope.postmodel.description !=undefined && $scope.catdata.selectid !=null){
          var urk=globalVars.siteURL+'blogs_forums.php?function=forumadd&userid='+globalVars.userInfo.id+'&catid='+$scope.catdata.selectid+'&title='+$scope.postmodel.tilte+'&desc='+$scope.postmodel.description+'&active='+1;
          $http.get(urk).then(function(data){
          $scope.postmodel.tilte="";
          $scope.postmodel.description="";
          resourceRequistion.fetchforumrecentlist().then(function(data){
          $scope.forumlists=data.data;
          });
          $scope.closemodalview();
          },function(err){});
          }
          else{
          androidServices.showToast("Fill All fields");
          }
          };
          $scope.postreset=function(){
          //$scope.postmodel.tilte="";
         //$scope.postmodel.description="";
         //  $scope.postmodel={};





          analytics.trackEvent('Forum Events', 'Click on Clear Data', 'Remove user enter data in form ', 100);
            };
            $rootScope.miniLoader=true;
            resourceRequistion.fetchforumrecentlist().then(function(data){
                                                           $rootScope.miniLoader=false;
            $scope.forumlists=data.data;
            });



            //recent tab click
            $scope.getrecentforums=function(event){
            $scope.temp_evnt = event;
            $scope.ForumSLoadmore_count=10;
           // $('.blogtabcls').removeClass('tab-item-active');
          //  $(event.currentTarget).addClass('tab-item-active');


            $('.barbuttonselted').removeClass('barbuttonselted');
            $(event.currentTarget).addClass('barbuttonselted');

            $scope.formuslistshow=false;
            $scope.forumcatshow=true;
            $rootScope.miniLoader=true;
            $rootScope.Current_typeName="Recent";
            resourceRequistion.fetchforumrecentlist().then(function(data){
            $scope.forumlists=data.data;
            $rootScope.miniLoader=false;
            });
            analytics.trackView('Forum Recent List view');
            analytics.trackEvent('Forum Events', 'Click on Recent Tab', 'Open Recent forums list view', 100);
            };
             //popular tab clicked
             $scope.getpopularforums=function(event){
             $scope.ForumSLoadmore_count=10;
            // $('.blogtabcls').removeClass('tab-item-active');
           //  $(event.currentTarget).addClass('tab-item-active');

            $('.barbuttonselted').removeClass('barbuttonselted');
            $(event.currentTarget).addClass('barbuttonselted');

             $scope.formuslistshow=false;
             $scope.forumcatshow=true;
             $rootScope.miniLoader=true;
             $rootScope.Current_typeName="Popular";
             resourceRequistion.fetchforumpopularlist().then(function(data){
             $scope.forumlists=data.data;
              $rootScope.miniLoader=false;
             });
             analytics.trackView('Forum Popular List view');
             analytics.trackEvent('Forum Events', 'Click on popular Tab', 'Open popular forums list view', 100);
             };
             //category tab click
             $scope.getforumcategories=function($event){
             $scope.ForumSLoadmore_count=10;
            // $('.blogtabcls').removeClass('tab-item-active');
            // $(event.currentTarget).addClass('tab-item-active');

            $('.barbuttonselted').removeClass('barbuttonselted');
            $(event.currentTarget).addClass('barbuttonselted');

             $scope.formuslistshow=true;
             $scope.forumcatshow=false;
            $rootScope.miniLoader=true;
             resourceRequistion.fetchforumcatlist().then(function(data){
             $scope.forumcategoires=data.data;
               $rootScope.miniLoader=false;
             });
             analytics.trackView('Forum Category List view');
             analytics.trackEvent('Forum Events', 'Click on Category Tab', 'Open  forum category list view', 100);
             };

            $scope.getSearchrecentforum=function(event){

            $('.barbuttonselted').removeClass('barbuttonselted');
            $(event.currentTarget).addClass('barbuttonselted');
            $(".search_recentcls").show();
            $(".search_popularcls").hide();
             $scope.serach_orderby ='created';

            };

            $scope.getSearchpopularforum=function(event){

            $('.barbuttonselted').removeClass('barbuttonselted');
            $(event.currentTarget).addClass('barbuttonselted');
            $(".search_recentcls").hide();
            $(".search_popularcls").show();

               $scope.serach_orderby ='view_count';

            };


            $scope.forumbacktoindex=function(){

             // $scope.temp_evnt
             $(".forum_paneClass").css("top","0px");
            $scope.searchBack_btn=!$scope.searchBack_btn;
             $scope.forumtext='';

            $(".barbuttonselted").removeClass('barbuttonselted');
            $("#recent_tab_id").removeClass('barbuttonselted');
            $("#recent_tab_id").addClass('barbuttonselted');

            $rootScope.miniLoader=true;
            $rootScope.Current_typeName="Recent";
            resourceRequistion.fetchforumrecentlist().then(function(data){
                                                           $scope.forumlists=data.data;
                                                           $rootScope.miniLoader=false;
                                                           });

         //   $scope.getrecentforums( $scope.temp_evnt);
            };



             $scope.categoryforumsbasedonid=function(id){
             $scope.formuslistshow=false;
             $scope.forumcatshow=true;
            $rootScope.miniLoader=true;
             resourceRequistion.fetchcatforumslist(id).then(function(data){
             $scope.forumlists=data.data;
              $rootScope.miniLoader=false;
              $ionicScrollDelegate.scrollTop();
             });
            // analytics.trackView('Forum Category List view');
                          analytics.trackEvent('Forum Events', 'Click on Category name', 'Open selected category forums list view', 100);

             };
             $scope.forumsearchlist=function(){
            $rootScope.miniLoader=true;
             analytics.trackEvent('Forum Events', 'Click on search', 'Open search forum list view based on search text', 100);

             resourceRequistion.fetchforumsearchlist($scope.forumtext).then(function(data){
                  $rootScope.miniLoader=false;
             if(data.data.length >0){

             $scope.forumlists =data.data;

             $scope.serach_orderby ='created';

             $(".barbuttonselted").removeClass('barbuttonselted');

            $("#serachrecent_tab_id").removeClass('barbuttonselted');
            $("#serachrecent_tab_id").addClass('barbuttonselted');

            $scope.searchBack_btn=false;


            if($scope.forumlists.length >5){
            $(".forum_paneClass").css("top","0px");
                                        }
              else{
                 $(".forum_paneClass").css("top","-44px");

                }

                $scope.formuslistshow=false;

               $scope.forumcatshow =true;

             }
             else{
             androidServices.showToast("No Result found with this "+$scope.forumtext+" keyword");
             }
             });
             };





             $scope.forumsearchkeyup=function(event){
             if(event.keyCode==13){
             $scope.forumsearchlist();
             document.activeElement.blur();
             }
             };
             $scope.forumdes=function(e){
             var text=globalVars.htmlToPlaintext(e);
             return globalVars.substringmethod(text.replace(/&nbsp;/g,''));
             };
             $scope.getforumdetails=function(data){
              analytics.trackEvent('Forum Events', 'Click on forum item', 'Navigate to forum detail view', 100);

             globalVars.formumdetails=data;
             $rootScope.miniLoader=true;
             resourceRequistion.updateforumviewcount(globalVars.formumdetails.id).then(function(data){
             $rootScope.miniLoader=false;
             $state.go('menuView.forumdetails');
             });

             };
             //share click for forum share
             $scope.shareForm=function(data){
             forumsharefunction($cordovaSocialSharing,data,globalVars.MainklURl);
             };
             /*?==============================ngbind function for forum user name substring====================================?*/
             $scope.klforumSubstr=function(txt){
             if(txt.length <= 17 ){
             return txt;
             }
             else{
             var temp_txt=txt.substr(0,14)+"...";
             return temp_txt;
             }
             };
             $scope.ForumsloadMore=function(){
             $scope.ForumSLoadmore_count=$scope.ForumSLoadmore_count+10;
             $scope.$broadcast('scroll.infiniteScrollComplete');
              };
              $ionicPlatform.onHardwareBackButton(function(e){
              //   $state.go('menuView.detailView');
              });

              $scope.formslistRefresh=function(){
            if($scope.searchBack_btn == true){
              if($rootScope.Current_typeName == "Recent"){
              $rootScope.miniLoader=true;
               resourceRequistion.fetchforumrecentlist().then(function(data){
                          $rootScope.miniLoader=false;
                          $scope.forumlists=data.data;
                          })
              }
              else if($rootScope.Current_typeName == "Popular"){
              $rootScope.miniLoader=true;
              resourceRequistion.fetchforumpopularlist().then(function(data){
                           $rootScope.miniLoader=false;
                           $scope.forumlists=data.data;
                           });
              }
            }
            else{


            }
               $scope.$broadcast('scroll.refreshComplete');
                             $ionicScrollDelegate.scrollTop();



              };
              })

.controller('forumdetailcontroller', function($scope,$sce, $state, globalVars, $timeout, $ionicPopup, $rootScope,cordovareturn,resourceRequistion,$cordovaSocialSharing,$http,$ionicScrollDelegate,$location,$anchorScroll,$ionicPlatform,$cordovaInAppBrowser ){
           analytics.trackView('Forum Detail view');

           $scope.viewother=true;

           $scope.userlog=globalVars.MainklURl+'img/users/user_logo_folder';

           $scope.check_gustornot=globalVars.userInfo.id==undefined? false: true;

           $scope.user_error_logo=globalVars.user_error_logo;

           $scope.formumdetails=globalVars.formumdetails;

           $scope.forumusercomments=[];

           $scope.desc = $sce.trustAsHtml(globalVars.formumdetails.description);

           $scope.postcomnet={
            comment:""
            };
            $scope.setBackAction=function(){

            analytics.trackEvent('Forum Events', 'Click on Back button', 'Navigate to previous view', 100);

            $state.go($rootScope.$viewHistory.backView.stateName);

            };


            $("#forum_desc_id").append(globalVars.formumdetails.description);


            $("#forum_desc_id").find("a").click(function(event){

                    var href = "";
                    if($(this).attr('href') != undefined){
                     var href = $(this).attr('href').replace("<a%20class='serverAClass'>","");
                      href =  href.replace("<a class='serverAClass'>","");

                    }
                    else{

                    var href = $(this).text();
                    }

                    var options = {
                    location: 'yes',
                    clearcache: 'yes',
                    toolbar: 'yes'
                    };
                                                      event.preventDefault();
                    $cordovaInAppBrowser.open(href, '_blank', options)
                    .then(function(event) {
                    // success
                          //alert('rele');
                         //  $rootScope.miniLoader=false;
                    })
                    .catch(function(event) {
                    // error
                           //alert('fd');
                         //  $rootScope.miniLoader=false;
                    });
                   analytics.trackEvent('forum Events','Click on link ','Open this '+ href + ' link in inappbrowser',100);
  });

//            $("a.serverAClass").on('click',function(event){
//
//
//                                   var url=$(this).text();
//                                  analytics.trackEvent('forum Events','Click on link ','Open this '+ url + ' link in inappbrowser',100);
//
//                                   var options = {
//                                   location: 'yes',
//                                   clearcache: 'yes',
//                                   toolbar: 'yes'
//                                   };
//                                   event.preventDefault();
//                                   $cordovaInAppBrowser.open($(this).html(), '_blank', options).then(function(event){}).catch(function(event){});
//                                   });


            getForumcommentsdata(); //load the forum comments by using this callback func

            $scope.temp_Forumcomments=[];

             function getForumcommentsdata(){

             resourceRequistion.fetchforumcomments(globalVars.formumdetails.id).then(function(data){

             if(typeof(data.data)=="object"){

             $scope.temp_Forumcomments=data.data;

             $scope.forumusercomments=data.data.slice(0,5);
              }
              else{
              }
              });
              }
              $scope.getuserComments=function(){
               //  Getblogcommentsin();
                if($scope.check_gustornot == false){
                sessionStorage.Gust_generalID=globalVars.formumdetails.id;
                sessionStorage.Gust_Class="Forum";
                var SendParams={
                Gust_data: sessionStorage.Gust_generalID+"_"+"Forum",
                previous_state:$state.current.name
                };

                analytics.trackEvent('Forum Events', 'Click on Post Comment', 'Navigate to Gust user comment view', 100);

                $state.go("menuView.Gustcomment", {params:SendParams});
                }
                else{

                cordova.plugins.Keyboard.show();

                 analytics.trackEvent('Forum Events', 'Click on Post Comment', 'Open a pop up for post comment', 100);

                var myPopup = $ionicPopup.show({

                template: '<textarea ng-model="postcomnet.comment" id="comment_textarea" autofocus style="height:100px;">',

                title: 'Write a Comment',

                scope: $scope,

                buttons: [{ text: 'Cancel' },
                {
                text: '<b>Post</b>',
                type: 'button-positive',
                onTap: function(e) {
                if($scope.postcomnet.comment == "" || $scope.postcomnet.comment == undefined){
                $('#comment_textarea').css('border','1px solid red');
                }
                else{
                cordova.plugins.Keyboard.close();
                $('#comment_textarea').css('border','1px solid gray');
                 analytics.trackEvent('Forum Events', 'Click on Post', 'save comment and close post comment pop', 100);
                var url=globalVars.siteURL+'blogs_forums.php?function=forumpostcomment&userid='+globalVars.userInfo.id+'&comment='+$scope.postcomnet.comment+'&active='+1+'&id='+globalVars.formumdetails.id+'&date='+new Date();
                $http.get(url).then(function(data){
                $scope.postcomnet.comment ="";
                getForumcommentsdata();

                },function(err){ });
                }}}]});
                }
                };
               $scope.loadmoreAdComments=function(event){
               var load_AdsComments=$scope.temp_Forumcomments.slice($scope.forumusercomments.length,$scope.forumusercomments.length+5);
               $scope.forumusercomments=$scope.forumusercomments.concat(load_AdsComments);
               if($scope.forumusercomments.length == $scope.temp_Forumcomments.length){
               //  $("#loadMore").hide();
               $(event.currentTarget).hide();
               }
               else{
               // $("#loadMore").show();
               $(event.currentTarget).show();
               }
               };
               $scope.getforumComments=function(){
               globalVars.forumfromdetaile="Comments";
               $state.go('menuView.relatedforums');
               };
               $scope.getrelatedforums=function(){
                analytics.trackEvent('Forum Events', 'Click on Related forums', 'Navigate to Related forums view', 100);
               globalVars.forumfromdetaile="Related Forums";
               $state.go('menuView.relatedforums');
               };
               $scope.shareForm=function(data){
               forumsharefunction($cordovaSocialSharing,data,globalVars.MainklURl);
               };
               $scope.checkcomment=function(){
               if($scope.postcomnet.comment == "" || $scope.postcomnet.comment == undefined){
               }
               else{
               $('.blogpost_cls').css('border','1px solid gray');
               }
               };
               $scope.autosllidecreated=function(data){
               return dateforimate(data);
               };
               })

.controller('relatedforumcontroller', function($scope, $state, globalVars, $timeout, $ionicPopup, $rootScope,cordovareturn,resourceRequistion,$cordovaDialogs,$http,$cordovaSocialSharing){
                           analytics.trackView('Related forum list view');

                           $scope.viewtitle=globalVars.forumfromdetaile;

                           $scope.userlog=globalVars.MainklURl+'img/users/user_logo_folder';

                           if(globalVars.forumfromdetaile=="Related Forums"){

                           $scope.relatedblogs_class=false;

                           $scope.comments_class=true;

                           $scope.postcomments_class=true;

                           var metakey=globalVars.formumdetails.meta_keyword==null?"":globalVars.formumdetails.meta_keyword;

                           resourceRequistion.fetchrelatedforumlist(metakey,globalVars.formumdetails.forums_category_id,globalVars.formumdetails.id).then(function(data){

                           $scope.forumlists=data.data;

                           });

                           }
//                           else{
//
//                           $scope.relatedblogs_class=true;
//
//                           $scope.comments_class=false;
//
//                           $scope.postcomments_class=false;
//
//                           if(globalVars.formumdetails.comments_count>0){
//
//                           resourceRequistion.fetchforumcomments(globalVars.formumdetails.id).then(function(data){
//
//                           $scope.usercomments=data.data;
//
//                           $scope.comments_class=false;
//                           });
//                           }
//                           else{
//
//                           $scope.comments_class=true;
//
//                           }
//                           }

                           $scope.formumdetails=globalVars.formumdetails;

                           $scope.setBackAction=function(){
                            analytics.trackEvent('Forum Events', 'Click on Back', 'Navigate to previous view', 100);

                           $state.go($rootScope.$viewHistory.backView.stateName);
                           };

                           $scope.getforumdetails=function(data){

                           analytics.trackEvent('Forum Events', 'Click on forum item', 'Navigate to forum  detail view', 100);
                           globalVars.formumdetails=data;

                           resourceRequistion.updateforumviewcount(globalVars.formumdetails.id).then(function(data){

                           $state.go('menuView.forumdetails');
                           });
                           };
                           $scope.forumdes=function(e){
                           var text= globalVars.htmlToPlaintext(e);
                           return globalVars.substringmethod(text.replace(/&nbsp;/g,''));
                           };
//                           $scope.Postcomments=function(){
//                           if(globalVars.userInfo.id == undefined){
//                           globalVars.loginstatus="notlogged";
//                           globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
//                           $state.go('loginView');
//                           }
//                           else{
//                           $cordovaDialogs.prompt('Enter your comment', 'Comments', ['Post','Cancel'], 'enter your comment')
//                           .then(function(result) {
//                            var input = result.input1;
//                            var btnIndex = result.buttonIndex;
//                            if(btnIndex==1){
//                             var url=globalVars.siteURL+'blogs_forums.php?function=forumpostcomment&userid='+globalVars.userInfo.id+'&comment='+input+'&active='+1+'&id='+globalVars.formumdetails.id+'&date='+new Date();
//                             $http.get(url).then(function(data){
//                             resourceRequistion.fetchforumcomments(globalVars.formumdetails.id).then(function(data){
//                             $scope.usercomments=data.data;
//                             });
//                             },function(err){
//                              });
//                              }
//                              else{  }
//                               });
//                               }
//                               };
                               $scope.normalhtml=function(html){
                               return normalinghtmltags(html,$scope,$sce);
                               };
                               $scope.shareForm=function(data){
                               forumsharefunction($cordovaSocialSharing,data,globalVars.MainklURl);
                                };
                             /*?==============================ngbind function for forum user name substring====================================?*/
                             $scope.klforumSubstr=function(txt){
                             if(txt.length <= 17 ){
                             return txt;
                             }
                              else{
                              var temp_txt=txt.substr(0,14)+"...";
                              return temp_txt;
                              }
                              };
                              })



.controller('ContactUScontroller', function($scope, $state, globalVars, globalDataTemp, businessDetailData, $timeout, $ionicPopup, $rootScope,cordovareturn,$http,androidServices){
 analytics.trackView('Contact US View');
  $scope.formEntry = {
   first_name  : '',
   last_name :  '',
   email:'',
   contact_number  : '',
   subject:'',
   message:''
    };
    $scope.contactformvalid = !contactus_form.$invalid;
    $scope.formUpdate = function(){
     if($scope.formEntry.first_name && $scope.formEntry.last_name && $scope.formEntry.email && $scope.formEntry.contact_number && $scope.formEntry.subject && $scope.formEntry.message){
      if($scope.formEntry.first_name.length >0 && $scope.formEntry.last_name.length >0  && $scope.formEntry.email.length >0 && $scope.formEntry.contact_number.length >0 && $scope.formEntry.subject.length >0 && $scope.formEntry.message.length >0){
       $scope.contactformvalid = false;
       }
          else{
           $scope.contactformvalid = true;
            }
              }
               else{
                $scope.contactformvalid = true;
                  }
                   };
 function cleanScope(){
  $scope.formEntry = {
   first_name  : undefined,
   last_name :  undefined,
   email:undefined,
   contact_number  : undefined,
   subject:undefined,
   message:undefined
    };
     }
   $scope.send = function(){
  // $rootScope.miniLoader = true;
    var post_data = {
     Contact : {
             first_name  : $scope.formEntry.first_name,
                last_name :  $scope.formEntry.last_name,
                email:$scope.formEntry.email,
                contact_number  :$scope.formEntry. contact_number,
                subject:$scope.formEntry.subject,
                message:$scope.formEntry.message


              }
                };
                var compiledData = globalVars.MainklURl+'MobileEmail/contact_us_send';
                  return $http.post(compiledData, post_data).success(function(data){
                  $rootScope.miniLoader = false;
                //  $scope.contactus_form.$setPristine();
                 // cleanScope();
                   androidServices.showToast('Successfull send...');
                   $state.go('menuView.listingView.categorytabs.search');
                    }, function error(err){
                     return err;
                        });
 analytics.trackEvent('Contact us', 'Click on send', 'Send email with enter details to Admin', 100);


                         };

})

.controller('GustCommnetController', function($scope, $state,$stateParams, globalVars, globalDataTemp, businessDetailData, $timeout, $ionicPopup, $rootScope,cordovareturn,$http,androidServices){
analytics.trackView('Gust Comment view ');
                  $scope.gustentry = {
                  name  : '',
                  number  : '',
                  email:'',
                  comment:'',
                  class:sessionStorage.Gust_Class || '',
                  general_id:sessionStorage.Gust_generalID || ''
                 // is_active:sessionStorage.Gust_Class=='forum'?1:0
                                     };
                $scope.gustIntegrity = !Gustcomment_form.$invalid;
                $scope.formUpdate = function(){
                if($scope.gustentry.name  && $scope.gustentry.email && $scope.gustentry.number  && $scope.gustentry.comment){
                if($scope.gustentry.name.length >0   && $scope.gustentry.email.length >0 && $scope.gustentry.number.length >0  && $scope.gustentry.comment.length >0){
                $scope.gustIntegrity = false;
                }
                else{
                $scope.gustIntegrity = true;
                }
                }
                else{
                $scope.gustIntegrity = true;
                   }
                   };

     $scope.goBackToDetail=function(){
   analytics.trackEvent('Gust Comment', 'Click on Cancel', ' Back to Previous view' + '( '+ $scope.gustentry.class +' )', 100);


     $state.go($rootScope.$viewHistory.backView.stateName);

     };

     $scope.PostcommentforSend=function(){
      $rootScope.miniLoader = true;
     analytics.trackEvent('Gust Comment', 'Click on Post comment', 'Save comment in comments list  and navigate to '+$scope.gustentry.class+' view', 100);
     $http.post(globalVars.siteURL + 'GustUserComments.php',{insert:$scope.gustentry})
                     .then(function(msg){
                      $rootScope.miniLoader = false;
                     return $state.go($rootScope.$viewHistory.backView.stateName);
                     });

     };


});


//GustCommnetController
/*_________________________________________common calling functions__________________________________________________________*/
function normalinghtmltags(html,$scope,$sce){
$scope.t = $sce.trustAsHtml(html);
return $scope.t;
}

//this function for --->sorting array
function compareStrings(a, b) {
 // Assuming you want case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

 function startwithtext(source,scope,searchterm,globalVars,rootScope) {
 rootScope.miniLoader = true;
   var term = searchterm;
    var startsWithMatcher = new RegExp("^" + term, "i");
    var startsWith = $.grep(source, function(value) {
      return startsWithMatcher.test(value.title);
       });
        var containsMatcher = new RegExp(term, "i");
         var contains = $.grep(source, function (value) {
          return $.inArray(value.title, startsWith) < 0 &&  containsMatcher.test(value.title);
           });
            var returndata=startsWith.concat(contains);
              var uniqueNames = [];
             $.each(returndata, function(i, el){

              if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);

           });
           scope.searchresultdatas= uniqueNames;

           globalVars.Searchobj=scope.searchresultdatas;
           rootScope.miniLoader = false;


             }
function checkareadivvisible(e){

if($('#areaseltid').is(':visible')==false){

$('.bar-subheader.search-subheader').css('height','105px');
$('.defaulttabs .tabs+.pane').css('top','150px');
$('.microtabs .tabs').css('top','50px');
$('.microtabs .tabs+.pane').css('top','120px');
}
else{

$('.bar-subheader.search-subheader').css('height','51px');
$('.defaulttabs .tabs+.pane').css('top','80px');
$('.microtabs .tabs').css('top','0px');
$('.microtabs .tabs+.pane').css('top','60px');
}

$('#areaseltid').is(':visible')==true?$('#areaseltid').hide():$('#areaseltid').show();

}

function checkareavisible(root){



if($('#areaseltid').is(':visible')==false){

    $('.bar-subheader.search-subheader').css('height','41px');

    $('.bar-subheader.search-subheader').css('height',root.$viewHistory.currentView.stateName =='menuView.categorieslist' ? '41px' : '41px');
//$('.catshome .tabs+.pane').css('top','80px !important');
}
else{

$('.bar-subheader.search-subheader').css('height','105px');
$('.catshome .tabs+.pane').css('top','150px');
}

}
function checksearchhtkl(){

if($('#areaseltid').is(':visible')==true){

$('.bar-subheader.search-subheader').css('height','105px');
$('.defaulttabs .tabs+.pane').css('top','150px');

$('.microtabs .tabs').css('top','0px');
$('.microtabs .tabs+.pane').css('top','60px')
}
else{

$('.bar-subheader.search-subheader').css('height','41px');
$('.defaulttabs .tabs+.pane').css('top','80px');
$('.microtabs .tabs').css('top','50px');
$('.microtabs .tabs+.pane').css('top','120px');

}
}


function newssearchSort(type,a,b){

                       if(type==="popular"){

                       return parseInt(b.view_count)- parseInt(a.view_count);

                       }
                       else if(type==="recent"){
                       // DESCENDING order.
                         if (a.created > b.created) return -1;
                         if (a.created < b.created) return 1;
                         return 0;
                       }


}


function sortingbasedontype(type,a,b){

if(type==="rating"){

return parseInt(b.view_count)- parseInt(a.view_count);

}
else if(type==="recent"){
// DESCENDING order.
  if (a.created > b.created) return -1;
  if (a.created < b.created) return 1;
  return 0;
}
else{
return a.distance-b.distance;
}

}
function limitingbizfuntion(limit,bizdata){


 limit=limit<=20?0:limit;

 var funal=[];
 for(var i=limit;i<=20;i++){


 funal.push(bizdata[i]);

 }

//  // Trim whatever is beyond the fixed size.
//             Array.prototype.splice.call(
//                 this,
//                 0,
//                 (this.length - this.fixedSize)
//             );

return funal;


}

function bizopenstatus(timingdata,detail24){

var currentdate = new Date();
var weekday = new Array(7);
       weekday[0]=  "Sunday";
       weekday[1] = "Monday";
       weekday[2] = "Tuesday";
       weekday[3] = "Wednesday";
       weekday[4] = "Thursday";
       weekday[5] = "Friday";
       weekday[6] = "Saturday";

var currenday=weekday[currentdate.getDay()];
var currentime=currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
var numtime =parseFloat(currentime.replace(/:/g, "."));
var finalreturn='';

if(parseInt(detail24)==1){

finalreturn=" 24/7";

}

else{
   if(timingdata=='none'){
    finalreturn= 'closed ';
     }
       else{
        var currentcount=0;
         for(var i=currentcount; i<7; i++) {
          var isclosd=timingdata[i].is_closed;
            var fromtime=parseFloat(timingdata[i].from.replace(/:/g, "."));
            var fromtime1=parseFloat(timingdata[i].from1.replace(/:/g, "."));
            var totime=parseFloat(timingdata[i].to.replace(/:/g, "."));
            var totime1=parseFloat(timingdata[i].to1.replace(/:/g, "."));
            var is_24by7=timingdata[i].is_24by7;
            var is_dual_timing=timingdata[i].is_dual_timing;
            if(currenday==timingdata[i].day){
            if(isclosd=='1'){
            finalreturn= 'Currently This Business Is Closed';
            }
            else if(is_24by7=='1'){
            finalreturn= '24/7';
            }
            else{
            if(((numtime>fromtime)&&(numtime<totime))||((numtime>fromtime1)&&(numtime<totime1))){
            finalreturn= 'Currently This Business Is Open';
            }
            else{
           finalreturn= 'Currently This Business Is Closed';
            }
            }
            }
             }
             }
}
             return finalreturn;

              }
/*______________________________________search data storing function calling start here________________________________________________________________________*/
        function storingsearchgovernoratedata(scope,global,request,governorateId,cityid,rootScope){
 rootScope.miniLoader=true;
        var searchqueryinput=governorateId+"/"+cityid+"/"+'search';//input parameter for search query
        request.fetchthisbygoverlist(searchqueryinput).then(function(data){
                                            rootScope.miniLoader = false;
                                             global.storesearchdatainobj=data.data;

                                             });



        }
/*______________________________________search data stroing function calling end here__________________________________________________________________________________________*/
// Have the first and last li's set to a variable
var $first = $('li:first', 'ul'),
    $last = $('li:last', 'ul');
  //  And then, for the next and previous functions, we create the following:
function previousclick(){

 var $prev,
        $selected = $(".selected");
    // get the selected item
    // If prev li is empty , get the last
    $prev = $selected.prev('li').length ? $selected.prev('li') : $last;
    $selected.removeClass("selected").fadeOut('fast');
    $prev.addClass('selected').fadeIn('fast');
//});
}
function nextclick(){
  var $next,
            $selected = $(".selected");
        // get the selected item
        // If next li is empty , get the first
        $next = $selected.next('li').length ? $selected.next('li') : $first;
        $selected.removeClass("selected").fadeOut('fast');
        $next.addClass('selected').fadeIn('fast');

   // });
}
function dateforimate(date) {

if(date!=""){
    var d = new Date(date);
    var n = d.toDateString();
return n.substr(3,n.length);
   }
   else{
   var n="";
   return n;
   }
}
//blog share function is used in entire blogs module
function sharefunctionfromblogs(cordovaSocialSharing,title,des,domainURL){
analytics.trackEvent('News Events', 'Click on share', 'share selected News', 100);
var link_path=domainURL=="http://www.kuwaitlocal.com/"?"news":"blog";
var bizlink=domainURL+link_path+"/"+title;
cordovaSocialSharing.share(title,des,"", bizlink) // Share via native share sheet
.then(function(result) {
 // Success!
  }, function(err) {
   // An error occured. Show a message to the user
     });
     }

//forums share function

function forumsharefunction(cordovaSocialSharing,forum,domainURL){
console.log(forum);
analytics.trackEvent('Forum Events', 'Click on share', 'share select forum ', 100);
// var title=forum.title.split(" ").join('-').toLowerCase();
 var title=forum.slug.replace(" ",'%20');
 var desc= forum.description;
  var forum_id=forum.id;
  var bizlink=domainURL+"forum/"+title;
   cordovaSocialSharing.share(title,desc,"", bizlink) // Share via native share sheet
    .then(function(result) { // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    });
    }

function opentheAd(e){}

function Gettingimage_properties(){

var img = document.getElementById('Temp_imageID');
//or however you get a handle to the IMG
var myImg = document.querySelector("#Temp_imageID");
        var realWidth = myImg.naturalWidth;
        var realHeight = myImg.naturalHeight;


      //  alert("Original width=" + realWidth + ", " + "Original height=" + realHeight);
}

function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}