<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/Editor/list.html -->

# Element List 

## Key Properties 

### list: `UI`[] 

The currently selected element list (read-only). Returns an empty array when nothing is selected.

### High-performance list 

### leafList: `LeafList` 

The currently selected element list object (read-only). Returns an empty list object when nothing is selected.

### openedGroupList: `LeafList` 

The list object of groups currently in the opened state (read-only). Returns an empty list object when no groups are open.

## Belongs to 

### Editor Element 

## Example 

### Print selected element list 

ts

```
// #图形编辑器 [选中的元素列表]
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

// 打印选中的元素列表： [Rect]
console.log(app.editor.list)
```
