/*
        ENEMY 
*/

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.xEnemy = [-150, 505];
    this.yEnemy = [60, 140, 220];
    this.speed = [150, 300];

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.reset();

};


/*
    Reset function
*/

Enemy.prototype.reset = function(){

    var start = this.xEnemy[0];

    this.x = start;
    this.y = this.getRandomY();
    this.speed = this.getRandomSpeed();

};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
    var max = this.x; 
	
    this.x += this.speed * dt;

    //if (this.x >= max){
		//this.reset();
    //}
	
	
	if(this.x >= 655) { 
		this.x = -150;
	}

    checkCollision(this);
};

/*
Draw the enemy on the screen, required method for game
*/

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
    Create Random Y values
*/

Enemy.prototype.getRandomY = function(){

    return this.yEnemy[Math.floor(Math.random() * this.yEnemy.length)];
};


/*
    Create Random Speed Values
*/

Enemy.prototype.getRandomSpeed = function(){
    
    var minSpeed = this.speed[0];
    var maxSpeed = this.speed[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed) * 2);
};


/*
        PLAYER
*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){

    this.x = [-2, 505];
    this.y = [-20, 380];
    //this.speed = 
    this.sprite = 'images/char-boy.png';
    this.reset();

};


Player.prototype.update = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   displayGameInfo(score, level, lifes);
};


/*
    Draw the player on the screen
*/

Player.prototype.render = function(){

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
    Reset player's position
*/

Player.prototype.reset = function(){

    this.x = 200;
    this.y = 380;

};


/*
    Declare how many lifes has a player
*/

Player.prototype.life = function(playerLifes){ //lifes -> playerLifes

        if( playerLifes == 0 ){
            //console.log("HERE");
            player.x = 500;
            player.y = 600;
			
            score = 0;
            level = 0;
			
			bootbox.prompt("GAME OVER - TO CONTINUE PRESS 'y' ", function(result) {  

				if (result === null) {  //cancel => redirect to udacity home page                              
                    window.location.href = 'https://www.udacity.com/';	
                        			}
				else if(result === "y") { 
					console.log('continue');
					
					lifes = 5; 
					 
					player.reset();
					//enemy.reset();
				}
				else { //cancel => redirect to udacity home page 
				    window.location.href = 'https://www.udacity.com/';
				}
				
			});

         }
         else {
            player.x = 600;//202.5;
            player.y = 400;//383;
         }

};



/*
    handleInput() method
*/
Player.prototype.handleInput = function(keyPress){
    if(keyPress == 'left'){
        this.x -= (this.x - 101 < this.x[0]) ? 0 : 101;
    }
    if(keyPress == 'up'){
        this.y -= (this.y - 80 < this.y[0]) ? 0 : 80;
    }
    if(keyPress == 'right'){
        this.x += (this.x + 101 > this.x[1]) ? 0 : 101;
    }
    if(keyPress == 'down'){
        this.y += (this.y + 80 > this.y[1]) ? 0 : 80;
    }

    console.log('keyPress is : ' + keyPress);
};


var checkCollision = function(anEnemy){

    if(
        player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11){

      
        console.log('We have Collision');
        
        lifes -= 1;
        console.log('lifes : ' + lifes);
        player.life(lifes);

        
    }

    if (player.y <= 10 && player.x <= 505){
		
       // || (player.y <= 0 && player.x == 100)
       // || (player.y <= 0 && player.x == 200)
       // || (player.y <= 0 && player.x == 300)
       // || (player.y <= 0 && player.x == 400)
       // ){

        player.reset();
		
        console.log('Congrats');

       // ctx.fillStyle = 'white';
       // ctx.fillRect(0, 0, 505, 171);
        score += 1;
        //level += 1;
        if(score == 5){
            score = 0;
			console.log("INCREASE!");
			console.log(allEnemies);
			increaseEnemies(); // increase enemies only when level is UP 
            level += 1;
        }
        console.log('Score: ' + score + ' Level : ' + level);
        
    }
 
    if (player.y > 383){
        player.y = 383;
    }
    if (player.x > 402.5){
        player.x = 402.5;
    }
    if (player.x < 2.5){
        player.x = 2.5;
    }
};


/*
    Display player's score
*/
var displayGameInfo = function(aScore, aLevel, alifes) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score and level to div element created
    scoreLevelDiv.innerHTML = '<div class="lives">Lifes: ' + lifes + '</div>   <div class="score">Score:  ' + aScore + '</div>   <div class="level">Level: ' + aLevel + '</div>';
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};


/*
    Enemies increasing based on score
*/

var increaseEnemies = function(){
        //allEnemies.length = 0;
        for ( var i = 0; i <= Math.floor(Math.random()*2 + 1); i++){ 

            var enemy = new Enemy();
            allEnemies.push(enemy);
			
			
        }
		//console.log(allEnemies);
};

bootbox.confirm("Are you ready to start?", function(result) {
	console.log(result);
	if(result === true) { //an pathse ok
		console.log('Welcome')
	}
	else { //cancel => redirect to udacity home page 
		window.location.href = 'https://www.udacity.com/';
	}
});

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();
var allEnemies = [];
var enemy = new Enemy();
allEnemies.push(enemy);

var lifes = 5;
var score = 0;
var level = 0;
var scoreLevelDiv = document.createElement('div');
scoreLevelDiv.className = "gamescore";
    
var numEnemies = 0;
var answer2;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);

});
