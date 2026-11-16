<!-- source: https://www.leaferjs.com/ui/en/reference/event/ui/Zoom.html -->

# ZoomEvent 

Zoom event, typically used to scale the view or elements in viewport interaction.

1. Mobile / touchpad: pinch with two fingers.
2. Mouse: Ctrl / Command + scroll wheel.

Inheritance

ZoomEvent  >  PointerEvent  >  UIEvent  >  Event

  

Requires installing the viewport plugin, or directly installing leafer-editor (which already includes this plugin).

## Event Names 

### ZoomEvent.START 

Start zoom event.

`zoom.start`

### ZoomEvent.ZOOM 

Zoom event.

`zoom`

### ZoomEvent.END 

End zoom event.

`zoom.end`

## Key Properties 

### scale: `number` 

Scale change in this zoom event.

### totalScale: `number` 

Total accumulated scale change in the current session.

### multiTouch: `boolean` 

Whether the event is triggered by multi-touch input.

## Inherited Events 

### ZoomEvent  >  PointerEvent  >  UIEvent  >  Event 

## Example 

simple.tssimple.js

ts

```
// #监听缩放交互事件
import { Leafer, Rect, ZoomEvent, LeafHelper } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({
    view: window,
    type: 'custom'
})

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

leafer.on(ZoomEvent.ZOOM, function (e: ZoomEvent) {
    const center = { x: e.x, y: e.y }
    LeafHelper.zoomOfWorld(leafer, center, e.scale)
})
```

js

```
// #监听缩放交互事件
import { Leafer, Rect, ZoomEvent, LeafHelper } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件

const leafer = new Leafer({
    view: window,
    type: 'custom'
})

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

leafer.on(ZoomEvent.ZOOM, function (e) {
    const center = { x: e.x, y: e.y }
    LeafHelper.zoomOfWorld(leafer, center, e.scale)
})
```
