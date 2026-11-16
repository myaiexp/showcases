<!-- source: https://www.leaferjs.com/ui/en/reference/math/Matrix.html -->

# Matrix 

Matrix class, similar to CSS transform.

Matrix operations affect the Outer view, while the Inner view remains unchanged.

## Key Properties 

### a: `number` 

scaleX combined with rotation value, default is 1.

### b: `number` 

Default is 0.

### c: `number` 

Default is 0.

### d: `number` 

scaleY combined with rotation value, default is 1.

### e: `number` 

x-axis coordinate (matrix origin), default is 0.

### f: `number` 

y-axis coordinate (matrix origin), default is 0.

## Key Methods 

When returning `Matrix`, chained operations are supported.

### set ( a: `number` | `IMatrixData` = 1, b = 0, c = 0 , d = 1, e = 0, f = 0 ): `Matrix` 

Set matrix data, same parameters as new Matrix(), default is 1,0,0,1,0,0.

### get (): `IMatrixData` 

Get matrix data object {a,b,c,d,e,f}.

### clone (): `Matrix` 

Clone a Matrix object.

### Movement 

### translate ( x: `number`, y: `number` ): `Matrix` 

Move the matrix origin from the outer view, directly incrementing e and f.

### translateInner ( x: `number`, y: `number` ): `Matrix` 

Move the matrix origin from the inner view, converting to outer view movement distance, then incrementing e and f, affected by a, b, c, d.

### Scaling 

### scale ( scaleX: `number`, scaleY = scaleX ): `Matrix` 

Scale the matrix from the outer view, directly modifying a, b, c, d.

### pixelScale( pixelRatio: `number`): `Matrix` 

Scale by pixelRatio, multiplying a, b, c, d, e, f by pixelRatio, typically used to normalize canvas pixel ratio differences.

### scaleOfOuter ( origin: `IPointData`, scaleX: `number`, scaleY = scaleX ): `Matrix` 

Scale the matrix using outer view coordinate origin as the pivot.

### scaleOfInner ( origin: `IPointData`, scaleX: `number`, scaleY = scaleX ): `Matrix` 

Scale the matrix using inner view coordinate origin as the pivot.

### Rotation 

### rotate ( rotation: `number` ): `Matrix` 

Rotate the matrix from the outer view, in degrees.

### rotateOfOuter ( origin: `IPointData`, rotation: `number` ): `Matrix` 

Rotate the matrix using outer view coordinate origin as the pivot.

### rotateOfInner ( origin: `IPointData`, rotation: `number` ): `Matrix` 

Rotate the matrix using inner view coordinate origin as the pivot.

### Skew 

### skew ( skewX: `number`, skewY = 0 ): `Matrix` 

Skew the matrix from the outer view, in degrees.

### skewOfOuter ( origin: `IPointData`, skewX: `number`, skewY = 0 ): `Matrix` 

Skew the matrix using outer view coordinate origin as the pivot.

### skewOfInner ( origin: `IPointData`, skewX: `number`, skewY = 0 ): `Matrix` 

Skew the matrix using inner view coordinate origin as the pivot.

### Multiplication 

### multiply ( child: `IMatrixData` ): `Matrix` 

Multiply by a child matrix.

### multiplyParent ( parent: `IMatrixData` ): `Matrix` 

Multiply by a parent matrix.

### Division 

### divide ( child: `IMatrixData` ): `Matrix` 

Divide by a child matrix.

### divideParent ( parent: `IMatrixData` ): `Matrix` 

Divide by a parent matrix.

### invert (): `Matrix` 

Invert the matrix.

### Coordinate Transformation 

### toOuterPoint ( inner: `IPointData`, to?:`IPointData`, distance?: `boolean` ) 

Convert to outer view coordinates. If to exists, the result will be assigned to to. distance indicates converting distance/length.

### toInnerPoint ( outer: `IPointData`, to?:`IPointData`, distance?: `boolean` ) 

Convert to inner view coordinates. If to exists, the result will be assigned to to. distance indicates converting distance/length.

### Layout Data 

### setLayout ( layout: `ILayoutData`, origin?: `IPointData`, around?: `IPointData` ): `Matrix` 

Set matrix data from layout data {x,y, scaleX,scaleY,rotation, skewX, skewY}, supports setting origin and around.

The composition order of the matrix is: rotate -> skew -> scale -> translate.

### getLayout ( origin?: `IPointData`, around?: `IPointData`, firstSkewY?: `boolean` ): `ILayoutData` 

Decompose the matrix to get layout data {x,y, scaleX,scaleY,rotation, skewX, skewY}, supports applying origin and around before conversion. firstSkewY indicates prioritizing skewY decomposition.

### withScale ( scaleX?: `number`, scaleY = scaleX ): `IMatrixWithScaleData` 

Temporarily add scaleX and scaleY properties to the matrix. If not provided, scaleX and scaleY will be automatically decomposed.

Typically used for temporarily applying matrix options when rendering elements.

### reset (): void 

Reset the current matrix.

## Examples 

### Create via property values 

ts

```
import { Matrix } from 'leafer-ui'

const matrix = new Matrix(2, 0, 0, 2, 100, 100)
```

### Create via data object 

ts

```
const matrixData = { a: 2, b: 0, c: 0, d: 2, e: 100, f: 100 }

const matrix = new Matrix(matrixData)
```

### Chained operations 

ts

```
const matrix = new Matrix()

matrix.set(2, 0, 0, 2, 100, 100).scale(0.5) // { a: 1, b: 0, c: 0, d: 1, e: 100, f: 100 }
```

## API 

### Matrix 
