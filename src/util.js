function blocks(pos, size) {
    "use strict";
    var i, a, arr = [];
    for (i = 0; i < size[0]; i++) {
        for (a = 0; a < size[1]; a++) {
            arr.push({value: map[pos[0] + i][pos[1] + a], pos: [pos[0] + i, pos[1] + a]});
        }
    }
    return arr;
}
function range(pos, radius) {
    var chunk, round = [];
    chunk = blocks([(pos[0] >= radius) ? pos[0] - radius : 0, (pos[1] >= radius) ? pos[1] - radius : 0], [radius * 2 + 1, radius * 2 + 1]);
    chunk.forEach(function (e) {
        a = e.pos[0] - pos[0]
        b = e.pos[1] - pos[1]
        if (a * a + b * b <= radius * radius) {
            round.push(e);
        }
    });
    return round;
}
function cquadrat(pos, radius) {
    return blocks([(pos[0] >= radius) ? pos[0] - radius : 0, (pos[1] >= radius) ? pos[1] - radius : 0], [radius * 2 + 1, radius * 2 + 1]);
}
function towersInRange(pos) {
    var chunks = cquadrat(pos, 5);
    var towers = [];
    chunks.forEach(function (v) {
        var tower
        if (tower = entities.towersMap[v.pos[0][v.pos[1]]]) {
            towers.push(tower);
        }
    });
    return towers;
}
function matrix(w, h) {
    var matrix = [];
    for (var a = 0; a < w; a++) {
        matrix.push(new Array(h));
    }
    return matrix;
}