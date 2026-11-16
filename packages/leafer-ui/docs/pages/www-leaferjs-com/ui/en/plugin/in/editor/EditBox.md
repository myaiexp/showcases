<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/EditBox.html -->

# EditBox 

The edit box container of the graphics editor.

It is positioned based on the element’s `boxBounds` as the origin, and defines position, rotation, and mirroring properties relative to world coordinates.

Control points added inside only need to be positioned relative to boxBounds multiplied by the world scale value **(must be converted to a positive value)**.

Inheritance

EditBox  >  Group  >  UI

## Key Properties 

### view: `Group` 

The default view of the edit box, used to place default editor control points and operation elements.

### rect: `Box` 

The movement area element of the edit box.

### circle: `Box` 

The independent rotation point element of the edit box.

### resizePoints: `EditPoint`[] 

The 8 resize control points of the edit box.

Order: [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left].

### rotatePoints: `EditPoint`[] 

The 8 transparent rotate control points at the bottom of the edit box.

Order: [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left].

### resizeLines: `EditPoint`[] 

The 4 resize control lines of the edit box.

Order: [top, right, bottom, left].

### dragPoint: `EditPoint` 

The control point currently being dragged.

### enterPoint: `EditPoint` 

The control point currently in use (triggered by `pointer.enter` event).

## Readonly Properties 

### flippedX: `boolean` 

Whether X-axis is flipped (scaleX is negative).

### flippedY: `boolean` 

Whether Y-axis is flipped (scaleY is negative).

### flipped: `boolean` 

Whether any axis is flipped (scaleX or scaleY is negative).

### flippedOne: `boolean` 

Whether only one axis is flipped (only one of scaleX or scaleY is negative).

## Key Methods 

Typically used for customizing control point styles.

### getPointStyle(userStyle?: `IBoxInputData`): `IBoxInputData` 

Get base control point style, optionally merged with custom style.

### getPointsStyle(): `IBoxInputData`[] 

Get styles of all control points, returned as an array.

### getMiddlePointsStyle(): `IBoxInputData`[] 

Get styles of middle control points, returned as an array.

## Inherited 

### EditBox  >  Group  >  UI 
