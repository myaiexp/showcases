<!-- source: https://www.leaferjs.com/ui/en/reference/UI/origin.html -->

# origin 

Rotate and scale elements around an origin point, similar to CSS `transform-origin`.

To draw elements around the center point, use around instead (it has higher priority).

## Key Property 

### origin: `IAlign` | `IUnitPointData` 

The origin point for element rotation and scaling, positioned relative to the element’s actual content. Supported by basic elements and Group.

ts

```
// Alignment
type IAlign =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'right'
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left'
  | 'left'
  | 'center'

rect.origin = 'center'

// Coordinate point
interface IUnitPointData {
  type?: 'percent' | 'px'
  x: number
  y: number
}

rect.origin = {
  type: 'percent',
  x: 0.5, // 50% width (percentage coordinate)
  y: 0.5, // 50% height
}

rect.origin = {
  x: 50, // 50px coordinate
  y: 50, // 50px
}
```

**To keep the element in place while changing the origin point, use localTransform or setTransform().**

ts

```
// Original origin of polygon
polygon.origin = 'center'

// Save current transform
const transform = { ...polygon.localTransform }

// Change origin point
polygon.origin = 'right'

// Restore transform (system will automatically handle origin change)
polygon.setTransform(transform)
```

## Belongs to 

### UI Element 

## Example 

### Set origin to center 

LeaferApp

ts

```
// #原点 [设置原点在中心 (Leafer)]
import { Leafer, Rect, Frame } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    origin: 'center', // 设置原点在中心
    draggable: true,
    fill: '#4DCB71'
})

leafer.add(new Frame({ width: 100, height: 100, fill: '#FF4A2C', children: [rect] }))
```

ts

```
// #原点 [设置原点在中心 (App)]
import { App, Rect, Frame } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    origin: 'center', // 设置原点在中心
    draggable: true,
    fill: '#4DCB71'
})

app.tree.add(new Frame({ width: 100, height: 100, fill: '#FF4A2C', children: [rect] }))
```

### Scale 1.5x around origin 

LeaferApp

ts

```
// #原点 [围绕原点缩放 1.5 倍 (Leafer)]
import { Leafer, Rect, Frame } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    origin: 'center',
    scale: 1.5, // scaleX = scaleY = 1.5
    draggable: true,
    fill: '#4DCB71'
})

leafer.add(new Frame({ width: 100, height: 100, fill: '#FF4A2C', children: [rect] }))
```

ts

```
// #原点 [围绕原点缩放 1.5 倍 (App)]
import { App, Rect, Frame } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    origin: 'center',
    scale: 1.5, // scaleX = scaleY = 1.5
    draggable: true,
    fill: '#4DCB71'
})

app.tree.add(new Frame({ width: 100, height: 100, fill: '#FF4A2C', children: [rect] }))
```

### Rotate 45° around origin 

LeaferApp

ts

```
// #原点 [围绕原点旋转 45 度 (Leafer)]
import { Leafer, Rect, Frame } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    origin: 'center',
    rotation: 45,
    draggable: true,
    fill: '#4DCB71'
})

leafer.add(new Frame({ width: 100, height: 100, fill: '#FF4A2C', children: [rect] }))
```

ts

```
// #原点 [围绕原点旋转 45 度 (App)]
import { App, Rect, Frame } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    origin: 'center',
    rotation: 45,
    draggable: true,
    fill: '#4DCB71'
})

app.tree.add(new Frame({ width: 100, height: 100, fill: '#FF4A2C', children: [rect] }))
```

### Skew 45° around origin 

LeaferApp

ts

```
// #原点 [围绕原点倾斜 45 度 (Leafer)]
import { Leafer, Rect, Frame } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    origin: 'center',
    skewX: 45,
    draggable: true,
    fill: '#4DCB71'
})

leafer.add(new Frame({ width: 100, height: 100, fill: '#FF4A2C', children: [rect] }))
```

ts

```
// #原点 [围绕原点倾斜 45 度 (App)]
import { App, Rect, Frame } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    origin: 'center',
    skewX: 45,
    draggable: true,
    fill: '#4DCB71'
})

app.tree.add(new Frame({ width: 100, height: 100, fill: '#FF4A2C', children: [rect] }))
```
