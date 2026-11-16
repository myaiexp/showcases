<!-- source: https://www.leaferjs.com/ui/en/reference/event/basic/Layout.html -->

# LayoutEvent 

Layout event.

To understand the trigger order of events, please refer to the render lifecycle diagram.

Inheritance

LayoutEvent  >  Event

## Key Properties 

### data: `ILayoutBlockData`[] 

Layout data.

### times: `number` 

Number of layout executions (the index of this layout within the current layout cycle).

## Event Names 

### LayoutEvent.REQUEST 

Request layout.

`layout.request`

### LayoutEvent.START 

Start a new layout cycle.

`layout.start`

### LayoutEvent.BEFORE 

Before a single layout pass.

`layout.before`

### LayoutEvent.LAYOUT 

Single layout pass (may occur multiple times).

`layout`

### LayoutEvent.AFTER 

After a single layout pass.

`layout.after`

### LayoutEvent.AGAIN 

Prepare for another layout pass.

`layout.again`

### LayoutEvent.END 

End of the layout cycle.

`layout.end`

## Inherited Events 

### LayoutEvent  >  Event 

## Example 

ts

```
// #监听布局事件
import { LayoutEvent, Leafer, Rect, } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

leafer.on(LayoutEvent.AFTER, function () {
    // layout after
    if (leafer.watcher.changed) {
        leafer.emit(LayoutEvent.AGAIN)
    }
})
```
