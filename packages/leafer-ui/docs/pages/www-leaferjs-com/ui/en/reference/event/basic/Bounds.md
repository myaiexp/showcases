<!-- source: https://www.leaferjs.com/ui/en/reference/event/basic/Bounds.html -->

# BoundsEvent 

Element bounding box change event.

Inheritance

BoundsEvent  >  Event

  

Since bounding box changes occur very frequently, to avoid performance overhead, the engine only dispatches notifications without creating event instances.

An internal optimization is applied: the engine quickly checks whether any Bounds event listeners are registered. If none are found, events will not be dispatched at all to avoid unnecessary cost.

## Event Names 

### BoundsEvent.RESIZE 

Triggered when the element’s bounding box in the inner coordinate system changes, including its own scale.

This includes changes to width, height, path, and scale properties. Supported by Group, Box, and other grouped elements.

`bounds.resize`

### BoundsEvent.INNER 

Triggered when the element’s bounding box in the inner coordinate system changes.

Includes width, height, and path changes. Supported by Group, Box, and other grouped elements.

`bounds.inner`

### BoundsEvent.LOCAL 

Triggered when the element’s bounding box in the local coordinate system changes.

Includes position, width, height, path, scale, rotation, and skew changes. Supported by Group, Box, and other grouped elements.

`bounds.local`

### BoundsEvent.WORLD 

Triggered when the element’s bounding box in the world coordinate system changes.

Fires when the element’s rendered position or size in the viewport changes, such as viewport panning/zooming or changes in parent elements. Supported by Group, Box, and other grouped elements.

`bounds.world`

## Inherited Events 

### BoundsEvent  >  Event 

## Example 

rect.tsrect.js

ts

```
// #监听 Bounds 事件 [resize]
import { Leafer, Rect, BoundsEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

rect.on(BoundsEvent.RESIZE, function (target: Rect) { // 监听 bounds.resize 事件

    target.fill = 'blue' // target 为当前监听的 rect 元素

})

setTimeout(() => {

    rect.width = 200

}, 1000)
```

js

```
// #监听 Bounds 事件 [resize]
import { Leafer, Rect, BoundsEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

rect.on(BoundsEvent.RESIZE, function (target) { // 监听 bounds.resize 事件

    target.fill = 'blue' // target 为当前监听的 rect 元素

})

setTimeout(() => {

    rect.width = 200

}, 1000)
```
