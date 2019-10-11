// Game Control Variables
var playing = false;
var gameover = false;
var spawned = false;
var fps = 30;
var powerupTime = 4000;

// Jumping/Falling Variables
var jumping = false;
var ducking = false;
var jumpVal = -8;
var verticalSpeed = 0;
var grav = 0.5;

// General Game Variables
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var groundY = canvas.height * 4 / 5;
var score = 0;
var sprite_control = 40;
var initialPowerup = 0;

// Hero Sprite Vars
var hero = new Image();
var hero_width = 0;
var hero_height = 0;
var x = canvas.width / 4;
var y = groundY;

hero.onload = function () {
    hero_height = sprite_control; 
    hero_width = sprite_control / hero.height * hero.width;
    y -= hero_height;
}
hero.src = './images/hero/test.png';

// Obstacle Sprite Vars
var obst_speed = 6;

var obst1 = new Image();
var obst1_width = 0;
var obst1_height = 0;
var obst1_x = canvas.width;
var obst1_y = 0; 
obst1.src = './images/obst1.png';

var obst2 = new Image();
var obst2_width = 0;
var obst2_height = 0;
var obst2_x = canvas.width * 1.5;
var obst2_y = 0; 
obst2.src = './images/obst2.png';

var powerup = new Image();
var powerup_width = 0;
var powerup_height = 0;
var powerup_x = canvas.width;
var powerup_y = 0; 
obst2.src = './images/power.png';


function getRandY(img_height) {
    return Math.random() * (groundY-img_height);
}

function getRandX(){
    return canvas.width + Math.random() * canvas.width;
}

function drawHero() {
    if(!ducking) {
        ctx.drawImage(hero, x, y, hero_width, hero_height);
    } else {
        ctx.drawImage(hero, x, y + hero_height / 2, hero_width, hero_height / 2);
    }
}

function drawObsts() {
    ctx.drawImage(obst1, obst1_x, obst1_y, obst1_width, obst1_height);
    ctx.drawImage(obst2, obst2_x, obst2_y, obst2_width, obst2_height);
}
function drawPowerup() {
	ctx.drawImage(powerup, powerup_x, powerup_y, powerup_width, powerup_height); 
}

function spawnPowerup() {
	powerup_x = canvas.width + getRandX();
	powerup_y = getRandY(powerup_height);
	powerup.src = './images/power.png';
	
	drawPowerup();
	setTimeout(spawnPowerup,powerupTime);
}

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(116, 125, 140)'; 
    ctx.fillRect( 0, groundY, canvas.width, canvas.height - groundY);
}

function collision( oX, oY, oWidth, oHeight, tolerance, good_collision ) {
    let width = hero_width;
    let height = hero_height;
    if (ducking) {
        width /= 2;
        height /= 2;
    }
    if( x < oX + oWidth - tolerance && x + width > oX + tolerance &&
        y < oY + oHeight - tolerance && y + height > oY + tolerance ) { // collision detected
            if (!good_collision) {
                playing = false;
            } // TODO: put power up collision result here
        }
}

function jump() {
    if (!jumping) {
        y = y - 1; // so doesn't just get reset with ground collision
        jumping = true;
        verticalSpeed = jumpVal;
    }
}

function handleKeyup(event) {
    if(event && event.keyCode) {
        switch(event.keyCode){
            case 40: // down
                if(playing) {
                    ducking = false;
                }
                break;
            default: // ignore all other keys
                break;
        }
    }
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
                    // duck();
                    ducking = true;
                }
                break;
            case 32: // space
                event.preventDefault(); // keep page from scrolling
                if(!playing && !gameover) {
                    obst1_height = sprite_control / 2;
                    obst1_width = sprite_control / 2 / obst1.height * obst1.width;
                    obst1_y = getRandY(obst1_height);
                    obst2_height = sprite_control / 2;
                    obst2_width = sprite_control / 2 / obst2.height * obst2.width;
                    obst2_y = getRandY(obst2_height);
                    playing = true;
                    $('#before_play').hide();
					initialPowerup = Math.random() * 1000;
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
	$("#p_score").text(`You scored: ${score} points`)
    $('#after_play').show();
    gameover = true;
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
    if(obst1_x < 0 - obst1_width) {
        obst1_x = canvas.width + getRandX();
        obst1_y = getRandY(obst1_height);
        obst_speed *= 1.05; // obstacles get faster over time
        obst1.src = './images/obst1.png'; // change sprite back to obstacle
    }
    obst2_x -= obst_speed;
    if(obst2_x < 0 - obst2_width) {
        obst2_x = canvas.width + getRandX();
        obst2_y = getRandY(obst2_height);
        obst2.src = './images/obst2.png';
    }
	
	powerup_x -= obst_speed;
	if(score > initialPowerup) {
		spawnPowerup();
	}

    // Change to Clear Sprites
    if ( obst1_x + obst1_width / 2 < x ) {
        obst1.src = './images/clear1.png';
    }
    if ( obst2_x + obst2_width / 2 < x ) {
        obst2.src = './images/clear2.png';
    }
    
    drawBackground();
    drawObsts();
    drawHero();
    collision(obst1_x,obst1_y,obst1_width,obst1_height,5);
    collision(obst2_x,obst2_y,obst2_width,obst2_height,5);
	if(!playing) {
		gameFinished();
	} else {
        setTimeout(gameLoop, fps);
	}
}

$(document).ready( function() {
	update_scores();
    $(this).keydown(handleKeydown);
    $(this).keyup(handleKeyup);
});
