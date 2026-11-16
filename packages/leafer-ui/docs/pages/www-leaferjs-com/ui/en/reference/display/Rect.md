<!-- source: https://www.leaferjs.com/ui/en/reference/display/Rect.html -->

# Rect Element 

Draw rectangles and rounded rectangles.

  

Inheritance

Rect  >  UI

## Key Properties 

### width: `number` 

Width.

### height: `number` 

Height.

## Corner Properties 

### cornerRadius: `IFourNumber` 

Corner radius. You can set each of the 4 corners independently. Default is `0`.

ts

```
cornerRadius: [20, 10, 20, 10] // [topLeft, topRight, bottomRight, bottomLeft]
cornerRadius: [20, 10, 20] // [topLeft, (topRight-bottomLeft), bottomRight]
cornerRadius: [20, 10] // [ (topLeft-bottomRight), (topRight-bottomLeft)]
cornerRadius: 20 // all corners
```

## Inheritance 

### Rect  >  UI 

## Examples 

### Draw Rectangle 

LeaferApp

ts

```
// #创建 Rect [绘制矩形 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79'
})

leafer.add(rect)
```

ts

```
// #创建 Rect [绘制矩形 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79',
    editable: true
})

app.tree.add(rect)
```

### Draw Rounded Rectangle 

LeaferApp

ts

```
// #创建 Rect [绘制圆角矩形 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79',
    cornerRadius: 20
})

leafer.add(rect)
```

ts

```
// #创建 Rect [绘制圆角矩形 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79',
    cornerRadius: 20,
    editable: true
})

app.tree.add(rect)
```

### Draw Rectangle with Different Corners 

LeaferApp

ts

```
// #创建 Rect [绘制不同圆角的矩形 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79',
    cornerRadius: [0, 40, 20, 40]
})

leafer.add(rect)
```

ts

```
// #创建 Rect [绘制不同圆角的矩形 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79',
    cornerRadius: [0, 40, 20, 40],
    editable: true
})

app.tree.add(rect)
```
