angular.module('global.services', ["ngCordova"])
/**
 * Developer mode access (Shut down & clean for release)
**/
.service('developerMode', function(){
    return{
        version : "0.1a",
        devmode : true
    };
})

/**
 * Global Variable storage service
 **/
 .service('klAppDomain',function(){

 return{

// URL:"http://188.166.55.96/" //this is main url for KLAPP( test server URL)
URL:"http://www.kuwaitlocal.com/" //this is main url for KLAPP( production server URL)

 }
 })

.service('globalVars', function($cordovaNetwork,klAppDomain,$q, $window, $rootScope){

    return {
        userdetails:[],
        loginstatus:"logged",
        currentviewname:"",
        is24by7:false,
        userInfo  : {},
        searchdata:{},
        Categoryarr:{},
        RecentAds:[],
        Mobile_PopCat:[],
        Classifed_EditArr:{
        title:"",
        },
        biz_favCheck:0,

        Subcategoriesdata:[],
        subcategortybizdata:[],
        PreviiousStatename:'',
        bizgalleryimgarr:[],
        Biz_images:[],
        searchKeyvalue:'',
        Searchobj:[],
        popularcatdata:[],
        Blog_individual_Data:{},
        Blogcomplete_data:{},
        formumdetails:{},
        blogclickfor:"",
        blogidfromdetail:0,
        blogkeywordfromdetail:"",
        forumfromdetail:"",
        blogcatidfromdetail:0,
        MainklURl:klAppDomain.URL,
        siteURL   : klAppDomain.URL+'kuwaitmobileapp/',
        catImgURL : klAppDomain.URL+'img/Category/logo_folder/',
        rawImgURL : klAppDomain.URL+'img/',
        userLogoFolder : klAppDomain.URL+'img/users/user_logo_folder/',
        user_error_logo:'img/defaultuser.png',
        deviceLat : 0,
        deviceLng : 0,
        Add_Biz_deviceLat : 0,
        Add_Biz_deviceLng : 0,
        Add_Biz_edit_status:false,

        ADD_Location :{},
        userPic   : '',
        notifications : {},
        LTD_switch : 'detail',
        currentclassprice : 0,
        currentReqLat : null,
        currentReqLng : null,
        currentlat:null,
        currentlng:null,
        currentcityGovernorate:"",
        selct_governorateid:1,
        return_keywordbusinessdata:null,
        currentgovernoratedata:{},
        storesearchdatainobj:{},
        degToRad : function(deg) {
            return deg * (Math.PI/180);
        },
        classifiedsubdata:[],
        clasifiedhomedata:[],
        classifiedlistdata:[],
        classifiedlistlogurl:klAppDomain.URL+'img/ClassifiedLogo/logo_folder/',

       //geolocation function for getting lat and long

       GettingLatLng:function(){
       var deferred = $q.defer();
       $window.navigator.geolocation.getCurrentPosition(function (position) {
       $rootScope.$apply(function() {
        deferred.resolve(position);
                });
                 }, function (error) {
                $rootScope.$apply(function() {
                    deferred.reject(error);
                });
            });
            return deferred.promise;
       },



        //prevent the landscape mode

        preventRotate:function(){

        if(window.cordova && window.cordova.plugins && window.cordova.plugins.screenorientation){

          var so = cordova.plugins.screenorientation;
                 so.setOrientation(so.Orientations[4]);
        }

        },
        //video thumb for youutude
       Youtubethumbfun: function(url, name) {

              name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
             // alert(name);
              var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(url);

              return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            },

        calcDistance : function(lat1, lon1, lat2, lon2){
            var R = 6371; // Radius of the earth in km
            var dLat = this.degToRad(lat2-lat1);  // degToRad service
            var dLon = this.degToRad(lon2-lon1);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(this.degToRad(lat1)) * Math.cos(this.degToRad(lat2)) *
                            Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; // Distance in km
            return d;
        },
        returncurrentday:function(i){
       var weekday = new Array(7);
       weekday[0]=  "Sunday";
       weekday[1] = "Monday";
       weekday[2] = "Tuesday";
       weekday[3] = "Wednesday";
       weekday[4] = "Thursday";
       weekday[5] = "Friday";
       weekday[6] = "Saturday";

       return weekday[i];

        },
 htmlToPlaintext:function(text) {
               return text ? String(text).replace(/<[^>]+>/gm, '') : '';
             },
substringmethod:function(text){
 if(text.length<=35){
  return text;
  }
  else{
   return text.substring(0,35)+"...";
    }
    },
       networkconnectioncheck:function(){


       }
    };
})
.service('globalNotifications', function(globalVars,klAppDomain){
    return{
        friendRequests : []
    }
})
.service('globalDataTemp', function (resourceRequistion, globalVars,klAppDomain) {
    return{
        currentBusinessID : null,               //Holds current business id
        currentBusinessDetail : {},             //Holds the detail Array for current business ID
        currentBusinessInnerDetail : {},        //Holds inner detail for detail page
        currentRatings : {},                    //Holds detailed rating view data
        currentListings : {},                   //Holds current listings based on ID
        currentBusinessRating : 0,              //Single current business rating value
        currentClassifiedID : null ,
        currentSearchKeys : {
            keyword : '',
            city    : ''
        },                 //Mini history for search
        classifiedData : [],
        usersCurrentSuggestion : '',
        currentCheckinData : {
            title : '',
            bid : '',
            siteurl : ''
        },
        setCurrentBusinessDetail : function(data){
            this.currentBusinessDetail = '';
            this.currentBusinessDetail = data;
        },
        setCurrentBID : function (BID) {

            if (BID.length > 0) {
                this.currentBusinessID = null;  //Clear business id from previous run
                this.currentBusinessID = BID;
            }
        },
        setCurrentInnerDetail : function(data){
            this.currentBusinessInnerDetail = {};
            this.currentBusinessInnerDetail = data;
        },
        setCurrentBusinessRating : function(value){
            this.currentBusinessRating = 0;
            this.currentBusinessRating = value;
        },
        setCurrentRatings : function(data){
            this.currentRatings = {};
            this.currentRatings = data;
        },
        setCurrentListings : function(data){
            this.currentListings = {};
            this.currentListings = data;
        },
        clearHistoryKeys : function(){
            this.currentSearchKeys.keyword = this.currentSearchKeys.city = '';
        },
        clearAllDetails : function(callOperator){   //Cache clearing function for clearing all temporary business detail data
            this.currentBusinessID = null;
            this.currentBusinessDetail = {};
            this.currentBusinessInnerDetail = {};
            this.currentRatings = {};
            this.currentBusinessRating = 0;
            globalVars.currentReqLat = globalVars.currentReqLng = null;
            this.currentCheckinData = {
                title : '',
                bid : ''
            };

        }
    };
})

.factory('asyncFBAPI', function($rootScope, $window, $http, $q,klAppDomain){
    var queue=[];

    var execNext = function() {
        var task = queue[0];
        facebookConnectPlugin.api(task.c, task.p,
            function success(data){
                queue.shift();
                task.d.resolve(data);
                if (queue.length>0) execNext();
            },
            function(err) {
                queue.shift();
                task.d.reject(err);
                if (queue.length>0) execNext();
            });
    };
    return function(path, permissions) {
        var d = $q.defer();
        queue.push({c:path,d:d, p:permissions || []});
        if (queue.length===1) execNext();
        return d.promise;
    };
})
.service('fbAccess', function($rootScope, $window, $http, $q,klAppDomain){
    deviceInit();
   // alert("hello");

    /**
     * Facebook Connect plugin access control
    **/
    var runningInCordova = false,
        tokenStore = {};
    /**
     * Fires a device ready to setup facebook plugin
     **/
    function deviceInit(){
        document.addEventListener("deviceready", function () {
            runningInCordova = true;
        }, false);
    }
    /**
     * Facebook login
     **/
    function logout(){
       facebookConnectPlugin.logout(

                    function success(response) {

                    },

                    function error(response) {

                    });

                    tokenStore = {};


    }
    function login(fbScope){
        deviceInit();

        fbScope = fbScope || '';

        deferredLogin = $q.defer();

        //logout();

        facebookConnectPlugin.login( ["email","user_friends"],

            function success(response) {
                if (response.status == 'connected') {

                    // Not strictly necessary to store token, but can be used by app to check if logged in
                 
                    tokenStore = response.token;

                    deferredLogin.resolve();
                }
                else {
                    deferredLogin.reject();
                }
            },

            function error(response) {
                deferredLogin.reject(response);
            });

        return deferredLogin.promise;

    }
    function showShareDialog(msg, link, image, bname){

        deviceInit();
        deferredMsg = $q.defer();
        var params = {};
            params.caption = 'shared via kuwaitlocal mobile app';
            params.description = msg || '';
            params.link = link || 'http://188.166.55.96';
            params.message = 'Shared via kuwaitlocal.com,';
            params.name = bname || '';
            params.picture = image;

        var compiledURL = '/me/feed?method=post' +
                          '&message=' + params.message +
                          '&link=' + params.link +
                          '&picture=' + params.picture +
                          '&caption=' + params.caption +
                          '&name=' + params.name +
                          '&description=' + params.description;
        var compiledURL = compiledURL.replace(/ /g, '+');

        facebookConnectPlugin.api(compiledURL,  ["publish_actions"], function(response) {

            deferredMsg.resolve(response);
        }, function(err){
            deferredMsg.reject(err);

        });
        return deferredMsg.promise;

    }

    function showAppDialog(msg){

      deviceInit();

        deferredMsg = $q.defer();
        var options = {
            method: "apprequests",
            message: msg || 'Invite to my app'
        };
        var optionsB = {
            method: "feed",
            link: "http://example.com",
            caption: "Such caption, very feed."
        };
        //logout();
        facebookConnectPlugin.showDialog(options,
            function success(response){

                deferredMsg.resolve(response);
            }, function failure(response){

                deferredMsg.reject(response);
        });
        return deferredMsg.promise;
    }
    /**
     * V 2.0 queue based api system
     **/
    function api2(path, permissions) {

        permissions = permissions || [];
        var queue=[];

        var execNext = function() {
            var task = queue[0];
            facebookConnectPlugin.api(task.c, task.p,
                function success(data){
                    queue.shift();
                    task.d.resolve(data);
                if (queue.length>0) execNext();
                },
                function(err) {
                    queue.shift();
                    task.d.reject(err);
                if (queue.length>0) execNext();
            });
        };
        return function() {
            var d = $q.defer();
            queue.push({c:path,d:d, p:permissions});
            if (queue.length===1) execNext();
            return d.promise;
        };

    }
        /**
         * Singular Facebok API usage
         **/
        function api(path, permissions) {
//alert("is called for ");

//alert(JSON.stringify(path));
            var deferred = $q.defer();

            permissions = permissions || [];

            facebookConnectPlugin.api(path, permissions, // path, permissions,
                function success(response) {
                    deferred.resolve(response);
                },
                function error(response) {
                    deferred.reject(response);
                });

            return deferred.promise;

        }

    return {
        tokenStore : tokenStore,
        login: login,
        logout: logout,
        api: api,
        api2: api2,
        showAppDialog : showAppDialog,
        showShareDialog : showShareDialog
    };

})
.service('geoCode', function($http, $q,klAppDomain){

    var deferred = $q.defer();
    var resourceURL = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';

    function reverseFind(lat, lng){
        var compiledData = resourceURL+ lat + "," + lng + "&sensor=true_or_false";
        $http.get(compiledData).then(function(data){
            deferred.resolve(data);
        }, function error(err){
            deferred.reject(err);
        });
        return deferred.promise;
    }
    return{
        reverseFind : reverseFind
    };
})
.service('androidServices', function($rootScope, $cordovaToast){
    return{
        //Timing : 'long' or 'short', defaults to long
        //pos: 'top', 'center', 'bottom'
        showToast : function(msg, timing, pos){
            var time = timing || 'long';
            var position = pos || 'bottom';
            $cordovaToast.show(msg, time, position);
        }
    };
})
.service('fileUpload', function(globalVars, globalDataTemp, androidServices, $http,klAppDomain){

  return {
      uploadPhoto : function(imageURI, flag){
          var postURI = '';
          var poster = {
              galleryimage_decode : imageURI
          };

          //URI for uploading
          postURI =  klAppDomain.URL+"kuwaitmobileapp/business_galleries.php?function=business_gallery_insert&business_id=" + globalDataTemp.currentBusinessID +"&user_id=" + globalVars.userInfo.id + "&insertflag=" + flag;
          return $http.post(postURI, poster)
              .success(function(data){

                  return data;
              })
              .error(function(data){

                  return data;
              })
          }
      }
})
.service('userLogin', function($http, $q, globalVars,klAppDomain){

  var resourceURL = globalVars.siteURL + "user_reviews.php?function=userlogin&username=";
  var fbResourceURL = globalVars.siteURL + "";  //--------------TODO-----------------------
        return {
        logon : function (username, password){
            var compiledData = resourceURL + username + "&userpass=" + password;
            return $http.get(compiledData).success(function(data){
                      return data;
                    }, function error(err){
                      return err;
                  });
        },
        temploginAPP: function (username){
          var resourceURL = globalVars.siteURL + "user_reviews.php?function=TemploginforApp&username=";
                                 var compiledData = resourceURL + username;
                                 return $http.get(compiledData).success(function(data){
                                           return data;
                                         }, function error(err){
                                           return err;
                                       });
                             },
        fblogon : function(post_data){
            var compiledData = klAppDomain.URL+'Mobilefacebook/facebook_login';
            return $http.post(compiledData, post_data).success(function(data){

                return parseInt(data);
            }, function error(err){
                return err;
            });
        },
        pullNotifications : function(req){

            var get_url = klAppDomain.URL+'Mobilefacebook/is_friends_notification?user_id=' + req + '&TS=' + new Date();
            return $http.get(get_url).success(function(data){
                return data;
            }, function(err){
                return err;
            });
        }
    };
})
.service('signUp', function($http, $q, globalVars,klAppDomain){
    var checkMailURL = klAppDomain.URL+'MobilePremiumBusiness/email_validation?email=';
    var signupURL = klAppDomain.URL+'MobilePremiumBusiness/userregistration';
    return {
        checkEmail : function(mailID){
            var fetchURL = checkMailURL + mailID + '&TS=' + new Date();
            return $http.get(fetchURL).success(function(data){
                        return data;
                    },function(err){
                        return err;
                    });
        },
        signmeup : function(user){
            return $http.post(signupURL, user).success(function(data){
                        return data;
                   }, function(err){
                        return err;
                   });
        }
    }
})
.service('EventVars', function($cordovaNetwork,klAppDomain,$q, $window, $rootScope){
    return {
         EventDetailData:[],

         Temp_SearchList :[],

         Temp_SearchKey : "",
         }
         })
.service('EventfileUpload', function(globalVars, EventVars, androidServices, $http,klAppDomain){
  return {
         uploadPhoto : function(imageURI, event_id,user_id,slug){
         var postURI = '';
         var poster = {
         galleryimage_decode : imageURI,
         event_id : event_id,
         user_id:user_id,
         slug:slug
         };

         postURI =  klAppDomain.URL+"kuwaitmobileapp/EventsCalls.php?function=event_gallerypost";
         return $http.post(postURI, poster).success(function(data){
                                                    return data;
                                                    })
         .error(function(data){
                return data;
                })
         }
         }
         });
