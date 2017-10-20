var app = function () {
  console.log("app being called")
  makeInitialRequest();
}

var makeInitialRequest = function (){
  url = "https://pokeapi.co/api/v2/pokemon/?limit=151"

  var request = new XMLHttpRequest();
  request.open("GET", url)
  request.send();
  request.addEventListener('load', function(){
    var pokemons = JSON.parse(this.responseText);
    var listOfPokemons = pokemons["results"];
    var pokemonObjects
    // pokemonNames = pokemons.count;
    console.dir(listOfPokemons);
  });
}

window.addEventListener("load", app);
