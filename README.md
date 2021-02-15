<p align="center"><img src="https://github.com/GizmoTjaz/kyuubu/blob/master/logo/Logo.png" width="160"></p>
<h1 align="center">Kyūbu</h1>

A 3D shape renderer written in TypeScript using the HTML canvas.
<br></br>

# Getting Started

First, you must import the script into your HTML document:
```html
<script src="https://www.gizmo.moe/scripts/kyuubu.bundle.js">
```

Then, you can import the following classes:
```js
const { Renderer, Vec3, Shapes } = Kyuubu;
```

Before you start drawing, you must initialize a renderer object.
```js
new Renderer(document.getElementById("canvas"));
```

After that, you can start drawing shapes and playing with them.
```js
new Shapes.Cube({
    size: new Vec3(50, 50, 50)
});
```

**For examples, please take a look at the [examples](https://github.com/GizmoTjaz/kyuubu/tree/master/examples) folder.**
<br></br>

# Documentation

## Vec3
Describes a basic three-dimensional vector.

```js
class Vec3 {
    x: Number
    y: Number
    z: Number
}

new Vec3(0, 0, 0);
```

## Renderer
The renderer object is responsible for drawing shapes onto the canvas. Objects are automatically pushed to its `renderQueue` array when created. There must only be **one instance** of it **per window**. Usually, you don't need to interact with it after initialization.

```js
class Renderer {

    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    renderFrame: Function
    pushToQueue: Function
    updateObject: Function
    destroyObject: Function

}

new Renderer(document.getElementById("canvas"));
```

## Shapes
`Shapes` is an object containing all shapes which can be used.
- All shapes require the `ShapeConstructorInstructions` object passed to their constructor.
- Only the `size` property is required to successfully create an object.
- The `anchorObject` option anchors the object's rotation center to that of the object that was passed to it.

```js
ShapeConstructorInstructions = {
    size: Vec3,
    position: Vec3,
    orientation: Vec3,
    options: {
        drawVertices: Boolean,
        drawEdges: Boolean,
        drawFaces: Boolean,
        anchorObject: Primitive|Cube|null
    }
};
```

### Primitive
The primitive class contains properties and methods all other shapes inherit. It is not supposed to be used on its own.
```js
new Primitive(constructorInstructions);
```

### Cube
The cube is the most basic shape.
```js
new Cube(constructorInstructions);
```