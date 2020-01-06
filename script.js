const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let positionY = 0;
let positionX = 0;
let hue = 0;
let direction = false;
let size = 1;

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.lineCap = 'round';

function draw(e) {
    if (!isDrawing) return; // stop fn if not mousedragging

    // changing the stroke color
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.lineWidth = size;

    // begin the stroke
    ctx.beginPath();

    // starts in
    ctx.moveTo(positionX, positionY);

    // end in
    ctx.lineTo(e.offsetX, e.offsetY);

    // execute the stroke
    ctx.stroke();

    fillPositions(e);
    incrementHue();
    incrementSize();
}

function incrementHue() {
    hue++;
    if (hue > 360) {
        hue = 0;
    }
}

function fillPositions(e) {
    [positionX, positionY] = [e.offsetX, e.offsetY];
}

function incrementSize() {
    if (size >= 100 || size <= 1) {
        direction = !direction;
    }

    if (direction) {
        ++size;
        return;
    }

    --size;
}

document.addEventListener("mousemove", draw)
document.addEventListener("mousedown", (e) => {
    isDrawing = true;
    fillPositions(e);
});
document.addEventListener("mouseup", () => {
    isDrawing = false
});
document.addEventListener("mouseleave", () => {
    isDrawing = false
});

document.addEventListener("keypress", (e) => {
    if (e.key == 'r' || e.key == 'R') {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
});