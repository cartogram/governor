'use strict';

angular.module('governorApp').controller('CreateReviewCtrl', function ($scope, $location, Reviews, Creatives) {
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
	$scope.search = function(searchText) {
		Creatives.query({q:searchText}, function(creatives) {
			$scope.creatives = creatives;
		});
	};

	$scope.start = function(creative) {
		var review = new Reviews({
			state: 'draft',
			creative : creative._id
		});
		
		review.$save(function(response) {
			$location.path('reviews/' + response._id + '/edit');
		});

	};

});
