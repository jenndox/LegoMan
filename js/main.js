var lightColors = [];
var mainColors = [];
var darkColors = []
var elements = [];
var currentColorIndex = 0;

var hats = [];
var hatColors = [];
var currentHatIndex = 1;
var currentHatColorIndex = 0;

function intialDraw() {
    window.addEventListener('resize', legoMan, false);

    // Add event listener for `click` events.
    document.getElementById('mainCanvas').addEventListener('click', function(event) {
        var x = event.pageX,
            y = event.pageY;


        for (var idx = 0; idx < elements.length; idx++)
        {
            var element = elements[idx];
            if (y > element.top && y < element.top + element.height 
                && x > element.left && x < element.left + element.width) {
                currentColorIndex = idx;
                legoMan();
                break;
            }
        }
    }, false);

    addColors();
    addHats();

	legoMan();
};

function addColors() {
    // Blacks
    lightColors.push("#777777");
    mainColors.push("#333333");
    darkColors.push("#000000");    

    // Yellows
    lightColors.push("#FDE46A");
    mainColors.push("#FFE330");
    darkColors.push("#AD9625");

    // Blues
    lightColors.push("#05EFFF");
    mainColors.push("#00A2BA");
    darkColors.push("#3E00BA");

    // Reds
    lightColors.push("#F43E3E");
    mainColors.push("#FE0303");
    darkColors.push("#A10606");

    // Greens
    lightColors.push("#78E435");
    mainColors.push("#61BA00");
    darkColors.push("#00903A");

}

function addHats() {
    hats.push("baldie");
    hats.push("helmet");
    hats.push("ballCap");
    hats.push("hair");

    hatColors.push("white");
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
    ctx.fillStyle = mainColors[0];
    ctx.strokeStyle = darkColors[0];

    // The smile

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
};

function drawLegoMan(ctx) {

    var canvasWidth = $('#mainCanvas').width();
    var canvasHeight = $('#mainCanvas').height();

    var initialX = 0.45 * canvasWidth, initialY = 0.1 * canvasHeight;
    var height = 0.08 * canvasHeight, width = 0.1 * canvasWidth;
    setupDrawingStyle(ctx, initialX, initialY, width, height, 0.75, currentColorIndex);
    
    outlineLegoTop(ctx, height, width, initialX, initialY);

    var headX = initialX - width / 2, headY = initialY + height - ctx.lineWidth;
    height = 0.25 * canvasHeight, width = 0.2 * canvasWidth;

    outlineLegoHead(ctx, height, width, headX, headY);

    fillFace(ctx, headX, headY, width, height);

    // Draw the face
    if (currentColorIndex > 0) {
        // Walter put in a special request that the black head have no face.
        drawFigFace(ctx, height, width, headX, headY);
    }

    // Optionally add headgear
    if (currentHatIndex > 0) {
        drawHat(ctx, initialX, initialY, canvasWidth, canvasHeight);
    }

    var h = 0.1 * canvasHeight, w = 0.8 * canvasWidth;
    drawColorButtons(ctx, 0.2 * canvasWidth, 0.8 * canvasHeight, w, h);
};

function drawColorButtons(ctx, x, y, w, h) {
    for(var idx=0; idx < lightColors.length; idx++)
    {
        elements.push({
            colorIndex: idx,
            width: 32,
            height: 32,
            top: y+ h * 0.5,
            left: x + w*0.2 + 64 * idx
        });
    }

    // Render elements.
    elements.forEach(function(element) {
        ctx.fillStyle = lightColors[element.colorIndex];
        ctx.strokeStyle = darkColors[element.colorIndex];
        ctx.beginPath();
        ctx.rect(element.left,element.top,element.height,element.width);
        ctx.stroke();
        ctx.fill();
    });
};

function setupDrawingStyle(ctx, initialX, initialY, width, height, colorStop, colorIndex) {
    var lineargradient = ctx.createLinearGradient(0,0,initialX+width,initialY+height);
    lineargradient.addColorStop(0,lightColors[colorIndex]);
    lineargradient.addColorStop(colorStop,mainColors[colorIndex]);
    lineargradient.addColorStop(1,darkColors[colorIndex]);
    ctx.fillStyle = lineargradient;
    ctx.strokeStyle = darkColors[colorIndex];
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
};

function drawHelmet(ctx, x, y, w, h) {
    var i, xPos, yPos, pi = Math.PI, twoPi = 2 * pi;

    for (i = 0; i < pi; i += 0.001) {
        xPos = (x + w / 2) - (w / 2 * Math.cos(i));
        yPos = (y + h / 8) + (h / 16 * Math.sin(i));

        if (i === 0) {
            ctx.moveTo(xPos, yPos);
        } else {
            ctx.lineTo(xPos, yPos);
        }
    }

    for (i = pi; i < twoPi; i += 0.001) {
        xPos = (x + w / 2) - (w / 2 * Math.cos(i));
        yPos = (y + h / 8) + (h / 2.5 * Math.sin(i));

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
};

function fillFace(ctx, x, y, w, h) {
    var xPos = (x + w / 2) - (w / 2 * Math.cos(0));
    var yPos = (y + h / 8) + (h / 8 * Math.sin(0));
    var width = w;
    var height = h - 2 * (yPos - y) + 1;
    ctx.beginPath();
    ctx.rect(xPos, yPos, width, height);
    ctx.fill();
};

function drawHat(ctx, x, y, w, h) {
    switch (currentHatIndex) {
        case 1:
            ctx.fillStyle = hatColors[currentHatColorIndex];
            ctx.strokeStyle = hatColors[currentHatColorIndex];

            // Draw a helmet
            w = 0.2 * w;
            h = 0.3 * h;
            ctx.beginPath();
            drawHelmet(ctx, x - w/4, y + h/8, w, h);
            ctx.fill();
            ctx.stroke();
            break;

        default:
        //Not yet implemented
        break;
    }
};
