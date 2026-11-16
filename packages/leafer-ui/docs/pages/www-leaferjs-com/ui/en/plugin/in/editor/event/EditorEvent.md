<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/event/EditorEvent.html -->

# EditorEvent 

Editor selection / deselection events, listened via `app.editor.on()`.

The editor can modify selection data through the beforeSelect hook in the configuration.

## Event Properties 

### editor: `Editor` 

The editor instance.

### value: `UI` | `UI`[] 

Selected / hovered elements.

### oldValue: `UI` | `UI`[] 

Previous selected / hovered elements.

### list: `UI`[] 

Current selected / hovered element list. Empty array if none.

### oldList: `UI`[] 

Previous selected / hovered element list. Empty array if none.

## Event Names 

### EditorEvent.BEFORE\_SELECT 

Before-select event.

`editor.before_select`

### EditorEvent.SELECT 

Select event.

Triggered on both select and deselect. Use editor.target to get the selected elements.

`editor.select`

### EditorEvent.BEFORE\_HOVER 

Before-hover event.

`editor.before_hover`

### EditorEvent.HOVER 

Hover event.

Triggered on both hover and un-hover. Use editor.hoverTarget to get the hovered elements.

`editor.hover`

## Inherited Events 

### Event 

## Example 

### Listen to selection events 

select.tsselect.js

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

js

```
import { App, Rect } from 'leafer-ui'
import { EditorEvent } from '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 100, 100))
app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, 300, 100))

app.editor.on(EditorEvent.SELECT, (e) => {
    console.log(e.editor.list)
})
```
