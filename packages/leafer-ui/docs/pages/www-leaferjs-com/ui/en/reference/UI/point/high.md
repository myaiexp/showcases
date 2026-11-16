<!-- source: https://www.leaferjs.com/ui/en/reference/UI/point/high.html -->

# Quick Conversion 

Quick conversion between world coordinates, local coordinates, and inner coordinates. The input coordinates are modified directly. Methods for simple conversion are also provided.

Supports converting movement distance.

## Key Methods 

### worldToInner ( worldPoint:`IPointData` ) 

Convert world coordinates to inner coordinates, directly modifies world.

### worldToLocal ( worldPoint: `IPointData` ) 

Convert world coordinates to local coordinates, directly modifies world.

### innerToWorld ( innerPoint: `IPointData` ) 

Convert inner coordinates to world coordinates, directly modifies inner.

### localToWorld ( localPoint: `IPointData` ) 

Convert local coordinates to world coordinates, directly modifies local.

## Optional Parameters 

All conversion methods support the following.

### Do not modify coordinates directly 

Second optional parameter: to?: `IPointData`, used to store the converted result.

### Convert movement distance 

Third optional parameter: distance?: `boolean`

### Relative element 

Fourth optional parameter: relative?: `UI`

Treat the relative element as the world coordinate system, enabling conversion between a child and any parent coordinate system.

## Belongs To 

### UI Element 

## Examples 

### Convert to local coordinates 

ts

```
// #快速坐标转换 [世界坐标转本地坐标]
import { Group, Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })
const group = new Group({ x: 100, y: 100, scaleX: 2, scaleY: 2, children: [rect] })

leafer.add(group)

// 世界坐标转本地坐标
const point = { x: 100, y: 100 }
rect.worldToLocal(point)

console.log(point) // {x: 0, y: 0}
```

### Convert movement distance to local 

ts

```
// #快速坐标转换 [世界坐标中的移动距离 转 本地坐标移动距离]
import { Group, Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })
const group = new Group({ x: 100, y: 100, scaleX: 2, scaleY: 2, children: [rect] })

leafer.add(group)

// 世界坐标中的移动距离 转 本地坐标移动距离
const worldMove = { x: 10, y: 10 }
const localMove = { x: 0, y: 0 }
rect.worldToLocal(worldMove, localMove, true)

console.log(localMove) // {x: 5, y: 5}
```
