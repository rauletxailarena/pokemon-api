var Pokemon = function(){
  this.name;
  this.hp;
  this.moves;
}

Pokemon.prototype.takeDamage = function(damage){
  this.hp -= damage;
  if (this.hp < 0){
    this.hp = 0;
  }
}

Pokemon.prototype.isDown = function(){
  if (this.hp <= 0) return true;
  return false;
}

Pokemon.prototype.attack = function(pokemon, pp){
  pokemon.takeDamage(pp);
}

module.exports = Pokemon;
