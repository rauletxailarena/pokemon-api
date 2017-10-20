var pokemonObjects;
var pokemon1 = new Pokemon();
var pokemon2 = new Pokemon();

var app = function () {
  console.log("app being called")
  makeInitialRequest();
  addEventListenerToSelects();
}

var makeInitialRequest = function (){
  console.log("Making initial request...");
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
  var select = document.querySelector("#pokemon-select-1");
  var select2 = document.querySelector("#pokemon-select-2");
  for (pokemon of pokemonObjects){
    var pokemonOption = document.createElement("option");
    var pokemonOption2 = document.createElement("option");
    pokemonOption.textContent = pokemon.name;
    pokemonOption2.textContent = pokemon.name;
    select.appendChild(pokemonOption);
    select2.appendChild(pokemonOption2);
  }
}

var addEventListenerToSelects = function(){

  var select = document.querySelector("#pokemon-select-1");
  select.addEventListener("change", function(){
    var pokemonName = this.value
    pokemon1.name = pokemonName
    console.log("pokemon 1 name:", pokemon1.name);
    makePokemonRequest(pokemonName, pokemon1);
  });

  var select2 = document.querySelector("#pokemon-select-2");
  select2.addEventListener("change", function(){
    var pokemonName = this.value
    pokemon2.name = pokemonName
    console.log("pokemon 2 name:", pokemon2.name);
    makePokemonRequest(pokemonName, pokemon2);
  })

}

var getPokemonHP = function(pokemonObject, pokemon){
  var hp;
  for (item of pokemonObject.stats){
    if (item.stat.name === "hp"){
    }
  }
  hp = item.base_stat;
  pokemon.hp = hp;
  console.log("pokemon hp:", pokemon.hp);
}

var getPokemonAttacksArray = function(pokemonObject, pokemon){
  var attacksArray =[];
  for (var i = 0; i < 4; i++){
    var move = pokemonObject.moves[Math.floor(Math.random() * pokemonObject.moves.length)].move;
    attacksArray.push(move);
  }
  pokemon.attacks = attacksArray
  console.log("Pokemon attacks:", pokemon.attacks);
}

var makePokemonRequest = function(pokemonName, pokemon){
  var url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName
  var request = new XMLHttpRequest();
  request.open("GET", url)
  request.send();
  request.addEventListener('load', function(){
    var pokemonObject = JSON.parse(this.responseText);
    console.log("Pokemon object:", pokemonObject);
    setPokemonImage(pokemonObject, pokemon);
    getPokemonHP(pokemonObject, pokemon);
    getPokemonAttacksArray(pokemonObject, pokemon);
    pokemon.name = pokemonName;
  });
}

var setPokemonImage = function(pokemonObject, pokemon){
  console.log("Initiating image request...");
  // clearPokemonImage();
  var pokemonImage;
  var imageUrl;
  console.log("pokemon Number:", pokemon);
  if (pokemon === pokemon1){
    pokemonImage = document.querySelector("#pokemon-1-picture")
    imageUrl =  pokemonObject.sprites.back_default;
    console.log("imageUrl of pokemon-1", imageUrl);
  } else {
    pokemonImage = document.querySelector("#pokemon-2-picture")
    imageUrl =  pokemonObject.sprites.front_default;
    console.log("imageUrl of pokemon-2", imageUrl);
  }
  console.log(pokemonImage);
  pokemonImage.src = imageUrl;
}

var clearPokemonImage = function() {
  var pokemonInfoDiv = document.querySelector("#pokemon-info");
  while (pokemonInfoDiv.hasChildNodes()){
    pokemonInfoDiv.removeChild(pokemonInfoDiv.lastChild);
  }
}

window.addEventListener("load", app);
