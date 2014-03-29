
'use strict';


/**
 * @ngdoc module
 * @name cartogram_directives
 * @description
 * This module houses all reusible Cartogram Directives. Prefixed with cg
 */

angular.module('Cartogram', [])


/**
 * @ngdoc directive
 * @name cgSwiper
 * @description
 *
 * Simple Directive to wrap Fix the swiper plugin.
 *
 */

// .directive('cgSwiper', function () {
// 	return {
// 		restrict: 'A',
// 		link: function(scope, $elm) {

// 			var swiper = $elm.swiper({
// 				grabCursor:true,
// 				loop: true,
// 				autoplay:5000
// 			});

// 			console.log ('swiper messagae');
// 		}
// 	};
// })

 
/**
 * @ngdoc directive
 * @name cg_popup
 * @description
 *
 * Simple Directive to wrap the Magnific Popup jQuery plugin.
 * assumes no settings so element must have appropriate classes and data attributes
 * to interface with Magnific Popup Plugin
 *
 */

// .directive('cgPopup', function () {
// 	return {
// 		restrict: 'A',
// 		link: function(scope, $elm, attrs) {
// 			var type = attrs.type || 'iframe';
// 			console.log(type);
		
// 			$elm.magnificPopup({
// 				type : type
// 			});
// 		}
// 	};
// })



/**
 * @ngdoc directive
 * @name cg_scroll_on_click
 * @description
 *
 * Simple Directive to handle clicking and scrolling to elements on a long page.
 * Targets the href (ie:#footer) or scrolls to the top of the page.
 * 
 */


.directive('cgScrollOnClick', function (cgEvents) {
	return {
		restrict: 'A',
		link: function(scope, $elm, attrs) {
			var idToScroll = attrs.cgScrollOnClick,
				$html = $('body, html');

			$elm.on(cgEvents.buttonPressedEvent(), function() {
				var $target;
				if (idToScroll) {
					$target = $(idToScroll).offset().top;
				} else {
					$target = 0;
				}
				$html.animate({scrollTop: $target}, 450, 'easeInOutExpo');
			});
		}
	};
})



/**
 * @ngdoc directive
 * @name cg_fetch_twitter
 * @description
 *
 * Simple Directive to wrap the functionality of Twitter Fetcher
 * found here http://codepen.io/jasonmayes/pen/Ioype
 * 
 */


// .directive('cgFetchTwitter', function () {
// 	return {
// 		restrict: 'A',
// 		link: function(scope, $elm, attrs) {

// 			var appId = attrs.cgFetchTwitter,
// 				count = attrs.count,
// 				url = attrs.url;

// 			var handleTweets = function(tweets){
// 				var x = tweets.length,
// 					n = 0,
// 					content = '<a class="twitter__link" href="' + url + '"><i class="icon-twitter twitter__icon"></i><span class="twitter__label">Latest Tweet</span></a>';
				
// 				while(n < x) {
// 					content += '<div class="twitter__item">'+tweets[n]+'</div>';
// 					n++;
// 				}


// 				$elm.html(content);
// 			};

// 			twitterFetcher.fetch(appId, $elm, count, true, false, true, '', false, handleTweets, false);
			
// 		}
// 	};
// })


/**
 * @ngdoc provider
 * @name modernizr
 * @description
 *
 * I created a simple provider that will allow Modernizr 
 * to be injected into our directive rather than accessed globally. 
 *
 * Modernizr is used to detect touch later on in directives.
 * 
 */

.provider('Modernizr', function () {
	this.$get = function () {
		return Modernizr || {};
	};
})

/**
 * @ngdoc factory
 * @name cg_dimensions
 * 
 */

.factory('cgDimensions', function() {
	return {
		getViewportHeight : function() {
			var docElement = document.documentElement,
				client = docElement.clientHeight,
				inner = window.innerHeight;
			if( client < inner ) {
				return inner;
			} else {
				return client;
			}
		}
	};
})


/**
 * @ngdoc factory
 * @name cg_events
 * 
 */

.factory('cgEvents', function(Modernizr) {
	return {
		buttonPressedEvent : function() {
			if ( Modernizr.touch ) {
				return 'touchstart';
			} else {
				return 'click';
			}
		}
	};
})




/**
 * @ngdoc directive
 * @name cgFillViewPort
 * @description
 *
 * Simple Directive to make a dom element's height equal to that of the view port.
 *
 */



.directive('cgFillViewPort', function (cgDimensions) {
	return {
		restrict: 'A',
		link: function(scope, $elm) {
			
			var resizer = function() {
				$elm.height(cgDimensions.getViewportHeight());
			};
			
			
			$(window).resize(  resizer );
			
			$elm.height(cgDimensions.getViewportHeight());
			
			

		}
	};
})


/**
 * @ngdoc directive
 * @name cg_nav_toggle
 * @description
 *
 * Directive to add funtionality to the navigation toggle links.
 * adds and removes click event to the site container (everything outside
 * of the navigation) to close the navigation when it is shown.
 * 
 * Use CSS to actually show and hide the navigation using the states applied
 * here.
 * 
 */


.directive('cgNavToggle', function (cgEvents) {
	return {
		restrict: 'A',
		link: function(scope, $elm, attrs) {
			
			var $html = $('html'),
				$site = $('.js-site'),
				state = attrs.state || 'state-nav-is-shown';

			var toggleNav = function() {
				if(!$html.hasClass(state)) {
					$html.addClass(state);
					console.log($site);
					$site.on(cgEvents.buttonPressedEvent(), function() {
						toggleNav();
					});
				} else {
					$html.removeClass(state);
					$site.off(cgEvents.buttonPressedEvent());
				}
			};

			$elm.on(cgEvents.buttonPressedEvent(), function() {
				toggleNav();
			});
		}
	};
});

