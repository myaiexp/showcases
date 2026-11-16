<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/config/enable.html -->

# Editor Configuration 

### Basic     Events     Style     Buttons     Cursor     Selection     Control     Enable     Inner Editor 

## 

Enable feature configuration. Can be updated in real time during runtime via app.editor.config.

Each element also has an individual edit config that can override the global configuration in real time.

## Key Properties 

### moveable: `boolean | 'move'` 

Whether moving is enabled. Default is enabled.

Set to `move` to enable dual-finger drag gestures on mobile devices.

### resizeable: `boolean | 'zoom'` 

Whether resizing is enabled. Default is enabled.

Set to `zoom` to enable pinch-to-zoom gestures on mobile devices.

### flipable: `boolean` 

Whether flip/mirror functionality is enabled. Default is enabled.

### rotateable: `boolean | 'rotate'` 

Whether rotation is enabled. Default is enabled.

Set to `rotate` to enable rotation gestures on mobile devices.

### skewable: `boolean` 

Whether skewing is enabled. Default is enabled.

## Examples 

### Disable rotation 

ts

```
// #图形编辑器 [禁用旋转]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: { rotateable: false }
})

const rect = Rect.one({ editable: true, fill: '#32cd79', cornerRadius: 30 }, 100, 100)
app.tree.add(rect)

app.editor.select(rect)
```

### Disable resizing 

ts

```
// #图形编辑器 [禁用缩放]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: { resizeable: false }
})

const rect = Rect.one({ editable: true, fill: '#32cd79', cornerRadius: 30 }, 100, 100)
app.tree.add(rect)

app.editor.select(rect)
```

### Mobile gesture interaction 

ts

```
// #图形编辑器 [手势操作元素]
import { App, Rect, Frame } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件

const app = new App({
    view: window,
    fill: '#333',
    mobile: true, // 适配移动端
    // multiTouch: {  singleGesture: true }, // 可配置锁定单一手势操作
    editor: { moveable: 'gesture', resizeable: 'gesture', rotateable: 'gesture' }  //  编辑元素支持手势操作
})

app.tree.add(Frame.one({ // 页面内容
    children: [
        Rect.one({ editable: true, fill: '#FEB027', dragBounds: 'parent', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100)
    ]
}, 100, 100, 500, 600))
```
