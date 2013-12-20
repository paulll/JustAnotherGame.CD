function Enemy() {
    // main properties

    this.speed = 1; // chunks per second
    this.damageSpeed = 0.5; // attacks per second
    this.damage = 1;
    this.hp = 4;
    this.cost = 1;

    // special powers
    // TODO: realise special powers

    this.canShoot;
    this.shootDistance;

    this.canFly;

    this.armorA = 0;
    this.armorC = 1;

    // rendering stuff

    this.posX = 0 // chunks,
    this.posY = 0// not pixels
    this.texture = 'http://x.cloudx.cx/temp/textures/mountain.png';

    this.element;

    // timing

    var lastShot = 0;
    var lastMove = 0;

    // AI

    this.currentTarget = false;

    // path finding

    var lastWay = [];

    this.move = function (offset) {
        lastMove = lastMove + offset;
        if (lastMove >= 1000 / this.speed) {
            lastMove = lastMove - 1000 / this.speed;
            this.go();
        }
    }
    this.go = function () {
        lastWay = way([this.posX, this.posY], lastWay, this.currentTarget);

        var pos = lastWay.shift();

        this.posX = pos[0];
        this.posY = pos[1];

        // animate
    }
    this.attack = function (offset) {
        lastShot = lastShot + offset;
        if (lastShot >= 1000 / this.damageSpeed) {
            lastShot = lastShot - 1000 / this.damageSpeed;
            this.fire();
        }
    }
    this.fire = function () {
        if (Math.abs(this.currentTarget.posX - this.posX) === 1 || Math.abs(this.currentTarget.posY - this.posY) === 1) {
            this.currentTarget.hurt(this.damage);
            // animation
        }
    }
    this.target = function () {
        var targets = towersInRange([this.posX, this.posY]);
        this.currentTarget = (this.currentTarget = targets.pop()) ? this.currentTarget : false; // TODO: add sorting algorhytms
    }
    this.hurt = function (howMuch) {
        this.hp = this.hp - (howMuch - this.armorA) * this.armorC;
        if (this.hp <= 0) {
            this.explode();
            this.remove();
        }
    }
    this.remove = function () {
        this.element.remove();
        entities.enemies.splice(entities.enemies.indexOf(this), 1);
        game.money = game.money + this.cost;
    }
    this.explode = function () {
        // animation
    }
    this.spawn = function () {
        this.element = draw.image(this.texture, this.posX * 32, this.posY * 32, 32, 32);
    }
}

var enemiesController = {
    move: function (offset) {
        entities.enemies.forEach(function (enemy) {
            enemy.move(offset);
        });
    },
    attack: function (offset) {
        entities.enemies.forEach(function (enemy) {
            enemy.attack(offset);
        });
    }
}