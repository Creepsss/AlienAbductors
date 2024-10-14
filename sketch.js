
//https://oege.ie.hva.nl/gd/blok1/highscore/save.php?game=48658786959834


let ship;
let shield;
let ufo = [];
let lasers = [];
let enemy = [];
let enemyLasers = [];
let shootingEnemy = [];
let bg;
let points = 0;
let counter = 1;
let lastShotTime = 0;
let shootInterval = 1000;
let frameCounter = 0;
let howManyShooters = 1
let dontShow = false


let nameInput;
let playerName;



function submitScore(name, score){
  const gameID = 48658786959834;

  const url = `https://oege.ie.hva.nl/gd/blok1/highscore/save.php?game=${gameID}&name=${name}&score=${score}`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        console.log("Score submitted successfully.", url);
      } else {
        console.error("Failed to submit score.");
      }
    })
    .catch(error => {
      console.error("Error submitting score:", error);
    })
}

function gameOver() {
  dontShow = true;
  background(0);
  textSize(70);
  textAlign(CENTER);
  
  nameInput = createInput('');
  nameInput.position(width/2 - 100, height/2 + 150);
  nameInput.input(typing);


  text("Player name: " + playerName, width / 2, height / 2 - 100);
  text("YOU WON!", width / 2, height / 2);
  text("Score: " + points, width / 2, height / 2 + 100);


  if(key === ' '){
    submitScore(playerName, points)
    location.reload()
  }
}


function lostGame() { 
  dontShow = true;
  background(0);
  textSize(70);
  textAlign(CENTER);

  nameInput = createInput('');
  nameInput.position(width/2 - 100, height/2 + 150);
  nameInput.input(typing);

  
  text("YOU LOST", width / 2, height / 2);
  text("Score: " + points, width / 2, height / 2 + 100);

  shootingEnemy.splice(0, 1);

  if(key === ' '){
    submitScore(playerName, points)
    location.reload()
  }

}

function typing() {
  playerName = this.value()
}


function setup() {
  createCanvas(800, 600); 
  frameRate(30);
  rectMode(CENTER)
  bg = loadImage('img/backgroundSpace.jpg')
  ship = new Ship(width/2, 550);

  //bottom enemy row
  let startX = 175;
  let startY = height/10;
  let cols = 5
  let rows = 3;
  let xPlus = 25;
  let yPlus = 100;


  //spawn 3 enemy rows of columns of 5
  for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
      let x = col * startX + xPlus;
      let y = startY + row * yPlus;
      enemy[row * cols + col] = new Enemy(x,y,5);
    }
  }

    //make a enemy shoot
    function getRandomEnemy(arr){
      const randomIndex = Math.floor(Math.random() * arr.length)
      const randomElement = arr[randomIndex];
      return randomElement
    }
  
    const randomEnemy = getRandomEnemy(enemy);
    randomEnemy.shoots = true
    shootingEnemy.push(randomEnemy);

}

function draw() {
  frameCounter++
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
    if(enemy[i].y >= 600 - enemy[i].h){
      lostGame();
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

    //collision detection for the enemy's
    for(var col = 0; col < enemy.length; col++){
      if(lasers[las].hits(enemy[col])){
        lasers[las].remove();
        points = points + enemy[col].pts;
        enemy.splice(col, 1); //removes alien from aray
      }
      if(lasers[las].y <= -5){
        lasers[las].remove()
      }
    }

    //collision detection for the ufo
    for(var col = 0; col < ufo.length; col++){ 
      if(lasers[las].hits(ufo[0])){
        lasers[las].remove();
        points = points + ufo[0].pts;
        ufo.splice(0,1)
      }
    }

    for(var col = 0; col < shootingEnemy.length; col++){
      if(lasers[las].hits(shootingEnemy[col])){
        lasers[las].remove();
        points = points + shootingEnemy[col].pts;
        shootingEnemy.splice(col, 1); //removes alien from aray
      }
    }


  }

  for(var z = 0; z < enemyLasers.length; z++){
    enemyLasers[z].draw();
    enemyLasers[z].move();

   if(enemyLasers[z].hits(ship)){
    enemyLasers[z].remove()
    ship.lives -= 1;
    ship.gotHit = true;
    ship.changeColor();
    if(ship.lives <= 0){
      lostGame()
    }
   }
   if(enemyLasers[z].y === 630){
    enemyLasers[z].remove()
   }
  }

  for(var z = lasers.length - 1; z >= 0; z--){
    if(lasers[z].toDelete === true){
      lasers.splice(z, 1); //removes laser from aray
    }
  }

  for(var p = enemyLasers.length - 1; p >= 0; p--){
    if(enemyLasers[p].toDelete === true){
      enemyLasers.splice(p,1); //removes enemy laser
    }
  }

    //enemy random shooting interval
    if(millis() - lastShotTime > shootInterval & shootingEnemy.length === 1){
        const shoot = shootingEnemy[0];
  
        let enemyShooter = new EnemyLaser(shoot.x,shoot.y);
        enemyLasers.push(enemyShooter);
    
        lastShotTime = millis();
    
        shootInterval = Math.floor(Math.random() * 2500) + 500
    }


    //set interval of when ufo can spawn
    let nextSpawnFrameUfo = Math.floor(Math.random() * (900 - 500 + 1) + 500)

    //check if frame count is between the 500-900 frames and then clears the framecount
    //then creates a new interval to spawn the ufo
    if(frameCounter >= nextSpawnFrameUfo){
      spawnUfoAndDelete();
      frameCounter = 0;
      nextSpawnFrameUfo = Math.floor(Math.random() * (900 - 500 + 1) + 500)
    }
    //draw Ufo
    if(ufo.length > 0){
      ufo[0].draw();
      ufo[0].move();
    }


    //check if game is over
    if(enemy.length <= 0){
      gameOver();
    }
     if(ship.lives <= 0){
      lostGame();
    }
    if(enemy.y <= 600){
      lostGame();
    }

  updateHUD();
}
//END OF DRAW FUNC


//pressing
 function keyPressed() {
  if(key === ' ' & dontShow === false){
    var laser = new Laser(ship.x, ship.y)
    lasers.push(laser);
  }
}

function mouseClicked(){
  if(true & dontShow === false){
    var laser = new Laser(ship.x, ship.y - 35)
    lasers.push(laser);
  }
}


function spawnUfoAndDelete(){
  ufo.push(new Ufo(50))

  setTimeout(() => {
    if(ufo[0]){
      ufo[0].remove()
    }
    if(ufo[0].destroy === true){
      ufo.splice(0,1);
    }
  }, 6000)
}


function updateHUD(){
  if(!dontShow){
    fill(255);
    text("Score: " + points, 10, 20);
    text("Aliens Remaining: " + enemy.length, 70, 20)
    text("Lives: " + ship.lives, 200, 20);
    text("FrameCount: " + frameCounter, 255, 20 )
  }else if (dontShow){

  }
  }

