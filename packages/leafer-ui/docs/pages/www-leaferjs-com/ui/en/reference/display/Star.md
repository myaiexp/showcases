<!-- source: https://www.leaferjs.com/ui/en/reference/display/Star.html -->

# Star Element 

Draw car logos, star highlights, five-point stars, and multi-point star shapes.

  

Inheritance

Star  >  UI

## Key Properties 

### width: `number` 

Width of the star shape.

### height: `number` 

Height of the star shape.

### corners: `number` 

Number of star points. Must be ≥ 3.

Internal logic: points are distributed between inner and outer circles every `(360 / corners)` degrees, then connected to form a star shape.

### startAngle: `number` 

Starting angle offset. Default is `0`. Range: -180 to 180.

### innerRadius: `number` 

Inner radius ratio. Default is `0.382`. Range: 0.0 to 1.0.

ts

```
// five-point star
corners: 5
innerRadius: 0.382
```

## Corner Properties 

### cornerRadius: `number` 

Corner radius that smooths the star’s sharp edges.

## Box Element 

### StarBox 

## Inheritance 

### Star  >  UI 

## Examples 

### Draw Car Logo 

LeaferApp

ts

```
// #创建 Star [绘制车标 (Leafer)]
import { Leafer, Star } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const star = new Star({
    width: 100,
    height: 100,
    corners: 3,
    innerRadius: 0.15,
    fill: '#32cd79'
})

leafer.add(star)
```

ts

```
// #创建 Star [绘制车标 (App)]
import { App, Star } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const star = new Star({
    width: 100,
    height: 100,
    corners: 3,
    innerRadius: 0.15,
    fill: '#32cd79',
    editable: true
})

app.tree.add(star)
```

### Draw Star Light 

LeaferApp

ts

```
// #创建 Star [绘制星光 (Leafer)]
import { Leafer, Star } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const star = new Star({
    width: 100,
    height: 100,
    corners: 4,
    innerRadius: 0.1,
    fill: '#32cd79'
})

leafer.add(star)
```

ts

```
// #创建 Star [绘制星光 (App)]
import { App, Star } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const star = new Star({
    width: 100,
    height: 100,
    corners: 4,
    innerRadius: 0.1,
    fill: '#32cd79',
    editable: true
})

app.tree.add(star)
```

### Draw Five-Point Star 

LeaferApp

ts

```
// #创建 Star [绘制五角星 (Leafer)]
import { Leafer, Star } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const star = new Star({
    width: 100,
    height: 100,
    corners: 5,
    fill: '#32cd79'
})

leafer.add(star)
```

ts

```
// #创建 Star [绘制五角星 (App)]
import { App, Star } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const star = new Star({
    width: 100,
    height: 100,
    corners: 5,
    fill: '#32cd79',
    editable: true
})

app.tree.add(star)
```

### Draw Rounded Star Shape 

LeaferApp

ts

```
// #创建 Star [绘制圆角星形 (Leafer)]
import { Leafer, Star } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const star = new Star({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    corners: 8,
    cornerRadius: 5,
    fill: '#32cd79'
})

leafer.add(star)
```

ts

```
// #创建 Star [绘制圆角星形 (App)]
import { App, Star } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const star = new Star({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    corners: 8,
    cornerRadius: 5,
    fill: '#32cd79',
    editable: true
})

app.tree.add(star)
```
