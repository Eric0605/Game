## Game
### How to run the application
1. download the file of frontend-nanodegree-arcade-game-master
2. open index.html in your favorite browser.
3. play the game
### How to play the game
1. open index.html in your favorite browser.
2. Use arrow keys to move the player up, down, left or right
3. do not touch the border unless it is the upper border.
4. do not touch the enemy or you loss.
5. reach the upper border to win the game.
### coding-enemy information
    var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    Speeds = [400, 450, 500];
    this.speed = Speeds[(Math.floor(Math.random() * Speeds.length))] - 200;
    this.reset();
    };
It is the line of code that introduce the basic information about the enemy bug. Its image, speed and asks for it stating position function  **(reset)**.
### coding-enemy reset
	Enemy.prototype.reset = function(){
  	this.x = -100;
  	this.y = 72 * Math.floor((Math.random() * 3) +1);
	}
This line of code provide the stating position of the bug. the y value has a +1 because it cannot start aat the begining line.
### coding-enemy update
	Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > 530) {
      this.reset();
    }
	};
This line make down every movement of the bug and reset if the bug goes over the canvas.
### coding-enemy render
	Enemy.prototype.render = function() {
   	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};
A given code that draw the bug.
### coding- player information
	var player1 = function() {
  	this.sprite = "images/char-boy.png";
  	this.reset();
	};
The basic information about the player. His image and starting position.
### coding- player starting position
	player1.prototype.reset = function(){
	  this.x = 202;
	  this.y = 390;
	}
The starting position of the player.
### coding- player vs bug
	player1.prototype.update = function(){
	  var position = this;
    allEnemies.forEach(function(enemy) {
        var xIntersect = Math.abs(position.x - enemy.x);
        var yIntersect = Math.abs(position.y - enemy.y);
        if (xIntersect < 60 && yIntersect < 60) {
            position.reset();
            alert("you loss");
        }
    });
	};
Every movement check for the lossing condition of the game. If bug and player meet together, an alert will appear.
### coding-player render
	player1.prototype.render = function(){
	  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
Draw the player.
### coding- player movement
	player1.prototype.handleInput = function(keymove) {
	switch (keymove) {
        case 'up':
            this.y = this.y - 78;
            break;
        case 'down':
            this.y = this.y + 78;
            break;
        case 'right':
            this.x = this.x + 100;
            break;
        case 'left':
            this.x = this.x - 100;
            break;
	}
  	if (this.x < 0 || this.x === 502 || this.y > 390) {
    this.reset();
    alert("restart as you run out from the border.")
  	}
  	if (this.y === 0) {
    this.reset();
    alert("you win");
  	}
	}
This makes the player move by using the up, bottom, left and right buttom. It also check for the winning condion and border.
### coding- draw on the screen.
	var allEnemies = [];
	for (var i = 0; i < 4; i++) {
	  allEnemies.push(new Enemy());
	}
	var player = new player1;
This code put the value for engine.js to draw the bugs and player on the screen.
### coding
	document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
	});
Given code.
### How to play
Move the player to the top without crossing the bug.
