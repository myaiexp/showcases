<!-- source: https://www.leaferjs.com/ui/en/reference/UI/corner.html -->

# Corner 

Polyline corner radius is supported by default. Curve corner radius requires a plugin.

Note

Corner radius between curves and polylines, or between polylines and curves, requires installing the corner plugin.

## Key Properties 

### cornerRadius: `number` 

Corner radius.

## Belongs to 

### UI Elements 

## Examples 

### Draw a sector ring with rounded corners 

LeaferApp

ts

```
// #创建 Ellipse [绘制带圆角的扇形圆环 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'
import '@leafer-in/corner' // 导入圆角插件

const leafer = new Leafer({ view: window })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    startAngle: -60,
    endAngle: 180,
    innerRadius: 0.5,
    cornerRadius: 10,
    fill: "#32cd79"
})

leafer.add(ellipse)
```

ts

```
// #创建 Ellipse [绘制带圆角的扇形圆环 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/corner' // 导入圆角插件

const app = new App({ view: window, editor: {} })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    startAngle: -60,
    endAngle: 180,
    innerRadius: 0.5,
    cornerRadius: 10,
    fill: "#32cd79",
    editable: true
})

app.tree.add(ellipse)
```
