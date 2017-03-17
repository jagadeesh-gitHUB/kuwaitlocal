angular.module('addbiz_directives', [])

.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatGovFinished');
                    //$scope.dummy();\
                });
            }
        }
    };
})
.directive('actionButton', function($document){
    return{
        restrict: 'A',
        link : function(scope, element, attr){
            $document.bind('click', function(event){
              if(!angular.element(event.target).hasClass('tapZone')){
                  scope.resetActions();
              }
            });
        }
    };
})
.directive('onCatlistFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            /*if(scope.$last === true){
            }*/
        }
    };
})
.directive('onFinishCityRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatCityFinished');
                });
            }
        }
    };
})
.directive('vnMap', function($cordovaGeolocation, globalVars, bizglobalVars, $rootScope) {
    var map;
     var marker=[];
    return {
        restrict: 'E',
        replace: true,
        template: '<div id="gmap" ng-click="markHere"></div>',
         link: function($scope, element, attrs) {
            $scope.waitingGPS = true;

            $scope.$watch('gpsActivity', function(){
            $rootScope.miniLoader = false;
           console.log(globalVars.Add_Biz_deviceLat+"/"+globalVars.Add_Biz_deviceLng);
           console.log($rootScope.ADDLocation_Data);
             var center = new google.maps.LatLng(globalVars.Add_Biz_deviceLat == 0 ? $rootScope.ADDLocation_Data.coords.latitude : globalVars.Add_Biz_deviceLat , globalVars.Add_Biz_deviceLng  == 0 ? $rootScope.ADDLocation_Data.coords.longitude : globalVars.Add_Biz_deviceLng);
                customLat = globalVars.Add_Biz_deviceLat == 0 ? $rootScope.ADDLocation_Data.coords.latitude : globalVars.Add_Biz_deviceLat;
                customLong = globalVars.Add_Biz_deviceLng  == 0 ? $rootScope.ADDLocation_Data.coords.longitude : globalVars.Add_Biz_deviceLng;
                var map_options = {
                zoom: 13,
                center: center,
                mapTypeId: google.maps.MapTypeId.ROADMAP
                 };
                 /*if(globalVars.Add_Biz_edit_status==false){
                 globalVars.Add_Biz_deviceLat=0;
                 globalVars.Add_Biz_deviceLng=0;
                 }*/
                var sendCoords = {
                    lat : customLat,
                    lng : customLong
                };
                $rootScope.$broadcast('userAddedCoords', sendCoords); // send coordinates to controllers
                // create map
               map  = new google.maps.Map(document.getElementById(attrs.id), map_options);

                $scope.waitingGPS = false;
                  // Create the search box and link it to the UI element.
                        var input = document.getElementById('pac-input');
                        var searchBox = new google.maps.places.SearchBox(input);
                        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
                        // Bias the SearchBox results towards current map's viewport.
                        map.addListener('bounds_changed', function() {

                          searchBox.setBounds(map.getBounds());
                        });
                          // configure marker
                            var marker_options = {
                             map: map,
                             position: center,
                             draggable: true
                              };
                               // create marker

                     marker=new google.maps.Marker(marker_options);
                    bizglobalVars.haveTrack = true;
                     var searchGPS = true;
                      // Listen for the event fired when the user selects a prediction and retrieve
                  // more details for that place.
                  searchBox.addListener('places_changed', function() {
                    var places = searchBox.getPlaces();

                    if (places.length == 0) {
                      return;
                    }

                    // Clear out the old markers.
                   if(marker.length > 0){
                                       marker.forEach(function(marker) {
                                         marker.setMap(null);
                                       });
                                       }
                                       marker= [];

                    // For each place, get the icon, name and location.
                    var bounds = new google.maps.LatLngBounds();
                    places.forEach(function(place) {
                      var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                      };

                      // Create a marker for each place.
                      marker=new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: place.name,
                        draggable: true,
                        position: place.geometry.location,
                         animation: google.maps.Animation.DROP,
                         });
//
                    //   marker.push(new google.maps.Marker(marker_options));

                      if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                      } else {
                        bounds.extend(place.geometry.location);
                      }
                    });
                    map.fitBounds(bounds);
                  });


                /*$scope.$watch('mapModal', function () {
                    if(searchGPS){
                         window.setTimeout(function(){
                            google.maps.event.trigger(map, 'resize');
                            map.panTo(new google.maps.LatLng(globalVars.deviceLat,globalVars.deviceLat));
                            if(!$scope.$$phase) {
                                $scope.$apply(function(){
                                    $scope.setData.lat = globalVars.deviceLat;
                                    $scope.setData.long = globalVars.deviceLat;
                                });
                            }
                         },300);
                    }
                });*/
                 google.maps.event.addListener(map, 'click', function(event) {
               $rootScope.miniLoader = true;
                    deleteAllMarkers();
                    addMarker(event.latLng);
                      });
                function deleteAllMarkers() {
                 marker.setMap(null);
                  marker=[];
                  }
                function addMarker(location) {
                //alert(location);
                    bizglobalVars.haveTrack = true;
                    marker = new google.maps.Marker({
                        position: location,
                        map: map,
                        draggable: true
                    });
                    var sendCoords = {
                        lat : marker.getPosition().lat(),
                        lng : marker.getPosition().lng()
                    };

                    $rootScope.$broadcast('userAddedCoords', sendCoords);
                    searchGPS = false;
                    $rootScope.miniLoader = false;
                }
                google.maps.event.addListener(marker, 'dragend', function(){
                    var sendCoords = {
                        lat : marker.getPosition().lat(),
                        lng : marker.getPosition().lng()
                    };

                    $rootScope.$broadcast('userAddedCoords', sendCoords);


                    globalVars.Add_Biz_deviceLat=sendCoords.lat;

                   globalVars.Add_Biz_deviceLng=sendCoords.lng;



                    searchGPS = false;
                });
            });


        }
    };
})
.directive('vnMapModal', function($rootScope){
    return{
        restrict  : 'E',
        replace   : true,
        template  :   '<div class="map_backdrop">'+
                        '<div class="map_box">'+
                          '<vn-map></vn-map>'+
                          '<button ng-click="closeModal()" class="btn blue_btn">Save and Continue</button>' +
                        '</div>'+
                      '</div>',
        link : function(scope, ele, attrs){
            scope.closeModal = function(){

                $rootScope.mapModal = false;

                $("#pac-input").remove();

            };
        }
    };
});
