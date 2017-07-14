function Sprite(){
  this.x = 0;
  this.y =0;
  this.width = 0;
  this.height = 0;
  this.color = "blue";
  this.mvUp = this.mvDown = this.mvRight = this.mvLeft = false;
  this.enemy = false;
  this.hp = 100;
  this.vidas = 1;
  this.cooldown = 0.3;
  this.Pontos =0;
  this.g = 120;
  this.vy = 0;
}

Sprite.prototype.desenha = function (ctx){
   ctx.save();
   ctx.translate(this.x, this.y);
   ctx.fillStyle = this.color;
   ctx.beginPath();
   ctx.moveTo(-this.width/2, this.height/2);
   ctx.lineTo(0, -this.height/2);
   ctx.lineTo(+this.width/2, this.height/2);
   ctx.closePath();
   ctx.fill();
   ctx.strokeStyle = "black";
   ctx.stroke();
   ctx.strokeStyle = "grey";
   ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);

   ctx.restore();
};
Sprite.prototype.desenhaBloco = function(ctx){
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(-this.width/2, this.height/2);
  ctx.lineTo(-this.width/2, -this.height/2);
  ctx.lineTo(+this.width/2,- this.height/2);
  ctx.lineTo(+this.width/2, this.height/2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.strokeStyle = "grey";
  ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  ctx.restore();

  ctx.save();
  ctx.translate(this.x, 400- this.y);
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.moveTo(-this.width/2, this.height/2);
  ctx.lineTo(-this.width/2, -this.height/2);
  ctx.lineTo(+this.width/2,- this.height/2);
  ctx.lineTo(+this.width/2, this.height/2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.strokeStyle = "grey";
  ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);

  ctx.restore();
};

Sprite.prototype.moveLeft = function(dt){
  this.x -= 2;
}
Sprite.prototype.mover = function (){
this.vy = this.vy + this.g*dt;
this.y = this.y + this.vy*dt;
};

Sprite.prototype.Jump = function(){
  this.vy = this.vy - (50*this.g)*dt;
  this.y = this.y + this.vy*dt;
};


Sprite.prototype.colidiuCom = function (alvo) {
  if(alvo.x + this.width/2 + alvo.width/2 > this.x && alvo.x - this.width/2 - alvo.width/2 < this.x)
  {
    if(alvo.y - this.height/2 - alvo.height/2 < this.y || alvo.y + this.height/2 + alvo.height/2 > 400-this.y ){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
//  if(alvo.y - this.height/2 - alvo.height/2 > this.y) return false;
//  alert(alvo.y+" "+this.height/2+" "+this.y +" "+(alvo.y+alvo.height/2+this.height/2));
//  return true;
};
