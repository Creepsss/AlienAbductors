class Ufo{
    constructor(x){
        this.speed = 10;
        this.pts = 25;
        this.ufo = null
        this.x = 50
        this.destroy = false
    }

    draw(){
        noStroke();
        fill(255,255,255, 100);
        ellipse(this.x,40,40,40)
        fill(0,240,0)
        ellipse(this.x,50,80,20,)
        fill(255,200,0, 100)
        triangle(this.x,50,this.x + 50,100,this.x,100)
    }

    move(){
        this.x = this.x + this.speed;
    }

    remove(){
        this.destroy = true
    }
}