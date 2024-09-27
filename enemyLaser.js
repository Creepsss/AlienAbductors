class EnemyLaser{
    constructor(x,y){
        this.x = x
        this.y = y
        this.w = 10;
        this.h = 100;
        this.toDelete = false
    }

    draw(){
       fill(0,0,255)
       noStroke()
       rect(this.x,this.y,this.w,this.h) 
    }

    move(){
        this.y = this.y + 10;
    }

    hits(ship){
        var d = dist(this.x, this.y, ship.x, ship.y)
        if(d < this.h - 85 + ship.h){
            return true;
        }else{
            return false
        }
    }

    remove(){
        this.toDelete = true
    }
}