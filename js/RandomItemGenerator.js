/**
 * This class provides a pseudo random item generator based on a list of chances
 *
 * The list of chances should be provided in the following format:
 *
 * {
 *     a: 90
 *     b: 3
 *     c: 7
 * }
 *
 * This would mean there is a 90% chance of returning a, 3% chance of returning b
 * and 7% chance of returning c.
 *
 * Note that the probability numbers don't need to sum up to 100, e.g.:
 *
 * {
 *     a: 15
 *     b: 5
 *     c: 9
 * }
 */
function RandomItemGenerator() {
    this.getRandomItem = function(chances) {
        var pool = this.generateRandomPool(chances);

        return pool[ExtendedMath.rand(0, pool.length)];
    };

    this.generateRandomPool = function(chances) {
        var pool = [];
        for (var key in chances) {
            if (!chances.hasOwnProperty(key)) {
                continue;
            }

            for (var j = 0; j < chances[key]; j++) {
                pool.push(key);
            }
        }

        return pool;
    };
}
