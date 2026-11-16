<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/event/EditorScaleEvent.html -->

# EditorScaleEvent 

Editor resize (scale) events, listened via `app.editor.on()`.

The editor can modify scale data via the beforeScale hook.

## Event Properties 

### worldOrigin: `IPointData` 

The center point used for scaling (world coordinates).

### scaleX: `number` 

Scale value on the X axis (incremental).

### scaleY: `number` 

Scale value on the Y axis (incremental).

### transform?: `IMatrixData` 

Transform data (incremental). When multiple elements are resized, the editor internally applies transformations via transform operations.

## Event Names 

### EditorScaleEvent.BEFORE\_SCALE 

Before scale event (before resizing elements).

`editor.before_scale`

### EditorScaleEvent.SCALE 

Scale event (resizing elements).

`editor.scale`

## Helper 

editor.editBox.dragPoint indicates the control point currently being operated.

## Inherited Events 

### Event 

## Example 

### Element scale (resize) event 

ts

```
// #图形编辑器 [缩放元素事件（resize）]
import { App, Rect } from 'leafer-ui'
import { EditorScaleEvent } from '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 100, 100))
app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 300, 100))

app.editor.on(EditorScaleEvent.SCALE, (e: EditorScaleEvent) => {
    console.log(e.scaleX, e.scaleY, e.transform)
})
```
