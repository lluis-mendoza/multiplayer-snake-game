const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const config = require('./config');
const MainController = require('./controllers/mainController');

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/public/game.html'));
});

const mainController = new MainController();
mainController.listen(io);

server.listen(config.port, () =>{
    console.log('Server started on ', config.port);
});

module.exports = app;
