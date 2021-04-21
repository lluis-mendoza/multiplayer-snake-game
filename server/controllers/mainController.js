const SocketController = require('./socketController');
const PlayerController = require('./playerController');

class MainController{
    constructor(){
        this.playerController = new PlayerController();
        this.socketController = new SocketController(this);
        
        this.playerController.addPlayer('achanta');
    }
    listen(io){
        this.socketController.listen(io);
        this.start();
    }
    start(){
        this.gameLoop();
    }
    gameLoop(){
        this.playerController.move();
        this.playerController.handleCollisions();
        const gameState = {
            players: this.playerController.getPlayers()
        }
        this.socketController.broadcastState(gameState);
        setTimeout(this.gameLoop.bind(this), 1000/60);
    }
}

module.exports = MainController;