// Canvas Setup
let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 1250;
cnv.height = 850;

// Global Variables
spaceIsPressed = false;
let gameState = "title";
let keyWPressed = false;
let keyAPressed = false;
let keySPressed = false;
let keyDPressed = false;
let player;
let wall;
reset();
// Arrays
let wallArray = [];

// draw functions
window.addEventListener("load", draw)
function draw() {
    // gamestate check
    if (gameState === "title") {
        drawTitle();
    } else if (gameState === "start") {
        drawStart();
    }
    requestAnimationFrame(draw);
}

function drawTitle() {
    // title visuals
    drawTitleComponents();
    // change to start on space
    if (spaceIsPressed) {
        gameState = "start";
    }
}

function drawTitleComponents() {
    // title + background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Press SPACE", 50, 50);
}

function drawStart() {
    drawStartComponents();
    playerMovement();
    drawPlayer();

}


function drawPlayer() {
    //player
    ctx.fillStyle = "magenta";
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawStartComponents() {
    //background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    wallArray.push(wall);
    for (let i = 0; i < wallArray.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
        wall.x = Math.floor(Math.random() * (1150 - 50 + 1) + 50);
        wall.y = Math.floor(Math.random() * (750 - 50 + 1) + 50);
        wall.w = Math.floor(Math.random() * (100 - 75 + 1) + 50);
        wall.h = Math.floor(Math.random() * (100 - 75 + 1) + 50);
        //wallArray.pop();
    }
}


function playerMovement() {
    //movement
    if (keyWPressed) {
        player.y -= 10;
    }
    if (keyAPressed) {
        player.x -= 10;
    }
    if (keySPressed) {
        player.y += 10;
    }
    if (keyDPressed) {
        player.x += 10;
    }
    //border wrap
    if (player.x > cnv.width) {
        player.x = 0 - player.w;
    } else if (player.y > cnv.height) {
        player.y = 0 - player.h;
    } else if (player.x + player.w < 0) {
        player.x = cnv.width;
    } else if (player.y + player.h < 0) {
        player.y = cnv.height;
    }
}

function reset() {
    //objects
    player = { x: 10, y: 10, w: 10, h: 20 };
    wall = { x: 0, y: 0, w: 0, h: 0 };
}
// Key Event Functions
document.addEventListener("keyup", keyupHandler);
document.addEventListener("keydown", keydownHandler);

function keydownHandler(event) {
    console.log(event);
    if (event.keyCode === 32) {
        spaceIsPressed = true;
    } else if (event.keyCode === 87) {
        keyWPressed = true;
    } else if (event.keyCode === 65) {
        keyAPressed = true;
    } else if (event.keyCode === 83) {
        keySPressed = true;
    } else if (event.keyCode === 68) {
        keyDPressed = true;
    }
}

function keyupHandler(event) {
    console.log(event);
    if (event.keyCode === 32) {
        spaceIsPressed = false;
    } else if (event.keyCode === 87) {
        keyWPressed = false;
    } else if (event.keyCode === 65) {
        keyAPressed = false;
    } else if (event.keyCode === 83) {
        keySPressed = false;
    } else if (event.keyCode === 68) {
        keyDPressed = false;
    }
}