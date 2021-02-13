/**
 * @typedef ConstructorInstructions
 * @property {Vec3} size
 * @property {Vec3} [position]
 * @property {Vec3} [orientation]
 * @property {ConstructorOptions} [options]
 */

/**
 * @typedef ConstructorOptions
 * @property {Boolean} drawVertices
 * @property {Boolean} drawOutlines
 * @property {Boolean} drawFaces
 * @property {Primitive|Cube|void} anchorObject
 */

// Classes
import Vec3 from "./Vec3";

class Primitive {

    size;
    position;
    orientation;
    renderQueueIndex;
    options = {
        drawVertices: false,
        drawOutlines: false,
        drawFaces: true,
        anchorObject: null
    };

    /**
     * Constructs a Primitive object
     * @param {ConstructorInstructions} constructorInstructions
     */
    constructor ({ size, position = new Vec3(0, 0, 0), orientation = new Vec3(0, 0, 0), options = {} }) {

        this.size = size;
        this.position = position;
        this.orientation = orientation;
        Object.assign(this.options, options);

        this.renderQueueIndex = KyuubuRenderer.pushToQueue(this);
    }

    /**
     * Updates object size
     * @params {Vec3} size
     */
    setSize (newSize) {
        this.size = newSize;
        KyuubuRenderer.updateObject(this);
    }

    /**
     * Updates object position
     * @params {Vec3} position
     */
    setPosition (newPos) {
        this.position = newPos;
        KyuubuRenderer.updateObject(this);
    }

    /**
     * Updates object orientation
     * @params {Vec3} orientation
     */
    setOrientation (newRot) {

        for (const axis in newRot) {
            if (newRot[axis] >= 360) {
                newRot[axis] = 360 % newRot[axis];
            }
        }

        this.orientation = newRot;
        KyuubuRenderer.updateObject(this);
    }

    destroy () {
        KyuubuRenderer.destroyObject(this);
    }

}

class Cube extends Primitive {

    vertices = [];
    edges = [];
    faces = [];

    /**
     * Constructs a Cube object
     * @param {ConstructorInstructions} constructorInstructions
     */
    constructor (constructorInstructions) {

        const { size, position = new Vec3(0, 0, 0) } = constructorInstructions;

        super(constructorInstructions);

        this.vertices = [
            new Vec3(position.x - (size.x / 2), position.y - (size.y / 2), position.z - (size.z / 2)), // F Top Left 0
            new Vec3(position.x + (size.x / 2), position.y - (size.y / 2), position.z - (size.z / 2)), // F Top Right 1
            new Vec3(position.x - (size.x / 2), position.y + (size.y / 2), position.z - (size.z / 2)), // F Bottom Left 2
            new Vec3(position.x + (size.x / 2), position.y + (size.y / 2), position.z - (size.z / 2)), // F Bottom Right 3
            new Vec3(position.x - (size.x / 2), position.y - (size.y / 2), position.z + (size.z / 2)), // B Top Left 4
            new Vec3(position.x + (size.x / 2), position.y - (size.y / 2), position.z + (size.z / 2)), // B Top Right 5
            new Vec3(position.x - (size.x / 2), position.y + (size.y / 2), position.z + (size.z / 2)), // B Bottom Left 6
            new Vec3(position.x + (size.x / 2), position.y + (size.y / 2), position.z + (size.z / 2))  // B Bottom Right 7
        ];

        this.edges = [
            [0, 1], [1, 3], [3, 2], [2, 0],
            [0, 4], [1, 5], [2, 6], [3, 7],
            [4, 5], [5, 7], [7, 6], [6, 4]
        ];

        this.faces = [
            [0, 1, 3, 2], // Front
            [4, 5, 7, 6], // Back
            [4, 0, 2, 6], // Left
            [1, 5, 7, 3], // Right
            [2, 3, 7, 6], // Bottom
            [4, 5, 1, 0], // Top
        ];

        this.faceColors = [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#00ffff",
            "#ff00ff",
        ];

    }

}

export default {
    Primitive,
    Cube
};