<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/Event.html -->

# Editor Events 

## EditorEvent 

Base event.

Inherits Event.

### Event Properties 

### editor: `Editor` 

Editor instance.

### value: `UI` | `UI`[] 

Selected / hovered elements.

### oldValue: `UI` | `UI`[] 

Previous selected / hovered elements.

### list: `UI`[] 

Current selected / hovered element list. Empty if none.

### oldList: `UI`[] 

Previous selected / hovered element list. Empty if none.

### Event Names 

### EditorEvent.SELECT 

Select event.

Triggered on both select and deselect. Use editor.target to get selected elements.

`editor.select`

### EditorEvent.HOVER 

Hover event.

Triggered on both hover and un-hover. Use editor.hoverTarget to get hovered elements.

`editor.hover`

## EditorMoveEvent 

Move event.

Inherits EditorEvent.

### Event Properties 

### moveX: `number` 

Movement distance on the X axis (world coordinates).

### moveY: `number` 

Movement distance on the Y axis (world coordinates).

### Event Names 

### EditorMoveEvent.MOVE 

Move element event.

`editor.move`

## EditorScaleEvent 

Scale (resize) event.

Inherits EditorEvent.

### Event Properties 

### worldOrigin: `IPointData` 

Center point of transformation (world coordinates).

### scaleX: `number` 

Scale value on X axis.

### scaleY: `number` 

Scale value on Y axis.

### transform?: `IMatrixData` 

Transform data. When multiple elements are scaled, internal transform operations are applied.

### Event Names 

### EditorScaleEvent.SCALE 

Scale event (resize elements).

`editor.scale`

## EditorRotateEvent 

Rotate event.

Inherits EditorEvent.

### Event Properties 

### rotation: number 

Rotation angle.

### transform?: `IMatrixData` 

Transform data. When multiple elements are rotated, internal transform operations are applied.

### Event Names 

### EditorRotateEvent.ROTATE 

Rotate element event.

`editor.rotate`

## EditorSkewEvent 

Skew event.

Inherits EditorEvent.

### Event Properties 

### worldOrigin: `IPointData` 

Center point of transformation (world coordinates).

### skewX: `number` 

Skew value on X axis.

### skewY: `number` 

Skew value on Y axis.

### transform?: `IMatrixData` 

Transform data. When multiple elements are skewed, internal transform operations are applied.

### Event Names 

### EditorSkewEvent.SKEW 

Skew element event.

`editor.skew`

## Example 

### Listen to selection events 

ts

```
// #图形编辑器 [选中元素事件]
import { App, Rect } from 'leafer-ui'
import { EditorEvent } from '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 100, 100))
app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 300, 100))

app.editor.on(EditorEvent.SELECT, (e: EditorEvent) => {
    console.log(e.editor.list)
})
```
