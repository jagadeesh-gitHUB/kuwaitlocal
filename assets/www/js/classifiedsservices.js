angular.module('classifieds.services', [])

.service('classifiedsData', function($http, $q, globalVars){
    return {
        temporary_classified_id : '',   //Detail page id carry over
        editMode : {                    //Edit form current settings
            is_enabled : false,
            current_id : '',
            is_premium : 0
        },
        formModel : {
            category : '',
            title : '',
            keywords : '',
            description : ''
        },
        getSelectCategories : function(){

         var deferred=$q.defer();
        var get_url=globalVars.siteURL+'AddClassified.php?function=ClassifiedCats';
            return $http.get(/*globalVars.MainklURl+'MobileClassifieds/category_list'*/get_url)
                .success(function(res){
                    return res;

                })
                .error(function(res){
                    return res;
                })
        },
        getSubCategories : function(catID){

         var get_url=globalVars.siteURL+'AddClassified.php?function=ClassifiedSubCats&catid='+catID;

            return $http.get(/*globalVars.MainklURl+'MobileClassifieds/sub_category_list?category_id=' + catID*/get_url)
                .success(function(res){
                    return res;
                })
                .error(function(res){
                    return res;
                })
        },
        getFields : function(catID){
            return $http.get(globalVars.MainklURl+'classified/dynamic_form_data/' + catID + '?TS=' + new Date())
                .success(function(res){
                    return res;
                })
                .error(function(res){
                    return res;
                })
        },
        getEditData :  function(cid){
            return $http.get(globalVars.MainklURl+'classified/classified_data/' + cid + '?TS=' + new Date())
                .success(function(res){
                    return res;
                })
                .error(function(res){
                    return res;
                })
        },
        postFormData : function(form_name, data,Ads_id){
//console.log(data);


        var post_data = {
                insertflag      : form_name,
                Id              : Ads_id,
                user_id         : data['form1_data']['user_id'],
                Ad_title        : data['form1_data']['default_values']['title'],
                Ad_parentCat    : data['form1_data']['default_values']['selectedCategory'],
                Ad_subCat       : data['form1_data']['default_values']['classified_type_id'],
                Ad_descrp       : data['form1_data']['default_values']['description'],
                Ad_price        : data['form1_data']['default_values']['search_keyword'],
                Ad_Contactnum   : data['form2_data']['default_values']['contact_number']== undefined ? "" :  data['form2_data']['default_values']['contact_number'],
                Ad_cityId       : data['form2_data']['default_values']['city_id'],
                Ad_goverId      : data['form2_data']['default_values']['governorate'],
                Ad_lat          : data['form2_data']['default_values']['lat'],
                Ad_lng          : data['form2_data']['default_values']['lng'],
                Ad_imgs         : data['form3_data']['classified_images'],
                Ad_logo         : data['form3_data']['classified_logo'],
                Ad_Slug         : data['form1_data']['default_values']['title'].replace(" ","-"),
                Ad_Landmark     : data['form2_data']['default_values']['land_mark'],
                Ad_old_Logo     : data['form3_data']['classified_old_logo']
                };
        return $http.post(globalVars.siteURL + 'AddClassified.php',{insert:post_data})
               .then(function(msg){
               return msg;
               });

           /* var url = globalVars.MainklURl+'classified/save_mobile_data/' + form_name;
            return $http.post(url, post_data)
                .success(function(res){

                    return res;
                })
                .error(function(res){

                    return res;
                })*/
        },
        deleteImg : function(imgId){

         var delete_url=globalVars.siteURL+'AddClassified.php?function=ClassifiedImageDelete&image_id='+imgId;


           // var url = globalVars.MainklURl+'classified/delete_classified_image/' + imgId;
            return $http.get(delete_url)
                .success(function(res){

                    return res;
                })
                .error(function(res){

                    return res;
                })
        },

        duplicatecheck : function(title){

                 var check_url=globalVars.siteURL+'AddClassified.php?function=ClassifiedDuplicateCheck&title='+title;


                   // var url = globalVars.MainklURl+'classified/delete_classified_image/' + imgId;
                    return $http.get(check_url)
                        .success(function(res){

                            return res;
                        })
                        .error(function(res){

                            return res;
                        })


    },
    EDitduplicatecheck : function(title,id){

                     var check_url=globalVars.siteURL+'AddClassified.php?function=ClassifiedEditDuplicateCheck&title='+title;


                       // var url = globalVars.MainklURl+'classified/delete_classified_image/' + imgId;
                        return $http.get(check_url+"&id="+id)
                            .success(function(res){

                                return res;
                            })
                            .error(function(res){

                                return res;
                            })


        }

    }
})
.service('classifiedsViewData', function($q, $http, globalVars){
    return{
        //Refer this for the whole listing and details url storage
        resourceURI : globalVars.siteURL + 'search_business.php?function=keywordSearch&input=', //auto search not used
        popularCatsURI : globalVars.MainklURl+'MobileClassifieds/main_category' + '?TS=' + new Date(), //popular Category list
        b2bURI :  globalVars.siteURL + 'search_business.php?function=b2bCategories' + '&TS=' + new Date(), // B2B Category list
        searchThisURI : globalVars.MainklURl+'MobileClassifieds/classified_search_list?&', //Search function
        fetchDetailsURI : globalVars.siteURL + 'search_business.php?function=details_view&business_id=',  //Detail view data
        fetchInnerDetailURI : globalVars.siteURL + 'search_business.php?function=premium_business_details&business_id=', //Inner detail data
        fetchRatingsURI : globalVars.siteURL + 'search_business.php?function=business_overallreviews&business_id=', //Ratings data
        fetchByCatID : globalVars.MainklURl+'MobileClassifieds/total_classified_list?subcategory_id=', //Category id based listings
        postEnquiry : globalVars.siteURL + 'user_reviews.php?function=business_enquiry',
        postRating : globalVars.siteURL + 'user_reviews.php?function=business_ratings',
        notif_bizCancelled : globalVars.MainklURl+'MobileClassifieds/business_cancel_notification?user_id=',
        notif_bizActive : globalVars.MainklURl+'MobileClassifieds/business_active_notification?user_id=',
        notif_bizPending : globalVars.MainklURl+'MobileClassifieds/business_pending_notification?user_id=',
        notif_classComments :globalVars.MainklURl+'MobileClassifieds/classified_comments?user_id=',
        notif_checkins : globalVars.MainklURl+'Mobilefacebook/is_checkin_notify?user_id=',
        notif_images : globalVars.MainklURl+'MobileClassifieds/gallery_image_notification?user_id=',

        /*======================new classifieds querys and objects===========================*/
          newclassifiedtypeslist:globalVars.siteURL+'classified.php?function=classifiedtypes',
          newclassifiedsubtypeslist:globalVars.siteURL+'classified.php?function=classifiedsubtypes&id=',



          fetchclassifiedtypes : function(){
                      var deferred = $q.defer();
                      $http.get(this.newclassifiedtypeslist).then(function(data){
                          deferred.resolve(data);
                      }, function error(err){

                          deferred.reject(err);
                      });
                      return deferred.promise;
                  },
                   fetchclassifiedsubtypes : function(id){
                                        var deferred = $q.defer();
                                        $http.get(this.newclassifiedsubtypeslist+id).then(function(data){
                                            deferred.resolve(data);
                                        }, function error(err){

                                            deferred.reject(err);
                                        });
                                        return deferred.promise;
                                    },











       /*======================new classifieds querys and objects ends===========================*/

        fetchpopularCats : function(){
            var deferred = $q.defer();
            $http.get(this.popularCatsURI).then(function(data){
                deferred.resolve(data);
            }, function error(err){

                deferred.reject(err);
            });
            return deferred.promise;
        },
        fetchSubCatsUsingCat : function(id){
            var url = globalVars.MainklURl+'MobileClassifieds/main_sub_category?category_id=';
            return $http.get(url + id)
                        .success(function(data){
                            return data;
                        })
                        .error(function(err){
                            return err;
                        });

        },
        fetchMyClassifieds : function(){
            var url = globalVars.MainklURl+'MobileClassifieds/classified_list?user_id=' + globalVars.userInfo.id + '&TS=' +  + new Date();
            return $http.get(url)
                .success(function(data){
                    return data;
                })
                .error(function(err){
                    return err;
                });
        },
        fetchNotifications : function(type){
            var user_id = globalVars.userInfo.id;
            var fetchURI = '';
            if(type === 'bizCancelled'){
                fetchURI = this.notif_bizCancelled + user_id;
            }
            if(type === 'bizActive'){
                fetchURI = this.notif_bizActive + user_id;
            }
            if(type === 'bizPending'){
                fetchURI = this.notif_bizPending + user_id;
            }
            if(type === 'classComments'){
                fetchURI = this.notif_classComments + user_id;
            }
            if(type === 'checkins'){
                fetchURI = this.notif_checkins + user_id;
            }
            if(type === 'image'){
                fetchURI = this.notif_images + user_id;
            }
            return $http.get(fetchURI)
                .success(function(res){
                    return res;
                })
                .error(function(err){
                    return err;
                })
        },
        /*http://103.241.146.239/MobileClassifieds/classified_search_list?classified_name=lumia 520&classified_city=chennai*/
        fetchListingsAll : function(keyword , area, id, loadType, slug){
            var compiledUrl = '';
            var deferred = $q.defer();
            //Area only
            if (typeof keyword === 'undefined' && typeof loadType !== 'undefined'){
                if(loadType === 'recent'){
                    compiledUrl = this.searchThisURI + "classified_city=" + area;
                }
                if(loadType === 'rating'){
                    compiledUrl = this.searchThisURI + "classified_city=" + area + "&ratings=locationalone";
                }
            }
            //Keyword only
            if (typeof area === 'undefined' && typeof loadType !== 'undefined'){
                if(loadType === 'recent'){
                    compiledUrl = this.searchThisURI + "classified_name=" + keyword;
                }
                if(loadType === 'rating'){
                    compiledUrl = this.searchThisURI + "classified_name=" + keyword + "&ratings=namealone";
                }
            }
            //Both keyword and Area
            if (typeof keyword !== 'undefined' && typeof area !== 'undefined' && typeof loadType !== 'undefined'){
                if(loadType === 'recent'){
                    compiledUrl = this.searchThisURI + "classified_name=" + keyword + "&classified_city=" + area;
                }
                if(loadType === 'rating'){
                    compiledUrl = this.searchThisURI + "classified_name=" + keyword + "&classified_city=" + area + "&ratings=namelocation";
                }
            }
            //Only Category ID based
            if (typeof id !== 'undefined' && typeof slug !== 'undefined' && typeof loadType !== 'undefined'){
                compiledUrl = this.fetchByCatID + id + '&TS=' + new Date();
                if(loadType === 'recent'){ //&ratings=category_alone
                    compiledUrl = this.fetchByCatID + id + '&slug=' + slug + '&TS=' + new Date();
                }
                if(loadType === 'rating'){
                    compiledUrl = this.fetchByCatID + id + "&ratings=category_alone" + '&TS=' + new Date();
                }
            }
            return $http.get(compiledUrl)
                .success(function(data){
                    return data;
                }).error(function(err){
                    return err;
                });
        }
    };
})
.service('classifiedDetailData', function($q, $http, resourceRequistion, globalDataTemp, globalVars){
    return{
        //GET function for getting a business's detail overview
        fetchDetails : function(bizID){
            var deferred = $q.defer();
          //  var compiledUrl = globalVars.MainklURl+'MobileClassifieds/classified_details?classified_id=' + bizID + '&TS=' + new Date();

           var compiledUrl=globalVars.siteURL+'classified.php?function=ClassifiedDetails&id='+bizID;
            $http.get(compiledUrl).then(function(data){
                globalDataTemp.clearAllDetails('business detail op');
                deferred.resolve(data);
            }, function error(err){
                deferred.reject(err);
            });
            return deferred.promise;
        },
        //GET function for ratings update anywhere
        fetchRatings : function(bizID){    //Fetches all rating data for detail page
            var deferred = $q.defer();
            var compiledUrl = resourceRequistion.fetchRatingsURI + bizID + '&TS=' + new Date();
            $http.get(compiledUrl).success(function(data){
                    globalDataTemp.setCurrentRatings(data);
                    deferred.resolve(data);
                },
                function(err){

                    deferred.reject(err);
                });
            return deferred.promise;
        },
        //GET function for all business inner details
        fetchInnerDetail : function(bizID){    //One time loader for inner detail page
            var deferred = $q.defer();
            if(globalDataTemp.currentBusinessInnerDetail && globalDataTemp.currentBusinessInnerDetail.hasOwnProperty('business_products')){ //Check for cache
                deferred.resolve(globalDataTemp.currentBusinessInnerDetail);
            }
            else{
                $http.get(resourceRequistion.fetchInnerDetailURI + bizID + '&TS=' + new Date()).then(function(data){
                        globalDataTemp.setCurrentInnerDetail(data.data);
                        deferred.resolve(globalDataTemp.currentBusinessInnerDetail);
                    },
                    function error(err){
                        deferred.reject(err);
                    });
            }
            return deferred.promise;
        },
        //Business Enquiry POST data
        postEnquiry : function(name, email, number, msg){
            //POST body
            business_enquiry     = {
                business_id     : globalDataTemp.currentBusinessID,
                user_id         : globalVars.userInfo.id ,
                name            : name,
                email           : email,
                phonenumber     : number,
                message         : msg
            };
            //POST action
            return $http.post(resourceRequistion.postEnquiry ,business_enquiry)
                .then(function(msg){
                    return msg;
                });
        },
        //Rate this business POST data
        postRating : function(name, email, number, rating, msg){
            //POST body
            business_ratings     = {
                business_id       : globalDataTemp.currentBusinessID,
                user_id           : globalVars.userInfo.id ,
                rater_name        : name,
                rater_email       : email,
                rater_phonenumber : number,
                rater_star        : rating,
                rater_message     : msg
            };
            //POST action
            return $http.post(resourceRequistion.postRating ,business_ratings)
                .then(function(msg){
                    return msg;
                });
        },
        getPublicGallery : function(){
            var fetchUrl = globalVars.siteURL + 'business_galleries.php?function=businessgallery_approvedlist&business_id=' + globalDataTemp.currentBusinessID + '&TS=' + new Date();
            return $http.get(fetchUrl)
                .success(function(data){

                    return data;
                })
                .error(function(data){

                    return data;
                });
        }
    };
})
.service('classifiedrequesting', function($q, $http, globalVars){
    return{
        //Refer this for the whole listing and details url storage

        /*======================new classifieds querys and objects===========================*/
          newclassifiedtypeslist:globalVars.siteURL+'classified.php?function=classifiedtypes',
          newclassifiedsubtypeslist:globalVars.siteURL+'classified.php?function=classifiedsubtypes&id=',
          classifiedrecentads:globalVars.siteURL+'classified.php?function=recentAds',
           categoryrecentclassifieds:globalVars.siteURL+'classified.php?function=subcategoryrecentads&',
            categorynearbyclassifieds:globalVars.siteURL+'classified.php?function=subcategoryneartads&',
             classifiedsearch:globalVars.siteURL+'classified.php?function=classifiedsearch&',
             classifiedlist:globalVars.siteURL+'classified.php?function=classfiedlistdata&id=',
             classifiedgallery:globalVars.siteURL+'classified.php?function=classfiedimagesbyid&id=',
             classifiedcomments:globalVars.siteURL+'classified.php?function=classfiedcomments&id=',

//classified types (main categories) fetching object
           fetchclassifiedtypes : function(){
            var deferred = $q.defer();
             $http.get(this.newclassifiedtypeslist).then(function(data){
              deferred.resolve(data);
                },
                function error(err){

                  deferred.reject(err);
                    });
                     return deferred.promise;
                      },
 //sub categoreis fetching obejct by passing main type id
           fetchclassifiedsubtypes : function(id){
            var deferred = $q.defer();
             $http.get(this.newclassifiedsubtypeslist+id).then(function(data){
               deferred.resolve(data);
               }, function error(err){

                   deferred.reject(err);
                     });
                      return deferred.promise;
                         },
  //fetching recent ads objects its in main tabs

    fetchrecentAds:function(){
    var deferred=$q.defer();

    $http.get(this.classifiedrecentads).then(function(data){
                   deferred.resolve(data);
                   }, function error(err){

                       deferred.reject(err);
                         });
                          return deferred.promise;


    },
    //fetch search query data

      fetchsearchlist:function(input,gid,cid){
        var deferred=$q.defer();
        var url=this.classifiedsearch+'input='+input+'&gid='+gid+'&cid='+cid;
        $http.get(url).then(function(data){
                       deferred.resolve(data);
                       }, function error(err){

                           deferred.reject(err);
                             });
                              return deferred.promise;


        },
        //fetch sub category classifieds query data

              fetchsubcatrecent:function(id,lat,lng){
                var deferred=$q.defer();
                var url=this.categoryrecentclassifieds+'id='+id+'&lat='+lat+'&lng='+lng;
                $http.get(url).then(function(data){
                               deferred.resolve(data);
                               }, function error(err){

                                   deferred.reject(err);
                                     });
                                      return deferred.promise;


                },

                fetchsubcatnearby:function(id,lat,lng){
                                var deferred=$q.defer();
                                var url=this.categorynearbyclassifieds+'id='+id+'&lat='+lat+'&lng='+lng;
                                $http.get(url).then(function(data){
                                               deferred.resolve(data);
                                               }, function error(err){

                                                   deferred.reject(err);
                                                     });
                                                      return deferred.promise;


                                },
                                fetchclassifedlistquery:function(id){

                                //classifiedlist

                                var deferred=$q.defer();
                                $http.get(this.classifiedlist+id).then(function(data){

                                deferred.resolve(data);
                                },function error(data){

                                deferred.reject(err);
                                });

                                return deferred.promise;
                                },
//classifiedgallery
 fetchclassifedgallery:function(id){

                                //classifiedlist

                                var deferred=$q.defer();
                                $http.get(this.classifiedgallery+id).then(function(data){

                                deferred.resolve(data);
                                },function error(data){

                                deferred.reject(err);
                                });

                                return deferred.promise;
                                },
//classifiedcomments
fetchclassifecomments:function(id){

                                //classifiedlist

                                var deferred=$q.defer();
                                $http.get(this.classifiedcomments+id).then(function(data){

                                deferred.resolve(data);
                                },function error(data){

                                deferred.reject(err);
                                });

                                return deferred.promise;
                                },


    };
});
