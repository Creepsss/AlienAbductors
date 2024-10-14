class Enemy{

  constructor(x, y, pointsValue){
    this.x = x;
    this.y = y;
    this.pts = pointsValue;
    this.radius = 20;
    this.xdir = 2,5;
    this.h = 30;
    this.isAlive = true
    this.shoots = false;  
  }

  draw(){
    if(this.shoots){
      this.h = 50
      fill(0,0,255);
      rect(this.x,this.y,this.h);
      this.pts = 10
      }else{
        fill(255,0,0);
        rect(this.x,this.y,this.h);
        this.pts = 5
      }
  }

  move(){
    this.x = this.x + this.xdir;
  }

  shiftDown(){
    this.xdir = -this.xdir;
    this.y = this.y + 25;
  }

}