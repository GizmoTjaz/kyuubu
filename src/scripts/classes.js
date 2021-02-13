/**
 * Describes a 3D vector
 */
class Vec3 {

    x;
    y;
    z;

    /**
     * @param {Number} x X coordinate
     * @param {Number} y Y coordinate
     * @param {Number} z Z coordinate
     */
    constructor (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

}

export {
    Vec3
};