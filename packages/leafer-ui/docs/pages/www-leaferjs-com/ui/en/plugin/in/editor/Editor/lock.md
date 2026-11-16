<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/Editor/lock.html -->

# Lock 

## Key Methods 

### lock() 

Lock the selected elements.

Locked elements can still be selected, but cannot be edited.

### unlock() 

Unlock the selected elements.

## Belongs to 

### Editor Element 

## Example 

### Manually lock elements 

ts

```
// #图形编辑器 [手动锁定元素]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100))

app.editor.select(app.tree.children[0])

setTimeout(() => {

    // 手动锁定元素 
    app.editor.lock() 

}, 1000)
```
