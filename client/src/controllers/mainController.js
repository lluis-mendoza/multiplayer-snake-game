import SocketController from './socketController.js'
import MoveController from './moveController.js';
import PlayerController from './playerController.js';

export default class MainController{
    constructor(){
        
        this.moveController = new MoveController();
        this.playerController = new PlayerController();
        this.socketController = new SocketController(this);
    }
    run(){
        this.socketController.connect();
        this.update();

    }
    update(){
        this.socketController.sendInput();
        this.playerController.draw();
        setTimeout(this.update.bind(this), 1000/60);
    }

}
