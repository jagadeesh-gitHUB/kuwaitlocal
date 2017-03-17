    //Export module definition
angular.module('login.controllers', ["ionic", "ngCordova"])
    //Controller to control going to login view or proceed to listings view
    //Pop ups , modals can be defined here to have global presence
    //Setup back button transition preventions here
.controller('layoutController', function($cordovaGoogleAnalytics,$scope, $timeout, $state, fbAccess, userLogin,$rootScope, globalVars, userLogin, androidServices, globalNotifications, localStorageService,$cordovaNetwork,cordovareturn,$cordovaGeolocation,$cordovaAdMob,$cordovaSms,$cordovaSocialSharing,$cordovaFacebook,resourceRequistion) {
//console.log($cordovaGoogleAnalytics);
//console.log("$cordovaGoogleAnalytics");
//var temp_googlean=$cordovaGoogleAnalytics.trackView('Home Screen');
//console.log(temp_googlean);
if(window.cordova && window.cordova.plugins && window.analytics){

            analytics.trackView('Layout view');


            }
sessionStorage.isFBLogged=false;
//console.log("availHeight: "+screen.availHeight+"px" );
//console.log("availWidth: "+screen.availWidth +"px");
//console.log("pixelDepth: "+screen.pixelDepth +"px");
document.addEventListener("deviceready", function () {
     globalVars.preventRotate();
    var type = $cordovaNetwork.getNetwork()
    var isOnline = $cordovaNetwork.isOnline()
    var isOffline = $cordovaNetwork.isOffline()
    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var onlineState = networkState;
      androidServices.showToast("online...");
      $state.go($rootScope.$viewHistory.backView.stateName);
      })
      // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      var offlineState = networkState;
      androidServices.showToast('No Network');
       $state.go("offlineview");
       })
       }, false);
       //Sets logged in status if session hasnt ended, which redirects to listing view
        // $state.go('loginView');
        //  return
         $scope.loginUsingFB = function(){
         ionic.Platform.ready(function(){
         if(!fbAccess.tokenStore.length){
                    fbAccess.login().then(function(data){
                    $rootScope.miniLoader = true;
                     $scope.isFBLogged = true;
                     sessionStorage.isFBLogged=true;
                      //Synchronous facebook picture get
                        fbAccess.api('/me?fields=picture').then(function(response){
                         globalVars.userPic = response.picture.data.url;
                            //Synchronous facebook user details get
                            fbAccess.api('/me?fields=picture,email,first_name,last_name').then(function(data){
                                localStorageService.set('kl.fb_session', 'axeactly');
                                var login_post = {
                                    user : {
                                        first_name : data.first_name || '',
                                        last_name : data.last_name || '',
                                        email : data.email || '',
                                        id : data.id,
                                        user_logo : data.picture.data.url,

                                    }
                                }

                                login_post.user.email = login_post.user.email ==""? login_post.user.first_name+"."+login_post.user.last_name+"@kuwaitlocals.com" : login_post.user.email;


                                userLogin.fblogon(login_post).success(function(res){
                                  //Grab friend requests from server using the id recieved
                                    userLogin.pullNotifications(parseInt(res)).success(function(data){
                                        globalNotifications.friendRequests = data;
                                        $rootScope.miniLoader = false;


                                        globalVars.userInfo.id = parseInt(res);
                                        globalVars.userInfo.first_name = login_post.user.first_name;
                                        globalVars.userInfo.last_name = login_post.user.last_name;
                                        globalVars.userInfo.email = login_post.user.email;

                                       // if(login_post.user.email !=""){
                                        localStorageService.set('kl.fb_session', 'axeactly');
                                        androidServices.showToast('Logged in successfully');
                                        $state.go('menuView.listingView.categorytabs.search');
                                       // }
//                                        else{
//                                        localStorageService.set('kl.fb_session', 'unaxeactly');
//                                        androidServices.showToast('Unable to login with your current fb account, please add your email in your fb account');
//                                        $state.go('loginView');
//                                        }
                                    }, function(err){
                                        androidServices.showToast("error retrieving notifications , Please check the network");
                                        $rootScope.miniLoader = false;
                                        globalVars.userInfo.id = parseInt(res);
                                        globalVars.userInfo.first_name = login_post.user.first_name;
                                        globalVars.userInfo.last_name = login_post.user.last_name;
                                        globalVars.userInfo.email = login_post.user.last_name;

                                      //  if(login_post.user.email !=""){
                                                                                androidServices.showToast('Logged in successfully');
                                                                                $state.go('menuView.listingView.categorytabs.search');
                                                                              //  }
//                                                                                else{
//                                                                                androidServices.showToast('Unable to login with your current fb account, please add your email in your fb account');
//                                                                                }
                                    });
                                }, function(err){
                                    $rootScope.miniLoader = false;
                                    androidServices.showToast('There was an issue logging into kuwaitlocal using facebook');
                                });
                            }, function(err){
                                $rootScope.miniLoader = false;
                                androidServices.showToast('There was an issue retrieving your profile from facebook');
                            });

                        },function(err){
                            $rootScope.miniLoader = false;
                            androidServices.showToast('There was an issue retrieving your profile from facebook');
                        });
                    }, function(err){
                  //  alert(err);
                        $rootScope.miniLoader = false;
                        $state.go('offlineview');
                        androidServices.showToast('You have to login to proceed');
                    });
                }
            });
        };

        if(localStorageService.get('kl.Temp_loginID') !=undefined || localStorageService.get('kl.Temp_loginID') !=null ){
        //alert("in");
         globalVars.userInfo.id=parseInt(localStorageService.get('kl.Temp_loginID'));
        $scope.isLogged = true;
        sessionStorage.isFBLogged=true;
         $state.go('menuView.listingView.categorytabs.search');

        }

else{
//alert("else");
    if(localStorageService.get('kl.fb_session') === 'axeactly'){

        $scope.loginUsingFB();
        $scope.isLogged = true;
    }

    else if(localStorageService.get('kl.Email_session') === 'axeactly'){

    //temploginAPP
    $rootScope.miniLoader = true;
     userLogin.temploginAPP(localStorageService.get('kl.EmailUser')).then(function(data){
             var vStore = data.data;

          //clearScope();
            $rootScope.miniLoader = false;
              if(vStore.sucessflag == 'Success'){
               var UserActive_status=parseInt(vStore[0].is_active);
              if(UserActive_status==1){
                globalVars.userInfo = vStore[0];
                  globalVars.userPic = globalVars.userLogoFolder + vStore[0].id + '_' + vStore[0].user_logo;

                  if(globalVars.loginstatus=="logged"){
                  globalVars.loginstatus="logged";
                  $state.go('menuView.listingView.categorytabs.search');
                  }
                  else{
                  globalVars.loginstatus="logged";

                  var finalnavigstion=globalVars.currentviewname==""?'menuView.listingView.categorytabs.search':globalVars.currentviewname;
                  $state.go(finalnavigstion);

                  }

                  }
                  else{
                  $scope.statusAlert();
                  }
              }


              else{
                  //clearScope();
                  $scope.showAlert();

              }
          });

        }

    else{
        $scope.isLogged = false;
    }
}

    if($scope.isLogged){
   // alert("fd");
       // $state.go('listingView');
    }
    else{
    //alert("fdfd");
        $state.go('loginView');
    }




})
    //Login page controller
.controller('loginController', function($scope, $timeout, $state, fbAccess, $rootScope, globalVars, userLogin, androidServices, globalNotifications, localStorageService,$cordovaOauth,$http,$cordovaGeolocation,$cordovaBackgroundGeolocation,geoCode,$cordovaSms,cordovareturn,$cordovaSocialSharing,$ionicModal,resourceRequistion,$cordovaGoogleAnalytics){
if(window.cordova && window.cordova.plugins && window.analytics){
analytics.trackView('Login View');
}
 $scope.loginUsingFB = function(){

        ionic.Platform.ready(function(){
        if(!fbAccess.tokenStore.length){
                    fbAccess.login().then(function(data){

                        $rootScope.miniLoader = true;
                        $scope.isFBLogged = true;
                        sessionStorage.isFBLogged=true;
                        //Synchronous facebook picture get
                        fbAccess.api('/me?fields=picture').then(function(response){



                            globalVars.userPic = response.picture.data.url;
                            //Synchronous facebook user details get
                            fbAccess.api('/me?fields=picture,email,first_name,last_name').then(function(data){
                                localStorageService.set('kl.fb_session', 'axeactly');

                                var login_post = {
                                    user : {
                                        first_name : data.first_name || '',
                                        last_name : data.last_name || '',
                                        email : data.email || '',
                                        id : data.id,
                                        user_logo : data.picture.data.url
                                    }
                                }

                                 login_post.user.email = login_post.user.email ==""? login_post.user.first_name+"."+login_post.user.last_name+"@kuwaitlocals.com" : login_post.user.email;

                                userLogin.fblogon(login_post).success(function(res){
                                    //Grab friend requests from server using the id recieved
                                    userLogin.pullNotifications(parseInt(res)).success(function(data){
                                        globalNotifications.friendRequests = data;
                                        $rootScope.miniLoader = false;


                                        globalVars.userInfo.id = parseInt(res);

                                        globalVars.userInfo.first_name = login_post.user.first_name;
                                        globalVars.userInfo.last_name = login_post.user.last_name;
                                        globalVars.userInfo.email = login_post.user.last_name;

                                       // if(login_post.user.email !=""){
                                                                            localStorageService.set('kl.fb_session', 'axeactly');
                                                                                androidServices.showToast('Logged in successfully');
                                                                                $state.go('menuView.listingView.categorytabs.search');
                                                                              //  }
//                                                                                else{
//                                                                                localStorageService.set('kl.fb_session', 'unaxeactly');
//                                                                               $state.go('loginView');
//                                                                                androidServices.showToast('Unable to login with your current fb account, please add your email in your fb account');
//                                                                                }
                                    }, function(err){
                                        androidServices.showToast("error retrieving notifications , Please check the network");
                                        $rootScope.miniLoader = false;
                                        globalVars.userInfo.id = parseInt(res);
                                        globalVars.userInfo.first_name = login_post.user.first_name;
                                        globalVars.userInfo.last_name = login_post.user.last_name;
                                        globalVars.userInfo.email = login_post.user.last_name;

                                  //      if(login_post.user.email !=""){
                                                                                androidServices.showToast('Logged in successfully');
                                                                                $state.go('menuView.listingView.categorytabs.search');
                                                                               // }
//                                                                                else{
//                                                                                androidServices.showToast('Unable to login with your current fb account, please add your email in your fb account');
//                                                                                }
                                    });
                                }, function(err){
                                    $rootScope.miniLoader = false;
                                    androidServices.showToast('There was an issue logging into kuwaitlocal using facebook');
                                });
                            }, function(err){
                                $rootScope.miniLoader = false;
                                androidServices.showToast('There was an issue retrieving your profile from facebook');
                            });

                        },function(err){
                            $rootScope.miniLoader = false;
                            androidServices.showToast('There was an issue retrieving your profile from facebook');
                        });
                    }, function(err){
                        $rootScope.miniLoader = false;
                        androidServices.showToast('You have to login to proceed');
                    });
                }
        });
        // analytics.trackEvent('Event Category name', 'Event Action name ', 'Event purpose what it do ', value this is optional);
         analytics.trackEvent('Login', 'sign in with Facebook ', 'user  sign in with his / her facebook account ', 100);

    };

 $scope.continuewithoutclick=function(){
 if(globalVars.currentviewname==""){
 $state.go('menuView.listingView.categorytabs.search');
 globalVars.userInfo={};
 globalVars.userPic="";//'img/defaultuser.png'

 }
 else{
 $state.go(globalVars.currentviewname);


 }


 analytics.trackEvent('Login', 'Continue without login ', 'Open home view without  user login ', 100);
 };

$scope.loginwithemailClick=function(){
 analytics.trackEvent('Login', 'sign in with Email', 'Open sign in email view ', 100);
};

$scope.singupclick=function(){
analytics.trackEvent('Sign up', 'Click on Sign up' , 'open sign up view for register form', 100);
}
})
    //Signup controller
.controller('signupController', function($scope, $state, signUp, md5, $ionicPopup, $rootScope, $ionicPopover, $cordovaCamera, androidServices,cordovareturn){

if(window.cordova && window.cordova.plugins && window.analytics){

analytics.trackView('Sign up view');
}
  $scope.user ={};
  $scope.user_profile = '';
  $scope.emailInvalid = false;
  var clean_userprofile = '';
  $scope.$on('formIsValid', function(e, name){

      if(name === 'default'){
          $scope.defaultFormValid = true;
      }
  });
  $scope.$on('formIsNotValid', function(e, name){
      if(name === 'default'){
          $scope.defaultFormValid = false;
      }
  });
  $scope.checkEmail = function(){

      if($scope.user.email && $scope.user.email.length > 0){
          var hashedMail =  $scope.user.email;//md5.createHash($scope.user.email);
          
          signUp.checkEmail(hashedMail).success(function(data){
              if(data == 1){ //1 => email not available
                  $scope.emailInvalid = true;
              }
              else{
                  $scope.emailInvalid = false;
              }
          })
      }
  };
  function invalidMailAlert() {
    var alertPopup = $ionicPopup.alert({
        title: 'Invalid login details',
        template: 'Email is already being used , Please change and try again'
    });
  }
  $scope.signUp = function(){
      $rootScope.miniLoader = true;

      user = {
            User : {
                  first_name: $scope.user.fname,
                  last_name : $scope.user.lname,
                  username  : $scope.user.sname,
                  email     : $scope.user.email,
                  password  : $scope.user.pword,
                  user_logo : clean_userprofile
            }
      }

      signUp.checkEmail(user.User.email).success(function(data){

          if(data == 1){ //1 => email not available
              $rootScope.miniLoader = false;
              $scope.emailInvalid = true;
              invalidMailAlert();
          }
          else{
              signUp.signmeup(user).success(function(data){

                  $rootScope.miniLoader = false;
                  if(parseInt(data) === 1){

                   $state.go('loginMailView');
                      androidServices.showToast('registered successfully');

                  }
                  else{
                      androidServices.showToast('Did not register , Please try again');
                  }
              }, function(err){
                  $rootScope.miniLoader = false;

              });
          }
      })
analytics.trackEvent('Sign up', 'Click on join kuwait local'  , 'sign up to kuwait local with entered details', 100);
  };
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
    $scope.togglePhotoModal = function(){
        $scope.photoPopOver.show();
        analytics.trackEvent('Upload', 'Click on upload your profile picture'  , 'open a pop with choose camera/ gallery', 100);
    }
    $scope.getPicture = function(sourceType){
       if(sourceType == 2){
         analytics.trackEvent(' upload', 'Click on from gallery'  , 'open  Photo gallery for choose photo from gallery ', 100);

            $cordovaCamera.getPicture({
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            })
                .then(function(datapath){
                    $scope.user_profile = 'data:image/jpeg;base64,' + datapath;
                    clean_userprofile = datapath;
                    $scope.photoPopOver.hide();
                });
//                .error(function(data){
//
//                });
        }
        else {
          analytics.trackEvent(' upload', 'Click on from camera'  , 'open  Camera  take photo from camera  ', 100);

            $cordovaCamera.getPicture({
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                correctOrientation : false
            })
                .then(function(datapath){
                    $scope.user_profile = 'data:image/jpeg;base64,' + datapath;
                    clean_userprofile = datapath;
                    $scope.photoPopOver.hide();
                });
//                .error(function(data){
//
//                });
        }
    };
})
.controller('loginMailController', function($scope, $state, md5, userLogin, globalVars, $rootScope, $ionicPopup, resourceRequistion,cordovareturn,$http,androidServices,localStorageService ){
  //md5.createHash(pword)
  if(window.cordova && window.cordova.plugins && window.analytics){

analytics.trackView('Sign with email view');
}
  $scope.user = {
      uname : '',
      pword : ''
  };

  $scope.$on('formIsValid', function(e, name){

      if(name === 'default'){
          $scope.defaultFormValid = true;
      }
  });
  $scope.$on('formIsNotValid', function(e, name){
      if(name === 'default'){
          $scope.defaultFormValid = false;
      }
  });
  $scope.withoutlogin=function(){
globalVars.loginstatus="notlogged";
   $state.go('menuView.listingView.categorytabs.search');
    analytics.trackEvent('Login', 'Continue without login ', 'Open home view without  user login ', 100);
  }

  $scope.logmein = function(){
   $rootScope.miniLoader = true;
      var hashedContent = md5.createHash($scope.user.pword);
       userLogin.logon($scope.user.uname, hashedContent).then(function(data){
         var vStore = data.data;

      //clearScope();
        $rootScope.miniLoader = false;
          if(vStore.sucessflag == 'Success'){
           var UserActive_status=parseInt(vStore[0].is_active);
          if(UserActive_status==1){

          localStorageService.set('kl.Email_session', 'axeactly');

           localStorageService.set('kl.EmailUser', $scope.user.uname);

            localStorageService.set('kl.EmailTempcode', vStore[0].id);


              globalVars.userInfo = vStore[0];
              globalVars.userPic = globalVars.userLogoFolder + vStore[0].id + '_' + vStore[0].user_logo;

              if(globalVars.loginstatus=="logged"){
              globalVars.loginstatus="logged";
              $state.go('menuView.listingView.categorytabs.search');
              }
              else{
              globalVars.loginstatus="logged";

              var finalnavigstion=globalVars.currentviewname==""?'menuView.listingView.categorytabs.search':globalVars.currentviewname;
              $state.go(finalnavigstion);

              }

              }
              else{
              $scope.statusAlert();
              }
          }


          else{
              //clearScope();
              $scope.showAlert();

          }
      });
       analytics.trackEvent('Login', 'click on login button  ', 'user login with his / her email account and navigate to home view ', 100);
  };
  function clearScope(){
      $scope.user = {
          uname : '',
          pword : ''
      };
      $scope.validity = false;
  }
  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Invalid login details',
     template: 'Username or Password incorrect'
   });
 };

  $scope.statusAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Account Status',
      template: 'Your account in deactive state, please active and try to login'
    });
  };

$scope.data = {};


$scope.forgotpassword=function(){

var myPopup = $ionicPopup.show({
    template: '<input type="email" ng-model="data.user_email">',
    title: 'Enter Your Email ',
   // subTitle: 'Please use normal things',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Send</b>',
        type: 'button-positive',
        onTap: function(e) {
         if (!$scope.data.user_email) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            //return $scope.data.wifi;
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var textmail=re.test($scope.data.user_email);
         var fp_data={
         email:{
         Useremail:$scope.data.user_email
         }
         }
         if(textmail){
             var compiledData = globalVars.MainklURl+'MobileEmail/forgot_pwd';
                                    return $http.post(compiledData, fp_data).success(function(data){
                                     // return parseInt(data);
                                         // $state.go($rootScope.$viewHistory.backView.stateName);
                                          androidServices.showToast(parseInt(data)==1?'Check Your email':'Your not register to Kuwait local , please Register now');
                                    }, function error(err){
                                        return err;
                                    });
                                     analytics.trackEvent('Login', 'Click on send button', 'send an email to user email', 100);

                                    }
                                    else{

                                     androidServices.showToast('Enter valid email');
                                    }

          }
        }
      }
    ]
  })

 analytics.trackEvent('Login', 'Click on Forgot password', 'Open a pop for enter user email(registered email)', 100);


};

$scope.createAccountclick=function(){
analytics.trackEvent('Sign up', 'Click on Sign up' , 'open sign up view for register form', 100);
};


})

//offlineController
.controller('offlineController', function($scope, $state, $rootScope,$ionicPlatform){
if(window.cordova && window.cordova.plugins && window.analytics){

analytics.trackView('Offline view');
}
$state.go('offlineview');

});



function displayData($http,access_token,fbAccess,$scope, $timeout, $state, fbAccess, $rootScope, globalVars, userLogin, androidServices, globalNotifications, localStorageService){
    $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "name,gender,location,picture,email", format: "json" }}).then(function(result) {
        var name = result.data.name;
        var gender = result.data.gender;
        var picture = result.data.picture;


 localStorageService.set('kl.fb_session', 'axeactly');

                                var login_post = {
                                    user : {
                                        first_name :name || '',
                                        last_name : name || '',
                                        email : result.data.email || '',
                                        id : result.data.id,
                                        user_logo : picture.data.url
                                    }
                                }
                                userLogin.fblogon(login_post).success(function(res){
                                    //Grab friend requests from server using the id recieved
                                    userLogin.pullNotifications(parseInt(res)).success(function(data){
                                        globalNotifications.friendRequests = data;
                                        $rootScope.miniLoader = false;
                                        globalVars.userInfo.id = parseInt(res);

                                        globalVars.userInfo.first_name = login_post.user.first_name;
                                        globalVars.userInfo.last_name = login_post.user.last_name;
                                        globalVars.userInfo.email = login_post.user.last_name;

                                        globalVars.userPic=login_post.user.user_logo;
                                        androidServices.showToast('Logged in successfully');
                                        $state.go('menuView.listingView.categorytabs.search');
                                    }, function(err){
                                        androidServices.showToast("error retrieving notifications , Please check the network");
                                        $rootScope.miniLoader = false;
                                        globalVars.userInfo.id = parseInt(res);
                                        globalVars.userInfo.first_name = login_post.user.first_name;
                                        globalVars.userInfo.last_name = login_post.user.last_name;
                                        globalVars.userInfo.email = login_post.user.last_name;
                                        androidServices.showToast('Logged in successfully');
                                        $state.go('menuView.listingView.categorytabs.search');
                                    });
                                }, function(err){
                                    $rootScope.miniLoader = false;
                                    androidServices.showToast('There was an issue logging into kuwaitlocal using facebook');
                                });


    }, function(error) {
        //alert("Error: " + error);
    });
}