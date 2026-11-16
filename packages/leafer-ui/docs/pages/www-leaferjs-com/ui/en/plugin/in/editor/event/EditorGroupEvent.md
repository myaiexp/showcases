<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/event/EditorGroupEvent.html -->

# EditorGroupEvent 

Editor grouping events, listened via `app.editor.on()`.

## Event Properties 

### editTarget: `Group` 

The target group currently being operated on.

## Event Names 

### EditorGroupEvent.BEFORE\_GROUP 

Before group event.

`editor.before_group`

### EditorGroupEvent.GROUP 

Group event.

`editor.group`

### EditorGroupEvent.BEFORE\_UNGROUP 

Before ungroup event.

`editor.before_ungroup`

### EditorGroupEvent.UNGROUP 

Ungroup event.

`editor.ungroup`

### EditorGroupEvent.BEFORE\_OPEN 

Before double-click open group event.

`editor.before_open_group`

### EditorGroupEvent.OPEN 

Double-click open group event.

`editor.open_group`

### EditorGroupEvent.BEFORE\_CLOSE 

Before closing an opened group event.

`editor.before_close_group`

### EditorGroupEvent.CLOSE 

Close opened group event.

`editor.close_group`

## Inherited Events 

### Event 

## Example 

### Element grouping events 

ts

```
// #图形编辑器 [元素编组事件]
import { App, Rect } from 'leafer-ui'
import { EditorGroupEvent } from '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 100, 100))
app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 300, 100))

setTimeout(() => {

    // 手动选择并编组元素 
    app.editor.select(app.tree.children)
    app.editor.group()

}, 1000)

app.editor.on(EditorGroupEvent.GROUP, (e: EditorGroupEvent) => {
    console.log(e.editTarget)
})
```
