var playing = false;
var jumpHeight = 20;

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var groundY = 2 / 3;
drawBackground();
var img = new Image();
var img_width = 0;
var img_height = 0;
var x = canvas.width / 5;
var y = canvas.height * groundY;
var MOVE_VAL = 5;

img.onload = function () {
    img_height = 40; //img.height / 2;
    img_width = 40 / img.height * img.width;
    // draw in center of canvas
    y -= img_height;
    drawHero();
}

function drawHero() {
    ctx.drawImage(img, x, y, img_width, img_height);
}

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(116, 125, 140)'; 
    ctx.fillRect( 0, canvas.height * groundY, canvas.width, canvas.height * 1 / groundY);
}

img.src = './images/hero/test.png';

function jump() {
   if (y >= (groundY + img_height)) {
        y -= jumpHeight;
        drawBackground();
        drawHero();
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
                } else {
                    jump();
                }
                break;
            default: // ignore all other keys
                break;
        }
    }
}

$(document).ready( function() {
    $(this).keydown(handleKeydown);
});
