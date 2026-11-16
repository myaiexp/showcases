<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/Editor/group.html -->

# Grouping 

## Key Methods 

### group(custom: `IGroup` | `IGroupInputData`): `IGroup` 

Groups the selected elements. You can pass in a custom Group instance or a JSON object.

The new group will include the following additional properties:

ts

```
group.editable = true
group.hitChildren = false
```

### ungroup(): `UI`[] 

Ungroups the selected elements.

Note that Box / Frame elements do not support ungrouping to prevent issues. If you need grouping/ungrouping, please use Group elements instead.

### Group control 

### openGroup(`IGroup`) 

Opens a group, simulating the behavior of double-clicking to enter a group.

### closeGroup(`IGroup`) 

Closes a group.

## Belongs to 

### Editor Element 

## Example 

### Manually group elements 

ts

```
// #图形编辑器 [手动编组元素]
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

    // 手动选择并编组元素 
    app.editor.select(app.tree.children)
    app.editor.group() 

}, 1000)
```
