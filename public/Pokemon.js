var Pokemon = function(){
  this.name;
  this.hp;
  this.moves;
}

Pokemon.prototype.takeDamage = function(damage){
  this.hp -= damage;
}

Pokemon.prototype.isDown = function(){
  if (this.hp <= 0) return true;
  return false;
}

// module.exports = Pokemon;
