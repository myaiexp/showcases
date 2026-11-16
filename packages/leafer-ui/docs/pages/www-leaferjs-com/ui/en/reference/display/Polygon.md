<!-- source: https://www.leaferjs.com/ui/en/reference/display/Polygon.html -->

# Polygon Element 

Draw triangles, diamonds, pentagons, regular polygons, free polygons, smooth polygons, and trend charts.

  

Inheritance

Polygon  >  UI

## Key Properties 

### width: `number` 

Width of the regular polygon.

### height: `number` 

Height of the regular polygon.

### sides: `number` 

Number of sides of the regular polygon. Must be ≥ 3.

Internal logic: points are evenly distributed on a circle every `(360 / sides)` degrees, then connected to form a regular polygon.

ts

```
// pentagon
sides: 5
```

### startAngle: `number` 

Starting angle offset. Default is `0`. Range: -180 to 180.

## Points Mode 

You can define a free-form polygon using `points`.

### points: `number[]` | IPointData[] 

Define polygon using coordinate array `[x1, y1, x2, y2, ...]` (high performance),

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
polygon.curve = true

// Number
polygon.curve = 0.3

// Object
polygon.curve = {
  type: 'Q',
  value: 0.3,
}
```

## Path Mode 

### Path priority mode 

## Corner Properties 

### cornerRadius: `number` 

Corner radius that smooths polygon vertices.

## Read-Only Properties 

### isPointsMode: `boolean` 

Whether the `points` property mode is currently active.

## Box Element 

### PolygonBox 

## Inheritance 

### Polygon  >  UI 

## Examples 

### Draw Triangle 

LeaferApp

ts

```
// #创建 Polygon [绘制三角形 (Leafer)]
import { Leafer, Polygon } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const polygon = new Polygon({
    width: 100,
    height: 100,
    sides: 3,
    fill: '#32cd79'
})

leafer.add(polygon)
```

ts

```
// #创建 Polygon [绘制三角形 (App)]
import { App, Polygon } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const polygon = new Polygon({
    width: 100,
    height: 100,
    sides: 3,
    fill: '#32cd79',
    editable: true
})

app.tree.add(polygon)
```

### Draw Pentagon 

LeaferApp

ts

```
// #创建 Polygon [绘制五边形 (Leafer)]
import { Leafer, Polygon } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const polygon = new Polygon({
    width: 100,
    height: 100,
    sides: 5,
    fill: '#32cd79'
})

leafer.add(polygon)
```

ts

```
// #创建 Polygon [绘制五边形 (App)]
import { App, Polygon } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const polygon = new Polygon({
    width: 100,
    height: 100,
    sides: 5,
    fill: '#32cd79',
    editable: true
})

app.tree.add(polygon)
```

### Draw Rounded Hexagon 

LeaferApp

ts

```
// #创建 Polygon [绘制圆角六边形 (Leafer)]
import { Leafer, Polygon } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const polygon = new Polygon({
    width: 100,
    height: 100,
    sides: 6,
    cornerRadius: 10,
    fill: '#32cd79'
})

leafer.add(polygon)
```

ts

```
// #创建 Polygon [绘制圆角六边形 (App)]
import { App, Polygon } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const polygon = new Polygon({
    width: 100,
    height: 100,
    sides: 6,
    cornerRadius: 10,
    fill: '#32cd79',
    editable: true
})

app.tree.add(polygon)
```

### Draw Free Polygon 

LeaferApp

ts

```
// #创建 Polygon [绘制自由多边形 (Leafer)]
import { Leafer, Polygon } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const polygon = new Polygon({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90],  // [x,y, x,y ...]
    fill: '#32cd79'
})

leafer.add(polygon)
```

ts

```
// #创建 Polygon [绘制自由多边形 (App)]
import { App, Polygon } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const polygon = new Polygon({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90],  // [x,y, x,y ...]
    fill: '#32cd79',
    editable: true
})

app.tree.add(polygon)
```

### Draw Smooth Polygon 

LeaferApp

ts

```
// #创建 Polygon [绘制平滑多边形 (Leafer)]
import { Leafer, Polygon } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const polygon = new Polygon({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90, 90, 90, 10, 90],  // [x,y, x,y ...]
    curve: true,
    fill: '#32cd79'
})

leafer.add(polygon)
```

ts

```
// #创建 Polygon [绘制平滑多边形 (App)]
import { App, Polygon } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const polygon = new Polygon({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90, 90, 90, 10, 90],  // [x,y, x,y ...]
    curve: true,
    fill: '#32cd79',
    editable: true
})

app.tree.add(polygon)
```

### Draw Smooth Polygon (0.2 curvature) 

LeaferApp

ts

```
// #创建 Polygon [绘制 0.2 曲率的平滑多边形 (Leafer)]
import { Leafer, Polygon } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const polygon = new Polygon({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90, 90, 90, 10, 90],  // [x,y, x,y ...]
    curve: 0.2,
    fill: '#32cd79'
})

leafer.add(polygon)
```

ts

```
// #创建 Polygon [绘制 0.2 曲率的平滑多边形 (App)]
import { App, Polygon } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const polygon = new Polygon({
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90, 90, 90, 10, 90],  // [x,y, x,y ...]
    curve: 0.2,
    fill: '#32cd79',
    editable: true
})

app.tree.add(polygon)
```

### Draw Trend Chart 

LeaferApp

ts

```
// #创建 Polygon [绘制趋势图 (Leafer)]
import { Leafer, Polygon } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const polygon = new Polygon({
    points: [0, 90, 20, 60, 40, 80, 60, 40, 75, 50, 90, 10, 100, 90, 100, 90, 0, 90],
    curve: true,
    fill: '#32cd79'
})

leafer.add(polygon)
```

ts

```
// #创建 Polygon [绘制趋势图 (App)]
import { App, Polygon } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const polygon = new Polygon({
    points: [0, 90, 20, 60, 40, 80, 60, 40, 75, 50, 90, 10, 100, 90, 100, 90, 0, 90],
    curve: true,
    fill: '#32cd79',
    editable: true
})

app.tree.add(polygon)
```
