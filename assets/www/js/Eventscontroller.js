angular.module('Events.controllers',[])

.controller('EventHomeController', function($scope,$ionicPlatform,$ionicViewService,$state,globalVars,$rootScope,$http,$ionicModal,$ionicPopup,$ionicScrollDelegate,$cordovaSocialSharing,localStorageService,EventsServerCalls,EventVars,androidServices){
            analytics.trackView('Kuwaitlocal Events Home view');
            $scope.EventLoadmore=20;
          
          EventVars.Temp_SearchKey="";
            
          EventVars.Temp_SearchList =[] ;
            
            $rootScope.miniLoader=true;
            EventsServerCalls.EventHome().then(function(data){
                                               $scope.EventHomeList=data.data;
                                              
                                               $rootScope.miniLoader=false;
                                               });
            
            
            
            
            
            
            $scope.EventIndexloadmore=function(){
            $scope.EventLoadmore=$scope.EventLoadmore+20;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            };
            
            $scope.eventDetailnav=function(id,index){
          
             $rootScope.miniLoader=true;
            EventsServerCalls.EventDetail(id).then(function(data){
                    EventVars.EventDetailData=data.data;
                    $rootScope.miniLoader=false;
                   $state.go('menuView.EventDetail');
                                                   })
            };
            
            $scope.openSeachview=function(){
            
            $rootScope.purposeeventHome_click = 'search';
            
            $state.go('menuView.EventSearch');
            };
            
            
            /*===========event filter functionality start here ================*/
            
            
            
            $ionicModal.fromTemplateUrl('eventHomeFilter.html', {
                                        scope: $scope,
                                        animation: 'slide-in-up'
                                        }).then(function(modal) {
                                                $scope.modal = modal;
                                                });
            $scope.choosedateDiv=true;
            $scope.ChooseDateText= "All Dates";
            $scope.defaultdatecheck=true;
            $scope.EventCatID=0;
            $scope.eventcatstxt= "All Categories";
            $scope.eventis_free= "";
            $scope.freechcked =false;
            
            $scope.filterData={
            
            fromDate:"",
            toDate:""
            
            };
            
            $scope.data={
            
            remember : false,
            choosedateDiv:true,
            ChooseDateText: "All Dates",
            defaultdatecheck:true,
            eventcatstxt: "All Categories",
            eventis_free:"",
            };
            
            
            $scope.OpenfilterView=function(event){
            
            $scope.eventcathide=false;
            
            $scope.modal.show();
            
            EventsServerCalls.EventCats().then(function(data){
                                               
                                               $scope.EventCatArray=data.data;
                                               
                                               },
                                               function(err){
                                               
                                               });
            
            
            };
            
            $scope.FreeEventclick=function(event){
            };
            
            
            $scope.chooseDateclick=function(txt,event){
            
            $scope.ChooseDateText = txt;
            
            if(txt !="Choose Date"){
            $scope.data.choosedateDiv=true;
            }
            else{
            
            $scope.data.choosedateDiv = !$scope.data.choosedateDiv;
            }
            
            
            
            
            };
            
            $scope.choseCatfromlist=function(data,event){
            
            
            $scope.data.eventcatstxt=data.name;
            
            $scope.data.EventCatID =data.id;
            
            
            };
            
            $scope.FilterApplyclick=function(){
            var is_free=  $scope.data.remember == false? "" : "free";
            //  alert( $scope.data.eventis_free);
            // alert( is_free);
            
            var dates_validation = false;
             var dates_validation_text = "";
            
          //  alert($scope.data.ChooseDateText);
            
            if($scope.data.ChooseDateText == "Choose Date"){
            
            
            if($scope.filterData.fromDate == ""  && $scope.filterData.toDate == ""){
            
            dates_validation=true;
            
            dates_validation_text ="From date and To date should filled...";
            
            }
            
            else if( $scope.filterData.fromDate != "" && $scope.filterData.toDate == ""){
            
            dates_validation=true;
            
            dates_validation_text =" To date should filled...";
            }
            
            else if( $scope.filterData.toDate != "" && $scope.filterData.fromDate  == ""){
            
            dates_validation=true;
            
            dates_validation_text =" From date should filled...";
            }
            
            else if( $scope.filterData.toDate < $scope.filterData.fromDate){
            
            dates_validation=true;
            
            dates_validation_text =" To date should be greater than From date...";
            
            }
            
            //            else if( $scope.filterData.toDate  == $scope.filterData.fromDate){
            //
            //            dates_validation=true;
            //
            //            dates_validation_text ="From date and To date should not same...";
            //
            //            }
            else{
            dates_validation=false;
            dates_validation_text="";
            }
            
            }
            else{
            
            
            dates_validation=false;
            dates_validation_text="";
            }
            
            if(dates_validation==false){
            if( $scope.data.eventcatstxt == "All Categories"){
            EventsServerCalls.EventFilterWillAllCats($scope.data.ChooseDateText,$scope.filterData.fromDate,$scope.filterData.toDate, is_free)
            .then(function(data){
                                                                                                                                                   
                                $scope.EventSearchlist = typeof(data.data) == "object" ? finalEventdata(data.data) : [];
                                EventVars.Temp_SearchList=$scope.EventSearchlist;
                                if($scope.EventSearchlist.length == 0){
                             androidServices.showToast('No Events found');
                  }
                  else{
                  $scope.modal.hide();
                 // $scope.modal.remove();
                $scope.data={
                  remember : false,
                  choosedateDiv:true,
                  ChooseDateText: "All Dates",
                  defaultdatecheck:true,
                  eventcatstxt: "All Categories",
                  eventis_free:"",
                  };
                  $('.barbuttonselted').removeClass('barbuttonselted');
                  $("#search_event_pop").addClass('barbuttonselted');
                  $rootScope.purposeeventHome_click = 'Filter';
                   $state.go('menuView.EventSearch');
                  }
                  },
                  function(err){
                  });
            }
                  else{
                  EventsServerCalls.EventFilterWillCat($scope.data.ChooseDateText,$scope.filterData.fromDate,$scope.filterData.toDate,$scope.data.EventCatID, is_free)
                  .then(function(data){
                        $scope.EventSearchlist = typeof(data.data) == "object" ? finalEventdata(data.data) : [];
                        EventVars.Temp_SearchList=$scope.EventSearchlist;
                        if($scope.EventSearchlist.length == 0){
                        androidServices.showToast('No Events found');
                        }
                        else{
                        $scope.modal.hide();
                        $scope.data={
                        remember : false,
                        choosedateDiv:true,
                        ChooseDateText: "All Dates",
                        defaultdatecheck:true,
                        eventcatstxt: "All Categories",
                        eventis_free:"",
                        };
                        $('.barbuttonselted').removeClass('barbuttonselted');
                        $("#search_event_pop").addClass('barbuttonselted');
                        $rootScope.purposeeventHome_click = 'Filter';
                         $state.go('menuView.EventSearch');
                        }
                        },
                        function(err){
                        });
            }
            }
            else{
            
             androidServices.showToast(dates_validation_text);
            }
            
                  };

            
//            
//            $scope.OpenfilterView =function(){
//            
//             $rootScope.purposeeventHome_click = 'Filter';
//             $state.go('menuView.EventSearch');
//            
//            };
                  function finalEventdata(dataSet){
                  
                  angular.forEach(dataSet, function(v, k){
                                  var curLat = parseFloat(v.lat);
                                  
                                  var curLng = parseFloat(v.lng); $scope.Device_lat=$scope.Device_lat == undefined ? 0 : $scope.Device_lat;
                                  $scope.Device_lng=$scope.Device_lng == undefined ? 0 : $scope.Device_lng;


                                  
                                  var DeviceLat = $scope.Device_lat == 0 ? globalVars.currentlat : $scope.Device_lat;
                                  
                                  var DeviceLng = $scope.Device_lng == 0 ? globalVars.currentlng : $scope.Device_lng;



                                  dataSet[k].view_count = parseInt(v.view_count);
                                  
                                  if(curLat > 0 && curLng > 0){
                                  
                                  var dist = globalVars.calcDistance(curLat, curLng, parseFloat(DeviceLat), parseFloat(DeviceLng));

                                // console.log(dist+"dist");

                                  var find_distance = (Math.round(dist * 10) / 10);

                                //  console.log(find_distance+"find_distance");

                                  dataSet[k].distance =isNaN(find_distance) == true ? 9999999 : find_distance;
                                  
                                  
                                  
                                  }
                                  
                                  else{
                                  
                                  dataSet[k].distance = 9999999;
                                  
                                  }
                                  
                                  });
                  $rootScope.miniLoader=false;
                  
                  return dataSet;
                  
                  }
            
            })

.controller('EventDetailController', function($scope,$ionicPlatform,$ionicViewService,$state,globalVars,$rootScope,$http,$ionicModal,$ionicPopup,$ionicScrollDelegate,$cordovaSocialSharing,localStorageService,EventsServerCalls,EventVars,$cordovaInAppBrowser,$window,androidServices,$ionicPopover){
            $scope.check_gustornot=globalVars.userInfo.id==undefined? false: true;
            
            $scope.LoggedUser= globalVars.userInfo.id==undefined? 0: globalVars.userInfo.id;
            
            $ionicScrollDelegate.scrollTop();
            
            $scope.userlog=globalVars.MainklURl+'img/users/user_logo_folder';
            
            $scope.eventlogo=globalVars.MainklURl+'/img/EventLogo/logo_folder/';
            
            $scope.postcomnet={
            
            comment:""
            
            };
            $scope.EventDetail=EventVars.EventDetailData.event_detail[0];
            
            $scope.EventPeople = typeof(EventVars.EventDetailData.Attend_people) == "object" ? EventVars.EventDetailData.Attend_people : null;
            
            $scope.EventDates =EventVars.EventDetailData.event_detail[0].eventDates;
            
            $scope.RelatedEvents = EventVars.EventDetailData.related_events;
            
            $scope.RateCount = $scope.EventDetail.rating;
            
            var more_contacts_event =  $scope.EventDetail.more_contacts+','+$scope.EventDetail.landline_no;
            
            $scope.more_contacts_event = more_contacts_event.split(',');
            
            $scope.more_contacts_Array=[];
            
            for(var i=0;i < $scope.more_contacts_event.length; i++){
            
            if($scope.more_contacts_event[i] > 0){
            
            $scope.more_contacts_Array.push($scope.more_contacts_event[i]);
            
             }
            else{ }
          
            }
            
            $scope.moreText = "more";
            
            $scope.showmore=function(){
            
            $(".mobile_Cls").toggle();
            
            $scope.moreText = $scope.moreText=="more" ?"less" : "more";
            
            
            };
            
            
            //more email
            
            $scope.more_email_event_Array=$scope.EventDetail.more_email == "" ? []:$scope.EventDetail.more_email.split(',');
            
           $scope.emailMoretxt="more";
            
            
            $scope.showemailmore=function(){
            
            $(".email_Cls").toggle();
            
            $scope.emailMoretxt = $scope.emailMoretxt=="more" ?"less" : "more";
            
            
            };
            
            
            $scope.sendEnQuiry=function(mail){
            
            if(globalVars.userInfo.id == undefined){
            
            globalVars.loginstatus="notlogged";
            
            globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
            
            $state.go('loginView');
            }
            else{
          
            $state.go('menuView.Eventenquiry', {Event_id:$scope.EventDetail.id,Event_mail:mail,slug:$scope.EventDetail.slug});
            }
            };
            
            $scope.EventsComments=[];
            eventCommentsLoad();
/*checking current logged user going or not */
            
            $scope.isGoing_or_not = checkingGoing($scope.LoggedUser,$scope.EventPeople);
            
            
            
          //  $scope.EventdayDiff =null;
            
            var diiferre= EventDatedifference($scope.EventDates);
            
            $scope.EventdayDiff = diiferre == undefined ? null : diiferre;
            
            var eventcompeltecheck=EventCompleteCheck($scope.EventDates);
            
            
            $scope.Eventcomplete_Ckc = eventcompeltecheck == undefined ? null : eventcompeltecheck;

            
           

            
            
            $("#event_desid").append($scope.EventDetail.description);
            $scope.setBackAction=function(){
            $state.go($rootScope.$viewHistory.backView.stateName);
            };
            $scope.curLng="";
            $scope.curLat="";
            if(($scope.EventDetail.lat !=null || $scope.EventDetail.lat !="" ) && ($scope.EventDetail.lng !=null || $scope.EventDetail.lng !="" )){
           
            var eventlat =  $scope.EventDetail.lat =="29.33738" ? 0 : $scope.EventDetail.lat;
            
            var eventlng =   $scope.EventDetail.lng =="47.65786" ? 0  : $scope.EventDetail.lng;
            
            globalVars.currentReqLat = $scope.EventDetail.lat;
            globalVars.currentReqLng = $scope.EventDetail.lng;
            
              if(eventlat > 0 && eventlng > 0){
             var find_distance = globalVars.calcDistance(eventlat,eventlng, globalVars.deviceLat, globalVars.deviceLng);
            
            var find_distance_resiult = (Math.round(find_distance * 10) / 10) ;
            
            
             $scope.Eventdistance = find_distance_resiult == 0 ? 99999 : find_distance_resiult ;
           
            $scope.geo_directions = 'https://maps.google.com/?q=' + $scope.EventDetail.lat + ',' + $scope.EventDetail.lng;
            
            $scope.aboutDistance = $scope.Eventdistance == 99999 ? true: false;
           
            }
            else{
            
            
            $scope.Eventdistance = 99999
            
            $scope.aboutDistance = $scope.Eventdistance == 99999 ? true: false;
            
            
            }
            
            
            
            }
            else{
            
             $scope.aboutDistance = true;
            
            }
            $scope.openurlwithin=function(url,event){
            var link = (url.indexOf('://') == -1) ? 'http://' + url : url;
            var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'yes'
            };
            event.preventDefault();
            $cordovaInAppBrowser.open(link, '_blank', options)
            .then(function(event) {
                  // success
                  })
            .catch(function(event) {
                   // error
                   });
            
            };
            $scope.phonecall=function(num){
          
            var numberis= "tel:"+num;
            window.open(numberis);
            };
            
            $("a.serverAClass").on('click',function(event){
                                     var url=$(this).text();
                                    
                                     
                                     var options = {
                                     location: 'yes',
                                     clearcache: 'yes',
                                     toolbar: 'yes'
                                     };
                                     event.preventDefault();
                                     $cordovaInAppBrowser.open($(this).html(), '_blank', options).then(function(event){}).catch(function(event){});
                                     });
            
            
            $scope.loadmoreAdComments=function(event){
            var load_AdsComments=$scope.total_eventComments.slice($scope.EventsComments.length,$scope.EventsComments.length+5);
            $scope.EventsComments=$scope.EventsComments.concat(load_AdsComments);
            if($scope.EventsComments.length == $scope.total_eventComments.length){
            $(event.currentTarget).hide();
            }
            else{
            $(event.currentTarget).show();
            }
            };
            
            $scope.relatedeventclick=function(id,index){
            $rootScope.miniLoader=true;
            EventsServerCalls.EventDetail(id).then(function(data){
                                                   EventVars.EventDetailData=data.data;
                                                   $rootScope.miniLoader=false;
                                                   
                                                   
                                                   $state.go($state.current, {}, {reload: true});
                                                   $ionicScrollDelegate.scrollTop();

                                                   })
            
            };
            
            
            
            
            $scope.getuserComments=function(){
            if($scope.check_gustornot==false){
            sessionStorage.Gust_generalID=$scope.EventDetail.id;
            sessionStorage.Gust_Class="Event";
            var SendParams={
            Gust_data: sessionStorage.Gust_generalID+"_"+"Event",
            previous_state:$state.current.name
            };
                     $state.go("menuView.Gustcomment", {params:SendParams});
            }
            else{
            cordova.plugins.Keyboard.show();
           
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
                                                     
    var url=globalVars.siteURL+'EventsCalls.php?function=postcomment&userid='+globalVars.userInfo.id+'&comment='+$scope.postcomnet.comment+'&active='+1+'&id='+$scope.EventDetail.id+'&date='+new Date();
                                                     $http.get(url).then(function(data){
                                                                         $scope.postcomnet.comment="";
                                                                         eventCommentsLoad();
                                                                         },function(err){
                                                                         });
                                                     }}}]})}
            };
            
            
            $scope.shareEvent=function(slug){
            
                       var bizlink=globalVars.MainklURl+"event/"+slug.toLowerCase();
            
            var event_name = slug.split('-').join('');
            
            $cordovaSocialSharing.share("I am sharing this event ",event_name,"", bizlink) // Share via native share sheet
            .then(function(result) {
                  // Success!
                  }, function(err) {
                  // An error occured. Show a message to the user
                  });
            
            };
            
            $scope.sendToRatingDetail=function(id){
            if(globalVars.userInfo.id == undefined){
            globalVars.loginstatus="notlogged";
            globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
            $state.go('loginView');
            }
            else{
            $state.go('menuView.EventwriteReview',{Event_id:id});
            }
            };
           
            
            $scope.openeventgallery=function(data){
            
            $state.go('menuView.EventGallery', {Event_id:data.id,Logged_id:$scope.LoggedUser,slug:data.slug});
            
            };
            
            $scope.eventpeopeclick=function(eventID,event,txt){
            
           
            
            if(globalVars.userInfo.id == undefined){
            globalVars.loginstatus="notlogged";
            globalVars.currentviewname=$rootScope.$viewHistory.currentView.stateName;
            $state.go('loginView');
            }
            else{
            
            var post_url= txt =='going' ? globalVars.siteURL+'EventsCalls.php?function=EventGoingClick&id='+eventID+'&user_id='+globalVars.userInfo.id :
                                          globalVars.siteURL+'EventsCalls.php?function=EventnotGoingClick&id='+eventID+'&user_id='+globalVars.userInfo.id;
            $rootScope.miniLoader =true;
            
            $http.get(post_url).then(function(data){
                                    
                                     $scope.EventPeople=typeof(data.data) == "object" ? data.data : null;
                                     
                                      $scope.isGoing_or_not = checkingGoing($scope.LoggedUser,$scope.EventPeople);
                                     
                                     //EventVars.EventDetailData.Attend_people = typeof(data.data) == "obejct" ? data.data : [];
                                    // $state.go($state.current, {}, {reload: true});
                                     //$ionicScrollDelegate.scrollTop();
                                     
                                     $rootScope.miniLoader=false;
                                     
                                     
                                     
                                     if($scope.Eventcomplete_Ckc ==null){
                                     
                                     txt=txt.replace('going','went');
                                     }
                                     
                                     
                                     
                                     androidServices.showToast("Your "+ txt +" to this event");
                                     
                                     },function(err){});
            }
            
            };
            
          
            
                       
            function eventCommentsLoad(){
            EventsServerCalls.EventComment($scope.EventDetail.id).then(function(data){
                                                    
                                                    $scope.EventsComments=data.data.comments.slice(0,5);
                                                    $scope.total_eventComments=data.data.comments;
                                                    $scope.EventDetail.rating=data.data.RateCount;
                                                                     //  $scope.eventCommentCount =
                                                  
                                                                       
                                                   if($scope.total_eventComments.length >5 ){
                                                                     
                                                                       $("#loadMore").show();
                                                                       
                                                                       }
                                                    else{
                                                            $("#loadMore").hide();
                                                                   
                                                                       }
                                                                       
                                                    });
            
            
            
            }
            
            
//            $scope.$watch('myDateInput', function (newValue) {
//                          $scope.user.User.DateOfBirth = $filter('date')(newValue, 'yyyy-MM-dd'); // Or whatever format your real model should use
//                          });
            
            
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
            $rootScope.popover=$scope.popover;
            analytics.trackEvent('Business Events','Click on business logo','Open image enlarge view with selected image ',100);
            };

            })
.controller('EventReviewController', function($scope, $state, globalDataTemp, globalVars, businessDetailData, $ionicPopup, $timeout, $rootScope,cordovareturn,$ionicScrollDelegate,EventsServerCalls,EventVars,$stateParams){
            
            $ionicScrollDelegate.scrollTop();
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
            EventsServerCalls.postRating($stateParams.Event_id,$scope.formEntry.uname, $scope.formEntry.email, $scope.formEntry.number, $scope.usersRating, $scope.formEntry.msg).then(function(data){
                                      $rootScope.miniLoader = false;
                                   var trimData = data.data.trim();
                              if(trimData == 'saved'){
                                                    $scope.goBackToDetail();
                                                }
                                               else {
                                            $scope.showAlert("Rate this Failed", "There was an issue rating this business, please try again", false);
                                                    }
                                                    }, function(err){
                                            $scope.showAlert("Posting Failed", "There was an issue rating this business, please try again", false);
                                                });
          
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
.controller('EventGalleryController', function($scope, $state,$ionicSlideBoxDelegate,$cordovaDialogs, $rootScope, $cordovaCamera, EventfileUpload, $ionicPopover,cordovareturn,globalVars,$ionicPlatform,androidServices,$ionicScrollDelegate,EventsServerCalls,EventVars,$stateParams,$http){
            
     $ionicScrollDelegate.scrollTop();
            
            $scope.publicGalleryImages = [];
            
            $scope.url=globalVars.MainklURl+"img/";
         
            initeventGallery();
           
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
                                             // $rootScope.miniLoader = true;
                                              $rootScope.miniLoader = true;
                                              $scope.photoPopOver.hide();
                                              EventfileUpload.uploadPhoto(datapath,$stateParams.Event_id,$stateParams.Logged_id,$stateParams.slug ).success(function(data){
                                                                                                                 $rootScope.miniLoader = false;
                                                                                                                 if(data.trim() == '"faild"'){
                                                                                                                 androidServices.showToast("Image should be more than 200px width & 100px height and size should be more than 10kb and Image size should not be more than 6MB");
                                                                                                                 }
                                                                                                                 initeventGallery();
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
                                              //$rootScope.miniLoader = true;
                                             
                                              $rootScope.miniLoader = true;
                                              $scope.photoPopOver.hide();
                                              EventfileUpload.uploadPhoto(datapath,$stateParams.Event_id,$stateParams.Logged_id ,$stateParams.slug).success(function(data){
                                                                                                                 $rootScope.miniLoader = false;
                                                                                                                 if(data.trim() == '"faild"'){
                                                                                                                 androidServices.showToast("Image should be more than 200px width & 100px height and size should be more than 10kb and Image size should not be more than 6MB");
                                                                                                                 }
                                                                                                                 initeventGallery();
                                                                                                                 }).error(function(data){
                                                                                                                          $rootScope.miniLoader = false;
                                                                                                                          });
                                              });
            }
            };
            //Toggles photo modal box
            $scope.goBackToDetail = function(){
          
            $state.go('menuView.EventDetail');
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
            //$scope.popimage=$scope.publicGalleryImages[0]['image'];
           // $scope.popimagesel=$("#selectedimgsrc").attr('src');
            $scope.popover.show();
            $rootScope.popover=$scope.popover;
            $ionicSlideBoxDelegate.slide(index);
           
            };
            $scope.slideVisible = function(index){
            if(  index < $ionicSlideBoxDelegate.currentIndex() -1
               || index > $ionicSlideBoxDelegate.currentIndex() + 1){
            return false;
            }
            return true;
            };
            
            
            function initeventGallery(){
             $rootScope.miniLoader=true;
            var gallery_url=globalVars.siteURL+'EventsCalls.php?function=eventgallery&id='+$stateParams.Event_id;
            
            $http.get(gallery_url).then(function(data){
                                        
                                        $scope.GalleryList=typeof(data.data) == "object" ? data.data : [];
                                        
                                      
                                        
                                       $rootScope.miniLoader=false;
                                       });
            
            
            
            }
           
           
           
            $ionicPlatform.onHardwareBackButton(function(e){});
           
            
            
            })
.controller('EventSearchController', function($scope, $state, $rootScope,globalVars,$ionicPlatform,androidServices,$ionicScrollDelegate,EventsServerCalls,EventVars,$stateParams,$http,$ionicModal){
            
            $scope.EventSearchText =  EventVars.Temp_SearchKey ;
            
            $scope.EventSearchlist = EventVars.Temp_SearchList ;
            
             $scope.isNumber = angular.isNumber;
            
            $scope.EventLoadmore = 15;
            
            $scope.Device_lat = 0;
            $scope.Device_lng = 0;
            
            
            if($rootScope.purposeeventHome_click != 'Filter'){
            
            setTimeout( function () {
                      
                       document.activeElement.blur();
                       $("#eventsearch_id").focus();
                       
                       }, 500);
            
            }
            
            $scope.inputclicked=function(){
            document.activeElement.blur();
            $("#eventsearch_id").focusout().focus();
            };
            
            
            $scope.gotohomeview=function(){
            
            EventVars.Temp_SearchKey = "";
            
            EventVars.Temp_SearchList =[];
            
            $state.go('menuView.EventsHome');
            
            };
            
            
            $scope.EventsearchClick=function(txt){
            if(txt.length >= 3){
            InitSearchFunction(txt);
            }
            };
            $scope.Eventsearchkeyup=function(event){
            if(event.keyCode==13){
            $scope.EventsearchClick($scope.EventSearchText);
            }
            else{
            }
            };
            $scope.eventDetailnav=function(id,index){
            $rootScope.miniLoader=true;
            EventsServerCalls.EventDetail(id).then(function(data){
                                                   EventVars.EventDetailData=data.data;
                                                   $rootScope.miniLoader=false;
                                                   $state.go('menuView.EventDetail');
                                                   })
            };
            $scope.eventpopular =function(bar,event){
            $(".popularEvents").show();
            $(".nearEvents").hide();
            $(".recentEvents").hide();
            $('.barbuttonselted').removeClass('barbuttonselted');
            $(event.currentTarget).addClass('barbuttonselted');
            
            $ionicScrollDelegate.scrollTop();
            };
            
            $scope.eventnear =function(bar,event){
            
            $(".popularEvents").hide();
            $(".nearEvents").show();
            $(".recentEvents").hide();
            $('.barbuttonselted').removeClass('barbuttonselted');
            $(event.currentTarget).addClass('barbuttonselted');
            
            $ionicScrollDelegate.scrollTop();
            };
            
            $scope.eventrecent =function(bar,event){
            
            $(".popularEvents").hide();
            $(".nearEvents").hide();
            $(".recentEvents").show();
            $('.barbuttonselted').removeClass('barbuttonselted');
            $(event.currentTarget).addClass('barbuttonselted');
            $ionicScrollDelegate.scrollTop();
            };
            
            $scope.Eventserachloadmore=function(){
            $scope.EventLoadmore=$scope.EventLoadmore+15;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            };
            $scope.Eventkeypress=function(event){
            
            $scope.EventSearchlist = [];
            
            EventVars.Temp_SearchList=$scope.EventSearchlist;
            
            EventVars.Temp_SearchKey = "";
            };
            
            var watchID=null;
            watchID = navigator.geolocation.getCurrentPosition(function(position) {
                                                               $rootScope.ADDLocation_Data=position;
                                                            
                                                               $scope.Device_lat = position.coords.latitude;
                                                               $scope.Device_lng = position.coords.longitude;
                                                               
                                                               },
                                                               function(err){});
            function clearWatch() {
            
                      if (watchID != null) {
            
                      navigator.geolocation.clearWatch(watchID);
                      watchID = null;
            }
            
            }
            
            clearWatch();
            function InitSearchFunction(txt){
            $rootScope.miniLoader=true;
            EventsServerCalls.EventSearchHome(txt)
                             .then(function(data){
                                   $scope.EventSearchlist = typeof(data.data) == "object" ? finalEventdata(data.data) : [];
                                   
                                   EventVars.Temp_SearchList=$scope.EventSearchlist;
                                   
                                   EventVars.Temp_SearchKey = txt;
                                   
                                    $rootScope.miniLoader=false;
                                   
                                    if($scope.EventSearchlist.length > 0){
//                                   $scope.EventSearchlist.sort(function(a,b){
//                                                               
//                                                              return eventlistsorting ('popular',a,b);
//                                                               });
                                   }
                                  
                                   
                                   
                                   if($scope.EventSearchlist.length == 0){
                                   androidServices.showToast('No Events found with this  '+ txt +'  keyword');
                                   }
                                   },
                                   function(err){
                                   
                                   });
            
            
            
            }
            
            
            function finalEventdata(dataSet){
            
            angular.forEach(dataSet, function(v, k){
                            
                            
                            
                            
                            var curLat = parseFloat(v.lat);
                            
                            var curLng = parseFloat(v.lng);
                            
                            var DeviceLat = $scope.Device_lat == 0 ? globalVars.currentlat : $scope.Device_lat;
                            
                            var DeviceLng = $scope.Device_lng == 0 ? globalVars.currentlng : $scope.Device_lng;
                            
                            dataSet[k].view_count = parseInt(v.view_count);
                           
                            if(curLat > 0 && curLng > 0){
                            
                            var dist = globalVars.calcDistance(curLat, curLng, parseFloat(DeviceLat), parseFloat(DeviceLng));

                         // console.log(dist+"dist");

                            var find_distance = (Math.round(dist * 10) / 10);

                          //  console.log(find_distance+"find_distance");
                            
                            dataSet[k].distance =isNaN(find_distance) == true ? 9999999 : find_distance;
                            
                            
                            
                            }
                            
                            else{
                            
                            dataSet[k].distance = 9999999;
                            
                            }
                            
                            });
            $rootScope.miniLoader=false;
            
            return dataSet;
            
            }
            
            
            /*===========event filter functionality start here ================*/
            
            
            
            $ionicModal.fromTemplateUrl('eventFilter.html', {
                                        scope: $scope,
                                        animation: 'slide-in-up'
                                        }).then(function(modal) {
                                                $scope.modal = modal;
                                                });
            $scope.choosedateDiv=true;
            $scope.ChooseDateText= "All Dates";
            $scope.defaultdatecheck=true;
            $scope.EventCatID=0;
            $scope.eventcatstxt= "All Categories";
            $scope.eventis_free= "";
            $scope.freechcked =false;
            
            $scope.filterData={
            
            fromDate:"",
            toDate:""
            
            };
            
            $scope.data={
            
            remember : false,
            choosedateDiv:true,
            ChooseDateText: "All Dates",
            defaultdatecheck:true,
            eventcatstxt: "All Categories",
            eventis_free:"",
            };
         
            
            $scope.OpenfilterView=function(event){
            
             $scope.EventSearchText = "";
            EventVars.Temp_SearchKey ="";
            
            
            $scope.eventcathide=false;
            
            $scope.modal.show();
           
            EventsServerCalls.EventCats().then(function(data){
                  
                  $scope.EventCatArray=data.data;
                  
                  },
                  function(err){
                  
                  });
         
            
            };
            
            $scope.FreeEventclick=function(event){
            };
           
            
            $scope.chooseDateclick=function(txt,event){
            
            $scope.ChooseDateText = txt;
            
            if(txt !="Choose Date"){
              $scope.data.choosedateDiv=true;
            }
            else{
            
             $scope.data.choosedateDiv = !$scope.data.choosedateDiv;
            }
           
           
            
           
            };
            
            $scope.choseCatfromlist=function(data,event){
            
            
            $scope.data.eventcatstxt=data.name;
            
            $scope.data.EventCatID =data.id;
            
            
            };
            
            $scope.FilterApplyclick=function(){
            var is_free=  $scope.data.remember == false? "" : "free";
            //  alert( $scope.data.eventis_free);
             // alert( is_free);
            var dates_validation = false;
            var dates_validation_text = "";
            
            
            
            if($scope.data.ChooseDateText == "Choose Date"){
            
           
            if($scope.filterData.fromDate == ""  && $scope.filterData.toDate == ""){
            
            dates_validation=true;
            
            dates_validation_text ="From date and To date should filled...";
            
            }
            
            else if( $scope.filterData.fromDate != "" && $scope.filterData.toDate == ""){
            
            dates_validation=true;
            
            dates_validation_text =" To date should filled...";
            }
            
            else if( $scope.filterData.toDate != "" && $scope.filterData.fromDate  == ""){
            
            dates_validation=true;
            
            dates_validation_text =" From date should filled...";
            }
            
            else if( $scope.filterData.toDate < $scope.filterData.fromDate){
            
            dates_validation=true;
            
            dates_validation_text =" To date should be greater than From date...";
            
            }
            
//            else if( $scope.filterData.toDate  == $scope.filterData.fromDate){
//            
//            dates_validation=true;
//            
//            dates_validation_text ="From date and To date should not same...";
//            
//            }
            else{
            dates_validation=false;
            dates_validation_text="";
            }
            
            }
            else{
            
            
            dates_validation=false;
            dates_validation_text="";
            }
            
            if(dates_validation==false){
            
            if( $scope.data.eventcatstxt == "All Categories"){
            EventsServerCalls.EventFilterWillAllCats($scope.data.ChooseDateText,$scope.filterData.fromDate,$scope.filterData.toDate, is_free)
            .then(function(data){
                  $scope.EventSearchlist = typeof(data.data) == "object" ? finalEventdata(data.data) : [];
                  EventVars.Temp_SearchList=$scope.EventSearchlist;
                  if($scope.EventSearchlist.length == 0){
                  androidServices.showToast('No Events found');
                  }
                  else{
                  $scope.modal.hide();
                  $scope.data={
                  remember : false,
                  choosedateDiv:true,
                  ChooseDateText: "All Dates",
                  defaultdatecheck:true,
                  eventcatstxt: "All Categories",
                  eventis_free:"",
                  };
                  $('.barbuttonselted').removeClass('barbuttonselted');
                  $("#search_event_pop").addClass('barbuttonselted');
                $ionicScrollDelegate.scrollTop();
                  }
                  },
                  function(err){
                  });
            }
            
            else{
            EventsServerCalls.EventFilterWillCat($scope.data.ChooseDateText,$scope.filterData.fromDate,$scope.filterData.toDate,$scope.data.EventCatID, is_free)
            .then(function(data){
                  $scope.EventSearchlist = typeof(data.data) == "object" ? finalEventdata(data.data) : [];
                  EventVars.Temp_SearchList=$scope.EventSearchlist;
                  if($scope.EventSearchlist.length == 0){
                  androidServices.showToast('No Events found');
                  }
                  else{
                  $scope.modal.hide();
                  $scope.data={
                  remember : false,
                  choosedateDiv:true,
                  ChooseDateText: "All Dates",
                  defaultdatecheck:true,
                  eventcatstxt: "All Categories",
                  eventis_free:"",
                  };
                  $('.barbuttonselted').removeClass('barbuttonselted');
                  $("#search_event_pop").addClass('barbuttonselted');
                   $ionicScrollDelegate.scrollTop();
                  }
                  },
                  function(err){
                  });
            }
            }
            else{
             androidServices.showToast(dates_validation_text);
            }
            };
            
            //Cleanup the modal when we're done with it!
//            $scope.$on('$destroy', function() {
//                       $scope.modal.remove();
//                       });
            
            
            })
.controller('EventEnquiryController', function($scope, $state, $rootScope,globalVars,$ionicPlatform,androidServices,$ionicScrollDelegate,EventsServerCalls,EventVars,$stateParams,$http){
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
             $state.go($rootScope.$viewHistory.backView.stateName);
            
            };
            function cleanScope(){
            $scope.formEntry = {
            uname  : undefined,
            email   : undefined,
            number: undefined,
            msg   : undefined
            };
            }
            
            $scope.sendEnquiry=function(){
            
            EventsServerCalls.sendEnquiry($stateParams.Event_id,$scope.formEntry.uname, $scope.formEntry.email, $scope.formEntry.number, $scope.formEntry.msg).then(function(data){
                                $rootScope.miniLoader = false;
                                var trimData = data.data.trim();
                                                                                                                                                                    
                                var post_data = {
                                        EventEnquiry : {
                                            event_id : $stateParams.Event_id ,
                                            slug :$stateParams.slug,
                                            event_slug :$stateParams.slug,
                                            enquirer_phonenumber : $scope.formEntry.number,
                                            enquirer_name: $scope.formEntry.number,
                                            enquirer_email:$scope.formEntry.email,
                                            enquirer_message:$scope.formEntry.msg,
                                            event_email: $stateParams.Event_mail
                                                                                                                                                                    
                                            }
                                        };
                                                                                                                                                                    
                                                                                                                                                                    
                        var compiledData = globalVars.MainklURl+'MobileEmail/Event_send_enquiry';
                  
                                                                                                                                                                    
                                if(trimData == 'saved'){
                               $http.post(compiledData, post_data).success(function(data){});
                                $scope.goBackToDetail();
                                }
                    else {
                  //  $scope.showAlert("Rate this Failed", "There was an issue rating this business, please try again", false);
                        }
                        }, function(err){
                   // $scope.showAlert("Posting Failed", "There was an issue rating this business, please try again", false);
                    });
            }
            
            });





function eventlistsorting(type,a,b){


    switch (type){
    
    
        case 'recent' :
            
            
            return b.start_date - a.start_date;
            
            
            break;
            
            
        case 'popular' :
            
             return parseInt(b.view_count - a.view_count);
            
            
            break;
            
            
        case 'near' :
            
             return a.distance - b.distance;
            
            break;
    
    
    
    }
    
    




}



function checkingGoing(LoggedUser,EventPeople){
   
    if(EventPeople !=null || EventPeople !=undefined && LoggedUser != 0){
    
        if(EventPeople.length !=0 && LoggedUser != 0){
  var checkeddata= JSON.parse(JSON.stringify(JSON.find({data:EventPeople,criteria:[{elementName:"user_id",elementValue:LoggedUser}]})));
 
                  
            if( checkeddata != null && checkeddata.type == 'going'){
            
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
    
      return false;
    }
    
};

function EventCustomDateChange(date,platform){
    var start_date_time = date.start_date +' '+date.start_time ;
    
     var end_date_time = date.end_date +' '+date.end_time ;
    
    if(start_date_time == end_date_time){
        
    var d1 = platform == "ios" ? new Date(start_date_time.replace(' ', 'T')) : new Date(date);
      
    var d2 = platform == "ios" ? new Date(end_date_time.replace(' ', 'T')) : new Date(date);
        
        var n = d1.toDateString();
        
        return n.substr(3,n.length);
        
    }
    else{
        var d1 = platform == "ios" ? new Date(start_date_time.replace(' ', 'T')) : new Date(date);
        
        var d2 = platform == "ios" ? new Date(end_date_time.replace(' ', 'T')) : new Date(date);
        var n = d1.toDateString();
        return n.substr(3,n.length);

    
    }
    
}

function EventDatedifference(eventDate){
    if(eventDate.length > 0){
        var currentDate= eventDate[0].Today;
        for(var i=0; i < eventDate.length ; i++){
            if(  eventDate[i].start_date >=currentDate ){
                
                 var date2 = new Date(currentDate);
                    var date1 = new Date( eventDate[i].start_date);
                    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                    var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
                
                if(dayDifference == 0){ return "Today"; }
                else if(dayDifference == 1){ return "Tomorrow"; }
                else{return dayDifference +"  "+"Days from Now"; }
            }
            else{
              
            
            
            }
        }
    }
    else{
        return -1;
    }
}


function EventCompleteCheck(eventDate){
    if(eventDate.length > 0){
        var currentDate= eventDate[0].Today;
        
        var currentTime =eventDate[0].Today_time
        
      
       for(var i=0; i < eventDate.length ; i++){
            if( currentDate <= eventDate[i].end_date ){
             
                
               if(currentDate ==  eventDate[i].end_date && currentTime >   eventDate[i].end_time){
                
                  
                }
                else{
                
                 return 'going on';
                    
                }
                
                
               
            }
            else{
            
          
            }
        }
    }
    else{
        return -1;
    }
}

function Dateformating(format) {
    var day   = parseInt(format.substring(0,2));
    var month  = parseInt(format.substring(3,5));
    var year   = parseInt(format.substring(6,10));
    var date = new Date(year, month-1, day);
    return date;
}


function FilterByFree(free,data){
    return JSON.parse(JSON.stringify(JSON.find({data:data,criteria:[{elementName:"is_free",elementValue:free}]})));
}


