const PORT = process.env.PORT || 8000
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"))

io.on('connection', (socket) => {
    io.emit("userConnected", socket.id)
    console.log("user connected", socket.id);


    socket.on("disconnect", () => {
        io.emit("userDisconnected", socket.id);
        console.log("user disconnected", socket.id);
    })
});

server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});