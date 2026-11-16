<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/Editor/innerEditor.html -->

# Internal Editor 

## Key Methods 

### getInnerEditor(name: `string`): `innerEditor` 

Get the internal editor instance (singleton). `name` is the name of the internal editor.

ts

```
// Configure text editor
app.editor.getInnerEditor('TextEditor').config.selectAll = false
```

### openInnerEditor(target?: `UI`, nameOrSelect?: `string`, select?: `boolean`) 

Open the internal editor for an element.

An optional `target` can be passed for editing.

The `nameOrSelect` parameter can specify the name of the internal editor, and `select` indicates whether to select the target at the same time.

ts

```
app.editor.openInnerEditor(rect, true)
app.editor.openInnerEditor(rect, 'ClipEditor', true) // specify internal editor name
```

### closeInnerEditor() 

Close the internal editor.

## Belongs to 

### Editor Element 

## Example 

### Manually open internal editor 

Enter text editing mode.

ts

```
// #图形编辑器 [打开内部编辑器]
import { App, Text } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件  
import '@leafer-in/viewport' // 导入视口插件（可选）
import '@leafer-in/text-editor' // 导入文本编辑插件

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Text.one({
    text: 'Action is the proper fruit of knowledge.',
    editable: true, fill: '#FFE04B', fontSize: 16,
}, 100, 100, 100))


setTimeout(() => {

    // 手动选择元文本并打开内部编辑器，进入编辑文本状态
    app.editor.openInnerEditor(app.tree.children[0], true) 

}, 1000)
```
