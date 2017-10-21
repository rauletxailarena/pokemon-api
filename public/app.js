var pokemonObjects;
var pokemon1 = new Pokemon();
var pokemon2 = new Pokemon();
var currentPokemon = pokemon2;
var audio;

var app = function () {
  console.log("app being called")
  makeInitialRequest();
  addEventListenerToSelects();
  addEventListenerToButton();
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
  displayPokemonHP(pokemon);
}

var getPokemonAttacksArray = function(pokemonObject, pokemon){
  var attacksArray =[];
  for (var i = 0; i < 4; i++){
    var move = pokemonObject.moves[Math.floor(Math.random() * pokemonObject.moves.length)].move;
    attacksArray.push(move);
  }
  pokemon.moves = attacksArray
  console.log("Pokemon attacks:", pokemon.moves);
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
  console.log("pokemon:", pokemon);
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

var addEventListenerToButton = function(){
  var button = document.querySelector("#fight-button");
  button.addEventListener('click', function(){
    console.log("Button pressed");
    if (pokemon1.moves === undefined || pokemon2.moves === undefined){
      console.log("Select two pokemons to battle!")
      return;
    };
    document.querySelector("#pokemon-1-picture").classList.add("shakeImage");
    document.querySelector("#pokemon-2-picture").classList.add("shakeImage");
    audio = new Audio("music.m4a")
    audio.play();
    setTimeout(function(){
      document.querySelector("#pokemon-1-picture").classList.remove("shakeImage");
      document.querySelector("#pokemon-2-picture").classList.remove("shakeImage");
      startFight();
    }, 4000);
  })
}

var displayPokemonHP = function(pokemon){
  var pokemonHP;
  if (pokemon === pokemon1){
    pokemonHP = document.querySelector("#pokemon-1-hp");
  } else {
    pokemonHP = document.querySelector("#pokemon-2-hp");
  }
  pokemonHP.textContent = "HP: " + pokemon.hp;
}

var startFight = function(){
  if (getPokemonToAttack().hp === 0){
    var combatInfo = document.querySelector("#combat-info");
    combatInfo.textContent = getPokemonToAttack().name + " IS DEAD!"
    audio.pause();
    return;
  }
  if (currentPokemon === pokemon1){
    currentPokemon = pokemon2;
  } else {
    currentPokemon = pokemon1
  }
  tryAttack(currentPokemon);
}

var tryAttack = function (currentPokemon){
  var move = currentPokemon.moves[Math.floor(Math.random() * currentPokemon.moves.length)];
  var url = move.url;
  console.log("Requestiong move...", url);
  var request = new XMLHttpRequest();
  request.open("GET", url)
  request.send();
  request.addEventListener('load', function(){
    console.log("Move loaded:", JSON.parse(this.responseText));
    var moveInfo = JSON.parse(this.responseText);
    var moveName = move.name;
    var movePP = moveInfo.pp;
    var pokemonToAttack = getPokemonToAttack();
    currentPokemon.attack(pokemonToAttack, movePP);
    console.log("Move name and pp:", moveName, movePP);
    displayAttack(moveName, movePP);
    setTimeout(function () {
    startFight();
  },3000);
  });
}

var displayAttack = function(moveName, movePP) {
  attackerName = currentPokemon.name.toUpperCase();
  attackedName = getPokemonToAttack().name.toUpperCase();
  attackedHP = getPokemonToAttack().hp
  var combatInfo = document.querySelector("#combat-info");
  combatInfo.textContent = attackerName + " attacked " + attackedName + " using " + moveName + "\n" + attackedName + "'s HP went down to " + attackedHP;
  var attackedPokemon  = getPokemonToAttack();
  updateImageHP(attackedPokemon);
};

var getPokemonToAttack = function(){
  if (currentPokemon === pokemon1){
    return pokemon2;
  } else {
    return pokemon1;
  }
}

var updateImageHP = function(attackedPokemon){
  var hpElement;
  if (attackedPokemon === pokemon1){
    hpElement = document.querySelector("#pokemon-1-hp");
  } else {
    hpElement = document.querySelector("#pokemon-2-hp");
  }
  hpElement.textContent = "HP: " + attackedPokemon.hp;
}

window.addEventListener("load", app);
