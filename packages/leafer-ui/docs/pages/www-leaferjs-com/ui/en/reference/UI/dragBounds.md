<!-- source: https://www.leaferjs.com/ui/en/reference/UI/dragBounds.html -->

# dragBounds 

Restrict the draggable area of an element.

## Key Properties 

### dragBounds?: `IBoundsData` | `'parent'` 

Defines the draggable boundary of the element. `'parent'` means the element can only be dragged within its parent (only supported when the parent is a Box / Frame).

The graphic editor also supports widthRange / heightRange to constrain the element’s own size range.

### dragBoundsType?: `IDragBoundsType` 

Defines whether the drag bounds are calculated from inside or outside the element. Default is `'auto'`.

ts

```
type IDragBoundsType =
  | 'auto' // Automatically determined: outer when element is smaller than dragBounds, inner when larger
  | 'outer' // Drag range is outside the element; element is constrained within dragBounds
  | 'inner' // Drag range is inside the element; element always covers dragBounds
```

## Belongs to 

### UI Elements 

## Examples 

### Restrict dragging inside a Frame 

LeaferApp

ts

```
// #限制元素拖动范围 [在 Frame 内拖动 (Leafer)]
import { Leafer, Frame, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window, fill: '#333' })

const frame = new Frame({
    width: 200,
    height: 200
})

const rect = new Ellipse({
    width: 50,
    height: 50,
    fill: '#32cd79',
    dragBounds: 'parent', // 限制元素拖动范围
    draggable: true
})

leafer.add(frame)
frame.add(rect)
```

ts

```
// #限制元素拖动范围 [在 Frame 内拖动 (App)]
import { App, Frame, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {}, fill: '#333' })

const frame = new Frame({
    width: 200,
    height: 200
})

const rect = new Ellipse({
    width: 50,
    height: 50,
    fill: '#32cd79',
    dragBounds: 'parent', // 限制元素拖动范围
    draggable: true
})

app.tree.add(frame)
frame.add(rect)
```
