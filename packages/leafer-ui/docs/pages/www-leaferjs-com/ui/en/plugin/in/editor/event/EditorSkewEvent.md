<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/event/EditorSkewEvent.html -->

# EditorSkewEvent 

Editor skew events, listened via `app.editor.on()`.

The editor can modify skew data via the beforeSkew hook.

## Event Properties 

### worldOrigin: `IPointData` 

The center point used for transformation (world coordinates).

### skewX: `number` 

Skew value on the X axis (incremental).

### skewY: `number` 

Skew value on the Y axis (incremental).

### transform?: `IMatrixData` 

Transform data (incremental). When multiple elements are skewed, the editor internally applies transformations via transform operations.

## Event Names 

### EditorSkewEvent.BEFORE\_SKEW 

Before skew event.

`editor.before_skew`

### EditorSkewEvent.SKEW 

Skew event.

`editor.skew`

## Helper 

editor.editBox.dragPoint indicates the control point currently being operated.

## Inherited Events 

### Event 

## Example 

### Element skew event 

ts

```
// #图形编辑器 [倾斜元素事件]
import { App, Rect } from 'leafer-ui'
import { EditorSkewEvent } from '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 100, 100))
app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 300, 100))

app.editor.on(EditorSkewEvent.SKEW, (e: EditorSkewEvent) => {
    console.log(e.skewX, e.skewY)
})
```
