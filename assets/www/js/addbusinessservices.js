angular.module('addbizservices', [])

.service('bizglobalVars', function(formLoader,globalVars){
   var service ={
       editMode     : false,
       bID          : null,
       haveTrack    : false,
       bizData      : [],
       isPremium    : false,
     //  logoFolder   : 'http://kuwaitlocal.com/img/BusinessLogo/logo_folder/',
       //imagesFolder : 'http://kuwaitlocal.com/img/Business/',
        logoFolder   : globalVars.MainklURl+'img/BusinessLogo/logo_folder/',
         imagesFolder : globalVars.MainklURl+'img/Business/',
       govDataStore : [],
       cityDataStore: [],
       userSetLat   : null,
       userSetLng   : null,
       currentBID   : null,
       setEditMode : function(bID, bool){
           if(bID){
             service.bID = bID;
             service.currentBID = bID;
             service.editMode = true;
           }
       },
       flushEditData : function(){
           service.editMode     = false;
           service.bID          = null;
           service.bizData      = [];
           service.isPremium    = false;
       }
   };
    return service;
})
.service('formLoader', function($rootScope, $http, $q, globalVars){
    var service ={
    govData     : [],
		cityData    : [],
		catData     : [],
    editModeData: [],
    //---------------------------Hardwired Server functions--------------------------------
    liveFunctions : {
    compiledAffURI  : globalVars.siteURL + 'addfreebusiness.php?function=',   //To be replaced later on,
    getGovs         : "governoratesAll",
    getCity         : "citiesAll",
    getCategories   : "leafcategorylist",
    postFormData    : "insertbusiness&details=",
    postEditForm    : "updatebusiness&details=",
    editModeGet     : "business_edit&id=" //GET
        },
            //*-------------------------------Biz title duplicate check-----------------------------*//

            AddBiztitleCheck : function(title,id){
            var bid =  id == null ? "" : id;

                        var compiledURI = globalVars.siteURL+'myprofile.php?function=AndroidBIzDuplicateCheck&title='+title+"&id="+bid;
                        return $http.get(compiledURI)
                            .then(function(data){

                                return data;
                            });
                    },
                 EditBiztitleCheck : function(title,id){
                        var compiledURI = globalVars.siteURL+'myprofile.php?function=EditBIzDuplicateCheck&title='+title+"&id="+id;
                        return $http.get(compiledURI)
                            .then(function(data){

                                return data;
                            });
                    },
        //---------------------------Gets Governorates -----------------------------------------

        getGoverns : function(){
            var compiledURI = service.liveFunctions.compiledAffURI + service.liveFunctions.getGovs;
            return $http.get(compiledURI)
                .then(function(data){
                    service.govData = data;
                    return service.govData;
                });
        },

        //---------------------------Gets Cities list--------------------------------------------

		getCities : function(){
            var compiledURI = service.liveFunctions.compiledAffURI + service.liveFunctions.getCity;
            return $http.get(compiledURI)
                .then(function(data){
                    service.cityData = data;
                    return service.cityData;
                });
        },

        //----------------------------Gets all leaf level categories (Huge volume)--------------

		getCats : function(){
            var compiledURI = service.liveFunctions.compiledAffURI + service.liveFunctions.getCategories;
            return $http.get(compiledURI)
                .then(function(data){
                    service.catData = data;
                    return service.catData;
                });
        },

        //----------------------------- Posts all form data to server----------------------------

        sendAll : function(data){

            var formDetails = service.liveFunctions.compiledURI + service.liveFunctions.postFormData;

            post_data = {
                insertflag      : 'business',
                userid          : data['business']['userID'],
                name            : data['business']['name'],
                desc            : data['business']['desc'],
                categories      : data['business']['categories'],
                contact         : data['business']['contact'],
                location        : data['business']['location'],
                sel_keywords    : data['business']['sel_keywords'],
                custom_keywords : data['business']['custom_keywords']};

            return $http.post(globalVars.siteURL + 'addfreebusiness.php',{insert:post_data})
                .then(function(msg){
                    return msg;
                });
        },

        //------------------------------ Posts all Edit data to server----------------------------

        updateAll : function(data, BID){
                var formDetails = service.liveFunctions.compiledURI + service.liveFunctions.postEditForm;
                post_data = {
                    updateflag      : 'business',
                    business_id     : BID,
                    userid          : data['business']['userID'],
                    name            : data['business']['name'],
                    desc            : data['business']['desc'],
                    categories      : data['business']['categories'],
                    contact         : data['business']['contact'],
                    location        : data['business']['location'],
                    sel_keywords    : data['business']['sel_keywords'],
                    custom_keywords : data['business']['custom_keywords'],
                    is24by7:data['business']['is24by7']
                    };

                return $http.post(globalVars.siteURL + 'addfreebusiness.php',{update:post_data})
                    .then(function(data){
                        return data;
                    });
        },
        insertWorkingHrs : function(bid,isalway, data){
            var post_data = data;
            var isalways=isalway==true?1:0;

            return $http.post( globalVars.MainklURl+'MobilePremiumBusiness/working_hours?module=working_hours&business_id=' + bid+'&isaways='+isalways, {insert: post_data}).then(function(data){
                return data;
            });
        },
        tempworkingdatadata:function(bID){
                                    return $http.get(globalVars.siteURL + 'addfreebusiness.php?function=tempworkingupdatedata&Biz_id='+bID)
                                                    .then(function(data){
                                                        return data.data;
                                                    });

                                    },
        insertProductList : function(bID, prod_data){
            var post_data = {
              business_id : bID,

              productlist : prod_data
            };
            return $http.post(globalVars.MainklURl+'MobilePremiumBusiness/products_add', {insert: post_data}).then(function(data){
                return data;
            });
        },
 EditProductList : function(bID,prod_data){
            var post_data = {
            business_id : bID,
             productlist : prod_data
            };
            return $http.post(globalVars.MainklURl+'MobilePremiumBusiness/products_Edit', {Update: post_data}).then(function(data){
                return data;
            });
        },
 EditServicetList : function(bID,prod_data){
            var post_data = {
            business_id : bID,
             servicelist : prod_data
            };
            return $http.post(globalVars.MainklURl+'MobilePremiumBusiness/service_Edit', {Update: post_data}).then(function(data){
                return data;
            });
        },
        tempProductscall:function(bID){
        return $http.get(globalVars.siteURL + 'addfreebusiness.php?function=UpdateProductlist&Biz_id='+bID)
                        .then(function(data){
                            return data.data;
                        });

        },
        tempservicelist:function(bID){
                return $http.get(globalVars.siteURL + 'addfreebusiness.php?function=UpdateSeriveslist&Biz_id='+bID)
                                .then(function(data){
                                    return data.data;
                                });

                },
        insertVideo : function(bID, vid_data){
            var post_data = {
              business_id : bID,
              videos : vid_data
            };

            return $http.post(globalVars.MainklURl+'MobilePremiumBusiness/add_video?business_id=' + bID, {insert: post_data}).then(function(data){
                return data;
            });
        },
        getVideo : function(bID){
            var url = globalVars.MainklURl+'MobilePremiumBusiness/video_list?business_id=' + bID;
            return $http.get(url).success(function(res){

                return res;
            })
            .error(function(res){

                return res;
            })
        },
        insertServiceList : function(bID, svc_data){
            var post_data = {
              business_id : bID,
              servicelist : svc_data,

            };
            return $http.post(globalVars.MainklURl+'MobilePremiumBusiness/service_add', {insert: post_data}).then(function(data){
                return data;
            });
        },
        sendAllImages : function(id, logoset, bizImages,title){
            var post_data = {
                images : {
                    business_id : id,
                    business_logo : logoset || '',
                    business_images : bizImages || [],
                    business_title:title
                }
            };
            return $http.post(globalVars.siteURL + 'addfreebusiness.php?function=business_logo_insert', post_data).then(function(data){
                return data;
            });
        },
        //Delete business using ID
        deleteEach : function(BID){
            post_data = {
                deleteflag      : 'business',
                id              : BID
            };
            return $http.post(globalVars.siteURL + 'addfreebusiness.php',{delete:post_data})
                .then(function(data){
                    return data;
                });
        },
        deleteEachproduct:function(Pid){

           post_data = {
                        deleteflag      : 'Productdelete',
                        id              : Pid
                    };
                    return $http.post(globalVars.siteURL + 'addfreebusiness.php',{delete:post_data})
                        .then(function(data){
                            return data;
                        });

        },
 deleteEachservice:function(Pid){

           post_data = {
                        deleteflag      : 'Servicedelete',
                        id              : Pid //lkjfd jfdjlgdfgjlkdf gjldfg jldfkgj ldfg
                    };
                    return $http.post(globalVars.siteURL + 'addfreebusiness.php',{delete:post_data})
                        .then(function(data){
                            return data;
                        });

        },
        videoDelete : function(id){
                   var cUrl = globalVars.MainklURl+'MobilePremiumBusiness/delete_video?video_id=' +id;
                   return $http.get(cUrl)
                       .then(function(data){
                           return data;
                       });
               },
        //-----------------------------Edit mode data retrieval ---------------------------------

        getEditData : function(id){
            var editedDetails = service.liveFunctions.compiledAffURI + service.liveFunctions.editModeGet + id + '&TS=' + new Date();
             return $http.get(editedDetails)
                .then(function(data){
                    return data;
                });
        },

        //-----------------------------Delete image post ----------------------------------------

        deleteImage : function(bid, imgID){
            return $http.get(globalVars.siteURL + 'addfreebusiness.php?function=business_image_delete&image_id=' + imgID + '&business_id=' + bid)
                .then(function(data){
                    return data;
                });
        },
        productDelete : function(id){
            var cUrl = globalVars.MainklURl+'MobilePremiumBusiness/product_delete?product_id=' + id;
            return $http.get(cUrl)
                .then(function(data){
                   return data;
                });
        },
        serviceDelete : function(id){
            var cUrl = globalVars.MainklURl+'MobilePremiumBusiness/service_delete?service_id=' + id;
            return $http.get(cUrl)
                .then(function(data){
                    return data;
                });
        },
        //-----------------------------Coupon sending post---------------------------------------

        validateCoupon : function(data){
            post_data = {
                coupon_code     : data.couponCode,
                title           : data.couponTitle,
                is_accept       : true,
                user_id         : globalVars.userInfo.id
            };
            return $http.post(globalVars.siteURL + 'premium_business.php?module=premium_coupon' + '&TS=' + new Date(), {coupon:post_data})
              .then(function(data){
                  return data;
              });
        },

        validateCouponforupdate : function(data){
                    post_data = {
                        coupon_code     : data.couponCode,
                        Biz_ID           : data.BizID,
                        is_accept       : true,
                        user_id         : globalVars.userInfo.id
                    };
                    return $http.post(globalVars.siteURL + 'premium_business.php?module=Updatepremium_coupon' + '&TS=' + new Date(), {coupon:post_data})
                      .then(function(data){
                          return data;
                      });
                },
        //-----------------------------Delete image post ----------------------------------------

        sendCategories : function(data){
            post_data = {
                selectflag  : 'selectedcategory_keywords_list',
                idlist      : data
            };
            return $http.post(globalVars.siteURL + 'addfreebusiness.php',{select:post_data})
                .then(function(data){
                    return data;
                });
        }
    };
    return service;
})
.service('fetchListing', function($rootScope, $http, $q, globalVars){
    var service ={
        listingData     : [],
        notifications   : [],
        paypalDetails   : [],
        historyData     : [],
        userIDData      : null,
        liveFunctions   : {
            listGet     : "businesslistingDetailswithcat",
            notifyGet   : "notifications&user_id=",
            postUri     : "",
            msgBox      : "request_payments&user_id=",
            checkPaypal : "paypal_details&user_id="
        },

        //------------------------------------- Fires a User ID reload for the whole service ----

        sendServiceData : function(userIdentity){
            if(userIdentity){
                service.userIDData = userIdentity.data[0].id;
            }
            else
                service.userIDData = localStorageService.get(s_key_udata).data[0].id;
        },

        //------------------------------------- Returns User's affiliate listings (Huge volume)--

        getLists : function(data){
            var uData = data;

            var funcGet = globalVars.siteURL + 'addfreebusiness.php?function=' + service.liveFunctions.listGet + '&id=' + uData + '&TS=' + new Date();
            return $http.get(funcGet)
                .then(function(data){

                    service.listingData = data;
                    return service.listingData;
                });
        },

        //------------------------------------- Returns User's Notification list-----------------

        getNotifications : function(){
            var funcGet = globalVars.siteURL + 'affiliate.php?function=' + service.liveFunctions.notifyGet + service.userIDData;
            return $http.get(funcGet)
                .then(function(data){
                    //No local storage present for notifications
                    if(data!==null){
                        service.notifications = data;
                    }

                    return service.notifications;
                });
        },

        //------------------------------------- Returns User's request message history-----------

        getMessageBox : function(){
            var funcGet = globalVars.siteURL + 'affiliate.php?function=' + service.liveFunctions.msgBox + service.userIDData;
            return $http.get(funcGet)
                .then(function(data){
                    //No local storage present for notifications
                    service.historyData = data;

                    return service.historyData;
                });
        },

        //------------------------------------- Returns User's paypal details--------------------

        getPaypalDetails : function(){
            var funcGet = globalVars.siteURL + 'affiliate.php?function=' + service.liveFunctions.checkPaypal + service.userIDData;
            return $http.get(funcGet)
                .then(function(data){
                    //No local storage present for notifications
                    service.paypalDetails = data;
                    //console.log(data);
                    return service.paypalDetails;
                });
        },

        //------------------------------------- Posts paypal details form-------------------------

        postPaypal : function(paypal_id, bank_detail){
            paypal_post     = {
                insertflag      : 'paypal_details',
                    userid          : service.userIDData ,
                    paypalid        : paypal_id,
                    bank_details    : bank_detail
            };
            return $http.post(globalVars.siteURL + 'affiliate.php',{insert:paypal_post})
                .then(function(msg){
                    return msg;
                });
        },

        //--------------------------------------Posts a request for payment-----------------------

        postRequest : function(subject, msg){
            request_post     = {
                insertflag      : 'request_payment',
                userid          : service.userIDData ,
                subject        : subject,
                message    : msg
            };
            return $http.post(globalVars.siteURL + 'affiliate.php',{insert:request_post})
                .then(function(msg){
                    return msg;
                });
        }
    };
    return service;
});
