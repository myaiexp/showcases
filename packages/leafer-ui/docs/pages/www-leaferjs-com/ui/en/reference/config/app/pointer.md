<!-- source: https://www.leaferjs.com/ui/en/reference/config/app/pointer.html -->

# Application and Engine Configuration 

### Basics     Viewport Type     Canvas     Tap     Multi-touch     Touch     Wheel     Panning View     Zoom View 

## 

Tap interaction related configuration. Changes made during engine runtime will take effect immediately via app.config.pointer.

Note

Under the App structure, settings can only be configured on the App config.

## Key Properties 

### pointer.type: `'mouse'` | `'pointer'` | `'touch'` 

Which native event type is used to trigger PointerEvent events. Default is 'pointer'.

'mouse' means native MouseEvent, 'touch' means native TouchEvent.

### pointer.snap: `boolean` 

Whether to round interaction coordinates to integers to avoid decimals. Default is true.

### pointer.hitRadius: `number` 

Collision radius of the pointer. Default is 5.

### pointer.through: `boolean` 

Whether click events include a through path, which allows access to underlying elements covered by the current element.

### pointer.tapMore: `boolean` 

Whether `tap`, `double_tap`, and `long_tap` events can be triggered simultaneously. Default is false (only one is triggered).

### pointer.tapTime: `number` 

Maximum interval for double-tap detection between clicks. Default is 120ms.

A double-tap must be completed within 120ms + 120ms interval + 120ms; otherwise it will not be recognized.

### pointer.longPressTime: `number` 

Minimum duration required to trigger a long-press event. Default is 800ms.

### pointer.transformTime: `number` 

When zoom/scroll/rotation events stop triggering, an end event is automatically fired after a delay. Default is 500ms.

Since mouse wheel and trackpad do not provide explicit end events, this is simulated.

### pointer.hover: `boolean` 

Whether to dispatch `pointer.over`, `pointer.out`, `pointer.enter`, and `pointer.leave` events. Default is true.

Can be set to false for mobile devices.

### pointer.dragHover: `boolean` 

Whether to dispatch `pointer.over`, `pointer.out`, `pointer.enter`, and `pointer.leave` events during dragging. Default is true.

### pointer.dragLimitAnimate: `boolean` | `number` 

Whether elements constrained by dragBounds animate back into place after dragging ends. Default is false (real-time constraint).

A value between 0.1 and 0.9 can be set to control animation speed. true uses a default speed of 0.3.

### pointer.dragDistance: `number` 

Minimum movement distance required to trigger a drag event, used to prevent accidental activation. Default is 2.

### pointer.swipeDistance: `number` 

Minimum movement distance required to trigger a swipe event. Default is 20.

### pointer.preventDefault: `boolean` 

Whether to prevent the browser's default behavior. Default is false.

### pointer.preventDefaultMenu: `boolean` 

Whether to prevent the browser's default context menu. Default is false.

## Example 

### Disable pointer hit radius 

LeaferApp

ts

```
// #应用与引擎配置 - 取消光标碰撞半径 [Leafer]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({
    view: window,
    pointer: { hitRadius: 0 }
})

leafer.add(Rect.one({ fill: '#32cd79', draggable: true }, 100, 100))
```

ts

```
// #应用与引擎配置 - 取消光标碰撞半径 [App]
import { App, Rect } from 'leafer-ui'

const app = new App({
    view: window,
    tree: {},
    pointer: { hitRadius: 0 }
})

app.tree.add(Rect.one({ fill: '#32cd79', draggable: true }, 100, 100))
```

### Get through path 

LeaferApp

ts

```
// #应用与引擎配置 - 获取穿透路径 [Leafer]
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({
    view: window,
    pointer: { through: true }
})

const data = { x: 100, y: 100, fill: '#32cd00' }

const bottomRect = new Rect(data)
leafer.add(bottomRect)

const rect = new Rect(data)
leafer.add(rect)

rect.on(PointerEvent.DOWN, (e: PointerEvent) => {
    console.log(e.throughPath) // { list: [bottomRect, rect, leafer] }
})
```

ts

```
// #应用与引擎配置 - 获取穿透路径 [App]
import { App, Rect, PointerEvent } from 'leafer-ui'

const app = new App({
    view: window,
    tree: {},
    pointer: { through: true }
})

const data = { x: 100, y: 100, fill: '#32cd00' }

const bottomRect = new Rect(data)
app.tree.add(bottomRect)

const rect = new Rect(data)
app.tree.add(rect)

rect.on(PointerEvent.DOWN, (e: PointerEvent) => {
    console.log(e.throughPath) // { list: [bottomRect, rect, leafer] }
})
```
