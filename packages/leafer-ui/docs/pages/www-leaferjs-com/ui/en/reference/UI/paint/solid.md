<!-- source: https://www.leaferjs.com/ui/en/reference/UI/paint/solid.html -->

# SolidPaint Object 

Solid color fill object, can be assigned to the fill or stroke property.

## Key Properties 

### type: `string` 

The fill type is `solid`.

### color: `Color` 

Color.

## Basic Properties 

### blendMode?: `BlendMode` 

Blend mode, default is normal.

### visible?: `boolean` 

Whether it is visible, default is true.

### opacity?: `number` 

Opacity, default is 1. If color is not a color object, the color plugin must be installed to take effect.

## Sub-stroke Properties 

### style?: `IStrokeStyle` 

When multiple strokes are set for an element, you can configure the sub-stroke style `style` to override the main stroke style.

This can create effects such as dashed lines, or simulate inner, middle, and outer triple strokes. Learn more.

## Belongs To 

### UI Element 

## Examples 

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
