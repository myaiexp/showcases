<!-- source: https://www.leaferjs.com/ui/en/reference/display/Ellipse.html -->

# Ellipse Element 

Draw circles, rings, sector rings, sectors, arcs, and ellipses. To draw from the center point, see around.

  

Inheritance

Ellipse  >  UI

## Key Properties 

### width: `number` 

Diameter on the X axis.

### height: `number` 

Diameter on the Y axis.

ts

```
// circle
width: 100
height: 100

// ellipse
width: 50
height: 100
```

### startAngle: `number` 

Start angle of the arc. See angle. Range: -180 to 180.

### endAngle: `number` 

End angle of the arc. See angle. Range: -180 to 180.

### innerRadius: `number` 

Inner radius ratio. Range: 0.0 to 1.0.

ts

```
// sector
startAngle: -60
endAngle: 180

// ring
innerRadius: 0.5
```

### closed: `boolean` 

Whether the ellipse is closed. Defaults to true.

Set to false to draw an arc instead.

## Corner Properties 

### cornerRadius: `number` 

Corner radius that makes shape corners smoother.

Note

Requires installing the corner plugin, or using the full leafer bundle (already includes this plugin).

## Box Element 

### EllipseBox 

## Inheritance 

### Ellipse  >  UI 

## Examples 

### Draw Circle 

The center point is located at `width / 2`, `height / 2`.

LeaferApp

ts

```
// #创建 Ellipse [绘制圆 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    fill: "#32cd79"
})

leafer.add(ellipse)
```

ts

```
// #创建 Ellipse [绘制圆 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    fill: "#32cd79",
    editable: true
})

app.tree.add(ellipse)
```

### Draw Ring 

LeaferApp

ts

```
// #创建 Ellipse [绘制圆环 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: "#32cd79"
})

leafer.add(ellipse)
```

ts

```
// #创建 Ellipse [绘制圆环 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: "#32cd79",
    editable: true
})

app.tree.add(ellipse)
```

### Draw Sector Ring 

LeaferApp

ts

```
// #创建 Ellipse [绘制扇形圆环 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    startAngle: -60,
    endAngle: 180,
    innerRadius: 0.5,
    fill: "#32cd79"
})

leafer.add(ellipse)
```

ts

```
// #创建 Ellipse [绘制扇形圆环 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    startAngle: -60,
    endAngle: 180,
    innerRadius: 0.5,
    fill: "#32cd79",
    editable: true
})

app.tree.add(ellipse)
```

### Draw Sector 

LeaferApp

ts

```
// #创建 Ellipse [绘制扇形 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    startAngle: -60,
    endAngle: 180,
    fill: "#32cd79"
})

leafer.add(ellipse)
```

ts

```
// #创建 Ellipse [绘制扇形 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    startAngle: -60,
    endAngle: 180,
    fill: "#32cd79",
    editable: true
})

app.tree.add(ellipse)
```

### Draw Rounded Arc 

LeaferApp

ts

```
// #创建 Ellipse [绘制圆角弧线 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    startAngle: -60,
    endAngle: 180,
    closed: false,
    stroke: "#32cd79",
    strokeWidth: 10,
    strokeAlign: 'center',
    strokeCap: 'round'
})

leafer.add(ellipse)
```

ts

```
// #创建 Ellipse [绘制圆角弧线 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    startAngle: -60,
    endAngle: 180,
    innerRadius: 1,
    closed: false,  // 建议加上，性能更好
    stroke: "#32cd79",
    strokeWidth: 10,
    strokeAlign: 'center',
    strokeCap: 'round',
    editable: true
})

app.tree.add(ellipse)
```

### Draw Rounded Sector Ring 

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

### Draw Ellipse 

LeaferApp

ts

```
// #创建 Ellipse [绘制椭圆 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const ellipse = new Ellipse({
    width: 50,
    height: 100,
    fill: "#32cd79"
})

leafer.add(ellipse)
```

ts

```
// #创建 Ellipse [绘制椭圆 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const ellipse = new Ellipse({
    width: 50,
    height: 100,
    fill: "#32cd79",
    editable: true
})

app.tree.add(ellipse)
```
