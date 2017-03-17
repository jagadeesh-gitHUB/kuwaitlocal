angular.module('facebook.services', [])

.service('facebookData', function($http, $q, globalVars, localStorageService){
    return{
        myfbaccessdata : {},
        mycheckins : localStorageService.get('kl.checkins') || [],      //Only use this for emulating, actual API request relies on server data
        myfriends : [],
        getFriendList : function(){

         return $http.get(globalVars.MainklURl+'Mobilefacebook/friends_accepted_list?user_id=' + globalVars.userInfo.id + '&TS=' + new Date())
                .success(function(data){
                    return data;
                })
                .error(function(err){
                    return err;
                })
        },
        myInvitesStore : function(data){
            var post_data = {
                friends : data
            }
            return $http.post(globalVars.siteURL+'addfriends.php?module=friends_insert&user_id=' + globalVars.userInfo.id, post_data)
                .success(function(res){

                })
                .error(function(res){

                });
        },
        acceptFriendRequest : function(reqID, resID, resFBID){
            var compiledURI = globalVars.MainklURl+'Mobilefacebook/connect_with_friend?invite_ownerid=' + reqID + '&invite_userid=' + resID + '&facebook_friend_id=' + resFBID;
            return $http.get(compiledURI)
                .success(function(res){

                    if(parseInt(res) === 1){

                    }
                    else{

                    }
                })
                .error(function(res){

                });
        },
        postCheckin : function(data){
            var post_data = data;

            return $http.post(globalVars.MainklURl+'Mobilefacebook/checkin', post_data).success(function(data){
                return data;
            }).error(function(err){
                return err;
            });
        },
        updateStorage : function(){
            if(this.mycheckins){
                localStorageService.set('kl.checkins',this.mycheckins);

            }
        },
        getCheckins : function(){
            var fetchUrl = globalVars.MainklURl+'Mobilefacebook/mycheckin?user_id=' + globalVars.userInfo.id + '&TS=' + new Date();
            return $http.get(fetchUrl)
                .success(function(data){

                    return data;
                })
                .error(function(err){

                    return err;
                })
        },
        convertImgToUrl : function(imgdata){

            var sendURL = globalVars.MainklURl+'Mobilefacebook/facebook_checkinshare'
            return $http.post(sendURL, {'share_img' : imgdata})
                .success(function(data){

                    return data;
                })
                .error(function(data){

                    return data;
                })
        }
    };
})