angular.module('listing.services', [])

.service('resourceRequistion', function($http, $q, globalVars,$state){
    return{
        //Refer this for the whole listing and details url storage
        mobiledisplaycategories:globalVars.siteURL+'search_business.php?function=MobileDisplaycategories',
        subcategorieslsit:globalVars.siteURL+'search_business.php?function=subcategories&id=',
        resourceURI : globalVars.siteURL + 'search_business.php?function=keywordSearch&input=', //auto search not used
        popularCatsURI : globalVars.siteURL + 'search_business.php?function=popularsearchCategories' + '&TS=' + new Date(), //popular Category list
        b2bURI :  globalVars.siteURL + 'search_business.php?function=b2bCategories' + '&TS=' + new Date(), // B2B Category list
        searchThisURI : globalVars.siteURL + 'search_business.php?function=search_businesslist&', //Search function
        fetchDetailsURI : globalVars.siteURL + 'search_business.php?function=details_view&business_id=',  //Detail view data
        // fetchDetailsURI : 'http://188.166.55.96/kuwaitmobileapp/'+ 'search_business.php?function=details_view&business_id=',  //Detail view data
        fetchInnerDetailURI : globalVars.siteURL + 'search_business.php?function=premium_business_details&business_id=', //Inner detail data
        fetchRatingsURI : globalVars.siteURL + 'search_business.php?function=business_overallreviews&business_id=', //Ratings data
        fetchByCatID : globalVars.siteURL + 'search_business.php?function=category_basedlist&cat_id=', //Category id based listings
        postEnquiry : globalVars.siteURL + 'user_reviews.php?function=business_enquiry',
        postRating : globalVars.siteURL + 'user_reviews.php?function=business_ratings',
        notif_bizCancelled :globalVars.MainklURl+'MobileClassifieds/business_cancel_notification?user_id=',
        notif_bizActive : globalVars.MainklURl+'MobileClassifieds/business_active_notification?user_id=',
        notif_bizPending : globalVars.MainklURl+'MobileClassifieds/business_pending_notification?user_id=',
        notif_classComments : globalVars.MainklURl+'MobileClassifieds/classified_comments?user_id=',
        notif_checkins : globalVars.MainklURl+'Mobilefacebook/is_checkin_notify?user_id=',
        notif_images : globalVars.MainklURl+'MobileClassifieds/gallery_image_notification?user_id=',

        governorateslist:globalVars.siteURL+'search_business.php?function=governorateslist',
        governoratecitieslist:globalVars.siteURL+'search_business.php?function=governoratecities&id=',
        searchquerydatalist:globalVars.siteURL+'search_business.php?function=governaratesbasedsearch&input=',
        searchbasedongovernorate:globalVars.siteURL+'search_business.php?function=Loadallbizandkeysbygovernorate&input=',
        searchqueryforbizlist:globalVars.siteURL+'search_business.php?function=searchqueryarealistview&input=',
        tagsbusinesslistdata:globalVars.siteURL+'search_business.php?function=tagbasedbussiness&',
        categorysearchbusdata:globalVars.siteURL+'search_business.php?function=categoriesbaseSearch&input=',
        blogslistdata:globalVars.siteURL+'News.php?function=Blogslist' + '&TS=' + new Date(),
        blogsvideo:globalVars.siteURL+'News.php?function=blogvideo&blogid=',
        popularblogslistdata:globalVars.siteURL+'News.php?function=popularbloglist' + '&TS=' + new Date(),
 blogscategorieslistdata:globalVars.siteURL+'News.php?function=blogscategoreis' + '&TS=' + new Date(),
blogscategorysellistdata:globalVars.siteURL+'News.php?function=categoriebloglist&catid=',
blogsearchdatalist:globalVars.siteURL+'News.php?function=blogtitlesearch&input=',
relatedblogsdatalist:globalVars.siteURL+'News.php?function=relatedblogs&',
blogcomments:globalVars.siteURL+'News.php?function=blogcomments&blogid=',
blogslideshowdataurl:globalVars.siteURL+'News.php?function=slidepopularbloglist' + '&TS=' + new Date(),
blogviewcountupdate:globalVars.siteURL+'News.php?function=blogviewcountupdate&id=',
blogDetailCal:globalVars.siteURL+'News.php?function=BlogDetailview&id==',
//forums urls
forumrecentlist:globalVars.siteURL+'blogs_forums.php?function=recentforumslist',
forumpopularlist:globalVars.siteURL+'blogs_forums.php?function=popularforumslist',
forumsearchlist:globalVars.siteURL+'blogs_forums.php?function=forumsearchlist&searchtext=',
forumcategories:globalVars.siteURL+'blogs_forums.php?function=forumcategories',
forumcatlist:globalVars.siteURL+'blogs_forums.php?function=categorieformumlist&catid=',
forumviewupdate:globalVars.siteURL+'blogs_forums.php?function=forumviewupdate&id=',
forumcommentslist:globalVars.siteURL+'blogs_forums.php?function=forumcommentslist&id=',
relatedformslist:globalVars.siteURL+'blogs_forums.php?function=relatedforums&',
businessfavsave:globalVars.siteURL+'search_business.php?function=Favbusinesave&',
businessfavcheck:globalVars.siteURL+'search_business.php?function=FavCheck_detailview&',
businessfavlist:globalVars.siteURL+'search_business.php?function=favoratebuslist&usrid=',
//business fave
businessunfavlist:globalVars.siteURL+'search_business.php?function=unfavoratebiz&',
userdetails:globalVars.siteURL+'search_business.php?function=userdetails&id=',
Business_search_result:globalVars.siteURL+'search_business.php?function=BusinessSearchResultsaving&keyword=',

fetchBlogDetails: function(id){
         var deferred=$q.defer();
 $http.get(this.blogDetailCal+id).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;

},

fetchblogvideo:function(id){
//blogsvideo
var deferred=$q.defer();
 $http.get(this.blogsvideo+id).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;
},

BusinessSearchResult : function(keyword,user_id,city){

var deferred =$q.defer();

var url =this.Business_search_result+keyword+"&User_id="+user_id+"&city_name="+city;

 $http.get(url).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;


},

unfav:function(id,usrid){

var deferred=$q.defer();

var url=this.businessunfavlist+"id="+id+"&user_id="+usrid;
        $http.get(url).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;

},
updatefavbus:function(id,usrid){

var deferred=$q.defer();

var url=this.businessfavsave+"id="+id+"&user_id="+usrid;
        $http.get(url).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;

},

favChecINDetailview:function(id,usrid){

var deferred=$q.defer();

var url=this.businessfavcheck+"business_id="+id+"&currentuserid="+usrid;
        $http.get(url).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;

},

favlist:function(usrid){

var deferred=$q.defer();

var url=this.businessfavlist+usrid;
        $http.get(url).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;

},

fetchuserdetails:function(id){
var deferred=$q.defer();

var url=this.userdetails+id;  $http.get(url).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;
        },
//forum fetching obejets

fetchrelatedforumlist:function(metakey,catid,forumid){
var deferred=$q.defer();

var url=this.relatedformslist+"metakey="+metakey+"&catid="+catid+"&forumid="+forumid;
        $http.get(url).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;
        },

updateforumviewcount:function(id){
var deferred=$q.defer();
        $http.get(this.forumviewupdate+id).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;
        },
fetchforumcomments:function(id){

 var deferred=$q.defer();
        $http.get(this.forumcommentslist+id).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;

},
fetchcatforumslist:function(id){

 var deferred=$q.defer();
        $http.get(this.forumcatlist+id).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;

},
fetchforumcatlist:function(){

 var deferred=$q.defer();
        $http.get(this.forumcategories).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;

},
fetchforumsearchlist:function(txt){

 var deferred=$q.defer();
        $http.get(this.forumsearchlist+txt).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;

},
fetchforumrecentlist:function(){

 var deferred=$q.defer();
        $http.get(this.forumrecentlist).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;

},
fetchforumpopularlist:function(){

 var deferred=$q.defer();
        $http.get(this.forumpopularlist).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;

},
//blogs fetch object

updateblogviewcount:function(id){
var deferred=$q.defer();
        $http.get(this.blogviewcountupdate+id).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;
        },

fetchslideshowblogs:function(){

 var deferred=$q.defer();
        $http.get(this.blogslideshowdataurl).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;

},

fetchrecentblogslist:function(){

 var deferred=$q.defer();
        $http.get(this.blogslistdata).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;

},
fetchpopularblogslist:function(){

                       var deferred=$q.defer();
                              $http.get(this.popularblogslistdata).then(function(data){
                              deferred.resolve(data);
                              },function(err){
                              deferred.reject(err);
                              });
                              return deferred.promise;

                      },
      fetchblogscategorieslist:function(){
      var deferred=$q.defer();
                                    $http.get(this.blogscategorieslistdata).then(function(data){
                                    deferred.resolve(data);
                                    },function(err){
                                    deferred.reject(err);
                                    });
                                    return deferred.promise;

                                                                     },

      fetchblogscategoryseltlist:function(id){
                                       var deferred=$q.defer();
                                                                     $http.get(this.blogscategorysellistdata+id).then(function(data){
                                                                     deferred.resolve(data);
                                                                     },function(err){
                                                                     deferred.reject(err);
                                                                     });
                                                                     return deferred.promise;

                                                                                                      },

  fetchblogsearchdata:function(txt){
   var deferred=$q.defer();
    $http.get(this.blogsearchdatalist+txt).then(function(data){
     deferred.resolve(data);
       },function(err){
        deferred.reject(err);
         });
          return deferred.promise;
          },
          fetchrelatedblogsdata:function(keyword,catid,id){
          var url=this.relatedblogsdatalist+"keyword="+keyword+"&catid="+catid+"&id="+id;
          var deferred=$q.defer();
          $http.get(url).then(function(data){
          deferred.resolve(data);
          },function(err){
          deferred.reject(err);
          });
          return deferred.promise;


          },
          fetchblogcomments:function(id){

                                     var deferred=$q.defer();
                                      $http.get(this.blogcomments+id).then(function(data){
                                      deferred.resolve(data);
                                      },function(err){
                                      deferred.reject(err);
                                      });
                                      return deferred.promise;


                                      },

//category base search  fetch object
        fetchcatbusiness:function(text){

        var deferred=$q.defer();
        $http.get(this.categorysearchbusdata+text).then(function(data){
        deferred.resolve(data);
        },function(err){
        deferred.reject(err);
        });
        return deferred.promise;


        },

fetchtagbusinesslist:function(tagid,governorateid,cityid){



var url=this.tagsbusinesslistdata+"tagid="+tagid+"&governorateid="+governorateid+"&cityid="+cityid;
var deferred=$q.defer();
$http.get(url).then(function(data){
deferred.resolve(data);
},function(err){
deferred.reject(err);
});
return deferred.promise;


},

fetchsearchdatalist:function(input){

var deferred=$q.defer();
$http.get(this.searchquerydatalist+input).then(function(data){
deferred.resolve(data);
},function(err){
deferred.reject(err);
});
return deferred.promise;
},
fetchthisbygoverlist:function(input){
var deferred=$q.defer();
$http.get(this.searchbasedongovernorate+input).then(function(data){
deferred.resolve(data);
},function(err){
deferred.reject(err);
});
return deferred.promise;

},
searchquerybizlist:function(input){
var deferred=$q.defer();
$http.get(this.searchqueryforbizlist+input).then(function(data){
deferred.resolve(data);
},function(err){
deferred.reject(err);
});
return deferred.promise;

},

fetchgovernorateslist:function(){

var deferred=$q.defer();
/*$http.get(this.governorateslist).then(function(data){

deferred.resolve(data);

},function(err){
$state.go("offlineview");
deffered.reject(err);
});*/
 var governate_data=[{"id":"1","name":"Al-Ahmadi Governorate","alias_name":"Ahmadi"},{"id":"2","name":"Capital Governorate","alias_name":"\t\nAl Asimah"},{"id":"3","name":"Al Farwaniyah Governorate","alias_name":"Farwaniyah"},{"id":"4","name":"Al Jahra Governorate","alias_name":"Jahra"},{"id":"5","name":"Hawalli Governorate","alias_name":"Hawally Governorate"},{"id":"6","name":"Mubarak Al-Kabeer Governorate","alias_name":"Mubarak Al-Kabeer"},{"id":"0","name":"Kuwait","alias_name":"Kuwait"}];
         
         deferred.resolve(governate_data);

return deferred.promise;

},

fetchgovernoratecity:function(id){

var deferred=$q.defer();

$http.get(this.governoratecitieslist+id).then(function(data){

deferred.resolve(data);

},function(err){
deffered.reject(err);
});

return deferred.promise;


},

fetchmobilecat : function(){
            var deferred = $q.defer();
            $http.get(this.mobiledisplaycategories).then(function(data){
                deferred.resolve(data);
            }, function error(err){

                deferred.reject(err);
            });
            return deferred.promise;
        },

//subcategorieslsit
fetchsubCats : function(id){
            var deferred = $q.defer();
            $http.get(this.subcategorieslsit+id).then(function(data){
                deferred.resolve(data);
            }, function error(err){

                deferred.reject(err);
            });
            return deferred.promise;
        },
        fetchpopularCats : function(){
            var deferred = $q.defer();
            $http.get(this.popularCatsURI).then(function(data){
                deferred.resolve(data);
            }, function error(err){

                deferred.reject(err);
            });
            return deferred.promise;
        },
        fetchb2bCats : function(){


            var deferred = $q.defer();
            $http.get(this.b2bURI).then(function(data){

                deferred.resolve(data);
            }, function error(err){

                deferred.reject(err);
            });
            return deferred.promise;
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
        fetchListingsAll : function(keyword , area, id,tagdata, loadType, swapFlag,pagelimt){
            var compiledUrl = '';
            var deferred = $q.defer();
            //Area only
            if (typeof keyword === 'undefined' && typeof loadType !== 'undefined'){
                if(loadType === 'recent'){
                    compiledUrl = this.searchThisURI + "location=" + area;
                }
                if(loadType === 'rating'){
                    compiledUrl = this.searchThisURI + "location=" + area + "&ratings=locationalone";
                }
                if(loadType === 'nearby'){
                    compiledUrl = this.searchThisURI + "location=" + area + "&nearby=locationalone&mylat=" + globalVars.deviceLat + "&mylong=" + globalVars.deviceLng + '&TS=' + new Date();
                }
            }
            //Keyword only
            if (typeof area === 'undefined' && typeof loadType !== 'undefined'){
                if(loadType === 'recent'){
                    compiledUrl = this.searchThisURI + "name=" + keyword;
                }
                if(loadType === 'rating'){
                    compiledUrl = this.searchThisURI + "name=" + keyword + "&ratings=namealone";
                }
                if(loadType === 'nearby'){
                    compiledUrl = this.searchThisURI + "name=" + keyword + "&nearby=namealone&mylat=" + globalVars.deviceLat + "&mylong=" + globalVars.deviceLng + '&TS=' + new Date();
                }
                if(loadType === 'nearby' && swapFlag === 'precision'){
                   // compiledUrl = this.searchThisURI + "name=" + keyword + "&nearby=namealone&mylat=" + globalVars.deviceLat + "&mylong=" + globalVars.deviceLng + '&checkin=checkin_nearby' + '&TS=' + new Date();
                    //Rigged lat long test for kuwait nearby 29.324023, 47.987645
                    compiledUrl = this.searchThisURI + "name=" + keyword + "&nearby=namealone&mylat=" + 29.32753 + "&mylong=" + 48.06205 + '&checkin=checkin_nearby';
                }
            }
            //Both keyword and Area
            if (typeof keyword !== 'undefined' && typeof area !== 'undefined' && typeof loadType !== 'undefined'){
                if(loadType === 'recent'){
                    compiledUrl = this.searchThisURI + "name=" + keyword + "&location=" + area;
                }
                if(loadType === 'rating'){
                    compiledUrl = this.searchThisURI + "name=" + keyword + "&location=" + area + "&ratings=namelocation";
                }
                if(loadType === 'nearby'){
                    compiledUrl = this.searchThisURI + "name=" + keyword + "&location=" + area +"&nearby=namelocation&mylat=" + globalVars.deviceLat + "&mylong=" + globalVars.deviceLng + '&TS=' + new Date();
                }
            }
            //Only Category ID based
            if (typeof id !== 'undefined' && typeof loadType !== 'undefined'){
                compiledUrl = this.fetchByCatID + id +'&pagelimt='+pagelimt+'&TS=' + new Date();
                if(loadType === 'recent'){ //&ratings=category_alone
                    compiledUrl = this.fetchByCatID + id + '&pagelimt='+pagelimt+'&TS=' + new Date();
                }
                if(loadType === 'rating'){
                    compiledUrl = this.fetchByCatID + id +"&pagelimt="+pagelimt+ "&ratings=category_alone" + '&TS=' + new Date();
                }
                if(loadType === 'nearby'){
                    compiledUrl = this.fetchByCatID + id +"&pagelimt="+pagelimt+ "&nearby=category_alone&mylat=" + globalVars.deviceLat + "&mylong=" + globalVars.deviceLng + '&TS=' + new Date();
                }
            }

            //Only tag ID based
                        if (typeof tagdata !=='undefined' && typeof loadType !== 'undefined'){



                        //var url=this.tagsbusinesslistdata+"tagid="+tagid+"&governorateid="+governorateid+"&cityid="+cityid;
                            compiledUrl = this.tagsbusinesslistdata+"tagid="+tagdata.id+"&governorateid="+tagdata.governorateid+"&cityid="+tagdata.cityid+'&TS=' + new Date();
                            if(loadType === 'recent'){ //&ratings=category_alone
                                compiledUrl = this.tagsbusinesslistdata+"tagid="+tagdata.id+"&governorateid="+tagdata.governorateid+"&cityid="+tagdata.cityid+'&TS=' + new Date();
                            }
                            if(loadType === 'rating'){
                                compiledUrl = this.tagsbusinesslistdata+"tagid="+tagdata.id+"&governorateid="+tagdata.governorateid+"&cityid="+tagdata.cityid+ "&ratings=rating" + '&TS=' + new Date();
                            }
                            if(loadType === 'nearby'){
                                compiledUrl =this.tagsbusinesslistdata+"tagid="+tagdata.id+"&governorateid="+tagdata.governorateid+"&cityid="+tagdata.cityid+ "&nearby=near&mylat=" + globalVars.deviceLat + "&mylong=" + globalVars.deviceLng + '&TS=' + new Date();
                            }
                        }


            $http.get(compiledUrl).success(function(data){
                deferred.resolve(data);
            }, function error(err){

                deferred.reject(err);
            });
            return deferred.promise;
        }
    };
})
.service('businessDetailData', function($q, $http, resourceRequistion, globalDataTemp, globalVars){
        return{
          //GET function for getting a business's detail overview
            fetchDetails : function(bizID,userid){
                var deferred = $q.defer();
                var compiledUrl = resourceRequistion.fetchDetailsURI + bizID +'&currentuserid='+userid+'&TS=' + new Date();
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
.service('facebookListData', function($http, $q, globalVars){
    return{
        fetchSuggestedCities : function(){
            var fetchUrl = globalVars.MainklURl+"MobileClassifieds/get_city_suggested";
            return $http.get(fetchUrl)
                .success(function(res){

                    return res;
                })
                .error(function(err){

                    return err;
                });
        },
        fetchSuggestedCategories : function(){
            var fetchUrl = globalVars.MainklURl+"MobileClassifieds/get_category_suggested";
            return $http.get(fetchUrl)
                .success(function(res){

                    return res;
                })
                .error(function(err){

                    return err;
                });
        },
        postSuggestion : function(post_data){

            var fetchUrl = globalVars.MainklURl+"Mobilefacebook/send_suggested_enquiries";
            return $http.post(fetchUrl, post_data)
                .success(function(res){

                    return res;
                })
                .error(function(err){

                    return err;
                });
        }
    };
})
.service('EventsServerCalls', function($http, $q, globalVars,$state){
       
        
         return{
         
         //Refer this for the whole events and details url storage
         eventIndex:globalVars.siteURL+'EventsCalls.php?function=EventIndexCall',
         
         eventDetailcall:globalVars.siteURL+'EventsCalls.php?function=EventDetailcall&id=',
         
         eventCommentcall:globalVars.siteURL+'EventsCalls.php?function=EventCommentCall&id=',
         
         /*====event search urls========*/
         
        eventSearch:globalVars.siteURL+'EventSearchCalls.php?function=EventKeySearch&Search_key=',
         
        eventcats:globalVars.siteURL+'EventFilter.php?function=Eventcategories',
        EventFilterwithallcats:globalVars.siteURL+'EventFilter.php?function=EventFilterwilthallcats',
        EventFilterwithcat:globalVars.siteURL+'EventFilter.php?function=EventFilterwilthcat',
         
         //call back functions for server data
         
         EventHome : function(){
          var deferred=$q.defer();
         $http.get(this.eventIndex).then(function(data){
                                               deferred.resolve(data);
                                               },function(err){
                                               deferred.reject(err);
                                               });
         return deferred.promise;
         
         
         
         },
         
         EventSearchHome : function(text){
         var deferred=$q.defer();
         $http.get(this.eventSearch+text).then(function(data){
                                         deferred.resolve(data);
                                         },function(err){
                                         deferred.reject(err);
                                         });
         return deferred.promise;
         
         
         
         },
         
         EventDetail : function(id){
          var deferred=$q.defer();
         $http.get(this.eventDetailcall+id).then(function(data){
                                         deferred.resolve(data);
                                         },function(err){
                                         deferred.reject(err);
                                         });
         return deferred.promise;
         
         
         
         },
         
         EventComment : function(id){
         var deferred=$q.defer();
         $http.get(this.eventCommentcall+id).then(function(data){
                                                 deferred.resolve(data);
                                                 },function(err){
                                                 deferred.reject(err);
                                                 });
         return deferred.promise;
         
         
         
         },
         //Rate this business POST data
         postRating : function(id,name, email, number, rating, msg){
         //POST body
         business_ratings     = {
         Event_id          : id,
         user_id           : globalVars.userInfo.id ,
         rater_name        : name,
         rater_email       : email,
         rater_phonenumber : number,
         rater_star        : rating,
         rater_message     : msg
         };
         //POST action
         
         var posting_url=globalVars.siteURL+'EventsCalls.php?function=event_ratings';
         return $http.post(posting_url ,business_ratings)
         .then(function(msg){
               return msg;
               });
         },
        sendEnquiry : function(id,name, email, number,  msg){
         //POST body
         business_ratings     = {
         Event_id          : id,
         user_id           : globalVars.userInfo.id ,
         user_name        : name,
        user_mail       : email,
         user_num : number,
         message     : msg
         };
         //POST action
         
         var posting_url=globalVars.siteURL+'EventSearchCalls.php?function=EventSendQRY';
         return $http.post(posting_url ,business_ratings)
         .then(function(msg){
               return msg;
               });
         },
         
         
         /*event filter calls*/
         
         EventCats : function(){
         
         var deferred=$q.defer();
         $http.get(this.eventcats).then(function(data){
                                                  deferred.resolve(data);
                                                  },function(err){
                                                  deferred.reject(err);
                                                  });
         return deferred.promise;
         
         
         
         },
         EventFilterWillAllCats : function(FilterDate,fromdate,todate,is_free){
         
         var deferred=$q.defer();
         
         var url=this.EventFilterwithallcats+"&FilterDate="+FilterDate+"&fromdate="+fromdate+"&todate="+todate+"&is_free="+is_free;
         
         $http.get(url).then(function(data){
                                        deferred.resolve(data);
                                        },function(err){
                                        deferred.reject(err);
                                        });
         return deferred.promise;
         
         
         
         },

         EventFilterWillCat : function(FilterDate,fromdate,todate,catid,is_free){
         
         var deferred=$q.defer();
         
         var url=this.EventFilterwithcat+"&FilterDate="+FilterDate+"&fromdate="+fromdate+"&todate="+todate+"&catid="+catid+"&is_free="+is_free;
         
         $http.get(url).then(function(data){
                             deferred.resolve(data);
                             },function(err){
                             deferred.reject(err);
                             });
         return deferred.promise;
         
         
         
         },
         
         
         }
         
         })
.service('AdsService', function($http, $q, globalVars,$state){
         
         return{
         
         //Refer this for the whole events and details url storage
       
         AdsURL : globalVars.siteURL+'Ads.php?function=AppADsCal&app_module=',
         
         AdsCall : function(module){
         
         var deferred=$q.defer();
         $http.get(this.AdsURL+module).then(function(data){
                                                  deferred.resolve(data);
                                                  },function(err){
                                                  deferred.reject(err);
                                                  });
         return deferred.promise;
         
         
         },
         
         
         }
         
         
         
         
         
         
         
         
         });
