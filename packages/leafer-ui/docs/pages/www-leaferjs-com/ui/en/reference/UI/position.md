<!-- source: https://www.leaferjs.com/ui/en/reference/UI/position.html -->

# position 

Element position properties, representing absolute positioning relative to the parent element.

## Key Properties 

### x: `number` 

Position on the x-axis.

Note that offsetX and around will affect the actual position of the element.

### y: `number` 

Position on the y-axis.

Note that offsetY and around will affect the actual position of the element.

### position: `IAlign` | `IInset` 

Position layout — position elements relative to the parent or a specified element using directional alignment or edge offsets. Requires the position plugin to be installed.

Automatically updates the element's `x`, `y`, `width`, and `height` properties. The parent must be a Box or Frame element with width and height properties.

ts

```
// Position relative to the parent using directional alignment
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

rect.position = 'center' // Displays the element at the center of its parent, automatically updating the element's x and y properties

// Position relative to the parent's edges, similar to CSS absolute positioning
interface IInset {
  id?: string // Position relative to a specified ID element within the parent container, supporting multiple nesting levels
  align?: IAlign // Prioritize directional positioning relative to the parent

  top?: number | IUnitData
  left?: number | IUnitData
  bottom?: number | IUnitData
  right?: number | IUnitData
}

rect.position = { top: 20, right: 20, bottom: 20, left: 20 } // 20px from all four edges of the parent; automatically updates the element's x, y, width, and height properties
rect.position = { left: 20, right: 20 } // 20px from the left and right edges of the parent; automatically updates the element's x and width properties
rect.position = { top: 20, bottom: 20 } // 20px from the top and bottom edges of the parent; automatically updates the element's y and height properties
rect.position = { right: 20 } // 20px from the right edge of the parent; automatically updates the element's x property
rect.position = { bottom: 20 } // 20px from the bottom edge of the parent; automatically updates the element's y property

// 相对指定 id 元素定位
rect.position = { id: 'rect2', align: 'center' } // 在指定 rect2 元素的居中位置显示，会自动修改元素的 x、y 属性
rect.position = { id: 'rect2', top: 20, left: 20, right: 20, bottom: 20 }, // 距离 rect2 元素四周各20px, 会自动修改元素的 x、y、width、height 属性

// Use percentages
interface IUnitData {
  type: 'percent' | 'px'
  value: number
}

rect.position = { bottom: { value: 0.2, type: 'percent' } } // 20% from the bottom edge of the parent; automatically updates the element's y property
```

## Key Methods 

### move ( addX: `number` | `IPointData`, addY = 0, transition?: `ITranstion` ) 

Move the element incremental operation. Supports directly passing a point object.

The `transition` parameter indicates whether to apply animation transition.

ts

```
// Move 10px along both X and Y axis
rect.move(10, 10)

// Use point object to move 10px along both axes
rect.move({ x: 10, y: 10 })

// Move with animation
rect.move(10, 10, true)

rect.move(10, 10, 2) // transition for 2 seconds
```

### moveInner ( addX: `number` | `IPointData`, addY = 0, transition?: `ITranstion` ) 

Move the element in the local coordinate system incremental operation. Supports directly passing a point object.

### moveWorld ( addWorldX: `number` | `IPointData`, addWorldY = 0, transition?: `ITranstion` ) 

Move the element in the world coordinate system incremental operation. Supports directly passing a point object.

## Belongs to 

### UI Element 

## Example 

### Move element using move() 

LeaferApp

ts

```
// #通过 move() 移动元素 [无动画过渡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' })

leafer.add(rect)

setTimeout(() => {

    // 沿 X/Y 轴同时移动 100 像素
    rect.move(100, 100) 

}, 1000)
```

ts

```
// #通过 move() 移动元素 [无动画过渡 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' })

app.tree.add(rect)

setTimeout(() => {

    // 沿 X/Y 轴同时移动 100 像素
    rect.move(100, 100) 

}, 1000)
```

### Move element with animation transition 

LeaferApp

ts

```
// #通过 move() 移动元素 [有动画过渡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' })

leafer.add(rect)

setTimeout(() => {

    // 沿 X/Y 轴同时移动 100 像素
    rect.move(100, 100, true) 

}, 1000)
```

ts

```
// #通过 move() 移动元素 [有动画过渡 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/animate' // 导入动画插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' })

app.tree.add(rect)

setTimeout(() => {

    // 沿 X/Y 轴同时移动 100 像素
    rect.move(100, 100, true) 

}, 1000)
```
