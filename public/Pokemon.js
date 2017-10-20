var Pokemon = function(){
  this.hp;
  this.moves;
}

Pokemon.prototype.takeDamage(damage){
  this.hp -= hp;
}

Pokemon.prototype.isDown(){
  if (this.hp <= 0) return true;
  return false;
}

module.exports = Pokemon
