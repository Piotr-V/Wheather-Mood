'use strict';

angular.module('weatherMoodApp', [])
    .controller('openWeather', ['$scope', '$http', function ($scope, $http) {
        
      
$scope.addCity = function () {
    var ville = $scope.ville

    const API_URL = "http://api.openweathermap.org/data/2.5/weather?q=" + ville + "&units=metric&lang=en&id=524901&APPID=b3fe4fbd2a52a33ee8e861552482902d"

    $http({
        method: 'GET',
        url: API_URL,
    }).then(function successCallback(response) {
        $scope.meteo = response.data.weather[0].main;
        $scope.temp = response.data.main.temp + "°C";

        if ($scope.meteo == "Clear") {
            $scope.annonce = "Sunny " + $scope.ville + "!!"
            $scope.ville = '';
        }

        else if ($scope.meteo == "Rain") {
            $scope.annonce = "it's rainning in " + $scope.ville + "today.";
            $scope.ville = '';
        }
        else if ($scope.meteo == "Clouds") {
            $scope.annonce = "Cloudy weather in " + $scope.ville + ".";
            $scope.ville = '';
        }

        else if ($scope.meteo == "Thunderstorm") {
            $scope.annonce = "There's a thunderstorm in " + $scope.ville + ".";
            $scope.ville = '';
        }

        else if ($scope.meteo == "Fog") {
            $scope.annonce = "It's foggy in " + $scope.ville + ".";
            $scope.ville = '';
        }

        else if ($scope.meteo == "Snow") {
            $scope.annonce = "Lot's of snow in " + $scope.ville + " today.";
            $scope.ville = '';
        }
        else {
            $scope.annonce = "Le temps n'est pas certain à " + $scope.ville + ".";
            $scope.ville = '';
        }

    }, function errorCallback(response) {
        $scope.annonce = "La ville entrée ne correspond à aucune ville terrestre connue à ce jour.";
        $scope.ville = '';
    })
$http({
        method: 'POST',
        url: "http://localhost/city",
        data: JSON.stringify({application:weatherMoodApp}),
        headers: { 'Content-Type' : 'application/json' },
    }).success(function (data, status, headers, config) {
       $scope.ville = {city:ville};
    }).error(function (data, status, headers, config) {
    $scope.status = status + ' ' + headers;
});

} 
    }]);
