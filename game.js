var playing = false;
var fps = 30;
// var jumpHeight = 20;

// Jumping/Falling Variables
var jumping = false;
var jumpVal = -7;
var verticalSpeed = 0;
var grav = 0.5;

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var groundY = canvas.height * 2 / 3;
var img = new Image();
var img_width = 0;
var img_height = 0;
var x = canvas.width / 5;
var y = groundY;
var MOVE_VAL = 5;

img.onload = function () {
    img_height = 40; //img.height / 2;
    img_width = 40 / img.height * img.width;
    y -= img_height;
}

function drawHero() {
    ctx.drawImage(img, x, y, img_width, img_height);
}

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(116, 125, 140)'; 
    ctx.fillRect( 0, groundY, canvas.width, canvas.height * 1 / groundY);
}

img.src = './images/hero/test.png';

function jump() {
    if (!jumping) {
        y = y - 1; // so doesn't just get reset with ground collision
        jumping = true;
        verticalSpeed = jumpVal;
    }
}

function duck() {
    alert("DUCK!!!");
}

function handleKeydown(event) {
    if(event && event.keyCode) {
        switch(event.keyCode){
            case 38: // up
                event.preventDefault(); // keep page from scrolling
                if(playing) {
                    jump();
                }
                break;
            case 40: // down
                event.preventDefault(); // keep page from scrolling
                if(playing) {
                    duck();
                }
                break;
            case 32: // space
                event.preventDefault(); // keep page from scrolling
                if(!playing) {
                    playing = true;
                    $('#before_play').hide();
                    gameLoop();
                } else {
                    jump();
                }
                break;
            default: // ignore all other keys
                break;
        }
    }
}

function gameLoop() {
    // Falling
    verticalSpeed = verticalSpeed + grav
    y = y + verticalSpeed;
    // Don't fall through ground
    if ( y + img_height >= groundY ) {
        jumping = false;
        y = groundY - img_height;
        verticalSpeed = 0;
    }
    drawBackground();
    drawHero();
    setTimeout(gameLoop, fps);
    // console.log(`jumping: ${jumping}`)
}

$(document).ready( function() {
    $(this).keydown(handleKeydown);
    // gameLoop();
    console.log(groundY);
});
