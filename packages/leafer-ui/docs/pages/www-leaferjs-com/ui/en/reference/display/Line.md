<!-- source: https://www.leaferjs.com/ui/en/reference/display/Line.html -->

# Line Element 

Draw horizontal lines, diagonal lines, vertical lines, polylines, smooth curves, and trend charts.

  

Inheritance

Line  >  UI

## Key Properties 

### width: `number` 

Length of the line.

### rotation: `number` 

Rotation angle. Range: -180 to 180.

ts

```
// vertical line
width: 100
rotation: 90
```

## Computed Property 

### toPoint: IPointData 

Target point **(calculated in the Line’s local coordinate system)**. Automatically converts to `width` and `rotation`.

Note

If `toPoint` does not behave as expected, simply subtract the Line’s `x` and `y` position, because `toPoint` is based on the inner coordinate system.

ts

```
line.toPoint = { x: 200, y: 100 }

console.log(line.toPoint) // {x: 200, y: 100} Automatically recalculated based on width & rotation
```

## Points Mode 

Polylines can be defined via `points`.

### points: `number[]` | IPointData[] 

Define polyline using coordinate array `[x1, y1, x2, y2, ...]` (high performance),

or coordinate objects `[{x, y}, {x, y} ...]` (more readable, slightly lower performance).

### curve: `IPointsCurve` 

Whether to convert into a smooth path. Defaults to `false`.

Can be set from `0 ~ 1` to control curvature. Default is `0.5`.

Also supports a custom points smoothing type.

ts

```
type IPointsCurve = IPointsCurveValue | IPointsCurveData

type IPointsCurveValue = boolean | number

interface IPointsCurveData {
  type: IPointsCurveType
  value: IPointsCurveValue
}

type IPointsCurveType =
  | 'Q' // Smooth points using quadratic Bézier curves (built-in)
  | 'C' // Smooth points using cubic Bézier curves (requires an extension)
  | (string & {})

// Boolean
line.curve = true

// Number
line.curve = 0.3

// Object
line.curve = {
  type: 'Q',
  value: 0.3,
}
```

### closed: `boolean` 

Whether to close the path automatically. Defaults to `false`.

## Path Mode 

### Path priority mode 

## Corner Properties 

### cornerRadius: `number` 

Corner radius that smooths polyline joints.

## Read-Only Properties 

### isPointsMode: `boolean` 

Whether the `points` property mode is currently active.

## Inheritance 

### Line  >  UI 

## Examples 

### Draw Horizontal Line 

LeaferApp

ts

```
// #创建 Line [绘制横线 (Leafer)]
import { Leafer, Line } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const line = new Line({
    width: 100,
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(line)
```

ts

```
// #创建 Line [绘制横线 (App)]
import { App, Line } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const line = new Line({
    width: 100,
    strokeWidth: 5,
    stroke: '#32cd79',
    editable: true
})

app.tree.add(line)
```

### Draw Line to Target Point 

LeaferApp

ts

```
// #创建 Line [绘制到目标点的直线 (Leafer)]
import { Leafer, Line } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const line = new Line({
    toPoint: { x: 100, y: 50 },
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(line)
```

ts

```
// #创建 Line [绘制到目标点的直线 (App)]
import { App, Line } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const line = new Line({
    toPoint: { x: 100, y: 50 },
    strokeWidth: 5,
    stroke: '#32cd79',
    editable: true
})

app.tree.add(line)
```

### Draw Diagonal Line 

LeaferApp

ts

```
// #创建 Line [绘制斜线 (Leafer)]
import { Leafer, Line } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const line = new Line({
    width: 100,
    rotation: 45,
    strokeWidth: 5,
    stroke: '#32cd79',
    dashPattern: [10, 10] // 虚线描边属性
})

leafer.add(line)
```

ts

```
// #创建 Line [绘制斜线 (App)]
import { App, Line } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const line = new Line({
    width: 100,
    rotation: 45,
    strokeWidth: 5,
    stroke: '#32cd79',
    dashPattern: [10, 10], // 虚线描边属性
    editable: true
})

app.tree.add(line)
```

### Draw Vertical Line 

LeaferApp

ts

```
// #创建 Line [绘制竖线 (Leafer)]
import { Leafer, Line } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const line = new Line({
    width: 100,
    rotation: 90,
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(line)
```

ts

```
// #创建 Line [绘制竖线 (App)]
import { App, Line } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const line = new Line({
    width: 100,
    rotation: 90,
    strokeWidth: 5,
    stroke: '#32cd79',
    editable: true
})

app.tree.add(line)
```

### Draw Polyline 

LeaferApp

ts

```
// #创建 Line [绘制折线 (Leafer)]
import { Leafer, Line } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const line = new Line({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90],  // [x,y, x,y ...]
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(line)
```

ts

```
// #创建 Line [绘制折线 (App)]
import { App, Line } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const line = new Line({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90],  // [x,y, x,y ...]
    strokeWidth: 5,
    stroke: '#32cd79',
    editable: true
})

app.tree.add(line)
```

### Draw Rounded Polyline 

LeaferApp

ts

```
// #创建 Line [绘制圆角折线 (Leafer)]
import { Leafer, Line } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const line = new Line({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90], // [x,y, x,y ...]
    cornerRadius: 5,
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(line)
```

ts

```
// #创建 Line [绘制圆角折线 (Leafer)]
import { Leafer, Line } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const line = new Line({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90], // [x,y, x,y ...]
    cornerRadius: 5,
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(line)
```

### Draw Curve 

LeaferApp

ts

```
// #创建 Line [绘制曲线 (Leafer)]
import { Leafer, Line } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const line = new Line({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90],  // [x,y, x,y ...]
    curve: true,
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(line)
```

ts

```
// #创建 Line [绘制曲线 (App)]
import { App, Line } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const line = new Line({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90],  // [x,y, x,y ...]
    curve: true,
    strokeWidth: 5,
    stroke: '#32cd79',
    editable: true
})

app.tree.add(line)
```

### Draw Curve (0.2 curvature) 

LeaferApp

ts

```
// #创建 Line [绘制 0.2 曲率的曲线 (Leafer)]
import { Leafer, Line } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const line = new Line({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90],  // [x,y, x,y ...]
    curve: 0.2,
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(line)
```

ts

```
// #创建 Line [绘制 0.2 曲率的曲线 (App)]
import { App, Line } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const line = new Line({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90],  // [x,y, x,y ...]
    curve: 0.2,
    strokeWidth: 5,
    stroke: '#32cd79',
    editable: true
})

app.tree.add(line)
```

### Draw Trend Chart 

LeaferApp

ts

```
// #创建 Line [绘制趋势图 (Leafer)]
import { Leafer, Line } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const line = new Line({
    points: [0, 90, 20, 60, 40, 80, 60, 40, 75, 50, 90, 10, 100, 90],  // [x,y, x,y ...]
    curve: true,
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(line)
```

ts

```
// #创建 Line [绘制趋势图 (App)]
import { App, Line } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const line = new Line({
    points: [0, 90, 20, 60, 40, 80, 60, 40, 75, 50, 90, 10, 100, 90],  // [x,y, x,y ...]
    curve: true,
    strokeWidth: 5,
    stroke: '#32cd79',
    editable: true
})

app.tree.add(line)
```
