// Classes
import { Vec3 } from "./classes.js";

// Variables
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const renderQueue = [];

// Constants
const FRAME_WIDTH = document.documentElement.clientWidth;
const FRAME_HEIGHT = document.documentElement.clientHeight;

canvas.width = FRAME_WIDTH;
canvas.height = FRAME_HEIGHT;

ctx.fillStyle = "#000";
ctx.strokeStyle = "#FFF";
ctx.lineWidth = FRAME_WIDTH / 100;
ctx.lineCap = "round";


function thread () {

    ctx.fillStyle = "#000";

    // Clear frame
    ctx.fillRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);

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

    requestAnimationFrame(thread);
}

requestAnimationFrame(thread);

export default {

    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,

    pushToQueue (obj) {
        renderQueue.push(obj);
        return renderQueue.length - 1;
    },

    updateObject (index, obj) {
        renderQueue[index] = obj;
    },

    destroyObject (index) {
        renderQueue.splice(index, 1);
    }

};