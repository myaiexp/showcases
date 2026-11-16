<!-- source: https://www.leaferjs.com/ui/en/reference/event/simulation.html -->

# Simulated Interaction 

Can be used for automated testing, replaying user actions, and more.

Interact with the engine like operating an input device, automatically triggering composite events. For example, `pointerDown` followed by `pointerUp` triggers a `tap` event, and `pointerDown` followed by `pointerMove` triggers a `drag` event.

If you only want to trigger a simple interaction event, you can use the element’s emit() method.

## Key Methods 

All simulation methods are available on the `leafer.interaction` instance.

### pointerDown ( data: `IPointerEvent` ) 

Press pointer.

### pointerMove ( data: `IPointerEvent` ) 

Move pointer.

### pointerUp ( data?: `IPointerEvent` ) 

Release pointer.

### zoom ( data: `IZoomEvent` ) 

Zoom action.

### move ( data: `IMoveEvent` ) 

Pan action.

### rotate ( data: `IRotateEvent` ) 

Rotate action.

## Example 

### Simulate click 

Simulate left, middle, and right mouse clicks in sequence, which will automatically trigger a `tap` event.

ts

```
// #模拟点击事件
import { Leafer, Rect, PointerButton, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, width: 200, height: 200, fill: '#32cd79' })

leafer.add(rect)

rect.on(PointerEvent.DOWN, (e) => {
    console.log('down', e)
    if (e.left) rect.fill = 'blue'
})

rect.on(PointerEvent.TAP, (e) => {
    console.log('tap', e)
    if (e.left) rect.fill = '#32cd79'
})

const { interaction } = leafer

setTimeout(() => {

    interaction.pointerDown({ x: 100, y: 100, buttons: PointerButton.MIDDLE })
    interaction.pointerUp()

    interaction.pointerDown({ x: 100, y: 100, buttons: PointerButton.RIGHT })
    interaction.pointerUp()

    interaction.pointerDown({ x: 100, y: 100 })

    setTimeout(() => {
        interaction.pointerUp({ x: 100, y: 100 })
    }, 500)

}, 1000)
```

### Simulate drag event 

ts

```
// #模拟 drag 事件
import { Leafer, Rect, DragEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, width: 200, height: 200, fill: '#32cd79', draggable: true })

leafer.add(rect)

rect.on(DragEvent.DRAG, (e) => {
    console.log('drag', e)
})

const { interaction } = leafer

setTimeout(() => {

    interaction.pointerDown({ x: 100, y: 100 })
    interaction.pointerMove({ x: 500, y: 500 }) // drag
    interaction.pointerUp()

}, 1000)
```

### Simulate zoom 

ts

```
// #模拟缩放事件
import { Leafer, Rect, ZoomEvent } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({ view: window, type: 'viewport' })

const rect = new Rect({ x: 100, y: 100, width: 200, height: 200, fill: '#32cd79' })

leafer.add(rect)

rect.on(ZoomEvent.ZOOM, (e) => {
    console.log('zoom', e)
})

const { interaction } = leafer

setTimeout(() => {

    // origin is {x: 100, y: 100}
    interaction.zoom({ x: 100, y: 100, scale: 0.2 })

}, 1000)
```

### Simulate move 

ts

```
// #模拟平移事件
import { Leafer, Rect, MoveEvent } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({ view: window, type: 'viewport' })

const rect = new Rect({ x: 100, y: 100, width: 200, height: 200, fill: '#32cd79' })

leafer.add(rect)

rect.on(MoveEvent.MOVE, (e) => {
    console.log('move', e)
})

const { interaction } = leafer

setTimeout(() => {

    interaction.move({ x: 100, y: 100, moveX: -100, moveY: -100 })

}, 1000)
```

### Simulate rotation 

rotate.tsrotate.js

ts

```
// #模拟旋转事件
import { Leafer, Rect, RotateEvent } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({ view: window, type: 'viewport' })

const rect = new Rect({ x: 100, y: 100, width: 200, height: 200, fill: '#32cd79' })

leafer.add(rect)

rect.on(RotateEvent.ROTATE, (e: RotateEvent) => {
    rect.rotation += e.rotation
    console.log('rotate', e)
})

const { interaction } = leafer

setTimeout(() => {

    // origin is {x: 100, y: 100}
    interaction.rotate({ x: 100, y: 100, rotation: 30 })

}, 1000)
```

js

```
// #模拟旋转事件
import { Leafer, Rect, RotateEvent } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({ view: window, type: 'viewport'  })

const rect = new Rect({ x: 100, y: 100, width: 200, height: 200, fill: '#32cd79' })

leafer.add(rect)

rect.on(RotateEvent.ROTATE, (e) => {
    rect.rotation += e.rotation
    console.log('rotate', e)
})

const { interaction } = leafer

setTimeout(() => {

    // origin is {x: 100, y: 100}
    interaction.rotate({ x: 100, y: 100, rotation: 30 })

}, 1000)
```
