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

    this.posX;
    this.posY;
    this.texture;

    this.element;

    this.move = function () {

    }

    this.target = function () {

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
    this.place = function () {
        this.element = draw.image(this.texture, this.posX, this.posY, 32, 32);
    }
}

var enemiesController = {
    move: function (offset) {

    },
    attack: function (offset) {

    },
    recalcRanges: function () {

    },
    target: function () {

    }
}