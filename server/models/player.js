const Position = require('./position');

class Player{
    constructor(id, name, color){
        this.id = id;
        this.name = name;
        this.color = color;
        this.angle = 0;
        const pos = new Position(0,0);
        this.segments = [pos];
    }
    move(){
        var head = this.segments[0];
        this.segments.shift();
        var speed = 0.05;
        var newPos = new Position(head.X+speed*Math.cos(this.angle),head.Y+speed*Math.sin(this.angle));
        this.segments.push(newPos);
        console.log(newPos);
    }
    changeAngle(angle){
        this.angle = angle;
    }
}

module.exports = Player