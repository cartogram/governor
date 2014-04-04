'use strict';

angular.module('governorApp')
.controller('ReviewsCtrl', function ($scope, $routeParams, $location, Global, Reviews, Creatives) {
	
	$scope.global = Global;

	$scope.knobOptions = {
		'width':'100%',
		'fgColor':'#1ABC9C',
		'skin': 'tron',
		'thickness': 0.15,
		'lineCap' : 'round',
		'displayPrevious': true,
		'min' : 0,
		'max' : 10
	};

	$scope.remove = function(review) {
		if (review) {
			review.$remove();

			for (var i in $scope.reviews) {
				if ($scope.reviews[i] === review) {
					$scope.reviews.splice(i, 1);
				}
			}
		}
		else {
			$scope.review.$remove();
			$location.path('reviews');
		}
	};

	$scope.update = function(question) {
		console.log(question.answer);
		var review = $scope.review;
		if (!review.updated) {
			review.updated = [];
		}
		review.updated.push(new Date().getTime());
		for (var i in review.stages) {
			var total;
			for (var x in review.stages[i].questions) {
				total += review.stages[i].questions[x].answer;
				//console.log(review.stages[i].questions[x]);
			}
			// console.log(total);
			// console.log(review.stages[i].total);
		}
		
	};

	$scope.submit = function() {
		var review = $scope.review;
		$scope.update();
		review.$update(function() {
			$location.path('reviews/' + review._id);
		});
	};

	$scope.next = function() {
		console.log('next');
	};

	$scope.find = function() {
		Reviews.query(function(reviews) {
			$scope.reviews = reviews;
			
		});

	};

	$scope.findOne = function() {
		Reviews.get({
			reviewId: $routeParams.reviewId
		}, function(review) {
			$scope.review = review;
			
			Creatives.get({
				creativeId: review.creative
			}, function(creative) {
				$scope.creative = creative;
			});
		});
	};
});
