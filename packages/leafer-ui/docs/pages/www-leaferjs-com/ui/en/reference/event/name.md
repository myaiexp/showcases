<!-- source: https://www.leaferjs.com/ui/en/reference/event/name.html -->

# String Names 

It is recommended to use event name constants first, but you can also use string names instead of event constants.

## Naming Rules 

The string names corresponding to event name constants follow these rules:

ts

```
PointerEvent.DOWN = 'pointer.down' // eventType.eventName, improves readability

ZoomEvent.ZOOM = 'zoom'  // when event type and name are the same, it can be omitted
ZoomEvent.START = 'zoom.start'
ZoomEvent.END = 'zoom.end'

// Exceptions:
// The following PointerEvent events do not require the "pointer" prefix
'tap'｜'double_tap'｜'long_press'｜'long_tap'
```

### Custom Names 

Globally modify the string names corresponding to event constants. This is generally used to maintain compatibility with existing business code. Currently, only events that inherit from UIEvent are supported.

changeName.tschangeName.js

ts

```
// #自定义事件名称
import { Leafer, Rect, PointerEvent, UIEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

Object.defineProperty(UIEvent.prototype, 'evt', {
    get() { return this.origin }
})

function onEnter(e: PointerEvent) {
    (e.current as Rect).fill = '#42dd89'
    console.log((e as any).evt)
}

function onLeave(e: PointerEvent) {
    (e.current as Rect).fill = '#32cd79'
}

PointerEvent.changeName(PointerEvent.ENTER, 'pointerenter')  
PointerEvent.changeName(PointerEvent.LEAVE, 'pointerleave')

rect.on('pointerenter', onEnter)
rect.on('pointerleave', onLeave)
```

js

```
// #自定义事件名称
import { Leafer, Rect, PointerEvent, UIEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

Object.defineProperty(UIEvent.prototype, 'evt', {
    get() { return this.origin }
})

function onEnter(e) {
    e.current.fill = '#42dd89'
    console.log(e.evt)
}

function onLeave(e) {
    e.current.fill = '#32cd79'
}

PointerEvent.changeName(PointerEvent.ENTER, 'pointerenter')  
PointerEvent.changeName(PointerEvent.LEAVE, 'pointerleave')

rect.on('pointerenter', onEnter)
rect.on('pointerleave', onLeave)
```
