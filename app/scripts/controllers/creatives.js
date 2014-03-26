'use strict';

angular.module('governorApp')
.controller('CreativesCtrl', function ($scope, $routeParams, $location, Global, Creatives) {
	$scope.global = Global;

	$scope.create = function() {
		var creative = new Creatives({
			name: this.name,
			description: this.description
		});
		creative.$save(function(response) {
			$location.path('creatives/' + response._id);
		});

		this.name = '';
		this.description = '';
	};

	$scope.remove = function(creative) {
		if (creative) {
			creative.$remove();

			for (var i in $scope.creatives) {
				if ($scope.creatives[i] === creative) {
					$scope.creatives.splice(i, 1);
				}
			}
		}
		else {
			$scope.creative.$remove();
			$location.path('creatives');
		}
	};

	$scope.update = function() {
		var creative = $scope.creative;
		if (!creative.updated) {
			creative.updated = [];
		}
		creative.updated.push(new Date().getTime());

		creative.$update(function() {
			$location.path('creatives/' + creative._id);
		});
	};

	$scope.find = function() {
		Creatives.query(function(creatives) {
			$scope.creatives = creatives;
		});
	};

	$scope.findOne = function() {
		Creatives.get({
			creativeId: $routeParams.creativeId
		}, function(creative) {
			$scope.creative = creative;
		});
	};
});
