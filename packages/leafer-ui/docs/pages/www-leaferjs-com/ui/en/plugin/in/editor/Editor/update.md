<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/Editor/update.html -->

# Update 

## Key Methods 

### update() 

Manually update the editor layout, styles, etc.

### updateEditBox() 

Manually update the edit box to fit the element. This is typically used after aligning multiple selected elements.

## Edit Tools 

### getEditTool(name: `string`): `EditTool` 

Get an edit tool instance (singleton). `name` is the name of the internal editor.

ts

```
// Get configuration of the line edit tool
const config = app.editor.getEditTool('LineEditTool').config
```

### updateEditTool() 

Update the edit tool. This method is automatically called after selecting elements.

## Belongs to 

### Editor Element 

## Example 

### Update editor 

Make configured middle control points appear immediately.

ts

```
// #图形编辑器 [更新编辑器]
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

    // 更新编辑器
    app.editor.config.middlePoint = {} // 显示中间控制点
    app.editor.update() 

}, 1000)
```
