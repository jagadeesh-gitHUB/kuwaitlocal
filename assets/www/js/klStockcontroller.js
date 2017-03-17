angular.module('klStock.controllers',[])

.controller('ExchangeRateController', function($scope,$ionicPlatform,$ionicViewService,$state,globalVars,$rootScope,$http,$ionicModal,$ionicPopup,globalDataTemp,businessDetailData,$ionicScrollDelegate,$cordovaSocialSharing,localStorageService,androidServices){
            analytics.trackView('Kuwaitlocal Exchange Rates view');
            $ionicScrollDelegate.scrollTop();
            $scope.MainUrl= globalVars.siteURL;
            $scope.Exchange_commets=[];
            $scope.temp_Exchange_commets=[];
            $scope.userlog=globalVars.MainklURl+'img/users/user_logo_folder';
            $scope.check_gustornot=globalVars.userInfo.id == undefined? true:false;
            $scope.postcomnet={
            comment:""
            };
            $rootScope.miniLoader=true;
            $http.get($scope.MainUrl+"Goldrate_Exchange.php?function=ExchangeRateData").then(function(data){
                                    $scope.exchnage_List=data.data;
                                    $rootScope.miniLoader=false;
                                     });
                          $scope.user_enterRateValue=1;
            $scope.data = {
            repeatSelect: null,
            availableOptions :[
                               {country:'INR',id:1,logo:'img/countries/inr.png',fav:false},
                               {country:'EGP',id:2,logo:'img/countries/egp.png',fav:false},
                               {country:'PKR',id:3,logo:'img/countries/pkr.png',fav:false},
                               {country:'PHP',id:4,logo:'img/countries/php.png',fav:false},
                               {country:'BDT',id:5,logo:'img/countries/bdt.png',fav:false},
                               {country:'NPR',id:6,logo:'img/countries/np.png',fav:false},
                               {country:'LKR',id:7,logo:'img/countries/slr.png',fav:false},
                               {country:'USD',id:8,logo:'img/countries/usd.png',fav:false},
                               {country:'GBP',id:9,logo:'img/countries/gbp.png',fav:false},
                               {country:'AUD',id:10,logo:'img/countries/aud.png',fav:false},
                               
                               ]};
            $scope.temp_flag_id = localStorageService.get('kl.fav_flag_id') == null ?  -1 : localStorageService.get('kl.fav_flag_id');
            
            $scope.data.repeatSelect =localStorageService.get('kl.fav_flag') == null ?  $scope.data.availableOptions[0].country : localStorageService.get('kl.fav_flag');
            $scope.data.repeatSelect_logo =localStorageService.get('kl.fav_flag_logo') == null ? $scope.data.availableOptions[0].logo : localStorageService.get('kl.fav_flag_logo');
            $scope.data.repeatSelect_id =localStorageService.get('kl.fav_flag_id') == null ?  $scope.data.availableOptions[0].id : localStorageService.get('kl.fav_flag_id');
            $ionicModal.fromTemplateUrl('exchangeCountries.html', {
                                        scope: $scope,
                                        animation: 'slide-in-up'
                                        }).then(function(modal) {
                                        $scope.modal = modal;
                                        });
            $scope.curreny_code_locator={
            //code : $scope.exchnage_List,
            };
            
            $http.get($scope.MainUrl+"Goldrate_Exchange.php?function=Branchexchangelist").then(function(data){
                                                                                               $scope.curreny_code_locator.code=data.data;
                                                                                               });
            
            
            $scope.openCountries=function(){
            analytics.trackEvent('Exchange Rates','Click on country drop down ','Navigate to modal  list view',100);
            $scope.modal.show();
            };
            $scope.cityclosemodalview=function(){
            
            analytics.trackEvent('Exchange Rates','Click on country drop down ','close  modal  list view',100);
            $scope.modal.hide();
           };
            $scope.selectcounrty=function(item,index){
            analytics.trackEvent('Exchange Rates','Click on country  ','select country and close the modal view and change the grid data ',100);
            $scope.data.repeatSelect =item.country;
            $scope.data.repeatSelect_logo =item.logo;
            $scope.data.repeatSelect_id =item.id;
            $scope.user_enterRateValue =1;
            $scope.cityclosemodalview();
             $ionicScrollDelegate.scrollTop();
            
            
            
            };
            
            $scope.exchangeLocatorClick=function(){
             analytics.trackEvent('Exchange Rates','Click on exchange locator  ','open pop up for curreny exchange locator ',100);
           
            
          /*  $http.get($scope.MainUrl+"Goldrate_Exchange.php?function=Branchexchangelist").then(function(data){
                                                      $scope.curreny_code_locator.code=data.data;
                                                                                                                                                       });*/
            
            $ionicPopup.show({
                             templateUrl: 'exchangeLocator.html',
                             title: 'Curreny Exchange Locator',
                             scope: $scope,
                             buttons: [
                                       { text: 'Cancel' },
                                       {
                                       text: '<b>Locate</b>',
                                       type: 'button-positive',
                                       onTap: function(e) {
                                        analytics.trackEvent('Exchange Rates','Click on locator  ','Navigate to business detail view ',100);
                                       var branch_link = $scope.curreny_code_locator.branch_link.split('/')[4];
            $http.get($scope.MainUrl+"Goldrate_Exchange.php?function=businesslocator_view&link="+branch_link+"&currentuserid="+globalVars.userInfo.id).then(function(data){
            var id=data.data[0].id;
            businessDetailData.fetchDetails(id,globalVars.userInfo.id).then(function (data) {
                                globalDataTemp.setCurrentBID(id);
                                globalDataTemp.setCurrentBusinessDetail(data.data[0]);
                                $rootScope.miniLoader = false;
                                $state.go('menuView.detailView');
                                                                });
                                                                });} }]});
            };
            $scope.changedexchangerate=function(){
            $http.get($scope.MainUrl+"Goldrate_Exchange.php?function=BranchLocatorlist&exchange_rate="+$scope.curreny_code_locator.exchange_rate).then(function(data){
                    $scope.curreny_code_locator.branch=data.data;
            });
            };
            ExchangeRateComemts();
            function ExchangeRateComemts(){
            $http.get($scope.MainUrl+"Goldrate_Exchange.php?function=ExchangeRatesComments").then(function(data){
                                                                                                  if(typeof(data.data)=="object"){
                                 $scope.Exchange_commets=data.data.slice(0,5);
                                 $scope.temp_Exchange_commets=data.data;
                     if($scope.temp_Exchange_commets.length >5 ){
                     $("#loadMore").show();
                                        }
                       else{
                        $("#loadMore").hide();
                                    }
                                    }
                                });
            }
            $scope.loadmoreAdComments=function(event){
            var load_AdsComments=$scope.temp_Exchange_commets.slice($scope.Exchange_commets.length,$scope.Exchange_commets.length+5);
            $scope.Exchange_commets=$scope.Exchange_commets.concat(load_AdsComments);
            if($scope.Exchange_commets.length == $scope.temp_Exchange_commets.length){
            $(event.currentTarget).hide();
            }
            else{
            $(event.currentTarget).show();
            }
            };
            
            $scope.ExchangeComments=function(){
            //  Getblogcommentsin();
            if($scope.check_gustornot == true){
            sessionStorage.Gust_generalID=globalVars.formumdetails.id;
            sessionStorage.Gust_Class="ExchangeRate";
            var SendParams={
            Gust_data: sessionStorage.Gust_generalID+"_"+"ExchangeRate",
            previous_state:$state.current.name
            };
            
            analytics.trackEvent('Exchange Rates', 'Click on Post Comment', 'Navigate to Gust user comment view', 100);
            
            $state.go("menuView.Gustcomment", {params:SendParams});
            }
            else{
            
            cordova.plugins.Keyboard.show();
           
            
            analytics.trackEvent('Exchange Rates', 'Click on Post Comment', 'Open a pop up for post comment', 100);
            
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
                                                     
                                                     var url=globalVars.siteURL+'Goldrate_Exchange.php?function=postexchageratecomment&userid='+globalVars.userInfo.id+'&comment='+$scope.postcomnet.comment+'&active='+1+'&date='+new Date();
                                                     
                                                     $http.get(url).then(function(data){
                                                                         
                                                                         $scope.postcomnet.comment="";
                                                                         
                                                                         ExchangeRateComemts();
                                                                         
                                                                         },function(err){
                                                                         
                                                                         });
                                                     }
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     
                                                     }}]});
            }
            };
           
            $scope.exchangerateSubscribe=function(){
            
            $scope.subdata={
            
            sub_email : ""
            };
            var myPopup =$ionicPopup.show({
                                           template: '<input type="email" ng-model="subdata.sub_email"/>',
                                           title: 'Enter Your Email ',
                                           // subTitle: 'Please use normal things',
                                           scope: $scope,
                                           buttons: [
                                                     { text: 'Cancel' },
                                                     {
                                                     text: '<b>Subscribe</b>',
                                                     type: 'button-positive',
                                                     onTap: function(e) {
                                                     
                                                     if (!$scope.subdata.sub_email) {
                                                     //don't allow the user to close unless he enters wifi password
                                                     e.preventDefault();
                                                     } else {
                                                     //return $scope.data.wifi;
                                                     var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                                                     var textmail=re.test($scope.subdata.sub_email);
                                                     
                                                     if(textmail){
                                                 //   alert(textmail);
                                                     var enter_mail=$scope.subdata.sub_email;
                                                   //  alert(enter_mail);
                                                     var url=globalVars.siteURL+'Goldrate_Exchange.php?function=exchangeemailSub&name='+enter_mail.split('@')[0]+'&email='+enter_mail;
                                                     
                                                     $http.get(url).then(function(data){
                                                                         
                                                                         //$scope.postcomnet.comment="";
                                                                         
                                                                        // ExchangeRateComemts();
                                                                         
                                                                         androidServices.showToast("You have successfully subscribed");
                                                                         
                                                                         },function(err){
                                                                         
                                                                         });
                                                     
                                                     }
                                                     
                                                     }
                                                     }
                                                     }
                                                     ]
                                           });
            
            };
            
            $scope.exchangerateshare=function(){
            
           
            analytics.trackEvent('Exchange Rates', 'Click on Share icon ', 'share Kuwait local exchange rate link ', 100);
            $cordovaSocialSharing.share(" ","share Kuwait local exchange rate", "", "http://www.kuwaitlocal.com/exchange_rates_in_kuwait") // Share via native share sheet
            .then(function(result) { }, function(err) {
                  // An error occured. Show a message to the user
                  });
           
            };
            
            
            
            $scope.makefavority=function(item,index){
            
           // alert(item);
            
             localStorageService.set('kl.fav_flag', item.country);
             localStorageService.set('kl.fav_flag_id', item.id);
             localStorageService.set('kl.fav_flag_logo', item.logo);
            
            $scope.data.repeatSelect =item.country;
            $scope.data.repeatSelect_logo =item.logo;
            $scope.data.repeatSelect_id =item.id;
            $scope.user_enterRateValue =1;
            $scope.cityclosemodalview();
            $ionicScrollDelegate.scrollTop();
            
            
            $scope.temp_flag_id = localStorageService.get('kl.fav_flag_id') == null ?  -1 : localStorageService.get('kl.fav_flag_id');
            
            $scope.data.repeatSelect =localStorageService.get('kl.fav_flag') == null ?  $scope.data.availableOptions[0].country : localStorageService.get('kl.fav_flag');
            $scope.data.repeatSelect_logo =localStorageService.get('kl.fav_flag_logo') == null ? $scope.data.availableOptions[0].logo : localStorageService.get('kl.fav_flag_logo');
            $scope.data.repeatSelect_id =localStorageService.get('kl.fav_flag_id') == null ?  $scope.data.availableOptions[0].id : localStorageService.get('kl.fav_flag_id');
            
            };
            
            })

.controller('GoldRateController', function($scope,$ionicPlatform,$ionicViewService,$state,globalVars,$rootScope,$http,$ionicModal,$ionicPopup,globalDataTemp,businessDetailData,$ionicScrollDelegate,$cordovaSocialSharing,localStorageService,androidServices){

        analytics.trackView('Kuwaitlocal Gold Rates view');
            $ionicScrollDelegate.scrollTop();
            $scope.MainUrl= globalVars.siteURL;
            $scope.goldrate_commets=[];
            $scope.temp_goldrate_commets=[];
            $scope.userlog=globalVars.MainklURl+'img/users/user_logo_folder';
            $scope.check_gustornot=globalVars.userInfo.id == undefined? true:false;
            $scope.postcomnet={
            comment:""
            };
            $rootScope.miniLoader=true;
            $scope.gold_content_cls=true;
            
            $gold_pricelist_today = [];
            $scope.gold_rates_list_all=[];
            $scope.chart_yaxis = [];
            $scope.chart_xaxis=[];
            $scope.chart_data=[];
            $scope.select_goldname="1 Gold Ounce";
            
            
            $scope.carat_name=[
                               {carat:24,gold_name:'1 Gold Gram Carat 24'},
                               {carat:22,gold_name:'1 Gold Gram Carat 22'},
                               {carat:21,gold_name:'1 Gold Gram Carat 21'},
                               {carat:18,gold_name:'1 Gold Gram Carat 18'}
                               ];
            
           
            $http.get($scope.MainUrl+"Goldrate_Exchange.php?function=GoldRateslist").then(function(data){
                                            $scope.gold_pricelist_today = data.data.today_price;
                                            $scope.gold_rates_list_all=data.data.All_price;
                                            $scope.gold_rates_monthlist_all=data.data.one_Month_price;
                                        $scope.gold_pricelist_today_date=data.data.one_Month_price[0].created;
                                        $scope.shop_locator=data.data.shop_locator;
                                        angular.forEach($scope.gold_rates_list_all,function(index,key){
                                                        $scope.chart_yaxis.push(parseInt(index.gold_ounce));
                                                        $scope.chart_xaxis.push(ratesCustomDateChange(index.created,'ios'));
                                                        $scope.chart_data.push([ratesCustomDateChange(index.created,'ios'),parseInt(index.gold_ounce)]);
                                                        });
                                                $('#container').highcharts('StockChart', {
                                                                           colors: ['#ff5706'],
                                                                           chart: {
                                                                           //	borderRadius: 20,
                                                                           backgroundColor: {
                                                                           linearGradient: [0, 0, 0, 300],
                                                                           stops: [[0, 'rgb(88, 85, 75)'],[1, 'rgb(0, 0, 0)'] ]
                                                                           },
                                                                           },
                                                                           rangeSelector: {
                                                                                           allButtonsEnabled: true,
                                                                                           buttonTheme: { // styles for the buttons
                                                                                           fill: 'none',
                                                                                          stroke: 'none', 'stroke-width': 0, r: 8,
                                                                           style: {
                                                                                   color: '#fff',
                                                                                   fontWeight: 'bold'
                                                                               },
                                                                           states: {
                                                                           hover: {
                                                                           style: {
                                                                           color: 'red'
                                                                           }
                                                                           },
                                                                           select: {
                                                                           fill: '#fff',
                                                     style: {
                                                     color: '#969696'
                                                     }
                                                     }
                                                     }
                                                     },
                                                     inputBoxBorderColor: 'grey',
                                                     inputBoxWidth: 120,
                                                     inputBoxHeight: 18,
                                                     inputStyle: {
                                                     color: 'grey',
                                                     fontWeight: 'bold'
                                                     },
                                                     labelStyle: {
                                                     color: 'silver',
                                                     fontWeight: 'bold'
                                                     },
                                                     selected: 0
                                                     },
                                                     title: {
                                                     text: 'Gold Price KWD/ Ounce',
                                                     style: {
                                                     color: '#fff',
                                                     fontWeight: 'bold'
                                                     }
                                                     },
                                                     subtitle: {
                                                     text: ''
                                                     },
                                                     series: [{
                                                              name: 'Gold Price in KWD per Ounce',
                                                              data: $scope.chart_data
                                                              }]
                                                     });
                                                                                          
                                                                                $("text:last").hide();
                                                                                          $rootScope.miniLoader=false;
                                                                                          $scope.gold_content_cls=false;
                                                                                          });
            $scope.goldCreatedDate=function(data){
            return   createdDateChange(data,'ios');
            };

            var shop_locator_pop_close_btn="Gold Shop Locator";
            
            

            $scope.goldshopop=function(){
            analytics.trackEvent('Exchange Rates','Click on exchange locator  ','open pop up for curreny exchange locator ',100);
            $scope.curreny_code_locator={
            code : $scope.exchnage_List,
            };
            $scope.shop_locator_name= null;
            
        var shop_locator_pop = $ionicPopup.show({
                               title: shop_locator_pop_close_btn,                 
                             templateUrl: 'goldshoLocator.html',
                            
                             cssClass:'Locator-class',
                             scope: $scope,
                             buttons: [
                                       { text: 'Cancel' },
                                       {
                                       text: '<b>Locate</b>',
                                       type: 'button-positive',
                                       onTap: function(e) {
                                       
                                      
                                       
                                       analytics.trackEvent('Exchange Rates','Click on locator  ','Navigate to business detail view ',100);
                                       if($scope.curreny_code_locator.branch_link != undefined){
                                       var branch_link = $scope.curreny_code_locator.branch_link.split('/')[4];
                                      
                                       
                                       $http.get($scope.MainUrl+"Goldrate_Exchange.php?function=businesslocator_view&link="+branch_link+"&currentuserid="+globalVars.userInfo.id).then(function(data){
                                                                                                                                                                                       var id=data.data[0].id;
                                                                                                                                                                                       businessDetailData.fetchDetails(id,globalVars.userInfo.id).then(function (data) {
                                                                                                                                                                                                                                                       globalDataTemp.setCurrentBID(id);
                                                                                                                                                                                                                                                       globalDataTemp.setCurrentBusinessDetail(data.data[0]);
                                                                                                                                                                                                                                                       $rootScope.miniLoader = false;
                                                                                                                                                                                                                                                       $state.go('menuView.detailView');
                                                                                                                                                                                                                                                       });
                                                                                                                                                                                       });
                                       
                                       }
                                       else{
                                     //  $(".popup").effect( "shake", {}, "fast" );
                                       //shop_locator_pop.show();
                                       
                                       androidServices.showToast("Please Select shop and branch before click locate button.......");
                                       
                                       }
                                       } }]});
            };
            
           
            
            $scope.shoplocatorclsbtn=function(){
            
            
            
            };
            
            
          
            
            GoldRateComemts();
            function GoldRateComemts(){
            $http.get($scope.MainUrl+"Goldrate_Exchange.php?function=goldRatesComments").then(function(data){
                                                                                                  if(typeof(data.data)=="object"){
                                                                                                  $scope.gold_commets=data.data.slice(0,5);
                                                                                                  $scope.temp_gold_commets=data.data;
                                                                                                  if($scope.temp_gold_commets.length >5 ){
                                                                                                  $("#loadMore").show();
                                                                                                  }
                                                                                                  else{
                                                                                                  $("#loadMore").hide();
                                                                                                  }
                                                                                                  }
                                                                                                  });
            }
            $scope.goldloadmoreAdComments=function(event){
            var load_AdsComments=$scope.temp_gold_commets.slice($scope.gold_commets.length,$scope.gold_commets.length+5);
            $scope.gold_commets=$scope.gold_commets.concat(load_AdsComments);
            if($scope.gold_commets.length == $scope.temp_gold_commets.length){
            $(event.currentTarget).hide();
            }
            else{
            $(event.currentTarget).show();
            }
            };
//
            $scope.GoldComments=function(){
            //  Getblogcommentsin();
            if($scope.check_gustornot == true){
            sessionStorage.Gust_generalID=globalVars.formumdetails.id;
            sessionStorage.Gust_Class="GoldPrice";
            var SendParams={
            Gust_data: sessionStorage.Gust_generalID+"_"+"GoldPrice",
            previous_state:$state.current.name
            };

            analytics.trackEvent('Exchange Rates', 'Click on Post Comment', 'Navigate to Gust user comment view', 100);

            $state.go("menuView.Gustcomment", {params:SendParams});
            }
            else{

            cordova.plugins.Keyboard.show();

            analytics.trackEvent('Exchange Rates', 'Click on Post Comment', 'Open a pop up for post comment', 100);

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

                                                     var url=globalVars.siteURL+'Goldrate_Exchange.php?function=postgoldratecomment&userid='+globalVars.userInfo.id+'&comment='+$scope.postcomnet.comment+'&active='+1+'&date='+new Date();

                                                     $http.get(url).then(function(data){

                                                                         $scope.postcomnet.comment="";

                                                                         GoldRateComemts();

                                                                         },function(err){

                                                                         });
                                                     }






                                                     }}]});
            }
            };

            $scope.goldsubscribepop=function(){

            $scope.subdata={

            sub_email : ""
            };
            var myPopup =$ionicPopup.show({
                                             template: '<input type="email" ng-model="subdata.sub_email"/>',
                                          title: 'Enter Your Email ',
                                        //  cssClass:'my-custom-popup',
                                          // subTitle: 'Please use normal things',
                                          scope: $scope,
                                          buttons: [
                                                    { text: 'Cancel' },
                                                    {
                                                    text: '<b>Subscribe</b>',
                                                    type: 'button-positive',
                                                    onTap: function(e) {

                                                    if (!$scope.subdata.sub_email) {
                                                    //don't allow the user to close unless he enters wifi password
                                                    e.preventDefault();
                                                    } else {
                                                    //return $scope.data.wifi;
                                                    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                                                    var textmail=re.test($scope.subdata.sub_email);

                                                    if(textmail){
                                                    //   alert(textmail);
                                                    var enter_mail=$scope.subdata.sub_email;
                                                    //  alert(enter_mail);
                                                    var url=globalVars.siteURL+'Goldrate_Exchange.php?function=goldemailSubscribe&name='+enter_mail.split('@')[0]+'&email='+enter_mail;

                                                    $http.get(url).then(function(data){

                                                                        //$scope.postcomnet.comment="";

                                                                        // ExchangeRateComemts();
                                                                              androidServices.showToast("You have successfully subscribed");

                                                                        },function(err){

                                                                        });

                                                    }

                                                    }
                                                    }
                                                    }
                                                    ]
                                          });
            
            
           
           
            };
            
            
            $scope.goldcalculatorpop=function(){
            
           $scope.gold_carat = null;
            $scope.user_number="";
            
            
            
            
            var myPopup =$ionicPopup.show({
                                          templateUrl: 'goldcalculator.html',
                                          title: 'Gold Price Calculator ',
                                          // subTitle: 'Please use normal things',
                                          scope: $scope,
                                          buttons: [
                                                    { text: 'Cancel' },
                                                    
                                                    ]
                                          });
            
            };
            
            
                        $scope.goldrateshare=function(){


            analytics.trackEvent('Exchange Rates', 'Click on Share icon ', 'share Kuwait local exchange rate link ', 100);
            $cordovaSocialSharing.share(" ","share Kuwait  Gold prices", "", "http://www.kuwaitlocal.com/gold_price_in_kuwait") // Share via native share sheet
            .then(function(result) { }, function(err) {
                  // An error occured. Show a message to the user
                  });

            };
            $ionicModal.fromTemplateUrl('goldmonth.html', {
                                        scope: $scope,
                                        animation: 'slide-in-up'
                                        }).then(function(modal) {
                                                $scope.modal = modal;
                                                });
           
            $scope.cityclosemodalview=function(){
            
            analytics.trackEvent('Exchange Rates','Click on country drop down ','close  modal  list view',100);
            $scope.modal.hide();
            };
            
            $scope.goldmonthpop=function(){
            $scope.modal.show();

            
            };

});


function ratesCustomDateChange(date,platform){
    
    if(date!="" && date != undefined){
        
        
        var d = platform == "ios" ? new Date(date.replace(' ', 'T')) : new Date(date);
        var n = d.toDateString();
        var date_form= n.substr(3,n.length);
        
     
        
        return Date.parse(d);
        
    }
    
    else{
        var n="";
        return n;
    }
    
}



function createdDateChange(date,platform){
    
    if(date!="" && date != undefined){
        
        
        var d = platform == "ios" ? new Date(date.replace(' ', 'T')) : new Date(date);
        var n = d.toDateString();
        var date_form= n.substr(3,n.length);
        
        
        return date_form.substr(0,7);
        
    }
    
    else{
        var n="";
        return n;
    }
    
}











