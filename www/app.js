
var app = angular.module('weatherApp', ['ngResource', 'ngRoute']);

app.constant("baseUrl", "http://api.openweathermap.org/data/2.5/forecast");

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/result', {
        templateUrl: '/views/ResultsView.html'
    });

    $routeProvider.otherwise({
        templateUrl: '/views/SearchView.html'
    });
});

app.factory('weather', function ($resource, baseUrl) {

    var Weather = $resource(baseUrl);

    return {
        getWeather: function (weatherParams) {
            return Weather.get(weatherParams, function (successResult) {
                return successResult;
            }, function (errorResult) {
                console.log(errorResult);
            });
        }
    };
});

app.controller('mainCtrl', function ($scope, $http, $resource, $location, weather) {

    $scope.city = { name: 'toronto' };
    $scope.current = {};
    $scope.loading = false;

    $scope.checkWeather = function () {
        $scope.loading = true;
        var city = {
            q: $scope.city.name
        };

        $scope.weather = Weather.getWeather(city);
        $location.path('/result');
        $scope.loading = false;
    };

    $scope.loadIcons = function () {
        $http.get('/icon.json').success(function (data) {
            $scope.icons = data;
        });
    };

    $scope.getIcon = function (icon) {
        return $scope.icons[icon];
    };

    $scope.getCurrent = function (item) {
        $scope.current = item;
    };

    $scope.loadIcons();
});
