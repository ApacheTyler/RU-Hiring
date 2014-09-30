'use strict';
angular.module('core').filter('ResumeSearchFilter', function($scope){
    return function (resumes) {
        var filtered = [];

        var searchTerms = $scope.searchText.split(' ');

        var resumeContains = function(res, term){
            if ($scope.term.indexOf(res.name) > -1) {
                return true;
            }
            else if($scope.term.indexOf(res.classes) > -1){
                return true;
            }
            else if($scope.term.indexOf(res.gender) > -1){
                return true;
            }
            else if($scope.term.indexOf(res.rank) > -1){
                return true;
            }
            else{
                return false;
            }
        };

        for (var i = 0; i < resumes.length; i++) {
            var res = resumes[i];
            for (var x = 0; x < searchTerms.length; i++) {
                var term = searchTerms[x];
                if(resumeContains(res,term) && filtered.indexOf(res.id) === -1){
                    filtered.push(res);
                }
            }
        }
        return filtered;
    };
});
