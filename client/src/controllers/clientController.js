import SocketController from './socketController.js'
import MoveController from './moveController.js';
import PlayerController from './playerController.js';
import GameView from '../views/gameView.js';

export default class MainController{
    constructor(){
        this.gameView = new GameView();
        this.moveController = new MoveController();
        this.playerController = new PlayerController(this);
        this.socketController = new SocketController(this);
    }
    run(){
        this.socketController.connect();
        this.update();

    }
    update(){
        this.socketController.sendInput();
        this.playerController.draw();
        setTimeout(requestAnimationFrame(this.update.bind(this)), 1000/100);
    }

}
