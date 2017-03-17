    //Export module definition
angular.module('facebook.controllers', [])

.controller('checkinController', function($scope, $state, fbAccess, $ionicPlatform, $ionicViewService, $cordovaGeolocation, geoCode, resourceRequistion, $timeout, globalVars, $rootScope, $ionicLoading, globalDataTemp, businessDetailData, facebookData, $ionicPopover, $cordovaCamera, androidServices, $ionicPlatform, $cordovaSocialSharing, $timeout){
    $scope.checkin = {};
    $scope.currentCheckin = {
        tagged_friends : [],
        text : '',
        postImageList : [],
        businessName : '',
        tip_flag : false,
        fb_shared : false
    };
    var image_ready = false;
    $scope.checkinsiteurl = '';
    $scope.currentCheckin.shareonFacebook = false;
    $scope.currentCheckin.shareonTwitter = false;

    if(!$rootScope.$viewHistory.backView){
        $scope.backButton = $ionicPlatform.registerBackButtonAction( function () {
            $ionicViewService.nextViewOptions({ disableBack: true });

            $state.go('menuView.listingView.categorytabs.search');
        }, 105 );
        $scope.$on('$destroy', $scope.backButton);
    }
    $scope.friendList = [];
    $scope.friendList = facebookData.myfriends.accepted_list;
    getServerFriends();
    function getServerFriends(){
        $rootScope.miniLoader = true;

        if(globalVars.userInfo.id){
            facebookData.getFriendList().success(function(res){

                $rootScope.miniLoader = false;
                $scope.friendList = res.accepted_list;
                facebookData.myfriends = res;
            }, function(err){
                $rootScope.miniLoader = false;
            });
        }
    }
    $scope.checkinBusinessTitle = '';
    $scope.checkinBusinessID = '';
    if(globalDataTemp.currentCheckinData.title.length > 0){
        $scope.currentCheckin.businessName = globalDataTemp.currentCheckinData.title;
        $scope.checkinBusinessTitle = '@ ' + globalDataTemp.currentCheckinData.title;
        $scope.checkinBusinessID = globalDataTemp.currentCheckinData.bid;
        $scope.checkinsiteurl = globalDataTemp.currentCheckinData.siteurl;
    }
    $scope.my_checked_friends = [];
    $scope.checkmein = function(id, name){
        var arr_position = $scope.currentCheckin.tagged_friends.map(function(x) {return x.id; }).indexOf(id);
      if(arr_position === -1){
            $scope.personChk = true;
            $scope.currentCheckin.tagged_friends.push({id : id, name : name});
        }
        else{
            $scope.personChk = false;
            $scope.currentCheckin.tagged_friends.splice(arr_position, 1);
        }
    };
    $scope.checkboxCheck = function(id, name){
        var arr_position = $scope.currentCheckin.tagged_friends.map(function(x) {return x.id; }).indexOf(id);
        if(arr_position === -1){
            return false;
        }
        else{
            return true;
        }
    };
    $scope.friendPicker = function(){
        $state.go('menuView.facebook.checkin.chooseFriends');
    };
    $scope.consolidateFriends = function(){
        for(var i = 0; i <= $scope.my_checked_friends.length; i++){
            angular.forEach(facebookData.myfriends.accepted_list, function(v, k){
                if(v.id === $scope.my_checked_friends[i]){2
                    $scope.currentCheckin.tagged_friends.push(v);
                }
            });
        }
        $state.go('menuView.facebook.checkin.createTemplate');
    };
    $scope.checkData = function(id){
        var arr_position = $scope.currentCheckin.tagged_friends.map(function(x) {return x.id; }).indexOf(id);
        if(arr_position === -1){
            return false;
        }
        else{
            return true;
        }
    }
    var photoModalTemplate = '<ion-popover-view class="loading_box gallery_box">' +
        '<div class="galleryList group margin_b_20 align_center font_roboto font_color_blue">'+
        '<div class="action_panel" ng-model="myPicture" ng-click="clickSource(1)">' +
        '<p>From Camera</p>' +
        '<span class="icon ion-camera"></span>' +
        '</div>' +
        '<div class="action_panel" ng-click="clickSource(2)">' +
        '<span class="icon ion-images"></span>' +
        '<p>From Gallery</p>' +
        '</div>' +
        '</ion-popover-view>';
    //Function call for photo pop over instantiation
    $scope.photoPopOver = $ionicPopover.fromTemplate(photoModalTemplate, {
        scope: $scope
    });
    $scope.addPhoto = function(){$scope.photoPopOver.show();};
    $scope.clickSource = function(sourceType){
        var galleryOptions = {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };
        var cameraOptions = {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            correctOrientation : false
        };
        if(sourceType == 2){
            $cordovaCamera.getPicture(galleryOptions).then(function(imageData) {
                acquireFbImg(imageData);    //First upload pushed to facebook share/ twitter share
                $scope.currentCheckin.postImageList.push(imageData);
                $scope.photoPopOver.hide();
            }, function(err) {
                androidServices.showToast('there was an issue grabbing image, Please try again');
            });
        }
        else {
            $cordovaCamera.getPicture(cameraOptions).then(function(imageData) {
                acquireFbImg(imageData);    //First upload pushed to facebook share/ twitter share
                $scope.currentCheckin.postImageList.push(imageData);
                $scope.photoPopOver.hide();
            }, function(err) {
                androidServices.showToast('there was an issue with grabbing, Please try again');
            });
        }
    };
    var fbImg = '';
    function acquireFbImg(imgData){
        if(!image_ready){
            $rootScope.miniLoader = true;
            facebookData.convertImgToUrl(imgData)
                .success(function(res){
                $rootScope.miniLoader = false;
                    if(res){
                        fbImg = globalVars.MainklURl+res;

                    }
                    image_ready = true;
                })
                .error(function(res){
                    $rootScope.miniLoader = false;
                })
        }
    };
    var chkin_message = $scope.currentCheckin.text;
    var chkin_image = $scope.currentCheckin.postImageList || [];
    var chkin_link = $scope.checkinsiteurl || globalVars.MainklURl;
    var chkin_bname = '';
        if($scope.currentCheckin.businessName && globalVars.userInfo.first_name){
            chkin_bname = globalVars.userInfo.first_name + ' was at ' +  $scope.currentCheckin.businessName;
        }

    function shareviaFB(){
        fbAccess.showShareDialog($scope.currentCheckin.text, chkin_link, fbImg, chkin_bname).then(function(data){
            if(data.post_id){
                $scope.facebookDisable = true;
                androidServices.showToast('Your check in has been posted to facebook');
            }
            $scope.currentCheckin.shareonFacebook = false;
            if($scope.currentCheckin.shareonTwitter){
                $timeout(function(){
                    shareviaTwitter();  //Changes made on 15/2/15, added timeout for showing a toast message before twitter
                }, 1000);
            }
            else{
                postCheckin();
            }
        }, function(err){
            $scope.currentCheckin.shareonFacebook = false;
            if($scope.currentCheckin.shareonTwitter){
                shareviaTwitter();
            }
            else{
                postCheckin();
            }
        })
    };
    function shareviaTwitter(){
        $cordovaSocialSharing
            .shareViaTwitter($scope.currentCheckin.text, fbImg, chkin_link)
            .then(function(result) {
                $scope.currentCheckin.shareonTwitter = false;
                if($scope.currentCheckin.shareonFacebook){
                    shareviaFB();
                }
                else{
                    postCheckin();
                }
            }, function(err) {
                if($scope.currentCheckin.shareonFacebook){
                    shareviaFB();
                }
                else{
                    postCheckin();
                }
            });
    };
    function postCheckin(){
        var checkinformatter = {
            checkin : {
                user_id : globalVars.userInfo.id,
                user_name : globalVars.userInfo.first_name,
                business_id : $scope.checkinBusinessID,
                business_name : $scope.checkinBusinessTitle,
                tip_flag : $scope.currentCheckin.tip_flag,   //true or false
                share_on_facebook : $scope.currentCheckin.fb_shared, //true or false Add functionality after facebook process approval
                tagged_friends : $scope.currentCheckin.tagged_friends || [],
                checkin_message : $scope.currentCheckin.text || '',
                image : $scope.currentCheckin.postImageList
            }
        }
        facebookData.postCheckin(checkinformatter)
            .success(function(data){
                $rootScope.miniLoader = false;
                if(parseInt(data) === 1){
                    $state.go('menuView.facebookcheckins');
                    androidServices.showToast('you have succesfully checked into Facebook!');
                }
                else{
                    androidServices.showToast('there was an issue posting check in , Please try again');
                }
            })
            .error(function(err){
                $rootScope.miniLoader = false;
                androidServices.showToast('there was an error while accessing the server : Error Code : ' + err);
            });
        //Reset model data
        $scope.checkin = {};
        $scope.currentCheckin = {
            tagged_friends : [],
            text : '',
            postImageList : [],
            businessName : ''
        };
        $scope.checkinBusinessTitle = '';
        $scope.checkinBusinessID = '';
    }
    $scope.check_in_activation = function(){
        $rootScope.miniLoader = true;
        if($scope.currentCheckin.shareonFacebook){
            shareviaFB();
        }
        else if($scope.currentCheckin.shareonTwitter){
            shareviaTwitter();
        }
        else{
            postCheckin();
        }
    };
    $scope.removePhoto = function(imgIndex){
        $scope.currentCheckin.postImageList.splice(imgIndex, 1);
        if(!$scope.currentCheckin.postImageList.length){
            fbImg = '';
            image_ready = false;
        }
    }
})
.controller('friendlistController', function($scope, $ionicPlatform, $ionicViewService, $state, userLogin, $cordovaGeolocation,asyncFBAPI, geoCode, resourceRequistion, $timeout, globalVars, $rootScope, $ionicLoading, globalDataTemp, businessDetailData, facebookData, $ionicPopover, $cordovaCamera, androidServices, localStorageService, fbAccess, globalNotifications,$cordovaSocialSharing){

 $scope.friends_all = [];
 $scope.FBFriends=[];
    //$scope.friends_all = facebookData.myfriends;
    var invitedList = [];
    var current = 0;
    $scope.friendInvites = [];
    $scope.invitesViewList = [];
    getFriendsList();
    $scope.friendInvites = globalNotifications.friendRequests;
    if(!$rootScope.$viewHistory.backView){
        $scope.backButton = $ionicPlatform.registerBackButtonAction( function () {
            $ionicViewService.nextViewOptions({ disableBack: true });
           $state.go('menuView.listingView.categorytabs.search');
        }, 105 );
        $scope.$on('$destroy', $scope.backButton);
    }
    getServerFriends();
    function getServerInvites(){
       // $rootScope.miniLoader = true;
        userLogin.pullNotifications(globalVars.userInfo.id).success(function(res){
            globalNotifications.friendRequests = res;
            $rootScope.miniLoader = false;
            $scope.friendInvites = res;
        }, function(err){
            $rootScope.miniLoader = false;
        });
    }
    //get all app used friends list from facbook
    function getFriendsList(){
        asyncFBAPI('me/friends?fields=picture,first_name,last_name', []).then(function(data){
$scope.FBFriends=data.data;

        });
    }
    //get all app friends from server
    function getServerFriends(){
       //$rootScope.miniLoader = true;
     if(globalVars.userInfo.id){
            facebookData.getFriendList().success(function(res){
               $rootScope.miniLoader = false;
                $scope.friends_all = res;
                facebookData.myfriends = res;
            }, function(err){
                $rootScope.miniLoader = false;
            });
        }
    }
    $scope.acceptFriendship = function(senderid, userid, userfbid){
       // $rootScope.miniLoader = true;
        facebookData.acceptFriendRequest(senderid, userid, userfbid).success(function(res){
            if(parseInt(res) === 1){
                getServerFriends();
                getServerInvites();
                $rootScope.miniLoader = false;
            }
            else{
                $rootScope.miniLoader = false;
                androidServices.showToast('There seems to be an issue with the network , Please try again');
            }
        });
    };
    $scope.declineFriendship = function(id){

    };
    $scope.inviteFriends = function(){
console.log("invite lis");
asyncFBAPI('me?fields=permissions,feed', []).then(function(data){

console.log(data);
        });

//return ;
//$cordovaSocialSharing.share("i have shared ","share demo", "", "www.kuwaitlocal.com") // Share via native share sheet
//                                                 .then(function(result) {
//
//                                                   // Success!
//                                                 }, function(err) {
//
//                                                   // An error occured. Show a message to the user
//                                                 });
//
//    facebookConnectPlugin.showDialog({
//      method: 'feed',
//      link: 'http://example.com',
//      picture: "http://www.lessons4living.com/images/penclchk.gif"
//    }, function(response){
//
//
//
//
//    });
//    //                                   facebookConnectPlugin.api('/me', {fields: 'last_name'}, function(response) {
//
//                                       });


        ionic.Platform.ready(function(){
            fbAccess.showAppDialog().then(function(data){
console.log("show app dialog");
console.log(data);
                var objCount = Object.keys(data).length;
                var counter = 0;
                $rootScope.miniLoader = true;
                angular.forEach(data, function(v, k){
                    if(k !== 'request'){
                        asyncFBAPI(v + '?fields=id,name,first_name,last_name,picture', []).then(function(data){
                            $scope.invitesViewList.push({name : data.name,friend_firstname : data.first_name,friend_lastname : data.last_name, friend_uid : data.id, pic : data.picture.data.url});
                            counter+=1;
                            if(counter >= objCount-1){
                                facebookData.myInvitesStore($scope.invitesViewList).success(function(data){
                                    getServerFriends();
                                }, function(err){

                                });
                            }
                        }, function(err){

                        });
                    }
                });
                $rootScope.miniLoader = false;
            });
        });
    };

})
.controller('checkinlistController', function($scope, $state, $ionicPlatform, $ionicViewService, $cordovaGeolocation, geoCode, resourceRequistion, $timeout, globalVars, $rootScope, $ionicLoading, globalDataTemp, businessDetailData, facebookData, $ionicPopover, $cordovaCamera, androidServices){
    $scope.checkins = [];
    $rootScope.miniLoader = false;
    getallCheckins();
    $scope.loadComplete = false;
    function getallCheckins(){
        $scope.checkins = [];
        facebookData.getCheckins()
            .success(function(data){
                $scope.loadComplete = true;
                if(typeof(data) === 'object'){
                    $rootScope.miniLoader = false;
                    $scope.checkins = data;
                }
            })
            .error(function(data){
                $scope.loadComplete = true;
                $rootScope.miniLoader = false;
            })
    }

    if(!$rootScope.$viewHistory.backView){
        $scope.backButton = $ionicPlatform.registerBackButtonAction( function () {
            $ionicViewService.nextViewOptions({ disableBack: true });
            $state.go('menuView.listingView.categorytabs.search');
        }, 105 );
        $scope.$on('$destroy', $scope.backButton);
    }
    $scope.checkmein = function(){
        $state.go('menuView.locationBasedPlaces');
    };
})
;
