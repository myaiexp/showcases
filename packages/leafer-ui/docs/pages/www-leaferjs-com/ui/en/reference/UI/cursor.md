<!-- source: https://www.leaferjs.com/ui/en/reference/UI/cursor.html -->

# cursor 

Set the cursor for an element. Hover over the shapes below to see the effect.

## Key Properties 

### cursor: `ICursorType` | `ICursorType`[] 

The cursor style displayed when hovering over the element. Supports all CSS cursor names.

You can also set an image object as the cursor, with optional offset.

ts

```
type ICursorType =
  | IImageCursor
  | ''
  | 'auto'
  | 'default'
  | 'none'
  | 'context-menu'
  | 'help'
  | 'pointer'
  | 'progress'
  | 'wait'
  | 'cell'
  | 'crosshair'
  | 'text'
  | 'vertical-text'
  | 'alias'
  | 'copy'
  | 'move'
  | 'no-drop'
  | 'not-allowed'
  | 'grab'
  | 'grabbing'
  | 'e-resize'
  | 'n-resize'
  | 'ne-resize'
  | 'nw-resize'
  | 's-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'w-resize'
  | 'ew-resize'
  | 'ns-resize'
  | 'nesw-resize'
  | 'nwse-resize'
  | 'col-resize'
  | 'row-resize'
  | 'all-scroll'
  | 'zoom -in'
  | 'zoom-out'

interface IImageCursor {
  url: string
  x?: number
  y?: number
}
```

## Custom Cursor 

You can replace system cursor names or register custom cursor names via `Cursor.set()`.

ts

```
// #光标样式 [覆盖系统光标 (Leafer)]
import { Cursor } from 'leafer-ui'

Cursor.set('pointer', { url: 'https://leaferjs.com/image/cursor.svg' }) // 替换pointer光标

Cursor.set('pointer_custom', { url: 'https://leaferjs.com/image/cursor.svg' }) // 注册自定义光标名
```

## Manual Update 

Leafer supports manually forcing cursor updates via updateCursor().

## Disable Cursor 

You can disable cursor functionality at any time via app.config.cursor. After disabling, you can fully customize cursor behavior.

## Belongs to 

### UI Elements 

## Examples 

### Set cursor 

LeaferApp

ts

```
// #光标样式 [设置光标 (Leafer)]
import { Leafer, Polygon } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const polygon = new Polygon({
    width: 100,
    height: 100,
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90, 90, 90, 10, 90],
    curve: true,
    fill: '#32cd79',
    cursor: 'no-drop'
})

leafer.add(polygon)
```

ts

```
// #光标样式 [设置光标 (App)]
import { App, Polygon } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const polygon = new Polygon({
    width: 100,
    height: 100,
    points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90, 90, 90, 10, 90],
    curve: true,
    fill: '#32cd79',
    cursor: 'no-drop'
})

app.tree.add(polygon)
```

### Set image cursor 

Supports png and svg images. Offset values `x` and `y` are optional.

LeaferApp

ts

```
// #光标样式 [设置图片光标 (Leafer)]
import { Leafer, Polygon } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const polygon = new Polygon({
    width: 100,
    height: 100,
    points: [0, 90, 20, 60, 40, 80, 60, 40, 75, 50, 90, 10, 100, 90, 100, 90, 0, 90],
    curve: true,
    fill: '#32cd79',
    cursor: { url: 'https://leaferjs.com/image/cursor.svg', x: 2, y: 2 }
})

leafer.add(polygon)
```

ts

```
// #光标样式 [设置图片光标 (App)]
import { App, Polygon } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const polygon = new Polygon({
    width: 100,
    height: 100,
    points: [0, 90, 20, 60, 40, 80, 60, 40, 75, 50, 90, 10, 100, 90, 100, 90, 0, 90],
    curve: true,
    fill: '#32cd79',
    cursor: { url: 'https://leaferjs.com/image/cursor.svg', x: 2, y: 2 }
})

app.tree.add(polygon)
```
