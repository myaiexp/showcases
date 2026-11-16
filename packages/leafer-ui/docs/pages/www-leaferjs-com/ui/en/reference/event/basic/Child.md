<!-- source: https://www.leaferjs.com/ui/en/reference/event/basic/Child.html -->

# ChildEvent 

Child events.

The dispatch order for add/remove events is: child element → parent element → Leafer instance. These are also observed during the render lifecycle.

Events are only dispatched after `leafer.ready`. Want to handle related events before ready?

Inheritance

ChildEvent  >  Event

## Event Names 

### ChildEvent.ADD 

Element is added.

`child.add`

### ChildEvent.REMOVE 

Element is removed.

`child.remove`

### Events dispatched only on the element itself 

### ChildEvent.CREATED 

Element is created.

`created`

### ChildEvent.MOUNTED 

Element is mounted to Leafer.

`mounted`

### ChildEvent.UNMOUNTED 

Element is unmounted from Leafer.

`unmounted`

### ChildEvent.DESTROY 

Element is destroyed.

`destroy`

## Key Properties 

### child: `ILeaf` 

Child element.

### parent: `ILeaf` 

Parent element.

## Inherited Events 

### ChildEvent  >  Event 

## Example 

child.tschild.js

ts

```
// #监听 Child 事件
import { Leafer, Group, Rect, ChildEvent, LeaferEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group()

leafer.add(group)

function onReady() {

    const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

    leafer.on(ChildEvent.ADD, function (e: ChildEvent) {
        console.log('leafer', e.parent, e.child)
    })

    group.on(ChildEvent.ADD, function (e: ChildEvent) {
        console.log('parent', e.parent, e.child)
    })

    rect.on(ChildEvent.ADD, function (e: ChildEvent) {
        console.log('child', e.parent, e.child)
    })

    group.add(rect)
}

leafer.on(LeaferEvent.READY, onReady)
```

js

```
// #监听 Child 事件
import { Leafer, Group, Rect, ChildEvent, LeaferEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group()

leafer.add(group)

function onReady() {

    const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

    leafer.on(ChildEvent.ADD, function (e) {
        console.log('leafer', e.parent, e.child)
    })

    group.on(ChildEvent.ADD, function (e) {
        console.log('parent', e.parent, e.child)
    })

    rect.on(ChildEvent.ADD, function (e) {
        console.log('child', e.parent, e.child)
    })

    group.add(rect)
}

leafer.on(LeaferEvent.READY, onReady)
```
