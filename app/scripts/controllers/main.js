'use strict';

angular.module('pokemonsApp')

.controller('twelvePokemonsController', ['$scope', 'load12PokemonsFactory', 'loadOnePokemonFactory', function ($scope, load12PokemonsFactory, loadOnePokemonFactory) {

    $scope.chunksize = 12;
    $scope.totalNumberOfPokemons = 718;
    $scope.firstCall = true;
    $scope.showPreview = false;
    $scope.currPreviewShift = 0;
    $scope.twelvePockemons = [];
    $scope.allTypesInPage = [];
    $scope.showTypesFilter = false;
    $scope.simplyShowAll12Pokemons = true;

    $scope.labelColor = 'hsl(0, 100%, 50%)';

    function setTypeColorTable() {
        // govnokod detected, he-he :)
        // if i would have more time to finish this task, 
        // then at the first call to this function
        // it will first take all possible types raw data from api at
        // http://pokeapi.co/api/v1/type/?limit=999, then extract and 
        // enumerate all posible types and then assign some funny color to each
        // at the moment i leave colors hardcoded as is
        $scope.possibleColorTypes = {
            'Normal': 'hsl(0, 0%, 60%)',
            'Fighting': 'hsl(24, 100%, 50%)',
            'Flying': 'hsl(210, 100%, 50%)',
            'Poison': 'hsl(280, 70%, 70%)',
            'Ground': 'hsl(0, 50%, 30%)',
            'Rock': 'hsl(30, 100%, 30%)',
            'Bug': 'hsl(120, 100%, 30%)',
            'Ghost': 'hsl(300, 50%, 40%)',
            'Steel': 'hsl(240, 5%, 50%)',
            'Fire': 'hsl(0, 100%, 50%)',
            'Water': 'hsl(195, 100%, 30%)',
            'Grass': 'hsl(90, 100%, 40%)',
            'Electric': 'hsl(60, 90%, 50%)',
            'Psychic': 'hsl(330, 100%, 50%)',
            'Ice': 'hsl(240, 100%, 80%)',
            'Dragon': 'hsl(0, 100%, 30%)',
            'Dark': 'hsl(240, 15%, 20%)',
            'Fairy': 'hsl(300, 100%, 80%)'
        };
    }

    ////////////////////    
    // this function loads a chunk of pokemons 
    // and puts it into $scope variable "twelvePockemons" 
    ////////////////////
    $scope.getNextPokemons = function () {

        $scope.showTypesFilter = false;
        $scope.simplyShowAll12Pokemons = true;

        if ($scope.firstCall) {
            $scope.firstCall = false;
            $scope.iOffset = 0;
            setTypeColorTable();

        } else {
            $scope.iOffset += $scope.chunksize;
        }
        if ($scope.iOffset > $scope.totalNumberOfPokemons) {
            window.alert('Total number of pokemons exceeded!');
            return;
        }

        $scope.showPreview = false; // hide details on previous pokemon, if any

        // this keeps layout and informs that resource is being loaded
        for (var i = 0; i < $scope.chunksize; i++) {
            var currPokemon = {};
            currPokemon.name = 'Loading';
            currPokemon.imageString = 'images/loading.gif';
            currPokemon.types = ['Loading ...'];
            $scope.twelvePockemons[i] = currPokemon;
        }
        ////////////////////////////////////////////////////

        load12PokemonsFactory.get12Pokemons().get({
                offset: $scope.iOffset
            })
            .$promise.then(
                function (response) {
                    var data = response.objects;
                    console.log('Here--->', data);
                    // keep track on all pokemon types in current page, needed for filtering by type
                    var allTypesPresentedInPage = [];
                    for (var pokemonIterator in data) {
                        //console.log('name::', parseInt(pokemonIterator) + $scope.iOffset, data[pokemonIterator].name);

                        currPokemon = {};
                        currPokemon.name = data[pokemonIterator].name;

                        var types = [];
                        for (i = 0; i < data[pokemonIterator].types.length; i++) {
                            types.push(data[pokemonIterator].types[i].name);
                        }
                        // this changes each first letter in pockemon's type to uppercase
                        for (i = 0; i < types.length; i++) {
                            types[i] = types[i].charAt(0).toUpperCase() + types[i].substring(1);
                        }

                        currPokemon.types = types;

                        for (var iTypeIterator = 0; iTypeIterator < types.length; iTypeIterator++) {
                            if (allTypesPresentedInPage.indexOf(types[iTypeIterator]) === -1) {
                                allTypesPresentedInPage.push(types[iTypeIterator]);
                            }
                        }

                        //var iNumber = 1 + parseInt(pokemonIterator) + $scope.iOffset;
                        //currPokemon.iNumber = iNumber;

                        currPokemon.iNumber = data[pokemonIterator].pkdx_id;

                        var charPokemonNumber = currPokemon.iNumber.toString();
                        currPokemon.imageString = 'http://pokeapi.co/media/img/' + charPokemonNumber + '.png';


                        //var clientHeight = document.getElementById(currPokemon.iNumber).clientHeight;
                        //console.log('height of curr pockemon frame==', clientHeight);



                        $scope.twelvePockemons[parseInt(pokemonIterator)] = currPokemon;
                    }

                    //console.log('12Pokemons:: ', $scope.twelvePockemons);
                    allTypesPresentedInPage = allTypesPresentedInPage.sort();
                    $scope.allTypesInPage = allTypesPresentedInPage;
                    $scope.type2Show = allTypesPresentedInPage;
                    $scope.showTypesFilter = true;
                    $scope.simplyShowAll12Pokemons = false;
                    console.log('All types in page:: ', allTypesPresentedInPage, $scope.type2Show);
                },

                function (response) {
                    $scope.message = 'While downloading chunk of pockemons there an error occured:' + response.status + ' ' + response.statusText;
                }

            );

    };
    ////////// --- function getNextPokemons() ends --- ///////////



    $scope.showOnePokemonDetails = function (intPokemonNumber) {

        //console.log('requesting details for:: ', intPokemonNumber);

        // this shifts preview to the same level, where clicked pockemon is located
        var alignPointRectangle = document.getElementById('alignPoint').getBoundingClientRect();
        var currPokemonRectangle = document.getElementById(intPokemonNumber.toString()).getBoundingClientRect();
        var previewShift = currPokemonRectangle.top - alignPointRectangle.top;
        $scope.currPreviewShift = previewShift;

        $scope.showPreview = true;
        $scope.pokemonImage = 'images/loading.gif';
        $scope.strPokemonNumber = '';
        $scope.pokemonName = 'Loading...';
        $scope.pokemonType = '';
        $scope.pokemonAttack = '';
        $scope.pokemonDefense = '';
        $scope.pokemonHP = '';
        $scope.pokemonSPAttack = '';
        $scope.pokemonSPDefense = '';
        $scope.pokemonSpeed = '';
        $scope.pokemonWeight = '';
        $scope.pokemonTotalMoves = '';

        if (intPokemonNumber > 100) {
            $scope.strPokemonNumber = intPokemonNumber.toString();
        }
        if (intPokemonNumber < 100 && intPokemonNumber >= 10) {
            $scope.strPokemonNumber = '0' + intPokemonNumber.toString();
        }
        if (intPokemonNumber < 10) {
            $scope.strPokemonNumber = '00' + intPokemonNumber.toString();
        }


        loadOnePokemonFactory.getOnePokemon().get({
                id: intPokemonNumber
            })
            .$promise.then(
                function (response) {
                    var data = response;
                    console.log(data);

                    $scope.pokemonName = data.name;

                    var types = [];
                    for (var iloop = 0; iloop < data.types.length; iloop++) {
                        types.push(data.types[iloop].name);
                    }
                    // change each first letter in pockemon's type to uppercase
                    for (iloop = 0; iloop < types.length; iloop++) {
                        types[iloop] = types[iloop].charAt(0).toUpperCase() + types[iloop].substring(1);
                    }

                    $scope.pokemonType = types;
                    $scope.pokemonAttack = data.attack;
                    $scope.pokemonDefense = data.defense;
                    $scope.pokemonHP = data.hp;
                    $scope.pokemonSPAttack = data.sp_atk; // set camel case to false in .jshintrc
                    $scope.pokemonSPDefense = data.sp_def;
                    $scope.pokemonSpeed = data.speed;
                    $scope.pokemonWeight = data.weight;
                    $scope.pokemonTotalMoves = data.moves.length;
                    $scope.pokemonImage = 'http://pokeapi.co/media/img/' + intPokemonNumber.toString() + '.png';

                },
                function (response) {
                    $scope.message = 'While downloading single pockemon details there an error occured: ' + response.status + ' ' + response.statusText;
                }
            );




    };
    ////////// --- function showOnePokemonDetails() ends --- ///////////

    $scope.selectType2Show = function (typeName) {
        $scope.type2Show = typeName;
    };


    function twoArraysHaveAtLeastOneCommonElement(arr1, arr2) {
        for (var i = 0; i < arr1.length; i++) {
            if (arr2.indexOf(arr1[i]) > -1) {
                return true;
            }
        }
        return false;
    }

    $scope.showThis = function (strTypesArr) {
        if ($scope.simplyShowAll12Pokemons) {
            return true;
        } else {
            return twoArraysHaveAtLeastOneCommonElement(strTypesArr, $scope.type2Show);
        }
    };


    // finally, load and render first chunk of pokemons, omg it is glorious!
    $scope.getNextPokemons();


}]);