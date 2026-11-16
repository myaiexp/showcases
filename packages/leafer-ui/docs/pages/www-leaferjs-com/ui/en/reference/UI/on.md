<!-- source: https://www.leaferjs.com/ui/en/reference/UI/on.html -->

# Listen Events 

## Key Property 

### event: `IEventListenerMap` 

Only supports passing event listeners during initialization (cannot be exported to JSON).

ts

```
export interface IEventListenerMap {
  [name: string]: IEventListener | [IEventListener, IEventOption]
}

// Example
new Rect({
  fill: '#32cd79',
  event: {
    tap: function () {
      console.log('tap')
    },
    [PointerEvent.DOWN]: [
      function () {
        console.log('pointer.down')
      },
      'once', // Same as the second parameter in on()
    ],
  },
})
```

## Key Methods 

### on ( type: `string` | `string`[], listener: `IEventListener`, options?: `IEventOption` ) 

Listen to events. When `options` is `boolean`, it indicates whether it is a capture type.

Supports multi-dimensional array syntax, e.g. `on([ [type, listener, options?], ... ])`.

### once ( type: `string` | `string`[], listener: `IEventListener`, capture?: `boolean` ) 

Listen to an event only once. `capture` indicates whether it is a capture type.

Supports multi-dimensional array syntax, e.g. `once([ [type, listener, capture?], ... ])`.

## New Method 

### on\_ ( type: `string` | `string`[], listener: `IEventListener`, bind?: `IObject`, options?: `IEventOption` ): `IEventListenerId` 

Listen to events. Supports passing `bind` as the `this` context of the listener, and returns an event id, which is used together with off\_().

Supports multi-dimensional array syntax, e.g. `on_([ [type, listener, bind?, options?], ... ])`.

ts

```
// #监听事件 [简洁模式]
import { IEventListenerId } from '@leafer/interface'
import { UI, PointerEvent } from 'leafer-ui'

export class Simple extends UI {

    events: IEventListenerId[]

    listen() {
        this.events = [
            this.on_(PointerEvent.ENTER, this.enter, this),
            this.on_(PointerEvent.LEAVE, this.leave, this)
        ]
    }

    cancel(): void {
        this.off_(this.events)
    }

    enter() { }
    leave() { }

}
```

## Belongs to 

### UI Element 

## Example 

### Listen to a single event 

one.tsone.js

ts

```
// #监听单个事件
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

function onEnter(e: PointerEvent) {
    (e.current as Rect).fill = '#42dd89'
}

rect.on(PointerEvent.ENTER, onEnter)
```

js

```
// #监听单个事件
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

function onEnter(e) {
    e.current.fill = '#42dd89'
}

rect.on(PointerEvent.ENTER, onEnter)
```

### Listen to multiple events 

Array form:

constMore.tsconstMore.js

ts

```
// #监听多个事件 [数组形式]
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

rect.on([PointerEvent.ENTER, PointerEvent.LEAVE],
    function (e: PointerEvent) {
        if (e.type === PointerEvent.ENTER) {
            onEnter(e)
        } else {
            onLeave(e)
        }
    }
)
```

js

```
// #监听多个事件 [数组形式]
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

rect.on([PointerEvent.ENTER, PointerEvent.LEAVE],
    function (e) {
        if (e.type === PointerEvent.ENTER) {
            onEnter(e)
        } else {
            onLeave(e)
        }
    }
)
```

String form:

more.tsmore.js

ts

```
// #监听多个事件 [字符串形式]
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

rect.on('pointer.enter pointer.leave',
    function (e: PointerEvent) {
        if (e.type === 'pointer.enter') {
            onEnter(e)
        } else {
            onLeave(e)
        }
    }
)
```

js

```
// #监听多个事件 [字符串形式]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

function onEnter(e) {
    e.current.fill = '#42dd89'
}

function onLeave(e) {
    e.current.fill = '#32cd79'
}

rect.on('pointer.enter pointer.leave',
    function (e) {
        if (e.type === 'pointer.enter') {
            onEnter(e)
        } else {
            onLeave(e)
        }
    }
)
```

### Listen to an event only once 

once.tsonce.js

ts

```
// #只监听一次事件
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

rect.once('pointer.enter', onEnter) 
rect.once('pointer.leave', onLeave)
```

js

```
// #只监听一次事件
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

function onEnter(e) {
    e.current.fill = '#42dd89'
}

function onLeave(e) {
    e.current.fill = '#32cd79'
}

rect.once('pointer.enter', onEnter) 
rect.once('pointer.leave', onLeave)
```
