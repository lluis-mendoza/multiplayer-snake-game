const Player = require('../models/player');
class PlayerController{
    constructor(){
        this.players = [];
    }
    addPlayer(name){
        console.log(name);
        var newPlayer = new Player(123, name, 'red');
        this.players.push(newPlayer);
    }
    move(){
        var i;
        for(i = 0; i< this.players.length; ++i){
            this.players[i].move();
        }
    }
    handleCollisions(){
        
    }
    changeAngle(angle){
        var i;
        for(i = 0; i< this.players.length; ++i){
            this.players[i].changeAngle(angle);
        }
    }
    getPlayers(){
        return this.players;
    }
}

module.exports = PlayerController;