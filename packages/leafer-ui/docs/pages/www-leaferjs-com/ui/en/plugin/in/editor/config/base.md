<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/config/base.html -->

# Editor Configuration 

### Basic     Events     Style     Buttons     Cursor     Selection     Control     Enable     Inner Editor 

## 

Basic configuration. The engine can update it in real time via app.editor.config.

Each element also has an individual edit config that can override the global configuration in real time.

## Key Properties 

### editSize: `'size'` | `'scale'` | `'font-size'` 

Method used to resize elements. Default is `size`.

* `size`: adjusts element **width/height or path** to resize
* `font-size`: adjusts text **fontSize** to resize
* `scale`: adjusts element **scale** to resize

Different elements can set editSize independently.

## Visibility 

### hideOnMove: `boolean` 

Whether to hide the editor while moving elements. Default is `false`.

### hideOnSmall: `boolean | number` 

Whether to hide editor controls when the element is too small. Default is `true`.

You can also set a minimum size threshold. Default minimum is `10` (meaning 10×10).

### hideResizeLines: `boolean` 

Whether to hide resize control lines.

### hideRotatePoints: `boolean` 

Whether to hide rotation control points.

## Pixel Alignment 

### ignorePixelSnap: `boolean` 

Ignore pixel snapping for selected elements to prevent jitter caused by pixel alignment.

Note: the sky layer must set pixelSnap to `false`, otherwise the editor may still jitter.

## Examples 

### Drag control points to change font size, drag border to resize text 

ts

```
// #图形编辑器 [拖拽控制点修改字体大小，拖拽边框控制文本宽高]
import { App, Text } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/text-editor' // 导入文本编辑插件 (可选)
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {
        editSize: 'size', // 默认修改元素宽高
        point: {
            editConfig: { editSize: 'font-size' } // 拖拽控制点修改字体大小
        }
    }
})

const text = Text.one({
    text: 'Action is the proper fruit of knowledge.',
    editable: true, fill: '#FFE04B', fontSize: 16,
}, 100, 100, 100)

app.tree.add(text)

app.editor.select(text)
```

### Hide editor while moving elements 

ts

```
// #图形编辑器 [移动元素时隐藏编辑框]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: { hideOnMove: true }
})

const rect = Rect.one({ editable: true, fill: '#32cd79', cornerRadius: 30 }, 100, 100)
app.tree.add(rect)

app.editor.select(rect)
```
