function Level (){
  this.sprites = [];
  this.shots = [];
  this.inimigos = 3;
  this.cooldown = 1;
}
Level.prototype.desenharVida = function(ctx, jogador){
   ctx.save();
   ctx.fillStyle = "green";
   ctx.beginPath();
   ctx.fillRect(10, 10, jogador.hp, 20);
   ctx.closePath();
   ctx.restore();
   ctx.beginPath();
   ctx.fillStyle = "black";
   ctx.fillText("Pontos: "+jogador.Pontos, 10, 40);
   ctx.closePath();
   ctx.restore();
};
Level.prototype.desenhar = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].desenhaBloco(ctx);

    }

};

Level.prototype.randomicEnemy = function (dt) {
  this.cooldown -=dt;
//  alert(this.cooldown);
  if(this.cooldown<0){
  var inimigo = new Sprite();
  var inimigo2 = new Sprite();
  inimigo.x = 800;
  var wid =  Math.floor((Math.random() * 50) + 10);
  var hei = Math.floor((Math.random() * 100) + 70) ;
  inimigo.width = 50;
  inimigo.height =  hei;
  inimigo.y = inimigo.height/2;
  inimigo.color = "green";
  inimigo.enemy = true;
//  inimigo2.width = wid;
///  inimigo2.height = 300 - hei ;
//  inimigo2.x=  600;
//  inimigo2.y = 400 - inimigo2.height;
//  inimigo2.color = "green";
//  inimigo2.enemy = true;
  this.sprites.push(inimigo);
//  this.sprites.push(inimigo2);
  this.cooldown = 1;
   }
  };

Level.prototype.fire = function (alvo){
  if(alvo.cooldown<0){
  var tiro = new Sprite();
  tiro.x = alvo.x;
  tiro.y = alvo.y;
  tiro.width = 10;
  tiro.height = 10;
  tiro.mvUp = true;
  this.shots.push(tiro);
  alvo.cooldown = 1;
}
}

Level.prototype.mover = function (dt) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].moveLeft(dt);
      if(
        this.sprites[i].x >  3000 ||
        this.sprites[i].x < -3000 ||
        this.sprites[i].y >  3000 ||
        this.sprites[i].y < -3000
      ){
        this.sprites.splice(i, 1);
      }
    }

};

Level.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i].colidiuCom(alvo)){
        resolveColisao(this.sprites[i], alvo);
      }
    }
};

Level.prototype.colidiuComTiros = function(player){
  for(var i = this.shots.length-1; i>=0; i--){

    this.colidiuCom(this.shots[i],
      (
        function(that)
        {
           return function(alvo){
            alvo.color = "green";
            that.shots.splice(i,1);
            x = that.sprites.indexOf(alvo);
            that.sprites.splice(x, 1);
            player.Pontos+=10;
          }
        }
      )(this));
  }
}

Level.prototype.colidiuComPlayer = function(alvo2){
  this.colidiuCom(alvo2,
    (
      function(that)
      {
         return function(alvo){
          alvo2.hp -=20;
          x = that.sprites.indexOf(alvo);
          that.sprites.splice(x, 1);
          if(alvo2.hp <=0)
          {
            alvo2.vidas --;

          }

        }
      }
    )(this));
}
