<!-- source: https://www.leaferjs.com/ui/en/reference/UI/rotation.html -->

# rotation 

The rotation property of an element.

## Key Property 

### rotation: `number` 

Rotation angle, ranging from `-180` to `180`.

## Key Methods 

Note

The following methods are incremental operations, mainly designed for graphic editing scenarios.

In animation and game scenarios, you can use origin / around + `rotation` for simpler center-based rotation.

### rotateOf ( origin: `IAlign` | `IPointData`, addRotation: `number`, transition?: `ITranstion` ) 

Rotate the element around a given origin (in box coordinate system) as an incremental operation. The `transition` parameter controls whether to apply animation transition.

ts

```
// Rotate 45° around center
rect.rotateOf('center', 45)

// To rotate to an absolute rotation value, subtract current rotation:
rect.rotateOf({ x: 50, y: 50 }, 45 - rect.rotation)

// Animation transition
rect.rotateOf('center', 45, true)

rect.rotateOf('center', 45, 2) // transition for 2 seconds
```

### rotateOfWorld ( worldOrigin: `IPointData`, addRotation: `number`, transition?: `ITranstion` ) 

Rotate the element around a given origin in the world coordinate system as an incremental operation. The `transition` parameter controls whether to apply animation.

## Belongs to 

### UI Element 

## Example 

### Rotate element using rotateOf() 

LeaferApp

ts

```
// #通过 rotateOf() 旋转元素 [无动画过渡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

leafer.add(rect)

setTimeout(() => {

    // 围绕中心点继续旋转 45度
    rect.rotateOf('center', 45) 

}, 1000)
```

ts

```
// #通过 rotateOf() 旋转元素 [无动画过渡 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

app.tree.add(rect)

setTimeout(() => {

    // 围绕中心点继续旋转 45度
    rect.rotateOf('center', 45) 

}, 1000)
```

### Rotate element with animation 

LeaferApp

ts

```
// #通过 rotateOf() 旋转元素 [有动画过渡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

leafer.add(rect)

setTimeout(() => {

    // 围绕中心点继续旋转 45度
    rect.rotateOf('center', 45, true) 

}, 1000)
```

ts

```
// #通过 rotateOf() 旋转元素 [有动画过渡 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/animate' // 导入动画插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)

app.tree.add(rect)

setTimeout(() => {

    // 围绕中心点继续旋转 45度
    rect.rotateOf('center', 45, true) 

}, 1000)
```
