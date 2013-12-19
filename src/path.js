findEnemies = {

}
function way(start, last, target) {
    if (target) {
        if ([target] === last) {
            return start;
        }
        if (last[last.length - 1] === [target[target.length - 1].posX, target[target.length - 1].posY]) {
            return last;
        } else {
            return finder.findPath(start[0], start[1], target[target.length - 1].pos[0], target[target.length - 1].pos[1]);
        }
    }
    var first_target = [Math.floor(map.width / 2), Math.floor(map.height / 2)];
    if (last[last.length - 1] == first_target) {
        return last;
    }
    return finder.findPath(start[0], start[1], Math.floor(map.width / 2), Math.floor(map.height / 2));
}
