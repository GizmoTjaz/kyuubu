# Kyūbu
A 3D cube renderer written in vanilla JS using the HTML canvas.
~~All classes include an "acceptable" amount of JSDoc documentation.~~

## Getting Started
First, you must import the script into your HTML document:
```html
<script src="">
```
Then you can use the following classes:
```js
const { Renderer, Vec3, Shapes } = Kyuubu;
```
Before you start drawing, you must initialize a renderer object.
```js
new Renderer(document.getElementByTagName("canvas"));
```
After that, you can start drawing shapes.
```js
new Shapes.Cube({
    size: new Vec3(50, 50, 50)
});
```
**For examples, please take a look at the [examples](https://github.com/GizmoTjaz/kyuubu/tree/master/examples) folder.**

# Classes


## Vec3
Describes a basic three-dimensional vector.
```js
class Vec3 {
    x: number,
    y: number,
    z: number
}

new Vec3(0, 0, 0);
```


# Shapes

- All shapes require the `constructorInstructions` object passed to their constructor.
- Only the `size` property is required to successfully create an object.
- The `anchorObject` option anchors the object's rotation center to that of the object that was passed to it.
```js
constructorInstructions = {
    size: Vec3,
    position: Vec3,
    orientation: Vec3,
    options: {
        drawVertices: Boolean,
        drawOutlines: Boolean,
        drawFaces: Boolean,
        anchorObject: Primitive|Cube
    }
};
```

## Primitive
The primitive class contains properties and methods all other shapes inherit. It is not supposed to be used on its own.
```js
new Primitive(constructorInstructions);
```

## Cube
The cube is the most basic shape.
```js
new Cube(constructorInstructions);
```