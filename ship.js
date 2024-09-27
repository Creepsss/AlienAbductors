class Ship {
    constructor(x , y){
      this.x = x;
      this.y = y;
      this.speed = 15;
      this.lives = 3;
      this.w = 60
      this.h = 30
      this.radius = 60;
      this.endGame = false
      this.color = color(0,100,0);
      this.gotHit = false
    }
    
    update(){
      let movement = createVector(0,0);
      
      if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
        movement.x -= 1;
      }
      if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
        movement.x += 1;
      }
      
      movement.setMag(this.speed)
      
      this.x = constrain(this.x, 0, 800 - 60)
      
      this.x += movement.x
      
      
    }

     changeColor = async () => {
      const delay = ms => new Promise(res => setTimeout(res,ms))
      for(var i = 0; i < 1; i++){
        if(this.gotHit){
          this.color = color(255,0,0,60)

          await delay(500)
          this.color = color(0,255,0,100)
        }
      }
    }
    
    draw(){
    fill(this.color);
    noStroke();
    rect(this.x,this.y,this.w,this.h,5,5,15,15);
    fill(255,255,255,120)
    rect(this.x,this.y,this.w - 15,this.h - 50,5,5,5,5);
    fill(200,50,100)
    circle(this.x,this.y + 5,15)
    fill(0)
    circle(this.x + 3,this.y, 5)
    circle(this.x - 3,this.y, 5)
    fill(this.color)
    rect(this.x, this.y - 20, this.w - 50, this.h - 20)
    rect(this.x - 5, this.y - 15, this.w - 50, this.h - 20)
    rect(this.x + 5, this.y - 15, this.w - 50, this.h - 20)
  }

    dies(){
      if(this.lives === 0){
        this.endGame === true
      }
    }
  }