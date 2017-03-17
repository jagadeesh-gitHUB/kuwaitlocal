angular.module('profile.controllers',[])
//myprofileHOmeController
.controller('myprofileHomeController', function($scope, md5,$ionicPlatform, $ionicViewService,$state,globalVars,bizglobalVars,$rootScope, fetchListing,formLoader, $ionicPopup,profileRequistion,$http,resourceRequistion,$cordovaCamera,$ionicPopover){
analytics.trackView('User Profile Dashboard view');
$scope.userDetails=globalVars.userdetails;
$scope.editlogo="";
$scope.Edituserstter={};
$scope.Edituserstter.update_logo="";
$scope.countries=[];
$scope.logourl=globalVars.userLogoFolder;
$scope.ISFBlogged=sessionStorage.isFBLogged;

$scope.userDetails[0].dob=$scope.userDetails[0].dob||"0000-00-00";



/*==============my dashboard code ===============================*/

if($rootScope.$viewHistory.currentView.stateName=='menuView.profile.home'){

$scope.lastsetBizs=[];
$scope.lastsetAds=[];
$scope.lastsetforums=[];
$scope.lastsetBlogs=[];
$scope.lastsetBlogcomments=[];
$scope.lastsetforumcomments=[];
$scope.lastsetAdcomments=[];
$scope.LatestDashBoard=[];

 $scope.AdsComemtshide= true;
 $scope.forumComemtshide= true;
 $scope.blogComemtshide= true;
 $scope.listingsdata= true;


profileRequistion.fetchMyDashboard(globalVars.userInfo.id).then(function (data) {
$scope.LatestDashBoard=data.data;

 $scope.AdsComemtshide= $scope.LatestDashBoard.Adscommets_arr.length ==0 ? true : false;
 $scope.forumComemtshide= $scope.LatestDashBoard.Forumcommets_arr.length ==0 ? true : false;
 $scope.blogComemtshide= $scope.LatestDashBoard.Blogcommets_arr.length ==0 ? true : false;
 var temp_listinglength=$scope.LatestDashBoard.Bussiness || "";

 $scope.listingsdata= temp_listinglength.length ==0 ? true : false;

    var temp_bcount=$scope.listingsdata == true? 0 : 1 ;
     var temp_AdsComemtshide=$scope.AdsComemtshide == true? 0 : 1 ;
      var temp_forumComemtshide=$scope.forumComemtshide == true? 0 : 1 ;
       var temp_blogComemtshide=$scope.blogComemtshide == true? 0 : 1;
       var total_DashCount=temp_bcount+temp_AdsComemtshide+temp_forumComemtshide+temp_blogComemtshide;



       $scope.hideDashBoardDIV= total_DashCount > 0 ? false:true;

 //console.log("total_DashCount"+total_DashCount+" $scope.hideDashBoardDIV"+ $scope.hideDashBoardDIV);

 if(temp_listinglength.length>0){
   statusCons = ['All', 'Approved', 'Un-Approved', 'In-Active', 'Paid', 'Rejected', 'NoStatus'];
                      all_lists = new Array();
                      angular.forEach(temp_listinglength, function(k,v){
                        //  $scope.actionList.push(false);
                          lIndex = statusCons.indexOf(k.status);
                              k.status = lIndex;
                             // all_lists.push(k);
                      });
                      }





  });


}


if( $scope.userDetails[0].user_logo==undefined){
$scope.user_log= sessionStorage.userLogo;
$scope.editlogo=$scope.user_log;
}
else{
//$scope.user_log=$scope.logourl+'/'+$scope.userDetails[0].id +'_'+$scope.userDetails[0].user_logo;
$scope.user_log=$scope.logourl+'/'+$scope.userDetails[0].user_logo;
$scope.editlogo=$scope.user_log;
}
//listings
$scope.mylistingclick=function(){

$state.go("menuView.profile.myListings");
analytics.trackEvent('Profile Events','Click on listings tab ','Navigate to my business list view',100);

};
//blogs
$scope.myblogclick=function(){

$state.go("menuView.profile.profileblogs");
analytics.trackEvent('Profile Events','Click on News tab ','Navigate to my news comments list view',100);

};
//forums
$scope.myforumclick=function(){

$state.go("menuView.profile.profileforums");
analytics.trackEvent('Profile Events','Click on Forums tab ','Navigate to my forums list view',100);

};
//Ads
$scope.myAdsclick=function(){

$state.go("menuView.profile.profileAds");
analytics.trackEvent('Profile Events','Click on Classifieds tab ','Navigate to my classified list view',100);

};

//event
$scope.myeventclick=function(){

$state.go("menuView.profile.myevents");
analytics.trackEvent('Profile Events','Click on Event tab ','Navigate to my Event list view',100);

};
//view profile

$scope.userdashboard=function(event){

analytics.trackEvent('Profile Events','Click on dashboard ','Back to Dash board view',100);
analytics.trackView('User Profile Dashboard view');
};
//edit profile
profileRequistion.fetchNationalitydata(globalVars.userInfo.id).then(function (data) {

                                                      $scope.countries=data.data;
                                                     // $scope.Edituserstter.nationality = $scope.countries[0].id;
                                                       });


$scope.editprofilefun=function(event){

$scope.user={};
 $state.go("menuView.profile.Editprofile");
 analytics.trackEvent('Profile Events','Click on edit profile ','Navigate to Edit profile view',100);
 analytics.trackView('User Profile Edit view');
};


//mange profile password

$scope.managepassword=function(event){

$scope.Managepassword={
newpassword:"",
conformpassword:"",

};
 analytics.trackEvent('Profile Events','Click on change password ','open change password pop view',100);

 var myPopup = $ionicPopup.show({
            template: '<lable id="manage_error_id" style="display:none"> </lable><input  ng-model="Managepassword.newpassword" type="password" placeholder="enter new password" class="manage_pswdcls" ng-change="changenewpwdfun($event);" min-length="3"/><br/><input type="password" placeholder="enter conform" ng-model="Managepassword.conformpassword" class="manage_pswdcls" ng-change="comparingpwdsfun($event);"/>',
            title: 'Change Password',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b id="changevent_id">Change</b>',
                    type: 'button-positive',
                    onTap: function(e) {


var final_pwd=md5.createHash($scope.Managepassword.conformpassword);
var current_date=new Date();

var change_pwdurl=globalVars.siteURL+"myprofile.php?function=changepassword&user_id="+$scope.userDetails[0].id+"&newpwd="+final_pwd+"&date="+current_date;

 $http.get(change_pwdurl).then(function(data){
resourceRequistion.fetchuserdetails($scope.userDetails[0].id).then(function(data){

                  globalVars.userdetails=data.data;
                  $scope.userDetails=globalVars.userdetails;

                   });
             },function(err){
              });

                    }
                }
            ]
        });
};

$scope.changenewpwdfun=function(event){
var manuallpassword=md5.createHash($scope.Managepassword.newpassword);

if(manuallpassword==$scope.userDetails[0].password){

$(".popup-buttons").hide();

$("#manage_error_id").text("current password and new enter passwords are same ").css('color','red').show();

}
else{
$(".popup-buttons").show();

$("#manage_error_id").hide();

}

};



$scope.comparingpwdsfun=function(event){
if($scope.Managepassword.newpassword==$scope.Managepassword.conformpassword){
$(".popup-buttons").show();

$("#manage_error_id").hide();
}
else{
$(".popup-buttons").hide();

$("#manage_error_id").text("new  password and conform passwords are not same ").css('color','red').show();


}


};
//Template for photo modal
var clean_userprofile = '';
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
         analytics.trackEvent('Profile Events','Click on Camera icon','open a pop view with choose from camera/gallery ',100);

    };
    $scope.getPicture = function(sourceType){
        if(sourceType == 2){
        analytics.trackEvent('Profile Events','Click on from gallery','Choose image from gallery',100);
            $cordovaCamera.getPicture({
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            })
                .then(function(datapath){
                    $scope.editlogo = 'data:image/jpeg;base64,' + datapath;
                    $scope.Edituserstter.update_logo=datapath;//$scope.editlogo;
                    clean_userprofile = datapath;
                    $scope.photoPopOver.hide();
                },function(error){
 $scope.photoPopOver.hide();

                });

        }
        else {
         analytics.trackEvent('Profile Events','Click on from camera','take image from camera',100);
            $cordovaCamera.getPicture({
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                correctOrientation : false
            })
                .then(function(datapath){
                    $scope.editlogo = 'data:image/jpeg;base64,' + datapath;

                    $scope.Edituserstter.update_logo=datapath;//$scope.editlogo;
                    clean_userprofile = datapath;
                     $scope.photoPopOver.hide();
                },function(error){
 $scope.photoPopOver.hide();

                });

        }
    };

$scope.updateuserProfile=function(event){

analytics.trackEvent('Profile Events','Click on update  ','User profile update and back to profile Dashboard view',100);
$scope.Edituserstter.user_id=$scope.userDetails[0].id;
$scope.Edituserstter.post_purpose="profileUpdate";
//$scope.Edituserstter.previouslogo_path=$scope.userDetails[0].id+'_'+$scope.userDetails[0].user_logo;
$scope.Edituserstter.previouslogo_path=$scope.userDetails[0].user_logo;
$scope.Edituserstter.user_firstName=$scope.userDetails[0].first_name;
//Updateprofile
 $rootScope.miniLoader = true;

profileRequistion.Updateprofile($scope.Edituserstter).then(function(data){


resourceRequistion.fetchuserdetails($scope.userDetails[0].id).then(function(data){

                  globalVars.userdetails=data.data;
                  $scope.userDetails=globalVars.userdetails;
$state.go($rootScope.$viewHistory.backView.stateName);
 $rootScope.miniLoader = false;
                   });

});


};
 $scope.setBackAction = function(){
 analytics.trackEvent('Profile Events','Click on Back ','Back to previous back',100);
       $state.go($rootScope.$viewHistory.backView.stateName);
    };

 })

.controller('myBizsController', function($scope, $ionicPlatform, $ionicViewService,$state,globalVars,bizglobalVars,$rootScope, fetchListing,formLoader, $ionicPopup,$ionicScrollDelegate,profileRequistion,androidServices){
 analytics.trackView('My business list view');
  $scope.actionList = [];
  $scope.allLists = [];
  $scope.myreviews=[];
  $scope.myenquires=[];
  $scope.mygallery=[];
  $scope.searchComplete = false;
//    $ionicPlatform.onHardwareBackButton(function(e){
//
//     $state.go("menuView.profile.home");
//
//      });
  if(!$rootScope.$viewHistory.backView){
    $scope.backButton = $ionicPlatform.registerBackButtonAction( function () {
        $ionicViewService.nextViewOptions({ disableBack: true });
          $state.go('menuView.listingView.categorytabs.search');
    }, 105 );
    $scope.$on('$destroy', $scope.backButton);
  }
  if(globalVars.userInfo.id){
      getListings(globalVars.userInfo.id);
  }
  function getListings(keyStorage){
        $rootScope.miniLoader = true;
        $scope.listLoadErr = false;
            fetchListing.getLists(keyStorage)
                .then(function(lData){
                    $scope.searchComplete = true;
                    statusCons = ['All', 'Approved', 'Un-Approved', 'In-Active', 'Paid', 'Rejected', 'NoStatus'];
                    all_lists = new Array();
                    angular.forEach(lData.data, function(k,v){
                        $scope.actionList.push(false);
                        lIndex = statusCons.indexOf(k.listingstatus);
                            k.statusid = lIndex;
                            all_lists.push(k);
                    });
                    $scope.currentStatus = function(sID){
                        if(sID == '')
                            sID = 0;
                        return statusCons[sID];
                    };
                    $scope.allLists = all_lists;
                    $rootScope.miniLoader = false;
                    //$scope.Spinner = 0;
            }, function(error){
                    $scope.searchComplete = true;
                    $scope.listLoadErr = true;
            });
    }
    $scope.setActive = function(index){
        angular.forEach($scope.actionList, function(v, k){
            if(k == index){
                $scope.actionList[k] = true;
            }
            else
                $scope.actionList[k] = false;
        });
        analytics.trackEvent('Profile Events','Click on options icon(right side icon) ','open options menu on selected list item(right side)',100);
    }
    $scope.resetActions = function(){
        resetActionList();
    }
    function resetActionList(){
        angular.forEach($scope.actionList, function(v, k){
            $scope.actionList[k] = false;
        });
        $scope.$apply();
    }
    // --------------------------- Send to forms for editing current business ----------------
    $scope.sendToEdit = function(businessID, premiumFlag){
      $rootScope.miniLoader = true;
        if(parseInt(premiumFlag) === 1){
            bizglobalVars.isPremium = true;
        }
        else{
            bizglobalVars.isPremium = false;
        }
        bizglobalVars.setEditMode(businessID, true);
        formLoader.getEditData(businessID).then(function(data){
            $scope.loaderModal = false;
            bizglobalVars.bizData = data;

            var temp_data=data.data;

            var temp_Adress=temp_data.Address || "";

if(typeof(temp_Adress)=="object"){
globalVars.Add_Biz_deviceLat = temp_Adress.lat;
globalVars.Add_Biz_deviceLng =  temp_Adress.lng;

}
$state.go('menuView.addBusiness.step1');
$rootScope.miniLoader = false;
        });
        analytics.trackEvent('Profile Events','Click on edit icon(business list) ','navigate to business add/edit view',100);
    };



//-----------------send to gallery view for delete -------------------------//

$scope.sendToGallery=function(businessID){
analytics.trackEvent('Profile Events','Click on Gallery icon ','Navigate to photo gallery view ',100);
$state.go('menuView.profile.myGallery', { businessID : businessID });

};



    //-------------send to business update free to premium-----------------------------


  $scope.sendToUpdate=function(businessID, premiumFlag){
 $scope.UpdatepremiumData = {};
 $scope.UpdatepremiumData.BizID=businessID;
 $scope.UpdatepremiumData.couponCode="";

    var myPopup = $ionicPopup.show({
        template: '<input type="text"  ng-model="UpdatepremiumData.couponCode ">',
        title: 'Enter Coupon Number ',
       // subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Update</b>',
            type: 'button-positive',
            onTap: function(e) {
           if($scope.UpdatepremiumData.couponCode !=""){

            formLoader.validateCouponforupdate($scope.UpdatepremiumData).then(function(data){
           if(data.data.business_id){
               $scope.sendToEdit(data.data.business_id, 1);
            }
            else{

                androidServices.showToast("invalid Coupon");
            }
        });
        }
        else{


        }
            }
          }
        ]
      })

analytics.trackEvent('Profile Events','Click on update icon(business list) ','Open pop view for entering coupon (update to premium)',100);


    };





    // ---------------------------------------Delete Listing function--------------------------
    $scope.deleteListingName = '';
    $scope.deleteListingId = null;

    $scope.showConfirm = function(id, title) {
    analytics.trackEvent('Profile Events','Click on delete icon ','Delete this'+title+' from user business list' ,100);

        var confirmPopup = $ionicPopup.confirm({
            title: 'confirm delete',
            template: 'Are you sure you want to delete ' + title + '?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                performDelete(id);
            }
        });
    };
    function performDelete(id){
        formLoader.deleteEach(id).then(function(data){
            getListings(globalVars.userInfo.id);
        });
    };
    $scope.setBackAction = function(){
    analytics.trackEvent('Profile Events','Click on Back ','Back to previous back',100);
           $state.go("menuView.profile.home");
       //    $interval.cancel(interval);
         //  $state.go($rootScope.$viewHistory.backView.stateName);
        };

     //----------------------------button group click events ------------------------------------
    $scope.mylistingsfun=function(event){

    $ionicScrollDelegate.scrollTop();
    $('.barbuttonselted').removeClass('barbuttonselted');
    $(event.target).addClass('barbuttonselted');
$(".listing_class").show();
$(".review_class,.enquiry_class,.gallery_class").hide();
analytics.trackEvent('Profile Events','Click on my lists tab ','open user business list view ',100);
analytics.trackView('My business list view');
    };

    $scope.myreviewsfun=function(event){

        $ionicScrollDelegate.scrollTop();
        $('.barbuttonselted').removeClass('barbuttonselted');
        $(event.target).addClass('barbuttonselted');
        $(".review_class").show();
        $(".listing_class,.enquiry_class,.gallery_class").hide();

        profileRequistion.profileReviewsGet(globalVars.userInfo.id).then(function (data) {
                                                     $scope.myreviews=data.data;
                                                   });

analytics.trackEvent('Profile Events','Click on Reviews tab ','open reviews list view ',100);
analytics.trackView('My business Reviews view');
                                                    };

    $scope.myenquiresfun = function(event){

            $ionicScrollDelegate.scrollTop();
            $('.barbuttonselted').removeClass('barbuttonselted');
            $(event.target).addClass('barbuttonselted');
             $(".enquiry_class").show();
             $(".listing_class,.review_class,.gallery_class").hide();

              profileRequistion.profileEnquiryGet(globalVars.userInfo.id).then(function (data) {
                                                                  $scope.myenquires=data.data;

                                                                });

analytics.trackEvent('Profile Events','Click on Enquiries tab ','open enquiries list view ',100);
analytics.trackView('My business enquiries list view');
                                                                 };

     $scope.mygalleryfun = function(event){

                $ionicScrollDelegate.scrollTop();
                $('.barbuttonselted').removeClass('barbuttonselted');
                $(event.target).addClass('barbuttonselted');
               $(".gallery_class").show();
                 $(".listing_class,.review_class,.enquiry_class").hide();
                 profileRequistion.profileGalleryGet(globalVars.userInfo.id).then(function (data) {
                                                                 $scope.mygallery=data.data;
                                                                });

analytics.trackEvent('Profile Events','Click on Gallery tab ','open user added gallery  list view ',100);
analytics.trackView('My gallery list  view');


                };




$scope.datevalue=function(date){
return dateforimate(date);
};

$scope.showimgaedelete=function(id,name,bid,title){
analytics.trackEvent('Profile Events','Click on Remove button ','delete gallery iamge from'+title+' list' ,100);
var confirmPopup = $ionicPopup.confirm({
  title: 'confirm delete',
    template: 'Are you sure you want to delete ?'
     });
      confirmPopup.then(function(res) {
       if(res) {
        profileRequistion.fetchgallerydelete(globalVars.userInfo.id,id,name,bid).then(function (data) {
           profileRequistion.profileGalleryGet(globalVars.userInfo.id).then(function (data) {
                                                                            $scope.mygallery=data.data;
                                                                           });
                   });
                     }
                      });
};


})

.controller('myBizsGalleryController', function($scope,$ionicPopup,$state, profileRequistion ,$ionicSlideBoxDelegate,$cordovaDialogs, globalDataTemp, $rootScope, $cordovaCamera, fileUpload, $ionicPopover,cordovareturn,globalVars,$ionicPlatform){
                 analytics.trackView('User Gallery view');
                 $scope.publicGalleryImages=[];
                 $scope.imgData=[];
                 $scope.galleryload_count=12;
                 $scope.myAdminChecked=false;
                 getAllImages();
                 $scope.galleryloadMore=function(){
                 $scope.galleryload_count=$scope.galleryload_count+3;
                 $scope.$broadcast('scroll.infiniteScrollComplete');
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
  $ionicSlideBoxDelegate.slide(index);

  analytics.trackEvent('Profile Events','Click on Gallery thumbnail(user gallery) ','Open image enlarge ppo view',100);
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

  $scope.GalleryPhotoDelet=function(event,currentindex,id,bid,name,img){
analytics.trackEvent('Profile Events','Click on cross icon(on thumbnail) ','Delete selected image from list',100);

  var confirmPopup = $ionicPopup.confirm({
    title: 'confirm delete',
      template: 'Are you sure you want to delete ?'
       });
        confirmPopup.then(function(res) {

         if(res) {

          profileRequistion.AdminGalleryDelete(id,name,bid).then(function (data) {
 var index = $scope.publicGalleryImages.indexOf(img);
        if (index != -1) {
        //  $scope.publicGalleryImages.splice(img, 1);
        $scope.publicGalleryImages.splice(currentindex,1);
        }
      $scope.myAdminChecked=false;
          $(event.currentTarget).prop("checked", false);
                     });
                       }
                       else{

                      $scope.myAdminChecked=false;
                       $(event.currentTarget).prop("checked", false);

                       }
                        });
  };






 function getAllImages(){
      $scope.galleryurl=globalVars.MainklURl+"img/"
      profileRequistion.getPublicGallery($state.params.businessID).success(function(data){

      $scope.galleryerror=data.length==0?true:false;
       if(typeof(data) === 'object'){
       var glue =globalVars.rawImgURL;
           if(data.length>0){
              angular.forEach(data, function(v, k){

                if(v.dir == undefined){
                 $scope.imgData.push({id:v.id,bid:v.bizid,pathname:v.image_url,image : glue + '/' + v.image_url,username:v.username,Created:dateforimate(v.Created)});
                  }
                   else{
                     $scope.imgData.push({id:v.id,bid:v.bizid,pathname:v.image_url,image : glue + v.dir + '/' + v.image_url,username:v.username,Created:dateforimate(v.Created)});
                      }
                       });
                        }
                          }
                           });

         $scope.publicGalleryImages=$scope.imgData;

                           }


})

//blogs
.controller('myprofileBlogsController', function($scope, $ionicPlatform, $ionicViewService,$state,globalVars,bizglobalVars,$rootScope, fetchListing,formLoader, $ionicPopup,$ionicScrollDelegate,profileRequistion){
        analytics.trackView('My News comments list view');
        $scope.myblogs=[];
        $scope.myblogcommets=[];
        $scope.actionList = [];
        profileRequistion.profileBlogCommentGet(globalVars.userInfo.id).then(function (data) {
        $scope.myblogcommets=data.data;
        });
        $scope.setBackAction = function(){
        analytics.trackEvent('Profile Events','Click on Back ','Back to previous back',100);
        $state.go($rootScope.$viewHistory.backView.stateName);
        };
        $scope.myblogsfun=function(event){
        $ionicScrollDelegate.scrollTop();
        $('.barbuttonselted').removeClass('barbuttonselted');
        $(event.target).addClass('barbuttonselted');
        $(".blogs_class").show();
        $(".blogscoment_class").hide();
        };
        $scope.myblogcommentfun=function(event){
        $ionicScrollDelegate.scrollTop();
        $('.barbuttonselted').removeClass('barbuttonselted');
        $(event.target).addClass('barbuttonselted');
        $(".blogs_class").hide();
        $(".blogscoment_class").show();
        profileRequistion.profileBlogCommentGet(globalVars.userInfo.id).then(function (data) {
        $scope.myblogcommets=data.data;
        });
        };
        $scope.setActive = function(index){
        angular.forEach($scope.actionList, function(v, k){
        if(k == index){
        $scope.actionList[k] = true;
        }
        else
        $scope.actionList[k] = false;
        });
        analytics.trackEvent('Profile Events','Click on options icon(right side icon) ','open options menu on selected list item(right side)',100);
        }
        $scope.resetActions = function(){
        resetActionList();
        }
        function resetActionList(){
        angular.forEach($scope.actionList, function(v, k){
        $scope.actionList[k] = false;
        });
        $scope.$apply();
        }
        $scope.showConfirm =function(id){
        var confirmPopup = $ionicPopup.confirm({
        title: 'confirm delete',
        template: 'Are you sure you want to delete ?'
        });
        confirmPopup.then(function(res) {
        if(res) {
        profileRequistion.fetchMyblogdelete(id).then(function (data) {
        profileRequistion.profileBlogsGet(globalVars.userInfo.id).then(function (data) {
        $scope.myblogs=data.data;
        angular.forEach(data.data, function(k,v){
        $scope.actionList.push(false);
        });
        });
        });
        }
        });
        };
        $scope.showConfirmcomment=function(id){
         analytics.trackEvent('Profile Events','Click on Delete(News comment)','delete  from news commments list',100);
          var confirmPopup = $ionicPopup.confirm({
        title: 'confirm delete',
        template: 'Are you sure you want to delete ?'
        });
       confirmPopup.then(function(res) {
       if(res) {
       profileRequistion.fetchMyblogcommentdelete(id).then(function (data) {
       profileRequistion.profileBlogCommentGet(globalVars.userInfo.id).then(function (data) {
       $scope.myblogcommets=data.data;
       });
       });
       }
       });
       };
       })
//forums

.controller('myprofileForumsController', function($scope, $ionicPlatform,$http, $ionicViewService,$state,globalVars,bizglobalVars,$rootScope, fetchListing,formLoader, $ionicPopup,$ionicScrollDelegate,profileRequistion,$ionicModal,resourceRequistion,androidServices){
             analytics.trackView('My forums lsit view');
             $scope.myblogs=[];
             $scope.myblogcommets=[];
             $scope.actionList = [];
             profileRequistion.profileForumsGet(globalVars.userInfo.id).then(function (data) {
             $scope.myblogs=data.data;
             angular.forEach(data.data, function(k,v){
             $scope.actionList.push(false);
              });
              });
              $scope.setBackAction = function(){
              analytics.trackEvent('Profile Events','Click on Back ','Back to previous back',100);
              $state.go($rootScope.$viewHistory.backView.stateName);
              };
              $scope.myforumsfun=function(event){
              $ionicScrollDelegate.scrollTop();
              $('.barbuttonselted').removeClass('barbuttonselted');
              $(event.target).addClass('barbuttonselted');
              $(".blogs_class").show();
              $(".blogscoment_class").hide();
              analytics.trackEvent('Profile Events','Click on My forums tab ',' open user forums lsit view',100);
              analytics.trackView('My forums list view');
              };
              $scope.myforumcommentsfun=function(event){
              $ionicScrollDelegate.scrollTop();
              $('.barbuttonselted').removeClass('barbuttonselted');
              $(event.target).addClass('barbuttonselted');
              $(".blogs_class").hide();
              $(".blogscoment_class").show();
              profileRequistion.profileForumCommentGet(globalVars.userInfo.id).then(function (data) {
              $scope.myblogcommets=data.data;
              });
              analytics.trackEvent('Profile Events','Click on comments tab(forums) ',' open user forum comments lsit view',100);
              analytics.trackView('My forum comments list view');
              };
              $scope.setActive = function(index){
              angular.forEach($scope.actionList, function(v, k){
              if(k == index){
              $scope.actionList[k] = true;
              }
              else
                 $scope.actionList[k] = false;
              });
              analytics.trackEvent('Profile Events','Click on options icon(right side icon) ','open options menu on selected list item(right side)',100);
              }
              $scope.resetActions = function(){
              resetActionList();
              }
              function resetActionList(){
              angular.forEach($scope.actionList, function(v, k){
              $scope.actionList[k] = false;
              });
              $scope.$apply();
              }
              $scope.showConfirm =function(id){
              analytics.trackEvent('Profile Events','Click on Delete(forum)','delete  from forum list',100);
              var confirmPopup = $ionicPopup.confirm({
                                title: 'confirm delete',
                                template: 'Are you sure you want to delete ?'
              });
              confirmPopup.then(function(res) {
              if(res) {
              profileRequistion.fetchMyforumdelete(id).then(function (data) {
              profileRequistion.profileForumsGet(globalVars.userInfo.id).then(function (data) {
              $scope.myblogs=data.data;
              angular.forEach(data.data, function(k,v){
              $scope.actionList.push(false);
              });
              });
              });
              }
              });
              };
              $scope.showConfirmcomment=function(id){
              analytics.trackEvent('Profile Events','Click on Delete(forum comment)','delete  from forum commments list',100);
              var confirmPopup = $ionicPopup.confirm({
                                 title: 'confirm delete',
                                 template: 'Are you sure you want to delete ?'
                                 });
                 confirmPopup.then(function(res) {
                 if(res) {
                 profileRequistion.fetchMyforumcommentdelete(id).then(function (data) {
                 profileRequistion.profileForumCommentGet(globalVars.userInfo.id).then(function (data) {
                 $scope.myblogcommets=data.data;
                 });
                 });
                 }
                 });
                 };
    /*=====================Modal view creating========================*/
              $ionicModal.fromTemplateUrl('forumEdit.html', {
               scope: $scope,
               animation: 'slide-in-up'
               }).then(function(modal) {
               $scope.modal = modal;
               });
             $scope.catdata = {};
             $scope.catdata.selectid=null;
             $scope.sendToEdit=function(data){
             $scope.postmodel={};
             $scope.postmodel.title="";
             $scope.postmodel.description="";
             $scope.catdata.selectid="";
             $scope.forumid="";
             $scope.editpostmodel=data;
             resourceRequistion.fetchforumcatlist().then(function(data){
             $scope.catdata.forumcats=data.data;
             });
             $scope.modal.show();
             $scope.postmodel.title=data.title;
             $scope.postmodel.description=data.description;
             $scope.catdata.selectid=data.category_id;
             $scope.forumid=data.id;
             analytics.trackEvent('Profile Events','Click on edit(forum) ','Edit '+ data.title+' forum and open pop view',100);
             };
             $scope.closemodalview=function(){
                                       $scope.modal.hide();
                                       $scope.postmodel.title="";
                                       $scope.postmodel.description="";
                                       $scope.catdata.selectid="";
                                       $scope.forumid="";
                analytics.trackEvent('Profile Events','Click on close ','Close pop view',100);

             };
             $scope.updatefroumfrommodal=function(id){
             $scope.postmodel.title=$scope.postmodel.title==undefined?"":$scope.postmodel.title;
             $scope.postmodel.description=$scope.postmodel.description==undefined?"":$scope.postmodel.description;
             if( $scope.postmodel.title !="" &&  $scope.postmodel.description !="" ){
             var slug=$scope.postmodel.title.split(" ").join("_").toLowerCase();
             var urk=globalVars.siteURL+'myprofile.php?function=forumupdate&catid='+$scope.catdata.selectid+'&title='+$scope.postmodel.title+'&desc='+$scope.postmodel.description+'&id='+id+"&slug="+slug;
             $http.get(urk).then(function(data){
             $scope.postmodel.tilte="";
             $scope.postmodel.description="";
             profileRequistion.profileForumsGet(globalVars.userInfo.id).then(function (data) {
             $scope.myblogs=data.data;
             angular.forEach(data.data, function(k,v){
             $scope.actionList.push(false);
             });
             });
             $scope.closemodalview();
             },function(err){
             });
             analytics.trackEvent('Profile Events','Click on update(forum) ','Update forum in list',100);
             }
             else{
             androidServices.showToast("Fill All fields");
             }
             };
             })
//Ads

.controller('myprofileAdsController', function($scope, $ionicPlatform, $ionicViewService,$state,globalVars,bizglobalVars,$rootScope, fetchListing,formLoader, $ionicPopup,$ionicScrollDelegate,profileRequistion){
          analytics.trackView('My Claasifieds list view');
          $scope.Ads=[];
          $scope.myAdsEnqueries=[];
          $scope.actionList = [];
          profileRequistion.profileAdsGet(globalVars.userInfo.id).then(function (data) {
          $scope.Ads=data.data;
          angular.forEach(data.data, function(k,v){
          $scope.actionList.push(false);
          });
          });
          $scope.setBackAction = function(){
          analytics.trackEvent('Profile Events','Click on Back ','Back to previous back',100);
          $state.go('menuView.profile.home');
          };
          $scope.myAdsfun=function(event){
          $ionicScrollDelegate.scrollTop();
          $('.barbuttonselted').removeClass('barbuttonselted');
          $(event.target).addClass('barbuttonselted');
          $(".blogs_class").show();
          $(".blogscoment_class").hide();
          analytics.trackEvent('Profile Events','Click on Classifieds tab ',' open user classified lsit view',100);
          analytics.trackView('My Claasifieds list view');
          };

         $scope.myAdsenquiresfun=function(event){
         $ionicScrollDelegate.scrollTop();
         $('.barbuttonselted').removeClass('barbuttonselted');
         $(event.target).addClass('barbuttonselted');
         $(".blogs_class").hide();
         $(".blogscoment_class").show();
         $rootScope.miniLoader = true;

         profileRequistion.profileAdsEnquiryGet(globalVars.userInfo.id).then(function (data) {

         $rootScope.miniLoader=false;

         $scope.myAdsEnqueries=data.data;

         console.log($scope.myAdsEnqueries);
         });
         analytics.trackEvent('Profile Events','Click on Enquires tab(in classified) ',' open user classified enquires  lsit view',100);
         analytics.trackView('My Claasified enquiries list view');
         };
         $scope.setActive = function(index){
         angular.forEach($scope.actionList, function(v, k){
         if(k == index){
         $scope.actionList[k] = true;
         }
         else{
         $scope.actionList[k] = false;
         }
         });
         analytics.trackEvent('Profile Events','Click on options icon(right side icon) ','open options menu on selected list item(right side)',100);
         };
         $scope.resetActions = function(){
         resetActionList();
         }
         function resetActionList(){
         angular.forEach($scope.actionList, function(v, k){
              $scope.actionList[k] = false;
         });
         $scope.$apply();
         }
         //fetchAdsDelete
         $scope.showConfirm=function(id,title){
         analytics.trackEvent('Profile Events','Click on Delete(classified) ','delete this '+title+' from classified list',100);
         var confirmPopup = $ionicPopup.confirm({
         title: 'confirm delete',
         template: 'Are you sure you want to delete ?'
         });
         confirmPopup.then(function(res) {
         if(res) {
         profileRequistion.fetchAdsDelete(id).then(function (data) {
         profileRequistion.profileAdsGet(globalVars.userInfo.id).then(function (data) {
         $scope.Ads=data.data;
         angular.forEach(data.data, function(k,v){
         $scope.actionList.push(false);
         });
         });
         });
         }
         });
         };
         $scope.sendToEdit=function(id,title){
         var Ads_Data=$scope.Ads;
         var data_temp= AdssearchBYid(id,Ads_Data);
         globalVars.Classifed_EditArr=data_temp.Ads;

         console.log("classified click");
         console.log(data_temp.Ads);

         $state.go('menuView.addClassifieds.step1');
         };
         $scope.clickonpostADS=function(){
            analytics.trackEvent('Classified  Events','Click on post Ads ','Navigate to Add classified view',100);
            };


         })
.controller('myEventsController', function($scope, $ionicPlatform, $ionicViewService,$state,globalVars,bizglobalVars,$rootScope, fetchListing,formLoader, $ionicPopup,$ionicScrollDelegate,profileRequistion,androidServices,$http){
 analytics.trackView('My events list view');
 $scope.MainUrl= globalVars.siteURL;
  $scope.myreviews=[];
  $scope.myenquires=[];
  $scope.mygallery=[];
  $scope.allLists=[];
  $scope.searchComplete = false;
  if(!$rootScope.$viewHistory.backView){
    $scope.backButton = $ionicPlatform.registerBackButtonAction( function () {
        $ionicViewService.nextViewOptions({ disableBack: true });
          $state.go('menuView.listingView.categorytabs.search');
    }, 105 );
    $scope.$on('$destroy', $scope.backButton);
  }

  $scope.user_id = globalVars.userInfo.id;

  //myeventReviewsCall();

myeventlistsCall();
$scope.myeventlistingsfun=function(event){

    $ionicScrollDelegate.scrollTop();
    $('.barbuttonselted').removeClass('barbuttonselted');
    $(event.target).addClass('barbuttonselted');
$(".listing_class").show();
$(".review_class,.enquiry_class,.gallery_class").hide();
analytics.trackEvent('Profile Events','Click on my lists tab ','open user business list view ',100);
analytics.trackView('My business list view');
myeventlistsCall();
    };


function myeventlistsCall(){
$http.get($scope.MainUrl+"myevents.php?function=myeventlist&user_id="+$scope.user_id)
                       .then(function(data){
                                    $scope.allLists=typeof(data.data) == 'object' ? data.data : [];
                                    $rootScope.miniLoader=false;
                                     });
                                     }


 $scope.myeventreviewsfun=function(event){

        $ionicScrollDelegate.scrollTop();
        $('.barbuttonselted').removeClass('barbuttonselted');
        $(event.target).addClass('barbuttonselted');
        $(".review_class").show();
        $(".listing_class,.enquiry_class,.gallery_class").hide();
        myeventReviewsCall();
};

function myeventReviewsCall(){
$http.get($scope.MainUrl+"myevents.php?function=myeventreviews&user_id="+$scope.user_id)
                       .then(function(data){
                                    $scope.myreviews=data.data;
                                    $rootScope.miniLoader=false;
                                     });
                                     }

$scope.myeventenquiresfun = function(event){

            $ionicScrollDelegate.scrollTop();
            $('.barbuttonselted').removeClass('barbuttonselted');
            $(event.target).addClass('barbuttonselted');
             $(".enquiry_class").show();
             $(".listing_class,.review_class,.gallery_class").hide();


    $http.get($scope.MainUrl+"myevents.php?function=myenquries&user_id="+$scope.user_id)
                           .then(function(data){
                                        $scope.myenquires=data.data;
                                        $rootScope.miniLoader=false;
                                         });
                     };
          $scope.myeventgalleryfun = function(event){

                         $ionicScrollDelegate.scrollTop();
                         $('.barbuttonselted').removeClass('barbuttonselted');
                         $(event.target).addClass('barbuttonselted');
                        $(".gallery_class").show();
                          $(".listing_class,.review_class,.enquiry_class").hide();

      eventgallerycall();
                                           };


function eventgallerycall(){

$http.get($scope.MainUrl+"myevents.php?function=eventgallerybyME&user_id="+$scope.user_id)
                             .then(function(data){
                                          $scope.mygallery=typeof(data.data) == 'object' ? data.data : [];
                                          $rootScope.miniLoader=false;
                                           });

}

   $scope.eventimgaedelete=function(data,event){
   analytics.trackEvent('Profile Events','Click on Remove button ','delete gallery iamge from'+data.name+' list' ,100);
   var confirmPopup = $ionicPopup.confirm({
     title: 'confirm delete',
       template: 'Are you sure you want to delete ?'
        });
         confirmPopup.then(function(res) {
          if(res) {

      //   var delete_url= $scope.MainUrl+"myevents.php?function=eventgallerydeletebyME&user_id="+$scope.user_id+"&img_id="+data.gallery_id+"&event_id="+data.event_id+"&img="+data.image+"&thumbnail="+data.gallery_thumbnail;
        var delete_url= $scope.MainUrl+"myevents.php?function=eventgallerydeletebyME&user_id="+$scope.user_id+"&img_id="+data.gallery_id+"&event_id="+data.event_id+"&image_name="+data.image_name;


          $http.get(delete_url).then(function(data){
                                                   eventgallerycall();
                                                     });
                        }
                         });
   };


 $scope.eventdelete=function(data,event){
   analytics.trackEvent('Profile Events','Click on Remove button ','delete event from list' ,100);
   var confirmPopup = $ionicPopup.confirm({
     title: 'confirm delete',
       template: 'Are you sure you want to delete ?'
        });
         confirmPopup.then(function(res) {
          if(res) {
          $http.get($scope.MainUrl+'myevents.php?function=myeventDelete&eventID='+data.id).then(function(data){
                                                   myeventlistsCall();
                                                     });
                        }
                         });
   };

$scope.datevalue=function(date){
return dateforimate(date);
};

});


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

 function AdssearchBYid(id,data){
 return JSON.parse(JSON.stringify(JSON.find({data:data,criteria:[{elementName:"id",elementValue:id}]})));
 }