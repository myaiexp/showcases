<!-- source: https://www.leaferjs.com/ui/en/reference/UI/export.html -->

# export 

Export content.

Note

You need to install the export plugin to use this feature, or use leafer-editor or the Node.js version (both already include the export plugin).

## Key Methods 

### export ( ) 

export( name: `IExportFileType` | `string`, options?: `IExportOptions` | `number` | `boolean`): `Promise`<`IExportResult`>

Asynchronous export method. It waits for all network resources in the view to finish loading before exporting the image.

Supports exporting a single element or a full screenshot. Default export scale is 1x (logical size).

If `name` is used as a filename, it will trigger file saving.

When `options` is a number, it represents image quality. When it is a boolean, it represents binary output.

Note

The Leafer engine exports content by default (not canvas content). To export the canvas, you need to enable the `screenshot` option.

~~Exporting App instances alone only supports full screen screenshots.~~

ts

```
type IExportFileType = 'canvas' | 'json' | 'jpg' | 'png' | 'webp' ｜ 'bmp' // SVG and PDF will be supported later; BMP depends on platform support
```

ts

```
interface IExportOptions {
  quality?: number // JPEG / WebP quality
  blob?: boolean // export binary data

  fill?: string // background fill color

  scale?: number | IPointData // export scale (default 1), useful for thumbnails
  size?: number | IOptionSizeData // output size (width/height), auto-scales if one dimension is missing
  padding?: number | number[] // padding [top, right, bottom, left]

  pixelRatio?: number // device pixel ratio, default 1
  smooth?: boolean // canvas smoothing
  contextSettings?: ICanvasRenderingContext2DSettings // native canvas context settings

  clip?: IBoundsDataWithOptionRotation // clip export area relative to render bounds

  slice?: boolean // export slice bounds content
  trim?: boolean // trim transparent pixels
  screenshot?: IBoundsData | boolean // export current viewport as screenshot

  json?: IJSONOptions // JSON export options

  relative?: ILocationType | IUI // coordinate system reference for scaling
  onCanvas?: IExportOnCanvasFunction // custom canvas drawing hook
}

interface IPointData {
  x: number
  y: number
}

interface IBoundsData {
  x: number
  y: number
  width: number
  height: number
}

interface IBoundsDataWithOptionRotation extends IBoundsData {
  rotation?: number
}

interface IOptionSizeData {
  width?: number
  height?: number
}

interface IJSONOptions {
  matrix?: boolean
}

interface IExportOnCanvasFunction {
  (canvas: ILeaferCanvas): void
}

interface ICanvasRenderingContext2DSettings {
  alpha?: boolean
  colorSpace?: 'display-p3' | 'srgb'
  desynchronized?: boolean
  willReadFrequently?: boolean
}
```

ts

```
interface IExportResult {
  data: ILeaferCanvas | IBlob | string | boolean // null indicates export failure

  error?: any // internal error info

  width?: number // output image width (pixels)
  height?: number // output image height (pixels)

  renderBounds?: IBoundsData // export bounds relative to parent
  trimBounds?: IBoundsData // trimmed transparent bounds
}
```

### syncExport ( ) 

syncExport( name: `IExportFileType` | `string`, options?: `IExportOptions` | `number`): `IExportResult`

Synchronous export method. Same parameters as `export()`. Only works when images are already loaded. Does not support synchronous binary export.

## Belongs to 

### UI Elements 

## Examples 

### Export element as image 

LeaferApp

ts

```
// #导出图片 [导出文件 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/export' // 引入导出元素插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
leafer.add(rect)

rect.export('test.png') // 传文件名参数，浏览器版会直接下载文件，Node.js 版会保存到指定路径

// const result = await rect.export('./home/test.png')
```

ts

```
// #导出图片 [导出文件 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/export' // 引入导出元素插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
app.tree.add(rect)

rect.export('test.png') // 传文件名参数，浏览器版会直接下载文件，Node.js 版会保存到指定路径

// const result = await rect.export('./home/test.png')
```

### Export high-resolution image 

LeaferApp

ts

```
// #导出图片 [导出高清图 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/export' // 引入导出元素插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
leafer.add(rect)

rect.export('HD.png', { pixelRatio: 2 }) // 导出2倍高清图

// const result = await rect.export('HD.png', { pixelRatio: 2 }}
```

ts

```
// #导出图片 [导出高清图 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/export' // 引入导出元素插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
app.tree.add(rect)

rect.export('HD.png', { pixelRatio: 2 }) // 导出2倍高清图

// const result = await rect.export('HD.png', { pixelRatio: 2 }}
```

### Export Base64 data 

Default image quality is 0.92.

LeaferApp

ts

```
// #导出图片 [导出 Base64 编码数据 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/export' // 引入导出元素插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
leafer.add(rect)

rect.export('jpg').then(result => { // 可设置图片质量 export('jpg', 0.92), 默认为0.92
    console.log(result.data)
})

// const result = await rect.export('jpg')
```

ts

```
// #导出图片 [导出 Base64 编码数据 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/export' // 引入导出元素插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
app.tree.add(rect)

rect.export('jpg').then(result => { // 可设置图片质量 export('jpg', 0.92), 默认为0.92
    console.log(result.data)
})

// const result = await rect.export('jpg')
```

Manually set image quality.

LeaferApp

ts

```
// #导出图片 [导出二进制数据 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/export' // 引入导出元素插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
leafer.add(rect)

rect.export('jpg', 0.5).then(result => { // 第2个参数为图片质量，可选参数（默认为0.92）
    console.log(result.data)
})

// const result = await rect.export('jpg', {quality: 0.5})
```

ts

```
// #导出图片 [导出二进制数据 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/export' // 引入导出元素插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
app.tree.add(rect)

rect.export('jpg', 0.5).then(result => { // 第2个参数为图片质量，可选参数（默认为0.92）
    console.log(result.data)
})

// const result = await rect.export('jpg', {quality: 0.5})
```

### Sync export Base64 data 

LeaferApp

ts

```
// #导出图片 [同步导出 Base64 编码数据 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/export' // 引入导出元素插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
leafer.add(rect)

// 同步导出图片，前提：需确认异步加载的图片已经完成，才能同步导出
const result = rect.syncExport('jpg') // 可设置图片质量 syncExport('jpg', 0.92), 默认为0.92
console.log(result.data)
```

ts

```
// #导出图片 [同步导出 Base64 编码数据 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/export' // 引入导出元素插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
app.tree.add(rect)

// 同步导出图片，前提：需确认异步加载的图片已经完成，才能同步导出
const result = rect.syncExport('jpg') // 可设置图片质量 syncExport('jpg', 0.92), 默认为0.92
console.log(result.data)
```

### Export binary data 

LeaferApp

ts

```
// #导出图片 [导出二进制数据 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/export' // 引入导出元素插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
leafer.add(rect)

rect.export('png', true).then(result => { // 第2个参数为true表示导出二进制
    console.log(result.data)
})

// const result = await rect.export('png', { blob: true })
```

ts

```
// #导出图片 [导出二进制数据 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/export' // 引入导出元素插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
app.tree.add(rect)

rect.export('png', true).then(result => { // 第2个参数为true表示导出二进制
    console.log(result.data)
})

// const result = await rect.export('png', { blob: true })
```

### Add watermark during export 

LeaferApp

ts

```
// #导出图片 [绘制水印 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/export' // 引入导出元素插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
leafer.add(rect)

rect.export('test.png', {
    pixelRatio: 2,
    onCanvas(canvas) {  // 通过onCanvas钩子函数绘制水印
        const {
            context,  // CanvasRenderingContext2D，原生canvas上下文对象
            pixelRatio, // 像素比
            width, // 逻辑宽度， 获取实际像素宽度请使用 pixelWidth
            height // 逻辑高度， 获取实际像素高度请使用 pixelHeight
        } = canvas
        context.scale(pixelRatio, pixelRatio) // 抹平像素比差异
        context.fillText('绘制水印', width - 60, height - 20)
    }
})
```

ts

```
// #导出图片 [绘制水印 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/export' // 引入导出元素插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
app.tree.add(rect)

rect.export('test.png', {
    pixelRatio: 2,
    onCanvas(canvas) {  // 通过onCanvas钩子函数绘制水印
        const {
            context,  // CanvasRenderingContext2D，原生canvas上下文对象
            pixelRatio, // 像素比
            width, // 逻辑宽度， 获取实际像素宽度请使用 pixelWidth
            height // 逻辑高度， 获取实际像素高度请使用 pixelHeight
        } = canvas
        context.scale(pixelRatio, pixelRatio) // 抹平像素比差异
        context.fillText('绘制水印', width - 60, height - 20)
    }
})
```

### Export as canvas 

LeaferApp

ts

```
// #导出图片 [导出画布 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/export' // 引入导出元素插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
leafer.add(rect)

rect.export('canvas').then(result => {
    const leaferCanvas = result.data
    const canvas = leaferCanvas.view
    const context = leaferCanvas.context

    console.log('canvas', canvas) // HTMLCanvasElement
    console.log('2d context', context) // CanvasRenderingContext2D

    // 有和rect.export() 一样的导出函数，导出结果直接是一个data
    leaferCanvas.export('a.jpg', 0.9) // options只能设置图像相关的参数
})

// const result = await rect.export('canvas')
```

ts

```
// #导出图片 [导出画布 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/export' // 引入导出元素插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' }, 100, 100)
app.tree.add(rect)

rect.export('canvas').then(result => {
    const leaferCanvas = result.data
    const canvas = leaferCanvas.view
    const context = leaferCanvas.context

    console.log('canvas', canvas) // HTMLCanvasElement
    console.log('2d context', context) // CanvasRenderingContext2D

    // 有和rect.export() 一样的导出函数，导出结果直接是一个data
    leaferCanvas.export('a.jpg', 0.9) // options只能设置图像相关的参数
})

// const result = await rect.export('canvas')
```

### Export with clipping 

Clip relative to element render bounds.

LeaferApp

ts

```
// #导出图片 [裁剪元素 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'
import '@leafer-in/export' // 引入导出元素插件

const leafer = new Leafer({ view: window })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: "#32cd79"
})

leafer.add(ellipse)

ellipse.export('clip.jpg', {
    clip: { x: 50, y: 50, width: 50, height: 50 }  // 对导出元素进行裁剪
})
```

ts

```
// #导出图片 [裁剪元素 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/export' // 引入导出元素插件

const app = new App({ view: window, editor: {} })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: "#32cd79"
})

app.tree.add(ellipse)

ellipse.export('clip.jpg', {
    clip: { x: 50, y: 50, width: 50, height: 50 }  // 对导出元素进行裁剪
})
```

### Export full canvas screenshot 

Export current engine canvas as screenshot.

LeaferApp

ts

```
// #导出图片 [画面截图 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/export' // 引入导出元素插件

const leafer = new Leafer({ view: window })

leafer.add(Rect.one({ fill: '#32cd79' }, 100, 100))

leafer.export('screenshot.png', { screenshot: true }) // 将当前引擎画布进行截图导出

// const result = await leafer.export('screenshot.png', {screenshot: true}
```

ts

```
// #导出图片 [画面截图 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/export' // 引入导出元素插件

const app = new App({ view: window, editor: {} })

app.tree.add(Rect.one({ fill: '#32cd79' }, 100, 100))

app.export('screenshot.png', { screenshot: true }) // 将当前App画布进行截图导出

// const result = await app.export('screenshot.png', {screenshot: true}
```

### Add custom async task 

Export waits for this task to finish before rendering.

ts

```
// #添加一个自定义异步任务（导出图片时会等待此任务执行完再导出）
import { Resource } from 'leafer-ui'

async function doSomething() {
    // 执行异步任务
}

// 添加异步任务
Resource.tasker.add(async () => await doSomething())
```
