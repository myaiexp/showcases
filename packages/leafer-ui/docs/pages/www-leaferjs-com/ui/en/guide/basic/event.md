<!-- source: https://www.leaferjs.com/ui/en/guide/basic/event.html -->

# Event Handling 

It provides a complete event handling mechanism similar to HTML, supporting capture/bubble phases, and also supports simulated interaction.

## Listening to Events 

Add mouse enter/leave event effects to a rectangle:

hover.tshover.js

ts

```
// #监听事件 [通过 on 方法监听]
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    fill: '#32cd79', // 背景色
    stroke: 'black', // 边框
    strokeWidth: 2, // 边框粗细
    draggable: true
})

leafer.add(rect)


function onEnter(e: PointerEvent) {
    (e.current as Rect).fill = '#42dd89'
}

function onLeave(e: PointerEvent) {
    (e.current as Rect).fill = '#32cd79'
}

rect.on(PointerEvent.ENTER, onEnter)
rect.on(PointerEvent.LEAVE, onLeave)
```

js

```
// #监听事件 [通过 on 方法监听]
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    fill: '#32cd79', // 背景色
    stroke: 'black', // 边框
    strokeWidth: 2, // 边框粗细
    draggable: true
})

leafer.add(rect)


function onEnter(e) {
    e.current.fill = '#42dd89'
}

function onLeave(e) {
    e.current.fill = '#32cd79'
}

rect.on(PointerEvent.ENTER, onEnter)
rect.on(PointerEvent.LEAVE, onLeave)
```

## Initializing Events 

Supports passing an event object during initialization (cannot be exported as JSON), for quickly binding events:

event.tsevent.js

ts

```
// #监听事件 [通过 event 对象监听]
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({
    fill: '#32cd79',
    draggable: true,
    event: {
        [PointerEvent.ENTER]: function (e: PointerEvent) {
            (e.current as Rect).fill = '#42dd89'
        },
        [PointerEvent.LEAVE]: function (e: PointerEvent) {
            (e.current as Rect).fill = '#32cd79'
        }
    }
}, 100, 100, 200, 200)

leafer.add(rect)
```

js

```
// #监听事件 [通过 event 对象监听]
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({
    fill: '#32cd79',
    draggable: true,
    event: {
        [PointerEvent.ENTER]: function (e) {
            e.current.fill = '#42dd89'
        },
        [PointerEvent.LEAVE]: function (e) {
            e.current.fill = '#32cd79'
        }
    }
}, 100, 100, 200, 200)

leafer.add(rect)
```

## Using Strings 

Learn about the naming conventions of event type strings.

ts

```
rect.on('pointer.enter', onEnter)
rect.on('pointer.leave', onLeave)
```

## Removing Events 

ts

```
rect.off('pointer.enter', onEnter)
rect.off('pointer.leave', onLeave)
```

## Dispatching Events 

ts

```
rect.emit('pointer.enter', { current: rect })
```

## Understanding Element Interaction Properties 

| Name | Description |
| --- | --- |
| Interaction |  |
| hittable | Whether the element responds to mouse, touch, or other pointer interactions, similar to the CSS `pointer-events` property |
| hitChildren | Further defines interactivity of child elements |
| hitSelf | Further defines interactivity of the element itself (excluding children) |
| hitFill | Further defines interactivity of the element's fill. Setting to `pixel` enables pixel-level detection for PNG/SVG images, filtering transparent pixels |
| hitStroke | Further defines interactivity of the element's stroke |
| editable | Whether editing is allowed; requires installing the graphic editor plugin |
| draggable | Whether the element can be dragged |
| dragBounds | Restricts the draggable area of the element |
| dragBoundsType | Type of drag boundary, whether inside or outside the element |
| cursor | Cursor style when hovering over the element, supports all CSS cursor names |
| States |  |
| states | State list for predefining complex element/game states, supporting switching at any time, and transition effects; requires installing the state plugin |
| state | Current state; requires installing the state plugin |
| button | Marks element as a button; child elements will automatically sync interaction states such as state, hover, press; requires installing the state plugin |
| hoverStyle | Style applied when hovered; automatically restored on mouse leave; requires installing the state plugin |
| pressStyle | Style applied when pressed; automatically restored on release; requires installing the state plugin |
| focusStyle | Style applied when focused via `focus()`; restored when focus is lost; requires installing the state plugin |
| selected | Whether selected; requires installing the state plugin |
| selectedStyle | Style applied when `selected` is true; restored when false; requires installing the state plugin |
| disabled | Whether disabled; requires installing the state plugin |
| disabledStyle | Style applied when `disabled` is true; restored when false; requires installing the state plugin |

## Element Event Methods 

| Name | Description |
| --- | --- |
| on() | Listen to events |
| on\_() | Listen to events with a bound `this` context for the listener, returns an event id, used with off\_() |
| once() | Listen to an event only once |
| off() | Remove event listener |
| off\_() | Remove event listener, used with on\_() |
| emit() | Manually dispatch event |
| emitEvent() | Manually dispatch event; parameter must be an `IEvent` object |

## Related Events 

## Common Events 

### PointerEvent    DragEvent    DropEvent    SwipeEvent 

### MoveEvent    ZoomEvent    RotateEvent 

### ImageEvent    ChildEvent    PropertyEvent    BoundsEvent 

### LeaferEvent    ResizeEvent    KeyEvent 

### RenderEvent    LayoutEvent    WatchEvent 

## Next Step 

### Remove Elements 
