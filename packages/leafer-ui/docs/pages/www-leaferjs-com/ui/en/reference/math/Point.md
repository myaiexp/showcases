<!-- source: https://www.leaferjs.com/ui/en/reference/math/Point.html -->

# Point 

Point coordinate class.

## Key Properties 

### x: `number` 

x-axis coordinate.

### y: `number` 

y-axis coordinate.

## Key Methods 

When returning `Point`, chained operations are supported.

### set ( x: `number` | `IPointData` = 0, y = 0 ): `Point` 

Set coordinate data, same parameters as new Point(), default is 0,0.

### get (): `IPointData` 

Get coordinate data object {x,y}.

### clone (): `Point` 

Clone a Point object.

### move ( x: `number` | `IPointData`, y: `number`): `Point` 

Move the coordinate.

### Scaling 

### scale ( scaleX: `number`, scaleY = scaleX ): `Point` 

Scale the current coordinate around the origin (0, 0).

### scaleOf ( origin: `IPointData`, scaleX: `number`, scaleY = scaleX ): `Point` 

Scale the current coordinate around the origin point.

### Rotation 

### rotate ( rotation: `number` ): `Point` 

Rotate the coordinate around the origin (0, 0).

### rotateOf ( origin: `IPointData`, rotation: `number`, radiusX?: `number`, radiusY?: `number` ): `Point` 

Rotate the coordinate around the origin point.

### getRotation ( origin: `IPointData`, to: `IPointData` ): `number` 

Using origin as the center point, get the rotation angle from the current coordinate to the target point to. Clockwise is positive, counterclockwise is negative.

### atan2 

### getAngle ( to: `IPointData`, radiusX?: `number`, radiusY?: `number` ): `number` 

Using the current coordinate as the origin, get the atan2 coordinate angle to the target point to.

### getAtan2 ( to: `IPointData`, radiusX?: `number`, radiusY?: `number` ): `number` 

Using the current coordinate as the origin, get the atan2 coordinate radian to the target point to.

### Distance 

### getCenter ( to: `IPointData` ): `Point` 

Get the center point coordinate between the current point and the target point to.

### getDistance ( to: `IPointData` ): `number` 

Get the distance to the target point to.

### getDistancePoint ( to: `IPointData`, distance: `number`, changeTo: `boolean`, fromTo: `boolean`) `Point` 

Get a coordinate point at a specified distance toward the target point to, supports getting a point on the extension line.

changeTo means assigning the result to to, saving the overhead of creating a new point object.

fromTo means the distance starts from the position of to (default starts from the current point).

### isSame ( point: `IPointData` ): `boolean` 

Check whether it is equal to another point.

### reset ():`Point` 

Reset the coordinate.

## Matrix Methods 

### toInnerOf ( matrix: `IMatrixData` ): `Point` 

Convert to the inner coordinate of the matrix (assuming current is outer coordinate).

### toOuterOf ( matrix: `IMatrixData` ): `Point` 

Convert to the outer coordinate of the matrix (assuming current is inner coordinate).

## Examples 

### Create via property values 

ts

```
import { Point } from 'leafer-ui'

const point = new Point(100, 100)
```

### Create via data object 

ts

```
const pointData = { x: 100, y: 100 }

const point = new Point(pointData)
```

### Chained operations 

ts

```
const point = new Point()

point.set(100, 100).getDistance({ x: 200, y: 100 }) // 100
```

## API 

### Point 
