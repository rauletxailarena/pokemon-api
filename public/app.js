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
    pokemon1.name = pokemonName
    console.log("pokemon 1 name:", pokemon1.name);
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
  pokemon1.attacks = attacksArray
  console.log("Pokemon 1 attacks:", pokemon1.attacks);
}

var makePokemonRequest = function(pokemonName){
  var url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName
  var request = new XMLHttpRequest();
  request.open("GET", url)
  request.send();
  request.addEventListener('load', function(){
    var pokemonObject = JSON.parse(this.responseText);
    console.log("Pokemon object:", pokemonObject);
    setPokemonImage(pokemonObject);
    getPokemonHP(pokemonObject);
    getPokemonAttacksArray(pokemonObject);
  });
}

var setPokemonImage = function(pokemonObject, position){
  clearPokemonImage();
  var pokemonInfoDiv = document.querySelector("#pokemon-info");
  var ImageUrl = pokemonObject.sprites.front_default
  var pokemonImage = document.createElement("img");
  pokemonImage.src = ImageUrl;
  pokemonInfoDiv.appendChild(pokemonImage);
}

var clearPokemonImage = function() {
  var pokemonInfoDiv = document.querySelector("#pokemon-info");
  while (pokemonInfoDiv.hasChildNodes()){
    pokemonInfoDiv.removeChild(pokemonInfoDiv.lastChild);
  }
}

window.addEventListener("load", app);
