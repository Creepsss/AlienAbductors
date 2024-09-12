class Ship {
    constructor(x){
      this.x = x;
      
      this.speed = 10;
      
    }
    
    update(){
      let movement = createVector(0,0);
      
      if(keyIsDown(LEFT_ARROW) === true){
        movement.x -= 1;
      }
      if(keyIsDown(RIGHT_ARROW) === true){
        movement.x += 1;
      }
      
      movement.setMag(this.speed)
      
      this.x = constrain(this.x, 0, 800 - 60)
      
      this.x += movement.x
      
      
    }
    
    draw(){
    let green = color(0,255,0);
    fill(green);
    noStroke();
    rect(this.x,540,60,30);
    rect(this.x + 20,530, 20, 10)
    }
  }