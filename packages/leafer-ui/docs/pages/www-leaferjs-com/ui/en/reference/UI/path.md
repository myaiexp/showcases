<!-- source: https://www.leaferjs.com/ui/en/reference/UI/path.html -->

# path 

Path-first mode. It can be used to modify the shape of a Box, or convert a normal element into a path-based element.

Once `path` data is set or the pen is used, the element switches to path mode and prioritizes rendering the manually defined path.

## Key Property 

### path: `IPathString` | `IPathCommandData` 

Path data, supporting both SVG and Canvas drawing commands.

You can use the pen for quick path creation.

**Convert current element shape to path: getPath()**

ts

```
// Convert a polygon into a path for editing
polygon.path = polygon.getPath()
```

### windingRule: `WindingRule` 

Path winding rule. Defaults to `nonzero`.

Defines how overlapping paths are filled, enabling effects like union, intersection, or subtraction.

ts

```
type WindingRule = 'nonzero' | 'evenodd'
```

## Read-only Properties 

### pathInputed: `boolean` 

Whether the element is in path mode.

Setting `path` to `null` restores it back to non-path mode.

### pen: PathCreator 

A pen tool that works like the Canvas 2D API, allowing fast path drawing with additional enhanced methods.

The pen directly modifies the element’s `path` data.

Note

To reduce instance creation, the pen is globally shared. Accessing `pen` automatically attaches the current element’s path.

Therefore, operations must be completed in sequence on the same element, e.g.: `rect.pen.moveTo(100,100).lineTo(200,200)`.

## Belongs to 

### UI Element 

## Example 

### Draw using pen 

LeaferApp

ts

```
// #Rect 转路径优先模式 [使用 pen 绘制 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79'
})

leafer.add(rect)

rect.windingRule = 'evenodd'
rect.pen.roundRect(0, 0, 100, 100, 30).drawArc(50, 50, 25)
```

ts

```
// #Rect 转路径优先模式 [使用 pen 绘制 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79'
})

app.tree.add(rect)

rect.windingRule = 'evenodd'
rect.pen.roundRect(0, 0, 100, 100, 30).drawArc(50, 50, 25)
```

### Using path data 

LeaferApp

ts

```
// #Rect 转路径优先模式 [使用 path 属性 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    windingRule: 'evenodd',
    path: 'X0 0 100 100 30M75 50P50 50 25',
    fill: '#32cd79'
})

leafer.add(rect)
```

ts

```
// #Rect 转路径优先模式 [使用 path 属性 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    windingRule: 'evenodd',
    path: 'X0 0 100 100 30M75 50P50 50 25',
    fill: '#32cd79'
})

app.tree.add(rect)
```
