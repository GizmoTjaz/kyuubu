// Classes
import { Cube, Primitive } from "./classes/Shapes";

declare global {
    interface Window {
        Kyuubu,
        KyuubuRenderer
    }
}

export interface Vec3 {
    x: number;
    y: number;
    z: number;
}

export declare namespace Kyuubu {
    
    const Vec3: Vec3;

    export interface Renderer {

        readonly canvas: HTMLCanvasElement;
        readonly ctx: any;
        readonly renderQueue: Shape[];

        renderFrame: () => void;
        pushToQueue: (object: Shape) => number;
        updateObject: (object: Shape) => void;
        destroyObject: (object: Shape) => void;

    }

    export interface Shapes {
        Primitive,
        Cube
    }

}

export type Shape = Primitive | Cube;

export interface ShapeOptions {
    drawVertices?: boolean;
    drawEdges?: boolean;
    drawFaces?: boolean;
    anchorObject?: Shape | null
}

export interface ShapeConstructorInstructions {
    size: Vec3;
    position?: Vec3;
    orientation?: Vec3;
    options?: ShapeOptions;
}