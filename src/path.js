function way(start, last, target) {

    if (target) {
        if ([target.posX, target.posY] === last) {
            return start;
        }
        if (last[last.length - 1] === [target.posX, target.posY]) {
            return last;
        } else {
            return finder.findPath(start[0], start[1], target.posX, target.posY, pathGrid);
        }
    }

    var new_target = [Math.floor(map.width / 2), Math.floor(map.height / 2)];
    var old_target = last[last.length - 1];

    if (old_target && old_target[0] * 1 == new_target[0] * 1 && old_target[1] * 1 == new_target[1] * 1) {
        console.log('so returning old way');
        return last;
    } else {
        return finder.findPath(start[0], start[1], new_target[0], new_target[1], pathGrid);
    }
}