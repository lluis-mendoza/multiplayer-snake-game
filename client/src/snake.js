function Snake(x,y,id){
    this.x = x;
    this.y = y;
    this.id = id;
    this.speedx = 1;
    this.speedy = 0;
    this.snakeTrail = [{x:this.x,y:this.y}];

    
    this.newPos = function(){
        for(var j = this.snakeTrail.length-1; j>0;j--){
            
            this.snakeTrail[j].x = this.snakeTrail[j-1].x;
            this.snakeTrail[j].y = this.snakeTrail[j-1].y;
        }
        this.snakeTrail[0].x += this.speedx;
        this.snakeTrail[0].y += this.speedy;
    }
    
}
