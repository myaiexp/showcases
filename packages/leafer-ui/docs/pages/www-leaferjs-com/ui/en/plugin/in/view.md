<!-- source: https://www.leaferjs.com/ui/en/plugin/in/view/ -->

# View Control 

Controls viewport zooming. Supports zoom in, zoom out, fit, fit-width, fit-height, focusing on elements, and focusing on regions.

## Install Plugin 

You need to install the view plugin to use it. Visit Github repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/view
```

sh

```
pnpm add @leafer-in/view
```

sh

```
yarn add @leafer-in/view
```

sh

```
bun add @leafer-in/view
```

Or include via script tag and access plugin features through the global variable `LeaferIN.view`.

view.minview

html

```
<script src="https://unpkg.com/@leafer-in/view@2.3.4/dist/view.min.js"></script>
```

html

```
<script src="https://unpkg.com/@leafer-in/view@2.3.4/dist/view.js"></script>
```

## Belongs To 

### Leafer Element 

## Key Method 

### zoom ( zoomType: `IZoomType`, padding?: `IFourNumber`, scroll?: `boolean` | `'x'` | `'y'`, transition?: `ITranstion`): `IBoundsData` 

`zoomType` defines the zoom behavior. Supports zoom in, zoom out, fit, fit-width, fit-height, focusing on elements or regions.

`padding` defines the margin around the viewport (only valid for `fit`, element, or region focus).

`scroll` indicates whether to only pan without scaling. You can restrict panning to x-axis or y-axis only.

`transition` enables animated transitions.

The function returns the focused bounds after zooming (in world coordinates).

ts

```
type IZoomType =
  | 'in' // zoom in (from canvas center)
  | 'out' // zoom out
  | 'fit' // fit to screen and center
  | 'fit-width' // fit to width
  | 'fit-height' // fit to height
  | number // specific scale (from canvas center)
  | IUI // focus on a specific element
  | IUI[] // focus on multiple elements
  | IBoundsData // focus on a specific region (page coordinates)
```

ts

```
// fit to screen and center
leafer.zoom('fit')

// animation transition
leafer.zoom('fit', 0, null, true)

leafer.zoom('fit', 0, null, 2) // transition duration: 2 seconds
```

## Examples 

### Zoom in 

ts

```
// #视图控制 [放大]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件（可选）
import '@leafer-in/view' // 导入视图控制插件

const app = new App({ view: window, editor: {} })

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 500, 400))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 650, 400))

setTimeout(() => {

    app.tree.zoom('in') 

}, 1000)
```

### Zoom out 

ts

```
// #视图控制 [缩小]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件（可选）
import '@leafer-in/view' // 导入视图控制插件

const app = new App({ view: window, editor: {} })

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 500, 400))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 650, 400))

setTimeout(() => {

    app.tree.zoom('out') 

}, 1000)
```

### Set zoom scale 

ts

```
// #视图控制 [指定缩放值]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件（可选）
import '@leafer-in/view' // 导入视图控制插件

const app = new App({ view: window, editor: {} })

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 500, 400))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 650, 400))

setTimeout(() => {

    app.tree.zoom(1.5) 

}, 1000)
```

### Fit to screen 

ts

```
// #视图控制 [缩放到合适大小]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件（可选）
import '@leafer-in/view' // 导入视图控制插件

const app = new App({ view: window, editor: {} })

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 500, 400))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 650, 400))

setTimeout(() => {

    app.tree.zoom('fit', 100) 

}, 1000)
```

### Center canvas content 

ts

```
// #视图控制 [让画布内容居中显示]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件（可选）
import '@leafer-in/view' // 导入视图控制插件

const app = new App({ view: window, editor: {} })

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 500, 400))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 650, 400))

setTimeout(() => {

    app.tree.zoom('fit', 0, true) 

}, 1000)
```

### Focus on element 

ts

```
// #视图控制 [聚焦到指定元素]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件（可选）
import '@leafer-in/view' // 导入视图控制插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 500, 400)
app.tree.add(rect)
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 650, 400))

setTimeout(() => {

    app.tree.zoom(rect, [100, 50]) 

}, 1000)
```

Pan only (no scaling)

ts

```
// #视图控制 [聚焦到指定元素 - 不缩放画布，只进行位移]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件（可选）
import '@leafer-in/view' // 导入视图控制插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100)
app.tree.add(rect)
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100))

setTimeout(() => {

    app.tree.zoom(rect, 0, true) 

}, 1000)
```

### Focus on region 

ts

```
// #视图控制 [聚焦到指定区域]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件（可选）
import '@leafer-in/view' // 导入视图控制插件

const app = new App({ view: window, editor: {} })

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 500, 400))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 650, 400))

setTimeout(() => {

    app.tree.zoom({ x: 650, y: 400, width: 100, height: 100 }, [100, 20, 50, 20]) 

}, 1000)
```
