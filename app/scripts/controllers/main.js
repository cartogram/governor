'use strict';

angular.module('governorApp').controller('MainCtrl', function ($scope, $http, $location, $upload) {
	
	$scope.imageUploads = [];
	
	$scope.abort = function() {
		$scope.upload.abort();
		$scope.upload = null;
	};

	$scope.onFileSelect = function ($files) {
		$scope.files = $files;
		$scope.upload = [];
		
	
		var file = $files;
		file.progress = parseInt(0);
		(function (file) {
			$http.get('/api/s3Policy?mimeType='+ file.type).success(function(response) {
				var s3Params = response;
				$scope.upload = $upload.upload({
					url: 'https://Governor.s3.amazonaws.com/',
					method: 'POST',
					data: {
						'key' : 's3UploadExample/'+ Math.round(Math.random()*10000) + '$$' + file.name,
						'acl' : 'public-read',
						'Content-Type' : file.type,
						'AWSAccessKeyId': s3Params.AWSAccessKeyId,
						'success_action_status' : '201',
						'Policy' : s3Params.s3Policy,
						'Signature' : s3Params.s3Signature
					},
					file: file,
				}).then(function(response) {
					file.progress = parseInt(100);
					if (response.status === 201) {
						var data = response.data,
						parsedData;
						parsedData = {
							location: data.postresponse.location,
							bucket: data.postresponse.bucket,
							key: data.postresponse.key,
							etag: data.postresponse.etag
						};
						$scope.imageUploads.push(parsedData);

					} else {
						console.log('Upload Failed');
					}
				}, null, function(evt) {
					file.progress =  parseInt(100.0 * evt.loaded / evt.total);
				});
			});
		}(file));

	};
});
