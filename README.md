# CSCI445 JavaScript Game #
## Team: JavaScript Game 7 ##
### By Alex Pollock, Eric Klatzco, & Grant Marsh ###

#### Why We Deserve 100 Points ####

	Our simple, yet exciting and addictive game was made with HTML5, CSS3, and Javascript. We used a visually appealing color layout, a straightforward page layout, and provided all necessary information to the player. Our efforts to make our game more dynamic and engaging went above and beyond the base requirements. Such efforts were: animating our hero sprite, adding in doulbe jumping, and continuously updating the live score. We thoroughly thought out our game experience from reading the directions, to easily giving the player the option to easily play again--and everything in between. Moreover our Mines Learning Tools theme, while it meant incorporating custom graphics into our game, was an additional effort that makes the game more entertaining and addictive to its target demographic.  

#### CSS3 Features Used ####

	1. We used an image of the Mines' relreuleaux as a boarder aroung the game window. This extends our theme outside of the game itself and into the site, making a seamless gaming experience. 

	2. We used text shadowing on the title with the site's color theme to draw attention to our game's title. 

	3. We also used CSS transitions to ease in and out the background color change when the player collects the Paone Power Up. This transition is controlled by the CSS in the #main id, but the event is triggered by a collision event in the JavaScript.

## JavaScript Libraries ##

	We used jQuery and the HighScoreAPI in conjunction with basic JS.

## JavaScript Difficulties ##

	We had difficulty detecting a collision with an obstacle. Since obstacles and character images are drawn from point (0,0), we had to identify the size of the boxes and the size of the sprite and determine what would constitute as a collision based off of an overlap, range-based calculation. 

	More difficulty arose using the animated sprite, which allowed for us to have a more visually appealing game at the cost of ease of implementation. The sprite was difficult to animate because we had to make the running animation happen at a rate proportional to the game. We also had to figure out how to make the ducking animation fluid with our character, which resulted in having to create more custom sprites rather than just "squishing" the image when the player ducked.

	The final challenge we faced was getting the canvas to draw images at the proper resolution. Thankfully, we found a Stack Overflow question that helped us explicitly set the canvas width, height, and resolution in JavaScript, resulting in images that were not pixilated. Originally we were just using these values that were set in the CSS, which was easier, but resulted in a less aesthetically pleasing look for the game. 
