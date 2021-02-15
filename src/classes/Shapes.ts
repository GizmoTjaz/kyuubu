// Classes
import Vec3 from "./Vec3";

// Types
import { ShapeOptions, ShapeConstructorInstructions } from "../index.d";

export class Primitive {

    size: Vec3;
    position: Vec3;
    orientation: Vec3;

    vertices: Vec3[] = [];
    faces: Array<number[]> = [];
    edges: Array<number[]> = [];

    readonly renderQueueIndex: number;
    readonly options: ShapeOptions = {
        drawVertices: false,
        drawEdges: false,
        drawFaces: true,
        anchorObject: null
    };

    constructor (instructions: ShapeConstructorInstructions) {

        this.size = instructions.size;
        this.position = instructions.position || new Vec3(0, 0, 0);
        this.orientation = instructions.orientation || new Vec3(0, 0, 0);

        Object.assign(this.options, instructions.options);

        // Push object to render queue
        this.renderQueueIndex = window.KyuubuRenderer.pushToQueue(this);
    }

    /**
     * Updates object size
     */
    setSize (size: Vec3) {
        this.size = size;
        window.KyuubuRenderer.updateObject(this);
    }

    /**
     * Updates object position
     */
    setPosition (position: Vec3) {
        this.position = position;
        window.KyuubuRenderer.updateObject(this);
    }

    /**
     * Updates object orientation
     */
    setOrientation (orientation: Vec3) {
        this.orientation = orientation;
        window.KyuubuRenderer.updateObject(this);
    }

    /**
     * Destroys object from renderer
     */
    destroy () {
        window.KyuubuRenderer.destroyObject(this);
    }

}

export class Cube extends Primitive {

    constructor (instructions: ShapeConstructorInstructions) {

        super(instructions);

        const { position, size } = this;

        this.vertices = [
            new Vec3(position.x - (size.x / 2), position.y - (size.y / 2), position.z - (size.z / 2)), // F Top Left 0
            new Vec3(position.x + (size.x / 2), position.y - (size.y / 2), position.z - (size.z / 2)), // F Top Right 1
            new Vec3(position.x + (size.x / 2), position.y + (size.y / 2), position.z - (size.z / 2)), // F Bottom Right 3
            new Vec3(position.x - (size.x / 2), position.y + (size.y / 2), position.z - (size.z / 2)), // F Bottom Left 2
            new Vec3(position.x - (size.x / 2), position.y - (size.y / 2), position.z + (size.z / 2)), // B Top Left 4
            new Vec3(position.x + (size.x / 2), position.y - (size.y / 2), position.z + (size.z / 2)), // B Top Right 5
            new Vec3(position.x + (size.x / 2), position.y + (size.y / 2), position.z + (size.z / 2)),  // B Bottom Right 7
            new Vec3(position.x - (size.x / 2), position.y + (size.y / 2), position.z + (size.z / 2)), // B Bottom Left 6
        ];

        this.faces = [
            [0, 1, 2, 3],
            [0, 4, 5, 1],
            [1, 5, 6, 2],
            [3, 2, 6, 7],
            [0, 3, 7, 4],
            [4, 7, 6, 5],
        ];

        this.edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [0, 4], [5, 1], [2, 6], [3, 7],
            [4, 7], [7, 6], [6, 5], [5, 4]
        ];

    }

}