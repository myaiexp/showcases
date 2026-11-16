<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/event/InnerEditorEvent.html -->

# InnerEditorEvent 

Internal editor events, listened via `app.editor.on()`.

## Event Properties 

### editTarget: `UI` 

The target element being edited.

### innerEditor: `InnerEditor` 

The internal editor instance.

## Event Names 

### InnerEditorEvent.BEFORE\_OPEN 

Before open internal editor event.

`innerEditor.before_open`

### InnerEditorEvent.OPEN 

Open internal editor event.

`innerEditor.open`

### InnerEditorEvent.BEFORE\_CLOSE 

Before close internal editor event.

`innerEditor.before_close`

### InnerEditorEvent.CLOSE 

Close internal editor event.

`innerEditor.close`

## Inherited Events 

### Event 

## Example 

### Open internal editor event 

ts

```
// #图形编辑器 [打开内部编辑器事件]
import { App, Text } from 'leafer-ui'
import { InnerEditorEvent } from '@leafer-in/editor' // 导入图形编辑器插件  
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

app.editor.on(InnerEditorEvent.OPEN, (e: InnerEditorEvent) => {
    console.log(e.editTarget, e.innerEditor)
})
```
