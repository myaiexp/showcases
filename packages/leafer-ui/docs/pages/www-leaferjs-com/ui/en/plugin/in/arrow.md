<!-- source: https://www.leaferjs.com/ui/en/plugin/in/arrow/ -->

# Arrow Element 

Arrow element used to add start/end arrowheads to lines. It provides 12 built-in arrow styles and supports custom definitions.

Inheritance

Arrow  >  Line  >  UI

## Install Plugin 

You need to install the arrow plugin to use it. Click here to visit the Github repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/arrow
```

sh

```
pnpm add @leafer-in/arrow
```

sh

```
yarn add @leafer-in/arrow
```

sh

```
bun add @leafer-in/arrow
```

Or include via script tag and access plugin features using the global variable `LeaferIN.arrow`.

arrow.minarrow

html

```
<script src="https://unpkg.com/@leafer-in/arrow@2.3.4/dist/arrow.min.js"></script>
<script>
  const { Arrow } = LeaferIN.arrow
</script>
```

html

```
<script src="https://unpkg.com/@leafer-in/arrow@2.3.4/dist/arrow.js"></script>
<script>
  const { Arrow } = LeaferIN.arrow
</script>
```

## Key Properties 

### startArrow: `IArrowType` 

Start arrow. Default is none.

Supports custom arrow styles. Line / Path elements also support this property (requires this plugin).

### endArrow: `IArrowType` 

End arrow. Default is angle.

Supports custom arrow styles. Line / Path elements also support this property (requires this plugin).

ts

```
type IArrowType =
  | 'none'
  | 'angle' // angle arrow (high performance)
  | 'angle-side' // single-side angle arrow
  | 'arrow' // standard arrow
  | 'triangle' // triangle arrow
  | 'triangle-flip' // flipped triangle arrow
  | 'circle' // circle arrow
  | 'circle-line' // circle line arrow
  | 'square' // square arrow
  | 'square-line' // square line arrow
  | 'diamond' // diamond arrow
  | 'diamond-line' // diamond line arrow
  | 'mark' // mark arrow
  | IArrowTypeData // arrow object
  | string // custom arrow

interface IArrowTypeData {
  type: IArrowType // arrow type
  scale?: number // scale factor, avoid overly large values (may cause artifacts)
  rotation?: number // additional rotation angle
}
```

## Points Mode 

Use `points` to define a polyline.

### points: `number[]` 

Draw polyline using coordinate array `[x1, y1, x2, y2, ...]`.

### curve: `boolean | number` 

Whether to convert to a smooth path. Default is `false`.

Can be set from `0 ~ 1` to control curvature. Default is `0.5`.

## Path Mode 

### Path priority mode 

## Corner Radius 

### cornerRadius: `number` 

Corner radius for smoothing polyline corners.

## Static Method 

### registerArrow ( name: `string`, data: `IPathDataArrow` ) 

Register a custom arrow style. See example.

Designed based on line width = 1. Imagine the arrow placed from left to right, with the endpoint at (0,0). Scaling and rotation are handled automatically.

ts

```
interface IPathDataArrow {
  connect?: IPathDataArrowOffset // connection point with line
  offset?: IPathDataArrowOffset // offset to align with endpoint
  path: IPathCommandData // supports M, L, C, Q, O commands only
  fill?: boolean // since v2.3.4, supports filled arrows (stroke must not be transparent; use opacity instead)
}

interface IPathDataArrowOffset {
  x?: number // x-axis offset
  bevelJoin?: number // offset when strokeJoin is bevel
  roundJoin?: number // offset when strokeJoin is round
}
```

## Inheritance 

### Arrow  >  Line  >  UI 

## Examples 

### Angle arrow 

ts

```
// #箭头样式 [角度箭头]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

Make arrow larger

ts

```
// #箭头样式 [角度箭头 - 箭头变得更大一些]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    strokeCap: 'square',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

Smooth strokeJoin

ts

```
// #箭头样式 [角度箭头 - strokeCap变的平滑]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    strokeCap: 'round',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

Smooth strokeCap

ts

```
// #箭头样式 [角度箭头 - strokeJoin变的平滑]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    strokeJoin: 'round',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

Smooth strokeCap / strokeJoin

ts

```
// #箭头样式 [角度箭头 - 箭头变得平滑]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    strokeCap: 'round',
    strokeJoin: 'round',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

### Single-side angle arrow 

ts

```
// #箭头样式 [单边角度箭头]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    endArrow: 'angle-side',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

### Standard arrow 

ts

```
// #箭头样式 [标准箭头]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    endArrow: 'arrow',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

Smooth strokeCap / strokeJoin

ts

```
// #箭头样式 [标准箭头 - 箭头都变得平滑]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    endArrow: 'arrow',
    strokeCap: 'round',
    strokeJoin: 'round',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

### Triangle arrow 

ts

```
// #箭头样式 [三角形箭头]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    endArrow: 'triangle',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

### Flipped triangle arrow 

ts

```
// #箭头样式 [反向三角形箭头]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    endArrow: 'triangle-flip',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

### Circle arrow 

ts

```
// #箭头样式 [圆形箭头]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    endArrow: 'circle',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

### Circle line arrow 

ts

```
// #箭头样式 [圆形箭头（线性）]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    endArrow: 'circle-line',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

### Square arrow 

ts

```
// #箭头样式 [方形箭头]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    endArrow: 'square',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

### Square line arrow 

ts

```
// #箭头样式 [方形箭头（线性）]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    endArrow: 'square-line',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

### Diamond arrow 

ts

```
// #箭头样式 [菱形箭头]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    endArrow: 'diamond',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

### Diamond line arrow 

ts

```
// #箭头样式 [菱形箭头（线性）]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    endArrow: 'diamond-line',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

### Mark arrow 

ts

```
// #箭头样式 [标注箭头]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    startArrow: 'mark',
    endArrow: 'mark',
    strokeWidth: 5,
    stroke: '#32cd79'
})

leafer.add(arrow)
```

### Dashed arrow animation 

ts

```
// #动画样式 [虚线箭头动画]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    x: 100,
    y: 100,
    stroke: '#32cd79',
    strokeWidth: 5,
    dashPattern: [10, 10], // 绘制虚线
    dashOffset: 0,
    animation: { // 虚线动画
        style: { dashOffset: -20 },
        easing: 'linear',
        duration: 0.5,
        loop: true,
    }
})

leafer.add(arrow)
```

### Arrow scale x2 

ts

```
// #箭头样式 [箭头大小放大2倍]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    stroke: '#32cd79',
    endArrow: {
        type: 'triangle',
        scale: 2, // 箭头大小放大2倍
    }
})

leafer.add(arrow)
```

### Arrow rotation +30 degrees 

ts

```
// #箭头样式 [箭头增量旋转30度]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    stroke: '#32cd79',
    strokeWidth: 5,
    endArrow: {
        type: 'angle',
        rotation: 30, // 箭头增量旋转30度
    }
})

leafer.add(arrow)
```

### Register custom arrow style 

The `path()` method creates a `PathCreator` instance, similar to Canvas 2D API, for quickly drawing paths.

ts

```
// #箭头样式 [自定义箭头样式]
import { Leafer, path } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件


// 注册自定义箭头样式
Arrow.registerArrow('custom-arrow', {
    // 按照线宽为 1 自定义，箭头末端为（0，0），内部会自动处理缩放、旋转角度
    connect: { x: -0.5 }, // 箭头与线条的连接点位置
    offset: {
        x: -0.71, // 偏移距离（x轴）
        bevelJoin: 0.36, // strokeJoin 为 bevel 时增加的偏移距离（x轴）
        roundJoin: 0.22 // strokeJoin 为 round 时增加的偏移距离（x轴）
    },
    // 路径数据，用线条绘制、拼凑出箭头形状（没有fill)，只用关心箭头从左往右的水平样式，仅支持 M、L、C、Q、O 绘图命令
    path: path().moveTo(-5, -5).lineTo(0, 0).lineTo(-5, 3).path, // = [1, -5, -3, 2, 0, 0, 2, -5, 3] 
    // fill: true // v2.3.4 开始支持启用fill
})


const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    y: 50,
    strokeWidth: 5,
    stroke: '#32cd79',
    endArrow: 'custom-arrow' // 使用自定义箭头
})

leafer.add(arrow)
```
