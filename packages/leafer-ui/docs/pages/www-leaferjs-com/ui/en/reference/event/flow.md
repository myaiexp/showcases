<!-- source: https://www.leaferjs.com/ui/en/reference/event/flow.html -->

# Capture / Bubble 

When an interaction event is triggered, all parent nodes of the target element can receive the event. The event flow starts from the root node, enters the capture phase, reaches the target element to complete capture, then starts from the target element and enters the bubble phase, finally reaching the root node to complete bubbling.

## Illustration 

## Listen to capture events 

on.tson.js

ts

```
// #监听捕获事件
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

rect.on(PointerEvent.ENTER, onEnter, true) 
rect.on(PointerEvent.LEAVE, onLeave, { capture: true })
```

js

```
// #监听捕获事件
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

rect.on(PointerEvent.ENTER, onEnter, true) 
rect.on(PointerEvent.LEAVE, onLeave, { capture: true })
```

## Remove capture events 

off.tsoff.js

ts

```
// #移除捕获事件
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

rect.off(PointerEvent.ENTER, onEnter, true)  
rect.off(PointerEvent.LEAVE, onLeave, { capture: true })
```

js

```
// #移除捕获事件
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

rect.off(PointerEvent.ENTER, onEnter, true)  
rect.off(PointerEvent.LEAVE, onLeave, { capture: true })
```

## Event flow 

ts

```
// #事件流
import { Leafer, Group, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group()
const parent = new Group()
const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(group)
group.add(parent)
parent.add(rect)
// 捕获 ---
group.on(PointerEvent.ENTER, function () {
    console.log('[capture] Group enter')
}, { capture: true })

parent.on(PointerEvent.ENTER, function () {
    console.log('[capture] Parent enter')
}, true)

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

group.on(PointerEvent.ENTER, function () {
    console.log('[bubble] Group enter')
})
```

## Stop event propagation 

Prevent the event from propagating to parent nodes

### stop ( ) 

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

## Immediately stop event propagation 

Prevent the event from propagating to parent nodes and sibling listeners

### stopNow ( ) 

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
