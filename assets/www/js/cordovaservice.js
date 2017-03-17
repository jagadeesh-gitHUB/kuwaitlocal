/*created by jagadeesh on 30-sep-2015

purpose : its holds all cordova service calling like common used like geolocation and network connectio checking

*/

angular.module('cordovacommon.services', ["ngCordova","global.services","ionic"])

.service('cordovareturn', function($cordovaNetwork,$cordovaGeolocation,geoCode,globalVars,$ionicPopup,androidServices ){
getcurrentgovernorate($cordovaGeolocation,geoCode,globalVars,$ionicPopup,'onload');
return {
Getcurrentlocation:function(){
var posOptions = {timeout: 500000, enableHighAccuracy: true};
$cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
var lat  = position.coords.latitude;
var long = position.coords.longitude;
globalVars.currentlat=lat;
globalVars.currentlng=long;
//geoCode.reverseFind(lat,long).then(function(data){
//var dataobj=data.data.results;
//angular.forEach(dataobj, function(v, k){
//angular.forEach(v.types,function(type,k){
//if(type=="administrative_area_level_1"){
//var governoratesname = v.formatted_address.split(",");
//globalVars.currentcityGovernorate=governoratesname[0];
//globalVars.currentlat=lat;
//globalVars.currentlng=long;
//}
//});
//});
//}, function(err){
// globalVars.currentcityGovernorate='error';
// });
          var latlng = new google.maps.LatLng(lat, long);
           // This is making the Geocode request
           var geocoder = new google.maps.Geocoder();
           geocoder.geocode({ 'latLng': latlng }, function (results, status) {
           if (status !== google.maps.GeocoderStatus.OK) {
            globalVars.currentcityGovernorate="kuwait";
            }
             // This is checking to see if the Geoeode Status is OK before proceeding
            if (status == google.maps.GeocoderStatus.OK) {
            var address = (results[0].formatted_address);
             angular.forEach(results, function(v, k){
             angular.forEach(v.types,function(type,k){
             if(type=="administrative_area_level_1"){
             var governoratesname = v.formatted_address.split(",");
             globalVars.currentcityGovernorate=governoratesname[0];
              }
              });
              });
              }
              });


 }, function(err) {
 androidServices.showToast(' Having problem your current location please turn on GPRS / or  click on locatoin icon in view');
 });
 },
 networkconnectioncheck:function(){ }
 };
 });

function getcurrentgovernorate($cordovaGeolocation,geoCode,globalVars,$ionicPopup,typetxt){
var posOptions = {timeout: 500000, enableHighAccuracy: true};
$cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
var lat  = position.coords.latitude;
var long = position.coords.longitude;
globalVars.currentlat=lat;
globalVars.currentlng=long;
var latlng = new google.maps.LatLng(lat, long);
           // This is making the Geocode request
           var geocoder = new google.maps.Geocoder();
           geocoder.geocode({ 'latLng': latlng }, function (results, status) {
           if (status !== google.maps.GeocoderStatus.OK) {
            globalVars.currentcityGovernorate="kuwait";
            }
             // This is checking to see if the Geoeode Status is OK before proceeding
            if (status == google.maps.GeocoderStatus.OK) {
            var address = (results[0].formatted_address);
             angular.forEach(results, function(v, k){
             angular.forEach(v.types,function(type,k){
             if(type=="administrative_area_level_1"){
             var governoratesname = v.formatted_address.split(",");
             globalVars.currentcityGovernorate=governoratesname[0];
              }
              });
              });
              }
              });
}, function(err) {
$ionicPopup.show({
                  template: 'Please check your GPS and/or turn it on before pressing retry',
                  title: 'Geo-Location disabled',
                //  scope: $scope,
                  buttons: [
                      { text: 'Cancel' },
                      {
                          text: '<b>Retry</b>',
                          type: 'button-positive',
                          onTap: function(e) {
                             // $rootScope.miniLoader = true;
                              // $scope.receivedsearchdata==false;
                             // getListings();

                              getcurrentgovernorate($cordovaGeolocation,geoCode,globalVars,$ionicPopup,'onerror');
                          }
                      }
                  ]
              });

    });




}