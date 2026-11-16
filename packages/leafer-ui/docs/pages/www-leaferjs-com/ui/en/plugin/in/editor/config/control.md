<!-- source: https://www.leaferjs.com/ui/en/plugin/in/editor/config/control.html -->

# Editor Configuration 

### Basic     Events     Style     Buttons     Cursor     Selection     Control     Enable     Inner Editor 

## 

Constraint configuration. Can be updated in real time during runtime via app.editor.config.

Each element also has an individual edit config that can override the global configuration in real time.

## Key Properties 

### around: `Around` 

Defines the pivot point for rotation, scaling, and skewing. Default is none.

Setting `'center'` means the center point `{x: 0.5, y: 0.5}`. Setting `{x:1, y:1}` means bottom-right corner, based on editor frame width/height ratio.

### rotateAround: `Around` 

Specifies a separate pivot point for rotation. Has higher priority than `around`.

### lockRatio: `boolean | 'corner'` 

Locks aspect ratio. Default is `false`.

Setting `'corner'` locks scaling ratio only at the four corners, while edge handles remain freely adjustable.

### rotateGap: `number` 

Rotation snapping interval. When close to these intervals, rotation will snap gradually. Default is every `45°`.

### dragLimitAnimate: `boolean | number` 

Whether constrained elements using dragBounds animate back to bounds on drag end. Default is `false` (real-time constraint).

You can set animation speed from `0.1 ~ 0.9`. `true` equals `0.3`.

This overrides Leafer's pointer.dragLimitAnimate setting.

## Examples 

### Scale from center point 

ts

```
// #图形编辑器 [按中心点缩放]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: { around: 'center' }
})

const rect = Rect.one({ editable: true, fill: '#32cd79', cornerRadius: 30 }, 100, 100)
app.tree.add(rect)

app.editor.select(rect)
```

### Fixed aspect ratio scaling 

ts

```
// #图形编辑器 [固定比例缩放]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: { lockRatio: true }
})

const rect = Rect.one({ editable: true, fill: '#32cd79', cornerRadius: 30 }, 100, 100)
app.tree.add(rect)

app.editor.select(rect)
```
