'use strict';

angular.module('governorApp').controller('CreateReviewCtrl', function ($scope, $location, Reviews, Creatives) {
	
	$scope.search = function(searchText) {
		Creatives.query({q:searchText}, function(creatives) {
			$scope.creatives = creatives;
		});
	};

	$scope.getCreative = function(val) {
		var creatives = Creatives.query({q:val});
		return creatives.$promise.then(function(res) {
			var creatives = [];
			angular.forEach(res, function(item){
				creatives.push(item);
			});
			console.log(creatives);
			return creatives;
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
