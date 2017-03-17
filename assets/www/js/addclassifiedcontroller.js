angular.module('addClassifiedControllers', [])
//Add Business Controller (parent)
.controller('addClassified', function($scope, classifiedsData, $timeout,$ionicPopover,$ionicPopup,$cordovaCamera, $rootScope, $state, formLoader, bizglobalVars, $cordovaGeolocation, globalVars, globalDataTemp,androidServices){
analytics.trackView('Classified Detail ADD view (step1)');
console.log(androidServices);
      var Temp_datafor=globalVars.Classifed_EditArr ;
      globalVars.Classifed_EditArr={};
      globalVars.Classifed_EditArr={
      title:"",
      };
        $rootScope.setSearch = 'classified';
        $current_view = $rootScope.$viewHistory.currentView.stateName;

     $scope.type1, $scope.type2, $scope.type3 = false
        $scope.formRelease = false;
        $scope.formLoadedCategories = [];
        $scope.formData = {};
        $scope.formData2 = {};
        $scope.formData3 = {};
        $scope.formLoadedSubCats = [];
        $scope.formTemplate = [];
        $scope.editMode = false;
        $scope.mobileAccessDisable = false;
        $scope.filter_res = [];
        $scope.catEdit = false;
        $scope.editImages = [];
        $scope.selected_value = [];
        $scope.imgresin = globalVars.siteURL + 'img/ClassifiedLogo/logo_folder/';
        $scope.AdsLogo=globalVars.MainklURl+'img/ClassifiedLogo/logo_folder/';
        $scope.Adsimage_url = globalVars.rawImgURL;


        $scope.callChange = function(index){

        };
        $scope.latlngdone = false;
        var catID = null;

        //Sub category loader
        $scope.loadSubCats = function(){
            $scope.formRelease = false;
            classifiedsData.getSubCategories($scope.formData.selectedCategory)
                .success(function(data){
                    $scope.formLoadedSubCats = data;
                    var selCat = parseInt($scope.formData.selectedCategory);
                    if(selCat === 48){  //Mobiles and Tablets
                        $scope.type2 = true;
                        $scope.type1, $scope.type3 = false;
                    }
                    else if(selCat === 300){    //Automobiles
                        $scope.type3 = true;
                        $scope.type1, $scope.type2 = false;
                    }
                    else if(selCat === 303){    //Housing and Commercial
                        $scope.type1 = true;
                        $scope.type2, $scope.type3 = false;
                    }
                    else{
                        $scope.type1, $scope.type2, $scope.type3 = false
                    }
                    if($scope.catEdit == true){
                        $scope.formData.classified_type_id = $scope.formData.selectedsubCategory;
                        $scope.changedSubCat();
                    }
                })
                .error(function(data){

                })
        };
        //Edit mode insertion

        //$scope.uploadableImages=[];
        if(Temp_datafor.title.length > 0){

            $scope.latlngdone = true;
            $scope.catEdit = true;
            var indata = Temp_datafor;
            catID = indata.id;
            $scope.formData.title = indata.title;
            $scope.formData.selectedCategory = indata.parent_catid;
            $scope.formData.selectedsubCategory = indata.classified_type_id;
            $scope.formData.search_keyword = parseFloat(indata.price);
            $scope.formData.description = indata.description;

            $scope.selected_value = indata.selected_option;
             $scope.loadSubCats();
            //Page 2 init

        }


        var in2data = Temp_datafor || '';
        $scope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams){
            if(toState.name === 'menuView.addClassifieds.step2'){
                    if(Temp_datafor.title.length > 0){


                        $scope.catEdit = true;
                        var indata = Temp_datafor;
                         $scope.formData2.contact_number = indata.mobile_no;
                        $scope.formData2.governorate = parseInt(indata.Address.governorate_id);
                        $scope.formData2.city_id =parseInt(indata.Address.city_id);
                        $scope.formData2.land_mark = indata.Address.land_mark;
                        $scope.formData2.lat = indata.Address.lat;
                        $scope.formData2.lng = indata.Address.lng;
                        globalVars.Add_Biz_deviceLat = indata.Address.lat;
                        globalVars.Add_Biz_deviceLng = indata.Address.lng;


                        //$scope.formData3.video_url = indata.classified.ClassifiedVideo[0].video_url;
                    }
                    else{

                    globalVars.Add_Biz_deviceLat = 0;
                     globalVars.Add_Biz_devcieLng = 0;
                    }
                }

                if(toState.name === 'menuView.addClassifieds.step3'){
                 if(Temp_datafor.title.length > 0){

                                     $scope.catEdit = true;
                                     var indata = Temp_datafor;
                                      $scope.editImages = indata.Images || [];
                                      var temp_EditData=$scope.editImages;


                                    }

                                    }


            });
             $scope.$on('ngRepeatGovFinished', function(ngRepeatFinishedEvent) {
           // $scope.formData2.governorate = in2data.Address.governorate_id;
        });
        $scope.$on('ngRepeatCityFinished', function(ngRepeatFinishedEvent) {
           // $scope.formData2.city_id = in2data.Address.city_id;
        });
        $scope.fields = [];
        $scope.attributes = [];
        $scope.year_res = [];
        $scope.uploadableImages = [];
        var year = new Date().getFullYear();

        for(var i=year - 20; i <= year; i++)
        {
            $scope.year_res.push(i);
        }
        $scope.cform2Valid = false;
        $scope.cform2Valid = false;
        $scope.$on('formIsValid', function(e, name){
            if(name === 'f1'){
                $scope.cform1Valid = true;
            }
            if(name === 'f3'){
                $scope.cform2Valid = true;
            }
        });
        $scope.$on('formIsNotValid', function(e, name){
            if(name === 'f1'){
                $scope.cform1Valid = false;
            }
            if(name === 'f3'){
                $scope.cform2Valid = false;
            }
        });
    function getFormData(){
        $rootScope.miniLoader = true;
        classifiedsData.getSelectCategories()
            .success(function(res){


                $scope.formLoadedCategories = res;
                formLoader.getCities()
                    .then(function(){
                        formLoader.getGoverns()
                            .then(function(){
                                $scope.progress = 100;
                                $rootScope.miniLoader = false;
                                $scope.isFormReady = true;
                                formChange();
                                $scope.loadComplete = true;
                            });
                    });
            })
            .error(function(res){

                $rootScope.miniLoader = false;
            })
    };
    function formChange(){									//Sets category list json from local storage to view
        $scope.govList = formLoader.govData.data;
        $scope.cityList = formLoader.cityData.data;
        $scope.cityFullList = [];
        angular.forEach($scope.govList, function(v,k){
            $scope.cityFullList[v.id] = [];
        });
        angular.forEach($scope.cityList, function(v,k){
            $scope.cityFullList[v.governorate_id].push(v);
        });
    }
    $scope.statusMsg = "";
    $scope.modalFlag = true;
    $scope.gpsActivity = null;
    $scope.openMap = function(){							//Opens the Google Maps modal
        $rootScope.miniLoader = true;
         $("body").prepend('<input id="pac-input" class="controls" type="text" placeholder="Search Box" style="left:120px !important;" min="4" />');

        runGPS();
        timerPromise = $timeout(function(){
            if($rootScope.mapModal !== true){
                $rootScope.miniLoader = false;
                androidServices.showToast("Its taking us a while to access your GPS, Please try turning on GPS if its switched off");
                $scope.statusModal = true;
                //$scope.openMap();
            }
        }, 6000);
         analytics.trackEvent('Add Classified Events','Click on location icon','open map view for add location',100);

    };

    $scope.step3_finish=true;
    var logo_c=Temp_datafor.logo ||"";
    $scope.step3_finish=logo_c.length == 0 ?true:false;
  //  $scope.cleanLogo=logo_c.length == 0 ? "" : $scope.AdsLogo+Temp_datafor.id+"_"+logo_c;

   $scope.cleanLogo=logo_c.length == 0 ? "" : $scope.AdsLogo+logo_c;
   $scope.cleanLogo_old=logo_c.length == 0 ? "" : logo_c;



 //   $scope.editLogo = logo_c.length == 0 ? "img/defaultuser.png" : $scope.AdsLogo+Temp_datafor.id+"_"+logo_c;

  $scope.editLogo = logo_c.length == 0 ? "img/defaultuser.png" : $scope.AdsLogo+logo_c;


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
        analytics.trackEvent('Add Classified Events','Click on from camera','take image from gallery',100);
            $cordovaCamera.getPicture({
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            })
            .then(function(datapath){
            if($scope.GetADlogo === true){
                            $scope.cleanLogo = datapath;
                            $scope.editLogo = 'data:image/jpeg;base64,' + datapath;
                            $scope.step3_finish=false;
                           }
                           else{
                $scope.uploadableImages.push(datapath);
                }
                $scope.photoPopOver.hide();
            });
        }
        else {
        analytics.trackEvent('Add Classified Events','Click on from camera','take image from camera',100);
            $cordovaCamera.getPicture({
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                correctOrientation : false
            })
            .then(function(datapath){
               if($scope.GetADlogo === true){
                                           $scope.cleanLogo = datapath;
                                           $scope.editLogo = 'data:image/jpeg;base64,' + datapath;
                                           $scope.step3_finish=false;
                                          }
                                          else{
                               $scope.uploadableImages.push(datapath);
                               }
                $scope.photoPopOver.hide();
            });
        }
    };

    $scope.popOverOpen=function(parameter){

    if(parameter==1){
     $scope.GetADlogo=true;
    }
    else{

     $scope.GetADlogo=false;
    }

    analytics.trackEvent('Add Classified Events','Click on image (in step2)','open a pop view with choose from camera/gallery ',100);
     $scope.photoPopOver.show();

    };

    function runGPS(){

        $cordovaGeolocation.getCurrentPosition().then(function(position){
            if(position){
             globalVars.deviceLat = position.coords.latitude;
                globalVars.deviceLng = position.coords.longitude;
                $rootScope.miniLoader = false;
                $scope.statusModal = false;
                if(timerPromise){
                    $timeout.cancel(timerPromise);
                }
                $scope.gpsActivity = position;
                $rootScope.mapModal = true;
                $scope.latlngdone = true;
            }
            else if(!$rootScope.gpsError){
                $scope.statusMode.msg = "Cannot access GPS";
                if(timerPromise){
                    $timeout.cancel(timerPromise);
                }
            }
            else{
                $scope.statusMode.msg = "Cannot access GPS";
                if(timerPromise){
                    $timeout.cancel(timerPromise);
                }
            }
        });
    }
    //Listener watching user's map changes
    var cleanThisUp = $rootScope.$on('userAddedCoords', function(e, data){
        $scope.formData2.lat = data.lat;
        $scope.formData2.lng = data.lng;

    });
    $scope.acceptCoords = function(){
        $rootScope.mapModal = false;
    };


    $scope.changedSubCat = function(){
        $scope.formRelease = false;
        selsubcat = $scope.formData.classified_type_id;
        $rootScope.miniLoader = true;
        classifiedsData.getFields(selsubcat)
            .success(function(res){
                $rootScope.miniLoader = false;
                $scope.fields = res.fields;
                $scope.attributes = res.attributes;
                $timeout(function(){
                    $scope.$apply();
                }, 1)
            })
            .error(function(res){
                $rootScope.miniLoader = false;

            });
    };
    $scope.change_attribute = function(fid,aid)
    {
        angular.forEach($scope.fields, function(v,k){
            if(parseInt(v.ClassifiedField.parent) == parseInt(fid))
            {
                res = new Array();

                angular.forEach($scope.attributes[v.ClassifiedField.id], function(v1,k1){
                    if(parseInt(aid) == parseInt(v1.ClassifiedAttribute.parent))
                    {
                        res.push(v1);
                    }
                });
                $scope.filter_res[v.ClassifiedField.id] = res;
            }
        });
    };
    $scope.chk_selected = function(fid,aid)
    {
        if($scope.catEdit == true && $scope.selected_value[fid] == aid)
        {
            $scope.change_attribute(fid,aid);
            return true;
        }
        else
            return false;
    }
    $scope.get_selected = function(fid)
    {
        if($scope.selected_value[fid])
        {
            return $scope.selected_value[fid];
        }
        else
            return false;
    }
    $scope.initiateLocalDelete = function(index){
      analytics.trackEvent('Add Classified Events','Click on Cross icon ','Delete seleted image from list',100);
        $scope.uploadableImages.splice(index);
    }
    $scope.initiateServerDelete = function(id, index){
        var confirmPopup = $ionicPopup.confirm({
            title: 'confirm delete',
            template: 'Are you sure you want to delete this image ?'
        });
        analytics.trackEvent('Add Classified Events','Click on Cross icon ','Delete seleted image from list',100);
        confirmPopup.then(function(res) {
            if(res) {
                $rootScope.miniLoader = true;
                classifiedsData.deleteImg(id)
                    .success(function(res){
                        $rootScope.miniLoader = false;
                         $scope.editImages.splice(index,1);

                        //return res;
                    })
                    .error(function(res){
                        $rootScope.miniLoader = false;
                        androidServices.showToast('there was an issue deleting the image due to ' + err);
                    })
            }
        });

    }
    getFormData();
    $scope.callChange = function(){

    }
        //@param for form1 = classified_form_1
        //@param for form2 = classified_form_2
        //@param for form3 = classified_form_3
         var compiledFormData_forum1 = {};
    $scope.getData = function(){
        //custom_form_field
        var serializedValues = $("#customformHandler select.active_field, #customformHandler input.active_field").serializeArray();
        var compiledFormData = {
            user_id : globalVars.userInfo.id,
            default_values : $scope.formData,
           // custom_values :  serializedValues,
           // classified_id : catID
        };

        compiledFormData_forum1=compiledFormData;
        $rootScope.miniLoader = true;
        if($current_view == "menuView.addClassifieds.step1"){
        if($scope.catEdit == false){
        classifiedsData.duplicatecheck($scope.formData.title)
                       .success(function(res){
                       if(parseInt(res) != 0 ){

                        androidServices.showToast("Classified Title already exits.......... ");
                       }
                       else{
                        $state.go('menuView.addClassifieds.step2');
                         }
                         })
                         .error(function(res){});
                         }
        else{
        classifiedsData.EDitduplicatecheck($scope.formData.title,catID)
                       .success(function(res){
                        if(parseInt(res) != 0 ){
                        androidServices.showToast("Classified Title already exits.......... ");
                         }
                        else{
                         $state.go('menuView.addClassifieds.step2');
                          }
                          })
                          .error(function(res){});
                          }
                          }


    /*   classifiedsData.postFormData('DataInsert', compiledFormData)//@params : form name , post_data
            .success(function(res){
                $rootScope.miniLoader = false;
                classifiedsData.temporary_classified_id = catID = parseInt(res);

                $state.go('menuView.addClassifieds.step2');

            })
            .error(function(res){
                $rootScope.miniLoader = false;

            });*/





 $rootScope.miniLoader = false;

    }

    var compiledFormData_forum2={};
    $scope.getForm2Data = function(){
         var compiledFormData = {
            //classified_id : classifiedsData.temporary_classified_id,
            default_values : $scope.formData2
        }
        compiledFormData_forum2=compiledFormData;

        $rootScope.miniLoader = true;
       /* classifiedsData.postFormData('classified_form_2', compiledFormData)//@params : form name , post_data
            .success(function(res){
                $rootScope.miniLoader = false;
                $state.go('menuView.addClassifieds.step3');

            })
            .error(function(res){
                $rootScope.miniLoader = false;

            });*/
$rootScope.miniLoader = false;
 $state.go('menuView.addClassifieds.step3');
    }
    var compiledFormData_forum3={};

    $scope.getForm3Data = function(){
    var compiledFormData = {
    // classified_id : classifiedsData.temporary_classified_id,
    classified_images : $scope.uploadableImages,
    classified_logo   : $scope.cleanLogo,
    classified_old_logo : $scope.cleanLogo_old
     // video_url : $scope.formData3.video_url
      };
//      if($scope.catEdit == true){
//       if($scope.editImages.length > 0){
//       angular.forEach($scope.editImages,function(v,k){
//       });
//        }
//        }


    compiledFormData_forum3 =compiledFormData;
    var compiledFormData_allForum={
    form1_data:compiledFormData_forum1,
    form2_data:compiledFormData_forum2,
    form3_data:compiledFormData_forum3
    };
     $rootScope.miniLoader = true;
     if($scope.catEdit == true){
     $rootScope.miniLoader = false;
      classifiedsData.postFormData('UpdateAd', compiledFormData_allForum,catID).then(function(data){
          $rootScope.miniLoader = false;
          globalVars.Add_Biz_deviceLat=0;
          globalVars.Add_Biz_deviceLng=0;
          $state.go('menuView.profile.profileAds');
          });

     }
     else{
     classifiedsData.postFormData('InsertAd', compiledFormData_allForum,"").then(function(data){
     $rootScope.miniLoader = false;
     globalVars.Add_Biz_deviceLat=0;
     globalVars.Add_Biz_deviceLng=0;
     $state.go('menuView.classifieds.categorytabs.recentads');
     });
     }
      //@params : form name , post_data
      //            .success(function(res){
      //                $rootScope.miniLoader = false;
      //                //androidServices.showToast('your ad has been posted successfully');
      //              //  $state.go('menuView.myClassifieds');
      //            })
      //            .error(function(res){
      //                $rootScope.miniLoader = false;
      //                //androidServices.showToast('your ad was not posted successfully, Please try again');
      //              //  $state.go('menuView.myClassifieds');
      //            });
      };

    $scope.$on('$destroy', function(){
        cleanThisUp();
    });
    $scope.preemptiveBack=function(){
    cleanThisUp();
    analytics.trackEvent('Add Classified Events','Click on Back button(in step1)',' Navigate to Classified home view',100);

    $state.go('menuView.classifieds.categorytabs.recentads');
    };
    $scope.backbuttonclick=function(index){
    switch (index){
        case  2 :
        analytics.trackEvent('Add Classified Events','Click on Back button(in step2)','Back to Classified Detail ADD view ',100);
        analytics.trackView('Classified Detail ADD view (step1)');
        break;
        case 2 :
        analytics.trackEvent('Add Classified Events','Click on Back button(in step3)','Back to Classified Add location  view',100);
        analytics.trackView('Classified Add location view');
        break;

        }
    };

    $scope.changeformviews=function(index){
    switch (index){
    case  1 :
    analytics.trackEvent('Add Classified Events','Click on Next button(in step1)','Navigate to Classified Add location  view',100);
    analytics.trackView('Classified Add location view(step2)');
    break;
    case 2 :
    analytics.trackEvent('Add Classified Events','Click on Next button(in step2)','Navigate to Classified Add logo and images  view',100);
    analytics.trackView('Classified Add Logo and images view(step3)');
    break;
    default :
    analytics.trackEvent('Add Classified Events','Click on Finish button(in step3)','Save classified in list and Navigate to Classified home view',100);
    break;
    }
    };
});
