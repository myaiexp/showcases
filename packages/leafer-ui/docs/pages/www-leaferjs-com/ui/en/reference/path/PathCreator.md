<!-- source: https://www.leaferjs.com/ui/en/reference/path/PathCreator.html -->

# PathCreator 

Generate path data through drawing methods.

## Key Properties 

### path: `IPathCommandData` 

Numeric path data.

All drawing methods append data into path.

## Draw Path 

Similar to Canvas 2D path drawing methods. For angle units, degrees are used uniformly: -180 ~ 180 (0 ~ 360).

### clearPath ( ) 

Used to clear the current path data (Pen only clears the path data after the most recent setStyle(), previous paths are not affected). It is an alias of beginPath(), more semantic.

### moveTo ( ) 

moveTo(x, y)

Starting point: move the starting point to coordinate (x, y).

### lineTo ( ) 

lineTo(x, y)

Draw a straight line: connect from the previous point to coordinate (x, y).

### bezierCurveTo ( ) 

bezierCurveTo(x1, y1, x2, y2, x, y)

Draw a cubic Bézier curve: connect from the previous point to coordinate (x, y). (x1, y1) and (x2, y2) are the first and second control points.

### quadraticCurveTo ( ) 

quadraticCurveTo(x1, y1, x, y)

Draw a quadratic Bézier curve: connect from the previous point to coordinate (x, y). (x1, y1) is the control point.

### rect ( ) 

rect(x, y, width, height)

Draw a rectangle.

### roundRect ( ) 

roundRect(x, y, width, height, cornerRadius: `number` | `number`[])

Draw a rounded rectangle.

### ellipse ( ) 

ellipse(x, y, radiusX, radiusY, rotation?, startAngle?, endAngle?, anticlockwise?: `boolean`)

Draw an ellipse or elliptical arc: center at (x, y), radii (radiusX, radiusY). Draw from start angle startAngle to end angle endAngle in the anticlockwise direction (clockwise by default). If angles are omitted, an ellipse is created.

### arc ( ) 

arc(x, y, radius, startAngle?, endAngle?, anticlockwise?: `boolean`)

Draw a circle or arc: center at (x, y), radius is radius. Draw from start angle startAngle to end angle endAngle in the anticlockwise direction (clockwise by default). If angles are omitted, a circle is created.

### arcTo ( ) 

arcTo(x1, y1, x2, y2, radius)

Draw a tangent arc: draw an arc with radius between the two tangents formed by control point 1 (x1, y1) and the previous point, and control point 1 (x1, y1) and control point 2 (x2, y2).

### closePath ( ) 

Close the path.

### New Methods 

### drawEllipse ( ) new 

drawEllipse(x, y, radiusX, radiusY, rotation?, startAngle?, endAngle?, anticlockwise?)

First moveTo the starting point of the ellipse, then call ellipse(), breaking the connection with the previous path to keep the ellipse independent.

### drawArc ( ) new 

drawArc(x, y, radius, startAngle?, endAngle?, anticlockwise?)

First moveTo the starting point of the arc, then call arc(), breaking the connection with the previous path to keep the arc independent.

### drawPoints ( ) new 

drawPoints(points, curve?, close?)

Draw a polyline using a group of coordinates points [ x,y, x,y, x,y ...] or [ {x, y}, {x, y} ...].

curve indicates converting to a smooth curve. Set 0 ~ 1 to control curvature, or set true to represent 0.5.

close indicates whether to close the polyline.

## Examples 

### Create a new path for drawing 

ts

```
// #生成路径数据 - [创建新路径进行绘制]
import { Leafer, Path, PathCreator } from 'leafer-ui'

const leafer = new Leafer({ view: window })
leafer.add(new Path({ path: 'X 0 0 100 100 30', fill: { type: 'radial', stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }] } }))

const drawer = new PathCreator() 
drawer.moveTo(40, 30).bezierCurveTo(70, 30, 90, 60, 63, 80).quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30)

leafer.add(new Path({ path: drawer.path, fill: 'white' }))
```

### Continue drawing on a string path 

ts

```
// #生成路径数据 - [在字符串路径上继续绘制]
import { Leafer, Path, PathCreator } from 'leafer-ui'

const leafer = new Leafer({ view: window })
leafer.add(new Path({ path: 'X 0 0 100 100 30', fill: { type: 'radial', stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }] } }))

const pathString = 'M 40, 30 C 70, 30, 90, 60, 63, 80'

const drawer = new PathCreator(pathString)
drawer.quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30)

leafer.add(new Path({ path: drawer.path, fill: 'white' }))
```

### Continue drawing on a numeric path 

ts

```
// #生成路径数据 - [在数字路径上继续绘制]
import { Leafer, Path, PathCreator } from 'leafer-ui'

const leafer = new Leafer({ view: window })
leafer.add(new Path({ path: 'X 0 0 100 100 30', fill: { type: 'radial', stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }] } }))

const pathCommandData = [1, 40, 30, 5, 70, 30, 90, 60, 63, 80] 

const drawer = new PathCreator(pathCommandData)
drawer.quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30)

leafer.add(new Path({ path: drawer.path, fill: 'white' }))
```
