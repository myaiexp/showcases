<!-- source: https://www.leaferjs.com/ui/en/reference/UI/emit.html -->

# Emit Events 

## Key Methods 

### emit ( type: `string`, event?: `IEvent` | `IObject`, capture?: `boolean` ) 

Manually emit an event. The `event` parameter can be a custom object. UI events will be generated automatically, e.g. `leaf.emit(\`PointEvent.DOWN`)`.

### emitEvent ( event?: `IEvent`, capture?: `boolean` ) 

Manually emit an event. The `event` parameter must be an `IEvent` object, and `current` will be automatically bound.

## Belongs to 

### UI Elements 

## Examples 

### Emit a custom event 

ts

```
// #派发自定义事件
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

rect.on('file.save', (data) => {
    console.log(data.text)
})

rect.emit('file.save', { text: '这是一个自定义的事件' })
```

### Simulate UI interaction events 

ui.tsui.js

ts

```
// #模拟派发交互事件
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: 'green', draggable: true })

leafer.add(rect)

function onEnter(e: PointerEvent) {
    (e.current as Rect).fill = 'blue'
}

rect.on(PointerEvent.ENTER, onEnter)

rect.emit('pointer.enter', { current: rect })
```

js

```
// #模拟派发交互事件
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: 'green', draggable: true })

leafer.add(rect)

function onEnter(e) {
    e.current.fill = 'blue'
}

rect.on(PointerEvent.ENTER, onEnter)

rect.emit('pointer.enter', { current: rect })
```
