var playing = false;
var gameover = false;
var fps = 30;
// var jumpHeight = 20;

// Jumping/Falling Variables
var jumping = false;
var jumpVal = -8;
var verticalSpeed = 0;
var grav = 0.5;

// General Game Variables
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var groundY = canvas.height * 4 / 5;
var score = 0;

// Hero Sprite Vars
var hero = new Image();
var hero_width = 0;
var hero_height = 0;
var x = canvas.width / 5;
var y = groundY;

hero.onload = function () {
    hero_height = 40; //img.height / 2;
    hero_width = 40 / hero.height * hero.width;
    y -= hero_height;
}
hero.src = './images/hero/test.png';

// Obstacle Sprite Vars
// var obstRate = canvas.width / 5;
var obst_speed = 6;

var obst1 = new Image();
var obst1_width = 0;
var obst1_height = 0;
var obst1_x = canvas.width;
var obst1_y = 0; 

var obst2 = new Image();
var obst2_width = 0;
var obst2_height = 0;
var obst2_x = canvas.width * 1.5;
var obst2_y = 0; 

function getRandY(img_height) {
    return Math.random() * (groundY-img_height);
}

function getRandX(){
    return canvas.width + Math.random() * canvas.width;
}

obst1.onload = function () {
    obst1_height = 20; //img.height / 2;
    obst1_width = 20 / obst1.height * obst1.width;
    obst1_y = getRandY(obst1_height);
}
obst1.src = './images/obst1.png';

obst2.onload = function () {
    obst2_height = 20; //img.height / 2;
    obst2_width = 20 / obst2.height * obst2.width;
    obst2_y = getRandY(obst2_height);
}
obst2.src = './images/obst2.png';

function drawHero() {
    ctx.drawImage(hero, x, y, hero_width, hero_height);
}

function drawObsts() {
    ctx.drawImage(obst1, obst1_x, obst1_y, obst1_width, obst1_height);
    ctx.drawImage(obst2, obst2_x, obst2_y, obst2_width, obst2_height);
}

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(116, 125, 140)'; 
    ctx.fillRect( 0, groundY, canvas.width, canvas.height - groundY);
}

function jump() {
    if (!jumping) {
        y = y - 1; // so doesn't just get reset with ground collision
        jumping = true;
        verticalSpeed = jumpVal;
    }
}

function duck() { 
    ctx.clearRect(x, y, hero_width, hero_height);
    ctx.drawImage(hero, x, y + hero_height/2, hero_width, hero_height/2);
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
                if(!playing && !gameover) {
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

function gameFinished() {
	gameover = true;
	$("#p_score").text(`You scored: ${score} points`)
	$('#after_play').show();
	highscore(score);
}

function gameLoop() {
	//Adding 1 to the score for each gameLoop
	score = score + 1;
    // Falling
    verticalSpeed = verticalSpeed + grav
    y = y + verticalSpeed;
    // Don't fall through ground
    if ( y + hero_height >= groundY ) {
        jumping = false;
        y = groundY - hero_height;
        verticalSpeed = 0;
    }
    // Move Obstacles
    obst1_x -= obst_speed;
    if(obst1_x < 0 - obst1.width) {
        obst1_x = canvas.width + getRandX();
        obst1_y = getRandY(obst1_height);
        obst_speed *= 1.05; // obstacles get faster over time
    }
    obst2_x -= obst_speed;
    if(obst2_x < 0 - obst2.width) {
        obst2_x = canvas.width + getRandX();
        obst2_y = getRandY(obst2_height);
    }
    
    drawBackground();
    drawObsts();
    drawHero();
	if(!playing) {
		gameFinished();
	} else {
        setTimeout(gameLoop, fps);
	}
    // console.log(`jumping: ${jumping}`)
}

$(document).ready( function() {
	update_scores();
    $(this).keydown(handleKeydown);
    // gameLoop();
});
