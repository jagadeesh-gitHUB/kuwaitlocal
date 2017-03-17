    //Export module definition
angular.module('classifieds.controllers', [])

.controller('ClassifiedsController', function($scope, $state, $cordovaGeolocation, geoCode, $ionicModal,$ionicScrollDelegate,resourceRequistion,$ionicPopover,$ionicModal, classifiedsViewData, $timeout, globalVars, $rootScope, $ionicLoading, globalDataTemp, classifiedDetailData,classifiedrequesting,cordovareturn,$interval) {
   analytics.trackView('Classified Home view');
    $rootScope.miniLoader = false;
    $scope.check_gustornot=globalVars.userInfo.id==undefined? true:false;
    $scope.autoLocation = '';
    $scope.returnedSearch = {};
    $scope.searchAutoComplete = 0;
    $scope.searchTerm = '';
    $scope.viewResult = {};
    $scope.viewCityResult = {};
    $scope.citySet = '';
    $scope.listingSet = '';
    $scope.popularCategories = {};
    $scope.b2bCategories = [];
    var functionalBlock = 0;
    $scope.curLat = '';
    $scope.actionList = [];
    $scope.curLng = '';
    var currentCatID = null;
    globalVars.LTD_switch = 'listing';
    $scope.imgbaseURL = globalVars.rawImgURL;                      //Slider data (ng-repeat)
    $scope.mainListings = globalDataTemp.currentListings || [];    //Listings in listing view loaded into this (ng-repeat data)
    var currentView = 'recent';
    var stateStore = $state.current.name;
    $scope.selectgoverareaname="Area";
    $scope.classifiedimageurl=globalVars.MainklURl+'img/ClassifiedType/logo_folder/';
    $scope.classifiedlogurl=globalVars.classifiedlistlogurl;
    $scope.selctedcity=0;
    $scope.basedonarea=false;
    $scope.defaultviewinhome=true;
    $scope.recentAds=[];//recent Ads data store variable
    //Loading indicator
    //Current location getter
   // cordovareturn.Getcurrentlocation();
    $cordovaGeolocation.getCurrentPosition().then(function(position) {
    $scope.curLng = position.coords.longitude;
    $scope.curLat = position.coords.latitude;
    globalVars.deviceLat = position.coords.latitude;
    globalVars.deviceLng = position.coords.longitude;
    geoCode.reverseFind(position.coords.latitude, position.coords.longitude).then(function(data){
    $scope.autoLocation = data.data.results[0].address_components[1].long_name;
    },
    function(err){});
    }, function(err) {
    });
    globalVars.searchKeyvalue="";
    /*=======from here changes done by me============*/
    //top image slide
    $scope.classifiedtypes=[];
    $scope.mobileclassimgs = [{name: "Mobiles & Tablets",logo:"img/classimgs/Mobiles&tablets.jpg",id:'48'},
                                  {name: "Electronics",logo:"img/classimgs/Electronics.jpg",id:'12'},
                                  {name: "Automobiles",logo:"img/classimgs/AUTOMOBILES.jpg",id:'300'},
                                  {name: "Home & Furniture",logo:"img/classimgs/Furniture.jpg",id:'275'},
                                  {name: "Housing & Commercial",logo:"img/classimgs/commersial.jpg",id:'303'},
                                  {name: "Services",logo:"img/classimgs/SERVICES.jpg",id:'6'},
                                  {name: "Education",logo:"img/classimgs/EDUCATION.jpg",id:'293'},
                                  {name: "Fitness & Sports",logo:"img/classimgs/Fitness.jpg",id:'276'},
                                  {name: "Everything Else",logo:"img/classimgs/Everything.jpg",id:'115'},
                                  {name: "Arts",logo:"img/classimgs/Arts.jpg",id:'109'},
                                  {name: "Jobs",logo:"img/classimgs/Jobs.jpg",id:'62'}];

                                  globalVars.clasifiedhomedata=$scope.mobileclassimgs;
                                  $scope.classifiedtypes=$scope.mobileclassimgs;

    //INterval function for repeating classfied types
    $scope.classfieds={};
    var images=$scope.countries;
    var i=0;
    function changeBackground() {
    if (i >= $scope.mobileclassimgs.length) {
    i = 0;
    $scope.classfieds=$scope.mobileclassimgs[i];
    return $scope.classfieds;
    }
    else{
    $scope.classfieds=$scope.mobileclassimgs[i++];
    return $scope.classfieds;
    }
    }
    changeBackground();
    // Set an interval to continue
    $interval(changeBackground, 6000);
    /*====================================classified types data call==========================*/
     $scope.currentgname=globalVars.currentcityGovernorate;
//     if(globalVars.clasifiedhomedata.length > 0 ){
//     $scope.classifiedtypes=globalVars.clasifiedhomedata;
//     }
//     else{
//     classifiedrequesting.fetchclassifiedtypes().then(function(data){
//     var typesdata=data.data;
//     angular.forEach(typesdata,function(v,k){
//     if(v.name == $scope.mobileclassimgs[k]['name'] ){
//     typesdata[k].logo=$scope.mobileclassimgs[k]['logo'];
//     }
//     });
//     globalVars.clasifiedhomedata=typesdata;
//     $scope.classifiedtypes=typesdata;
//     $rootScope.miniLoader = false;
//     });
//     }
     //classified type click
     $scope.getclassifiedsubtypes = function(ev,data) {
     $rootScope.miniLoader = true;
     sessionStorage.classifedparentlogo=data.logo;
     sessionStorage.classifedparentname=data.name;
     analytics.trackEvent('Classified Events','Click on Classified category name','Navigate to '+data.name+' classified types view' ,100);

     classifiedrequesting.fetchclassifiedsubtypes(data.id).then(function(data){
    //  $scope.classifiedsubtypes=data.data;
    globalVars.classifiedsubdata=data.data;
    $rootScope.miniLoader = false;
    $state.go('menuView.classtypes');
    });
    };
    //open recent ads classifieds
    //$scope.gridcatlistdiv=true;
    //$scope.popularcatlistdiv=false;
   $scope.openrecntAds=function(){
    analytics.trackEvent('Classified Events','Click on list icon','Navigate to Clasifed Reecent Ads list view',100);
   $state.go('menuView.classfiedrecentads');
   };
   $scope.opengridcatlist=function(){
   analytics.trackEvent('Classified Events','Click on grid icon','Navigate to Clasifed home view',100);

   $state.go($rootScope.$viewHistory.backView.stateName);
   };
   $scope.RecentAdsLoadmore_count=10;
   $scope.RecentADSlimitarrload=function(){
   $scope.RecentAdsLoadmore_count=$scope.RecentAdsLoadmore_count+10;
   $scope.$broadcast('scroll.infiniteScrollComplete');
   };
   if($rootScope.$viewHistory.currentView.stateName=="menuView.classfiedrecentads"){
   $rootScope.miniLoader = true;
   $scope.loadmoreAdsbtn=true;
   //recents ads data fecthing
   if(globalVars.RecentAds.length == 0){
   classifiedrequesting.fetchrecentAds().then(function(data){
   $scope.recentAds =distanceInject(data.data,globalVars,globalVars.deviceLat,globalVars.deviceLng,$rootScope);
//    $scope.recentAds.sort(function(a,b){
//
//                                                       return classsortingbasedontype($scope.loadtype,a,b);
//
//                                                       });
   globalVars.RecentAds= $scope.recentAds ;
   $scope.loadmoreAdsbtn=false;
   });
   }
   else{
   $rootScope.miniLoader = false;
   $scope.recentAds=globalVars.RecentAds;
   $scope.loadmoreAdsbtn=false;
   }
   if($scope.recentAds.length <= 10){
   $scope.loadmoreAdsbtn=true;
   }
   else{
   $scope.loadmoreAdsbtn=false;
   }
   }
   $scope.RecentAdsdoRefresh=function(){
   $rootScope.miniLoader = true;
   $scope.RecentAdsLoadmore_count=10;
   classifiedrequesting.fetchrecentAds().then(function(data){
   $scope.recentAds =distanceInject(data.data,globalVars,globalVars.deviceLat,globalVars.deviceLng,$rootScope);
    $scope.recentAds.sort(function(a,b){

                                                          return classsortingbasedontype($scope.loadtype,a,b);

                                                          });
   globalVars.RecentAds= $scope.recentAds ;
   }).finally(function() {
   $rootScope.miniLoader = false;
   // Stop the ion-refresher from spinning
   $scope.$broadcast('scroll.refreshComplete');
   $ionicScrollDelegate.scrollTop();
   });
   };
   $scope.createddatebind=function(date){return dateforimate(date)};
   //classified search function
   $scope.classifiedsearchkeyup=function(){
   if($scope.entersearchtext.length > 0){
   classifiedrequesting.fetchsearchlist($scope.entersearchtext,$scope.register.governorateId,$scope.selctedcity).then(function(data){
   $scope.classifiedsearchlists = data.data;
   $rootScope.miniLoader = false;
   $(".tabs").hide();
   $scope.defaultviewinhome=false;
   });
   }
   else{
   $(".tabs").show();
   $scope.defaultviewinhome=true;
   }
   }
   //seleceted sub type classifieds click
   $scope.secletedsubtypelist=function(id){
   classifiedrequesting.fetchsubcatrecent(id,$scope.curLat,$scope.curLng).then(function(data){
   $scope.listrecentclassifieds = data.data;
   $rootScope.miniLoader = false;
   });
   classifiedrequesting.fetchsubcatnearby(id,$scope.curLat,$scope.curLng).then(function(data){
   $scope.listnearclassifieds = data.data;
   $rootScope.miniLoader = false;
   });
   $state.go('menuView.classifieds.tabs.recent');
   }
   $scope.classdesc=function(e){
   var text= globalVars.htmlToPlaintext(e);
   return globalVars.substringmethod(text);
   };
   $scope.gotoclassifiedDetail = function(id){
   $rootScope.miniLoader = true;
   classifiedDetailData.fetchDetails(id).then(function(data) {
   globalDataTemp.setCurrentBID(id);
   globalDataTemp.setCurrentBusinessDetail(data.data);
   $rootScope.miniLoader = false;
   globalVars.LTD_switch = 'listing';
   $state.go('menuView.classifiedDetailView');
   });
   };
   $scope.openclassifiedsearchview=function(event){
    analytics.trackEvent('Classified Events','Click on Search box','Navigate to Classified search view',100);
   $state.go('menuView.ClassifiedSearch');
   };
   //open detail view
   $scope.openclassifiedlistdetail=function(data){
   var classified_id=data.id;
   $rootScope.miniLoader=true;
    analytics.trackEvent('Classified Events','Click on Classified list item','Navigate to '+data.title+' classified detail view' ,100);
   classifiedDetailData.fetchDetails(classified_id).then(function(data) {
   globalDataTemp.setCurrentBID(classified_id);
   globalDataTemp.setCurrentBusinessDetail(data.data);
   $rootScope.miniLoader = false;
   globalVars.LTD_switch = 'listing';
   $rootScope.miniLoader=false;
   $state.go('menuView.classifiedDetailView');
   });
   };
   $scope.recentclasslistsortbybuttonclick=function(text,event){
   $ionicScrollDelegate.scrollTop();
   $scope.RecentAdsLoadmore_count=10;

    $scope.recentAds.sort(function(a,b){

                                    return classsortingbasedontype(text,a,b);

                                    });
   $rootScope.miniLoader=true;
   $('.barbuttonselted').removeClass('barbuttonselted');
   $(event.target).addClass('barbuttonselted');
   $scope.loadtype=text;
   $rootScope.miniLoader=false;
    analytics.trackEvent('Classified Events','Click on '+text+' tab','Navigate to '+ text +' classified listview view' ,100);
    analytics.trackView(text+' classified list view');
   switch (text){
   case 'popular':
   $('.classpop').show();
   $('.classnear,.classrecent').hide();
   break;
   case 'near':
   $('.classnear').show();
   $('.classpop,.classrecent').hide();
   break;
   case 'recent':
   $('.classrecent').show();
   $('.classnear,.classpop').hide();
   break;
   }
   };
   $scope.clickonpostADS=function(){
     analytics.trackEvent('Classified  Events','Click on post Ads ','Navigate to Add classified view',100);

              if(globalVars.userInfo.id == undefined){
              globalVars.loginstatus="notlogged";
              globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
              $state.go('loginView');
              }
              else{

              $state.go("menuView.addClassifieds.step1");
              }
     };

   })
/*================================================classified sub categories controller =====================*/
.controller('ClassifiedssubcatController', function($scope, $state, $cordovaGeolocation, geoCode, $ionicModal,$ionicScrollDelegate,resourceRequistion,$ionicPopover,$ionicModal, classifiedsViewData, $timeout, globalVars, $rootScope, $ionicLoading, globalDataTemp, classifiedDetailData,classifiedrequesting,cordovareturn,$interval,androidServices){
                analytics.trackView(sessionStorage.classifedparentname+' Classified sub categories view');
                $scope.subcategories=[];
                $scope.subcategories=globalVars.classifiedsubdata;
                $scope.parentlogo= sessionStorage.classifedparentlogo;
                $scope.parentname=sessionStorage.classifedparentname;
                $scope.gotohomeview=function(){
                analytics.trackEvent('Classified Events','Click on Classified Back','Navigate to  previous view' ,100);
                $state.go($rootScope.$viewHistory.backView.stateName);
                };
                //click event for classifed lsitview based on category
                $scope.gotoclassifedlist=function(data){
                sessionStorage.catename=data.name;
                $rootScope.miniLoader = true;
                analytics.trackEvent('Classified Events','Click on Classified category name','Navigate to '+data.name+' classified list view' ,100);
                classifiedrequesting.fetchclassifedlistquery(data.id).then(function(data){
                if(typeof(data.data)=="object"){
                if(data.data.length > 0){
                globalVars.classifiedlistdata =distanceInject(data.data,globalVars,globalVars.deviceLat,globalVars.deviceLng,$rootScope);
                $rootScope.miniLoader = false;
                $state.go('menuView.classifiedlistview');
                }
                else{
                $rootScope.miniLoader = false;
                androidServices.showToast("There is no classifieds found");
                }
                }
                else{
                $rootScope.miniLoader = false;
                androidServices.showToast("There is no classifieds found");
                }
                });
                };
                $scope.openclassifiedsearchview=function(event){
                analytics.trackEvent('Classified Events','Click on Search box','Navigate to Classified search view',100);
                $state.go('menuView.ClassifiedSearch');
                };
                })

.controller('ClassifiedListController', function($scope, $state, $cordovaGeolocation, geoCode, $ionicModal,$ionicScrollDelegate,resourceRequistion,$ionicPopover,$ionicModal, classifiedsViewData, $timeout, globalVars, $rootScope, $ionicLoading, globalDataTemp, classifiedDetailData,classifiedrequesting,cordovareturn,$interval,$ionicScrollDelegate){
              analytics.trackView(sessionStorage.catename+' Recent Classified list view' );
              $scope.catename=sessionStorage.catename;
              $scope.classifiedlogurl=globalVars.classifiedlistlogurl;
              $scope.classifiedlists=[];
              $scope.listAdsLoadmore_count=10;
              $ionicScrollDelegate.scrollTop();
              var claszlistdata=globalVars.classifiedlistdata;
              $scope.loadtype="recent";
              var defaultlistlimitcount=20;
              var uniqueBizdata=[];
              if(claszlistdata.length>20){
              $('.loadmorelistclass').show();
              }
              else{
              $('.loadmorelistclass').hide();
              }
              if($scope.loadtype=='recent'){
              classlicing($scope.loadtype);
              }
              function classlicing(type){
              claszlistdata.sort(function(a,b){
              return classsortingbasedontype(type,a,b);
              });


              $.each(claszlistdata, function(i, el){
               if($.inArray(el, uniqueBizdata) === -1) uniqueBizdata.push(el);
               });
               var slicecount=claszlistdata.length>20?20: claszlistdata.length;
               $scope.classifiedlists=claszlistdata.slice(0,slicecount);$ionicScrollDelegate.scrollTop();
               }
               $scope.limitarrload=function(){
               defaultlistlimitcount=defaultlistlimitcount+20;
               var returndata=claszlistdata.slice($scope.classifiedlists.length,defaultlistlimitcount);
               $scope.classifiedlists=$scope.classifiedlists.concat(returndata);
               if($scope.classifiedlists.length==claszlistdata.length){
               $('.loadmorelistclass').hide();
               }
               else{
               $('.loadmorelistclass').show();
               }
               };
               $scope.listADSlimitarrload=function(){
               defaultlistlimitcount=defaultlistlimitcount+20;
               var returndata=claszlistdata.slice($scope.classifiedlists.length,defaultlistlimitcount);
               $scope.classifiedlists=$scope.classifiedlists.concat(returndata);
               $scope.$broadcast('scroll.infiniteScrollComplete');
               };
               $scope.gotohomeview=function(){
               analytics.trackEvent('Classified Events','Click on Classified Back','Navigate to  previous view' ,100);
               $state.go($rootScope.$viewHistory.backView.stateName);
               };
               $scope.createddatebind=function(date){
               return dateforimate(date)
               };
               $scope.classlistsortbybuttonclick=function(text,event){
               $ionicScrollDelegate.scrollTop();
               $scope.listAdsLoadmore_count=10;
               $rootScope.miniLoader = true;
               $('.barbuttonselted').removeClass('barbuttonselted');
               $(event.target).addClass('barbuttonselted');
               analytics.trackEvent('Classified Events','Click on '+text+' tab','Navigate to '+ text +' classified listview view' ,100);
               analytics.trackView(text+' classified list view');
               $scope.loadtype=text;
                 classlicing($scope.loadtype);
               switch (text){
               case 'popular':
               $('.classpop').show();
               $('.classnear,.classrecent').hide();
               $rootScope.miniLoader = false;
               break;
               case 'near':
               $('.classnear').show();
               $('.classpop,.classrecent').hide();
               $rootScope.miniLoader = false;
               break;
               case 'recent':
               $('.classrecent').show();
               $('.classnear,.classpop').hide();
               $rootScope.miniLoader = false;
               break;
               }
               };
               //open detail view
               $scope.openclassifiedlistdetail=function(data){
               var classified_id=data.id;
               $rootScope.miniLoader=true;
               analytics.trackEvent('Classified Events','Click on Classified list item','Navigate to '+data.title+' classified detail view' ,100);
               classifiedDetailData.fetchDetails(classified_id).then(function(data) {
               $rootScope.miniLoader=false;
               globalDataTemp.setCurrentBID(classified_id);
               globalDataTemp.setCurrentBusinessDetail(data.data);
               $rootScope.miniLoader = false;
               globalVars.LTD_switch = 'listing';
               $state.go('menuView.classifiedDetailView');
               });
               };
               $scope.openclassifiedsearchview=function(event){
               analytics.trackEvent('Classified Events','Click on Search box','Navigate to Classified search view',100);
               $state.go('menuView.ClassifiedSearch');
               };
               })

.controller('ClassifiedSearchController', function($scope, $state, $cordovaGeolocation, geoCode, resourceRequistion,$ionicPopover,$ionicModal, classifiedsViewData, $timeout, globalVars, $rootScope, $ionicLoading, globalDataTemp, classifiedDetailData,$ionicScrollDelegate,cordovareturn,classifiedrequesting,androidServices,$ionicPlatform) {
          analytics.trackView('Classified Search View');
          cordova.plugins.Keyboard.show();
          $scope.selectgoverareaid=sessionStorage.selectedcityid==undefined?0:sessionStorage.selectedcityid;
          $scope.selectgoverareaname= sessionStorage.selectedcityname_class==undefined?"Area": sessionStorage.selectedcityname_class;
          $scope.entersearchtext=globalVars.searchKeyvalue;
          $scope.selectgoverareaname="Area";
          if(globalVars.searchKeyvalue.length>2){
          $scope.searchresultdatas=globalVars.Searchobj;
          }
          $scope.register = {};
          $scope.register.governorates=[];
          $scope.register.governorateId = sessionStorage.currentgovenorate_class==undefined?'0':sessionStorage.currentgovenorate_class;
          if($scope.register.governorates.length >0 ){
          $scope.register.governorateId = sessionStorage.currentgovenorate_class==undefined?'0':sessionStorage.currentgovenorate_class;
          angular.forEach($scope.register.governorates,function(index,key){
          if(globalVars.currentcityGovernorate!=""){
          if(index.id==$scope.register.governorateId){
          $scope.register.governorateId='0';
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
          $scope.register.governorateId=sessionStorage.currentgovenorate_class==undefined?'0':sessionStorage.currentgovenorate_class;
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
          $scope.changegovernate=function(){
          $scope.selectgoverareaid=0;
          $scope.selectgoverareaname="Area";
          sessionStorage.currentgovenorate=$scope.register.governorateId;
          if($scope.register.governorateId==0){
          $scope.zerogovernorate=true;
          }
          else{
          $scope.zerogovernorate=false;
          }
          analytics.trackEvent('Classified  Events','Click on governate select','change governate from list',100);

          };
          //modal view cretated
          $ionicModal.fromTemplateUrl('governoratecities.html', {
          scope: $scope,
          animation: 'slide-in-up'
          }).then(function(modal) {
          $scope.modal = modal;
          });
          $scope.getareaslist=function(){
          $ionicScrollDelegate.scrollTop();
          analytics.trackEvent('Classified Events','Click on Area','open selected governate cities list',100);
          resourceRequistion.fetchgovernoratecity($scope.register.governorateId).then(function(data){
          $scope.governorateareas=data.data;
          });
          // }
          $scope.modal.show();
          };
          $scope.clearareaclivk=function(){
          $scope.selectgoverareaid=0;
          $scope.selectgoverareaname="Area";
          };
          $scope.selectgoverarea=function(id,name){
          $scope.selectgoverareaid=id;
          sessionStorage.selectedcityid=$scope.selectgoverareaid;
          $scope.selectgoverareaname=name;
          sessionStorage.selectedcityname_class=name;
          $scope.modal.hide();
          analytics.trackEvent('Classified Events','Click on Area name','select area and close pop view',100);

          };
          $scope.cityclosemodalview=function(){
          $scope.modal.hide();
          $scope.clearareaclivk();
          $scope.selectgoverareaid=0;
          sessionStorage.selectedcityid=0;
          sessionStorage.selectedcityname="";
          $scope.selectgoverareaname="Area";
          analytics.trackEvent('Classified Events','Click on close',' close cities  pop view',100);
          };
          //State transition logic
           $scope.flashSearch = function(){
           $rootScope.clearSearch = true;
           analytics.trackEvent('Classified Events','Click on Classified Search icon','Reset the data' ,100);
           };
           //location icon click
           $scope.getcurrentgover=function(){
           analytics.trackEvent('Classified Events','Click on Location icon','Get the Current user governate',100);
           cordovareturn.Getcurrentlocation();
           };
           //back to previoius view
           $scope.setbackview=function(){
            analytics.trackEvent('Classified Events','Click on Back','Navigate to previous view' ,100);
           globalVars.searchKeyvalue="";
           $state.go($rootScope.$viewHistory.backView.stateName);
           cordova.plugins.Keyboard.close();
           };
           $ionicPlatform.onHardwareBackButton(function(event){
           globalVars.searchKeyvalue="";
           cordova.plugins.Keyboard.close();
           });
           $scope.classsearchkeyup=function(event){
           if(event.keyCode==13){
           $scope.classsearchkeyupbtn();
           $(".search_class").show();
           }
           else{
           $(".search_class").hide();
           }
           };
           $scope.classsearchkeyupbtn=function(){

           globalVars.searchKeyvalue=$scope.entersearchtext;
           sessionStorage.catename=$scope.entersearchtext;
           analytics.trackEvent('Classified Events','Click on Search icon','Navigate to  classified list view of '+ $scope.entersearchtext+'( Searck text)'  ,100);
           if($scope.entersearchtext.length<3){
           $scope.seachdataclass=true;
           $scope.hidecategories=false;
           }
           else{
           classifiedrequesting.fetchsearchlist($scope.entersearchtext,$scope.register.governorateId,$scope.selctedcity).then(function(data){
           if(typeof(data.data)=="object"){
           if(data.data.length > 0){
           globalVars.classifiedlistdata =distanceInject(data.data,globalVars,globalVars.deviceLat,globalVars.deviceLng,$rootScope);
           $rootScope.miniLoader = false;
           $state.go('menuView.classifiedlistview');
           }
           else{
           androidServices.showToast("There is no classifieds found");
           }
           }
           else{
           androidServices.showToast("There is no classifieds found");
           }
           });
           }
           };
           })


.controller('classifieddetailController', function($scope,$rootScope,$sce,$http, $state, $timeout,classifiedrequesting , businessDetailData,$ionicPopover, $ionicSlideBoxDelegate, globalDataTemp, globalVars, $ionicPopup,$cordovaSocialSharing,$ionicPlatform,$ionicScrollDelegate,$cordovaInAppBrowser){
         var Ads_address = globalDataTemp.currentBusinessDetail.address || '0';
         if(typeof(Ads_address) =="object" ){
         $scope.detailData =distanceInject(globalDataTemp.currentBusinessDetail,globalVars,globalVars.deviceLat,globalVars.deviceLng,$rootScope);   //Loads all the detail data from SVC
         }
         else{
         $scope.detailData =globalDataTemp.currentBusinessDetail;
         }
         analytics.trackView($scope.detailData.classified.title+' Classified Detail view');
         $scope.Ads_Gallerycount=$scope.detailData.Ads_gallery;
         sessionStorage.ADS_ID=$scope.detailData.classified.id;
         var Ads_logo=$scope.detailData.classified.logo||"";
         $scope.logoImg = Ads_logo==""?"img/noimage.png" :globalVars.classifiedlistlogurl+$scope.detailData.classified.id+'_'+$scope.detailData.classified.logo;
         globalVars.LTD_switch = 'detail'; //Switches back state functionality for sub states
         $scope.classifiedlogurl=globalVars.classifiedlistlogurl;
         $scope.tabPage = 0;
         $scope.imgData = [];
         $scope.distance = null;
         $scope.nullStateData = {};
         $scope.priceTag = globalVars.currentclassprice;
         var businessIDStore = parseInt(globalDataTemp.currentBusinessID);     //Current business id fetched from global service
         if($scope.detailData.Business_image && $scope.detailData.Business_image.length > 0){
         angular.forEach($scope.detailData.Business_image, function(v, k){
         var glue = globalVars.rawImgURL;
         $scope.imgData.push({image : glue + v.dir + '/' + v.name});
         });
         }
        //fetchclassifecomments
        $scope.AdsComments=[];
        $scope.userlog=globalVars.MainklURl+'img/users/user_logo_folder';
        $scope.classifieddesc=function(txt){return globalVars.htmlToPlaintext(txt);};
        $("#Ads_descrpID").append($scope.detailData.classified.description);
        $("p a.serverAClass").on('click',function(){
        var url=$(this).text();
         analytics.trackEvent('Classified Detail Events','Click on link ','Open this '+ url + ' link in inappbrowser',100);

        var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
            };
        $cordovaInAppBrowser.open($(this).html(), '_blank', options).then(function(event){}).catch(function(event){});
        });
        var size_li = 0;
        var x=3;
        $scope.temp_ADscomments=[];
        GetADScommentsin();
        function GetADScommentsin(){
        classifiedrequesting.fetchclassifecomments(sessionStorage.ADS_ID).then(function(data){
        if(typeof(data.data)=="object" && data.data.length > 0){
        var comments_Data=data.data;
        angular.forEach(comments_Data, function(v, k){
        comments_Data[k].id=parseInt(v.id);
        });
        $scope.temp_ADscomments=comments_Data;
        $scope.AdsComments=comments_Data.slice(0,5);
        }
        });
        }
        $scope.loadmoreAdComments=function(event){
        var load_AdsComments=$scope.temp_ADscomments.slice($scope.AdsComments.length,$scope.AdsComments.length+5);
        $scope.AdsComments=$scope.AdsComments.concat(load_AdsComments);
        if($scope.AdsComments.length == $scope.temp_ADscomments.length){
        $(event.currentTarget).hide();
        }
        else{
        $(event.currentTarget).show();
        }
        };
        $scope.createddatebind=function(date){return dateforimate(date)};
        $scope.gotohomeview=function(){
        analytics.trackEvent('Classified Events','Click on Classified Back','Navigate to  previous view' ,100);
        $state.go($rootScope.$viewHistory.backView.stateName);
        };
        $scope.postcommet={
        commentToSend:"",
        };
        $scope.openCommentPop = function(){
        if(globalVars.userInfo.id == undefined){
        globalVars.loginstatus="notlogged";
        globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
        sessionStorage.Gust_generalID=sessionStorage.ADS_ID;
        sessionStorage.Gust_Class="Classified";
        var SendParams={
        Gust_data: sessionStorage.ADS_ID+"_"+"Classified",
        previous_state:$state.current.name
        };
        analytics.trackEvent('Classified Detail Events','Click on post comments ','navigate to Guest comments view',100);
        $state.go("menuView.Gustcomment", {params:SendParams});
        }
        else{
         analytics.trackEvent('Classified Detail Events','Click on post comments ','open  post comment pop view',100);
        var myPopup = $ionicPopup.show({
            template: '<textarea ng-model="postcommet.commentToSend" class="comment_textarea" focus-me="true">',
            title: 'Write a Comment',
            scope: $scope,
            buttons: [
            { text: 'Cancel' },
            {
            text: '<b>Post</b>',
            type: 'button-positive',
            onTap: function(e) {
            if($scope.postcommet.commentToSend == "" || $scope.postcommet.commentToSend == undefined){
            $('.comment_textarea').css('border','1px solid red');
            }
            else{
             analytics.trackEvent('Classified Detail Events','Click on post  ','Save the post comment in comments list and close pop view',100);
            $('.comment_textarea').css('border','1px solid gray');
            var url=globalVars.siteURL+'classified.php?function=classifiedpostcomment&userid='+globalVars.userInfo.id+'&comment='+$scope.postcommet.commentToSend+'&active='+1+'&id='+sessionStorage.ADS_ID+'&date='+new Date();
            $http.get(url).then(function(data){
            $scope.postcommet.commentToSend="";
            GetADScommentsin();
            },function(err){
            });
            }
            }
            }]
            });
            }
            };
            //Initialization function
        init();
        $scope.setBackAction = function(){
         analytics.trackEvent('Classified  DetailEvents','Click on Classified Back','Navigate to previous view' ,100);
        $state.go($rootScope.detailBack);
        };
        function init(){
              // Disable / Enable feature butons based on detail data availability
        var tempDistance = null;
        if($scope.detailData.address){
            //Strips the special characters and arranges them in a comma sep format for native google maps
        var titleOrig = $scope.detailData.title;
        var cityOrig = $scope.detailData.address.gname;
        if(titleOrig && titleOrig.indexOf('-') !== -1){
        titleOrig = titleOrig.substring(0, titleOrig.indexOf('-'));
        }
        if(cityOrig && cityOrig.indexOf('(') !== -1){
        cityOrig = cityOrig.substring(0, cityOrig.indexOf('('));
        }
        $scope.geo_directions = 'https://maps.google.com/?q=' + titleOrig + ", " + $scope.detailData.address.city_name + ', ' + cityOrig;
        $scope.geo_directions = 'https://maps.google.com/?q=' + $scope.detailData.address.lat + ',' + $scope.detailData.address.lng;
        var server_classaddress=$scope.detailData.address || '0';
        globalVars.currentReqLat = $scope.detailData.address.lat;
        globalVars.currentReqLng = $scope.detailData.address.lng;
        tempDistance = globalVars.calcDistance($scope.detailData.address.lat, $scope.detailData.address.lng, globalVars.deviceLat, globalVars.deviceLng);
        $scope.distance = (Math.round(tempDistance * 10) / 10);
        }
        }
          //Slider values delegate
        $scope.businessImages = businessDetailData.imageData;
        $scope.checkinhere = function(){
        globalDataTemp.currentCheckinData.title = $scope.detailData.title;
        globalDataTemp.currentCheckinData.bid = businessIDStore;
        $state.go('menuView.facebook.checkin.createTemplate');
        };
    //Tab change function via swipe
        $scope.tabHoldChange = function(index){
        $scope.tabPage = index;
        };
        $scope.changeTab = function(index){
        $ionicSlideBoxDelegate.$getByHandle('rating-tabs').slide(index);
        };
        $scope.phonecall=function(num){
        var numberis= "tel:"+num;
        analytics.trackEvent('Classified Detail Events','Click on phone number ','Make a call to '+num  ,100);
        window.open(numberis);
        };
        $scope.detailendquert=function(seller_email,Ads_slug,Ads_id){
        sessionStorage.AdsSlug=Ads_slug;
        sessionStorage.AdsId=Ads_id;
        analytics.trackEvent('Classified Detail Events','Click on email ','Navigate to classified enquiry view ',100);
        if(globalVars.userInfo.id == undefined){
        globalVars.loginstatus="notlogged";
        globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
        $state.go('loginView');
        }
        else{
        $state.go('menuView.classifiedEnquiry');
        }
        };
        $scope.shareADS=function(data){
        Adssharefunction($cordovaSocialSharing,data,globalVars.MainklURl);
        };
        $scope.openMapview=function(){
         analytics.trackEvent('Classified Detail Events','Click on Directions ','Open direction view in google map',100);

        };
        $scope.openAdsgallery=function(){
        sessionStorage.GalleryADS_name=$scope.detailData.classified.title;
        analytics.trackEvent('Classified Detail Events','Click on Gallery ','Navigate to '+$scope.detailData.classified.title+' Classified Gallery view',100);
        $state.go('menuView.Adsgallery');
        };
        $ionicPlatform.onHardwareBackButton(function(e){
        $state.go($rootScope.$viewHistory.backView.stateName);
        });
        })
//classifiedGalleryControlle
.controller('classifiedGalleryController', function($scope, $state, $cordovaGeolocation, geoCode, resourceRequistion,$ionicPopover,$ionicModal, classifiedsViewData, $timeout, globalVars, $rootScope, $ionicLoading, globalDataTemp, classifiedDetailData,$ionicScrollDelegate,cordovareturn,classifiedrequesting,$ionicSlideBoxDelegate  ) {
    analytics.trackView(sessionStorage.GalleryADS_name+' Classified Gallery view');
    $scope.publicGalleryImages=[];
    $scope.gotohomeview=function(){
    analytics.trackEvent('Classified Events','Click on Classified Back','Navigate to  previous view' ,100);
    $state.go($rootScope.$viewHistory.backView.stateName);
    };
    //fetchclassifedgallery
     classifiedrequesting.fetchclassifedgallery(sessionStorage.ADS_ID).then(function(data){
     if(typeof(data.data)=="object"){
     if(data.data.length > 0){
        $rootScope.miniLoader = false;
        var ads_gallery=data.data;
        if(ads_gallery&& ads_gallery.length > 0){
            angular.forEach(ads_gallery, function(v, k){
            var glue = globalVars.rawImgURL;
            $scope.publicGalleryImages.push({image : glue + v.dir + '/' + v.name,gallery_thumbnail:v.thumbnail_path});
            });
        }
     }
     else{
     androidServices.showToast("There is no classified Gallery found");
     }
     }
     else{
     androidServices.showToast("There is no classified Gallery found");
     }
     });
     $ionicPopover.fromTemplateUrl('imgage_lrge.html', {
                  scope: $scope
                  }).then(function(popover) {
                  $scope.popover = popover;
                  });
     $scope.AdsGallerypopimage=function(event,index){
     $scope.popover.show();
     $ionicSlideBoxDelegate.slide(index);
     analytics.trackEvent('Classified  Events','Click on Gallery thumbnail ','open image enlarge view with selcted iamge',100);
     };
     $scope.slideVisible = function(index){
     if(  index < $ionicSlideBoxDelegate.currentIndex() -1
          || index > $ionicSlideBoxDelegate.currentIndex() + 1){
          return false;
          }
          return true;
          };
     })

.controller('classifiedEnquiryController', function($scope, $state, globalVars, globalDataTemp, businessDetailData, $timeout, $ionicPopup, $rootScope,$http,androidServices){

    analytics.trackView('Classified Enquiry view');
    $scope.formEntry = {
        uname  : globalVars.userdetails[0].first_name.trim()+' '+globalVars.userdetails[0].last_name.trim() || '',
        email : globalVars.userdetails[0].email || '',
        number: globalVars.userdetails[0].contact_number|| '',
        msg   : ''
    };
    $scope.enquiryIntegrity = !enquiry_form.$invalid;
      //Adsenquirtemail
    var checkingmail= $scope.formEntry.email.length == 0 ?false:true;
    $("#Adsenquirtemail").attr('disabled',checkingmail);
    $scope.formUpdate = function(){
    if($scope.formEntry.uname && $scope.formEntry.email /*&& $scope.formEntry.number*/ && $scope.formEntry.msg){
    if($scope.formEntry.uname.length > 0 && $scope.formEntry.email.length > 0 /*&& $scope.formEntry.number.length > 0 */ && $scope.formEntry.msg.length > 0){
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
            $state.go('menuView.classifiedDetailView');
        }
        else{
            $state.go($rootScope.prevState);
        }
        analytics.trackEvent('Classified Detail Events','Click on back ','navigate to previous view',100);
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
    var post_data = {
        ClassifiedsEnquiry : {
                                 slug :sessionStorage.AdsSlug ,
                                 classified_id : sessionStorage.AdsId ,
                                 buyer_name :$scope.formEntry.uname,
                                 buyer_email : $scope.formEntry.email,
                                 buyer_phonenumber : $scope.formEntry.number,
                                 buyer_message:$scope.formEntry.msg
                              }
                     };
    var compiledData = globalVars.MainklURl+'MobileEmail/classified_send_enquiry';
    return $http.post(compiledData, post_data).success(function(data){
     $state.go($rootScope.$viewHistory.backView.stateName);
      androidServices.showToast('Sent successfully...');
      }, function error(err){
       return err;
       });

       analytics.trackEvent('Classified Detail Events','Click on send enquiry ','send enquiry email and navigate to detail view ',100);
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
    $(".ADsEnq_cls").hide();
    });
    window.addEventListener('native.keyboardhide', function(){
    $(".ADsEnq_cls").show();
    });
    })

 //Login page controller
.controller('classifiedDashController', function($scope, $timeout, $state, globalVars){})

.controller('myClassifiedsController', function($scope, $state, $cordovaGeolocation, geoCode, resourceRequistion, classifiedsViewData, $timeout, globalVars, $rootScope, androidServices, $ionicLoading, globalDataTemp, classifiedDetailData, classifiedsData){
  analytics.trackView($rootScope.$viewHistory.currentView.stateName);
    $scope.myClassifiedLists = [];
    classifiedsViewData.fetchMyClassifieds()
        .success(function(res){
           $scope.myClassifiedLists = res;
        })
        .error(function(res){

        })
    $scope.actionList = -1;
    $scope.setActive = function(index){
        if(index === $scope.actionList){
            $scope.actionList = -1;
        }
        else{
            $scope.actionList = index;
        }
    }
    $scope.sendToEdit = function(id, is_premium){
       $rootScope.miniLoader = true;
        classifiedsData.getEditData(id)
            .success(function(res){
                $rootScope.miniLoader = false;
                globalDataTemp.classifiedData = res;
                globalDataTemp.currentClassifiedID = id;
                $state.go('menuView.addClassifieds.step1');
            })
            .error(function(res){
                $rootScope.miniLoader = false;
                androidServices.showToast('error loading edit information , Please try again');
            })
    }
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

function distanceInject(dataSet,globalVars,devicelat,devicelong,rootScope){
  angular.forEach(dataSet, function(v, k){
  var server_lat=v.lat||'0';
  var server_lng=v.lng||'0';
  var curLat = parseFloat(server_lat);
  var curLng = parseFloat(server_lng);
  if(curLat > 0 && curLng > 0  && parseFloat(devicelat) >0  && parseFloat(devicelong) > 0){
     var dist = globalVars.calcDistance(curLat, curLng, parseFloat(devicelat), parseFloat(devicelong));
     dataSet[k].distance = (Math.round(dist * 10) / 10);
     }
     else{
     dataSet[k].distance = 99999;
     }
     dataSet[k].view_count = parseInt(v.view_count);
     rootScope.miniLoader = false;
  });

  return dataSet;
   }
function classsortingbasedontype(type,a,b){


  if(type==="popular"){

  return parseInt(b.view_count) - parseInt(a.view_count);
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
function Adssharefunction(cordovaSocialSharing,Ads,url){
  //  var title=Ads.title.split(" ").join('-');
   // var bizlink=globalVars.MainklURl+""+title;
    analytics.trackEvent('Classified Detail Events','Click on Share Ad ','share this '+Ads.titlek+' link',100);
   var title = Ads.slug;
   var desc=Ads.description;
  // console.log(Ads);
    var bizlink=url+"classified/"+title;

    cordovaSocialSharing.share(title,desc,"", bizlink) // Share via native share sheet
                        .then(function(result) {
                        // Success!
                        }, function(err) {
                         // An error occured. Show a message to the user
                          });
                           }

function GetAddress(lat,lng) {

            var latlng = new google.maps.LatLng(parseInt(lat), parseInt(lng));
            var return_address="";
            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                       // alert("Location: " + results[1].formatted_address);
                       return_address=results[1].formatted_address;
                    }
                }
            });

            return return_address;


        }
