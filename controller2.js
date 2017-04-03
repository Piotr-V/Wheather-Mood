'use strict';

angular.module('weatherMoodApp', [])
    .controller('openWeather', ['$scope', '$http', function ($scope, $http) {

        $scope.addCity = function () {

            const API_URL = "http://api.deezer.com/search/playlist?q=sun"

            $http({
                method: 'GET',
                url: API_URL,
            }).then(function successCallback(response) {
               $scope.id = (response.data.data[0].id);
               $scope.source= "http://www.deezer.com/plugins/player?format=classic&autoplay=true&playlist=true&width=700&height=350&color=007FEB&layout=&size=medium&type=playlist&id="+$scope.id;
               
            }, function errorCallback(response) {
            })
        }
     }]);

     