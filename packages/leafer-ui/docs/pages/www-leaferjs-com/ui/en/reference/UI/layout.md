<!-- source: https://www.leaferjs.com/ui/en/reference/UI/layout.html -->

# layout 

Element layout-related properties

## Key Properties 

### x: `number` 

Position on the x-axis.

Note that offsetX and around will affect the actual position of the element.

### y: `number` 

Position on the y-axis.

Note that offsetY and around will affect the actual position of the element.

### width: `number` 

The width of the element.

Elements that do not support direct width assignment, or Group, can adjust it via resizeWidth(), and get the actual width via boxBounds.

### height: `number` 

The height of the element. Only some elements support direct assignment.

Elements that do not support direct height assignment, or Group, can adjust it via resizeHeight(), and get the actual height via boxBounds.

### scaleX: `number` 

Scale on the x-axis. A negative value indicates mirroring on the x-axis.

### scaleY: `number` 

Scale on the y-axis. A negative value indicates mirroring on the y-axis.

### rotation: `number` 

Rotation angle, ranging from -180 to 180.

### skewX: `number` 

Skew angle on the x-axis, ranging from -90 to 90.

### skewY: `number` 

Skew angle on the y-axis, ranging from -90 to 90.

## Computed Property 

### scale: `number` | `IPointData` 

Quickly set scaleX and scaleY.

ts

```
leaf.scale = 2 // scaleX = 2, scaleY = 2
console.log(leaf.scale) // 2

leaf.scale = { x: 1, y: 2 } // scaleX = 1, scaleY = 2
console.log(leaf.scale) // {x: 1, y: 2}
```

## Key Method 

### updateLayout ( ) 

Request a layout update. If there is no layout change in Leafer, it will be ignored.

## More 

### Transform Properties & Methods 

### Bounds Properties & Methods 

## Belongs to 

### UI Element 
