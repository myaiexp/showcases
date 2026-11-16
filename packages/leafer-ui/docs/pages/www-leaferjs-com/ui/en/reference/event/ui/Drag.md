<!-- source: https://www.leaferjs.com/ui/en/reference/event/ui/Drag.html -->

# DragEvent 

Drag event.

Inheritance

DragEvent  >  PointerEvent  >  UIEvent  >  Event

  

When imported via a `<script>` tag, use the alias **MyDragEvent** instead.

## Event Names 

### DragEvent.START 

Start dragging event.

`drag.start`

### DragEvent.DRAG 

Dragging in progress.

`drag`

### DragEvent.END 

End dragging event.

`drag.end`

### DragEvent.ANIMATE 

Reset animation event triggered after dragging ends.

`drag.animate`

### State Events 

These events are triggered by elements encountered during dragging. They can be used with DropEvent to implement enter/leave effects before `drop`.

### DragEvent.OVER 

Dragged element over another element.

`drag.over`

### DragEvent.OUT 

Dragged element out of another element.

`drag.out`

### DragEvent.ENTER 

Dragged element enters another element.

`drag.enter`

### DragEvent.LEAVE 

Dragged element leaves another element.

`drag.leave`

## Key Properties 

### moveX: `number` 

X-axis offset of the drag event (world coordinates).

### moveY: `number` 

Y-axis offset of the drag event (world coordinates).

### totalX: `number` 

Total X-axis movement of the current drag session (world coordinates).

### totalY: `number` 

Total Y-axis movement of the current drag session (world coordinates).

## Coordinate Conversion Methods 

### Move distance 

Conversion methods for `moveX`, `moveY`.

### getPageMove ( ): `IPointData` 

Get movement offset in page coordinate space.

### getInnerMove ( relative?: `UI`): `IPointData` 

Get movement relative to the inner coordinate system of a given element. If `relative` is not provided, defaults to the current listening element.

### getLocalMove ( relative: `UI`): `IPointData` 

Get movement relative to the local coordinate system of a given element. If `relative` is not provided, defaults to the current listening element.

### Total movement 

Conversion methods for `totalX`, `totalY`.

### getPageTotal ( ): `IPointData` 

Get total movement in page coordinate space.

### getInnerTotal ( relative?: `UI`): `IPointData` 

Get total movement relative to the inner coordinate system of a given element.

### getLocalTotal ( relative: `UI`): `IPointData` 

Get total movement relative to the local coordinate system of a given element.

### Drag area 

### getPageBounds ( ): `IBoundsData` 

Get the drag area in page coordinate space. Useful for quickly creating shapes.

## Static Methods 

### DragEvent.setList ( list: `ILeaf` | `ILeaf`[] | `ILeafList` ) 

Manually set the list of draggable objects (they will follow the pointer movement). Automatically reset after the `drop` event is triggered.

### DragEvent.setData ( data: `IObject` ) 

Set drag data. Automatically reset after the `drop` event is triggered.

## Inherited Events 

### DragEvent  >  PointerEvent  >  UIEvent  >  Event 

## Example 

### Manual dragging of elements 

Elements with default draggable enabled or set via DragEvent.setList() will be automatically draggable.

simple.tssimple.js

ts

```
// #监听拖拽事件
import { Leafer, Rect, DragEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 200, y: 100, fill: '#32cd79' })

leafer.rotation = 30
leafer.add(rect)

rect.on(DragEvent.DRAG, function (e: DragEvent) {
    e.current.moveWorld(e.moveX, e.moveY)
})
```

js

```
// #监听拖拽事件
import { Leafer, Rect, DragEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 200, y: 100, fill: '#32cd79' })

leafer.rotation = 30
leafer.add(rect)

rect.on(DragEvent.DRAG, function (e) {
    e.current.moveWorld(e.moveX, e.moveY)
})
```

### Check if an element is being dragged 

ts

```
leafer.interaction.isDrag(leaf)
```

### Pen tool 

Start drawing lines by dragging with the mouse. The canvas can still be zoomed and panned.

draw.tsdraw.js

ts

```
// #画笔工具示例
import { Leafer, DragEvent, Pen } from 'leafer-ui'
import '@leafer-in/viewport'

const leafer = new Leafer({ view: window, type: 'design', fill: '#333', })

leafer.add({ tag: 'Text', x: 100, y: 100, text: '按下鼠标拖动开始画线，抬起结束', fill: '#999', fontSize: 16 })

const pen = new Pen()
leafer.add(pen)

// 按下鼠标拖动开始画线，抬起结束，当缩放平移视图后，仍然可以准确绘制新的线条
leafer.on(DragEvent.START, (e: DragEvent) => {
    const point = e.getPagePoint() // 转换事件为 page 坐标 = pen.getPagePoint(e)
    pen.setStyle({ stroke: '#32cd79', strokeWidth: 10, strokeCap: 'round', strokeJoin: 'round' })
    pen.moveTo(point.x, point.y)
})

leafer.on(DragEvent.DRAG, (e: DragEvent) => {
    const point = e.getPagePoint() // 转换事件为 page 坐标 = pen.getPagePoint(e)
    pen.lineTo(point.x, point.y)
})
```

js

```
// #画笔工具示例
import { Leafer, DragEvent, Pen } from 'leafer-ui'
import '@leafer-in/viewport'

const leafer = new Leafer({ view: window, type: 'design', fill: '#333', })

leafer.add({ tag: 'Text', x: 100, y: 100, text: '按下鼠标拖动开始画线，抬起结束', fill: '#999', fontSize: 16 })

const pen = new Pen()
leafer.add(pen)

// 按下鼠标拖动开始画线，抬起结束，当缩放平移视图后，仍然可以准确绘制新的线条
leafer.on(DragEvent.START, (e) => {
    const inner = e.getPagePoint() // 转换事件为 page 坐标 = pen.getPagePoint(e)
    pen.setStyle({ stroke: '#32cd79', strokeWidth: 10, strokeCap: 'round', strokeJoin: 'round' })
    pen.moveTo(inner.x, inner.y)
})

leafer.on(DragEvent.DRAG, (e) => {
    const inner = e.getPagePoint() // 转换事件为 page 坐标 = pen.getPagePoint(e)
    pen.lineTo(inner.x, inner.y)
})
```
