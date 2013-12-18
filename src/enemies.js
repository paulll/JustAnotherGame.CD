function Enemy() {
    // main properties

    this.speed; // chunks per second
    this.damageSpeed; // attacks per second
    this.damage;
    this.hp;
    this.cost;

    // special powers
    // TODO: realise special powers

    this.canShoot;
    this.shootDistance;

    this.canFly;

    this.armorA;
    this.armorC;

    // rendering stuff

    this.posX; // chunks,
    this.posY; // not pixels
    this.texture;

    this.element;

    // timing

    var lastShot = 0;
    var lastMove = 0;

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
        this.currentTarget = targets.pop(); // TODO: add sorting algorhytms
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