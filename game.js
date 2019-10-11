// Game Control Variables
var playing = false;
var gameover = false;
var fps = 30;
var powerupTime = 8000;
var canvas = document.getElementById('game');
// Fix Blurry Rendering from https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
canvas.width = 1000; // horizontal resolution
canvas.height = 400; // vertical resolution
canvas.style.width = 1000; // actual width of canvas
canvas.style.height = 400; // actual height of canvas
var ctx = canvas.getContext('2d');
var groundY = canvas.height * 4 / 5;
ctx.font = "12px Arial";
var score = 0;
var sprite_control = 100;
var initialPowerup = Math.random() * powerupTime / 10 + powerupTime;
var powerupPoints = 100;
var powerupSpawned = false;
var showPowerupText = false;
var floorColor = 'rgb(116, 125, 140)'; 

// Jumping/Falling Variables
var jumps = 0;
const MAX_JUMPS = 2;
var ducking = false;
var jumpVal = -12;
var verticalSpeed = 0;
var grav = 0.6;

// Hero Sprite Vars
var hero = new Image();
var hero_width = 0;
var hero_height = 0;
var x = canvas.width / 4;
var y = groundY;
var heroSprite = 1;
const numHeroSprites = 4;
hero.src = './images/hero/1.png';

// Obstacle Sprite Vars
var obst_speed = 12;

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

// Power Up Sprite Vars
var powerup = new Image();
var powerup_width = 0;
var powerup_height = 0;
var powerup_x = 0;
var powerup_y = 0; 
powerup.src = './images/power.png';

var powerup_text = new Image();
var powerup_text_width = 0;
var powerup_text_height = 0;
var powerup_text_x = canvas.width / 2;
var powerup_text_y = 10; 
powerup_text.onload = function() {
    powerup_text_width = canvas.width - 40;
    powerup_text_height = powerup_text_width / powerup_text.width * powerup_text.height;
    powerup_text_x -= powerup_text_width / 2;
}
powerup_text.src = './images/power_text.png';

function loadImages() {
    hero_height = sprite_control; 
    hero_width = sprite_control / hero.height * hero.width;
    y -= hero_height;
    obst1_height = sprite_control / 2;
    obst1_width = sprite_control / 2 / obst1.height * obst1.width;
    obst1_y = getRandY(obst1_height);
    obst2_height = sprite_control / 2;
    obst2_width = sprite_control / 2 / obst2.height * obst2.width;
    obst2_y = getRandY(obst2_height);
    powerup_height = sprite_control / 2;
    powerup_width = sprite_control / 2 / powerup.height * powerup.width;
    animateHero();
}

function getRandY(img_height) {
    return Math.random() * (groundY-img_height);
}

function getRandX(){
    return canvas.width + Math.random() * canvas.width / 2;
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
    powerupSpawned = true;
	powerup_x = canvas.width + getRandX();
	powerup_y = getRandY(powerup_height);
}

function animateHero() {
    let baseFname = `./images/hero/${heroSprite}`;
    hero.src = ducking ? `${baseFname}d.png` : `${baseFname}.png`;
    heroSprite++;
    if(heroSprite > numHeroSprites) {
        heroSprite = 1;
    }
    setTimeout( animateHero, fps * (1 / obst_speed) * fps);
}

function animatePowerup() {
    let animateTime = 300;
    showPowerupText = true;
    $('#main').addClass('pulse');
    floorColor = 'rgb(255, 255, 255)'; 
    setTimeout( function() {
        $('#main').removeClass('pulse');
        floorColor = 'rgb(116, 125, 140)'; 
        setTimeout( function() {
            $('#main').addClass('pulse');
            floorColor = 'rgb(255, 255, 255)'; 
            setTimeout( function() {
                $('#main').removeClass('pulse');
                floorColor = 'rgb(116, 125, 140)'; 
            }, animateTime);
        }, animateTime);
    }, animateTime);
    setTimeout( function() {
        showPowerupText = false;
    }, animateTime * 3);
}

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = floorColor;
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillRect( 0, groundY, canvas.width, canvas.height - groundY);
}

function collision( oX, oY, oWidth, oHeight, tolerance, good_collision ) {
    let width = hero_width;
    let height = hero_height;
    let y_c = y;
    if ( ducking ) {
        width = Math.floor(width / 2);
        height = Math.floor(height / 2);
        y_c += height;
    }
    if( x < oX + oWidth - tolerance && x + width > oX + tolerance &&
            y_c < oY + oHeight - tolerance && y_c + height > oY + tolerance ) { // collision detected
        if (!good_collision) {
            playing = false;
        } else {
            score += powerupPoints;
            powerupSpawned = false;
            setTimeout( spawnPowerup, Math.random() * powerupTime + 10000 );
            animatePowerup();
        }
    }
}

function jump() {
    if (jumps < MAX_JUMPS) {
        y = y - 1; // so doesn't just get reset with ground collision
        jumps++;
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
                    loadImages();
                    playing = true;
                    $('#before_play').hide();
                    setTimeout(spawnPowerup, initialPowerup);
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
	$('#p_score').text(`You scored: ${score} points`)
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
        jumps = 0;
        y = groundY - hero_height;
        verticalSpeed = 0;
    }
    // Move Obstacles + Power Up
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
    if(powerupSpawned && powerup_x < 0 - powerup_width) {
        powerupSpawned = false;
        setTimeout( spawnPowerup, Math.random() * powerupTime + 10000 );
    }
    // Change to Clear Sprites
    if ( obst1_x + obst1_width / 2 < x ) {
        obst1.src = './images/clear1.png';
    }
    if ( obst2_x + obst2_width / 2 < x ) {
        obst2.src = './images/clear2.png';
    }
    
    drawBackground();
    if (showPowerupText) {
        ctx.drawImage(powerup_text, powerup_text_x, powerup_text_y, powerup_text_width, powerup_text_height); 
    }
    drawObsts();
    if( powerupSpawned ) {
        drawPowerup();
    }
    drawHero();
    collision( obst1_x, obst1_y, obst1_width, obst1_height, 3, false);
    collision( obst2_x, obst2_y, obst2_width, obst2_height, 3, false);
    collision( powerup_x, powerup_y, powerup_width, powerup_height, -2, true);
	if(playing) {
		setTimeout(gameLoop, fps);
	} else {
        gameFinished();
	}
}

$(document).ready( function() {
	update_scores();
    $(this).keydown(handleKeydown);
    $(this).keyup(handleKeyup);
    $('#reload').click(function(){
        window.location.reload();
    });
});
