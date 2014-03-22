'use strict';

angular.module('governorApp')
.controller('ReviewsCtrl', function ($scope, $routeParams, $location, Global, Reviews) {
	$scope.global = Global;

	$scope.create = function() {
		var review = new Reviews({
			title: this.title,
			content: this.content
		});
		review.$save(function(response) {
			$location.path('reviews/' + response._id);
		});

		this.title = '';
		this.content = '';
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

	$scope.update = function() {
		var review = $scope.review;
		if (!review.updated) {
			review.updated = [];
		}
		review.updated.push(new Date().getTime());

		review.$update(function() {
			$location.path('reviews/' + review._id);
		});
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
		});
	};
});
