class Enemy{

  constructor(x, y, pointsValue){
    this.x = x;
    this.y = y;
    this.pts = pointsValue;
    this.radius = 20;
    this.xdir = 1;
    this.isAlive = true
  }

  draw(){
      fill(255,0,0);
      rect(this.x,this.y,25);
  }

  move(){
    this.x = this.x + this.xdir;
  }
}