
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
let waveCounter = 1
let dontShow = false

let players = [];
const gameID = 48658786959834;

let playerName = ''


async function submitScore(name, score){

  const url = `https://oege.ie.hva.nl/gd/blok1/highscore/save.php?game=${gameID}&name=${name}&score=${score}`;

 await fetch(url)
    .then(response => {
      if (response.ok) {
        console.log("Score submitted successfully.", url);
      } else {
        console.error("Failed to submit score.");
      }
    })
    .catch(errors => {
      console.error("Error submitting score:", errors);
    })

  location.reload();
}

function getLeaderboard(){

  const url = `https://oege.ie.hva.nl/gd/blok1/highscore/load.php?game=${gameID}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      players = data

      players.sort((a,b) => b.score - a.score)

      players = players.splice(0,10);
    })
    .catch(errors => {
      console.log("there was a error fetching the players score:", errors);
    })

}


async function lostGame() { 
  let nameInput;
  getLeaderboard();

  dontShow = true;
  background(0);
  textAlign(CENTER);

  fill(255,0,0)
  rect(width - 100, 0, 200, 80)
  fill(255,255,255)
  text("Leaderboard", width - 100, 25)

  nameInput = createInput('');
  nameInput.position(width/2 - 90, height/2 + 150);
  nameInput.input(typing);


  textSize(50);
  fill(255,0,0)
  text("Player name:", width / 2, height / 2 - 120);
  fill(255)
  rect(width/2, height/2 -75, 250, 65)
  fill(0)
  text(playerName, width / 2, height / 2 - 65);
  fill(255,0,0);
  text("YOU LOST", width / 2, height / 2 + 25);
  text("Score: " + points, width / 2, height / 2+ 75);
  textSize(20)
  text("press 'Enter' to play again and to upload score",width/2 ,height/2 + 200)
  text("press '\' to play again and not upload score",width/2 ,height/2 + 220)


  if (players.length > 0) {
    for (let i = 0; i < players.length; i++) {
      let player = players[i];
      textAlign(RIGHT);
      fill(255,255,255)
      text(`${i + 1}. ${player.name}: ${player.score}`, 750, 100 + i * 30);
    }
  } else {
    text('Loading...', width / 2, height / 2);
  }


  shootingEnemy.splice(0, 1);

  if(keyIsDown(ENTER)){
    submitScore(playerName, points)
  }

  

  if(keyCode === 220){
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
  
    getRandomEnemy(enemy);
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
    if(millis() - lastShotTime > shootInterval){
      for(let i = 0; i < shootingEnemy.length; i++){
        const shoot = shootingEnemy[i];
        
        if(!shoot.lastShotTime){
          shoot.lastShotTime = millis();
          shoot.shootInterval = Math.floor(Math.random() * 2500) + 500
        }

        if(millis() - shoot.lastShotTime >  shoot.shootInterval){
          let enemyShooter = new EnemyLaser(shoot.x, shoot.y);
          enemyLasers.push(enemyShooter);

          shoot.lastShotTime = millis();
          shoot.shootInterval = Math.floor(Math.random() * 2500) + 500
        }
      }
    }


    //set interval of when ufo can spawn
    let nextSpawnFrameUfo = Math.floor(Math.random() * (900 - 500 + 1) + 500)

    //check if frame count is between the 500-900 frames and then clears the framecount
    //then creates a new interval to spawn the ufo
    if(frameCounter >= nextSpawnFrameUfo && !dontShow){
      spawnUfoAndDelete();
      frameCounter = 0;
      nextSpawnFrameUfo = Math.floor(Math.random() * (900 - 500 + 1) + 500)
    }
    //draw Ufo
    if(ufo.length > 0){
      ufo[0].draw();
      ufo[0].move();
    }

    if(enemy.length <= 0){
      howManyShooters += 1
      enemy.xdir += 1
      waveCounter += 1
      setup()
    }

    //check if game is over
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
    text("Wave: " + waveCounter, width - 100, 20)
  }else if (dontShow){

  }
  }

  //make a enemy shoot
  function getRandomEnemy(arr){
    for(var i = 0; i < howManyShooters; i++){
         let randomIndex = Math.floor(Math.random() * arr.length)
         let randomElement = arr[randomIndex];
         randomElement.shoots = true
         shootingEnemy.push(randomElement)
        }
      }

