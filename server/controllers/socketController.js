class SocketController{
    constructor(snk){
        this.numConnections = 0;
        this.playerController = snk.playerController;
    }
    listen(io){
        this.sockets = io.sockets;
        this.sockets.on("connection", (socket)=>{ this.onConnection(socket)});
    }
    onConnection(socket){
        ++this.numConnections;
        console.log("Client " + socket.request.connection.remoteAddress + " has connected!");
        socket.on('disconnect', () => this.onDisconnect(socket));
        socket.on('angle', (angle) =>{this.playerController.changeAngle(angle)});
    }
    onDisconnect(socket){
        console.log("Client " + socket.request.connection.remoteAddress + " has disconnected!");
        --this.numConnections;
    }
    broadcastState(gameState){
        this.sockets.emit('gameState', gameState);
    }
}

module.exports = SocketController;