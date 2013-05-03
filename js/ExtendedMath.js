/**
 * JS implementation of PHP's rand()
 *
 * Note that we do not want to extend core components (Math) because bad stuff may and will happen in the future
 * otherwise. So if we want to use funky stuff we just have to use our ExtendedMath instead of the build in Math.
 * Everything available to Math is available in ExtendedMath so it is a drop in replacement.
 *
 * @param int min The minimum number
 * @param int max The maximum number
 *
 * @return int The "random" number in the range
 */
var ExtendedMath = Object.create(Math);
ExtendedMath.rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
