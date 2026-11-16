<!-- source: https://www.leaferjs.com/ui/en/reference/event/ui/Drop.html -->

# DropEvent 

Drag and drop event.

Inheritance

DropEvent  >  PointerEvent  >  UIEvent  >  Event

## Event Names 

### DropEvent.DROP 

Drop target event.

`drop`

## Key Properties 

### list: `ILeafList` 

List of objects to be dropped. This represents the currently dragged objects. Can be additionally set via DragEvent.setList().

### data?: `IObject` 

Custom data set via DragEvent.setData().

## Inherited Events 

### DropEvent  >  PointerEvent  >  UIEvent  >  Event 

## Example 

### Drop element into a Group 

simple.tssimple.js

ts

```
// #监听拖放事件
import { Leafer, Group, Rect, DropEvent, DragEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group({ x: 300, y: 300 })
const rect = new Rect({ fill: 'blue' })

leafer.add(new Rect({ fill: 'green', draggable: true }))
leafer.add(group)
group.add(rect)

group.on(DragEvent.ENTER, function () {
    DragEvent.setData({ data: 'drop data' })
    rect.set({ stroke: 'black', strokeWidth: 2 })
})

group.on(DragEvent.LEAVE, function () {
    rect.set({ stroke: '' })
})

group.on(DropEvent.DROP, function (e: DropEvent) {
    console.log(e.data)
    e.list.forEach((leaf) => {

        leaf.dropTo(group) // 放置元素到group中

    })
})
```

js

```
// #监听拖放事件
import { Leafer, Group, Rect, DropEvent, DragEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group({ x: 300, y: 300 })
const rect = new Rect({ fill: 'blue' })

leafer.add(new Rect({ fill: 'green', draggable: true }))
leafer.add(group)
group.add(rect)

group.on(DragEvent.ENTER, function () {
    DragEvent.setData({ data: 'drop data' })
    rect.set({ stroke: 'black', strokeWidth: 2 })
})

group.on(DragEvent.LEAVE, function () {
    rect.set({ stroke: '' })
})

group.on(DropEvent.DROP, function (e) {
    console.log(e.data)
    e.list.forEach((leaf) => {

        leaf.dropTo(group) // 放置元素到group中

    })
})
```
