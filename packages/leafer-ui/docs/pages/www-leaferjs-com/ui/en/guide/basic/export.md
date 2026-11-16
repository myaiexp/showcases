<!-- source: https://www.leaferjs.com/ui/en/guide/basic/export.html -->

# Exporting Elements 

Export elements as images or JSON.

Notes

You need to install the export element plugin to use this feature, or install leafer-editor or the Node.js version (which already includes the export plugin).

### Export Element as Image 

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

### Export High-Resolution Image 

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

### Export Base64 Encoded Data 

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

### Synchronous Export of Base64 Encoded Data 

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

### Export Binary Data 

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

### Export with Watermark 

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

### Export Entire Canvas 

Export a screenshot of the current engine canvas.

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

### Export JSON 

ts

```
// #导出 JSON (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: '#32cd79',
    draggable: true
})

leafer.add(rect)

const json = leafer.toJSON() 

console.log(json) // {"tag":"Leafer","width":1273,"height":877,"pixelRatio":2,"hittable":true,"children":[{"tag":"Rect","x":100,"y":100,"width":100,"height":100,"fill":"#32cd79","draggable":true}]}
```

## Understanding Element Export Methods 

| Name | Description |
| --- | --- |
| Path |  |
| getPath() | Get the element's numeric path (Canvas drawing commands) |
| getPathString() | Get the element's string path (Canvas drawing commands, including non-SVG drawing commands) |
| Export |  |
| export() | Asynchronous export of element as image, JSON, or canvas; supports screenshots and slicing, can download; requires installing the export plugin |
| syncExport() | Synchronous export of element as image, JSON, or canvas; supports screenshots and slicing, can download; requires installing the export plugin |
| toJSON() | Export JSON object |
| toString() | Export JSON string |

## Congratulations 🎉 

You have completed the basics. Next, let’s explore some **fun plugins** to relax a bit ~

## Next Step 

### Animation Features 

  

### Using in Frontend Environments 

Vue

React

### Using in Server-Side Rendering 

Nuxt.js

VitePress

Next.js

### Component-based Development (Community) 

[leafer-vue](https:// leafer-vue.netlify.app/)
