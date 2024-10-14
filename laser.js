class Laser{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 20;
        this.toDelete = false;
    }

    draw(){
        fill(0,200,50);
        noStroke();
        rect(this.x,this.y,this.w, this.h,40,40,40,40)
    }

    move(){
        this.y = this.y - 16;
    }

    hits(enemy){
        var d = dist(this.x, this.y, enemy.x, enemy.y);
        if(d < this.h + enemy.radius) {
            return true;
        }else {
            return false;
        }
    }

    remove(){
        this.toDelete = true;
    }
}