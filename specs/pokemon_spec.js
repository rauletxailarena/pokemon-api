var assert = require("assert");
var Pokemon = require("../public/Pokemon");


describe("Pokemon", function() {

  var pokemon;
  var pokemon2;

  beforeEach(function() {
    pokemon = new Pokemon();
    pokemon.hp = 100;
    pokemon.attacks = ["attack 1", "attack 2"];
    pokemon2 = new Pokemon();
    pokemon2.hp = 50;
  });

  it("should have an hp value", function () {
    assert.strictEqual(pokemon.hp, 100)
  });

  it("should take damage", function () {
    pokemon.takeDamage(35)
    assert.strictEqual(pokemon.hp, 65)
  });

  it("should be able to attack another pokemon", function() {
    pokemon.attack(pokemon2, 30);
    assert.strictEqual(pokemon2.hp, 20);
  });

})
