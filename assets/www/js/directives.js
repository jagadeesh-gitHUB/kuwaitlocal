angular.module('ui_directives', [])
/**
  Usage       : vn-ratings
  @             value = value , defaults to 0
                editable = true, enables editing
                handler = scope variable present in parent controller to handle the editing value (TBD)
  Description : Works out a star rating system based on 5 pointer value
  Author      : Vinodh
*/
.directive('vnRatings', function($timeout){
    return{
        restrict : 'E',
        replace : true,
        template :  '<div class="rating_block font_size_15 pos_relative">' +
                        '<div class="rating_pattern"></div>'+
                        '<div class="gray_bar"></div>' +
                        '<div class="rating_fill"></div>'+
                    '</div>',
        link : function(scope, ele, attrs){
            var childArray = ele.children();
            var getFillBar = childArray[childArray.length-1];
            if(attrs.editable === 'true'){
                ele.bind('click', function (e) {
                    var rect = ele[0].getBoundingClientRect();
                    var docEl = document.documentElement;
                    var left = rect.left + (window.pageXOffset || docEl.scrollLeft || 0);
                    var setFillValue = e.pageX - left;
                    angular.element(getFillBar).css({'width' : setFillValue + 'px'});
                    var calc = (setFillValue / ele[0].offsetWidth) * 100;
                    starValue = Math.round(calc/20 * 2) / 2;
                    scope.usersRatingVisual(starValue);
                    $timeout(function(){
                        scope.$apply();   //Updates parent scope
                    });
                });
            }
            var rating_value = parseInt(attrs.value) || 0;
            var innerElt = ele.children();
            angular.element(innerElt[2]).css({'width':rating_value * 20 + '%'});
        }
    };
})
.directive('vnBlockRatings', function($timeout){
    return{
        restrict : 'E',
        replace : true,
        template :  '<ul class="rating_block font_size_15 pos_relative chunk_rating">' +
                        '<li ng-repeat="star in totalStars track by $index" class="ion-ios7-star gray_star" ng-click="starThis($index)"></li>' +
                    '</ul>',
        link : function(scope, ele, attrs){
            scope.totalStars = [];                        //Initializes array register
            scope.totalStars.length = attrs.total || 5;   //Initializes based on user value or defaults to 5
            var childArray = ele[0].children;             //Registers all children

            //ng-click function to apply styling to class and send rating value to scope
            scope.starThis = function(index){
              cleanStars();
                for(var i = 0; i<=index; i++){
                  var axe = childArray[i];
                  angular.element(axe).addClass('orange_star');
                }
                scope.usersRatingVisual(index+1);
                $timeout(function(){
                    scope.$apply();   //Updates parent scope
                });
            };

            //Clears all stars before applying styling
            function cleanStars(){
               for(var i=0; i<=childArray.length; i++){
                  var thisChild = childArray[i];
                  angular.element(thisChild).removeClass('orange_star');
               }
            }
        }
    };
})
    //Stupid directive to clear out the child directive view , in case parent controller cant clear it
.directive('vnClear', function(){
    return{
        restrict: 'A',
        scope : { model: '=ngModel', clearx : '@' },
        controller : function($scope, $timeout, $rootScope){
            $rootScope.$on('cleanup', function(){
                $scope.model = '';
            })
        }
    }
})
//Loader which works only in content zone
.directive('vnLoader', function(){
    return{
        restrict  : 'E',
        replace   : true,
        template  :   '<div class="loader_backdrop">'+
                        '<div class="loading_box">'+
                          '<div class="loader ion-loading-c">'+
                          '</div>'+
                        '</div>'+
                      '</div>',
        link : function(scope, ele, attrs){

        }
    };
})
//Directive to handle external urls on href
.directive('browseTo', function ($ionicGesture, $window) {
 return {
  restrict: 'A',
  link: function ($scope, $element, $attrs) {
   var handleTap = function (e) {
    // todo: capture Google Analytics here
    var inAppBrowser = $window.open(encodeURI($attrs.browseTo), '_system');
   };
   var tapGesture = $ionicGesture.on('tap', handleTap, $element);
   $scope.$on('$destroy', function () {
    // Clean up - unbind drag gesture handler
    $ionicGesture.off(tapGesture, 'tap', handleTap);
   });
  }
};
})
.directive('lastElementHook', function($timeout){
    return{
        restrict : 'A',
        link : function(scope, ele, attrs){
            scope.$watch('$last',function(){
                $timeout(function(){
                    scope.$apply(function(){
                        var co_elt = ele.children();
                        var len = co_elt.length;

                        angular.element(co_elt.eq(len-1).css({'height': co_elt.eq(1).find('img').prop('offsetHeight') + "px", 'line-height': co_elt.eq(1).find('img').prop('offsetHeight') + "px"}));
                    });
                }, 90);
            });
        }
    };
})
.directive('vnDirectionMap', function($timeout, globalVars){
  return{
      restrict : 'E',
      replace : true,
      template : '<div id="gmap" ng-style="style()">'+
                 '</div>',
      link : function(scope, ele, attrs){
          var thisElement = angular.element(ele).parent();
          scope.style = function () {
              return {
                  'height': thisElement[0].clientHeight + 'px',
                  'width': thisElement[0].clientWidth + 'px'
              };
          };
          $timeout(function(){
              scope.$apply();
          }, 10);
          var map;
          var myLat = globalVars.deviceLat;
          var myLng = globalVars.deviceLng;
          var directionsDisplay;
          var directionsService = new google.maps.DirectionsService();
          directionsDisplay = new google.maps.DirectionsRenderer();

          var mapOptions = {
          center: new google.maps.LatLng(myLat,myLng),
          zoom: 12
          };


          map = new google.maps.Map(document.getElementById("gmap"),mapOptions);
          directionsDisplay.setMap(map);
          var marker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
            title: 'Click to zoom',
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
            });
          calcRoute();
          function calcRoute() {
            var start = new google.maps.LatLng(myLat,myLng);
            var end = new google.maps.LatLng(globalVars.currentReqLat, globalVars.currentReqLng);

            var request = {
                origin:start,
                destination:end,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
              }
            });
          }
      }
  };
})
.directive('vnGetpicModal', function($timeout, $cordovaCamera, $rootScope, fileUpload){
    return{
        restrict : 'E',
        replace  : true,
        template : '<div class="modal_backdrop" ng-click="close_modal()">' +
                      '<div class="loading_box gallery_box">' +
                          '<div class="action_panel">' +
                            '<p>From Camera</p>' +
                            '<span class="icon ion-camera"></span>' +
                          '</div>' +
                          '<div class="action_panel">' +
                            '<span class="icon ion-images"></span>' +
                            '<p>From Gallery</p>' +
                          '</div>' +
                      '</div>' +
                   '</div>',
        link : function(scope, element, attrs){
            childElements = element.children().children();
            //Native event call for stopping click events
            angular.element(childElements[0]).bind('click', function(e){
                e.stopPropagation();

                getPicture(1);
            });
            //Native event call for stopping click events
            angular.element(childElements[1]).bind('click', function(e){
                e.stopPropagation();
                getPicture(2);
            });
            //Closes the pop up on touching backdrop
            scope.close_modal = function(){
                $rootScope.isBackdropActive = false;

            };

            function getPicture(sourceType){
                if(sourceType == 2){
                    $cordovaCamera.getPicture({
                          destinationType: Camera.DestinationType.FILE_URI,
                          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                        }).then(function(datapath){
                          fileUpload.uploadPhoto(datapath, 'business_galleryimages');
                        });
                }
                else {
                    $cordovaCamera.getPicture({
                            destinationType: Camera.DestinationType.FILE_URI,
                            sourceType: Camera.PictureSourceType.CAMERA,
                            correctOrientation : false
                        }).then(function(datapath){
                            fileUpload.uploadPhoto(datapath, 'business_galleryimages');
                        });
                }
            }
        }
    };
})
.directive('vnCheckValidity', function($rootScope){
  return{
      restrict : 'A',
      link : function(scope, elt, attrs){
        $rootScope.$on('axedForm', function(){
           // scope.defaultForm.$setPristine();
        });
        if(attrs.name === 'formHandler'){
         scope.$watch('formHandler.$valid', function(res){
            if(res === true){
                scope.$emit('formIsValid', 'f1');
            }
            else{
                scope.$emit('formIsNotValid', 'f1');
            }
         });
       }
       if(attrs.name === 'formHandler3'){
        scope.$watch('formHandler3.$valid', function(res){
           if(res === true){
               scope.$emit('formIsValid', 'f3');
           }
           else{
               scope.$emit('formIsNotValid', 'f3');
           }
        });
      }
      if(attrs.name === 'formHandler4'){
       scope.$watch('formHandler4.$valid', function(res){
          if(res === true){
              scope.$emit('formIsValid', 'f4');
          }
          else{
              scope.$emit('formIsNotValid', 'f4');
          }
       });
     }
     if(attrs.name === 'defaultForm'){
       scope.$watch('defaultForm.$valid', function(res){
          if(res === true){
              scope.$emit('formIsValid', 'default');
          }
          else{
              scope.$emit('formIsNotValid', 'default');
          }
       });
     }
      }
  };
})
.directive('ngRepeatRange', function () {
    return {
        scope: { from: '=', to: '=', step: '=' },

        link: function (scope, element, attrs) {

            // returns an array with the range of numbers
            // you can use _.range instead if you use underscore
            function range(from, to, step) {
                var array = [];
                while (from + step <= to)
                    array[array.length] = from += step;

                return array;
            }

            // prepare range options
            var from = scope.from || 0;
            var step = scope.step || 1;
            var to   = scope.to   || attrs['ngRepeatRange'];

            // get range of numbers, convert to the string and add ng-repeat
            var rangeString = range(from, to, step).join(',');
            element.attr('ng-repeat', 'n in [' + rangeString + ']');
            element.removeAttr('ngRepeatRange');
        }
    };
})
.directive('contentItem', function ($compile) {
        //TEMPLATES
        var textInput = '<ng-form><div>' +
                            '<label>{{content.label}}</label>'+
                            '<input type="text" name="content_name" ng-model="content_name"/>' +
                        '</div></ng-form>';
        var selectBox = '<ng-form><div>' +
                            '<label>{{content.label}}</label>'+
                            '<select ng-model="content_name" ng-options="content.data">' +
                                //'<option>{{content.placeholder}}</option>' +
                                //'<option ng-repeat="each in content.data">{{each.name}}</option>'+
                            '</select>' +
                        '</div></ng-form>';
        var textareaType = '<ng-form><div>' +
                                '<label>{{content.label}}</label>'+
                                '<textarea ng-model="content_name" name="content_name"></textarea>' +
                           '</div></ng-form>';
        //Template seeker
        var getTemplate = function(type){
            var template = '';
            switch(type){
                case 'text' :
                    template = textInput;
                    break;
                case 'select' :
                    template = selectBox;
                    break;
                case 'textarea' :
                    template = textareaType;
                    break;
            }
            return template;
        };
        var linker = function(scope, element, attrs) {
            function replaceAll(find, replace, str) {
                return str.replace(new RegExp(find, 'g'), replace);
            }
            var temp = getTemplate(scope.content.type).replace(/content_name/g, scope.content.name);
            if(scope.content.type === 'select'){

                temp = temp.replace(/content.data/g, scope.content.data);
            }
            element.html(temp).show();
            $compile(element.contents())(scope);
            $compile(element.contents())(scope.$parent);
        };

        return {
            restrict: "E",
            link: linker,
            scope: {
                content:'='
            }
        };
})
.directive('starRating',function() {
		return {
			restrict : 'A',
			template : '<ul class="rating">'
					 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
					 + '\u2605'
					 + '</li>'
					 + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};

				scope.toggle = function(index) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};

				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						if (newVal) {
							updateStars();
						}
					}
				);
			}
		};
	})
.directive('fallbackSrc', function () {
        var fallbackSrc = {
            link: function postLink(scope, iElement, iAttrs) {
                iElement.bind('error', function() {
                    angular.element(this).attr("src", iAttrs.fallbackSrc);
                });
            }
        }
        return fallbackSrc;
    })
.directive('googleAdsense', function($window, $compile) {
 var adSenseTpl = '<ins class="ad-div adsbygoogle responsive" style="display:inline-block;width:468px;height:60px" data-ad-client="ca-pub-6635403237665178" data-ad-slot="4352874841" data-ad-format="auto"></ins>';
console.log(adSenseTpl);
  return {
  restrict: 'A',
   transclude: true,
    template: adSenseTpl,
      replace: false,
       link: function postLink(scope, element, iAttrs) {
         element.html("");
          element.append(angular.element($compile(adSenseTpl)(scope)));
           if (!$window.adsbygoogle) {
             $window.adsbygoogle = [];
              }
               $window.adsbygoogle.push({});
                 }
                  };
                    })
.directive('myYoutube', function($sce) {
          return {
            restrict: 'EA',
            scope: { code:'=' },
            replace: true,
            template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
            link: function (scope) {
                console.log('here');
                scope.$watch('code', function (newVal) {
                   if (newVal) {
                       scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
                   }
                });
            }
          };
        })
.directive('focusMe', function($timeout, $parse) {
          return {
            link: function(scope, element, attrs) {
              var model = $parse(attrs.focusMe);
              scope.$watch(model, function(value) {
                if(value === true) {
                  $timeout(function() {
                    element[0].focus();
                  });
                }
              });
              element.bind('blur', function() {
              // scope.$apply(model.assign(scope, false));
              })
            }
          };
        })
.directive('autofocus', ['$timeout', function($timeout) {
          return {
            restrict: 'A',
            link : function($scope, $element) {
            console.log($element);
              $timeout(function() {
                $element[0].focus();

              });
            }
          }
        }])
.directive("whenScrolled", function ($window) {
    return{
        restrict: 'A',
        link: function (scope, elem, attrs) {
            raw = elem[0];
            console.log(raw);
            var checkBounds = function (evt) {
                var rectObject = raw.getBoundingClientRect();
                if ($window.innerHeight >rectObject.bottom+100) {
                    scope.loading = true;
                    scope.$apply(attrs.whenScrolled);
                }
            };
            angular.element($window).bind('scroll load', checkBounds);
        }
    };
})
.directive('multipleEmails', function () {
           var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_'{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
           function validateAll(ctrl, validatorName, value) {
           var validity = ctrl.$isEmpty(value) || value.split(',')
           .every(
           function (email) {
            return EMAIL_REGEXP.test(email.trim());
             }
             );
             ctrl.$setValidity(validatorName, validity);
              return validity ? value : undefined;
               }
                return {
                                 restrict: 'A',
                                 require: 'ngModel',
                                 link: function postLink(scope, elem, attrs, modelCtrl) {
                                 function multipleEmailsValidator(value) {
                                 return validateAll(modelCtrl, 'multipleEmails', value);
                                 };

                                 modelCtrl.$formatters.push(multipleEmailsValidator);
                                 modelCtrl.$parsers.push(multipleEmailsValidator);
                                 }
                                 };
                                 });
