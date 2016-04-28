'use strict';

/**
 * @ngdoc overview
 * @name pokemonsApp
 * @description
 * # pokemonsApp
 *
 * Main module of the application.
 */
angular
  .module('pokemonsApp', [
    'ngResource',
    'ngRoute'
  ])


  .config(function ($routeProvider) {
    $routeProvider
      .when('/pokemons', {
        templateUrl: 'views/choosepockemon.html',
        controller: 'twelvePokemonsController'
      })
      .when('/pokemons/:id', {
        templateUrl: 'views/onepokemon.html',
        controller: 'onePokemonController'
      })
      .otherwise({
        redirectTo: '/pokemons'
      });



});
