'use strict';

angular.module('pokemonsApp')

.constant('PokemonsURI', 'http://pokeapi.co/api/v1/pokemon/')

.factory('loadOnePokemonFactory', ['$resource', 'PokemonsURI', function ($resource, PokemonsURI) {
    return {
        getOnePokemon: function() {
            var filenamestring = PokemonsURI + ':id';
            return $resource(filenamestring);    
        }
    };
}])

.factory('load12PokemonsFactory', ['$resource', 'PokemonsURI', function ($resource, PokemonsURI) {
    return {
        get12Pokemons: function() {
            var filenamestring = PokemonsURI + '?limit=12&offset=' + ':offset';
            return $resource(filenamestring);    
        }
    };
}])

;
