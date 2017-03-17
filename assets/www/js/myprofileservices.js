angular.module('profile.services', [])

.service('profileRequistion', function($http, $q, globalVars){
   return{
   /*=====================listing urls============================================*/
     profileReviews:globalVars.siteURL+"myprofile.php?function=myreviews&user_id=",
     profileEnquiries:globalVars.siteURL+"myprofile.php?function=myenquries&user_id=",
     profileGallery:globalVars.siteURL+"myprofile.php?function=mygallery&user_id=",
     /*======================blohs urls===========================================*/
       profileBlogs:globalVars.siteURL+"myprofile.php?function=myblogs&user_id=",
       profileBlogComments:globalVars.siteURL+"myprofile.php?function=myblogcomments&user_id=",
  /*======================forums urls===========================================*/
       profileForums:globalVars.siteURL+"myprofile.php?function=myforums&user_id=",
       profileForumComments:globalVars.siteURL+"myprofile.php?function=myforumscomments&user_id=",

/*======================Ads urls===========================================*/
       profileAds:globalVars.siteURL+"myprofile.php?function=userAds&user_id=",
       profileAdsEnquires:globalVars.siteURL+"myprofile.php?function=classifiedenquires&user_id=",

 /*===================================my profile Edit queries=============================*/
       Nationalitiesdata:globalVars.siteURL+"myprofile.php?function=Nationalities",
       MyDashBoard_url:globalVars.siteURL+"MyDashBoard.php?function=myDashBoardCall&user_id=",
       blogdelete_url:globalVars.siteURL+"myprofile.php?function=myblogsDelete&id=",
       blogcommentdelete_url:globalVars.siteURL+"myprofile.php?function=myblogcommentsDelete&id=",
       forumdelete_url:globalVars.siteURL+"myprofile.php?function=myforumsDelete&id=",
       forumcommentdelete_url:globalVars.siteURL+"myprofile.php?function=myforumcommentsDelete&id=",
       mygallerydelte_url:globalVars.siteURL+"myprofile.php?function=mygallerydelete&user_id=",
       MyAdsdelete_url:globalVars.siteURL+"myprofile.php?function=ClassifiedDelete&id=",
       admingallery_url:globalVars.siteURL+"myprofile.php?function=Admingallerydelete&id=",

       //mygallerydelete





/*=========================server data=====================profile=======================*/

fetchAdsDelete:function(id){
        var deferred=$q.defer();

         $http.get(this.MyAdsdelete_url+id).then(function(data){
          deferred.resolve(data);
           },function(err){
            deferred.reject(err);
            });
             return deferred.promise;
             },


fetchgallerydelete:function(user_id,id,name,bid){
        var deferred=$q.defer();
        var url=this.mygallerydelte_url+user_id+"&id="+id+"&name="+name+"&bid="+bid;
         $http.get(url).then(function(data){
          deferred.resolve(data);
           },function(err){
            deferred.reject(err);
            });
             return deferred.promise;
             },
             //admingallery_url

 AdminGalleryDelete:function(id,name,bid){
         var deferred=$q.defer();
         var url=this.admingallery_url+id+"&name="+name+"&bid="+bid;
          $http.get(url).then(function(data){
           deferred.resolve(data);
            },function(err){
             deferred.reject(err);
             });
              return deferred.promise;
              },


fetchMyforumcommentdelete:function(id){
        var deferred=$q.defer();
         $http.get(this.forumcommentdelete_url+id).then(function(data){
          deferred.resolve(data);
           },function(err){
            deferred.reject(err);
            });
             return deferred.promise;
             },

             fetchMyforumdelete:function(id){
                     var deferred=$q.defer();
                      $http.get(this.forumdelete_url+id).then(function(data){
                       deferred.resolve(data);
                        },function(err){
                         deferred.reject(err);
                         });
                          return deferred.promise;
                          },

fetchMyblogcommentdelete:function(id){
        var deferred=$q.defer();
         $http.get(this.blogcommentdelete_url+id).then(function(data){
          deferred.resolve(data);
           },function(err){
            deferred.reject(err);
            });
             return deferred.promise;
             },
fetchMyblogdelete:function(id){
        var deferred=$q.defer();
         $http.get(this.blogdelete_url+id).then(function(data){
          deferred.resolve(data);
           },function(err){
            deferred.reject(err);
            });
             return deferred.promise;
             },

fetchMyDashboard:function(id){
        var deferred=$q.defer();
         $http.get(this.MyDashBoard_url+id).then(function(data){
          deferred.resolve(data);
           },function(err){
            deferred.reject(err);
            });
             return deferred.promise;
             },


  fetchNationalitydata:function(){
        var deferred=$q.defer();
         $http.get(this.Nationalitiesdata).then(function(data){
          deferred.resolve(data);
           },function(err){
            deferred.reject(err);
            });
             return deferred.promise;
             },

Updateprofile:function(post_data){
console.log(post_data);
return $http.post(globalVars.siteURL + 'myprofile.php',{update:post_data})
                .then(function(msg){
      var compiledData =  globalVars.MainklURl+'MobilePremiumBusiness/user_profilepicupdate';

      var send_data =  {
       User : {
       user_id:post_data.user_id,
       user_logo:post_data.previouslogo_path,
       logo:post_data.update_logo||"",
       firstname:post_data.user_firstName,
       Customize_logo_name:post_data.fname.trim()+post_data.lname.trim(),
       }
        };

       if(send_data['User'].logo !=""){
         return $http.post(compiledData, send_data).success(function(data){},
          function error(err){
        //   return err;
            });
            }
             return msg;
                });
},

getPublicGallery : function(id){

                var fetchUrl = globalVars.siteURL + 'business_galleries.php?function=businessgallery_approvedlist&business_id=' +id + '&TS=' + new Date();
                return $http.get(fetchUrl)
                    .success(function(data){

                        return data;
                    })
                    .error(function(data){

                        return data;
                    });
            },

       /*===================serve data calling functions for listings========================*/
        profileReviewsGet:function(id){
        var deferred=$q.defer();
         $http.get(this.profileReviews+id).then(function(data){
          deferred.resolve(data);
           },function(err){
            deferred.reject(err);
            });
             return deferred.promise;
             },
        profileEnquiryGet:function(id){
          var deferred=$q.defer();
           $http.get(this.profileEnquiries+id).then(function(data){
            deferred.resolve(data);
             },function(err){
             deferred.reject(err);
             });
              return deferred.promise;
                 },
        profileGalleryGet:function(id){
         var deferred=$q.defer();
          $http.get(this.profileGallery+id).then(function(data){
           deferred.resolve(data);
            },function(err){
              deferred.reject(err);
                });
                 return deferred.promise;
                    },
       /*================serve data calling functions for blogs===========*/
       profileBlogsGet:function(id){
                var deferred=$q.defer();
                 $http.get(this.profileBlogs+id).then(function(data){
                  deferred.resolve(data);
                   },function(err){
                     deferred.reject(err);
                       });
                        return deferred.promise;
                           },
       profileBlogCommentGet:function(id){
                var deferred=$q.defer();
                 $http.get(this.profileBlogComments+id).then(function(data){
                  deferred.resolve(data);
                   },function(err){
                     deferred.reject(err);
                       });
                        return deferred.promise;
                           },

       /*================serve data calling functions for forums===========*/
       profileForumsGet:function(id){
                var deferred=$q.defer();
                 $http.get(this.profileForums+id).then(function(data){
                  deferred.resolve(data);
                   },function(err){
                     deferred.reject(err);
                       });
                        return deferred.promise;
                           },
       profileForumCommentGet:function(id){
                var deferred=$q.defer();
                 $http.get(this.profileForumComments+id).then(function(data){
                  deferred.resolve(data);
                   },function(err){
                     deferred.reject(err);
                       });
                        return deferred.promise;
                           },

     /*================serve data calling functions for Ads===========*/
              profileAdsGet:function(id){
                       var deferred=$q.defer();
                        $http.get(this.profileAds+id).then(function(data){
                         deferred.resolve(data);
                          },function(err){
                            deferred.reject(err);
                              });
                               return deferred.promise;
                                  },
              profileAdsEnquiryGet:function(id){
                       var deferred=$q.defer();
                        $http.get(this.profileAdsEnquires+id).then(function(data){
                         deferred.resolve(data);
                          },function(err){
                            deferred.reject(err);
                              });
                               return deferred.promise;
                                  },
            };
   })