// Classes
import Vec3 from "./Vec3";

export default class Renderer {

    canvas = null;
    ctx = null;
    renderQueue = [];

    constructor (canvasElement) {

        if (!(canvasElement instanceof HTMLCanvasElement)) throw Error("Provide a valid canvas element");

        this.canvas = canvasElement;
        this.ctx = canvasElement.getContext("2d");

        this.ctx.fillStyle = "#000";
        this.ctx.strokeStyle = "#FFF";
        this.ctx.lineWidth = canvas.width / 100;
        this.ctx.lineCap = "round";

        window.KyuubuRenderer = this;
        this.renderFrame();
    }

    renderFrame () {

        const { ctx, canvas, renderQueue } = window.KyuubuRenderer;

        ctx.fillStyle = "#000";
    
        // Clear frame
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        for (let obj of renderQueue) {
    
            const {
                size,
                position,
                orientation,
                vertices,
                edges,
                faces,
                options
            } = obj;
    
            const
                rx = orientation.x * Math.PI / 180,
                ry = orientation.y * Math.PI / 180,
                rz = orientation.z * Math.PI / 180;
            
            obj.orientation = new Vec3(0, 0, 0);
    
            for (let v of vertices) {
    
                const refPos = options?.anchorObject?.position || position;
                let dx, dy, dz;
    
                dx = v.x - refPos.x;
                dy = v.y - refPos.y;
                dz = v.z - refPos.z;
    
                // Z
                v.x = refPos.x + (dx * Math.cos(rz) - dy * Math.sin(rz));
                v.y = refPos.y + (dy * Math.cos(rz) + dx * Math.sin(rz));
                
                dx = v.x - refPos.x;
                dy = v.y - refPos.y;
                dz = v.z - refPos.z;
    
                // X
                v.y = refPos.y + (dy * Math.cos(rx) - dz * Math.sin(rx));
                v.z = refPos.z + (dz * Math.cos(rx) + dy * Math.sin(rx));
                
                dx = v.x - refPos.x;
                dy = v.y - refPos.y;
                dz = v.z - refPos.z;
    
                // Y
                v.x = refPos.x + (dx * Math.cos(ry) + dz * Math.sin(ry));
                v.z = refPos.z + (dz * Math.cos(ry) - dx * Math.sin(ry));
    
                // v.x = position.x + (dx * Math.cos(rz) - dy * Math.sin(rz) + dx * Math.cos(ry) + dz * Math.sin(ry));
                // v.y = position.y + (dy * Math.cos(rz) + dx * Math.sin(rz) + dy * Math.cos(rx) - dz * Math.sin(rx));
                // v.z = position.z + (dz * Math.cos(rx) + dy * Math.sin(rx) + dz * Math.cos(ry) - dx * Math.sin(ry));
    
                // Draw vertices
                if (options?.drawVertices) {
                    ctx.beginPath();
                    ctx.ellipse(v.x, v.y, 5, 5, 0, 0, Math.PI * 2);
                    ctx.stroke();
                }
    
            }
    
            // Fill in faces
            if (options?.drawFaces) {
                
                let fi = 0;
    
                for (let f of faces) {
    
                    ctx.fillStyle = obj.faceColors[fi];
                    // ctx.fillStyle = "#00ff00";
    
                    ctx.beginPath();
                    ctx.moveTo(vertices[f[0]].x, vertices[f[0]].y);
    
                    for (let v of f) {
                        ctx.lineTo(vertices[v].x, vertices[v].y);
                    }
    
                    ctx.fill();
    
                    fi += 1;
                }
            }
    
            // Draw outlines
            if (options?.drawOutlines) {
                for (let edge of edges) {
                    ctx.beginPath();
                    ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
                    ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
                    ctx.stroke();
                }
            }
    
        }
    
        requestAnimationFrame(window.KyuubuRenderer.renderFrame);
    }

    /**
     * Pushes object to render queue
     * @param {Primitive|Cube} object
     * @returns {Number} Index in render queue
     */
    pushToQueue (object) {
        this.renderQueue.push(object);
        return this.renderQueue.length - 1;
    }

    /**
     * Updates object in render queue with (possibly) new properties
     * @param {Primitive|Cube} object 
     */
    updateObject (object) {
        this.renderQueue[object.renderQueueIndex] = object;
    }

    /**
     * Removes object from render queue, thus destroying it
     * @param {Primitive|Cube} object 
     */
    destroyObject (object) {
        this.renderQueue.splice(object.renderQueueIndex, 1);
    }

}