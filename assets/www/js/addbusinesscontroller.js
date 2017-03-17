angular.module('addBusinessCtrls', [])
//Add Business Controller (parent)
.controller('addBusinessCtrl', function($scope, $ionicPlatform, $ionicViewService, $rootScope, $cordovaGeolocation, formLoader, $timeout, $state, $window, bizglobalVars, $interval, $document, androidServices, globalVars,$ionicModal, $ionicPopover, $ionicPopup,$cordovaDialogs,$ionicScrollDelegate){
//    if(!$rootScope.$viewHistory.backView){
//        $scope.backButton = $ionicPlatform.registerBackButtonAction( function () {
//            $ionicViewService.nextViewOptions({ disableBack: true });
//           // $state.go('menuView.listingView.categorytabs.search');
//        }, 105 );
//        $scope.$on('$destroy', $scope.backButton);
//    }
analytics.trackView('Add Business Title and Description view(step1)');

//alert($rootScope.keyboardOpen);
    $scope.statusModal = false;
    $scope.confirmDelModal = false;
    $scope.photoModal = false;
    $rootScope.mapModal = false;
    $scope.setterData = {};

     $scope.URLregex = RegExp('^((https?|ftp)://)?([a-z]+[.])?[a-z0-9-]+([.][a-z]{1,4}){1,2}(/.*[?].*)?$', 'i');
    //--------------------------------Scope Variables-----------------------------------------------

    $scope.isFormReady 	= false;							//Signals the end of form load process
    $scope.progress		= 8;								//Global progressbar value for form load
	  $scope.checkCat 	= {};								//Initializes Category obj
    $scope.secondaryCat = {};                               //Edit mode category list
    $scope.keylist 	    = {};								//Initializes Keywords obj
	  $scope.tagList 		= [];								//Initializes New category list array
	  $scope.temptagList=[];                                 //temporary tag list array
	  $scope.cityLinkList = {};								//Initializes New category list obj
	  $scope.setData		= {};								//Overall carryover array init
	  $scope.logoPic      = '';                               //Business logo init
    $scope.picList		= [];                               //Business images init
	  $scope.imageList 	= [];                               //General Business Images
    $scope.bData        = {};                               //Wholesome buisiness data obj
    $scope.loadedKeys   = [];                               //Custom keyword array init
    $scope.checkForCats = false;                            //Category validation init as not valid
    $scope.setData      = {                                 //Initializes lat and long
            lat         : 0,
            long        : 0
    };
    $scope.cidArray     = [];                               //Edit mode array
    $scope.cnameArray   = [];                               //Edit mode array
    $scope.csvString    = "";
    $scope.cposArray    = [];                               //Edit mode array
    $scope.aggregateIds = [];
    $scope.aggregateList= [];
    $scope.TempPreDefineTags=[];
    $scope.EditTagsArray=[];
    $scope.temp_list=[];
     $scope.temp_tag_namesArr=[];
    $scope.compiledData = [];                               //Completed category Array
    $scope.editMode     = false;                            //edit mode on forms to preserve data
    $scope.primaryEditMode = false;
    $scope.insertMode   = [];
    $scope.catListLocal = [];
    $scope.loadComplete = false;
    $scope.emergencySave = false;
    $scope.getLogo      = true;
    $scope.businessID   = null;
    $scope.isUploadFinished = '';
    $scope.iterate_count_total = 0;
    $scope.iterate_count_current = 0;
    $scope.currentFlag = '';
    $scope.isLogoSet = false;
    $scope.editLogo = '';
    $scope.rawLogoName = '';
    $scope.editModeImages= [];
    $scope.rawImageName  = [];
    $scope.mykeywordList = [];
    $scope.checkedCat = '';
    $scope.catlistLimit = 20;
    $scope.keyLimiter = 20;
    $scope.deleteSpecs = [];
    $scope.hasLogoChanged = false;
    $scope.isPremium = true;
    $scope.premiumData = {};
    //-------------------------------------------Raw variables-------------------------------------
    var timerPromise    = null;
    var preLoadedList = [];
    var customList = [];
    var triggerSave = false;
    var hasPageChanged = false;
    var businessData = [];
    var addressEdit = false;
    businessData[0] = {};
    businessData[1] = [];
    businessData[2] = {};
    businessData[3] = {};
    businessData[4] = [];
    businessData[5] = [];
    var varSet = {};
    var curPage = '';
    var timerA    = null;
    var runOnce = false;
    var previousStateName = '';
    $scope.filteridList = [];
    $scope.filternameList = [];
    $scope.mybizImages = [];
    $scope.latlngdone = false;
    if(bizglobalVars.bizData.data){
        varSet =  bizglobalVars.bizData.data;
        $scope.businessID = bizglobalVars.bID;
    }


    //Check if premium is set
    if(bizglobalVars.isPremium === true){
        $scope.isPremium = true;
    }
    else{
        $scope.isPremium = false;
    }
    /*Added global form validation events*/
    $scope.formValid = false;
    $scope.form3Valid = false;
    $scope.form4Valid = false;
    $scope.$on('formIsValid', function(e, name){
        if(name === 'f1'){
            $scope.formValid = true;
        }
        if(name === 'f3'){
            $scope.form3Valid = true;
        }
        if(name === 'f4'){
            $scope.form4Valid = true;
        }
        if(name === 'default'){
            $scope.defaultFormValid = true;
        }
    });
    //Listener watching user's map changes
    var cleanThisUp = $rootScope.$on('userAddedCoords', function(e, data){
                        $scope.setData.lat = data.lat;
                        $scope.setData.long = data.lng;

                      });
    $scope.preemptiveBack = function(){
      if($rootScope.prevState !== 'menuView.addBusiness.step2'){
          $state.go($rootScope.prevState);
      }
 analytics.trackEvent('ADD Business Events','Click on Back button in step1','Back to previous view',100);
    };
    $scope.$on('formIsNotValid', function(e, name){
        if(name === 'f1'){
            $scope.formValid = false;
        }
        if(name === 'f3'){
            $scope.form3Valid = false;
        }
        if(name === 'f4'){
            $scope.form4Valid = false;
        }
        if(name === 'default'){
            $scope.defaultFormValid = false;
        }
    });
    //---------------------------------Init for edit or allow mode--------------------------
    evalAllData();
    //------------------------------------- Edit mode data init----------------------------

    if(bizglobalVars.editMode){
        if(bizglobalVars.isPremium === true){
            $scope.isPremium = true;
        }
        else{
            $scope.isPremium = false;
        }
        if(varSet.Category_Keyword_Selected){
        angular.forEach(varSet.Category_Keyword_Selected, function(v, k){
                preLoadedList.push(parseInt(v.id));
                $scope.filteridList.push(parseInt(v.id));
                $scope.mykeywordList.push(parseInt(v.id));
                 $scope.EditTagsArray.push({"Name" : v.name, "ID" : v.id});

            });
        }
        if(varSet.Business_Keyword_Added){
            angular.forEach(varSet.Business_Keyword_Added, function(v, k){
                $scope.filternameList.push(v.name);
                $scope.tagList.push(v.name);

            });
        }
        if(varSet.Address && varSet.Address.lat && varSet.Address.lng){
            bizglobalVars.haveTrack = true;
            $scope.latlngdone = true;

        }
        else{
            bizglobalVars.haveTrack = false;
        }
        if(varSet.Address && varSet.Business && varSet.Business.logo){
            var glue = bizglobalVars.logoFolder + "/" + bizglobalVars.bID + '_' + varSet.Business.logo;
            $scope.rawLogoName = varSet.Business.logo;
            $scope.editLogo =  varSet.Business.buslogo;

        }
        if($scope.editLogo){
            $scope.isLogoSet = true;

        }
        if(varSet.Business_Image && varSet.Business_Image.length > 0){
            angular.forEach(varSet.Business_Image, function(v, k){
                var glue = bizglobalVars.imagesFolder + bizglobalVars.bID + "/" + v.name;
                $scope.rawImageName.push(v.name);
                $scope.editModeImages.push({path : glue, id : v.image_id});

            });
        }
    }


$scope.bizdupCheck=function(TempTitle){
var Writen_title = TempTitle == undefined ? "" : TempTitle;

if(bizglobalVars.editMode == false && Writen_title.length > 3) {

//alert($scope.businessID);


formLoader.AddBiztitleCheck(Writen_title,$scope.businessID).then(function(data){


if(parseInt(data.data) === 0 ){
$state.go("menuView.addBusiness.step2");
}
else{
 androidServices.showToast("Business Title already exits.......... ");

}

						});

//$state.go("menuView.addBusiness.step2");

}

else if(bizglobalVars.editMode == true && Writen_title.length > 3){


formLoader.EditBiztitleCheck(Writen_title,$scope.businessID).then(function(data){

if(parseInt(data.data) === 0 ){
$state.go("menuView.addBusiness.step2");
}
else{
 androidServices.showToast("Business Title already exits.......... ");

}

						});

}

else{

$state.go("menuView.addBusiness.step2");

}



};


    //--------------------------Gets all form data serially (total of 3)-------------------
    formLoader.getCats()
        .then(function(data){
            $scope.catListLocal = data;
            $scope.progress = 50;
			formLoader.getCities()
				.then(function(){
					$scope.progress = 75;
					formLoader.getGoverns()
						.then(function(){
							$scope.progress = 100;
                            $rootScope.miniLoader = false;
							$scope.isFormReady = true;
							formChange();
                            $scope.loadComplete = true;
						});
				});
		});
    //------------------------------------State change prevention-----------------------------
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        if($rootScope.mapModal === true){
            event.preventDefault();
            $rootScope.mapModal = false;
        }
        previousStateName = fromState.name;
        if( fromState.name === 'menuView.addBusiness.step6' && toState.name === 'menuView.addBusiness.step5' ||
            fromState.name === 'menuView.addBusiness.step6' && toState.name === 'menuView.addBusiness.step4' ||
            fromState.name === 'menuView.addBusiness.step6' && toState.name === 'menuView.addBusiness.step3' ||
            fromState.name === 'menuView.addBusiness.step6' && toState.name === 'menuView.addBusiness.step2' ||
            fromState.name === 'menuView.addBusiness.step6' && toState.name === 'menuView.addBusiness.step1' ||
            fromState.name === 'menuView.myListings' && toState.name === 'menuView.addBusiness.step10' ||
            fromState.name === 'menuView.myListings' && toState.name === 'menuView.addBusiness.step6') {
                event.preventDefault();
        }
        if(toState.name === 'menuView.addBusiness.step2'){
            triggerSave = true;
        }
    });
        //EMERGENCY SAVE FUNCTION
    $scope.$on('$destroy', function(){
        if(triggerSave == true){
            $scope.emergencySave = true;
            $scope.uploadTo();
        }
    });
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        hasPageChanged = true;
        curPage = toState.name;
        if(curPage == 'menuView.addBusiness.step2' && $scope.progress < 100){
            $rootScope.miniLoader = true;
        }
        evalAllData();
    });
    $scope.execGlobalFormCheck = function(){
        if(curPage === 'menuView.addBusiness.step1'){

        }
    };
    //=------------------------------------toll free number validation----------

    $scope.checkingtollvalid=function(event){
   var tollnumtext=$(event.currentTarget).val();
   var tollen=tollnumtext.length;

    if(tollen == 4 || tollen == 5 || tollen == 6 || tollen > 7){

    $(event.currentTarget).css('border','1px solid red');
    }

    else{

     $(event.currentTarget).css('border','1px solid gray');

    }


    };
//validation for empty numbers if having more extra input field

$scope.validationformore=function(txt,event){

if(event.keyCode==8){

}
};

    //------------------------------------Force inject form for edit mode---------------------------
    function searchStringInArray (str, strArray) {
        for (var j=0; j<strArray.length; j++) {
            if (strArray[j].match(str)) return j;
        }
        return -1;
    }
    function evalAllData(){
        if(bizglobalVars.editMode){
            //Push all data into total data set
            //Step 1
            if(runOnce === false){
                runOnce = true;
                if(varSet.Business){
                    businessData[0].formFieldTitle = varSet.Business.title
                    businessData[0].formFieldText = varSet.Business.description
                    sessionStorage.BizTitle=varSet.Business.title

                }
                //Step 2
                if(varSet.BusinessCategory){
                    angular.forEach(varSet.BusinessCategory, function(v, k){
                        if(businessData[1].indexOf(parseInt(v.category_id)) == -1){
                            businessData[1].push(parseInt(v.category_id));
                        }
                    });
                }
                //Step 3
                if(varSet.Business){
                    businessData[2].formFieldSite = varSet.Business.url.trim();
                    businessData[2].formFieldLline= varSet.Business.land_line_no.trim();
                    businessData[2].formFieldEmail= varSet.Business.email.trim();
                    businessData[2].formFieldEmailextra = varSet.Business.more_email.trim();
                    businessData[2].formFieldFB = varSet.Business.facebook_link.trim();
                    businessData[2].formFieldFax = varSet.Business.fax_no.trim();
                    businessData[2].formFieldFaxextra = varSet.Business.more_fax.trim();
                    businessData[2].formFieldGPlus = varSet.Business.google_plus_link.trim();
                    businessData[2].formFieldInsta = varSet.Business.instagram_link.trim();
                    businessData[2].formFieldLinked = varSet.Business.linkedin_link.trim();
                    businessData[2].formFieldMob = varSet.Business.mobile_no.trim();
                    businessData[2].formFieldMobextra = varSet.Business.more_contacts.trim();
                    businessData[2].formFieldToll = varSet.Business.toll_free_no.trim();
                    businessData[2].formFieldTollextra = varSet.Business.more_tollfree.trim();
                    businessData[2].formFieldTwit = varSet.Business.twitter_link.trim();
                    businessData[2].formFieldYoutube = varSet.Business.you_tube_link.trim();
                }
                //Step 4
                if(varSet.Address){
                    businessData[3].address  = varSet.Address.address;
                    businessData[3].lat = varSet.Address.lat;
                    businessData[3].long = varSet.Address.lng;
                    businessData[3].governorate = varSet.Address.governorate_id;
                    businessData[3].city = varSet.Address.city_id;
                }
                //Step 5
                if(varSet.Category_Keyword_Selected){
                    angular.forEach(varSet.Category_Keyword_Selected, function(v, k){
                        if(businessData[4].indexOf(v.id) == -1){
                            businessData[4].push(parseInt(v.id));
                        }
                    });
                }
                if(varSet.Business_Keyword_Added){
                    angular.forEach(varSet.Business_Keyword_Added, function(v, k){
                        if(searchStringInArray(v.name ,businessData[5]) == -1){
                            businessData[5].push(v.name);
                        }
                    });
                }
                $scope.bData = businessData;
            }
            $scope.primaryEditMode = true;
            if(hasPageChanged !== true){
                addressEdit = true;
                $scope.insertMode = [
                    {insertAllow : true},   //Form 1
                    {insertAllow : true},   //Form 2
                    {insertAllow : true},   //Form 3
                    {insertAllow : true},   //Form 4
                    {insertAllow : true}];  //Form 5
            }
            //--------------------------------------Form 1 insert - edit---------------------
            if($scope.insertMode[0].insertAllow === true && varSet.Business){
                    $scope.setTitle = businessData[0].formFieldTitle = varSet.Business.title;
                    sessionStorage.BizTitle=varSet.Business.title;
                    $scope.setDescription = businessData[0].formFieldText = varSet.Business.description;
                    //disable insert init
                    $scope.insertMode[0].insertAllow = false;

            }
            else{
                $scope.setTitle = businessData[0].formFieldTitle;
                sessionStorage.BizTitle=varSet.Business.title;
                $scope.setDescription = businessData[0].formFieldText;

            }
            //-------------------------------------Form 2 insert - edit----------------------
            if($scope.insertMode[1].insertAllow === true && varSet.BusinessCategory){
                $scope.editMode = true;
                var cidWorkerLocale = [];
                var cnameWorkerLocale = [];
                var cidWorker = varSet.BusinessCategory;
                    angular.forEach(cidWorker, function(v, k){
                        if(cidWorkerLocale.indexOf(v.category_id) == -1){
                            cidWorkerLocale.push(parseInt(v.category_id));
                            cnameWorkerLocale.push(v.category_name);
                        }
                    });
                    $scope.cidArray = cidWorkerLocale;
                    $scope.cnameArray = cnameWorkerLocale;
                //disable insert init
                $scope.insertMode[1].insertAllow = false;
            }
            //-------------------------------------Form 3 insert - edit-----------------------
            if(curPage == 'menuView.addBusiness.step3'){
                if($scope.insertMode[2].insertAllow === true && varSet.Business){
                    $scope.setURL       = businessData[2].formFieldSite = varSet.Business.url;
                    $scope.setLline     = businessData[2].formFieldLline= varSet.Business.land_line_no;
                    $scope.setEmail     = businessData[2].formFieldEmail= varSet.Business.email;
                    $scope.setEmailExtra= businessData[2].formFieldEmailextra = varSet.Business.more_email;
                    $scope.setFB        = businessData[2].formFieldFB = varSet.Business.facebook_link;
                    $scope.setFax       = businessData[2].formFieldFax = varSet.Business.fax_no;
                    $scope.setFaxExtra  = businessData[2].formFieldFaxextra = varSet.Business.more_fax;
                    $scope.setGPlus     = businessData[2].formFieldGPlus = varSet.Business.google_plus_link;
                    $scope.setInsta     = businessData[2].formFieldInsta = varSet.Business.instagram_link;
                    $scope.setLinked    = businessData[2].formFieldLinked = varSet.Business.linkedin_link;
                    $scope.setMob       = businessData[2].formFieldMob = varSet.Business.mobile_no;
                    $scope.setMobextra  = businessData[2].formFieldMobextra = varSet.Business.more_contacts;
                    $scope.setToll      = businessData[2].formFieldToll = varSet.Business.toll_free_no;
                    $scope.setTollextra = businessData[2].formFieldTollextra = varSet.Business.more_tollfree;
                    $scope.setTwit      = businessData[2].formFieldTwit = varSet.Business.twitter_link;
                    $scope.setYoutube   = businessData[2].formFieldYoutube = varSet.Business.you_tube_link;
                    //disable insert init
                    $scope.insertMode[2].insertAllow = false;
                }
                else{
                    $scope.setURL       = businessData[2].formFieldSite.trim();
                    $scope.setLline     = businessData[2].formFieldLline.trim();
                    $scope.setEmail     = businessData[2].formFieldEmail.trim();
                    $scope.setEmailExtra= businessData[2].formFieldEmailextra.trim();
                    $scope.setFB        = businessData[2].formFieldFB.trim();
                    $scope.setFax       = businessData[2].formFieldFax.trim();
                    $scope.setFaxExtra  = businessData[2].formFieldFaxextra.trim();
                    $scope.setGPlus     = businessData[2].formFieldGPlus.trim();
                    $scope.setInsta     = businessData[2].formFieldInsta.trim();
                    $scope.setLinked    = businessData[2].formFieldLinked.trim();
                    $scope.setMob       = businessData[2].formFieldMob.trim();
                    $scope.setMobextra  = businessData[2].formFieldMobextra.trim();
                    $scope.setToll      = businessData[2].formFieldToll.trim();
                    $scope.setTollextra = businessData[2].formFieldTollextra.trim();
                    $scope.setTwit      = businessData[2].formFieldTwit.trim();
                    $scope.setYoutube   = businessData[2].formFieldYoutube.trim();
                }
            }
            //----------------Form 4 edit (Partial, search 'Partial form 4' for the rest)---------------
            if(curPage == 'menuView.addBusiness.step4'){
                if(addressEdit && varSet.Address){
                    $scope.setAddress  = businessData[3].address  = varSet.Address.address;
                    $scope.setLat      = businessData[3].lat = varSet.Address.lat;
                    $scope.setLng      = businessData[3].long = varSet.Address.lng;
                }
            }
            if(curPage == 'menuView.addBusiness.step5'){
            }
        }
        else {
            $scope.setTitle = businessData[0].formFieldTitle;
            $scope.setDescription = businessData[0].formFieldText;
            $scope.setURL       = businessData[2].formFieldSite;
            $scope.setLline     = businessData[2].formFieldLline;
            $scope.setEmail     = businessData[2].formFieldEmail;
            $scope.setEmailExtra= businessData[2].formFieldEmailextra;
            $scope.setFB        = businessData[2].formFieldFB;
            $scope.setFax       = businessData[2].formFieldFax;
            $scope.setFaxExtra  = businessData[2].formFieldFaxextra;
            $scope.setGPlus     = businessData[2].formFieldGPlus;
            $scope.setInsta     = businessData[2].formFieldInsta;
            $scope.setLinked    = businessData[2].formFieldLinked;
            $scope.setMob       = businessData[2].formFieldMob;
            $scope.setMobextra  = businessData[2].formFieldMobextra;
            $scope.setToll      = businessData[2].formFieldToll;
            $scope.setTollextra = businessData[2].formFieldTollextra;
            $scope.setTwit      = businessData[2].formFieldTwit;
            $scope.setYoutube   = businessData[2].formFieldYoutube;
            $scope.setData.governorate   = businessData[3].governorate;
            $scope.setData.setCity     = businessData[3].city;
            $scope.setAddress  = businessData[3].address;
            $scope.setLat      = businessData[3].lat;
            $scope.setLng      = businessData[3].long;
            sessionStorage.BizTitle=businessData[0].formFieldTitle;
        }
    }
	$scope.checkIndex = function(catid){
        if($scope.cidArray.indexOf(parseInt(catid)) >= 0){
            $scope.checkCat['id_'+catid] = true;
            return true;
        }
        else{
            $scope.checkCat['id_'+catid] = false;
            return false;
        }
    };
    $scope.cancel = function() {
        $scope.statusModal = false;
        $scope.confirmDelModal = false;
    };
    $scope.checkinArray = function(id, arr){
    };
    //Event handler for when ng-repeat ends on gov or city
   $scope.$on('ngRepeatGovFinished', function(ngRepeatFinishedEvent) {
       if(addressEdit && varSet.Address){
            $scope.setData.governorate   = businessData[3].governorate = varSet.Address.governorate_id;
       }
       else{
           $scope.setData.governorate   = businessData[3].governorate;
       }
   });
    $scope.$on('ngRepeatCityFinished', function(ngRepeatFinishedEvent) {
        if(addressEdit && varSet.Address){
            $scope.setData.city  = businessData[3].city = varSet.Address.city_id;
            addressEdit = false;
        }
        else{
            $scope.setData.city  = businessData[3].city;
        }
    });
    $scope.limitRelease = function(params){

        if(params == 'key')
            $scope.keyLimiter +=20;
        else{
            $scope.catlistLimit += 20;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    $scope.resetLimits = function(){
        $scope.catlistLimit = 20;
    };

      window.addEventListener('native.keyboardshow', function(){
        $("#catsearch_ID").focus();

         });


        window.addEventListener('native.keyboardhide', function(){
    $("#catsearch_ID").blur();
     });


    //formLoader.getEditData();
	function formChange(){									//Sets category list json from local storage to view

		$scope.categoryList = $scope.catListLocal.data;
        angular.forEach($scope.categoryList, function(v,k){
            if($scope.cidArray.indexOf(parseInt(v.id)) != -1){
                $scope.categoryList[k].checked = 1;
            }
            else
                $scope.categoryList[k].checked = 0;
        });
        $scope.checkedCat = 1;
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
    //-------------------------------Check for gps and send to data aggre-------------------------------

    $scope.gofromlocationview=function(){

    $state.go("menuView.addBusiness.step3");
    };

    var twoStepCheck = 1;
    $scope.gpsAndPush = function(data){

        if(!bizglobalVars.haveTrack && twoStepCheck === 1){
            alert('Location is mandatory, Your current location will be set by default');
        }
        else{
            //Check for lat , longs present in data , if present p
            if(data.lat != 0 && data.long.length != 0){
                $scope.getData(data, 3);
            }
            else{
                if(varSet && varSet.Address.lat && varSet.Address.lat.length && varSet.Address.lng && varSet.Address.lng.length){
                   data.lat = varSet.Address.lat;
                    data.long = varSet.Address.lng;
                    $scope.getData(data, 3);
                }
            }
            if(bizglobalVars.isPremium==true){
            $state.go('menuView.addBusiness.step7');
            }
            else{
            $state.go('menuView.addBusiness.step5');
            }

        }
        if(twoStepCheck === 2){
            if(data.lat.length > 0 && data.long.length > 0){
                $scope.getData(data, 3);
            }
            else{
                if(varSet && varSet.Address.lat && varSet.Address.lat.length && varSet.Address.lng && varSet.Address.lng.length){
                   data.lat = varSet.Address.lat;
                    data.long = varSet.Address.lng;
                    $scope.getData(data, 3);
                }
            }
           if(bizglobalVars.isPremium==true){
                       $state.go('menuView.addBusiness.step7');
                       }
                       else{
                       $state.go('menuView.addBusiness.step5');
                       }
        }
    };
    //--------------------------------------------Business form data aggregation------------------------
    $scope.getData = function(bData, num){


       if(bData === undefined){
            businessData[num] = "";
        }
        else{
            businessData[num] = bData;
        }
        $scope.businessData = businessData;

//        if(num == 2){
//
//        $state.go("menuView.addBusiness.step4");
//        }
        if($rootScope.$viewHistory.currentView.stateName=="menuView.addBusiness.step3" && num == 2 ){


        var Step3_data=$scope.businessData[2];

        var temp_site= Step3_data.formFieldSite==undefined?"":Step3_data.formFieldSite;

        var positon_of_url=temp_site.toLowerCase().indexOf("www.");
       if( Step3_data.formFieldMob !=undefined && Step3_data.formFieldMob.length == 0 &&Step3_data.formFieldMobextra !=undefined && Step3_data.formFieldMobextra.length > 0){
          androidServices.showToast("Primary Number shouldn't be empty , please enter.... ");
           return ;
           }
           else if(Step3_data.formFieldFax !=undefined && Step3_data.formFieldFax.length == 0 && Step3_data.formFieldFaxextra !=undefined && Step3_data.formFieldFaxextra.length > 0){
              androidServices.showToast("Primary Number should not empty , please enter.... ");
               return ;
               }
              else if(Step3_data.formFieldToll !=undefined && Step3_data.formFieldToll.length == 0 && Step3_data.formFieldTollextra !=undefined && Step3_data.formFieldTollextra.length > 0){
                androidServices.showToast("Primary Number shouldn't be empty , please enter.... ");
                   return ;
                    }
                     else if(Step3_data.formFieldEmail !=undefined && Step3_data.formFieldEmail.length == 0 && Step3_data.formFieldEmailextra !=undefined && Step3_data.formFieldEmailextra.length > 0){
                                   androidServices.showToast("Primary Number shouldn't be empty , please enter.... ");
                                       return ;
                                        }
                         else if(Step3_data.formFieldSite !=undefined && Step3_data.formFieldSite.length > 0 && positon_of_url == -1 ){

                         androidServices.showToast("Enter correct URL. Your enter url not valid");
                          return ;
                          }
                            else{
                             $state.go("menuView.addBusiness.step4");
                               }


        }

    };

    $ionicPlatform.onHardwareBackButton(function(event){
//($rootScope.$viewHistory.backView.stateName);
$state.go($rootScope.$viewHistory.backView.stateName);
       },100);


    //-----------------------------Keywords on click populating function-------------------
    $scope.postToMylist = function(item,name){

    item = parseInt(item);
        if($scope.mykeywordList.indexOf(item) == -1){
            $scope.mykeywordList.push(item);
        }
        else{
            if(preLoadedList.length > 0 && preLoadedList.indexOf(item) != -1){
                preLoadedList.splice(preLoadedList.indexOf(item), 1);
            }
            $scope.mykeywordList.splice($scope.mykeywordList.indexOf(item), 1);
        }
         analytics.trackEvent('ADD Business Events','Click on keyword list item','Add this '+ name +'keyword to Business',100);

    };
    //---------------------------Keyword initialization ng-checked function----------------
    $scope.setCheck = function(id){
        key = parseInt(id);
        $scope.KeyChecked=0;
        if($scope.filteridList && $scope.filteridList.indexOf(key) != -1){
        $scope.KeyChecked=1;
        return true;
        }
        else if($scope.mykeywordList && $scope.mykeywordList.indexOf(key) != -1){
        $scope.KeyChecked =1;
        return true;
        }
        else{
        $scope.KeyChecked=0;
        return false;
            }
    };
    $scope.checkVis = function(id){
      if(bizglobalVars.editMode){
            if($scope.mykeywordList.length != 0){
                if($scope.mykeywordList.indexOf(parseInt(id)) != -1){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
        else{
            return true;
        }
    }
    //----------------------------Finalizing keywords and custom keywords-------------------
    $scope.mixLists = function(){
        $rootScope.miniLoader = true;
        angular.forEach($scope.keylist, function(v, k){
            if(v){
                key = parseInt(k.replace("id_", ""));
                if(preLoadedList.indexOf(key) == -1){
                    preLoadedList.push(key);
                }
            }
        });
        angular.forEach($scope.tagList, function(v, k){
            customList.push(v);
        });

        $scope.getData(preLoadedList, 4);
        $scope.getData(customList, 5);
        //------------------------FINAL STEP : INITIATES UPLOAD-------------------
        $scope.uploadTo();
    };
    $scope.crossCat = function(id){
        if($scope.cidArray && $scope.cidArray.indexOf(parseInt(id)) != -1){
            return true;
        }
        else{
            return false;
        }
    };
    $scope.calcCat = function(id,name){
 analytics.trackEvent('ADD Business Events','Click on select Category list  in step2','Select this '+name+' category to Business',100);
        var setID = $scope.cidArray.indexOf(parseInt(id));
        if(setID != -1){
            $scope.cidArray.splice(setID , 1);
            angular.forEach($scope.categoryList, function(v,k){
                if(v.id == id){
                    $scope.categoryList[k].checked = 0;
                    if($scope.editMode){
                        $scope.deleteSpecs.push(parseInt(id));

                    }
                }
            });
        }
        else{
            $scope.cidArray.push(parseInt(id));
            angular.forEach($scope.categoryList, function(v,k){
                if(v.id == id){
                    $scope.categoryList[k].checked = 1;
                    if($scope.deleteSpecs.length > 0 && $scope.deleteSpecs.indexOf(parseInt(id)) != -1){
                        $scope.deleteSpecs.splice($scope.deleteSpecs.indexOf(parseInt(id)), 1);

                    }
                }
            });
        }
    };
    //Sends data from categories and populates keywords in 'aggregateList' based on recieved data
	$scope.sendData = function(data){
        if($scope.cidArray.length > 0){
            $scope.editMode = true;
            $scope.csvString = $scope.cidArray.join(",");
            $scope.compiledData = $scope.cidArray;
            formLoader.sendCategories($scope.csvString).then(function(data){
            //alert('d');

                $scope.aggregateList = [];
                $scope.TempPreDefineTags=[];

                angular.forEach(data.data, function(v, k){
                    if(v.keyword_name && v.keyword_id){

                        $scope.temp_list.push({"Name" : v.keyword_name, "ID" : v.keyword_id});


                    }
                });


                 $scope.aggregateList =$scope.EditTagsArray.concat($scope.temp_list);
                    angular.forEach($scope.aggregateList, function(v, k){
                     $scope.temp_tag_namesArr.push(v.Name.toLowerCase());
                    });

                $scope.TempPreDefineTags=TagArrayUnique($scope.temp_tag_namesArr);


            });
            if($scope.deleteSpecs.length > 0 && preLoadedList.length > 0){
                formLoader.sendCategories($scope.deleteSpecs.join(",")).then(function(data){
                    angular.forEach(data.data, function(v, k){
                        var x = parseInt(v.keyword_id);
                        var y = preLoadedList.indexOf(x);
                        if(y != -1){

                            preLoadedList.splice(y, 1);

                        }
                    });
                });
            }
        }
        if($scope.compiledData.length !== 0){
            $scope.getData($scope.compiledData, 1);
            $state.go('menuView.addBusiness.step3');
        }
		else{
                $scope.authMessage = 'Please choose atleast one Category';
                $scope.authCheck = 1;
                $timeout(function() {
                    $scope.authCheck = 0;
                }, 3000);
        }
	};
    //Uploader split
    $scope.bData = businessData;
    $scope.deleteCat = function(index){
  		$scope.tagList.splice(index,1);
  		 analytics.trackEvent('ADD Business Events','Click on Cross icon(custom keywords)','Remove selected keyword from list',100);
	   };
    $scope.deleteList = function(index){
        $scope.aggregateList.splice(index,1);
    };
    $scope.statusMsg = "";
    $scope.modalFlag = true;
    $scope.gpsActivity = null;
    $scope.showGPSAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Geo-Location disabled',
            template: 'Please check your GPS and/or turn it on'
        });
    };

    $scope.openMap = function(){							//Opens the Google Maps modal

      $rootScope.miniLoader = true;
        $("body").prepend('<input id="pac-input" class="controls" type="text" placeholder="Search Box" style="left:120px !important;" min="4" />');
        runGPS();
        analytics.trackEvent('ADD Business Events','Click on location icon','open map view for add location',100);

        };
        var watchID = null;
        function runGPS(){
        if(bizglobalVars.editMode){
        globalVars.Add_Biz_edit_status=true;
        }
        else{
        globalVars.Add_Biz_edit_status=false;
        globalVars.Add_Biz_deviceLat=0;
        globalVars.Add_Biz_deviceLng=0;
        }

        /*=================================================================*/
        $scope.gpsActivity = [];

        var options = {
                enableHighAccuracy: true,
                timeout: 3000,
                maximumAge: 0,
                desiredAccuracy: 0,
                frequency: 1
                };
//alert(globalVars.Add_Biz_edit_status);

       watchID=navigator.geolocation.getCurrentPosition/*watchPosition*/(function(position) {
        //alert('d');
        $rootScope.miniLoader = false;
       // alert(position.coords.latitude);
        if(position){
        $rootScope.mapModal = true;
        $scope.latlngdone = true
        $scope.$apply(function(){
        $scope.gpsActivity = position;
        $rootScope.ADDLocation_Data = position;
        });
        $rootScope.ADDLocation_Data = position;
        globalVars.deviceLat = position.coords.latitude;
        globalVars.deviceLng = position.coords.longitude;
        globalVars.ADD_Location =position;
        if(parseInt(globalVars.Add_Biz_deviceLat) == 0 && parseInt(globalVars.Add_Biz_deviceLng) == 0 ){
        globalVars.Add_Biz_deviceLat = position.coords.latitude;
        globalVars.Add_Biz_deviceLng =  position.coords.longitude;
        }
        else{}
        }
        ;
        },
        function(err){
        $rootScope.mapModal = true;
        $scope.statusModal = true;

        globalVars.Add_Biz_deviceLat = 29.3667;
        globalVars.Add_Biz_deviceLng = 47.9667;
        $scope.latlngdone = true;
        },options);
        //$rootScope.mapModal = true;
        //$scope.latlngdone = true;
        }
        function clearWatch() {
                if (watchID != null) {
                    navigator.geolocation.clearWatch(watchID);
                    watchID = null;
                }
            }
            clearWatch();
	$scope.acceptCoords = function(){
		$rootScope.mapModal = false;
	};
    // Opens logo / images photo modal

	$scope.openPhotoModal = function(parameter){
        if(parameter == 1){
            $scope.getLogo = true;
        }
        else{
           $scope.getLogo = false;
        }
		$scope.photoPopOver.show();
		analytics.trackEvent('ADD Business Events','Click on image','open a pop view with choose from camera/gallery ',100);

	};
	$scope.commitChanges = function(){
		$scope.picList.push($scope.imageList);
		$scope.photoModal = false;
	};
    //Confirm modal defaults
    $scope.currentDeleteIndex = null;
    $scope.confirmDelModal = false;
    $scope.confirmMsg = '';
    $scope.curImgID = null;
    //Model for saving logo image for upload
    $scope.cleanLogo = '';
    //-------------------------------------------Delete image function----------------------------------------

    $scope.initiateDelete = function(index, id){
     analytics.trackEvent('ADD Business Events','Click on Cross icon ','Delete seleted image from list',100);
        $scope.currentDeleteIndex = index;
        $scope.confirmMsg = $scope.rawImageName[index];
        $scope.curImgID = id;
        var confirmPopup = $ionicPopup.confirm({
            title: 'confirm delete',
            template: 'Are you sure you want to delete ' + $scope.confirmMsg + '?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $rootScope.miniLoader = true;
                formLoader.deleteImage(bizglobalVars.bID, $scope.curImgID).then(function(data){
                    if($scope.editModeImages.length > 0){
                        $scope.editModeImages.splice($scope.currentDeleteIndex, 1);
                        $rootScope.miniLoader = false;
                    }
                }, function(err){
                    $rootScope.miniLoader = false;
                    androidServices.showToast('there was an issue deleting the image due to ' + err);
                });
            }
        });
    };
    //mybizImages
    $scope.initiateLocalDelete = function(index){
       analytics.trackEvent('ADD Business Events','Click on Cross icon ','Delete seleted image from list',100);

        $scope.mybizImages.splice(index, 1);
    }
    $scope.initiateLogoDelete = function(){
        $scope.currentDeleteIndex = 202;    //Random logo delete number, has no meaning (seriously)
        $scope.confirmMsg = "the Logo";
        analytics.trackEvent('ADD Business Events','Click on Cross icon ','Delete seleted image from list',100);
    };
    $scope.confirmDelete = function(){
        if($scope.currentDeleteIndex == 202){
        }
    };

    //-------------------------------------Listing delete function---------------------------

    $scope.clickSource = function(sourceType){
        if(sourceType == 2){
        analytics.trackEvent('ADD Business Events','Click on from gallery','Choose image from gallery',100);
            navigator.camera.getPicture(onPicSuccess, onPicFail,
                {
                                /*   quality: 100,
                                   allowEdit: false,
                                   targetWidth: 320, //what widht you want after capaturing
                                   targetHeight: 200,*/
                  destinationType: Camera.DestinationType.DATA_URL,
                  sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                });
        }
        else {
        analytics.trackEvent('ADD Business Events','Click on from gallery','take image from camera',100);
            navigator.camera.getPicture(onPicSuccess, onPicFail,
                {
                 /*quality: 100,
                                     allowEdit: false,
                                     targetWidth: 320, //what widht you want after capaturing
                                     targetHeight: 200,*/
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    correctOrientation : false
                });
        }
    };
    function onPicSuccess(dataPath){
            if($scope.getLogo === true){
                $scope.cleanLogo = dataPath;
                $scope.editLogo = 'data:image/jpeg;base64,' + dataPath;
                $scope.photoPopOver.hide();
            }
            else{
                $scope.mybizImages.push(dataPath);
                $scope.photoPopOver.hide();
            }
    }
    function onPicFail(msg){
    }
    $scope.backfromstep6=function(){
   $state.go($rootScope.$viewHistory.backView.stateName);
    };
    $scope.uploadInit = function(){
        $rootScope.miniLoader = true;
        if($scope.cleanLogo.length > 0){


            formLoader.sendAllImages($scope.businessID, $scope.cleanLogo, $scope.mybizImages,sessionStorage.BizTitle).then(function(data){
                $rootScope.miniLoader = false;

               // androidServices.showToast("Business uploaded successfully");
                if(bizglobalVars.isPremium === true){
                   // $state.go('menuView.addBusiness.step7');
                    androidServices.showToast("Business images uploaded successfully");
                   $state.go('menuView.addBusiness.step10');
                }
                else{
                globalVars.Add_Biz_deviceLat = 0;
                globalVars.Add_Biz_deviceLng = 0;
                 androidServices.showToast("Business and Business images uploaded successfully");
                    $state.go('menuView.profile.myListings');
                }
            });
        }
        else{

            formLoader.sendAllImages($scope.businessID, '', $scope.mybizImages,sessionStorage.BizTitle).then(function(data){
                $rootScope.miniLoader = false;
                if(bizglobalVars.isPremium === true){
                androidServices.showToast("Business images uploaded successfully");
                                 //  $state.go('menuView.addBusiness.step10')
                    $state.go('menuView.addBusiness.step10');
                }
                else{
                 androidServices.showToast("Business and Business images uploaded successfully");

                    $state.go('menuView.profile.myListings');
                }
            });
        }
    };

    //PHOTO UPLOAD ENDS HERE

    $scope.uploadTo = function(){
        triggerSave = false;
        //INIT : initializing array for POST data
        var uloadList = [];
        uloadList["business"] = [];
        uloadList["business"]["userID"] = [];
        uloadList["business"]["is24by7"]=[];
        uloadList["business"]["name"] = [];
        uloadList["business"]["desc"] = [];
        uloadList["business"]["categories"] = [];
        uloadList["business"]["url"] = [];
        uloadList["business"]["contactno"] = [];
        uloadList["business"]["fax"] = [];
        uloadList["business"]["landline"] = [];
        uloadList["business"]["mobile"] = [];
        uloadList["business"]["email"] = [];
        uloadList["business"]["governorate"] = [];
        uloadList["business"]["city"] = [];
        uloadList["business"]["address"] = [];
        uloadList["business"]["lat"] = [];
        uloadList["business"]["long"] = [];
        uloadList["business"]["sel_keywords"] = [];
        uloadList["business"]["custom_keywords"] = [];
        var userKey = globalVars.userInfo.id;
        uloadList["business"]["userID"] = userKey;
        uloadList["business"]["is24by7"]=sessionStorage.isalways==false?0:1;
   //     alert("id"+sessionStorage.isalways);
        angular.forEach($scope.bData, function(v, k){
            switch (k) {
                case 0:
                    uloadList["business"]["name"] = v.formFieldTitle;
                    uloadList["business"]["desc"] = v.formFieldText;
                    break;
                case 1:
                    uloadList["business"]["categories"] = v;
                    break;
                case 2:
                    uloadList["business"]['contact'] = {
                        url             : v.formFieldSite,
                        tollfreeno       : v.formFieldToll,
                        tollfreenomore   : v.formFieldTollextra,
                        email           : v.formFieldEmail,
                        emailmore       : v.formFieldEmailextra,
                        landlineno      : v.formFieldLline,
                        fax             : v.formFieldFax,
                        faxmore         : v.formFieldFaxextra,
                        mobile          : v.formFieldMob,
                        contactnomore      : v.formFieldMobextra,
                        facebook        : v.formFieldFB, twitter : v.formFieldTwit, googleplus : v.formFieldGPlus, instagram : v.formFieldInsta, youtube : v.formFieldYoutube, linkedin : v.formFieldLinked};
                    break;
                case 3:
                    uloadList["business"]['location'] ={governorate : v.governorate, city : v.city, address : v.address, lat : v.lat, long : v.long};
                    break;
                case 4:
                    uloadList["business"]["sel_keywords"] = v;
                    break;
                case 5:
                    uloadList["business"]["custom_keywords"] = v;
                    break;
                case 6:
                    break;
            }
        });
        if(bizglobalVars.editMode){
            formLoader.updateAll(uloadList, bizglobalVars.bID).then(function(data){
                $rootScope.miniLoader = false;
                if($scope.isPremium === false){
                 //   bizglobalVars.flushEditData();
                }
                if($scope.emergencySave == false){

                if(bizglobalVars.isPremium==true){
                                       $state.go('menuView.addBusiness.step8.prodlist');
                                       }
                                       else{
                                       //$state.go('menuView.addBusiness.step6');
                                       $state.go('menuView.addBusiness.step7');
                                       }

                   // $state.go('menuView.addBusiness.step6');
                }
            });
        }
        else{
            formLoader.sendAll(uloadList).then(function(data){
               $rootScope.miniLoader = false;
                $scope.businessID = data.data.business_id;
                bizglobalVars.currentBID = data.data.business_id;
                $rootScope.myListings_present = true;
               if($scope.emergencySave == false){

                 if(bizglobalVars.isPremium==true){
                                                       $state.go('menuView.addBusiness.step8.prodlist');
                                                       }
                                                       else{
                                                     //  $state.go('menuView.addBusiness.step6');
                                                     $state.go('menuView.addBusiness.step7');
                                                       }
                   // $state.go('menuView.addBusiness.step6');
                }
            });
        }
    }

    $scope.CustomKeyDuplicateCheck=function(tag,event){ //duplicate check ing
    if($scope.tagList.length > 0){
     if ($.inArray(tag,$scope.tagList)!= '-1' ) {
    // $(event.currentTarget).css('border','1px solid red');
    $(event.currentTarget).addClass('ng-dirty ng-invalid ng-invalid-pattern');
     }
     else{
     $(event.currentTarget).removeClass('ng-dirty ng-invalid ng-invalid-pattern');
     }

    }


    }
    $scope.addTag = function(tag,event){
     if(tag != undefined  && tag !=""){ // enter if condition
       if($scope.TempPreDefineTags.length > 0){ // enter if condition
       if ($.inArray(tag.toLowerCase(),$scope.TempPreDefineTags)!= '-1' ) {
       //setCheck
       angular.forEach($scope.aggregateList,function(v,k){

       if(v.Name.toLowerCase() == tag.toLowerCase()){
     $scope.setCheck(v.ID);
     $scope.postToMylist(v.ID,v.Name);
      if(bizglobalVars.editMode){
     // $scope.checkVis(v.ID);

      if ($.inArray(parseInt(v.ID),$scope.mykeywordList)!= '-1' ) {$scope.mykeywordList.slice(parseInt(v.ID));}
           else{$scope.mykeywordList.push(parseInt(v.ID));}

      }
//alert($("#Tags"+v.ID).is(':checked'));
   $("#Tags"+v.ID).prop('checked',true);
//      if($("#Tags"+v.ID).is(':checked')){
//
//      $("#Tags"+v.ID).prop('checked',false);
//      }
//      else{
//
//      $("#Tags"+v.ID).prop('checked',true);
//      }

     if ($.inArray(parseInt(v.ID),preLoadedList)!= '-1' ) {preLoadedList.slice(parseInt(v.ID));}
     else{preLoadedList.push(parseInt(v.ID));}
     }
     });


//       $cordovaDialogs.alert(tag + ' is in the  Search keywords  , select from Business keyWords/tags in above ','Custom Keywords', 'Close')
//           .then(function() {
//             // callback success
//           });
       }
       else {
     //  alert(tag + ' is NOT in the array...');
       $scope.tagList.push(tag);
       }
       }
       else{
       $scope.tagList.push(tag);
       }
       $scope.$emit('parentCleaner');
       $scope.newTag = "";
       }
       analytics.trackEvent('ADD Business Events','Click on Plus icon(custom keyword)','Add this '+tag+' keyword  to business',100);
       }
  //--------------------------------Premium add ons----------------------------------



  //Template for photo modal
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
  //Sets auth to free listing mode

  $scope.toPremiumZone = function(){
      $state.go('menuView.addBusiness.step7');
  };


 $scope.getItemHeight = function() {
    var halfScreenWidth = screen.width / 2.0;
    return halfScreenWidth * 1.35;
  };


  //Clean up broadcast listeners
  $scope.$on('$destroy', function() {
      cleanThisUp();
      if($scope.isPremium === false){
          bizglobalVars.flushEditData();
      }
  });

  /*====add business next click event for first six steps (in clck add analytics code)======*/

  $scope.analyticcodeforAddsteps=function(step,type){
       switch (step){
       case 1 :
       analytics.trackEvent('ADD Business Events','Click on next button in step1','Save and Navigate to  Add Business Category  view',100);
       analytics.trackView('Add Business Category view');
       break;
       case 2 :
       analytics.trackEvent('ADD Business Events','Click on next button in step2','Save and Navigate to Add Business Contact information view',100);
              analytics.trackView('Add Business Contact Information view');
       break;
       case 3 :
       analytics.trackEvent('ADD Business Events','Click on next button in step3','Save and Navigate to Add Business Location Information view',100);
              analytics.trackView('Add Business Location Information view');
       break;
       case 4 :
       analytics.trackEvent('ADD Business Events','Click on next button in step4','Save and Navigate to Add Business Keywords view',100);
              analytics.trackView('Add Business Keywords view');
       break;
       case 5:
       analytics.trackEvent('ADD Business Events','Click on next button in step5','Save and Navigate to Add Business Working Hours view',100);
              analytics.trackView('Add Business Working Hours view');
       break;
       case 6:
       if(type == 'f'){
       analytics.trackEvent('ADD Business Events','Click on Finsih button in step6','Save your business in kuwatlocal ',100);
        }
        else{
        analytics.trackEvent('ADD Business Events','Click on next button in step6','Save and Navigate to Add Business video view',100);

        }
       break;
       }
     };
$scope.BackanalyticcodeforAddsteps=function(step,type){
       switch (step){
       case 2 :
       analytics.trackEvent('ADD Business Events','Click on Back button in step2','Back to  Add Business Category  view',100);
       analytics.trackView('Add Business Title and Detail view');
       break;
       case 3 :
       analytics.trackEvent('ADD Business Events','Click on Back button in step3','Back to Add Business Contact information view',100);
              analytics.trackView('Add Business Category view');
       break;
       case 4 :
       analytics.trackEvent('ADD Business Events','Click on Back button in step4','Back to Add Business Location Information view',100);
              analytics.trackView('Add Business Contact Information view');
       break;
       case 5 :
       analytics.trackEvent('ADD Business Events','Click on Back button in step5','BAck to Add Business Keywords view',100);
              analytics.trackView('Add Business Location Information view');
       break;
       case 6:
       analytics.trackEvent('ADD Business Events','Click on Back button in step6','Back to Add Business Working Hours view',100);
              analytics.trackView('Add Business Keywords view');
       break;
       case 7:
        analytics.trackEvent('ADD Business Events','Click on Back button in step7','Back to Add Business video view',100);
        analytics.trackView('Add Business Keywords view');

       break;
       case 10:
       analytics.trackEvent('ADD Business Events','Click on Back button in step10','Back to Add Business video view',100);
       analytics.trackView('Add Business Workrsing Hours view');
       break;
       }
       };
       $scope.morebuttonclick=function(clickname){
       analytics.trackEvent('ADD Business Events','Click on '+ clickname+'button in step3','Show/hide More enter field',100);
       };

$scope.manualkeyclick=function(){


console.log($("#step_5_contentID"));

setTimeout( function () {
 document.activeElement.blur();
 $("#manual_text_input_id").focus();
  }, 500);



};

$scope.keyboardFocus=function(handleValue){
      $ionicScrollDelegate.$getByHandle(handleValue).scrollTop();
 }

       })
.controller('step5Controller', function($scope, $rootScope){
})
.controller('myListingsController', function($scope, $ionicPlatform, $ionicViewService,$state,globalVars,bizglobalVars,$rootScope, fetchListing,formLoader, $ionicPopup){
 analytics.trackView($rootScope.$viewHistory.currentView.stateName);
  $scope.actionList = [];
  $scope.allLists = [];
  $scope.searchComplete = false;
//  $ionicPlatform.onHardwareBackButton(function(e){
//
//   $state.go("menuView.profile.home");
//
//    });



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
            $state.go('menuView.addBusiness.step1');
        });
    };

    // ---------------------------------------Delete Listing function--------------------------
    $scope.deleteListingName = '';
    $scope.deleteListingId = null;

    $scope.showConfirm = function(id, title) {
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
})
.controller('paymentController', function(bizglobalVars, globalVars, formLoader, $state, $scope, $rootScope, androidServices){
 analytics.trackView('Add Business Main view');
    $scope.premiumData = {};
    $scope.setFreeListing = function(){
        bizglobalVars.isPremium = false;
        analytics.trackEvent('ADD Business Events','Click on free listing button','if logged in Navigate to Add Business (step1) otherwise navigate to login view  ',100);
         if(globalVars.userInfo.id == undefined){
             globalVars.loginstatus="notlogged";
             globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
               $state.go('loginView');
             }
            else{

        $state.go('menuView.addBusiness.step1');
        }
    };
    $scope.gotoPremiumStart = function(){
     analytics.trackEvent('ADD Business Events','Click on free listing button','if logged in Navigate to Add Business (step1) otherwise navigate to login view  ',100);

      if(globalVars.userInfo.id == undefined){
     globalVars.loginstatus="notlogged";
     globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;

    $state.go('loginView');
     }
    else{
        $state.go("menuView.payment");
        }
    };
    $scope.validateCoupon = function(){
       formLoader.validateCoupon($scope.premiumData).then(function(data){
            if(data.data.business_id){
                $scope.sendToEdit(data.data.business_id, 1);
            }
            else{

                androidServices.showToast("invalid Coupon");
            }
        });
    };
    // --------------------------- Send to forms for editing current business ----------------
    $scope.sendToEdit = function(businessID, premiumFlag){
       if(parseInt(premiumFlag) === 1){
            bizglobalVars.isPremium = true;
        }
        else{
            bizglobalVars.isPremium = false;
        }
        bizglobalVars.setEditMode(businessID, true);
        formLoader.getEditData(businessID).then(function(data){
              $rootScope.loaderModal = false;
            bizglobalVars.bizData = data;
            $state.go('menuView.addBusiness.step1');
        });
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
})
.controller('workingHoursController', function(globalVars, bizglobalVars, $state, $scope, $rootScope, formLoader, androidServices){
analytics.trackView('Add Business Working Hours view');
   $scope.$on('$viewContentLoaded', function(){
   $rootScope.miniLoader = true;
    $scope.showSunExtra = 0;
    $scope.generatedHours = [];
    $scope.generatedMins = [];
    $scope.editDateData = {};
    $scope.editDateData=bizglobalVars.bizData.length == 0 && bizglobalVars.editMode == false ? {} : bizglobalVars.bizData.data.working_hours;
    $scope.checkingPremium = bizglobalVars.isPremium;
    $scope.checkboxModel = {
     always_open : false,
     };
      globalVars.is24by7=$scope.checkboxModel.always_open;
       for(var i = 0; i<=23; i++){
        if(i <= 9){
            $scope.generatedHours.push("0" + i);
        }
        else{
            $scope.generatedHours.push(i);
        }
    }

     for(var i = 0; i<=59; i++){

     $rootScope.miniLoader = false;
            if(i <= 9){
                $scope.generatedMins.push("0" + i);
            }
            else{
                $scope.generatedMins.push(i);
            }
        }


    if(bizglobalVars.editMode){

//$rootScope.miniLoader = false;
    $scope.checkboxModel.always_open=parseInt(bizglobalVars.bizData.data.Business.is24by7)==1?true:false;
    sessionStorage.is_tempcheck=$scope.checkboxModel.always_open==false?'validate':'nonvalidate';
$("#hourscheckbox_id").prop('checked',  $scope.checkboxModel.always_open);




      if(typeof(bizglobalVars.bizData.data.working_hours) == 'object'){

      }
      else{
          $scope.editDateData = {};
      }
    }
//    else{
//    $rootScope.miniLoader = false;
//    }
    function invertVariable(variableValue){
      variableValue = parseInt(variableValue) == 1 ? false : true;
      return variableValue;
    }
function dualinvertVariable(variableValue){
                                 variableValue = parseInt(variableValue) == 0? false : true;
                                 return variableValue;
                               }

    function splitTime(user_time, returnType){
    if(user_time){
         var pieces = user_time.split(':'), hour, minute, second;
           if(pieces.length === 3) {
                hour = parseInt(pieces[0], 10);
                minute = parseInt(pieces[1], 10);
                second = parseInt(pieces[2], 10);
                 }
            if(returnType === 'hh'){
           return hour;
            }
            if(returnType === 'mm'){
                return minute;
            }
            if(returnType === 'ss'){
                return second;
            }
            else{
              return '00'
            }
        }
        else{
         return '00';
        }
    }
    $scope.hourData = [

        {
            is_dual_timing : ($scope.editDateData[0]) ? dualinvertVariable(parseInt($scope.editDateData[0].is_dual_timing)) : 0,
            is_closed      : ($scope.editDateData[0]) ? invertVariable($scope.editDateData[0].is_closed) : 0,
            day            : 0,
            from           : {
                hour : ($scope.editDateData[0]) ? splitTime($scope.editDateData[0].from, 'hh') :'00',
                min  : ($scope.editDateData[0]) ? splitTime($scope.editDateData[0].from, 'mm') :'00'
            },
            to             :{
                hour : ($scope.editDateData[0]) ? splitTime($scope.editDateData[0].to, 'hh') :'00',
                min  : ($scope.editDateData[0]) ? splitTime($scope.editDateData[0].to, 'mm') :'00'
            },
            from1          :{
                hour : ($scope.editDateData[0]) ? splitTime($scope.editDateData[0].from1, 'hh') :'00',
                min  : ($scope.editDateData[0]) ? splitTime($scope.editDateData[0].from1, 'mm') :'00'
            },
            to1            :{
                hour : ($scope.editDateData[0]) ? splitTime($scope.editDateData[0].to1, 'hh') :'00',
                min  : ($scope.editDateData[0]) ? splitTime($scope.editDateData[0].to1, 'mm') :'00'
            }
        },
        {
            is_dual_timing : ($scope.editDateData[1]) ? dualinvertVariable(parseInt($scope.editDateData[1].is_dual_timing)) : 0,
            is_closed      : ($scope.editDateData[1]) ? invertVariable($scope.editDateData[1].is_closed) : 0,
            day            : 1,
            from           : {
                hour : ($scope.editDateData[1]) ? splitTime($scope.editDateData[1].from, 'hh') :'00',
                min  : ($scope.editDateData[1]) ? splitTime($scope.editDateData[1].from, 'mm') :'00'
            },
            to             :{
                hour : ($scope.editDateData[1]) ? splitTime($scope.editDateData[1].to, 'hh') :'00',
                min  : ($scope.editDateData[1]) ? splitTime($scope.editDateData[1].to, 'mm') :'00'
            },
            from1          :{
                hour : ($scope.editDateData[1]) ? splitTime($scope.editDateData[1].from1, 'hh') :'00',
                min  : ($scope.editDateData[1]) ? splitTime($scope.editDateData[1].from1, 'mm') :'00'
            },
            to1            :{
                hour : ($scope.editDateData[1]) ? splitTime($scope.editDateData[1].to1, 'hh') :'00',
                min  : ($scope.editDateData[1]) ? splitTime($scope.editDateData[1].to1, 'mm') :'00'
            }
        },
        {
            is_dual_timing : ($scope.editDateData[2]) ? dualinvertVariable(parseInt($scope.editDateData[2].is_dual_timing)) : 0,
            is_closed      : ($scope.editDateData[2]) ? invertVariable($scope.editDateData[2].is_closed) : 0,
            day            : 2,
            from           : {
                hour : ($scope.editDateData[2]) ? splitTime($scope.editDateData[2].from, 'hh') :'00',
                min  : ($scope.editDateData[2]) ? splitTime($scope.editDateData[2].from, 'mm') :'00'
            },
            to             :{
                hour : ($scope.editDateData[2]) ? splitTime($scope.editDateData[2].to, 'hh') :'00',
                min  : ($scope.editDateData[2]) ? splitTime($scope.editDateData[2].to, 'mm') :'00'
            },
            from1          :{
                hour : ($scope.editDateData[2]) ? splitTime($scope.editDateData[2].from1, 'hh') :'00',
                min  : ($scope.editDateData[2]) ? splitTime($scope.editDateData[2].from1, 'mm') :'00'
            },
            to1            :{
                hour : ($scope.editDateData[2]) ? splitTime($scope.editDateData[2].to1, 'hh') :'00',
                min  : ($scope.editDateData[2]) ? splitTime($scope.editDateData[2].to1, 'mm') :'00'
            }
        },
        {
            is_dual_timing : ($scope.editDateData[3]) ? dualinvertVariable(parseInt($scope.editDateData[3].is_dual_timing)) : 0,
            is_closed      : ($scope.editDateData[3]) ? invertVariable($scope.editDateData[3].is_closed) : 0,
            day            : 3,
            from           : {
                hour : ($scope.editDateData[3]) ? splitTime($scope.editDateData[3].from, 'hh') :'00',
                min  : ($scope.editDateData[3]) ? splitTime($scope.editDateData[3].from, 'mm') :'00'
            },
            to             :{
                hour : ($scope.editDateData[3]) ? splitTime($scope.editDateData[3].to, 'hh') :'00',
                min  : ($scope.editDateData[3]) ? splitTime($scope.editDateData[3].to, 'mm') :'00'
            },
            from1          :{
                hour : ($scope.editDateData[3]) ? splitTime($scope.editDateData[3].from1, 'hh') :'00',
                min  : ($scope.editDateData[3]) ? splitTime($scope.editDateData[3].from1, 'mm') :'00'
            },
            to1            :{
                hour : ($scope.editDateData[3]) ? splitTime($scope.editDateData[3].to1, 'hh') :'00',
                min  : ($scope.editDateData[3]) ? splitTime($scope.editDateData[3].to1, 'mm') :'00'
            }
        },
        {
            is_dual_timing : ($scope.editDateData[4]) ? dualinvertVariable(parseInt($scope.editDateData[4].is_dual_timing)) : 0,
            is_closed      : ($scope.editDateData[4]) ? invertVariable($scope.editDateData[4].is_closed) : 0,
            day            : 4,
            from           : {
                hour : ($scope.editDateData[4]) ? splitTime($scope.editDateData[4].from, 'hh') :'00',
                min  : ($scope.editDateData[4]) ? splitTime($scope.editDateData[4].from, 'mm') :'00'
            },
            to             :{
                hour : ($scope.editDateData[4]) ? splitTime($scope.editDateData[4].to, 'hh') :'00',
                min  : ($scope.editDateData[4]) ? splitTime($scope.editDateData[4].to, 'mm') :'00'
            },
            from1          :{
                hour : ($scope.editDateData[4]) ? splitTime($scope.editDateData[4].from1, 'hh') :'00',
                min  : ($scope.editDateData[4]) ? splitTime($scope.editDateData[4].from1, 'mm') :'00'
            },
            to1            :{
                hour : ($scope.editDateData[4]) ? splitTime($scope.editDateData[4].to1, 'hh') :'00',
                min  : ($scope.editDateData[4]) ? splitTime($scope.editDateData[4].to1, 'mm') :'00'
            }
        },
        {
            is_dual_timing : ($scope.editDateData[5]) ? dualinvertVariable(parseInt($scope.editDateData[5].is_dual_timing)) : 0,
            is_closed      : ($scope.editDateData[5]) ? invertVariable($scope.editDateData[5].is_closed) : 0,
            day            : 5,
            from           : {
                hour : ($scope.editDateData[5]) ? splitTime($scope.editDateData[5].from, 'hh') :'00',
                min  : ($scope.editDateData[5]) ? splitTime($scope.editDateData[5].from, 'mm') :'00'
            },
            to             :{
                hour : ($scope.editDateData[5]) ? splitTime($scope.editDateData[5].to, 'hh') :'00',
                min  : ($scope.editDateData[5]) ? splitTime($scope.editDateData[5].to, 'mm') :'00'
            },
            from1          :{
                hour : ($scope.editDateData[5]) ? splitTime($scope.editDateData[5].from1, 'hh') :'00',
                min  : ($scope.editDateData[5]) ? splitTime($scope.editDateData[5].from1, 'mm') :'00'
            },
            to1            :{
                hour : ($scope.editDateData[5]) ? splitTime($scope.editDateData[5].to1, 'hh') :'00',
                min  : ($scope.editDateData[5]) ? splitTime($scope.editDateData[5].to1, 'mm') :'00'
            }
        },
        {
            is_dual_timing : ($scope.editDateData[6]) ? dualinvertVariable(parseInt($scope.editDateData[6].is_dual_timing)) : 0,
            is_closed      : ($scope.editDateData[6]) ? invertVariable($scope.editDateData[6].is_closed) : 0,
            day            : 6,
            from           : {
                hour : ($scope.editDateData[6]) ? splitTime($scope.editDateData[6].from, 'hh') :'00',
                min  : ($scope.editDateData[6]) ? splitTime($scope.editDateData[6].from, 'mm') :'00'
            },
            to             :{
                hour : ($scope.editDateData[6]) ? splitTime($scope.editDateData[6].to, 'hh') :'00',
                min  : ($scope.editDateData[6]) ? splitTime($scope.editDateData[6].to, 'mm') :'00'
            },
            from1          :{
                hour : ($scope.editDateData[6]) ? splitTime($scope.editDateData[6].from1, 'hh') :'00',
                min  : ($scope.editDateData[6]) ? splitTime($scope.editDateData[6].from1, 'mm') :'00'
            },
            to1            :{
                hour : ($scope.editDateData[6]) ? splitTime($scope.editDateData[6].to1, 'hh') :'00',
                min  : ($scope.editDateData[6]) ? splitTime($scope.editDateData[6].to1, 'mm') :'00'
            }
        }

    ];

  //dual timings close reset entries
    $scope.$watchCollection('hourData[0].is_dual_timing', function() {
        if($scope.hourData[0].is_dual_timing == false){
            resetSecondaryTimings(0);
        }
    });
    $scope.$watchCollection('hourData[1].is_dual_timing', function() {
        if($scope.hourData[1].is_dual_timing == false){
            resetSecondaryTimings(1);
        }
    });
    $scope.$watchCollection('hourData[2].is_dual_timing', function() {
        if($scope.hourData[2].is_dual_timing == false){
            resetSecondaryTimings(2);
        }
    });
    $scope.$watchCollection('hourData[3].is_dual_timing', function() {
        if($scope.hourData[3].is_dual_timing == false){
            resetSecondaryTimings(3);
        }
    });
    $scope.$watchCollection('hourData[4].is_dual_timing', function() {
        if($scope.hourData[4].is_dual_timing == false){
            resetSecondaryTimings(4);
        }
    });
    $scope.$watchCollection('hourData[5].is_dual_timing', function() {
        if($scope.hourData[5].is_dual_timing == false){
            resetSecondaryTimings(5);
        }
    });
    $scope.$watchCollection('hourData[6].is_dual_timing', function() {
        if($scope.hourData[6].is_dual_timing == false){
            resetSecondaryTimings(6);
        }
    });
    //Full close reset entries
    $scope.$watchCollection('hourData[0].is_closed', function() {
        if($scope.hourData[0].is_closed == false){
            resetBothTimings(0);
        }
    });
    $scope.$watchCollection('hourData[1].is_closed', function() {
        if($scope.hourData[1].is_closed == false){
            resetBothTimings(1);
        }
    });
    $scope.$watchCollection('hourData[2].is_closed', function() {
        if($scope.hourData[2].is_closed == false){
            resetBothTimings(2);
        }
    });
    $scope.$watchCollection('hourData[3].is_closed', function() {
        if($scope.hourData[3].is_closed == false){
            resetBothTimings(3);
        }
    });
    $scope.$watchCollection('hourData[4].is_closed', function() {
        if($scope.hourData[4].is_closed == false){
            resetBothTimings(4);
        }
    });
    $scope.$watchCollection('hourData[5].is_closed', function() {
        if($scope.hourData[5].is_closed == false){
            resetBothTimings(5);
        }
    });
    $scope.$watchCollection('hourData[6].is_closed', function() {
        if($scope.hourData[6].is_closed == false){
            resetBothTimings(6);
        }
    });
    function resetSecondaryTimings(position){
        $scope.hourData[position].from1.hour = $scope.hourData[position].from1.min = $scope.hourData[position].to1.hour = $scope.hourData[position].to1.min = '00';
    }
    function resetBothTimings(position){
        $scope.hourData[position].from1.hour = $scope.hourData[position].from1.min = $scope.hourData[position].to1.hour = $scope.hourData[position].to1.min = '00';
        $scope.hourData[position].from.hour = $scope.hourData[position].from.min = $scope.hourData[position].to.hour = $scope.hourData[position].to.min = '00';
        $scope.hourData[position].is_dual_timing = false;
    }
sessionStorage.is_tempcheck=$scope.checkboxModel.always_open==false?'validate':'nonvalidate';

    $scope.alwayschange=function(event){
   // alert("d");

    sessionStorage.temp_checkeventfortwobtseven=$scope.checkboxModel.always_open;
    sessionStorage.is_tempcheck=$scope.checkboxModel.always_open==false?'validate':'nonvalidate';

    $scope.hourData[0].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;
    $scope.hourData[1].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;
    $scope.hourData[2].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;
    $scope.hourData[3].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;
    $scope.hourData[4].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;
    $scope.hourData[5].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;
    $scope.hourData[6].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;

   $scope.hourData[0].is_dual_timing = false;

     $scope.hourData[1].is_dual_timing = false;

      $scope.hourData[2].is_dual_timing =false;

       $scope.hourData[3].is_dual_timing =false;

        $scope.hourData[4].is_dual_timing =false;

         $scope.hourData[5].is_dual_timing=false;
          $scope.hourData[6].is_dual_timing = false;

          $scope.hourData[0].from.hour= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[0].from.hour;
           $scope.hourData[1].from.hour= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[1].from.hour;
            $scope.hourData[2].from.hour= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[2].from.hour;
             $scope.hourData[3].from.hour= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[3].from.hour;
              $scope.hourData[4].from.hour= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[4].from.hour;
               $scope.hourData[5].from.hour=$scope.checkboxModel.always_open ==true ? "0":$scope.hourData[5].from.hour;
            $scope.hourData[6].from.hour=$scope.checkboxModel.always_open ==true ? "0":$scope.hourData[6].from.hour;


          $scope.hourData[0].from.min= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[0].from.min;
           $scope.hourData[1].from.min= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[1].from.min;
            $scope.hourData[2].from.min= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[2].from.min;
             $scope.hourData[3].from.min= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[3].from.min;
              $scope.hourData[4].from.min= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[4].from.min;
               $scope.hourData[5].from.min=$scope.checkboxModel.always_open ==true ? "0":$scope.hourData[5].from.min;
            $scope.hourData[6].from.min=$scope.checkboxModel.always_open ==true ? "0":$scope.hourData[6].from.min;

$scope.hourData[0].to.hour= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[0].to.hour;
           $scope.hourData[1].to.hour= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[1].to.hour;
            $scope.hourData[2].to.hour= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[2].to.hour;
             $scope.hourData[3].to.hour= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[3].to.hour;
              $scope.hourData[4].to.hour= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[4].to.hour;
               $scope.hourData[5].to.hour=$scope.checkboxModel.always_open ==true ? "0":$scope.hourData[5].to.hour;
            $scope.hourData[6].to.hour=$scope.checkboxModel.always_open ==true ? "0":$scope.hourData[6].to.hour;


          $scope.hourData[0].to.min= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[0].to.min;
           $scope.hourData[1].to.min= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[1].to.min;
            $scope.hourData[2].to.min= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[2].to.min;
             $scope.hourData[3].to.min= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[3].to.min;
              $scope.hourData[4].to.min= $scope.checkboxModel.always_open ==true ? "0":$scope.hourData[4].to.min;
               $scope.hourData[5].to.min=$scope.checkboxModel.always_open ==true ? "0":$scope.hourData[5].to.min;
            $scope.hourData[6].to.min=$scope.checkboxModel.always_open ==true ? "0":$scope.hourData[6].to.min;



    	};

    	if(bizglobalVars.editMode){

//    	    $scope.hourData[0].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;
//            $scope.hourData[1].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;
//            $scope.hourData[2].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;
//            $scope.hourData[3].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;
//            $scope.hourData[4].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;
//            $scope.hourData[5].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;
//            $scope.hourData[6].is_closed = $scope.checkboxModel.always_open==true ? 1 : 0 ;
//

    	}




    $scope.updateHours = function(){
           $rootScope.miniLoader = true;
           var post_data = [];
   		var Biz_days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

   		sessionStorage.bizhours_validate="nonvalidate";
   		sessionStorage.isalways=$scope.checkboxModel.always_open;
   		var is_always_open=sessionStorage.isalways==false ? 0 : 1;
           angular.copy($scope.hourData, post_data);
           angular.forEach(post_data, function(v, k){
               v.is_closed = v.is_closed ? 0 : 1;
               v.is_dual_timing = v.is_dual_timing ? 1 : 0;
   			var From_seconds = ((+v.from.hour)* 60 * 60 + (+v.from.min) * 60);
   			var To_seconds = ((+v.to.hour)* 60 * 60 + (+v.to.min) * 60);
   			var From1_seconds = ((+v.from1.hour)* 60 * 60 + (+v.from1.min) * 60);
   			var To1_seconds = ((+v.to1.hour)* 60 * 60 + (+v.to1.min) * 60);

   			if(v.is_closed == 0){
   			if(From_seconds >= To_seconds){
   			sessionStorage.bizhours_validate="validate";

   			//break;
   			}
   			else if(v.is_dual_timing == 1 && From1_seconds >= To1_seconds){
   			sessionStorage.bizhours_validate="validate";
   		//break;
   			}
   			else if(v.is_dual_timing == 1 && (From1_seconds <= To_seconds)){
   			sessionStorage.bizhours_validate="validate";
   		//break;
   			}
   			else{
   			//sessionStorage.bizhours_validate="validate";
   			//break;
   			}
   			}
   			else{
   			//sessionStorage.bizhours_validate="nonvalidate";
   			//break;
   			}

           });


   		//sessionStorage.is_tempcheck==undefined?"validate":sessionStorage.is_tempcheck;

	//return;
   		 var final_temp=""
   		if(sessionStorage.bizhours_validate =="validate" && sessionStorage.is_tempcheck =="validate"){
   		final_temp="validate";
   		}

   		else{
   		final_temp="nonvalidate";

   		}

   		if(final_temp == "validate"){

//	alert("Check the Business working hours times  , times start time less than end time and second start time is greater than first end time ");
androidServices.showToast("Start time should always be lesser than end time, Please recheck your Timings and update again ");
             $rootScope.miniLoader = false;

               }

   		else{

   		$rootScope.miniLoader = true;
   		formLoader.insertWorkingHrs(bizglobalVars.currentBID,$scope.checkboxModel.always_open,post_data).then(function(response){
               $rootScope.miniLoader = false;
   			if(response.data.Success_Flag === 'Success'){
   			 //androidServices.showToast("Working Hours updated successfully!");
   			 workingdataupdate($scope.checkingPremium);
   			 if($scope.checkingPremium === true){
                   $state.go('menuView.addBusiness.step5');
                   }

                   else{
                  // bizglobalVars.flushEditData();
                    $state.go('menuView.addBusiness.step6');


                   }
   				}
               else{


                   //androidServices.showToast("Start time should always be lesser than end time, Please recheck your Timings and update again ");
               }
           });
           }

       };

       function workingdataupdate(checkingPremium){

         formLoader.tempworkingdatadata(bizglobalVars.currentBID).then(function(data){
        $rootScope.miniLoader = false;
        if(checkingPremium === true){
                                             bizglobalVars.bizData.data.working_hours=data;
                                             $scope.editDateData==data;
                                              }
                                                else{
                                                // bizglobalVars.flushEditData();
                                                 }
                                                 });
                                                 }
     $scope.backAnalytics=function(step){

     if(step == 4 ){
     analytics.trackEvent('ADD Business Events','Click on Back button(step7)','Back to Add Business Location information view ',100);
     }
     else{
 analytics.trackEvent('ADD Business Events','Click on Back button(step7)','Back to Add Business Keywords  view ',100);
     }


     };
     $scope.AnalyticsNext=function(step){;
           if(step == 4 ){
            analytics.trackEvent('ADD Business Events','Click on Next button(step7)','Save and Navigate  to Add Business Logo  view ',100);
                }
                else{
 analytics.trackEvent('ADD Business Events','Click on Next button(step7)','Save and to navigate Add Business Product view ',100);
                }
                 }



 });
})
.controller('productController', function($scope, $state, formLoader, bizglobalVars, globalVars,$ionicPopup, $rootScope, $ionicPopover, $timeout, androidServices, $cordovaCamera, $cordovaFile, $window, formLoader,$ionicActionSheet,$ionicModal){
 analytics.trackView('ADD Business Product view');
 $scope.Analyticscodestep8=function(text){

 if(text == 'n'){
analytics.trackEvent('ADD Business Events','Click on Next button(product)','Save product in list and navigate to add business services view ',100);
 }
 else{
analytics.trackEvent('ADD Business Events','Click on Back button(product)',' back to add business working hours view ',100);

 }


 };
    $scope.product = {
    title:"",
    amount:""
    };

    $scope.productList = [];
    $scope.currentPicPath = '';
    $scope.actionList = [];
    $scope.allLists = [];
    $scope.isEditing = false;
    $scope.addproductform=true;
    $scope.editIndex = null;
    $scope.editTitleVal = '';
    $scope.editPriceVal = '';
    $scope.editproductList = [];
    $scope.editImageData = '';
    $scope.btnText = 'add';
     var static_img_url = globalVars.MainklURl+"img/ProductLogo/logo_folder/";
      $scope.showdeleteConfirm = function(id, index) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'confirm delete',
            template: 'Are you sure you want to delete this product ?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                formLoader.productDelete(id).then(function(data){
                    if(data.data === 'Success'){
                        $scope.editproductList.splice(index, 1);
                    }
                })
            }
        });
    };
    if(bizglobalVars.editMode){
        $scope.editMode     = true;
        if(typeof(bizglobalVars.bizData.data.products) == 'object'){
       var temp_data = bizglobalVars.bizData.data.products;
           angular.forEach(temp_data, function(v, k){
             $scope.actionList.push("false");
                  });
                      $scope.editproductList=temp_data;
                       resetActionList();
                         }
                            else{
                              $scope.productList = [];
                                 }
                                  }

    $scope.addStuff = function(){
      $state.go('menuView.addBusiness.step8.addprod');
    };
    $scope.checkSvc = function(){

    };
    //--------Edit button controls-------------
    $scope.setActive = function(index){
        angular.forEach($scope.actionList, function(v, k){

            if(k == index){
                $scope.actionList[k] = true;
            }
            else
                $scope.actionList[k] = false;
        });
    }
    $scope.resetActions = function(){
        resetActionList();
    }
    function resetActionList(){
        angular.forEach($scope.actionList, function(v, k){
            $scope.actionList[k] = false;
        });
        $timeout(function(){
            $scope.$apply();
        },100);
    }
    //--------\Edit button controls-------------
//    $scope.$on('formIsValid', function(e, name){
//        if(name === 'default'){
//            $scope.defaultFormValid = true;
//        }
//    });
//    $scope.$on('formIsNotValid', function(e, name){
//        if(name === 'default'){
//            $scope.defaultFormValid = false;
//        }
//    });
    //Template for photo modal
    var photoprodModalTemplate = '<ion-popover-view class="loading_box gallery_box">' +
                                     '<div class="galleryList group margin_b_20 align_center font_roboto font_color_blue">'+
                                          '<div class="action_panel" ng-model="myPicture" ng-click="clickProdSource(1)">' +
                                            '<p>From Camera</p>' +
                                            '<span class="icon ion-camera"></span>' +
                                          '</div>' +
                                          '<div class="action_panel" ng-click="clickProdSource(2)">' +
                                            '<span class="icon ion-images"></span>' +
                                            '<p>From Gallery</p>' +
                                          '</div>' +
                             '</ion-popover-view>';
    //Function call for photo pop over instantiation
    $scope.baseImg = '';
    $scope.photoProdPopOver = $ionicPopover.fromTemplate(photoprodModalTemplate, {
      scope: $scope
    });
    $scope.toggleProdPhotoModal = function(){
        $scope.photoProdPopOver.show();
        analytics.trackEvent('ADD Business Events','Click on image','open a pop view with choose from camera/gallery ',100);

    }
    $scope.clickProdSource = function(sourceType){
        var galleryOptions = {
                         /* quality: 100,
                          allowEdit: false,
                          targetWidth: 320, //what widht you want after capaturing
                          targetHeight: 200,*/
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        }
        var cameraOptions = {
                        /* quality: 100,
                          allowEdit: false,
                          targetWidth: 320, //what widht you want after capaturing
                          targetHeight: 200,*/
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            correctOrientation : false
        }
        if(sourceType == 2){
        analytics.trackEvent('ADD Business Events','Click on from gallery','Choose image from gallery',100);
            $cordovaCamera.getPicture(galleryOptions).then(function(imageData) {
            $scope.currentPicPath = imageData;
                $scope.baseImg = 'data:image/jpeg;base64,' + imageData;
                 $scope.photoProdPopOver.hide();
                 androidServices.showToast('Image upload success');
            }, function(err) {
                androidServices.showToast('there was an issue with image, Please try again');
            });
          }
        else {
        analytics.trackEvent('ADD Business Events','Click on from gallery','take image from camera',100);

            $cordovaCamera.getPicture(cameraOptions).then(function(imageData) {

              $scope.currentPicPath = imageData;
                $scope.baseImg = 'data:image/jpeg;base64,' + imageData;
                 $scope.photoProdPopOver.hide();
                 androidServices.showToast('Image upload success');
            }, function(err) {
                androidServices.showToast('there was an issue with image, Please try again');
            });
        }
    };
    //Function to flush edit settings
    $scope.clearStatuses = function(){
        $scope.editIndex = null;
        $scope.isEditing = false;
        $scope.btnText = 'add';
        $scope.currentPicPath= '';
        $scope.product.title = '';
        $scope.product.amount = '';
        $rootScope.$emit('axedForm');
        $state.go('menuView.addBusiness.step8.prodlist');
    };



    $scope.addProduct = function(){
     analytics.trackEvent('ADD Business Events','Click on Add product','Save product in  business product list',100);

       var setStateChange = false;
          if($scope.btnText === 'save'){
              $scope.productList[$scope.editIndex].title = $scope.product.title;
              $scope.productList[$scope.editIndex].price = $scope.product.amount;
              $scope.productList[$scope.editIndex].image = $scope.currentPicPath;
              //androidServices.showToast('Product edited successfully');
              $scope.editIndex = null;
              $scope.isEditing = false;
              $scope.btnText = 'add';
              setStateChange = true;
          }
          else{
              $scope.productList.push({'title' : $scope.product.title, 'amount' : $scope.product.amount, 'image' : $scope.currentPicPath});
              $scope.actionList.push('false');
              //androidServices.showToast('Product added successfully');
          }
 productaddingandview();
 $scope.currentPicPath= '';
  $scope.product.title = undefined;
   $scope.product.amount = undefined;

////     $rootScope.$emit('axedForm');
// //  $scope.defaultForm.$setPristine();
//          if(setStateChange === true){
//              $state.go('menuView.addBusiness.step8.prodlist');
//          }



    };
    $scope.deleteProduct = function(index){
       $scope.productList.splice(index, 1);
    };
    $scope.editProduct = function(index){
        $scope.isEditing = true;
        $scope.editIndex = index;
        $scope.btnText = 'save';
        $state.go('menuView.addBusiness.step8.addprod');
    };

$scope.master={};

    function productaddingandview(){
    $scope.duplicatechecktxt="right";
          $rootScope.miniLoader = true;
          //POST service gets and posts data here

          $scope.productList[0].title = $scope.productList[0].title==undefined?"":$scope.productList[0].title;
           $scope.productList[0].amount = $scope.productList[0].amount==undefined?"":$scope.productList[0].amount;

          if($scope.productList[0].title !="" &&  $scope.productList[0].amount !=""){


            formLoader.insertProductList(bizglobalVars.currentBID, $scope.productList).then(function(data){
           $rootScope.miniLoader = false;
            $scope.productList=[];
            // $(".addbusiness_form input[type='text'].ng-dirty.ng-invalid,  .addbusiness_form input[type='number'].ng-dirty.ng-invalid").css('border-color','black');

              /// $scope.product = angular.copy($scope.master);
              if(parseInt(data.data)==1){
              androidServices.showToast('Producct adding failed , given product title is alreadt exits');
              }
              else{
                androidServices.showToast('Producct added , Add another product');
                 formLoader.tempProductscall(bizglobalVars.currentBID).then(function(data){
                            bizglobalVars.bizData.data.products=data;
                              angular.forEach(data, function(v, k){
                                             //v.image = static_img_url + v.image;
                                            $scope.actionList.push("false");
                                        });
                                        $scope.editproductList=data;
                             });
                             }
               //tempProductscall

                //androidServices.showToast('Product list updated successfully!');
               // $state.go('menuView.addBusiness.step9.servicelist');
            }), function(err){
                $rootScope.miniLoader = false;
                androidServices.showToast('There was an error posting the information, Please try again');
            };
            }
            else{
          //  $(".addbusiness_form input[type='text'].ng-dirty.ng-invalid,  .addbusiness_form input[type='number'].ng-dirty.ng-invalid").css('border-color','red');
             $rootScope.miniLoader = false;
              $scope.productList=[];
              //$(".validationproduct_cls").css('border-color','black !important');
            androidServices.showToast("Enter title and price are required");

            }
        }



   $scope.submitProduct = function(){
   $state.go('menuView.addBusiness.step9.servicelist');
//      $rootScope.miniLoader = true;
//      //POST service gets and posts data here
//
//        formLoader.insertProductList(bizglobalVars.currentBID, $scope.productList).then(function(data){
//            $rootScope.miniLoader = false;
//
//            //androidServices.showToast('Product list updated successfully!');
//            $state.go('menuView.addBusiness.step9.servicelist');
//        }), function(err){
//            $rootScope.miniLoader = false;
//            androidServices.showToast('There was an error posting the information, Please try again');
//        };
    }

    window.addEventListener('native.keyboardshow', function(){
     $(".product_footercls").hide();
     // $(".blogd_cls").hide();
     // $(".blog_keyboardtxt_cls").css('position','related','bottom','35px');
      });


    window.addEventListener('native.keyboardhide', function(){
 $(".product_footercls").show();
      //$(".blogd_cls").show();
     /* $(".blog_keyboardshowhide_cls").show();
      $(".blog_keyboardtxt_cls").css('position','related','bottom','0px');*/
      });

      //list product action sheet opening
      $scope.productaction=function(data,event){

       $ionicActionSheet.show({
         buttons: [{ text: 'Edit' },{text:'Delete'}],
         titleText: ' Prouduct',
          cancelText: 'Cancel',
             buttonClicked: function(index) {
              //for delete
               if(index==1){
                  var confirmPopup = $ionicPopup.confirm({
                   title: 'confirm delete',
                    template: 'Are you sure you want to delete ' +data.title + '?'
                      });
                      confirmPopup.then(function(res) {
                       if(res) {
                        performproductDelete(data.id);
                         //deleteEachproduct
                          }
                           });
                             return true;
                               }
                                else{
                                 $scope.modal.show();
                                 $scope.editproduct=data;
                                 $scope.currentPicPath=data.image_decode;
                                 $scope.baseImg=data.image;

                                 return true;
                                  }
                                  }
                                   });
                                    };

function performproductDelete(id){
        formLoader.deleteEachproduct(id).then(function(data){

            formLoader.tempProductscall(bizglobalVars.currentBID).then(function(data){

                                         bizglobalVars.bizData.data.products=data;
                                          angular.forEach(data, function(v, k){
                                                         //v.image = static_img_url + v.image;
                                                        $scope.actionList.push("false");
                                                    });
                                                    $scope.editproductList=data;
                                         });
        });
    };


//modal view cretated
     $ionicModal.fromTemplateUrl('productedit.html', {
         scope: $scope,
         animation: 'slide-in-up'
       }).then(function(modal) {
         $scope.modal = modal;
       });

$scope.cityclosemodalview=function(){
      $scope.modal.hide();
      $scope.editproduct={};
      $scope.currentPicPath="";
      $scope.baseImg="";

      };

      $scope.updateEditproduct=function(){
      analytics.trackEvent('ADD Business Events','Click on Update product','update product and close pop viewy',100);
   $scope.editproductList=[];
        $scope.editproductList.push({'title' : $scope.editproduct.title, 'amount' : $scope.editproduct.amount, 'image' : $scope.currentPicPath,'id':$scope.editproduct.id,'oldimage':$scope.editproduct.image_name});
        $scope.actionList.push('false');
        $rootScope.miniLoader = true;
         formLoader.EditProductList(bizglobalVars.currentBID, $scope.editproductList).then(function(data){
           $rootScope.miniLoader = false;
            $scope.editproductList=[];
            if(parseInt(data.data)==1){
                                                androidServices.showToast('Product adding failed , given Product title is alreadt exits');
                                                }
                                                else{
                                                 androidServices.showToast('Product  Updated');
            formLoader.tempProductscall(bizglobalVars.currentBID).then(function(data){
            bizglobalVars.bizData.data.products=data;
                angular.forEach(data, function(v, k){
                  //v.image = static_img_url + v.image;
                   $scope.actionList.push("false");
                    });
                     $scope.editproductList=data;
                      });
                      $scope.modal.hide();
                            $scope.editproduct={};
                            $scope.currentPicPath="";
                            $scope.baseImg="";

                      }
               //tempProductscall

                //androidServices.showToast('Product list updated successfully!');
               // $state.go('menuView.addBusiness.step9.servicelist');
            }), function(err){
                $rootScope.miniLoader = false;
                androidServices.showToast('There was an error posting the information, Please try again');
            };


      };


})
.controller('servicesController', function($scope, $state, formLoader, bizglobalVars,$ionicPopup, globalVars, $rootScope, $ionicPopover, $timeout, androidServices, $cordovaCamera, $cordovaFile, $window,$ionicActionSheet,$ionicModal){
   analytics.trackView('ADD Business services view');
   $scope.Analyticscodestep9=function(text){

   if(text == 'n'){
  analytics.trackEvent('ADD Business Events','Click on Next button(service)','Save services in list and navigate to add business logo view ',100);
   }
   else{
  analytics.trackEvent('ADD Business Events','Click on Back button(service)',' back to add business products view ',100);

   }


   }; $scope.product = {
    title:"",
    amount:""
    };
    $scope.productList = [];
    $scope.currentPicPath = '';
    $scope.actionList = [];
    $scope.allLists = [];
    $scope.isEditing = false;
    $scope.editIndex = null;
    $scope.editTitleVal = '';
    $scope.editPriceVal = '';
    $scope.editImageData = '';
    $scope.btnText = 'add';
    $scope.editproductList = [];
    $scope.baseImg = '';
   // var static_img_url = "http://www.kuwaitlocal.com/img/ServiceLogo/logo_folder/";

   var static_img_url = globalVars.MainklURl+"img/ServiceLogo/logo_folder/";
    $scope.showdeleteConfirm = function(id, index) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'confirm delete',
            template: 'Are you sure you want to delete this service ?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                formLoader.serviceDelete(id).then(function(data){
                    if(data.data === 'Success'){
                        $scope.editproductList.splice(index, 1);
                    }
                })
            }
        });
    };
    if(bizglobalVars.editMode){
        $scope.editMode     = true;
        if(typeof(bizglobalVars.bizData.data.services) == 'object'){
            //$scope.isEditing = true;
            angular.forEach(bizglobalVars.bizData.data.services, function(v, k){
               // v.logo = static_img_url + v.logo;
                $scope.actionList.push("false");
            });
            $scope.editproductList = bizglobalVars.bizData.data.services;
            resetActionList();
        }
        /*if(bizglobalVars.bizData.data.products && typeof(bizglobalVars.bizData.data.products) == 'object'){
        $scope.productList = bizglobalVars.bizData.data.services;
        }*/
        else{
           $scope.productList = [];
        }
    }


    $scope.addStuff = function(){
      $state.go('menuView.addBusiness.step9.addservice');
    }
    $scope.checkSvc = function(){

    }
    //--------Edit button controls-------------
    $scope.setActive = function(index){
        angular.forEach($scope.actionList, function(v, k){
            if(k == index){
                $scope.actionList[k] = true;
            }
            else
                $scope.actionList[k] = false;
        });
    }
    $scope.resetActions = function(){
        resetActionList();
    }
//    function resetActionList(){
//        angular.forEach($scope.actionList, function(v, k){
//            $scope.actionList[k] = false;
//        });
//     //   $scope.$apply();
//    }

 function resetActionList(){
        angular.forEach($scope.actionList, function(v, k){
            $scope.actionList[k] = false;
        });
        $timeout(function(){
            $scope.$apply();
        },100);
    }

    //--------\Edit button controls-------------
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
    //Template for photo modal
    var photoprodModalTemplate = '<ion-popover-view class="loading_box gallery_box">' +
                                     '<div class="galleryList group margin_b_20 align_center font_roboto font_color_blue">'+
                                          '<div class="action_panel" ng-model="myPicture" ng-click="clickProdSource(1)">' +
                                            '<p>From Camera</p>' +
                                            '<span class="icon ion-camera"></span>' +
                                          '</div>' +
                                          '<div class="action_panel" ng-click="clickProdSource(2)">' +
                                            '<span class="icon ion-images"></span>' +
                                            '<p>From Gallery</p>' +
                                          '</div>' +
                             '</ion-popover-view>';
    //Function call for photo pop over instantiation
    $scope.photoProdPopOver = $ionicPopover.fromTemplate(photoprodModalTemplate, {
      scope: $scope
    });
    $scope.toggleProdPhotoModal = function(){
        $scope.photoProdPopOver.show();
        analytics.trackEvent('ADD Business Events','Click on image','open a pop view with choose from camera/gallery ',100);

    }
    $scope.clickProdSource = function(sourceType){
        var galleryOptions = {
                          quality: 60,
                          allowEdit: false,
                          targetWidth: 320, //what widht you want after capaturing
                          targetHeight: 200,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        }
        var cameraOptions = {
                        /*  quality: 100,
                          allowEdit: false,
                          targetWidth: 320, //what widht you want after capaturing
                          targetHeight: 200,*/
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            correctOrientation : false
        }
        if(sourceType == 2){
        analytics.trackEvent('ADD Business Events','Click on from gallery','Choose image from gallery',100);
            $cordovaCamera.getPicture(galleryOptions).then(function(imageData) {
                $scope.currentPicPath = imageData;
                $scope.baseImg = 'data:image/jpeg;base64,' + imageData;
                $scope.photoProdPopOver.hide();
            }, function(err) {
                androidServices.showToast('there was an issue with image, Please try again');
            });
          }
        else {
        analytics.trackEvent('ADD Business Events','Click on from gallery','take image from camera',100);

            $cordovaCamera.getPicture(cameraOptions).then(function(imageData) {
                $scope.currentPicPath = imageData;
                $scope.baseImg = 'data:image/jpeg;base64,' + imageData;
                $scope.photoProdPopOver.hide();
            }, function(err) {
                androidServices.showToast('there was an issue with image, Please try again');
            });
        }
    };
    //Function to flush edit settings
    $scope.clearStatuses = function(){
        $scope.editIndex = null;
        $scope.isEditing = false;
        $scope.btnText = 'add';
        $scope.currentPicPath= '';
        $scope.product.title = '';
        $scope.product.amount = '';
        $rootScope.$emit('axedForm');
    }
    $scope.addProduct = function(){
   analytics.trackEvent('ADD Business Events','Click on Add serice','Save sevice in  business service list',100);
       var setStateChange = false;
          if($scope.btnText === 'save'){
              $scope.productList[$scope.editIndex].title = $scope.product.title;
              $scope.productList[$scope.editIndex].price = $scope.product.amount;
              $scope.productList[$scope.editIndex].image = $scope.currentPicPath;
              //androidServices.showToast('Product edited successfully');
              $scope.editIndex = null;
              $scope.isEditing = false;
              $scope.btnText = 'add';
              setStateChange = true;
          }
          else{
              $scope.productList.push({'title' : $scope.product.title, 'amount' : $scope.product.amount, 'image' : $scope.currentPicPath});
              $scope.actionList.push('false');
              //androidServices.showToast('Product added successfully');
          }
           servicesAddingfun();
              $scope.currentPicPath= '';
              $scope.product.title = undefined;
              $scope.product.amount = undefined;
              $rootScope.$emit('axedForm');



          if(setStateChange === true){
              $state.go('menuView.addBusiness.step9.servicelist');
          }
    };


    function servicesAddingfun(){


          //POST service gets and posts data here

          $scope.productList[0].title = $scope.productList[0].title==undefined?"":$scope.productList[0].title;
           $scope.productList[0].amount = $scope.productList[0].amount==undefined?"":$scope.productList[0].amount;

          if($scope.productList[0].title !="" &&  $scope.productList[0].amount !=""){
          $rootScope.miniLoader = true;
     //POST service gets and posts data here
        formLoader.insertServiceList(bizglobalVars.currentBID, $scope.productList).then(function(data){
            $rootScope.miniLoader = false;
            $scope.productList=[];
          //  $("input").css('border','solid 1px black');
          if(parseInt(data.data)==1){
                        androidServices.showToast('Service adding failed , given service title is alreadt exits');
                        }
                        else{
 androidServices.showToast('service added, Add another service');
            formLoader.tempservicelist(bizglobalVars.currentBID).then(function(data){
                                         bizglobalVars.bizData.data.services=data;
                                          angular.forEach(data, function(v, k){
                                                         //v.image = static_img_url + v.image;
                                                        $scope.actionList.push("false");
                                                    });
            $scope.editproductList=data;
                                         });
                                         }
        }), function(err){
            $rootScope.miniLoader = false;
            androidServices.showToast('There was an error posting the information, Please try again');
        };
    }

    else{

     androidServices.showToast('enter title and price  are required');
    }
    }

    $scope.deleteProduct = function(index){
        $scope.productList.splice(index, 1);
    };
    $scope.editProduct = function(index){
        $scope.isEditing = true;
        $scope.editIndex = index;
        $scope.btnText = 'save';
        $state.go('menuView.addBusiness.step9.addservice');
    };
    $scope.submitService = function(){
    //  $rootScope.miniLoader = true;
      //POST service gets and posts data here

//        formLoader.insertServiceList(bizglobalVars.currentBID, $scope.productList).then(function(data){
//            $rootScope.miniLoader = false;

            //androidServices.showToast('Service list updated successfully!');
           // $state.go('menuView.addBusiness.step10');
            $state.go('menuView.addBusiness.step6')
//        }), function(err){
//            $rootScope.miniLoader = false;
//            androidServices.showToast('There was an error posting the information, Please try again');
//        };
    };

      window.addEventListener('native.keyboardshow', function(){
         $(".service_footercls").hide();
         // $(".blogd_cls").hide();
         // $(".blog_keyboardtxt_cls").css('position','related','bottom','35px');
          });


        window.addEventListener('native.keyboardhide', function(){
     $(".service_footercls").show();
          //$(".blogd_cls").show();
         /* $(".blog_keyboardshowhide_cls").show();
          $(".blog_keyboardtxt_cls").css('position','related','bottom','0px');*/
          });

           //list product action sheet opening
    $scope.serviceaction=function(data,event){

                 $ionicActionSheet.show({
                   buttons: [{ text: 'Edit' },{text:'Delete'}],
                   titleText: ' Service',
                    cancelText: 'Cancel',
                       buttonClicked: function(index) {
                        //for delete
                         if(index==1){
                            var confirmPopup = $ionicPopup.confirm({
                             title: 'confirm delete',
                              template: 'Are you sure you want to delete ' +data.title + '?'
                                });
                                confirmPopup.then(function(res) {
                                 if(res) {
                                  performserviceDelete(data.id);
                                   //deleteEachproduct
                                    }
                                     });
                                       return true;
                                         }
                                          else{
                                           $scope.modal.show();
                                           $scope.editproduct=data;
                                           $scope.currentPicPath=data.image_decode;
                                           $scope.baseImg=data.image;
                                           return true;
                                            }
                                            }
                                             });
                                              };

          function performserviceDelete(id){
                  formLoader.deleteEachservice(id).then(function(data){
                      formLoader.tempservicelist(bizglobalVars.currentBID).then(function(data){
                                                               bizglobalVars.bizData.data.services=data;
                                                                angular.forEach(data, function(v, k){
                                                                               //v.image = static_img_url + v.image;
                                                                              $scope.actionList.push("false");
                                                                          });
                                  $scope.editproductList=data;
                                                               });
                  });
              };

//modal view cretated
     $ionicModal.fromTemplateUrl('serviceedit.html', {
         scope: $scope,
         animation: 'slide-in-up'
       }).then(function(modal) {
         $scope.modal = modal;
       });

$scope.cityclosemodalview=function(){
      $scope.modal.hide();
      $scope.editproduct={};
      $scope.currentPicPath="";
      $scope.baseImg="";

      };

      $scope.updateEditservice=function(){
   //return;
      $scope.editproductList=[];
        $scope.editproductList.push({'title' : $scope.editproduct.title, 'amount' : $scope.editproduct.amount, 'image' : $scope.currentPicPath,'id':$scope.editproduct.id,'oldimage':$scope.editproduct.image_name});
        $scope.actionList.push('false');
         $rootScope.miniLoader = true;
          formLoader.EditServicetList(bizglobalVars.currentBID, $scope.editproductList).then(function(data){
           $rootScope.miniLoader = false;
            $scope.editproductList=[];
            if(parseInt(data.data)==1){
                                    androidServices.showToast('Service adding failed , given service title is alreadt exits');
                                    }
                                    else{
                                     androidServices.showToast('Service Updated');
          formLoader.tempservicelist(bizglobalVars.currentBID).then(function(data){
                                                                         bizglobalVars.bizData.data.services=data;
                                                                          angular.forEach(data, function(v, k){
                                                                                         //v.image = static_img_url + v.image;
                                                                                        $scope.actionList.push("false");
                                                                                    });
                                            $scope.editproductList=data;
                                                                         });
                                 $scope.modal.hide();
                                      $scope.editproduct={};
                                      $scope.currentPicPath="";
                                      $scope.baseImg="";
                                                                         }
               //tempProductscall
                 //androidServices.showToast('Product list updated successfully!');
               // $state.go('menuView.addBusiness.step9.servicelist');
            }), function(err){
                $rootScope.miniLoader = false;
                androidServices.showToast('There was an error posting the information, Please try again');
            };


      };


})
.controller('videourlController', function($scope,$state, formLoader, bizglobalVars, globalVars, $rootScope, $ionicModal ,$ionicPopover, $timeout, androidServices, $cordovaCamera, $cordovaFile, $window,$ionicActionSheet,$ionicPopup,$ionicPlatform){
   analytics.trackView('ADD Business Video view');
   $scope.finalclick=function(type){
   if(type == 'f'){
    analytics.trackEvent('ADD Business Events','Click on finish button(video)','Save video in list and navigate to business list view',100);

   }
   else{
   analytics.trackEvent('ADD Business Events','Click on back button(video)','Back to Add business log view',100);


   }

   };
    $scope.premVideoUrl = {};
    $scope.editMode = false;
    if(bizglobalVars.editMode){
     $scope.editMode= true;
      $scope.videourls=[];
        var bizvideos=[]; // video store array
      /*============Server call for video list  by passing current biz id===========================*/
       formLoader.getVideo(bizglobalVars.currentBID).success(function(res){

         /*=====for each function for video pusing to bizvideos array===*/
          angular.forEach(res, function(v, k){
          bizvideos.push(v.BusinessVideo);

          });
           angular.forEach(bizvideos, function(v, k){
               var vsplite=v.video_url.split('/');
               var thumb = globalVars.Youtubethumbfun(v.video_url, 'v');
               var finalthumb=thumb==""?vsplite[vsplite.length-1]:thumb;
               var url =  { videourl:'http://img.youtube.com/vi/' + finalthumb + '/default.jpg',playurl:v.video_url,id:v.id};
              $scope.videourls.push(url); // final array for video url for list view
                          });
                            //   $scope.premVideoUrl.video = res[0].BusinessVideo.video_url;
                //var thumb = globalVars.Youtubethumbfun(res[0].BusinessVideo.video_url, 'v'),
                  // url = 'http://img.youtube.com/vi/' + thumb + '/default.jpg';
                    // $scope.videothumb=url;
                      $rootScope.miniLoader = false;
                       $timeout(function(){
                       $scope.$apply();
                        },300);
                          })
                           .error(function(res){
                             $rootScope.miniLoader = false;
                               androidServices.showToast('there was an issue getting url from server, no data found');
                                });

             var playiframetemp = '<ion-modal-view class="bg_white">' +
                                                '<ion-header-bar>' +
                                                    '<button class="button button-icon icon ion-chevron-left" ng-click="closeCatModal()"></button>' +
                                                    '<h1 class="title">Business Video</h1>' +
                                                '</ion-header-bar>' +
                                                '<ion-content class=" group margin_b_20 align_center font_roboto font_color_blue">'+
                                                '<youtube-video style="width:100%" video-url="anotherGoodOne"  class="biz_videoplayercls">'+'</youtube-video>' +
                                                '</ion-content>' +
                                         '</ion-modal-view>';

                     /*?============video player modal view creation ===================?*/
                     $scope.player = $ionicModal.fromTemplate(playiframetemp, {
                     scope: $scope,
                     animation: 'slide-in-up',
                     hardwareBackButtonClose: false,
                     backdropClickToClose:false
                     });
                     $scope.VideoEventsCallfunc=function(data,currentIndex){
                     // Show the action sheet
                      var hideSheet = $ionicActionSheet.show({
                         buttons: [
                          { text: 'Play' }, {text:'Delete'}
                          ],
                           titleText: ' Video',
                           cancelText: 'Cancel',
                           buttonClicked: function(index) {
                            if(index==0){
                             $scope.anotherGoodOne=data.playurl;
                             $scope.player.show();
                             $rootScope.isPlayerModalview =true;
                                }
                             else{
                             //videoDelete
                       var confirmPopup = $ionicPopup.confirm({
                        title: 'confirm delete',
                        template: 'Are you sure you want to delete ?'
                           });
                           confirmPopup.then(function(res) {
                            if(res) {
                             performvideoDelete(data,currentIndex);
                                   //Delete each video from list
                                    }
                                     });
                                       return true;
                                         }
                                         }
                                          });
                                          // hide the sheet after two seconds
                                                 $timeout(function() {
                                                   hideSheet();
                                                 }, 2000);
                                                };

 function performvideoDelete(obj,currentIndex){

 formLoader.videoDelete(obj.id).then(function(data){
             $rootScope.miniLoader = false;
              androidServices.showToast('Video Successfull delete from list...');
              //currentIndex
              $scope.videourls.splice(currentIndex,1);
             // bizvideos.splice(currentIndex,1);

             // $route.reload();
                },
                function(err){
                 $rootScope.miniLoader = false;
                  androidServices.showToast('There was an issue Delete video from list , please try again');
                   });
                       }

                                    $scope.closeCatModal=function(){
                                     $scope.player.hide();
                                     var player_idsize=$(".biz_videoplayercls").length;
                                          var id=$(".biz_videoplayercls").attr('id');

                                                              //unique-youtube-embed-id-1
                                             //the below line of code is for stop the you tube video
                                      //      $('#unique-youtube-embed-id'+'-'+player_idsize)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
                                              $('#'+id)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');


                                        };
                                          }
    $scope.submitService = function(){
       $rootScope.miniLoader = true;
        formLoader.insertVideo(bizglobalVars.currentBID, $scope.premVideoUrl.video).then(function(data){
            $rootScope.miniLoader = false;
            globalVars.Add_Biz_deviceLat = 0;
            globalVars.Add_Biz_deviceLng = 0;

            androidServices.showToast('Business has been updated successfully');
            $state.go('menuView.profile.myListings');
        }, function(err){
            $rootScope.miniLoader = false;
            androidServices.showToast('There was an issue updating video url , please try again');
        });
    }
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
    $ionicPlatform.onHardwareBackButton(function(event){
    $scope.player.hide();

         var player_idsize=$(".biz_videoplayercls").length;
          var id=$(".biz_videoplayercls").attr('id');
             $('#'+id)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
             event.preventDefault();
              });
                 // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {

                    $scope.player.remove();
                 });
                 });


function TagArrayUnique(arr){
var uniqueNames = [];
 $.each(arr, function(i, el){
 if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);

  });


return uniqueNames;
}

function AddTagfilter(name,data){
 return JSON.parse(JSON.stringify(JSON.find({data:data,criteria:[{elementName:"Name",elementValue:name}]})));
 }