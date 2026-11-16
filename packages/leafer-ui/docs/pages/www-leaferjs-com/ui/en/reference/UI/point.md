<!-- source: https://www.leaferjs.com/ui/en/reference/UI/point/ -->

# Coordinate Conversion 

Conversion between world coordinates and page coordinates, local coordinates, inner coordinates, and box coordinates.

Supports converting movement distance, and converting browser coordinates in Leafer. Also provides a high-performance quick conversion method.

## Convert World Coordinates 

### getPagePoint ( worldPoint: `IPointData`, relative?: `UI`, distance?: `boolean` ): `IPointData` 

Get page coordinates (convert world coordinates to page coordinates).

### getLocalPoint ( worldPoint: `IPointData`, relative?: `UI`, distance?: `boolean` ): `IPointData` 

Get local coordinates (convert world coordinates to local coordinates).

### getInnerPoint ( worldPoint: `IPointData`, relative?: `UI`, distance?: `boolean` ): `IPointData` 

Get inner coordinates (convert world coordinates to inner coordinates).

### getBoxPoint ( worldPoint: `IPointData`, relative?: `UI`, distance?: `boolean` ): `IPointData` 

Get box coordinates (convert world coordinates to box coordinates).

## Convert Page Coordinates 

### getWorldPointByPage ( point: `IPointData`, relative?: `UI`, distance?: `boolean` ): `IPointData` 

Get world coordinates (convert page coordinates to world coordinates).

## Convert Local Coordinates 

### getWorldPointByLocal ( point: `IPointData`, relative?: `UI`, distance?: `boolean` ): `IPointData` 

Get world coordinates (convert local coordinates to world coordinates).

### getInnerPointByLocal ( point: `IPointData`, relative?: `UI`, distance?: `boolean` ): `IPointData` 

Get inner coordinates (convert local coordinates to inner coordinates).

## Convert Inner Coordinates 

### getWorldPoint ( innerPoint: `IPointData`, relative?: `UI`, distance?: `boolean` ): `IPointData` 

Get world coordinates (convert inner coordinates to world coordinates).

### getLocalPointByInner ( point: `IPointData`, relative?: `UI`, distance?: `boolean` ): `IPointData` 

Get local coordinates (convert inner coordinates to local coordinates).

### getBoxPointByInner ( point: `IPointData`, relative?: `UI`, distance?: `boolean` ): `IPointData` 

Get box coordinates (convert inner coordinates to box coordinates).

## Convert Box Coordinates 

### getWorldPointByBox ( point: `IPointData`, relative?: `UI`, distance?: `boolean` ): `IPointData` 

Get world coordinates (convert box coordinates to world coordinates).

### getInnerPointByBox ( point: `IPointData`, relative?: `UI`, distance?: `boolean` ): `IPointData` 

Get inner coordinates (convert box coordinates to inner coordinates).

## Optional Parameters 

### Relative element 

Second optional parameter: relative?: `UI`

Treat the relative element as the world coordinate system, enabling conversion between a child and any parent coordinate system.

### Convert movement distance 

Third optional parameter: distance?: `boolean`

### Modify coordinates directly 

Fourth optional parameter: change?: `boolean`

Directly modifies the input coordinates and returns them, reducing the overhead of creating new objects.

## Related 

### Convert browser coordinates in Leafer 

## Belongs To 

### UI Element 

## Examples 

### Convert world coordinates to inner coordinates 

ts

```
// #坐标转换 [世界坐标转内部坐标 (Leafer)]
import { Leafer, Group, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group({ x: 50, y: 50, scale: 5, children: [new Rect({ fill: '#32cd79' })] })

leafer.add(group)

// 世界坐标转内部坐标
const worldPoint = { x: 100, y: 100 }
const innerPoint = group.getInnerPoint(worldPoint)

console.log(innerPoint) // {x: 10, y: 10}
```

### Get frame coordinates 

Use the second optional parameter: relative?: `UI`

Treat the relative element as the world coordinate system, enabling conversion between a child and any parent coordinate system.

ts

```
// #坐标转换 [内部坐标转世界坐标 (Leafer)]
import { Leafer, Frame, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 50, y: 50, scale: 5, fill: '#32cd79' })
const frame = new Frame({ x: 200, y: 100, width: 600, height: 800, children: [rect] })

leafer.add(frame)

// 内部坐标转世界坐标、frame坐标
const innerPoint = { x: 10, y: 10 }
const worldPoint = rect.getWorldPoint(innerPoint)
const framePoint = rect.getWorldPoint(innerPoint, frame)

console.log(worldPoint) // {x: 300, y: 200} 
console.log(framePoint) // {x: 100, y: 100} 在 frame 中的坐标
```

### Get inner movement distance 

Use the third optional parameter: distance?: `boolean`

Can convert movement distance and length.

ts

```
// #坐标转换 [世界坐标中的移动距离 转 内部坐标移动距离 (Leafer)]
import { Leafer, Group, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group({ x: 50, y: 50, scale: 5, children: [new Rect({ fill: '#32cd79' })] })

leafer.add(group)

// 世界坐标中的移动距离 转 内部坐标移动距离
const worldMovePoint = { x: 100, y: 100 }
const innerMovePoint = group.getInnerPoint(worldMovePoint, null, true)

console.log(innerMovePoint) // {x: 20, y: 20}
```

### Drag to create shapes 

Dragging DOM elements onto the canvas to create shapes requires using native browser coordinate conversion.

Add to treeAdd to Frame

ts

```
// #拖拽创建图形 [添加到 tree]
import { App, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

// 创建可拖拽的 dom 图形（圆形、矩形）
document.body.innerHTML = `
<div id="circle" draggable="true" style="width: 50px; height: 50px; border-radius: 25px; background-color: #32cd79; cursor: move; display: inline-block" ></div>
<div id="rect" draggable="true" style="width: 50px; height: 50px; background-color: #32cd79; cursor: move; display: inline-block" ></div>
<div id="leafer" style="position: absolute; top: 70px; right: 0; bottom: 0; left: 0;"></div>
`

// 创建应用
const app = new App({ view: 'leafer', fill: '#333', editor: {} })

app.tree.add({ tag: 'Text', x: 100, y: 100, text: '可拖拽上方图形到这里', fill: '#999', fontSize: 16 })


// 设置拖拽数据
document.getElementById('rect').addEventListener('dragstart', function (e) {
    e.dataTransfer.setData("type", 'rect')
})

document.getElementById('circle').addEventListener('dragstart', function (e) {
    e.dataTransfer.setData("type", 'circle')
})


// 让画布可以接收拖拽内容
document.getElementById('leafer').addEventListener('dragover', function (e) {
    e.preventDefault()
})

// 拖拽释放，创建相应图形
document.getElementById('leafer').addEventListener('drop', function (e) {
    const type = e.dataTransfer.getData("type")
    const point = app.getPagePointByClient(e) // 浏览器原生事件的 client 坐标 转 应用的 page 坐标
    if (type === 'rect') {
        app.tree.add(Rect.one({ fill: '#32cd79', editable: true }, point.x, point.y))
    } else if (type === 'circle') {
        app.tree.add(Ellipse.one({ fill: '#32cd79', editable: true }, point.x, point.y))
    }
})
```

ts

```
// #拖拽创建图形 [添加到 Frame]
import { App, Frame, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

// 创建可拖拽的 dom 图形（圆形、矩形）
document.body.innerHTML = `
<div id="circle" draggable="true" style="width: 50px; height: 50px; border-radius: 25px; background-color: #32cd79; cursor: move; display: inline-block" ></div>
<div id="rect" draggable="true" style="width: 50px; height: 50px; background-color: #32cd79; cursor: move; display: inline-block" ></div>
<div id="leafer" style="position: absolute; top: 70px; right: 0; bottom: 0; left: 0;"></div>
`

// 创建应用
const app = new App({ view: 'leafer', fill: '#333', editor: {} })

const frame = Frame.one({
    children: [{ tag: 'Text', x: 100, y: 100, text: '可拖拽上方图形到这里', fill: '#999', fontSize: 16 }]
}, 100, 100, 500, 500)

app.tree.add(frame)


// 设置拖拽数据
document.getElementById('rect').addEventListener('dragstart', function (e) {
    e.dataTransfer.setData("type", 'rect')
})

document.getElementById('circle').addEventListener('dragstart', function (e) {
    e.dataTransfer.setData("type", 'circle')
})


// 让画布可以接收拖拽内容
document.getElementById('leafer').addEventListener('dragover', function (e) {
    e.preventDefault()
})

// 拖拽释放，创建相应图形
document.getElementById('leafer').addEventListener('drop', function (e) {
    const type = e.dataTransfer.getData("type")
    const point = app.getWorldPointByClient(e) // 浏览器原生事件的 client 坐标 转 世界坐标
    const framePoint = frame.getInnerPoint(point) // 世界坐标 再转 frame 内坐标
    if (type === 'rect') {
        frame.add(Rect.one({ fill: '#32cd79', editable: true }, framePoint.x, framePoint.y))
    } else if (type === 'circle') {
        frame.add(Ellipse.one({ fill: '#32cd79', editable: true }, framePoint.x, framePoint.y))
    }
})
```
