const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});



const themeColors = [
    "#E193F5",
    "#F593A3",
    "#F594DE",
    "#C193F5",
    "#F59F93",
    "#F5D4ED"
]
function randInRange(min, max) {
    return Math.random() * (max - min) + min + 0.1;
}
class PinkParticle {
    constructor(x, y, lifespan = 100) {
        this.x = x;
        this.y = y;
        this.color = "#F50F54";
        this.radius = 15;
        this.lifespan = lifespan;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        this.shrink();
    }

    shrink() {
        this.radius -= 0.1;
        this.lifespan -= 1;

    }
}
class Button {
    constructor(x, y, text, color) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.timeCreated = performance.now();
        // allocate space for text
        ctx.font = "bold 20px Arial";
        this.width = ctx.measureText(this.text).width + 30;
        this.height = 50;
        this.textHeight = 20;
        this.movement = [0, 0, 0];
        this.movementStarted = 0;
    }
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + (this.textHeight / 4) + (this.height / 2));

        if (this.movement[2] > 0) {
            var time = performance.now() - this.movementStarted;
            if (time < this.movement[2]) {
                this.x = this.x + (this.movement[0] - this.x) * (time / this.movement[2]);
                this.y = this.y + (this.movement[1] - this.y) * (time / this.movement[2]);
            }
        }
    }
}
class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.originalRadius = radius;
        this.generalDirection = [randInRange(-1, 1), randInRange(-1, 1)];
    }

    draw() {
        this.x += this.generalDirection[0] * 4;
        this.y += this.generalDirection[1] * 4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

    }
}


var circles = [];
var particles = [];
for (let i = 0; i < 135; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let radius = Math.random() * 85 + 15;
    let color = themeColors[Math.floor(Math.random() * themeColors.length)];
    circles.push(new Circle(x, y, radius, color));
}


var start = performance.now();

var bubbleShrinkTime = 3000;
var initialTime = 1000;
var heyTextTime = 1000;
var valentinetextTime = 1000;
var valentinebuttonTime = 2000;
var buttonStartedAt = 0;
var bubblesStartedAt = 0;
var heyStartedAt = 0;
var buttonStartedAt = 0;
var anim = "none";
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var timeOver = performance.now() - start;
    if (timeOver < bubbleShrinkTime + initialTime) {
        particlesEnabled = true;
        if (anim != "bubbles") {
            bubblesStartedAt = performance.now();
        }
        anim = "bubbles";
    } else if (timeOver < bubbleShrinkTime + initialTime + heyTextTime) {
        if (anim != "heyText") {
            heyStartedAt = performance.now();
        }
        anim = "heyText";
    } else if (timeOver < bubbleShrinkTime + initialTime + heyTextTime + valentinetextTime) {
        if (anim != "valentinetext") {
            buttonStartedAt = performance.now();
        }
        anim = "valentinetext"
    } else if (timeOver < bubbleShrinkTime + initialTime + heyTextTime + valentinetextTime + valentinebuttonTime) {
        if (anim != "valentinebutton") {
            buttonStartedAt = performance.now();
        }
        anim = "valentinebutton";
    }
    switch (anim) {
        case "bubbles":
            drawBubblesExp();
            break;
        case "heyText":
            drawHeyText();
            break;
        case "valentinetext":

            drawHeyText();
            drawvalentinetexts();
            break;
        case "valentinebutton":
            particlesEnabled = false;
            drawBubbles();
            drawvalentineButtons();

            break;
        case "grow_button":
            particlesEnabled = false;
            drawBubbles();
            drawvalentineButtons();

            break;
    }
    particles = particles.filter(particle => {
        particle.draw();
        if (particle.lifespan <= 0) {
            return false;
        } else {
            return true;
        }
    });

    requestAnimationFrame(draw);
}

var valTextTopOffSet = 0;
var valTextMaxOffSet = 150;
var valX = canvas.width / 2;
var valY = canvas.height / 2;
var valFontSize = 50;
function drawvalentinetexts() {
    ctx.font = "bold " + valFontSize + "px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText("Happy", canvas.width / 2, canvas.height / 2);
    ctx.fillText("Valentine's", canvas.width / 2, canvas.height / 2 + valFontSize);
    ctx.fillText("Day!", canvas.width / 2, canvas.height / 2 + (valFontSize * 2));


    if (valTextTopOffSet < valTextMaxOffSet) {
        var now = performance.now();
        var moved = now - buttonStartedAt;
        var percent = moved / heyTextTime;

        var pixelsLeft = valTextMaxOffSet - valTextTopOffSet;
        valTextTopOffSet += pixelsLeft * percent;
    }
}
var noButton = new Button(canvas.width / 2 - 100, canvas.height / 2 - valFontSize * 2, "No", themeColors[Math.floor(Math.random() * themeColors.length)]);
var yesButton = new Button(canvas.width / 2 + 100, canvas.height / 2 - valFontSize * 2, "Yes", themeColors[Math.floor(Math.random() * themeColors.length)]);
// center the buttons
noButton.x -= noButton.width / 2;
yesButton.x -= yesButton.width / 2;

var layer2 = "none";
var layer3 = "none";
function drawvalentineButtons() {
    var text = "Will you be my valentine?";
    var color = "#CC0000";
    ctx.fillStyle = color;
    ctx.font = "bold 20px Arial";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 - valFontSize * 3);


    noButton.draw();
    yesButton.draw();
    if (layer2 == "grow_button") {
        var x = yesButton.x + yesButton.width / 2;
        var y = yesButton.y + yesButton.height / 2;

        var timeOver = performance.now() - grow_buttonStartedAt;
        var endTime = grow_buttonStartedAt + 1000;
        var timeLeft = endTime - timeOver;
        var percent = timeOver / 1000;

        var targetRadius = canvas.width / 2;
        var radius = targetRadius * percent;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = yesButton.color;
        ctx.fill();
        if(confettiParticles.length < 100 && Math.random() > 0.9){
            confettiParticles.push(new ConfettiParticle(randInRange(0, canvas.width), themeColors[Math.floor(Math.random() * themeColors.length)]));
        }
  
        if (timeOver > 1500) {
            layer3 = "show text";
        }
        confettiParticles = confettiParticles.filter(particle => {
            if(particle.y > canvas.height){
                return false;
            } else {
                return true;
            }
        });
    }
    if(layer3 == "show text"){
        ctx.font = "bold 100px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#FFF";
        ctx.fillText("Yay!", canvas.width / 2, canvas.height / 2 - 150);
        ctx.fillText("😘", canvas.width / 2, canvas.height / 2);
        
    }
    if(layer2 == "grow_button"){
        confetti();
    }
}
var confettiParticles = [];
class ConfettiParticle {
    constructor(x, color) {
        this.x = x;
        this.y = -10;
        this.color = color;
        this.angle = Math.random() * Math.PI * 2;
    }
    draw() {
        this.y += 3;
        this.x += Math.sin(this.angle) * 2;
        this.angle += 0.1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
function confetti(){
    confettiParticles.forEach(particle => {
        particle.draw();
    });
}
var heyTextTopOffSet = 0;
var heyTextMaxOffSet = 150;
var heyX = canvas.width / 2;
var heyY = canvas.height / 2;
function drawHeyText() {
    ctx.font = "bold 100px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText("Hey!", heyX, heyY - heyTextTopOffSet);
    if (heyTextTopOffSet < heyTextMaxOffSet) {
        var now = performance.now();
        var moved = now - heyStartedAt;
        var percent = moved / heyTextTime;

        var pixelsLeft = heyTextMaxOffSet - heyTextTopOffSet;
        heyTextTopOffSet += pixelsLeft * percent;
    }
}
function drawBubbles(desired = 10) {
    circles = circles.filter(circle => {
        if (circle.radius <= 0) {
            return false;
        }
        return true;
    });
    circles.forEach(circle => {
        circle.draw();
        if (circle.x > canvas.width || circle.x < 0) {
            circle.generalDirection[0] *= -1;
        }
        if (circle.y > canvas.height || circle.y < 0) {
            circle.generalDirection[1] *= -1;
        }
    });
    if (circles.length < desired) {
        if (Math.random() > 0.9) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let radius = Math.random() * 85 + 15;
            let color = themeColors[Math.floor(Math.random() * themeColors.length)];
            circles.push(new Circle(x, y, radius, color));
        }
    }
}
function drawBubblesExp() {
    circles.forEach(circle => {
        circle.draw();
        if (circle.x > canvas.width || circle.x < 0) {
            circle.generalDirection[0] *= -1;
        }
        if (circle.y > canvas.height || circle.y < 0) {
            circle.generalDirection[1] *= -1;
        }
    });
    if (performance.now() - start > initialTime) {
        circles = circles.filter(circle => {
            // calculate new radius based on time left
            var timeOver = performance.now() - start - initialTime;
            var endTime = bubbleShrinkTime;
            var timeLeft = endTime - timeOver;
            var percent = timeLeft / endTime;
            circle.radius = circle.originalRadius * percent - 0.1;

            if (circle.radius <= 0) {
                return false;
            } else {
                return true;
            }
        })
    }


}
draw();



var grow_buttonStartedAt = 0;
var lastX = null;
var lastY = null;
canvas.addEventListener('mousemove', (e) => {
    if (particlesEnabled == false) return;
    if (!lastX || !lastY) {
        lastX = e.clientX;
        lastY = e.clientY;
    } else {
        let x = e.clientX;
        let y = e.clientY;
        let dx = x - lastX;
        let dy = y - lastY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 10) {
            // interpolate points between lastX, lastY and x, y
            let steps = Math.floor(distance / 10);
            let xStep = dx / steps;
            let yStep = dy / steps;

            for (let i = 0; i < steps; i++) {
                particles.push(new PinkParticle(lastX + xStep * i, lastY + yStep * i));
            }
        }
        particles.push(new PinkParticle(x, y));

    }

    lastX = e.clientX;
    lastY = e.clientY;
});

var touchCounter = 0;
canvas.addEventListener('click', (e) => {
    if (e.clientX > noButton.x && e.clientX < noButton.x + noButton.width && e.clientY > noButton.y && e.clientY < noButton.y + noButton.height) {
        touchCounter++;
        if (touchCounter >= 5) {
            noButton.movement = [canvas.width * 2, canvas.height * 2, 10000];
            noButton.movementStarted = performance.now();
        } else {
            jumpButton(1000);
        }
    }
    if (e.clientX > yesButton.x && e.clientX < yesButton.x + yesButton.width && e.clientY > yesButton.y && e.clientY < yesButton.y + yesButton.height) {
        layer2 = "grow_button";
        grow_buttonStartedAt = performance.now();
    }
});


function jumpButton(time) {
    noButton.movement = [Math.random() * canvas.width - noButton.width / 2, Math.random() * canvas.height - noButton.height / 2, time];
    noButton.movementStarted = performance.now();
}