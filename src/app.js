const PORT = process.env.PORT || 8000
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 });

app.use(express.static("public"))

players = {}
const SPEED = 30
io.on('connection', (socket) => {
    console.log("user connected", socket.id);
    players[socket.id] = {
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500),
        width: 25,
        height: 25,
        color : `hsl(${Math.random()*360}, 100%, 50%)`
    }
    io.emit("players", players)
    console.log(players)

    socket.on("keydown", (key)=>{
        switch(key){
            case "w":
                players[socket.id].y -= SPEED
                break;
            case "a":
                players[socket.id].x -= SPEED
                break;
            case "s":
                players[socket.id].y += SPEED
                break;
            case "d":
                players[socket.id].x += SPEED
                break;
        }
    })

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete players[socket.id]
        io.emit("players", players)
    })
});

setInterval(()=>{
    io.emit("players", players)
},15)

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});