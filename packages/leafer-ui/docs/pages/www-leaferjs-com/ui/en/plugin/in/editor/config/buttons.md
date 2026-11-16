<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/config/buttons.html -->

# Editor Configuration 

### Basic     Events     Style     Buttons     Cursor     Selection     Control     Enable     Inner Editor 

## 

Button group configuration. Can be updated in real time during runtime via app.editor.config.

Each element also has an individual edit config that can override the global configuration in real time.

## Key Properties 

### buttonsDirection: `'top'` | `'right'` | `'bottom'` | `'left'` 

Position of the button group. Default is `bottom`.

### buttonsFixed: `boolean` 

Whether the button group keeps a fixed direction (not affected by element rotation).

### buttonsMargin: `number` 

Outer margin between the button group and the editor frame. Default is `12`.

## Example 

### Add bottom fixed buttons 

Buttons remain fixed in direction even when the element is rotated or flipped.

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
