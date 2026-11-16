<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/event/EditorRotateEvent.html -->

# EditorRotateEvent 

Editor rotation events, listened via `app.editor.on()`.

The editor can modify rotation data via the beforeRotate hook.

## Event Properties 

### rotation: `number` 

Rotation angle (incremental).

### transform?: `IMatrixData` 

Transform data (incremental). When multiple elements are selected and rotated, the editor applies transformations internally via transform operations.

## Event Names 

### EditorRotateEvent.BEFORE\_ROTATE 

Before rotate event.

`editor.before_rotate`

### EditorRotateEvent.ROTATE 

Rotate event.

`editor.rotate`

## Helper 

editor.editBox.dragPoint indicates the control point currently being operated.

## Inherited Events 

### Event 

## Example 

### Element rotation event 

ts

```
// #图形编辑器 [旋转元素事件]
import { App, Rect } from 'leafer-ui'
import { EditorRotateEvent } from '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 100, 100))
app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 300, 100))

app.editor.on(EditorRotateEvent.ROTATE, (e: EditorRotateEvent) => {
    console.log(e.rotation)
})
```
