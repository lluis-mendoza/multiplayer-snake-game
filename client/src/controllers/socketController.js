export default class SocketController{
    constructor(snk){
        this.firstConnection = true;
        this.moveController = snk.moveController;
        this.playerController = snk.playerController;
        console.log(this.moveController);
    }
    connect(){
        this.socket = io();
        this.initSocket();
    }
    initSocket(){
        this.socket.on("connect", () => {this.onConnection()});
        this.socket.on("gameState", (gameState) =>{this.playerController.setPlayers(gameState.players)});
    }
    onConnection(){
        console.log('Client connected!');
    }
    emit(type, value){
        this.socket.emit(type, value);
    }
    sendInput(){
        this.socket.emit('angle', this.moveController.getAngle());
    }
}