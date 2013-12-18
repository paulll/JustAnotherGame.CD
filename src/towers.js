function Tower() {

    // const

    this.damage;
    this.speed; // attacks per second;
    this.hp;
    this.cost;
    this.radius;// chunks

    // rendering stuff

    this.posX;   //
    this.posY;   // in chunks
    this.width;  // not pixels
    this.height; //

    this.texture; // Image

    this.element; // Raphael.Element

    this.bullet; // bool

    // timing

    var lastShot; // milliseconds

    // vars

    this.fireMode; // случайный, ближайший, дальнейший, сильнейший, слабейший, здоровейший, наиболее поврежденный;

    this.currentTarget;      // Enemy
    this.shield = 0;         // int (like HP, but rechargeable)
    this.repairing = false; // boolean

    // specials

    this.armorC = 1;  // damage = armorC*damage     // armorC is < 1
    this.armorA = 0;  // damage = damage - armorA   // but not less then 0
    this.armorEC = 1; // damage = armorEC*damage    // the same for shield
    this.armorEA = 0; // damage = damage - armor AC // for shield too

    // methods

    this.place = function () {
        this.element = draw.image(this.texture, this.posX * 32, this.posY * 32, this.width * 32, this.height * 32);
        entities.towers.push(this);
        entities.towersMap[this.posX][this.posY] = this;
    };
    this.attack = function (time) {
        lastShot = lastShot + time;
        if (lastShot >= 1000 / this.speed) {
            lastShot = lastShot - 1000 / this.speed;
            this.fire();
        }
    }
    this.fire = function () {
        if (!this.bullet) {
            //
        }
    }
    this.target = function () {
        var targets = [];
        if (!this.range) {
            this.range = range(this.pos, this.radius);
        }
        entities.enemies.forEach(function (enemy) {
            if (this.range.indexOf([enemy.posX, enemy.posY]) !== -1) {
                targets.push(enemy);
            }
        });
        this.currentTarget = targets.pop(); // TODO: add sorting algorhytms
    }
    this.hurt = function (howMuch) {
        if (this.shield > howMuch) {
            this.shield = this.shield - (howMuch - this.armorEA) * this.armorEC;
        } else {
            howMuch = howMuch - (this.shield + this.armorEA) / this.armorEC;
            this.hp = this.hp - (howMuch - this.armorA) * this.armorC;
            if (this.hp < 0) { // yes, if you have 0 hp, you still alive
                this.explode();
                this.remove();
            }
        }
    }
    this.explode = function () {
        // animation;
    }
    this.remove = function () {
        this.element.remove();
        entities.towers.splice(entities.towers.indexOf(this), 1);
        entities.towersMap[this.posX][this.posY] = undefined;
    }


}

var towersController = {
    target: function () {
        entities.towers.forEach(function (tower) {
            tower.target();
        });
    },
    attack: function (offset) {
        entities.towers.forEach(function (tower) {
            tower.attack(offset);
        });
    }
}