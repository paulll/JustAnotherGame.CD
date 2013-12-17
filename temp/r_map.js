var size = prompt('size', '25x25').split('x');

var draw = Raphael(0, 0, size[0] * 32 + 10, size[1] * 32 + 10);

var i, a, mousedown, selecting = false, block = 0, map = [];

blocks = {
    0: 'orange',
    1: 'red',
    2: 'brown',
    3: '#F0F0F0',
    4: 'black',
    5: '#1C1C1C',
    6: 'white',
    7: 'coral',
    8: 'aqua',
    9: 'red',
    10: 'black'
}

document.getElementById('block').onkeypress = function (e) {
    if (!/^[0-9:]*$/g.test(String.fromCharCode(e.which))) {
        return false;
    }
}
document.getElementById('block').onkeyup = function () {
    block = document.getElementById('block').innerText.split(':').shift() * 1;
}

var set = draw.set();

for (i = 0; i < size[0]; i++) {
    var rw = [];
    for (a = 0; a < size[1]; a++) {
        rw.push(0);
        (function () {
            var ab = a;
            var ib = i;

            var rect = draw.rect(ib * 32 + 2, ab * 32 + 2, 32, 32);

            var highlighted = false;

            rect.attr({
                'width': 32,
                'height': 32,
                'stroke': '#DDD',
                'stroke-width': 1,
                'fill': blocks[0],
                'opacity': 0.8
            });

            function highlight() {
                rect.attr({
                    'opacity': 1
                });
                highlighted = true;
            }

            function select() {
                rect.toFront();
                rect.animate({
                    'width': 36,
                    'height': 36,
                    'x': ib * 32,
                    'y': ab * 32,
                    'opacity': 1,
                    'fill': blocks[block]
                }, 500, 'elastic', function () {
                    rect.animate({
                        'width': 32,
                        'height': 32,
                        'x': ib * 32 + 2,
                        'y': ab * 32 + 2,
                        'opacity': 0.8
                    }, 'elastic', 300);
                });
                map[ab][ib] = block;
                localStorage.setItem('map', JSON.stringify(map));
            }

            function mousein() {
                if (selecting) {
                    select();
                } else {
                    highlight();
                }

            }

            function mouseout() {
                if (highlighted) {
                    rect.attr({
                        'opacity': 0.8
                    });
                    highlighted = false;
                }
            }

            function mousedown() {
                selecting = true;
                window.onmouseup = function () {
                    window.onmouseup = null;
                    selecting = false;
                };
                select();
            };

            rect.hover(mousein, mouseout);
            rect.mousedown(mousedown);
        })();
    }
    map.push(rw);
}