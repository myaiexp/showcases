<!-- source: https://www.leaferjs.com/ui/en/reference/event/ui/Rotate.html -->

# RotateEvent 

Rotation event, typically used to rotate the view or elements in viewport interaction.

1. Mobile: two-finger rotation
2. Touchpad: two-finger rotation (Safari only)

Inheritance

RotateEvent  >  PointerEvent  >  UIEvent  >  Event

  

Requires installing the viewport plugin, or directly installing leafer-editor (which already includes this plugin).

## Event Names 

### RotateEvent.START 

Start rotation event.

`rotate.start`

### RotateEvent.ROTATE 

Rotation event.

`rotate`

### RotateEvent.END 

End rotation event.

`rotate.end`

## Key Properties 

### rotation: `number` 

Angle change in this rotation event.

### totalRotation: `number` 

Total accumulated rotation in the current session.

### multiTouch: `boolean` 

Whether the event is triggered by multi-touch input.

## Inherited Events 

### RotateEvent  >  PointerEvent  >  UIEvent  >  Event 

## Example 

simple.tssimple.js

ts

```
// #监听旋转交互事件
import { Leafer, Rect, RotateEvent, LeafHelper } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({
    view: window,
    type: 'custom'
})

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

leafer.on(RotateEvent.ROTATE, function (e: RotateEvent) {
    const center = { x: e.x, y: e.y }
    LeafHelper.rotateOfWorld(leafer, center, e.rotation)
})
```

js

```
// #监听旋转交互事件
import { Leafer, Rect, RotateEvent, LeafHelper } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({
    view: window,
    type: 'custom'
})

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

leafer.on(RotateEvent.ROTATE, function (e) {
    const center = { x: e.x, y: e.y }
    LeafHelper.rotateOfWorld(leafer, center, e.rotation)
})
```
