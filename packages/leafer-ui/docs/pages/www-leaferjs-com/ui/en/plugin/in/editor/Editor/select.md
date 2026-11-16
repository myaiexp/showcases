<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/Editor/select.html -->

# Select Elements 

## Key Methods 

### select(target: `UI` | `UI`[]) 

Select elements.

### cancel() 

Cancel the current selection.

### hasItem(item: `UI`): `boolean` 

Check whether an element is already selected.

### addItem(item: `UI`) 

Add an element to the selection list.

### removeItem(item: `UI`) 

Remove an element from the selection list.

## Belongs to 

### Editor Element 

## Example 

### Manually select elements 

ts

```
// #图形编辑器 [手动选择元素]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100))

setTimeout(() => {

    // 手动选择元素 
    app.editor.select(app.tree.children[1]) 

}, 1000)
```
