animate = {
    enemyMove: function (enemy, target, speed) {
        enemy.element.animate({
            x: target[0] * 32,
            y: target[1] * 32
        }, speed, 'linear');
    },
    enemyAttack: function (enemy, target, speed) {
        enemy.element.animate({
            x: target[0] * 32,
            y: target[1] * 32
        }, speed / 3, 'linear', function () {
            enemy.element.animate({
                x: enemy.posX,
                y: enemy.posY
            }, speed / 3, 'linear');
        });
    },
    towerTarget: function (tower, target, speed) {
        var angle = Math.atan2(tower.posY - target.posY, tower.posX - target.posY) / Math.PI * 180;
        angle = (angle < 0) ? angle + 360 : angle;   // Без этого диапазон от 0...180 и -1...-180
        tower.element.animate({
            transform: 'r' + angle
        }, speed, 'linear');
    },
    towerAttackLaser: function (tower, target, speed) {
        var line = paper.path("M" + tower.posX + " " + tower.posY + "L" + target.posX + " " + target.posY);

        line.attr({
            'stroke-color': '#59D0FF'
        });

        line.animate({
            'stroke-opacity': 0
        }, speed, 'linear', function () {
            line.remove();
        });
    },
    towerAttack: function (tower, target, speed) {
        // sprite animation
    },
    explode: function (target) {
        // sprite animation
    }
}