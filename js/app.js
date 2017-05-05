// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    Speeds = [400, 450, 500];
    this.speed = Speeds[(Math.floor(Math.random() * Speeds.length))] - 200;
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = 72 * Math.floor((Math.random() * 3) + 1);
};
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 530) {
        this.reset();
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player1 = function() {
    this.sprite = "images/char-boy.png";
    this.reset();
};
player1.prototype.reset = function() {
    this.x = 202;
    this.y = 390;
};
player1.prototype.update = function() {
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
player1.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
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
        alert("restart as you run out from the border.");
    }
    if (this.y === 0) {
        this.reset();
        alert("you win");
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy());
}
var player = new player1();


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
});
