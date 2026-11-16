<!-- source: https://www.leaferjs.com/ui/en/reference/event/basic/Event.html -->

# Event 

Base class for all events.

## Key Properties 

### type: `string` 

Event type.

### current: `ILeaf` 

The current object that is listening to the event. Useful for distinguishing when multiple objects share the same event handler.

Equivalent to `currentTarget`.

### target: `ILeaf` 

The target object defined when dispatching the event / the deepest target object.

### bubbles: `boolean` 

Whether the event bubbles.

### phase: `number` 

Indicates which phase of event flow is currently being processed:

* 0 No event is being processed.
* 1 Capturing phase: the event is being processed by ancestor objects of the target element. Triggered when `capture: true` is set during registration.
* 2 Target phase: the event has reached the target object.
* 3 Bubbling phase: the event is propagating back up from the target’s ancestors, starting from the parent.

Equivalent to `eventPhase`.

### isStop: `boolean` 

Whether event propagation has been stopped.

### isStopDefault: `boolean` 

Whether the default action has been prevented.

### origin: `object` 

Native event object.

## Key Methods 

### stop ( ) 

Stops event propagation. If multiple listeners exist on the same element, they will still execute before propagation is stopped (prevents bubbling to parent nodes).

Also calls the native `stopPropagation()`.

Note

Composite events like `click` are internally synthesized and cannot stop native events with the same name.

Additionally, `PointEvent` does not block native `MouseEvent` by default. You must change app.config.pointer.type.

### stopNow ( ) 

Immediately stops event propagation, preventing both parent and sibling handlers from being triggered.

Also calls the native `stopImmediatePropagation()`.

Note

Composite events like `click` are internally synthesized and cannot stop native events with the same name.

Additionally, `PointEvent` does not block native `MouseEvent` by default. You must change app.config.pointer.type.

### stopDefault ( ) 

Prevents the default browser behavior.

Also calls the native `preventDefault()`.

Note

Composite events like `click` are internally synthesized and cannot stop native events with the same name.

Additionally, `PointEvent` does not block native `MouseEvent` by default. You must change app.config.pointer.type.

## Example 

### Stop event propagation 

stop.tsstop.js

ts

```
// #阻止事件流传递
import { Leafer, Group, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const parent = new Group()
const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(parent)
parent.add(rect)

// 捕获 ---
parent.on(PointerEvent.ENTER, function (e: PointerEvent) {
    console.log('[capture] Parent enter A')
    e.stop() // 阻止事件向父节点传递
}, true)

parent.on(PointerEvent.ENTER, function () {
    console.log('[capture] Parent enter B')
}, true)

// [capture] Parent enter A
// [capture] Parent enter B

rect.on(PointerEvent.ENTER, function () {
    console.log('[capture] Rect enter')
}, true)


// 冒泡 ---
rect.on(PointerEvent.ENTER, function () {
    console.log('[bubble] Rect enter')
})

parent.on(PointerEvent.ENTER, function () {
    console.log('[bubble] Parent enter')
})
```

js

```
// #阻止事件流传递 
import { Leafer, Group, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const parent = new Group()
const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(parent)
parent.add(rect)

// 捕获 ---
parent.on(PointerEvent.ENTER, function (e) {
    console.log('[capture] Parent enter A')
    e.stop() // 阻止事件向父节点传递
}, true)

parent.on(PointerEvent.ENTER, function () {
    console.log('[capture] Parent enter B')
}, true)

// [capture] Parent enter A
// [capture] Parent enter B

rect.on(PointerEvent.ENTER, function () {
    console.log('[capture] Rect enter')
}, true)


// 冒泡 ---
rect.on(PointerEvent.ENTER, function () {
    console.log('[bubble] Rect enter')
})

parent.on(PointerEvent.ENTER, function () {
    console.log('[bubble] Parent enter')
})
```

### Immediately stop event propagation 

stopNow.tsstopNow.js

ts

```
// #立即阻止事件流传递
import { Leafer, Group, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const parent = new Group()
const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(parent)
parent.add(rect)

// 捕获 ---
parent.on(PointerEvent.ENTER, function (e: PointerEvent) {
    console.log('[capture] Parent enter A')
    e.stopNow() // 阻止事件向父节点及同级传递
}, true)

parent.on(PointerEvent.ENTER, function () {
    console.log('[capture] Parent enter B')
}, true)

// [capture] Parent enter A

rect.on(PointerEvent.ENTER, function () {
    console.log('[capture] Rect enter')
}, true)


// 冒泡 ---
rect.on(PointerEvent.ENTER, function () {
    console.log('[bubble] Rect enter')
})

parent.on(PointerEvent.ENTER, function () {
    console.log('[bubble] Parent enter')
})
```

js

```
// #立即阻止事件流传递
import { Leafer, Group, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const parent = new Group()
const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(parent)
parent.add(rect)

// 捕获 ---
parent.on(PointerEvent.ENTER, function (e) {
    console.log('[capture] Parent enter A')
    e.stopNow() // 阻止事件向父节点及同级传递
}, true)

parent.on(PointerEvent.ENTER, function () {
    console.log('[capture] Parent enter B')
}, true)

// [capture] Parent enter A

rect.on(PointerEvent.ENTER, function () {
    console.log('[capture] Rect enter')
}, true)


// 冒泡 ---
rect.on(PointerEvent.ENTER, function () {
    console.log('[bubble] Rect enter')
})

parent.on(PointerEvent.ENTER, function () {
    console.log('[bubble] Parent enter')
})
```
