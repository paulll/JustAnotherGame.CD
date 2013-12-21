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

    var shotTimeout;
    var moveTimeout;

    // AI

    this.currentTarget = false;

    // path finding

    this.lastWay = [];

    this.go = function () {

        if (this.currentTarget && (Math.abs(this.currentTarget.posX - this.posX) === 1 || Math.abs(this.currentTarget.posY - this.posY) === 1)) {
            moveTimeout = setTimeout(this.go, 1000 / this.speed);
            return false;
        }

        this.lastWay = way([this.posX, this.posY], this.lastWay, this.currentTarget);

        var pos = lastWay.shift();

        console.log('i\'m', pos);

        this.posX = pos[0];
        this.posY = pos[1];

        var self = this;

        this.element.animate({
            x: pos[0] * 32,
            y: pos[1] * 32
        }, 1000 / this.speed, 'linear', function () {
            self.go();
        });
    }
    this.fire = function () {
        if (this.currentTarget) {
            if (Math.abs(this.currentTarget.posX - this.posX) === 1 || Math.abs(this.currentTarget.posY - this.posY) === 1) {
                this.currentTarget.hurt(this.damage);
                // animation
            }
        }
        setTimeout(this.fire, this.damageSpeed);
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