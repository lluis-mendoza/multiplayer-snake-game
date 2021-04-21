const Position = require('./position');

class Player{
    constructor(id, name, color){
        this.id = id;
        this.name = name;
        this.color = color;
        this.angle = 0;
        this.n = 10;
        this.segments = [];
        for(let i = 0; i<this.n; i++){
            this.segments.push(new Position(0,0));
        }
    }
    move(){
        var head = this.segments[0];
        this.segments.pop();
        var d = 15;
        var newPos = new Position(head.X+d*Math.cos(this.angle),head.Y+d*Math.sin(this.angle));
        this.segments.unshift(newPos);
        console.log(newPos);
        for (let i = 1; i < this.segments.length; i++) {
            let previous = this.segments[i - 1]
            let current = this.segments[i]
      
            let angle = Math.atan2(current.y - previous.y, current.x - previous.x);
            current.x = previous.x + Math.cos(angle) * d
            current.y = previous.y + Math.sin(angle) * d
        }
    }
    changeAngle(angle){
        this.angle = angle;
    }
    getSegments(){
        return this.segments;
    }
}

module.exports = Player