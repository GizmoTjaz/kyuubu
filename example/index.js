// Classes
//import Renderer from "./src/scripts/renderer.js";
//import { Cube } from "./src/scripts/shapes.js";
//import { Vec3 } from "./src/scripts/classes.js";
import { Renderer, Vec3, Shapes } from "../kyuubu.js";

// Variables
let isDown = false;
let lastX = 0;
let lastY = 0;

const cube = new Shapes.Cube({
    size: new Vec3(300, 300, 300),
    position: new Vec3(Renderer.width / 2, Renderer.height / 2, 0),
    orientation: new Vec3(0, 30, 30),
    options: {
        drawOutlines: true,
        drawFaces: false
    }
});

document.addEventListener("mousedown", () => {
    isDown = true;
});

document.addEventListener("mouseup", () => {
    isDown = false;
});

document.addEventListener("mousemove", ({ offsetX, offsetY }) => {
    if (isDown) {
        
        const deltaX = offsetX - lastX;
        const deltaY = offsetY - lastY;

        cube.setOrientation = new Vec3(
            cube.orientation.x + deltaY / 2,
            cube.orientation.y - deltaX / 2,
            cube.orientation.z
        );

        lastX = offsetX;
        lastY = offsetY;

    }
});

const rotatingCube = new Shapes.Cube({
    size: new Vec3(100, 100, 100),
    position: new Vec3(150, 150, 0),
    options: {
        drawOutlines: true
    }
})

setInterval(() => {
    rotatingCube.setOrientation = new Vec3(rotatingCube.orientation.x - 1, rotatingCube.orientation.y + 1, rotatingCube.orientation.z - 1);
}, 10);