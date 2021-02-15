/**
 * Describes a basic three-dimensional vector
 */
export default class Vec3 implements Vec3 {

    x: number;
    y: number;
    z: number;

    constructor (x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

}