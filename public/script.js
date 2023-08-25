const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")
class Player {
    constructor({ x, y, width, height, color }) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}


const boardEl = document.getElementById("board")
const playersMap = {}
const socket = io();
socket.on("players", (players) => {
    for (const id in players) {
        const player = players[id]
        if (!playersMap[id]) {
            playersMap[id] = new Player({ x: player.x, y: player.y, width: player.width, height: player.height, color: player.color })
        } else {
            playersMap[id].x = players[id].x
            playersMap[id].y = players[id].y
        }
    }

    for (const id in playersMap) {
        if (!players[id]) {
            delete playersMap[id]
        }
    }
    // console.log(playersMap);
})


function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const id in playersMap) {
        const player = playersMap[id]
        player.draw()
    }

}
animate()
const SPEED = 5
let keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

setInterval(() => {
    if (keys.w.pressed) {
        playersMap[socket.id].y -= SPEED
        socket.emit("keydown", "w")
    }
    if (keys.a.pressed) {
        playersMap[socket.id].y -= SPEED
        socket.emit("keydown", "a")
    }
    if (keys.s.pressed) {
        playersMap[socket.id].y -= SPEED
        socket.emit("keydown", "s")
    }
    if (keys.d.pressed) {
        playersMap[socket.id].y -= SPEED
        socket.emit("keydown", "d")
    }
}, 15)

addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = true;
            break;
        case "a":
            keys.a.pressed = true;
            break;
        case "s":
            keys.s.pressed = true;
            break;
        case "d":
            keys.d.pressed = true;
            break;
    }
})

addEventListener("keyup", (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
    }
})