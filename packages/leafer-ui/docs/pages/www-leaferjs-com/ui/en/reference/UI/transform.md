<!-- source: https://www.leaferjs.com/ui/en/reference/UI/transform.html -->

# transform 

The transformation matrix of an element. It is the foundation of element layout and coordinate transformation. It can be used with the Matrix / Point classes to manipulate transforms.

## Read-only Properties 

### worldTransform: `IMatrixWithScaleData` 

The transformation matrix relative to the world coordinate system, including `scaleX` and `scaleY`.

### localTransform: `IMatrixData` 

The transformation matrix relative to the parent element.

## Composition Source 

The matrix is composed in the following order: rotate → skew → scale → translate.

### x: `number` 

Position on the x-axis.

Note: offsetX and around affect the actual position.

### y: `number` 

Position on the y-axis.

Note: offsetY and around affect the actual position.

### scaleX: `number` 

Scale factor on the x-axis. A negative value represents mirroring along the x-axis.

### scaleY: `number` 

Scale factor on the y-axis. A negative value represents mirroring along the y-axis.

### rotation: `number` 

Rotation angle, ranging from `-180` to `180`.

### skewX: `number` 

Skew angle on the x-axis, ranging from `-90` to `90`.

### skewY: `number` 

Skew angle on the y-axis, ranging from `-90` to `90`.

## Key Methods 

### setTransform ( matrix: `IMatrixData`, resize?: `boolean`, transition?: `ITranstion` ) 

Set the local transformation matrix. It will be automatically decomposed into layout properties `x`, `y`, `scaleX`, `scaleY`, `rotation`, `skewX`, `skewY`.

The `resize` parameter converts scaling operations into width/height changes. The `transition` parameter enables animation transitions.

### getTransform ( relative?: `ILocationType` | `UI` = 'local' ): `IMatrixData` 

Get the transformation matrix. Supports retrieving the matrix relative to any parent element via `relative`.

### transform ( matrix: `IMatrixData`, resize?: `boolean`, transition?: `ITranstion` ) 

Apply a transformation operation, which is automatically decomposed into layout properties incremental operation.

The `resize` parameter converts scaling into width/height changes. The `transition` parameter enables animation transitions.

### transformWorld ( worldTransform: `IMatrixData`, resize?: `boolean`, transition?: `ITranstion` ) 

Same as `transform()`, but operates in the world coordinate system.

The `resize` parameter converts scaling into width/height changes. The `transition` parameter enables animation transitions.

## Belongs to 

### UI Element 
