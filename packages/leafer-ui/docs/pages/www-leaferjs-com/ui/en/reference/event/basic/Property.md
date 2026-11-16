<!-- source: https://www.leaferjs.com/ui/en/reference/event/basic/Property.html -->

# PropertyEvent 

Element property event. This event is only dispatched after `leafer.ready`.

Event dispatch order: element itself → Leafer engine. It is also observed in the render lifecycle.

Inheritance

PropertyEvent  >  Event

## Event Names 

### PropertyEvent.CHANGE 

Dispatched to both the element itself and the Leafer engine.

`property.change`

### PropertyEvent.LEAFER\_CHANGE 

Dispatched only to the Leafer engine.

`property.leafer_change`

### Additional Events 

### PropertyEvent.SCROLL 

Triggered when the element’s `scrollX` or `scrollY` properties change.

`property.scroll`

## Key Properties 

### target: `ILeaf` 

Target object.

### attrName: `string` 

Property name.

### oldValue: `IValue` 

Previous value.

### newValue: `IValue` 

New value.

## Inherited Events 

### PropertyEvent  >  Event 

## Example 

property.tsproperty.js

ts

```
// #监听元素属性事件
import { Leafer, Rect, LeaferEvent, PropertyEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

function onReady() {

    leafer.on(PropertyEvent.CHANGE, function (e: PropertyEvent) {
        console.log('leafer', e.target, e.attrName, e.newValue, e.oldValue)
    })

    rect.on(PropertyEvent.CHANGE, function (e: PropertyEvent) {
        console.log('leaf', e.target, e.attrName, e.newValue, e.oldValue)
    })

    rect.fill = 'blue'
}

leafer.on(LeaferEvent.READY, onReady)
```

js

```
// #监听元素属性事件
import { Leafer, Rect, LeaferEvent, PropertyEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

function onReady() {

    leafer.on(PropertyEvent.CHANGE, function (e) {
        console.log('leafer', e.target, e.attrName, e.newValue, e.oldValue)
    })

    rect.on(PropertyEvent.CHANGE, function (e) {
        console.log('leaf', e.target, e.attrName, e.newValue, e.oldValue)
    })

    rect.fill = 'blue'
}

leafer.on(LeaferEvent.READY, onReady)
```
