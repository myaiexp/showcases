<!-- source: https://www.leaferjs.com/ui/en/reference/UI/paint/radial.html -->

# RadialGradient Object 

Radial gradient object, can be assigned to the fill or stroke property.

## Key Properties 

### type: `string` 

The fill type is `radial`.

### from?: `IAlign` | `IUnitPointData` 

The starting control point of the gradient, positioned relative to the actual content of the element. Default is center.

ts

```
// Alignment
type IAlign =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'right'
  | 'bottom-right'
  | 'bottom'
  | 'bottom-left'
  | 'left'
  | 'center'

from: 'center'

// Coordinate point
interface IUnitPointData {
  type?: 'percent' | 'px'
  x: number
  y: number
}

from: {
  type: 'percent',
  x: 0.5, // 50% width  percentage coordinate point
  y: 0.5, // 50% height
}

from: {
  x: 50, // 50px pixel coordinate point
  y: 50, // 50px
}
```

### to?: `IAlign` | `IUnitPointData` 

The ending control point of the gradient, positioned relative to the actual content of the element. Default is bottom.

### stretch: `number` 

Stretch perpendicular to from -> to, relative to the width ratio of the shape, forming an elliptical gradient. Default is 1.

### stops: `ColorStop`[] ｜ `StringColor`[] 

Array of gradient color stops.

If an array of pure string colors is provided, the offset will be calculated automatically.

## Basic Properties 

### blendMode?: `BlendMode` 

Blend mode, default is normal.

### visible?: `boolean` 

Whether it is visible, default is true.

### opacity?: `number` 

Opacity, default is 1. If the color in gradient stops is not a color object, the color plugin must be installed to take effect.

## Sub-stroke Properties 

### style?: `IStrokeStyle` 

When multiple strokes are set for an element, you can configure the sub-stroke style `style` to override the main stroke style.

This can create effects such as dashed lines, or simulate inner, middle, and outer triple strokes. Learn more.

## Belongs To 

### UI Element 

## Examples 

### Default Direction 

Gradient drawn vertically from center -> bottom center.

LeaferApp

ts

```
// #径向渐变填充 [默认方向 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'radial', // 从中心 -> 底部居中垂直绘制的渐变
        stops: [{ offset: 0.2, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }]
    },
})

leafer.add(rect)
```

ts

```
// #径向渐变填充 [默认方向 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'radial', // 从中心 -> 底部居中垂直绘制的渐变
        stops: [{ offset: 0.2, color: '#FF4B4B' }, { offset: 1, color: '#FEB027' }]
    },
})

app.tree.add(rect)
```

### Control Direction 

Gradient drawn at 45 degrees from top-left -> bottom-right.

LeaferApp

ts

```
// #径向渐变填充 [控制方向 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'radial', // 从左上角 -> 右下角呈 45 度绘制的渐变
        from: { type: 'percent', x: 0.2, y: 0.2 },
        to: { type: 'percent', x: 0.8, y: 0.8 },
        stops: ['#FF4B4B', '#FEB027']
    },
})

leafer.add(rect)
```

ts

```
// #径向渐变填充 [控制方向 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'radial', // 从左上角 -> 右下角呈 45 度绘制的渐变
        from: { type: 'percent', x: 0.2, y: 0.2 },
        to: { type: 'percent', x: 0.8, y: 0.8 },
        stops: ['#FF4B4B', '#FEB027']
    },
})

app.tree.add(rect)
```

### Stretch Gradient 

Gradient drawn at 45 degrees from center -> bottom-right, with a stretch ratio of 0.5.

LeaferApp

ts

```
// #径向渐变填充 [拉伸渐变 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: "radial", // 从中心 -> 右下角 呈 45 度, 且拉伸比例为 0.5 绘制的渐变
        to: 'bottom-right',
        stretch: 0.5,
        stops: [{ offset: 0, color: '#FF4A2C' }, { offset: 1, color: '#FEB027' }]
    }
})

leafer.add(rect)
```

ts

```
// #径向渐变填充 [拉伸渐变 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: "radial", // 从中心 -> 右下角 呈 45 度, 且拉伸比例为 0.5 绘制的渐变
        to: 'bottom-right',
        stretch: 0.5,
        stops: [{ offset: 0, color: '#FF4A2C' }, { offset: 1, color: '#FEB027' }]
    }
})

app.tree.add(rect)
```

### Set Opacity 

Generally used for stacking multiple fills.

When color is a color object, opacity takes effect directly. If it is not a color object, the color plugin must be installed, or directly use a string color like `rgba(255,75,75,0,5)`.

LeaferApp

ts

```
// #径向渐变填充 [设置不透明度 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'radial',
        opacity: 0.5,
        stops: [
            { offset: 0, color: { r: 255, g: 75, b: 75 } },
            { offset: 1, color: { r: 254, g: 176, b: 39 } }
        ]
    },
})

leafer.add(rect)
```

ts

```
// #径向渐变填充 [设置不透明度 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'radial',
        opacity: 0.5,
        stops: [
            { offset: 0, color: { r: 255, g: 75, b: 75 } },
            { offset: 1, color: { r: 254, g: 176, b: 39 } }
        ]
    },
})

app.tree.add(rect)
```
