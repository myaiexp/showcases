<!-- source: https://www.leaferjs.com/ui/en/reference/UI/blendMode.html -->

# blendMode 

Blend modes. Learn more about the blending principle and blend effects.

## Key Properties 

### blendMode: `BlendMode` 

The element’s blend mode. Default is `pass-through`, which is the default and most performant mode.

ts

```
type BlendMode =
  | 'pass-through' // pass-through, default, best performance
  | 'normal' // normal: rendered on a separate layer; heavy usage may impact performance. Usually used to isolate blending inside a Group to prevent affecting external elements
  | 'multiply' // multiply
  | 'darken' // darken
  | 'color-burn' // color burn
  | 'lighten' // lighten
  | 'color-dodge' // color dodge
  | 'screen' // screen
  | 'overlay' // overlay
  | 'hard-light' // hard light
  | 'soft-light' // soft light
  | 'difference' // difference
  | 'exclusion' // exclusion
  | 'hue' // hue
  | 'saturation' // saturation
  | 'color' // color
  | 'luminosity' // luminosity
  // other
  | 'source-over' // draw new content over existing canvas
  | 'source-in' // draw only where new shape and destination overlap; otherwise transparent
  | 'source-out' // draw only where new shape does NOT overlap existing content
  | 'source-atop' // draw only where it overlaps existing content
  | 'destination-over' // draw behind existing content
  | 'destination-in' // keep only overlapping parts of existing content and new shape
  | 'destination-out' // keep only non-overlapping parts of existing content
  | 'destination-atop' // keep overlapping parts; new shape is drawn behind existing content
  | 'xor' // overlap becomes transparent, otherwise normal drawing
  | 'copy' // show only the new shape
```

## Pass-through Mode 

In pass-through mode, child blend modes (such as fill, stroke, and effects) can blend directly with underlying content.

Otherwise, child blend modes only affect the current element layer, and the element is then composited as a whole with underlying content.

## Belongs to 

### UI Elements 

## Examples 

### multiply 

Multiply mode multiplies the top pixel with the corresponding bottom pixel, resulting in a darker image.

LeaferApp

ts

```
// #混合模式 [multiply 正片叠底 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'multiply'

}, 1000)
```

ts

```
// #混合模式 [multiply 正片叠底 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'multiply'

}, 1000)
```

### darken 

Darken mode keeps the darker pixel of the two overlapping layers.

LeaferApp

ts

```
// #混合模式 [darken 变暗 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'darken'

}, 1000)
```

ts

```
// #混合模式 [darken 变暗 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'darken'

}, 1000)
```

### color-burn 

Color burn inverts the bottom layer, divides it by the top layer, then inverts the result.

LeaferApp

ts

```
// #混合模式 [color-burn 颜色加深 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'color-burn'

}, 1000)
```

ts

```
// #混合模式 [color-burn 颜色加深 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'color-burn'

}, 1000)
```

### lighten 

Lighten mode keeps the lighter pixel between overlapping layers.

LeaferApp

ts

```
// #混合模式 [lighten 变亮 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'lighten'

}, 1000)
```

ts

```
// #混合模式 [lighten 变亮 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'lighten'

}, 1000)
```

### color-dodge 

Color dodge divides the bottom layer by the inverted top layer.

LeaferApp

ts

```
// #混合模式 [color-dodge 颜色减淡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'color-dodge'

}, 1000)
```

ts

```
// #混合模式 [color-dodge 颜色减淡 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'color-dodge'

}, 1000)
```

### screen 

Screen inverts, multiplies, then inverts again, resulting in a lighter image (opposite of multiply).

LeaferApp

ts

```
// #混合模式 [screen 只显示新图形 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'screen'

}, 1000)
```

ts

```
// #混合模式 [screen 只显示新图形 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'screen'

}, 1000)
```

### overlay 

Overlay combines multiply and screen. Dark areas become darker, light areas become lighter.

LeaferApp

ts

```
// #混合模式 [overlay 叠加 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'overlay'

}, 1000)
```

ts

```
// #混合模式 [overlay 叠加 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'overlay'

}, 1000)
```

### hard-light 

Hard light is similar to overlay (multiply + screen), but with layers swapped.

LeaferApp

ts

```
// #混合模式 [hard-light 强光 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'hard-light'

}, 1000)
```

ts

```
// #混合模式 [hard-light 强光 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'hard-light'

}, 1000)
```

### soft-light 

Soft light is a softer version of hard light. Pure black or white does not produce extreme results.

LeaferApp

ts

```
// #混合模式 [soft-light 柔光 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'soft-light'

}, 1000)
```

ts

```
// #混合模式 [soft-light 柔光 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'soft-light'

}, 1000)
```

### difference 

Difference subtracts one layer from another (or vice versa), always producing a positive result.

LeaferApp

ts

```
// #混合模式 [difference 差集 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'difference'

}, 1000)
```

ts

```
// #混合模式 [difference 差集 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'difference'

}, 1000)
```

### exclusion 

Exclusion is similar to difference, but with lower contrast.

LeaferApp

ts

```
// #混合模式 [exclusion 排除 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'exclusion'

}, 1000)
```

ts

```
// #混合模式 [exclusion 排除 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'exclusion'

}, 1000)
```

### hue 

Hue preserves the luminance and saturation of the bottom layer while adopting the hue of the top layer.

LeaferApp

ts

```
// #混合模式 [hue 色相 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'hue'

}, 1000)
```

ts

```
// #混合模式 [hue 色相 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'hue'

}, 1000)
```

### saturation 

Saturation preserves luminance and hue of the bottom layer while adopting the saturation of the top layer.

LeaferApp

ts

```
// #混合模式 [saturation 饱和度 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'saturation'

}, 1000)
```

ts

```
// #混合模式 [saturation 饱和度 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'saturation'

}, 1000)
```

### color 

Color preserves luminance of the bottom layer while adopting hue and saturation of the top layer.

LeaferApp

ts

```
// #混合模式 [color 颜色 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'color'

}, 1000)
```

ts

```
// #混合模式 [color 颜色 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'color'

}, 1000)
```

### luminosity 

Luminosity preserves hue and saturation of the bottom layer while adopting luminance of the top layer.

LeaferApp

ts

```
// #混合模式 [luminosity 明度 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'luminosity'

}, 1000)
```

ts

```
// #混合模式 [luminosity 明度 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'luminosity'

}, 1000)
```

### source-over 

Draw new content over existing canvas content.

LeaferApp

ts

```
// #混合模式 [source-over 在现有画布上绘制新图形 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'source-over'

}, 1000)
```

ts

```
// #混合模式 [source-over 在现有画布上绘制新图形 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'source-over'

}, 1000)
```

### source-in 

Draw only where the new shape and existing canvas overlap. Other areas are transparent.

LeaferApp

ts

```
// #混合模式 [source-in 仅在新形状和目标画布重叠的地方绘制新形状，其他的都是透明的 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'source-in'

}, 1000)
```

ts

```
// #混合模式 [source-in 仅在新形状和目标画布重叠的地方绘制新形状，其他的都是透明的 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'source-in'

}, 1000)
```

### source-out 

Draw only where the new shape does not overlap existing content.

LeaferApp

ts

```
// #混合模式 [source-out 在不与现有画布内容重叠的地方绘制新图形 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'source-out'

}, 1000)
```

ts

```
// #混合模式 [source-out 在不与现有画布内容重叠的地方绘制新图形 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'source-out'

}, 1000)
```

### source-atop 

Draw only where it overlaps existing content.

LeaferApp

ts

```
// #混合模式 [source-atop 只在与现有画布内容重叠的地方绘制新图形 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'source-atop'

}, 1000)
```

ts

```
// #混合模式 [source-atop 只在与现有画布内容重叠的地方绘制新图形 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'source-atop'

}, 1000)
```

### destination-over 

Draw new content behind existing canvas content.

LeaferApp

ts

```
// #混合模式 [destination-over 在现有画布内容的后面绘制新的图形 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'destination-over'

}, 1000)
```

ts

```
// #混合模式 [destination-over 在现有画布内容的后面绘制新的图形 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'destination-over'

}, 1000)
```

### destination-in 

Keep only the overlapping parts of existing content and the new shape; everything else is transparent.

LeaferApp

ts

```
// #混合模式 [destination-in 仅保留现有画布内容和新形状重叠的部分,其他的都是透明的 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'destination-in'

}, 1000)
```

ts

```
// #混合模式 [destination-in 仅保留现有画布内容和新形状重叠的部分,其他的都是透明的 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'destination-in'

}, 1000)
```

### destination-out 

Keep only the non-overlapping parts of existing content and the new shape.

LeaferApp

ts

```
// #混合模式 [destination-out 仅保留现有画布内容和新形状不重叠的部分 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'destination-out'

}, 1000)
```

ts

```
// #混合模式 [destination-out 仅保留现有画布内容和新形状不重叠的部分 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'destination-out'

}, 1000)
```

### destination-atop 

Keep only overlapping parts of existing content and the new shape. The new shape is drawn behind the existing content.

LeaferApp

ts

```
// #混合模式 [destination-atop 仅保留现有画布内容和新形状重叠的部分，新形状是在现有画布内容的后面绘制的 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'destination-atop'

}, 1000)
```

ts

```
// #混合模式 [destination-atop 仅保留现有画布内容和新形状重叠的部分，新形状是在现有画布内容的后面绘制的 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'destination-atop'

}, 1000)
```

### xor 

Shapes become transparent where they overlap, and render normally elsewhere.

LeaferApp

ts

```
// #混合模式 [xor 形状在重叠处变为透明，并在其他地方正常绘制 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'xor'

}, 1000)
```

ts

```
// #混合模式 [xor 形状在重叠处变为透明，并在其他地方正常绘制 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'xor'

}, 1000)
```

### copy 

Only display the new shape.

LeaferApp

ts

```
// #混合模式 [copy 只显示新图形 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

leafer.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'copy'

}, 1000)
```

ts

```
// #混合模式 [copy 只显示新图形 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = Rect.one({ fill: '#FF4B4B', cornerRadius: 20 }, 100, 100)
const rect2 = Rect.one({ fill: '#32cd79', cornerRadius: 50 }, 150, 150)

app.tree.add([rect1, rect2])

setTimeout(() => {

    // 设置混合模式
    rect2.blendMode = 'copy'

}, 1000)
```
