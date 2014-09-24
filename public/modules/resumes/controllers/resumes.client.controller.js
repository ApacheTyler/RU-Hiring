'use strict';

// Resumes controller
angular.module('resumes').controller('ResumesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resumes', 'UserResumes',
	function($scope, $stateParams, $location, Authentication, Resumes, UserResumes ) {
		$scope.authentication = Authentication;

        $scope.ranks = ['Freshman', 'Sophmore', 'Junior', 'Senior'];

		// Create new Resume
		$scope.create = function() {
			// Create new Resume object
			var resume = new Resumes ({
				name: this.name
			});

			// Redirect after save
			resume.$save(function(response) {
				$location.path('resumes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Resume
		$scope.remove = function( resume ) {
			if ( resume ) { resume.$remove();

				for (var i in $scope.resumes ) {
					if ($scope.resumes [i] === resume ) {
						$scope.resumes.splice(i, 1);
					}
				}
			} else {
				$scope.resume.$remove(function() {
					$location.path('resumes');
				});
			}
		};

		// Update existing Resume
		$scope.update = function() {
			var resume = $scope.resume;
			resume.$update(function() {
				$location.path('resumes/' + resume._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Resumes
		$scope.find = function() {
			$scope.resumes = Resumes.query();
		};

		// Find existing Resume
		$scope.findOne = function() {
			$scope.resume = Resumes.get({
				resumeId: $stateParams.resumeId
			});
		};

        $scope.findUserResume = function(){
            $scope.resume = UserResumes.get();
        };

        $scope.saveUserResume = function(){
            // Create new Resume object
            var resume = new UserResumes ({
                name: $scope.resume.name
            });

            resume.$save(function(response) {//Success
                $location.path('resumes/' + response._id);
                $scope.name = '';
            },
            function(errorResponse) {//Error
                $scope.error = errorResponse.data.message;
            });
        };

	}
]);
