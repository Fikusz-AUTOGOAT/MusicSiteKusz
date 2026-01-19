const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const camera = {
    x: 0,
    y: 0
};

function update() {
    movePlayer();

    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;
}

function draw() {
    drawWorld(ctx, camera);
    drawEnemies(ctx, camera);
    drawPlayer(ctx);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
