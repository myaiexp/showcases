<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/Editor/display.html -->

# Display Elements 

## Key Properties 

### buttons: `Group` 

Button group used to place custom buttons. It is aligned using overall around alignment and located at the bottom of the editor. It can be configured.

### editBox: `EditBox` 

Edit box responsible for rendering and interaction of the selection frame.

### editTool: `EditTool` 

The currently active editing tool.

Used to edit element size and shape. It is automatically loaded when an element is selected. You can customize editing tools.

### innerEditor: `InnerEditor` 

The currently active internal editor.

Used to edit internal details such as text and paths, opened by double-clicking an element. You can customize internal editors.

### selector: `IEditSelect` 

Selector responsible for single selection, multi-selection, and box selection interactions, and for rendering selection and hover outlines.

## Belongs to 

### Editor Element 

## Example 

### Add bottom fixed buttons 

Even after rotating or flipping elements, the buttons remain in a fixed orientation. You can configure the positioning of the button group.

ts

```
// #图形编辑器 [添加底部固定按钮]
import { App, Rect, Box, PointerEvent } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: { buttonsFixed: true }
})

const rect = Rect.one({ editable: true, fill: '#32cd79' }, 100, 100)
app.tree.add(rect)
app.tree.add(Rect.one({ editable: true, fill: '#32cd79' }, 100, 300))

const button = Box.one({  // [!code hl:9] // 添加移除按钮
    around: 'center',
    fill: '#FEB027',
    cornerRadius: 20,
    cursor: 'pointer',
    children: [{ tag: 'Text', fill: 'white', text: '移除', padding: [7, 10] }]
})

app.editor.buttons.add(button)

button.on(PointerEvent.TAP, () => { // 点击删除元素，并取消选择
    app.editor.list.forEach(rect => rect.remove())
    app.editor.target = null
})

app.editor.select(rect)
```
