<!-- source: https://www.leaferjs.com/ui/en/reference/UI/scale.html -->

# scale 

The scaling properties of an element.

## Key Properties 

### scaleX: `number` 

Scale factor on the x-axis. A negative value represents mirroring along the x-axis.

### scaleY: `number` 

Scale factor on the y-axis. A negative value represents mirroring along the y-axis.

## Computed Property 

### scale: `number` | `IPointData` 

Quickly set / get `scaleX` and `scaleY`.

ts

```
rect.scale = 2 // scaleX = 2, scaleY = 2
console.log(rect.scale) // 2

rect.scale = { x: 1, y: 2 } // scaleX = 1, scaleY = 2
console.log(rect.scale) // {x: 1, y: 2}
```

## Key Methods 

Note

The following methods are incremental operations and modify the element’s initial coordinates. They are mainly designed for graphic editing scenarios.

In animation and game scenarios, you can use origin / around + scale for simpler center-based scaling.

### scaleOf ( origin: `IAlign` | `IPointData`, multiplyScaleX: `number`, multiplyScaleY?: `number` | `ITranstion`, resize?: `boolean`, transition?: `ITranstion` ) 

Scale the element around a given origin (in box coordinate system) as an incremental operation.

The `resize` parameter converts scaling into width/height changes. The `transition` parameter enables animation transition.

ts

```
// Scale 1.5x around center
rect.scaleOf('center', 1.5)

// To scale to a target value, divide by current scale:
rect.scaleOf({ x: 50, y: 50 }, 1.5 / rect.scale)

// Animation transition
rect.scaleOf('center', 1.5, true)
// = rect.scaleOf('center', 1.5, 1.5, false, true)

rect.scaleOf('center', 1.5, { duration: 2 }) // 2s transition
// = rect.scaleOf('center', 1.5, 1.5, false, 2)
```

### scaleOfWorld ( worldOrigin: `IPointData`, multiplyScaleX: `number`, multiplyScaleY?: `number` | `ITranstion`, resize?: `boolean`, transition?: `ITranstion` ) 

Scale the element around a given origin in the world coordinate system as an incremental operation.

The `resize` parameter converts scaling into width/height changes. The `transition` parameter enables animation.

## Belongs to 

### UI Element 

## Example 

### Scale element using scaleOf() 

LeaferApp

ts

```
// #通过 scaleOf() 缩放元素 [无动画过渡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

leafer.add(rect)

setTimeout(() => {

    // 围绕中心点继续缩放1.5倍
    rect.scaleOf('center', 1.5) 

}, 1000)
```

ts

```
// #通过 scaleOf() 缩放元素 [无动画过渡 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

app.tree.add(rect)

setTimeout(() => {

    // 围绕中心点继续缩放1.5倍
    rect.scaleOf('center', 1.5) 

}, 1000)
```

### Scale element with animation 

LeaferApp

ts

```
// #通过 scaleOf() 缩放元素 [有动画过渡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

leafer.add(rect)

setTimeout(() => {

    // 围绕中心点继续缩放1.5倍
    rect.scaleOf('center', 1.5, true) 

}, 1000)
```

ts

```
// #通过 scaleOf() 缩放元素 [有动画过渡 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件

import '@leafer-in/animate' // 导入动画插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

app.tree.add(rect)

setTimeout(() => {

    // 围绕中心点继续缩放1.5倍
    rect.scaleOf('center', 1.5, true) 

}, 1000)
```
