<!-- source: https://www.leaferjs.com/ui/en/reference/UI/fill.html -->

# fill 

Fill, similar to `background-color` in HTML5 or `color` for text.

## Key Properties 

### fill: `string` | `Paint` ｜ `Paint`[] 

Sets the fill for backgrounds or text.

Supports solid color, linear gradient, radial gradient, angular gradient, and image pattern fill, etc. Multiple fills can be layered together.

## Belongs to 

### UI Elements 

## Examples 

### Solid fill 

LeaferApp

ts

```
// #纯色填充 (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'solid',
        color: '#32cd79'
    },
})

leafer.add(rect)
```

ts

```
// #纯色填充 (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'solid',
        color: '#32cd79'
    },
})

app.tree.add(rect)
```

### Gradient fill 

Supports linear gradient, radial gradient, angular gradient, etc.

LeaferApp

ts

```
// #线性渐变填充 [默认方向 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'linear', // 从顶部居中 -> 底部居中垂直绘制的渐变
        stops: ['#FF4B4B', '#FEB027']
    },
})

leafer.add(rect)
```

ts

```
// #线性渐变填充 [默认方向 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'linear', // 从顶部居中 -> 底部居中垂直绘制的渐变
        stops: ['#FF4B4B', '#FEB027']
    },
})

app.tree.add(rect)
```

### Image pattern fill 

Image fill supports cover, contain, clip, and tile modes.

LeaferApp

ts

```
// #图案填充 [默认 cover 覆盖模式 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'image',
        url: '/image/leafer.jpg',
        // mode: 'cover' // 默认模式，相当于 CSS 的 background-size: cover
    }
})

leafer.add(rect)
```

ts

```
// #图案填充 [默认 cover 覆盖模式 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'image',
        url: '/image/leafer.jpg',
        // mode: 'cover' // 默认模式，相当于 CSS 的 background-size: cover
    }
})

app.tree.add(rect)
```

### Multiple fills overlay 

Fill opacity currently only applies to color objects and images.

LeaferApp

ts

```
// #多个不同类型的填充叠加 [线性渐变填充 + 图案填充 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: [ 
        {
            type: 'linear', // 线性渐变填充
            stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }]
        },
        {
            type: 'image', // 图案填充
            url: '/image/leafer.jpg',
            mode: 'cover',
            opacity: 0.2
        }]
})

leafer.add(rect)
```

ts

```
// #多个不同类型的填充叠加 [线性渐变填充 + 图案填充 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: [ 
        {
            type: 'linear', // 线性渐变填充
            stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }]
        },
        {
            type: 'image', // 图案填充
            url: '/image/leafer.jpg',
            mode: 'cover',
            opacity: 0.2
        }]
})

app.tree.add(rect)
```
