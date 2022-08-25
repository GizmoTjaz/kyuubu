// Classes
import Vec3 from "./Vec3";

// Types
import { Shape } from "../index.d";

export default class Renderer {

    readonly canvas: HTMLCanvasElement;
    readonly ctx: CanvasRenderingContext2D; // Because CanvasRenderingContext2D can sometimes be null for some fucking reason
    readonly renderQueue: Shape[] = [];

	width: number = 0;
	height: number = 0;

    constructor (canvas: HTMLCanvasElement) {

        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error("Please provide a valid canvas element to the Renderer constructor");
        }

        this.canvas = canvas;

		const _ctx = canvas.getContext("2d");

		if (!_ctx) {
			throw new Error("Failed to get CanvasRenderingContext2D");
		}

        this.ctx = _ctx;

        this.ctx.fillStyle = "#000";
        this.ctx.strokeStyle = "#FFF";
        this.ctx.lineWidth = canvas.width / 100;
        this.ctx.lineCap = "round";

		this.width = canvas.clientWidth;
		this.height = canvas.clientHeight;

        window.KyuubuRenderer = this;

        // Immediately initiliaze rendering
        this.renderFrame();
    }

    renderFrame () {

        const {
            canvas,
            ctx,
            renderQueue
        } = this;

		this.width = canvas.clientWidth;
		this.height = canvas.clientHeight;

        // Clear frame
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const object of renderQueue) {

            const {
                position,
                orientation,
                vertices,
                faces,
                edges,
                options
            } = object;

            const
                rx = orientation.x * Math.PI / 180,
                ry = orientation.y * Math.PI / 180,
                rz = orientation.z * Math.PI / 180;

            object.orientation = new Vec3(0, 0, 0);

            for (const v of vertices) {

                const
                    refPos = options.anchorObject?.position || position,
                    sinX = Math.sin(rx),
                    sinY = Math.sin(ry),
                    sinZ = Math.sin(rz),
                    cosX = Math.cos(rx),
                    cosY = Math.cos(ry),
                    cosZ = Math.cos(rz);

                let dx, dy, dz;

                dx = v.x - refPos.x;
                dy = v.y - refPos.y;
                dz = v.z - refPos.z;
    
                // Z
                v.x = refPos.x + (dx * cosZ - dy * sinZ);
                v.y = refPos.y + (dy * cosZ + dx * sinZ);
                
                dx = v.x - refPos.x;
                dy = v.y - refPos.y;
                dz = v.z - refPos.z;
    
                // X
                v.y = refPos.y + (dy * cosX - dz * sinX);
                v.z = refPos.z + (dz * cosX + dy * sinX);
                
                dx = v.x - refPos.x;
                dy = v.y - refPos.y;
                dz = v.z - refPos.z;
    
                // Y
                v.x = refPos.x + (dx * cosY + dz * sinY);
                v.z = refPos.z + (dz * cosY - dx * sinY);

            }

            if (options.drawFaces) {
                for (const face of faces) {

                    ctx.beginPath();
                    ctx.moveTo(vertices[face[0]].x, vertices[face[0]].y);
    
                    for (const v of face) {
                        ctx.lineTo(vertices[v].x, vertices[v].y);
                    }

                    ctx.fillStyle = "#ff0000";
                    ctx.fill();
                    
                }

            }

            if (options.drawEdges) {

                ctx.fillStyle = "#FFF";

                for (let edge of edges) {
                    ctx.beginPath();
                    ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
                    ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
                    ctx.stroke();
                }
            }

            if (options.drawVertices) {

                ctx.fillStyle = "#FFF";
                
                for (const v of vertices) {
                    ctx.beginPath();
                    ctx.ellipse(v.x, v.y, 5, 5, 0, 0, Math.PI * 2);
                    ctx.stroke();
                }

            }

        }

        requestAnimationFrame(() => this.renderFrame());
    }

    /**
     * Pushes object to render queue
     */
    pushToQueue (object: Shape): number {
        this.renderQueue.push(object);
        return this.renderQueue.length - 1;
    }

    /**
     * Replaces the old version of the object in the render queue to apply new properties
     */
    updateObject (object: Shape) {
        this.renderQueue[object.renderQueueIndex] = object;
    }

    /**
     * Removes object from the render queue, thus destroying it from the canvas
     */
    destroyObject (object: Shape) {
        this.renderQueue.splice(object.renderQueueIndex, 1);
    }

}