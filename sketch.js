let ship;
let enemy = [];
let bg;

function setup() {
  createCanvas(800, 600);
  frameRate(10);
  rectMode(CENTER)
  bg = loadImage('img/backgroundSpace.jpg')
  ship = new Ship(width/2);
  console.log(ship)

  //bottom enemy row
  let startX = 175;
  let startY = 250;
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
  
  //spawn enemys
  for(var i = 0; i < enemy.length; i++){
    enemy[i].draw()
  }
  
}


console.log(enemy)


