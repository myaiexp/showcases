<!-- source: https://www.leaferjs.com/ui/en/reference/display/Pen.html -->

# Pen Element 

Like drawing by hand, quickly create different styled path combinations. Supports Canvas 2D-style path APIs.

  

Inheritance

Pen  >  Group  >  UI

## Key Properties 

### pathElement: `Path` 

Current sub-path element. Created automatically by `setStyle()`.

## Key Methods 

### setStyle ( data: `IPathInputData`) 

Set pen style. Internally creates a sub-path for drawing.

You should set style first, then draw paths. Supports all properties from Path and UI.

### add ( ui: `UI`) 

Add a UI element.

### clear ( ) 

Clear all drawn content (remove + destroy).

## Path Drawing APIs 

Similar to Canvas 2D path APIs. All angle values use degrees from -180 to 180.

### clearPath ( ) 

Clear current path data (only clears the latest path after the most recent `setStyle()` call; previous paths are not affected). Alias of `beginPath()`.

### moveTo ( ) 

moveTo(x, y)

Move the starting point to (x, y).

### lineTo ( ) 

lineTo(x, y)

Draw a line from the previous point to (x, y).

### bezierCurveTo ( ) 

bezierCurveTo(x1, y1, x2, y2, x, y)

Draw a cubic Bézier curve from the previous point to (x, y), using (x1, y1) and (x2, y2) as control points.

### quadraticCurveTo ( ) 

quadraticCurveTo(x1, y1, x, y)

Draw a quadratic Bézier curve from the previous point to (x, y), using (x1, y1) as the control point.

### rect ( ) 

rect(x, y, width, height)

Draw a rectangle.

### roundRect ( ) 

roundRect(x, y, width, height, cornerRadius: `number` | `number[]`)

Draw a rounded rectangle.

### ellipse ( ) 

ellipse(x, y, radiusX, radiusY, rotation?, startAngle?, endAngle?, anticlockwise?: `boolean`)

Draw an ellipse or elliptical arc. Center is at (x, y), radii are (radiusX, radiusY). Direction follows `anticlockwise` (default clockwise). If angles are omitted, a full ellipse is drawn.

### arc ( ) 

arc(x, y, radius, startAngle?, endAngle?, anticlockwise?: `boolean`)

Draw a circle or circular arc. Center is at (x, y). If angles are omitted, a full circle is drawn.

### arcTo ( ) 

arcTo(x1, y1, x2, y2, radius)

Draw a tangent arc between two lines defined by the previous point, (x1, y1), and (x2, y2).

### closePath ( ) 

Close the current path.

## New Methods 

### drawEllipse ( ) new 

drawEllipse(x, y, radiusX, radiusY, rotation?, startAngle?, endAngle?, anticlockwise?)

Move to the start point first, then draw an ellipse. Ensures the ellipse is disconnected from previous paths, keeping it independent.

### drawArc ( ) new 

drawArc(x, y, radius, startAngle?, endAngle?, anticlockwise?)

Move to the start point first, then draw an arc. Ensures independence from previous paths.

### drawPoints ( ) new 

drawPoints(points, curve?, close?)

Draw polyline from points array:

* `[x, y, x, y, ...]` or
* `[{x, y}, {x, y} ...]`

`curve` enables smoothing (0–1 or `true` = 0.5). `close` indicates whether to close the path.

## Inheritance 

### Pen  >  Group  >  UI 

## Examples 

### Draw Shapes with Different Colors 

LeaferApp

ts

```
// #创建 Pen [画出不同颜色的形状 (Leafer)]
import { Leafer, Pen } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const pen = new Pen() 

pen.setStyle({ fill: '#FF4B4B', windingRule: 'evenodd' })
pen.roundRect(0, 0, 100, 100, 30).arc(50, 50, 25)

pen.setStyle({ x: 50, y: 50, fill: '#FEB027' })
pen.arc(0, 0, 20)

leafer.add(pen)
```

ts

```
// #创建 Pen [画出不同颜色的形状 (App)]
import { App, Pen } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const pen = new Pen() 

pen.setStyle({ fill: '#FF4B4B', windingRule: 'evenodd', editable: true })
pen.roundRect(0, 0, 100, 100, 30).arc(50, 50, 25)

pen.setStyle({ x: 50, y: 50, fill: '#FEB027', editable: true })
pen.arc(0, 0, 20)

app.tree.add(pen)
```

### Draw Curves 

LeaferApp

ts

```
// #创建 Pen [画曲线 (Leafer)]
import { Leafer, Pen } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const pen = new Pen() 

pen.setStyle({ fill: { type: 'radial', stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }] } })
pen.roundRect(0, 0, 100, 100, 30)

pen.setStyle({ y: -5, fill: 'white' })
pen.moveTo(40, 30).bezierCurveTo(70, 30, 90, 60, 63, 80).quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30)

leafer.add(pen)
```

ts

```
// #创建 Pen [画曲线 (App)]
import { App, Pen } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const pen = new Pen() 

pen.setStyle({ fill: { type: 'radial', stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }] }, editable: true })
pen.roundRect(0, 0, 100, 100, 30)

pen.setStyle({ y: -5, fill: 'white', editable: true })
pen.moveTo(40, 30).bezierCurveTo(70, 30, 90, 60, 63, 80).quadraticCurveTo(50, 88, 40, 80).bezierCurveTo(10, 60, 50, 40, 40, 30)

app.tree.add(pen)
```

### Combine with UI Components 

LeaferApp

ts

```
// #创建 Pen [结合图形组件 (Leafer)]
import { Leafer, Pen, Ellipse } from 'leafer-ui'
import '@leafer-in/corner' // 导入圆角插件

const leafer = new Leafer({ view: window })

const pen = new Pen() 

pen.setStyle({ fill: { type: 'radial', stops: [{ offset: 0, color: '#79CB4D' }, { offset: 1, color: '#FEB027' }] } })
pen.roundRect(0, 0, 100, 100, 30)

pen.add(new Ellipse({ x: 20, y: 20, width: 60, height: 60, innerRadius: 0.5, startAngle: -60, endAngle: 180, cornerRadius: 5, fill: 'white' }))

leafer.add(pen)
```

ts

```
// #创建 Pen [结合图形组件 (App)]
import { App, Pen, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/corner' // 导入圆角插件

const app = new App({ view: window, editor: {} })

const pen = new Pen() 

pen.setStyle({ fill: { type: 'radial', stops: [{ offset: 0, color: '#79CB4D' }, { offset: 1, color: '#FEB027' }] }, editable: true })
pen.roundRect(0, 0, 100, 100, 30)

pen.add(new Ellipse({ x: 20, y: 20, width: 60, height: 60, innerRadius: 0.5, startAngle: -60, endAngle: 180, cornerRadius: 5, fill: 'white', editable: true }))

app.tree.add(pen)
```

### Combine with Images 

LeaferApp

ts

```
// #创建 Pen [结合图片 (Leafer)]
import { Leafer, Pen } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const pen = new Pen() 

pen.setStyle({ fill: { type: 'radial', stops: [{ offset: 0, color: '#4DCB71' }, { offset: 1, color: '#79CB4D' }] }, windingRule: 'evenodd' })
pen.roundRect(0, 0, 100, 100, 30).arc(50, 50, 25)

pen.setStyle({ fill: { type: 'image', url: '/image/leafer.jpg' } })
pen.arc(50, 50, 20)

leafer.add(pen)
```

ts

```
// #创建 Pen [结合图片 (App)]
import { App, Pen } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const pen = new Pen() 

pen.setStyle({ fill: { type: 'radial', stops: [{ offset: 0, color: '#4DCB71' }, { offset: 1, color: '#79CB4D' }] }, windingRule: 'evenodd', editable: true })
pen.roundRect(0, 0, 100, 100, 30).arc(50, 50, 25)

pen.setStyle({ fill: { type: 'image', url: '/image/leafer.jpg' }, editable: true })
pen.arc(50, 50, 20)

app.tree.add(pen)
```

### Combine with Text 

LeaferApp

ts

```
// #创建 Pen [结合文字 (Leafer)]
import { Leafer, Pen, Text } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const pen = new Pen() 

pen.setStyle({ stroke: '#4DCB71', strokeWidth: 4, strokeAlign: 'inside' })
pen.roundRect(0, 20, 100, 60, 30)

pen.add(new Text({ x: 60, y: 42, fill: '#4DCB71', fontSize: 16, text: 'ON' }))

pen.setStyle({ fill: '#4DCB71' })
pen.arc(30, 50, 23)

leafer.add(pen)
```

ts

```
// #创建 Pen [结合文字 (App)]
import { App, Pen, Text } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const pen = new Pen() 

pen.setStyle({ stroke: '#4DCB71', strokeWidth: 4, strokeAlign: 'inside', editable: true })
pen.roundRect(0, 20, 100, 60, 30)

pen.add(new Text({ x: 60, y: 42, fill: '#4DCB71', fontSize: 16, text: 'ON', editable: true }))

pen.setStyle({ fill: '#4DCB71', editable: true })
pen.arc(30, 50, 23)

app.tree.add(pen)
```
