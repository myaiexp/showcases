<!-- source: https://www.leaferjs.com/ui/en/reference/UI/skew.html -->

# skew 

The skew (shear) properties of an element.

## Key Properties 

### skewX: `number` 

Skew angle on the x-axis, ranging from `-90` to `90`.

### skewY: `number` 

Skew angle on the y-axis, ranging from `-90` to `90`.

## Key Methods 

Note

The following methods are incremental operations, mainly designed for graphic editing scenarios.

In animation and game scenarios, you can use origin / around + skew for simpler center-based skewing.

### skewOf ( origin: `IAlign` | `IPointData`, addSkewX: `number`, addSkewY = 0, resize?: `boolean`, transition?: `ITranstion` ) 

Skew the element around a given origin (in box coordinate system) as an incremental operation. The `transition` parameter enables animation transition.

ts

```
// Skew X axis by 45° around center
rect.skewOf('center', 45)

// To skew to an absolute value, subtract current skewX:
rect.skewOf({ x: 50, y: 50 }, 45 - rect.skewX)

// Animation transition
rect.skewOf('center', 45, 0, true)

rect.skewOf('center', 45, 0, 2) // 2s transition
```

### skewOfWorld ( worldOrigin: `IPointData`, addSkewX: `number`, addSkewY = 0, resize?: `boolean`, transition?: `ITranstion` ) 

Skew the element around a given origin in the world coordinate system as an incremental operation. The `transition` parameter enables animation.

## Belongs to 

### UI Element 

## Example 

### Skew element using skewOf() 

LeaferApp

ts

```
// #通过 skewOf() 倾斜元素 [无动画过渡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

leafer.add(rect)

setTimeout(() => {

    // 围绕中心继续倾斜X轴 45度
    rect.skewOf('center', 45) 

}, 1000)
```

ts

```
// #通过 skewOf() 倾斜元素 [无动画过渡 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

app.tree.add(rect)

setTimeout(() => {

    // 围绕中心继续倾斜X轴 45度
    rect.skewOf('center', 45) 

}, 1000)
```

### Skew element with animation 

LeaferApp

ts

```
// #通过 skewOf() 倾斜元素 [有动画过渡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

leafer.add(rect)

setTimeout(() => {

    // 围绕中心继续倾斜X轴 45度
    rect.rotateOf('center', 45, true) 

}, 1000)
```

ts

```
// #通过 skewOf() 倾斜元素 [无动画过渡 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

app.tree.add(rect)

setTimeout(() => {

    // 围绕中心继续倾斜X轴 45度
    rect.skewOf('center', 45) 

}, 1000)
```
