const sock = io();

var snakes = [];
var snake, apple;
var tailSize = 20;

var height, width;
height = width = 800;

var ticks = 0;

var GameArea ={
    
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = height;
        this.canvas.height = width;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        window.addEventListener('keydown',function (e){
             GameArea.key = e.keyCode;     
        })
        window.addEventListener('keyup',function (e){
             GameArea.key = false;     
        })
    },
    clear : function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }                            
    
}
function draw() {
    GameArea.clear();
    var ctx = GameArea.context;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    for(var i = 0; i < snakes.length; ++i){
        if (snakes[i] != null){
            ctx.fillStyle = "green";
            
            if (snakes[i].snakeTrail != null){
                for (var j =  0; j < snakes[i].snakeTrail.length; j++) {
                    ctx.fillRect(snakes[i].snakeTrail[j].x*tailSize,snakes[i].snakeTrail[j].y*tailSize,tailSize,tailSize);
                    if (snakes[i].id == snake.id){
                        if (snake.snakeTrail[j].x == apple.x && snake.snakeTrail[j].y == apple.y){
                            sock.emit('setApple');
                            snake.snakeTrail.push({x: snake.snakeTrail[snake.snakeTrail.length-1].x+snake.speedx, y: snake.snakeTrail[snake.snakeTrail.length-1].y+snake.speedy});
                        }
                    }
                    else{
                        if (snake.x == snakes[i].snakeTrail[j].x && snake.y == snakes[i].snakeTrail[j].y){
                            sock.emit('disconnect');
                        }
                    }
               }
            }
       }

    
    }
    if (apple.x > 0 && apple.x <=width/tailSize && apple.y > 0 && apple.y <=height/tailSize){
        ctx.fillStyle = "red";
        ctx.fillRect(apple.x*tailSize,apple.y*tailSize,tailSize,tailSize);
    }
    else sock.emit('setApple');
    updateGame();
    if (ticks == 2){
        snake.newPos();
        ticks = 0;
    }
    else ++ticks;
    var data = {
        snakeTrail: snake.snakeTrail
    };
    sock.emit('update', data);
}               
function updateGame(){

    if (snake.speedx != 1 && GameArea.key && GameArea.key == 37) {snake.speedx = -1; snake.speedy = 0;}
    if (snake.speedx != -1 && GameArea.key && GameArea.key == 39) {snake.speedx = 1; snake.speedy = 0;}
    if (snake.speedy != 1 && GameArea.key && GameArea.key == 38) {snake.speedy = -1; snake.speedx = 0;}
    if (snake.speedy != -1 && GameArea.key && GameArea.key == 40) {snake.speedy = 1; snake.speedx = 0;}
    
    if (GameArea.key && GameArea.key == 80) stopMove();//p
}
function stopMove(){
    snake.speedx=0;
    snake.speedy=0;
}

window.onload = function () {
    GameArea.start();

    snake = new Snake(Math.round(Math.random() * width/tailSize), Math.round(Math.random() * height/tailSize), sock.id);
    var data = {
        snakeTrail: snake.snakeTrail,
        color: "yellow",
        width: width,
        height: height,
        tailSize: tailSize
    };

    sock.emit('start', data);

    sock.on('heartbeat', function(data) {
        snakes = data.snakes;
        apple = data.apple;
        draw();
    });
    
}