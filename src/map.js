//var size = prompt('size', '100x100').split('x');

size = [25, 25];

var draw = SVG('canvas').size(size[0] * 32, size[1] * 32);

var i, a, mousedown, selecting = false, block = 0;

blocks = {
    0: 'lime',
    1: 'green',
    2: 'brown',
    3: 'whitesmoke',
    4: 'black',
    5: '#1C1C1C',
    6: 'white',
    7: 'coral',
    8: 'aqua',
    9: 'red',
    10: 'red'
}

var map = [];

for (i = 0; i < size[0]; i++) {
    var rw = [];
    for (a = 0; a < size[1]; a++) {
        rw.push(0);
        (function () {
            var ab = a;
            var ib = i;
            var rect = draw.rect(32, 32).move(ib * 32, ab * 32).fill('#DDD');

            function select() {
                rect.attr({'z-index': 9999});
                rect.animate(200, '>', 0).fill(blocks[block]).size(42, 42).move(ib * 32 - 5, ab * 32 - 5).after(function () {
                    rect.animate(200, '>', 0).size(32, 32).move(ib * 32, ab * 32).after(function () {
                        rect.attr({'z-index': size[0] * ib + ab});
                    })
                });
                window.rct = rect;
                map[ib][ab] = block;
            }

            rect.on('mouseover', function () {
                if (selecting) {
                    select();
                } else {
                    rect.animate(200, '>', 0).opacity(0.5);
                }
            });
            rect.on('mousedown', function () {
                selecting = true;
                window.onmouseup = function () {
                    window.onmouseup = null;
                    selecting = false;
                };
                select();
            })
            rect.on('mouseout', function () {
                rect.animate(200, '>', 0).opacity(1);
            });
        })();
    }
    map.push(rw);
}