<!-- source: https://www.leaferjs.com/ui/en/plugin/in/linker/ -->

# Linker Element 

Linker — a high-performance Canvas connector element.

For visually creating and editing connectors, use the Linker Editor plugin.

Inheritance

Linker  >  Line  >  UI

## Changelog 

The final version before open-sourcing was v1.0.2. View the changelog.

## 📦 Install the Plugin (Open Source) 

The `linker` plugin is required to use this feature. Visit the GitHub repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/linker
```

sh

```
pnpm add @leafer-in/linker
```

sh

```
yarn add @leafer-in/linker
```

sh

```
bun add @leafer-in/linker
```

Alternatively, you can include it using a `<script>` tag and access the plugin through the global variable `LeaferIN.linker`.

linker.minlinker

html

```
<script src="https://unpkg.com/@leafer-in/linker@2.3.4/dist/linker.min.js"></script>

<script>
  const { Linker, LinkerData } = LeaferIN.linker
</script>
```

html

```
<script src="https://unpkg.com/@leafer-in/linker@2.3.4/dist/linker.js"></script>

<script>
  const { Linker, LinkerData } = LeaferIN.linker
</script>
```

## Key Properties 

### lineType: `ILineType` 

The line type. Defaults to `'curve'`.

ts

```
type ILineType =
  | 'straight' // Straight line
  | 'polyline' // Polyline
  | 'curve' // Curve
```

### startPoint: `ILinkerPointData` 

The starting point of the connector.

ts

```
interface ILinkerPointData {
  id?: string | UI // The id of the start element, or an element instance (cannot be exported to JSON)
  direction?: IDirection4 | 'center' // The connector direction relative to the element. 'center' enables automatic direction
  point?: IAlign | IUnitPointData // The connection point relative to the element's actual content box. Supports alignment names and percentage coordinates
  offset?: IOptionPointData // Offset relative to the connection point
}

type IDirection4 = 'top' | 'right' | 'bottom' | 'left'

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

interface IUnitPointData extends IPointData {
  type?: 'percent' | 'px'
}

interface IPointData {
  x: number
  y: number
}

interface IOptionPointData {
  x?: number
  y?: number
}
```

### endPoint: `ILinkerPointData` 

The endpoint of the connector.

## points Mode 

You can add intermediate points to the connector using `points`.

### points: `number`[] | IPointData[] 

Add intermediate points using a coordinate array `[x1, y1, x2, y2, ...]` for better performance.

Alternatively, use an array of coordinate objects `[ {x, y}, {x, y}, ...]` for better readability, with lower performance.

### curve: `IPointsCurveData` 

Defines how to smooth the intermediate points.

Supports custom smoothing types for points.

ts

```
interface IPointsCurveData {
  type: IPointsCurveType
  value: IPointsCurveValue
}

type IPointsCurveType =
  | 'C' // Use cubic Bezier curves to smooth points. Extended. Default.
  | (string & {})

// Default

linker.curve = {
  type: 'C',
  value: 0.5, // Curvature, range: 0-1
}
```

## Computed Properties (Read-only) 

The following properties are only available after the connector element has completed its initial layout.

### startNode: UI 

The element instance at the start of the connector.

### endNode: UI 

The element instance at the end of the connector.

### startData: `ILinkerComputedPointData` 

The computed data for the starting point.

ts

```
interface ILinkerComputedPointData {
  auto: boolean // Whether the connector direction is automatic
  direction: IAlign // The actual connector direction relative to the element
  point: IPointData // The actual connection point in the element's content box coordinate system
}
```

### endData: `ILinkerComputedPointData` 

The computed data for the endpoint.

## Properties Added to Connected Elements 

### startLinker?: `Linker`[] 

All connector instances that use the current element as their starting element.

### endLinker?: `Linker`[] 

All connector instances that use the current element as their ending element.

## Key Methods 

### createStartPoint ( worldPoint: `IPointData`, node?: UI, options?: `ILinkerPointOptions` ): `ILinkerPointData` 

Creates the startPoint of a connector.

Automatically determines the connection point on the `node` element based on the world coordinate from the event.

If `node` is not provided, a coordinate-only point is created.

ts

```
interface IPointData {
  x: number
  y: number
}

interface ILinkerPointOptions {
  snapRadius?: number // After snapping to a direction point, if the snap distance exceeds this radius (relative to the element's Box coordinate system), the connection point automatically adds offset: {x, y}
  mode?:
    | 'edge' // Automatically snap to the edge of the element's bounding box. Default mode.
    | 'four' // Automatically snap to one of the four directions on the element's bounding box
    | 'auto' // Automatically snap to the element's bounding box. The best direction is automatically updated when the element is dragged.
    | 'free' // Can snap to any point inside the element
}
```

### createEndPoint ( worldPoint: `IPointData`, node?: UI, options?: `ILinkerPointOptions` ): `ILinkerPointData` 

Creates the endPoint of a connector.

### createLinkerPoint ( worldPoint: `IPointData`, node?: UI, options?: `ILinkerPointOptions` ): `ILinkerPointData` 

Generates a connection point only. You can modify the data before assigning it to the connector's startPoint or endPoint.

## Examples 

### Create a Connector Element 

ts

```
// #Linker [创建连线元素]
import { App, Box, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/find' // 导入查找元素插件
import '@leafer-in/arrow' // 导入箭头插件

import { Linker } from '@leafer-in/linker' // 导入连线插件

const app = new App({ view: window, editor: {} })

app.tree.cacheId = true // 创建时缓存元素id, 加快查找id的速度

const rect1 = Box.one({ id: 'rect1', editable: true, fill: '#FFE04B', cornerRadius: [20, 0, 0, 20], children: [new Ellipse({ x: 92, y: 50, width: 8, height: 8, around: 'center', fill: '#836DFF', stroke: '#000', strokeWidth: 1 })] }, 100, 100, 100, 100)
const rect2 = Box.one({ id: 'rect2', editable: true, fill: '#FFE04B', cornerRadius: [20, 0, 0, 20] }, 100, 300, 100, 100)
const rect3 = Box.one({ id: 'rect3', editable: true, fill: '#FEB027', cornerRadius: [0, 20, 20, 0], children: [new Ellipse({ x: 8, y: 20, width: 8, height: 8, around: 'center', fill: '#836DFF' })] }, 400, 200, 100, 100)


const linker1 = new Linker({  // 类似 AI 工作流连线，位于底部
    startPoint: { id: 'rect1', point: 'right' },
    endPoint: { id: 'rect3', direction: 'left', point: 'top-left', offset: { y: 20 } },
    stroke: [{ type: 'solid', color: '#000', style: { strokeWidth: 4 } }, { type: 'solid', color: '#836DFF' }],
    strokeWidth: 2,
})

app.tree.add(linker1)


app.tree.add(rect1)
app.tree.add(rect2)
app.tree.add(rect3)


const linker2 = new Linker({  // 带箭头的连线，位于顶部
    startPoint: { id: 'rect2' }, // 箭头自动方向
    endPoint: { id: 'rect3' },
    endArrow: 'angle',
    stroke: '#ff4c4c',
    strokeWidth: 2
})

app.tree.add(linker2)
```

### Connector Element with Flow Animation 

ts

```
// #Linker [带流动动画的连线元素]
import { App, Box, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/find' // 导入查找元素插件
import '@leafer-in/arrow' // 导入箭头插件
import '@leafer-in/animate' // 导入动画插件

import { Linker } from '@leafer-in/linker' // 导入连线插件

const app = new App({ view: window, editor: {} })

app.tree.cacheId = true // 创建时缓存元素id, 加快查找id的速度

const rect1 = Box.one({ id: 'rect1', editable: true, fill: '#FFE04B', cornerRadius: [20, 0, 0, 20], children: [new Ellipse({ x: 92, y: 50, width: 8, height: 8, around: 'center', fill: '#836DFF', stroke: '#000', strokeWidth: 1 })] }, 100, 100, 100, 100)
const rect2 = Box.one({ id: 'rect2', editable: true, fill: '#FFE04B', cornerRadius: [20, 0, 0, 20] }, 100, 300, 100, 100)
const rect3 = Box.one({ id: 'rect3', editable: true, fill: '#FEB027', cornerRadius: [0, 20, 20, 0], children: [new Ellipse({ x: 8, y: 20, width: 8, height: 8, around: 'center', fill: '#836DFF' })] }, 400, 200, 100, 100)


const linker1 = new Linker({  // 类似 AI 工作流连线，位于底部 
    startPoint: { id: 'rect1', point: 'right' },
    endPoint: { id: 'rect3', direction: 'left', point: 'top-left', offset: { y: 20 } },
    stroke: '#836DFF',
    strokeWidth: 2,
    dashPattern: [10, 10], // 绘制虚线 
    dashOffset: 0,
    animation: { // 虚线动画
        style: { dashOffset: -20 },
        easing: 'linear',
        duration: 0.5,
        // reverse: true, // 反向流动
        loop: true,
    }
})

app.tree.add(linker1)


app.tree.add(rect1)
app.tree.add(rect2)
app.tree.add(rect3)


const linker2 = new Linker({  // 带箭头的连线，位于顶部 
    startPoint: { id: 'rect2' }, // 箭头自动方向
    endPoint: { id: 'rect3' },
    endArrow: 'angle',
    stroke: '#ff4c4c',
    strokeWidth: 2
})

app.tree.add(linker2)
```

### Create a Connector Element by Dragging 

ts

```
// #Linker [拖拽创建连线元素]
import { App, Box, DragEvent, Ellipse, LeafList } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/find' // 导入查找元素插件
import '@leafer-in/arrow' // 导入箭头插件
import '@leafer-in/animate' // 导入动画插件

import { Linker } from '@leafer-in/linker' // 导入连线插件

const app = new App({ view: window, editor: {} })

app.tree.cacheId = true // 创建时缓存元素id, 加快查找id的速度

const pointA = new Ellipse({ x: 92, y: 50, width: 8, height: 8, around: 'center', fill: '#836DFF', stroke: '#000', strokeWidth: 1, cursor: 'cell', data: { id: 'rect1', point: 'right' } })
const pointB = new Ellipse({ x: 92, y: 50, width: 8, height: 8, around: 'center', fill: '#836DFF', stroke: '#000', strokeWidth: 1, cursor: 'cell', data: { id: 'rect3', point: 'right' } })
const pointC = new Ellipse({ x: 8, y: 30, width: 8, height: 8, around: 'center', fill: '#836DFF', cursor: 'cell', data: { id: 'rect4', point: 'top-left', offset: { y: 30 } } })

const rect1 = Box.one({ id: 'rect1', editable: true, fill: '#FFE04B', cornerRadius: [20, 0, 0, 20], children: [pointA] }, 100, 100, 100, 100)
const rect2 = Box.one({ id: 'rect2', editable: true, fill: '#FFE04B', cornerRadius: [20, 0, 0, 20] }, 100, 300)
const rect3 = Box.one({ id: 'rect3', editable: true, fill: '#FFE04B', cornerRadius: [20, 0, 0, 20], children: [pointB] }, 100, 500, 100, 100)
const rect4 = Box.one({ id: 'rect4', editable: true, fill: '#FEB027', cornerRadius: [0, 20, 20, 0], children: [pointC] }, 400, 200, 100, 100)

app.tree.add([rect1, rect2, rect3, rect4])

const linker2 = new Linker({  // 带箭头的连线，位于顶部 
    startPoint: { id: 'rect2' }, // 箭头自动方向
    endPoint: { id: 'rect4' },
    stroke: '#ff4c4c',
    strokeWidth: 2,
    endArrow: 'angle'
})

app.tree.add(linker2)


// 拖拽创建连线

listenAdd(pointA)
listenAdd(pointB)
listenAdd(pointC)

function listenAdd(point: Ellipse): void {

    let linker: Linker

    point.on(DragEvent.START, (e: DragEvent) => {
        e.stop()
        linker = new Linker({
            startPoint: { ...point.data },
            stroke: '#836DFF',
            strokeWidth: 2,
        })
        app.tree.add(linker)
    })

    point.on(DragEvent.DRAG, (e: DragEvent) => {
        // 可以增加连接判断逻辑
        const pick = app.tree.pick(e, { exclude: new LeafList([linker, point.parent]) }) // 手动pick元素
        const target = pick && pick.path.list.find(item => item.editable && item.id) // 查找可以连接的元素
        linker.endPoint = linker.createEndPoint(e, target, {
            // 吸附模式
            // mode: 'edge' // 自动吸附到元素Box包围盒边缘，默认模式
            // mode: 'four' // 自动吸附到元素Box包围盒上的4个方向
            // mode: 'auto' // 自动吸附到元素Box包围盒上，拖拽元素会自定更新最佳方向
            // mode: 'free' // 可以吸附到元素内部
        })
    })

}
```

### Fixed Connector Width Independent of View Zoom 

ts

```
// #Linker [连线元素固定线宽不随视图放大]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/find' // 导入查找元素插件
import '@leafer-in/arrow' // 导入箭头插件

import { Linker } from '@leafer-in/linker' // 导入连线插件

const app = new App({ view: window, editor: {} })

app.tree.cacheId = true // 创建时缓存元素id, 加快查找id的速度

const rect1 = Rect.one({ id: 'rect1', editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100)
const rect2 = Rect.one({ id: 'rect2', editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100)

app.tree.add(rect1)
app.tree.add(rect2)

const linker = new Linker({
    startPoint: { id: 'rect1' }, // 箭头自动方向
    endPoint: { id: 'rect2' },
    endArrow: 'angle',
    stroke: '#836DFF',
    strokeWidth: 2,
    strokeScaleFixed: 'zoom-in', // 固定线宽，不随视图放大
})

app.tree.add(linker)
```

### Create a Connection Point with Automatic Direction Snapping and Offset 

ts

```
// #Linker [创建连线点，自动吸附方向、偏移距离]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/find' // 导入查找元素插件
import '@leafer-in/arrow' // 导入箭头插件

import { Linker } from '@leafer-in/linker' // 导入连线插件

const app = new App({ view: window, editor: {} })

app.tree.cacheId = true // 创建时缓存元素id, 加快查找id的速度

const rect1 = Rect.one({ id: 'rect1', editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100)
const rect2 = Rect.one({ id: 'rect2', editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 300)
const rect3 = Rect.one({ id: 'rect3', editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 200)

app.tree.add(rect1)
app.tree.add(rect2)
app.tree.add(rect3)

const linker = new Linker({
    startPoint: { id: 'rect1' },
    endPoint: { id: 'rect3' },
    endArrow: 'arrow',
    stroke: '#836DFF',
    strokeWidth: 2,
})

app.tree.add(linker)

setTimeout(() => {

    // 创建连线点，自动吸附方向
    console.log(linker.createStartPoint({ x: 400, y: 380 }, rect2, {
        snapRadius: 10 // 吸附到方向点上之后，如果吸附距离超过这个吸附半径（相对元素的Box坐标系），连接点对象会自动增加 offset: {x,y}
    }))

}, 2000)
```

### Straight Connector Element 

ts

```
// #Linker [直线类型的连线元素]
import { App, Box, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/find' // 导入查找元素插件
import '@leafer-in/arrow' // 导入箭头插件

import { Linker } from '@leafer-in/linker' // 导入连线插件

const app = new App({ view: window, editor: {} })

app.tree.cacheId = true // 创建时缓存元素id, 加快查找id的速度

const rect1 = Box.one({ id: 'rect1', editable: true, fill: '#FFE04B', cornerRadius: [20, 0, 0, 20], children: [new Ellipse({ x: 92, y: 50, width: 8, height: 8, around: 'center', fill: '#836DFF', stroke: '#000', strokeWidth: 1 })] }, 100, 100, 100, 100)
const rect2 = Box.one({ id: 'rect2', editable: true, fill: '#FFE04B', cornerRadius: [20, 0, 0, 20] }, 100, 300, 100, 100)
const rect3 = Box.one({ id: 'rect3', editable: true, fill: '#FEB027', cornerRadius: [0, 20, 20, 0], children: [new Ellipse({ x: 8, y: 20, width: 8, height: 8, around: 'center', fill: '#836DFF' })] }, 400, 200, 100, 100)


const linker1 = new Linker({
    lineType: 'straight', // 直线类型
    startPoint: { id: 'rect1', point: 'right' },
    endPoint: { id: 'rect3', direction: 'left', point: 'top-left', offset: { y: 20 } },
    stroke: [{ type: 'solid', color: '#000', style: { strokeWidth: 4 } }, { type: 'solid', color: '#836DFF' }],
    strokeWidth: 2,
})

app.tree.add(linker1)


app.tree.add(rect1)
app.tree.add(rect2)
app.tree.add(rect3)


const linker2 = new Linker({
    lineType: 'straight', // 直线类型
    startPoint: { id: 'rect2' }, // 箭头自动方向
    endPoint: { id: 'rect3' },
    endArrow: 'angle',
    stroke: '#ff4c4c',
    strokeWidth: 2
})

app.tree.add(linker2)
```

### Polyline Connector Element 

ts

```
// #Linker [折线类型的连线元素]
import { App, Box, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/find' // 导入查找元素插件
import '@leafer-in/arrow' // 导入箭头插件

import { Linker } from '@leafer-in/linker' // 导入连线插件

const app = new App({ view: window, editor: {} })

app.tree.cacheId = true // 创建时缓存元素id, 加快查找id的速度

const rect1 = Box.one({ id: 'rect1', editable: true, fill: '#FFE04B', cornerRadius: [20, 0, 0, 20], children: [new Ellipse({ x: 92, y: 50, width: 8, height: 8, around: 'center', fill: '#836DFF', stroke: '#000', strokeWidth: 1 })] }, 100, 100, 100, 100)
const rect2 = Box.one({ id: 'rect2', editable: true, fill: '#FFE04B', cornerRadius: [20, 0, 0, 20] }, 100, 300, 100, 100)
const rect3 = Box.one({ id: 'rect3', editable: true, fill: '#FEB027', cornerRadius: [0, 20, 20, 0], children: [new Ellipse({ x: 8, y: 20, width: 8, height: 8, around: 'center', fill: '#836DFF' })] }, 400, 200, 100, 100)


const linker1 = new Linker({
    lineType: 'polyline', // 折线类型
    startPoint: { id: 'rect1', point: 'right' },
    endPoint: { id: 'rect3', direction: 'left', point: 'top-left', offset: { y: 20 } },
    stroke: [{ type: 'solid', color: '#000', style: { strokeWidth: 4 } }, { type: 'solid', color: '#836DFF' }],
    strokeWidth: 2,
})

app.tree.add(linker1)


app.tree.add(rect1)
app.tree.add(rect2)
app.tree.add(rect3)


const linker2 = new Linker({  // 带箭头的连线，位于顶部
    lineType: 'polyline', // 折线类型
    startPoint: { id: 'rect2' }, // 箭头自动方向
    endPoint: { id: 'rect3' },
    endArrow: 'angle',
    stroke: '#ff4c4c',
    strokeWidth: 2
})

app.tree.add(linker2)
```
