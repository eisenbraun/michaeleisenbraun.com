var controllers = angular.module('me.controllers', []);

controllers.controller('NavCtrl', function($scope, $location, $anchorScroll, $document, $window) {
    $scope.selected = 'intro';
    $scope.bounds = {};

    $scope.getBounds = function(element) {
        console.log(sections);
        for(section in sections) { 
            if(typeof sections[section] === 'object') {
                $scope.bounds[section] = sections[section].getBoundingClientRect();
            }
        }
    };

    $scope.goTo = function(anchor) {
        console.log(anchor);
        $location.hash(anchor);
        $scope.selected = anchor;
        $document.scrollTo(sections[anchor], 20, 500);
    };

    $scope.init = function() { 
        $scope.getBounds(); 

        angular.element($document).bind("scroll", function() {
            var top = $document.scrollTop(); 

            if(top >= $scope.bounds.contact.top - 200) {
                $scope.selected = 'contact';
            } else if(top >= $scope.bounds.about.top && top < $scope.bounds.contact.top - 200) {
                $scope.selected = 'about';
            } else if(top >= $scope.bounds.projects.top && top < $scope.bounds.about.top) {
                $scope.selected = 'projects';
            } else if(top < 100) { 
                $scope.selected = 'intro';
            }

            $scope.$apply();
        });

        angular.element($window).bind("resize", function() { 
            $scope.getBounds();
            $scope.$apply();
        });

        console.log($scope.selected);
    }

    $scope.init();
});