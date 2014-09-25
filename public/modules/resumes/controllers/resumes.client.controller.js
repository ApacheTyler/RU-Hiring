'use strict';

// Resumes controller
angular.module('resumes').controller('ResumesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resumes', 'UserResumes',
	function($scope, $stateParams, $location, Authentication, Resumes, UserResumes ) {

		$scope.authentication = Authentication;

        $scope.jobCounter = 1;

        $scope.jobError = false;

        $scope.jobTitle = '';
        $scope.jobDesc = '';

        //Possible ranks for college student
        $scope.ranks = ['Freshman', 'Sophmore', 'Junior', 'Senior'];

        //Arbitrary value set for checkboxes ng-model
        $scope.doodoo = 'null';

        //Number of work histories entered
        $scope.workHistoryCounter = 1;

        //Class numbers in ITEC
        $scope.allClasses = [
                '110',
                '120',
                '122',
                '220',
                '225',
                '226',
                '227',
                '281',
                '310',
                '315',
                '320',
                '324',
                '325',
                '335',
                '340',
                '345',
                '350',
                '352',
                '360',
                '370',
                '371',
                '380',
                '420',
                '425',
                '441',
                '442',
                '451',
                '452',
                '471',
                '472',
                '485',
                '490',
                '495'
        ];



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

        $scope.addClass = function(className){
            var index = $scope.resume.classes.indexOf(className);
            if(index === -1){
                $scope.resume.classes.push(className);
            }
            else{
                $scope.resume.classes.splice(index, 1);
            }

        };

        $scope.addJob = function(){
            if($scope.jobDesc !== '' && $scope.jobTitle !== ''){
                var jobToAdd = {
                    jobTitle: $scope.jobTitle,
                    jobDesc: $scope.jobDesc
                };
                $scope.resume.workHistory.push(jobToAdd);
                $scope.jobError = false;
                $scope.jobTitle = '';
                $scope.jobDesc = '';
            }
            else{
                $scope.jobError = true;
            }
        };

        $scope.deleteJob = function(index){
            $scope.resume.workHistory.splice(index, 1);
        };


        $scope.logger = function(){
            console.log($scope.resume);
        };

	}
]);
