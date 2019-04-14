const canvas = document.getElementById("myCanvas");
const ratioController = document.querySelector('#ratioController');
const ratioInput = document.querySelector('#ratioInput');
const playButton = document.querySelector('#playButton');

const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

ratioController.type = "range";
ratioController.min = "0";
ratioController.max = "100000";
ratioController.value = "0";

ratioInput.value = 0;

const centerX = 200;
const centerY = 200;
let isPlaying = false;
let playInterval;

ratioController.oninput = function() {
    const value = ratioController.value / 100000;
    ratioInput.value = value;
    drawPattern(value);
};

ratioInput.oninput = function() {
    const value = ratioInput.value;
    ratioController.value = value * 100000;
    drawPattern(value);
};

playButton.onclick = function() {
    if (isPlaying) {
        isPlaying = false;
        playButton.innerHTML = "Play";
        clearInterval(playInterval);
    } else {
        if (!ratioInput.value) {
            ratioInput.value = 0;
        }
        isPlaying = true;
        playButton.innerHTML = "Stop";
        playInterval = setInterval(updatePattern, 10);
    }
};


function drawPattern(rotationFactor) {
    ctx.clearRect(0, 0, 400, 400);
    const rotation = (2 * Math.PI) * rotationFactor;
    let drawingRadius = 5;
    let circleX = centerX;
    let circleY = centerY;
    let drawingAngle = 0;
    for (let i = 0; i < 100; i++) {
        const y = Math.sin(drawingAngle) * drawingRadius;
        const x = Math.cos(drawingAngle) * drawingRadius;
        circleX = centerX + x;
        circleY = centerY + y;
        drawCircle(circleX, circleY);
        drawingAngle += rotation;
        drawingRadius += 2;
    }
}

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}

function updatePattern() {
    const value = ratioInput.value;
    const newValue = parseFloat(value) + .00001;
    ratioInput.value = newValue;
    ratioController.value = newValue * 100000;
    drawPattern(newValue);
}

drawPattern(ratioInput.value);