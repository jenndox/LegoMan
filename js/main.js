var lightFunnelColor = "#FDE46A";
var funnelColor = "#FFE330";
var darkFunnelColor =  "#AD9625";

function intialDraw() {
    window.addEventListener('resize', legoMan, false);
	legoMan();
};

function legoMan() {
	var canvas = document.getElementById('mainCanvas'),
        context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (context) {
        drawLegoMan(context);
    }
};

function outlineLegoTop(ctx, height, width, initialX, initialY) {
    // Draw the head top
    ctx.beginPath();
    drawCylinder(ctx, initialX, initialY, width, height);
    ctx.stroke();
    ctx.fill();
    
};

function outlineLegoHead(ctx, height, width, initialX, initialY) {
    // Draw the head
    ctx.beginPath();
    drawCylinder(ctx, initialX, initialY, width, height);
    ctx.stroke();
    ctx.fill();
};

function drawFigFace(ctx, height, width, initialX, initialY) {
    // The smile
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(initialX + width * 0.5,initialY + height * 0.55,40,0.2*Math.PI,0.8*Math.PI,false);
    ctx.stroke();

    // The Left eye
    ctx.beginPath();
    ctx.arc(initialX + width * 0.35,initialY + height * 0.5,10,0*Math.PI,2*Math.PI,false);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
 
    // The Right Eye
    ctx.beginPath();
    ctx.arc(initialX + width * 0.65,initialY + height * 0.5,10,0*Math.PI,2*Math.PI,false);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

function drawLegoMan(ctx) {

    var canvasWidth = $('#mainCanvas').width();
    var canvasHeight = $('#mainCanvas').height();

    var initialX = 0.45 * canvasWidth, initialY = 0.1 * canvasHeight;
    var height = 0.1 * canvasHeight, width = 0.1 * canvasWidth;
    setupDrawingStyle(ctx, initialX, initialY, width, height, 0.75);
    
    outlineLegoTop(ctx, height, width, initialX, initialY);

    var headX = initialX - width / 2, headY = initialY + height - ctx.lineWidth;
    height = 0.25 * canvasHeight, width = 0.2 * canvasWidth;

    outlineLegoHead(ctx, height, width, headX, headY);

    drawFigFace(ctx, height, width, headX, headY);

};

function setupDrawingStyle(ctx, initialX, initialY, width, height, colorStop) {
    var lineargradient = ctx.createLinearGradient(0,0,initialX+width,initialY+height);
    lineargradient.addColorStop(0,lightFunnelColor);
    lineargradient.addColorStop(colorStop,funnelColor);
    lineargradient.addColorStop(1,darkFunnelColor);
    ctx.fillStyle = lineargradient;
    ctx.strokeStyle = darkFunnelColor;
    ctx.lineWidth = 6;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round'; 
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0; 
};

function drawCylinder(ctx, x, y, w, h) {
    var i, xPos, yPos, pi = Math.PI, twoPi = 2 * pi;

    for (i = 0; i < twoPi; i += 0.001) {
        xPos = (x + w / 2) - (w / 2 * Math.cos(i));
        yPos = (y + h / 8) + (h / 8 * Math.sin(i));

        if (i === 0) {
            ctx.moveTo(xPos, yPos);
        } else {
            ctx.lineTo(xPos, yPos);
        }
    }
    ctx.moveTo(x, y + h / 8);
    ctx.lineTo(x, y + h - h / 8);

    for (i = 0; i < pi; i += 0.001) {
        xPos = (x + w / 2) - (w / 2 * Math.cos(i));
        yPos = (y + h - h / 8) + (h / 8 * Math.sin(i));

        if (i === 0) {
            ctx.moveTo(xPos, yPos);
        } else {
            ctx.lineTo(xPos, yPos);
        }
    }
    ctx.moveTo(x + w, y + h / 8);
    ctx.lineTo(x + w, y + h - h / 8);
}
