function Enemy() {
    // main properties

    this.speed;
    this.damageSpeeed;
    this.damage;
    this.hp;

    // special powers

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

    this.move = function (offset) {
        //
    }
    this.attack = function (offset) {
        //
    }
    this.fire = function () {
        //
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
    }
    this.explode = function () {
        // animation
    }
    this.place = function () {
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