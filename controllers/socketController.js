class SocketController{
    constructor(){
        this.numConnections = 0;
    }
    listen(io){
        io.sockets.on("connection", (socket)=>{ this.onConnection(socket)});
    }
    onConnection(socket){
        ++this.numConnections;
        console.log("Client " + socket.request.connection.remoteAddress + " has connected!");
        socket.on('disconnect', () => this.onDisconnect(socket));
    }
    onDisconnect(socket){
        console.log("Client " + socket.request.connection.remoteAddress + " has disconnected!");
        --this.numConnections;
    }
}

module.exports = SocketController;