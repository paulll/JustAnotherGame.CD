findEnemies = {

}
function way(start, last) {
    var target;
    if (target = towersInRange(start)) {
        if (last[last.length - 1] === target[target.length - 1].pos) {
            return last;
        } else {
            return finder.findPath(start[0], start[1], target[target.length - 1].pos[0], target[target.length - 1].pos[1]);
        }
    }
    var first_target = [Math.floor(map[0].length / 2), Math.floor(map.length / 2)];
    if (last[last.length - 1] == first_target) {
        return last;
    }
    return finder.findPath(start[0], start[1], Math.floor(map[0].length / 2), Math.floor(map.length / 2));
}
