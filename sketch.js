let ship;
let lasers = [];
let enemy = [];
let bg;
let points = 0;

function setup() {
  createCanvas(800, 600);
  frameRate(25);
  rectMode(CENTER)
  bg = loadImage('img/backgroundSpace.jpg')
  ship = new Ship(width/2, 550);
  console.log(ship)

  //bottom enemy row
  let startX = 175;
  let startY = 100;
  for(var i = 0; i < 5; i++){
    enemy[i] = new Enemy(i * startX + 50, startY,5);
  }
  //mid enemy row
  startY = 150;
  let offset = 0;
  for(var j = 5; j < 10; j++){
    enemy[j] = new Enemy(offset * startX + 50, startY, 5);
    offset++
  }
  //top enemy row
  startY = 50;
  offset = 0;
  for(var l = 10; l < 15; l++){
    enemy[l] = new Enemy(offset * startX + 50, startY, 5);
    offset++
  }
}


function draw() {
  background(bg);
  ship.update();
  ship.draw();
  
  //spawn enemys and move them + shift down
  var edge = false
  for(var i = 0; i < enemy.length; i++){
    enemy[i].draw()
    enemy[i].move()
    if(enemy[i].x > width - 7.5 || enemy[i].x < 0 + 7.5){
      edge = true
    }
  }
  if(edge){
    for(var k = 0; k < enemy.length; k++){
      enemy[k].shiftDown()
    }
  }
  //Display laser and move it
  for(var las = 0; las < lasers.length; las++){
    lasers[las].draw();
    lasers[las].move();

    //collision detection
    for(var col = 0; col < enemy.length; col++){
      if(lasers[las].hits(enemy[col])){
        lasers[las].remove();
        points = points + enemy[col].pts;
        enemy.splice(col, 1); //removes alien from aray
      }
    }
  }

  for(var z = lasers.length - 1; z >= 0; z--){
    if(lasers[z].toDelete === true){
      lasers.splice(z, 1); //removes laser from aray
    }
  }

  updateHUD();
  //check if game is over
  if(enemy.length <= 0){
    gameOver();
  }
}
//END OF DRAW FUNC
function keyPressed(){
  if(key === ' '){
    var laser = new Laser(ship.x, ship.y)
    lasers.push(laser);
  }
}


function updateHUD(){
  fill(255);
  text("Score: " + points, 10, 20);
  text("Aliens Remaining: " + enemy.length, 70, 20)
}

function gameOver(){
  background(0);
  textSize(70);
  textAlign(CENTER);
  text("YOU WON!", width / 2,height/2)
}

