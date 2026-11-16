<!-- source: https://www.leaferjs.com/ui/en/reference/display/Image.html -->

# Image Element 

Image object. It supports SVG images. In addition, all shapes also support displaying images via pattern fill.

  

Inheritance

Image  >  Rect  >  UI

  

Note: When using script tag import, you must use the alias **MyImage** instead of Image.

## Key Properties 

### width?: `number` 

Width. Defaults to the original image width.

### height?: `number` 

Height. Defaults to the original image height.

### url: `string` 

Image URL. Supports Blob URLs and Data URLs (Base64).

We also provide a resource system that supports converting raw image objects and canvas objects into URLs, as well as image preloading.

Note

After setting the url on Image, you cannot set the fill property at the same time (url will override fill). However, using fill alone instead of url is supported.

## Auxiliary Properties 

These properties are also supported by elements using pattern fill (must be set on the element itself).

### pixelRatio: `number` 

Image pixel ratio. Defaults to `1` (2 for retina screens, 3 for ultra-high-resolution screens).

Only effective when using auto width/height images.

### lazy: `boolean` 

Whether the image is lazy-loaded. Defaults to `false`. Can improve initial page loading performance.

### placeholderColor: `string` 

Placeholder background color. Shown while the image is loading (after a 100ms delay) or when loading fails.

## Readonly Properties 

### ready: `boolean` 

Whether the image has finished loading.

### image?: `ILeaferImage` 

Original image wrapper object. Available only after the image has loaded.

## Helper Methods 

### load () 

Manually load the image.

Typically used when the element has not been added to Leafer yet, in order to manually load the image and obtain its natural width and height.

## Image Cache 

Global configuration for image caching. Can be adjusted dynamically as needed.

ts

```
import { Platform } from 'leafer-ui'

// 最大缓存等级，默认2k: 2560 * 1600 像素
Platform.image.maxCacheSize = 2560 * 1600

// 最大重复pattern缓存等级, 默认4k: 4096 * 2160 像素
Platform.image.maxPatternSize = 4096 * 2160

// 图片后缀，区分dom中image标签的缓存，否则可能会有浏览器缓存跨域问题，默认: leaf
Platform.image.suffix = 'leaf'  // image.jpg?leaf
```

## Image CORS 

Global configuration for image cross-origin behavior. Can be adjusted dynamically as needed.

When set to `null`, cross-origin images that are not explicitly allowed by the server can be rendered, but exporting the canvas will not be supported (browser limitation).

ts

```
import { Platform } from 'leafer-ui'

// 默认配置，未经服务端允许的跨域图片不能渲染。
Platform.image.crossOrigin = 'anonymous'

// 允许跨域图片渲染，但不支持导出画板内容（浏览器的限制）。
Platform.image.crossOrigin = null
```

## Resource System 

We also provide a resource system, which supports image preloading and converting raw image objects or canvas objects into URLs.

All images in the engine are loaded through the resource system in an ordered and parallel manner. When images are no longer used, they are moved to a recycle queue and automatically destroyed when a threshold is reached.

ts

```
// #等待图片加载完，再添加到引擎中
import { Leafer, Image, Resource } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const url = '/image/leafer.jpg'

Resource.loadImage(url).then(() => {

    leafer.add(new Image({ url }))

})
```

## Image Events 

### ImageEvent 

## Box Element 

### ImageBox 

## Inheritance 

### Image  >  Rect  >  UI 

## Examples 

### Use default width and height 

LeaferApp

ts

```
// #创建Image [使用默认宽高 (Leafer)]
import { Leafer, Image } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const image = new Image({
    url: '/image/leafer.jpg',
    draggable: true
})

leafer.add(image)
```

ts

```
// #创建Image [使用默认宽高 (App)]
import { App, Image } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const image = new Image({
    url: '/image/leafer.jpg',
    editable: true
})

app.tree.add(image)
```

### Use fill instead of url 

Fill supports multiple fills.

LeaferApp

ts

```
// #使用 fill 代替 url (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    fill: {
        type: 'image',
        url: '/image/leafer.jpg',
        mode: 'stretch'
    },
    draggable: true
})

leafer.add(rect)
```

ts

```
// #使用 fill 代替 url (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    fill: {
        type: 'image',
        url: '/image/leafer.jpg',
        mode: 'stretch'
    },
    editable: true
})

app.tree.add(rect)
```

### Use Rect instead of Image 

If you want to apply fill styles to images, use Rect instead. Rect will also auto-fit image size without explicit width/height and supports multiple fills.

LeaferApp

ts

```
// #使用 Rect 代替 Image (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    fill: {
        type: 'image',
        url: '/image/leafer.jpg',
        mode: 'stretch'
    },
    draggable: true
})

leafer.add(rect)
```

ts

```
// #使用 Rect 代替 Image (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    fill: {
        type: 'image',
        url: '/image/leafer.jpg',
        mode: 'stretch'
    },
    editable: true
})

app.tree.add(rect)
```

### Fixed width, auto height 

LeaferApp

ts

```
// #创建Image [固定宽度，自适应高度 (Leafer)]
import { Leafer, Image } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const image = new Image({
    url: '/image/leafer.jpg',
    width: 50,
    draggable: true
})

leafer.add(image)
```

ts

```
// #创建Image [固定宽度，自适应高度 (App)]
import { App, Image } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const image = new Image({
    url: '/image/leafer.jpg',
    width: 50,
    editable: true
})

app.tree.add(image)
```

### Fixed height, auto width 

LeaferApp

ts

```
// #创建Image [固定高度，自适应宽度 (Leafer)]
import { Leafer, Image } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const image = new Image({
    url: '/image/leafer.jpg',
    height: 50,
    draggable: true
})

leafer.add(image)
```

ts

```
// #创建Image [固定高度，自适应宽度 (App)]
import { App, Image } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const image = new Image({
    url: '/image/leafer.jpg',
    height: 50,
    editable: true
})

app.tree.add(image)
```

### Image placeholder 

LeaferApp

ts

```
// #创建Image [图片占位符 (Leafer)]
import { Leafer, Image } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const image = new Image({
    url: '/image/leafer-error.jpg',
    width: 110,
    height: 80,
    draggable: true,
    placeholderColor: 'rgba(120,120,120,0.2)' // 设置图片占位符的背景颜色
})

leafer.add(image)


setTimeout(() => {

    image.url = '/image/leafer.jpg' // 变为正确的图片

}, 1000)
```

ts

```
// #创建Image [图片占位符 (App)]
import { App, Image } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const image = new Image({
    url: '/image/leafer-error.jpg',
    width: 110,
    height: 80,
    draggable: true,
    placeholderColor: 'rgba(120,120,120,0.2)' // 设置图片占位符的背景颜色
})

app.tree.add(image)


setTimeout(() => {

    image.url = '/image/leafer.jpg' // 变为正确的图片

}, 1000)
```

### Listen to image load 

image.tsimage.js

ts

```
// #监听图片事件 [加载成功]
import { Leafer, Image, ImageEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const image = new Image({
    url: '/image/leafer.jpg',
    draggable: true
})

image.once(ImageEvent.LOADED, function (e: ImageEvent) {
    console.log(e)
})

leafer.add(image)
```

js

```
// #监听图片事件 [加载成功]
import { Leafer, Image, ImageEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const image = new Image({
    url: '/image/leafer.jpg',
    draggable: true
})

image.once(ImageEvent.LOADED, function (e) {
    console.log(e)
})

leafer.add(image)
```

### Listen to error 

error.tserror.js

ts

```
// #监听图片事件 [加载失败]
import { Leafer, Image, ImageEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const image = new Image({
    url: '/image/leafer.jpg',
    draggable: true
})

image.once(ImageEvent.ERROR, function (e: ImageEvent) {
    console.log(e.error)
})

leafer.add(image)
```

js

```
// #监听图片事件 [加载失败]
import { Leafer, Image, ImageEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const image = new Image({
    url: '/image/leafer.jpg',
    draggable: true
})

image.once(ImageEvent.ERROR, function (e) {
    console.log(e.error)
})

leafer.add(image)
```
