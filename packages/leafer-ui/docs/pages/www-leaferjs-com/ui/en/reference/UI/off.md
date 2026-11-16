<!-- source: https://www.leaferjs.com/ui/en/reference/UI/off.html -->

# Remove Event 

## Key Method 

### off ( type?: `string` | `string`[], listener?: `IEventListener`, options?: `IEventListenerOptions` | `boolean` ) 

Remove event listeners.

Supports removing all events (when `type` is not provided), or removing a specific type of event (when `listener` is not provided).

## New Method 

### off\_ ( id: `IEventListenerId` | `IEventListenerId`[] ) 

Remove events. Used together with on\_().

## Belongs to 

### UI Element 

## Example 

### Remove a single event 

one.tsone.js

ts

```
// #移除监听单个事件
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

function onEnter(e: PointerEvent) {
    (e.current as Rect).fill = '#42dd89'
}

function onLeave(e: PointerEvent) {
    (e.current as Rect).fill = '#32cd79'
}

rect.on(PointerEvent.ENTER, onEnter)
rect.on(PointerEvent.LEAVE, onLeave)

rect.off(PointerEvent.LEAVE, onLeave)
```

js

```
// #移除监听单个事件
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

function onEnter(e) {
    e.current.fill = '#42dd89'
}

function onLeave(e) {
    e.current.fill = '#32cd79'
}

rect.on(PointerEvent.ENTER, onEnter)
rect.on(PointerEvent.LEAVE, onLeave)

rect.off(PointerEvent.LEAVE, onLeave)
```

### Remove multiple events 

Array form:

constMore.tsconstMore.js

ts

```
// #移除监听多个事件 [数组形式]
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

function onEnter(e: PointerEvent) {
    (e.current as Rect).fill = '#42dd89'
}

function onLeave(e: PointerEvent) {
    (e.current as Rect).fill = '#42dd89'
}

rect.on([PointerEvent.ENTER, PointerEvent.UP], onEnter)
rect.on(PointerEvent.LEAVE, onLeave)

rect.off([PointerEvent.ENTER, PointerEvent.UP], onEnter)
```

js

```
// #移除监听多个事件 [数组形式]
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

function onEnter(e) {
    e.current.fill = '#42dd89'
}

function onLeave(e) {
    e.current.fill = '#42dd89'
}

rect.on([PointerEvent.ENTER, PointerEvent.UP], onEnter)
rect.on(PointerEvent.LEAVE, onLeave)

rect.off([PointerEvent.ENTER, PointerEvent.UP], onEnter)
```

String form:

more.tsmore.js

ts

```
// #移除监听多个事件 [字符串形式]
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

function onEnter(e: PointerEvent) {
    (e.current as Rect).fill = '#42dd89'
}

function onLeave(e: PointerEvent) {
    (e.current as Rect).fill = '#42dd89'
}

rect.on([PointerEvent.ENTER, PointerEvent.UP], onEnter)
rect.on(PointerEvent.LEAVE, onLeave)

rect.off('pointer.enter pointer.up', onEnter)
```

js

```
// #移除监听多个事件 [字符串形式]
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

function onEnter(e) {
    e.current.fill = '#42dd89'
}

function onLeave(e) {
    e.current.fill = '#42dd89'
}

rect.on([PointerEvent.ENTER, PointerEvent.UP], onEnter)
rect.on(PointerEvent.LEAVE, onLeave)

rect.off('pointer.enter pointer.up', onEnter)
```
