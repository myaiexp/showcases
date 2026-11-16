<!-- source: https://www.leaferjs.com/ui/en/reference/display/Path.html -->

# Path Element 

Draw paths. You can create arbitrary shapes using path data. See drawing commands.

  

Inheritance

Path  >  UI

## Key Properties 

### path: `IPathString` ｜ `IPathCommandData` ｜ `IPathCommandObject`[] 

Path data. Supports SVG path strings, numeric command arrays, and object-based command arrays.

You can use the pen tool to quickly create paths.

### windingRule: `WindingRule` 

Path winding rule. Defaults to `nonzero`.

Defines the fill behavior when multiple paths overlap, enabling effects such as union, intersection, and subtraction.

ts

```
type WindingRule = 'nonzero' | 'evenodd'
```

## Readonly Properties 

### pen: PathCreator 

A drawing pen that works like the Canvas 2D API, allowing fast path creation with extended methods.

The pen directly modifies the element’s `path` property.

Note

To reduce the number of created pen instances, a single global pen is shared. When accessing `pen`, it automatically binds to the current element’s path.

Therefore, the pen must be used immediately after the element, completing the drawing in one chain, e.g.: `rect.pen.moveTo(100,100).lineTo(200,200)`.

## Corner Properties 

### cornerRadius: `number` 

Corner radius that smooths path corners.

Note

Smooth transitions between curves and lines require installing the corner plugin.

## Box Element 

### PathBox 

## Inheritance 

### Path  >  UI 

## Examples 

### Create Path 

LeaferApp

ts

```
// #创建 Path [标准创建 (Leafer)]
import { Leafer, Path } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const path = new Path({
    scale: 0.1,
    path: 'M945.344 586.304c-13.056-93.44-132.48-98.048-132.48-98.048 0-29.888-39.808-47.424-39.808-47.424L201.664 440.832c-36.736 0-42.112 51.264-42.112 51.264 7.68 288 181.44 382.976 181.44 382.976l299.456 0c42.88-31.36 101.888-122.56 101.888-122.56 9.216 3.072 72.768-0.832 97.984-6.144C865.6 740.992 958.336 679.68 945.344 586.304zM365.568 825.28c-145.472-105.664-130.944-328.576-130.944-328.576l80.448 0c-44.416 126.4 43.648 285.696 55.872 307.904C383.232 826.816 365.568 825.28 365.568 825.28zM833.472 694.272c-37.568 22.272-65.152 7.68-65.152 7.68 39.04-54.4 42.112-159.296 42.112-159.296 6.848 2.304 12.288-26.048 61.312 23.744C920.768 616.128 871.04 672.064 833.472 694.272z M351.68 129.856c0 0-119.424 72.832-44.416 140.928 75.008 68.16 68.16 93.44 24.512 153.216 0 0 81.92-41.344 71.168-104.192s-89.6-94.208-72.768-137.792C347.136 138.304 351.68 129.856 351.68 129.856z M615.232 91.648c0 0-119.488 72.832-44.352 140.928 74.944 68.16 68.032 93.44 24.448 153.216 0 0 81.984-41.344 71.232-104.192-10.688-62.784-89.6-94.208-72.832-137.792C610.624 100.032 615.232 91.648 615.232 91.648z M491.136 64c0 0-74.304 6.144-88.128 78.144C389.248 214.144 435.968 240.96 471.936 276.992 507.904 312.96 492.608 380.352 452.032 427.904c0 0 72.768-25.344 89.6-94.976 16.832-69.76-17.344-94.272-52.8-134.784C453.312 157.504 456.64 83.968 491.136 64z',
    fill: '#32cd79'
})

leafer.add(path)
```

ts

```
// #创建 Path [标准创建 (App)]
import { App, Path } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const path = new Path({
    scale: 0.1,
    path: 'M945.344 586.304c-13.056-93.44-132.48-98.048-132.48-98.048 0-29.888-39.808-47.424-39.808-47.424L201.664 440.832c-36.736 0-42.112 51.264-42.112 51.264 7.68 288 181.44 382.976 181.44 382.976l299.456 0c42.88-31.36 101.888-122.56 101.888-122.56 9.216 3.072 72.768-0.832 97.984-6.144C865.6 740.992 958.336 679.68 945.344 586.304zM365.568 825.28c-145.472-105.664-130.944-328.576-130.944-328.576l80.448 0c-44.416 126.4 43.648 285.696 55.872 307.904C383.232 826.816 365.568 825.28 365.568 825.28zM833.472 694.272c-37.568 22.272-65.152 7.68-65.152 7.68 39.04-54.4 42.112-159.296 42.112-159.296 6.848 2.304 12.288-26.048 61.312 23.744C920.768 616.128 871.04 672.064 833.472 694.272z M351.68 129.856c0 0-119.424 72.832-44.416 140.928 75.008 68.16 68.16 93.44 24.512 153.216 0 0 81.92-41.344 71.168-104.192s-89.6-94.208-72.768-137.792C347.136 138.304 351.68 129.856 351.68 129.856z M615.232 91.648c0 0-119.488 72.832-44.352 140.928 74.944 68.16 68.032 93.44 24.448 153.216 0 0 81.984-41.344 71.232-104.192-10.688-62.784-89.6-94.208-72.832-137.792C610.624 100.032 615.232 91.648 615.232 91.648z M491.136 64c0 0-74.304 6.144-88.128 78.144C389.248 214.144 435.968 240.96 471.936 276.992 507.904 312.96 492.608 380.352 452.032 427.904c0 0 72.768-25.344 89.6-94.976 16.832-69.76-17.344-94.272-52.8-134.784C453.312 157.504 456.64 83.968 491.136 64z',
    fill: '#32cd79',
    editable: true
})

app.tree.add(path)
```

### Winding Path 

The bottom rounded rectangle and circle intersect, creating a cut-out effect.

LeaferApp

ts

```
// #创建 Path [缠绕路径 (Leafer)]
import { Leafer, Path } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const path1 = new Path({
    path: 'X 0 0 100 100 30 P 50 50 25',
    windingRule: 'evenodd',
    fill: '#FF4B4B'
})

const path2 = new Path({
    path: 'P 50 50 20',
    fill: '#FEB027'
})

leafer.add(path1)
leafer.add(path2)
```

ts

```
// #创建 Path [缠绕路径 (App)]
import { App, Path } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const path1 = new Path({
    path: 'X 0 0 100 100 30 P 50 50 25',
    windingRule: 'evenodd',
    fill: '#FF4B4B',
    editable: true
})

const path2 = new Path({
    path: 'P 50 50 20',
    fill: '#FEB027',
    editable: true
})

app.tree.add(path1)
app.tree.add(path2)
```

### Draw Using Pen 

LeaferApp

ts

```
// #创建 Path [使用 pen 绘制 (Leafer)]
import { Leafer, Path } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const path = new Path({
    fill: '#32cd79'
})

leafer.add(path)

path.windingRule = 'evenodd'
path.pen.roundRect(0, 0, 100, 100, 30).drawArc(50, 50, 25)
```

ts

```
// #创建 Path [使用 pen 绘制 (App)]
import { App, Path } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const path = new Path({
    fill: '#32cd79'
})

app.tree.add(path)

path.windingRule = 'evenodd'
path.pen.roundRect(0, 0, 100, 100, 30).drawArc(50, 50, 25)
```

### Use Path Data 

LeaferApp

ts

```
// #创建 Path [使用路径数据 (Leafer)]
import { Leafer, Path } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const path = new Path({
    windingRule: 'evenodd',
    path: 'X0 0 100 100 30M75 50P50 50 25',
    fill: '#32cd79'
})

leafer.add(path)
```

ts

```
// #创建 Path [使用路径数据 (App)]
import { App, Path } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const path = new Path({
    windingRule: 'evenodd',
    path: 'X0 0 100 100 30M75 50P50 50 25',
    fill: '#32cd79'
})

app.tree.add(path)
```
