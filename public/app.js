var pokemonObjects;
var pokemon1 = {}
var pokemon2 = {}

var app = function () {
  console.log("app being called")
  makeInitialRequest();
  addEventListenerToSelec();
}

var makeInitialRequest = function (){
  url = "https://pokeapi.co/api/v2/pokemon/?limit=151"
  var request = new XMLHttpRequest();
  request.open("GET", url)
  request.send();
  request.addEventListener('load', function(){
    var pokemons = JSON.parse(this.responseText);
    pokemonObjects = pokemons.results;
    populateSelect();
  });
}

var populateSelect = function(){
  var select = document.querySelector("#pokemon-select");
  for (pokemon of pokemonObjects){
    var pokemonOption = document.createElement("option");
    pokemonOption.textContent = pokemon.name;
    select.appendChild(pokemonOption);
  }
}

var addEventListenerToSelec = function(){
  var select = document.querySelector("#pokemon-select");
  select.addEventListener("change", function(){
    var pokemonName = this.value
    console.log("pokemon name:", pokemonName);
    makePokemonRequest(pokemonName);
  })
}

var getPokemonHP = function(pokemonObject){
  var hp;
  for (item of pokemonObject.stats){
    if (item.stat.name === "hp"){
    }
  }
  hp = item.base_stat;
  pokemon1.hp = hp;
  console.log("pokemon1 hp:", pokemon1.hp);
}

var getPokemonAttacksArray = function(pokemonObject){
  var attacksArray =[];
  for (var i = 0; i < 4; i++){
    var move = pokemonObject.moves[Math.floor(Math.random() * pokemonObject.moves.length)].move;
    attacksArray.push(move);
  }
  console.log("selected pokemon attacks:", attacksArray);
}

var makePokemonRequest = function(pokemonName){
  var url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName
  var request = new XMLHttpRequest();
  request.open("GET", url)
  request.send();
  request.addEventListener('load', function(){
    var pokemonObject = JSON.parse(this.responseText);
    console.log("Pokemon object:", pokemonObject);
    getPokemonHP(pokemonObject);
    getPokemonAttacksArray(pokemonObject);
  });
}

window.addEventListener("load", app);
