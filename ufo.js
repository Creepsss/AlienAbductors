class Ufo{
    constructor(x){
        this.speed = 10;
        this.radius = 50
        this.pts = 25;
        this.ufo = null
        this.x = x
        this.y = 50
        this.destroy = false
    }

    draw(){
        noStroke();
        fill(255,255,255, 100);
        ellipse(this.x,40,40,40)
        fill(0,240,0)
        ellipse(this.x,this.y,80,20,)
        fill(255,200,0, 100)
        triangle(this.x,this.y,this.x + this.y,100,this.x,100)
    }

    move(){
        this.x = this.x + this.speed;
    }

    remove(){
        this.destroy = true
    }
}