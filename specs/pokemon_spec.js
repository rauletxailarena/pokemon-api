var assert = require("assert");
var Pokemon = require("../public/Pokemon");


describe("Pokemon", function() {

  var pokemon

  beforeEach(function() {
    pokemon = new Pokemon();
    pokemon.hp = 100;
    pokemon.attacks = ["attack 1", "attack 2"];
  })

  it("should have an hp value", function () {
    assert.strictEqual(pokemon.hp, 100)
  });

  it("should take damage", function () {
    pokemon.takeDamage(35)
    assert.strictEqual(pokemon.hp, 65)
  });



})
