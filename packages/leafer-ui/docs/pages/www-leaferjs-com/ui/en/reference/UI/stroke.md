<!-- source: https://www.leaferjs.com/ui/en/reference/UI/stroke.html -->

# stroke 

Stroke (outline), similar to `border-color` in HTML5.

## Key Property 

### stroke: `string` | `Paint` | `Paint`[] 

Defines the stroke style.

Supports solid color, linear gradient, radial gradient, angular gradient, image pattern, etc. Multiple strokes can be layered together.

Stroke rendering modes

UI and closed shapes use **inside stroke** by default. Path / Line use **center stroke** by default. Text uses **outside stroke** by default.

## Stroke Style Properties 

### strokeAlign?: `StrokeAlign` 

Alignment of the stroke.

UI and closed shapes default to `inside`, Path / Line default to `center`, Text defaults to `outside`.

ts

```
type StrokeAlign = 'inside' | 'center' | 'outside' // inside | center | outside
```

### strokeWidth?: `number` 

Stroke width. Defaults to `1`.

### strokeScaleFixed?: `'zoom-in'` | `number` | `boolean` 

~~strokeWidthFixed?: `'zoom-in'` | `false`~~

Fixes stroke width under global scaling. Defaults to `false`.

When set to `true`, stroke width will not scale with the viewport. Use with caution when stroke width is large (may cause rendering artifacts).

When set to `'zoom-in'` or `1`, stroke width will not scale when zooming in, but will still scale down when zooming out (to prevent overcrowding).

When set to a value between `0` and `1`, stroke width will start scaling down only after the zoom level drops below that threshold.

In this case, it is recommended to use `center` stroke alignment for better performance, and set hitFill to `all` to reduce fill hit testing cost.

### strokeCap?: `StrokeCap` 

Stroke line cap style. Defaults to `none`.

ts

```
type StrokeCap = 'none' | 'round' | 'square' // none | round | square
```

### strokeJoin?: `StrokeJoin` 

Stroke corner join style. Defaults to `miter`.

ts

```
type StrokeJoin = 'miter' | 'bevel' | 'round' // miter | bevel | round
```

### dashPattern?: `number[]` 

Dash pattern for stroke.

ts

```
rect.dashPattern = [20, 10] // [dash length, gap length]
```

### dashOffset: `number` 

Offset of the dash pattern.

## Sub-stroke Properties 

When multiple strokes are applied, you can use `style` in each stroke item to override the main stroke style.

This enables effects such as marching ants or multi-layer stroke rendering.

All stroke types support sub-style overrides: solid, linear, radial, angular, image.

ts

```
interface IStrokeStyle {
  strokeWidth?: number
  strokeScaleFixed?: false
  strokeCap?: 'none' | 'round' | 'square'
  strokeJoin?: 'miter' | 'bevel' | 'round'
  dashPattern?: number[]
  dashOffset?: number
}

// marching ants effect
rect.stroke = [
  { type: 'solid', color: 'white' },
  { type: 'solid', color: 'black', style: { dashPattern: [3, 3] } },
]

// simulate multi-layer stroke
rect.stroke = [
  { type: 'solid', color: 'blue', style: { strokeWidth: 10 } },
  { type: 'solid', color: 'black', style: { strokeWidth: 5 } },
  { type: 'solid', color: 'white' },
]
```

## Belongs to 

### UI Element 

## Example 

### Solid stroke 

LeaferApp

ts

```
// #纯色描边 (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    stroke: {
        type: 'solid',
        color: '#32cd79'
    }
})

leafer.add(rect)
```

ts

```
// #纯色描边 (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    stroke: {
        type: 'solid',
        color: '#32cd79'
    }
})

app.tree.add(rect)
```

### Gradient stroke 

Supports linear, radial, angular gradients.

LeaferApp

ts

```
// #线性渐变描边 [默认方向 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    stroke: {
        type: 'linear',  // 从顶部居中 -> 底部居中垂直绘制的渐变
        stops: ['#FF4B4B', '#FEB027']
    },
})

leafer.add(rect)
```

ts

```
// #线性渐变描边 [默认方向 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    stroke: {
        type: 'linear',  // 从顶部居中 -> 底部居中垂直绘制的渐变
        stops: ['#FF4B4B', '#FEB027']
    },
})

app.tree.add(rect)
```

### Image stroke 

Image stroke supports cover, contain, crop, and tile modes.

LeaferApp

ts

```
// #图案描边 [默认 cover 覆盖模式 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    stroke: {
        type: 'image',
        url: '/image/leafer.jpg',
        // mode: 'cover' // 默认模式，相当于 CSS 的 background-size: cover
    }
})

leafer.add(rect)
```

ts

```
// #图案描边 [默认 cover 覆盖模式 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    stroke: {
        type: 'image',
        url: '/image/leafer.jpg',
        // mode: 'cover' // 默认模式，相当于 CSS 的 background-size: cover
    }
})

app.tree.add(rect)
```

### Multiple strokes 

Stroke opacity currently only applies to color objects and images.

LeaferApp

ts

```
// #多个不同类型的描边叠加 [线性渐变描边 + 图案描边 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    stroke: [ 
        {
            type: 'linear', // 线性渐变描边
            stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }]
        },
        {
            type: 'image', // 图案描边
            url: '/image/leafer.jpg',
            mode: 'cover',
            opacity: 0.5
        }]
})

leafer.add(rect)
```

ts

```
// #多个不同类型的描边叠加 [线性渐变描边 + 图案描边 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    stroke: [ 
        {
            type: 'linear', // 线性渐变描边
            stops: [{ offset: 0, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }]
        },
        {
            type: 'image', // 图案描边
            url: '/image/leafer.jpg',
            mode: 'cover',
            opacity: 0.5
        }]
})

app.tree.add(rect)
```

### Dashed stroke 

LeaferApp

ts

```
// #虚线描边 (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    stroke: '#32cd79',
    strokeWidth: 2,
    dashPattern: [6, 6] 
})

leafer.add(rect)
```

ts

```
// #虚线描边 (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    stroke: '#32cd79',
    strokeWidth: 2,
    dashPattern: [6, 6] 
})

app.tree.add(rect)
```
