class EnemyLaser{
    constructor(x,y){
        this.x = x
        this.y = y
        this.w = 10;
        this.h = 60;
        this.speed = 10;
        this.toDelete = false
    }

    draw(){
       fill(0,0,255)
       rect(this.x,this.y,this.w,this.h) 
    }

    move(){
        this.y = this.y + this.speed;
    }

    hits(ship){
        var d = dist(this.x, this.y, ship.x, ship.y)
        if(d < this.h - 50 + ship.h){
            return true;
        }else{
            return false
        }
    }

    remove(){
        this.toDelete = true
    }
}