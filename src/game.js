// loading map

var map = JSON.parse(localStorage.getItem('map'));

// loading path finder

var pathGrid = new PF.Grid(map[0].length, map.length, map);
var finder = new PF.BiBestFirstFinder({
    allowDiagonal: false,
    dontCrossCorners: true
});

// preparing canvas

var c = document.getElementById("map_merge");
var ctx = c.getContext("2d");
var draw = Raphael(0, 0, map[0].length * 32, map.length * 32);

// stupid code
Object.prototype.forEach = Array.prototype.forEach;


// init variables

var textures = {}; // Image objects
var computed = 7;  // To prevent lags in game logic loop

// loading textures

function loadTextures(callback) {
    var loaded = 0;

    function onload() {
        if (++loaded === 2) {
            callback();
        }
    }

    textures[0] = new Image();
    textures[0].src = './textures/ground.png';
    textures[0].onload = onload;

    textures[1] = new Image();
    textures[1].src = './textures/mountain.png';
    textures[1].onload = onload;
}

// pre-rendering map

function getMapBackground(map, callback) {
    c.width = map[0].length * 32;
    c.height = map.length * 32;
    map.forEach(function (line, i) {
        line.forEach(function (node, ii) {
            ctx.drawImage(textures[node], ii * 32, i * 32, 32, 32);
        });
    });
    callback(c.toDataURL("image/png"));
}

// rendering map

function drawMap(bgimg) {
    var bg = draw.image(bgimg, 0, 0, map[0].length * 32, map.length * 32);
}

// drag & drop map

function dragndrop(el) {
    el.onmousedown = function (event) {
        var elpos = [el.style.left.split('px')[0] * 1, el.style.top.split('px')[0] * 1]
        var initial = [event.clientX || event.pageX, event.clientY || event.pageY];
        var offset = [initial[0] - elpos[0], initial[1] - elpos[1]];
        var active = false;
        el.onmousemove = function (e) {
            var coords = [e.clientX || e.pageX, e.clientY || e.pageY];
            if (!active && (Math.abs(coords[0] - initial[0]) + Math.abs(coords[1] - initial[1])) > 5) {
                active = true;
            }
            if (active) {
                el.style.top = coords[1] - offset[1] + 'px';
                el.style.left = coords[0] - offset[0] + 'px';
            }
        };
        el.onmouseup = function () {
            el.onmousemove = null;
        }
    }
}

// logic

var game = {
    money: 0,
    level: 0,
    xp: 0,
    towers: 0,
    enemies: 0
}

var entities = {
    towers: [],
    enemies: [],
    towersMap: matrix(map[0].length, map.length),
    enemiesMap: matrix(map[0].length, map.length)
}


// initializing background

loadTextures(function () {
    getMapBackground(map, function (background) {
        document.body.removeChild(c);
        drawMap(background);
        dragndrop(draw.canvas);
    });
});

// creating logic loop

function logic_loop(offset) {

    // to prevent lags

    if (++computed !== 7) {
        return false;
    } else {
        computed = 0;
    }

    // manage enemies

    (function () {
        enemiesController.move(offset);
        enemiesController.recalcRanges();
        enemiesController.target();
        enemiesController.attack(offset);
    })();

    // manage towers

    (function () {
        towersController.target();
        towersController.attack(offset);
    })();

    return true;
}

// start game logic loop

logic_loop();