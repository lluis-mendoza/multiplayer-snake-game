//import { LoopController } from './LoopController';
const SocketController = require('./socketController');

class MainController{
    constructor(){
        //this.loopController = new LoopController();
        this.socketController = new SocketController();
    }
    listen(io){
        this.socketController.listen(io);
    }
}

module.exports = MainController;