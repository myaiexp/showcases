<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/event/EditorMoveEvent.html -->

# EditorMoveEvent 

Editor move events, listened via `app.editor.on()`.

The editor can modify movement data via the beforeMove hook.

## Event Properties 

### moveX: `number` 

Movement distance on the X axis (world coordinates).

### moveY: `number` 

Movement distance on the Y axis (world coordinates).

## Event Names 

### EditorMoveEvent.BEFORE\_MOVE 

Before move event.

`editor.before_move`

### EditorMoveEvent.MOVE 

Move event.

`editor.move`

## Inherited Events 

### Event 

## Example 

### Element move events 

ts

```
// #图形编辑器 [移动元素事件]
import { App, Rect } from 'leafer-ui'
import { EditorMoveEvent } from '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 100, 100))
app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 300, 100))

app.editor.on(EditorMoveEvent.MOVE, (e: EditorMoveEvent) => {
    console.log(e.moveX, e.moveY)
})
```
