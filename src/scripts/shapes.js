// Classes
import { Vec3 } from "./classes.js";
import Renderer from "./renderer.js";

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

    constructor ({ size, position = new Vec3(0, 0, 0), orientation = new Vec3(0, 0, 0), options = {} }) {

        this.size = size;
        this.position = position;
        this.orientation = orientation;
        Object.assign(this.options, options);
        this.renderQueueIndex = Renderer.pushToQueue(this);

    }

    set setOrientation (newRot) {

        for (const axis in newRot) {
            if (newRot[axis] >= 360) {
                newRot[axis] = 360 % newRot[axis];
            }
        }

        this.orientation = newRot;
        Renderer.updateObject(this.renderQueueIndex, this);
    }

    destroy () {
        Renderer.destroyObject(this.renderQueueIndex);
    }

}

class Cube extends Primitive {

    vertices = [];
    edges = [];
    faces = [];

    constructor (constructorInstructions) {

        const { size, position = new Vec3(0, 0, 0), orientation = new Vec3(0, 0, 0), options = {} } = constructorInstructions;

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

export {
    Cube
};