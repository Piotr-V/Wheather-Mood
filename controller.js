'use strict';

angular.module('weatherMoodApp', [])
    .controller('openWeather', ['$scope', '$http', function (scope, http) {

        scope.addCity = function () {
            const API_URL = "http://api.openweathermap.org/data/2.5/weather?q=" + scope.ville + "&units=metric&lang=en&id=524901&APPID=b3fe4fbd2a52a33ee8e861552482902d"
            http({
                method: 'GET',
                url: API_URL,
            }).then(function successCallback(response) {
                scope.meteo = response.data.weather[0].main;
                scope.temp = response.data.main.temp + "°C";
                if (scope.meteo == "Clear") {
                    scope.annonce = "It's " + scope.temp + "! " + "Sunny " + scope.ville + " !";
                    scope.ville = '';
                }

                else if (scope.meteo == "Rain") {
                    scope.annonce = "It's raining in " + scope.ville + " today.  " + scope.temp + " only !";
                    scope.ville = '';
                }

                else if (scope.meteo == "Clouds") {
                    scope.annonce = scope.temp + " and cloudy weather in " + scope.ville + ". Keep smiling !";
                    scope.ville = '';
                }

                else if (scope.meteo == "Thunderstorm") {
                    scope.annonce = "There's a thunderstorm in " + scope.ville + ". " + scope.temp + ", cars are flying!";
                    scope.ville = '';
                }

                else if (scope.meteo == "Fog") {
                    scope.annonce = "It's foggy in " + scope.ville + ". Only " + scope.temp;
                    scope.ville = '';
                }

                else if (scope.meteo == "Snow") {
                    scope.annonce = "Lots of snow in " + scope.ville + " today, and a low " + scope.temp;
                    scope.ville = '';
                }

                else {
                    scope.annonce = "Le temps n'est pas certain à " + scope.ville + ".";
                    scope.ville = '';
                }

            }, function errorCallback(response) {
                scope.annonce = "La ville entrée ne correspond à aucune ville terrestre connue à ce jour.";
                scope.ville = '';
            })

            scope.city = {};
            http({
                method: 'POST',
                url: "http://localhost:3000/db",
                data: scope.ville,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
                .success(function (data) {
                    if (data.errors) {
                    } else {
                        scope.ville = data.ville;
                    }
                })
        }
    }]);
