export default class PlayerController{
    constructor(snk){
        this.players = [];
        this.gameView = snk.gameView;
    }
    draw(){
        var i;
        for(i = 0; i<this.players.length; ++i){
            this.gameView.drawSnake(this.players[i].segments);
        }
    }
    setPlayers(players){
        this.players = players;
    }
    
}