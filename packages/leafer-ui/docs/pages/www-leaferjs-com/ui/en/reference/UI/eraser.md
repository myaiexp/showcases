<!-- source: https://www.leaferjs.com/ui/en/reference/UI/eraser.html -->

# eraser 

Eraser feature. A child element inside a Group can be designated as an eraser to create complex masking effects. Two erasing modes are supported.

## Key Properties 

### eraser: `boolean` ｜ `IEraserType` 

When an element is set as an eraser, it will not be rendered itself, but it will erase elements underneath it within the same Group.

The default eraser type is `pixel`. You can set it to `path` for better performance.

ts

```
type IEraserType =
  | 'path' // Path eraser: high performance, uses path clipping for erasing
  | 'pixel' // Pixel eraser: uses per-pixel alpha transparency, enables more complex visual effects
```

## Eraser Bounds 

The bounds of an eraser are not included in the Group’s layout bounds, but it can still trigger interaction events. It is not affected by Group boundaries unless hitChildren is set to `false`.

## Belongs to 

### UI Elements 

## Examples 

### Set a ring as an eraser 

LeaferApp

ts

```
// #擦除功能 [将圆环设为橡皮擦 (Leafer)]
import { Leafer, Group, Ellipse, Image } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group({ x: 100, y: 100, draggable: true })

const image = new Image({
    width: 100,
    height: 100,
    cornerRadius: 30,
    url: '/image/leafer.jpg'
})

const eraser = new Ellipse({
    x: 15,
    y: 15,
    width: 70,
    height: 70,
    innerRadius: 0.5,
    fill: 'black',
    eraser: true,
    draggable: true
})

leafer.add(group)

group.add([image, eraser])
```

ts

```
// #擦除功能 [将圆环设为橡皮擦 (App)]
import { App, Group, Ellipse, Image } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const group = new Group({ x: 100, y: 100, draggable: true })

const image = new Image({
    width: 100,
    height: 100,
    cornerRadius: 30,
    url: '/image/leafer.jpg'
})

const eraser = new Ellipse({
    x: 15,
    y: 15,
    width: 70,
    height: 70,
    innerRadius: 0.5,
    fill: 'black',
    eraser: true,
    draggable: true
})

app.tree.add(group)

group.add([image, eraser])
```

### Set a semi-transparent ring as an eraser 

LeaferApp

ts

```
// #擦除功能 [将半透明的圆环设为橡皮擦 (Leafer)]
import { Leafer, Group, Ellipse, Image } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group({ x: 100, y: 100, draggable: true })

const image = new Image({
    width: 100,
    height: 100,
    cornerRadius: 30,
    url: '/image/leafer.jpg'
})

const eraser = new Ellipse({
    x: 15,
    y: 15,
    width: 70,
    height: 70,
    innerRadius: 0.5,
    opacity: 0.5,
    fill: 'black',
    eraser: true
})

leafer.add(group)

group.add([image, eraser])
```

ts

```
// #擦除功能 [将半透明的圆环设为橡皮擦 (App)]
import { App, Group, Ellipse, Image } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const group = new Group({ x: 100, y: 100, draggable: true })

const image = new Image({
    width: 100,
    height: 100,
    cornerRadius: 30,
    url: '/image/leafer.jpg'
})

const eraser = new Ellipse({
    x: 15,
    y: 15,
    width: 70,
    height: 70,
    innerRadius: 0.5,
    opacity: 0.5,
    fill: 'black',
    eraser: true
})

app.tree.add(group)

group.add([image, eraser])
```

### Set a circular group as an eraser 

LeaferApp

ts

```
// #擦除功能 [将圆形组设为橡皮擦 (Leafer)]
import { Leafer, Group, Ellipse, Image } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group({ x: 100, y: 100 })

const eraserGroup = new Group({
    x: 20,
    y: 20,
    eraser: true
})

eraserGroup.add(new Ellipse({ width: 40, height: 40, fill: 'black' }))
eraserGroup.add(new Ellipse({ x: 30, y: 30, width: 30, height: 30, fill: 'black' }))

const image = new Image({
    width: 100,
    height: 100,
    cornerRadius: 30,
    url: '/image/leafer.jpg'
})

leafer.add(group)

group.add([image, eraserGroup])
```

ts

```
// #擦除功能 [将圆形组设为橡皮擦 (App)]
import { App, Group, Ellipse, Image } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const group = new Group({ x: 100, y: 100 })

const eraserGroup = new Group({
    x: 20,
    y: 20,
    eraser: true
})

eraserGroup.add(new Ellipse({ width: 40, height: 40, fill: 'black' }))
eraserGroup.add(new Ellipse({ x: 30, y: 30, width: 30, height: 30, fill: 'black' }))

const image = new Image({
    width: 100,
    height: 100,
    cornerRadius: 30,
    url: '/image/leafer.jpg'
})

app.tree.add(group)

group.add([image, eraserGroup])
```

### Set a path as an eraser 

LeaferApp

ts

```
// #擦除功能 [将路径设为橡皮擦 (Leafer)]
import { Leafer, Group, Path, Image } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group({ x: 100, y: 100 })

const eraser = new Path({
    x: 10,
    y: 10,
    scaleX: 0.08,
    scaleY: 0.08,
    path: 'M945.344 586.304c-13.056-93.44-132.48-98.048-132.48-98.048 0-29.888-39.808-47.424-39.808-47.424L201.664 440.832c-36.736 0-42.112 51.264-42.112 51.264 7.68 288 181.44 382.976 181.44 382.976l299.456 0c42.88-31.36 101.888-122.56 101.888-122.56 9.216 3.072 72.768-0.832 97.984-6.144C865.6 740.992 958.336 679.68 945.344 586.304zM365.568 825.28c-145.472-105.664-130.944-328.576-130.944-328.576l80.448 0c-44.416 126.4 43.648 285.696 55.872 307.904C383.232 826.816 365.568 825.28 365.568 825.28zM833.472 694.272c-37.568 22.272-65.152 7.68-65.152 7.68 39.04-54.4 42.112-159.296 42.112-159.296 6.848 2.304 12.288-26.048 61.312 23.744C920.768 616.128 871.04 672.064 833.472 694.272z M351.68 129.856c0 0-119.424 72.832-44.416 140.928 75.008 68.16 68.16 93.44 24.512 153.216 0 0 81.92-41.344 71.168-104.192s-89.6-94.208-72.768-137.792C347.136 138.304 351.68 129.856 351.68 129.856z M615.232 91.648c0 0-119.488 72.832-44.352 140.928 74.944 68.16 68.032 93.44 24.448 153.216 0 0 81.984-41.344 71.232-104.192-10.688-62.784-89.6-94.208-72.832-137.792C610.624 100.032 615.232 91.648 615.232 91.648z M491.136 64c0 0-74.304 6.144-88.128 78.144C389.248 214.144 435.968 240.96 471.936 276.992 507.904 312.96 492.608 380.352 452.032 427.904c0 0 72.768-25.344 89.6-94.976 16.832-69.76-17.344-94.272-52.8-134.784C453.312 157.504 456.64 83.968 491.136 64z',
    fill: 'black',
    eraser: true
})

const image = new Image({
    width: 100,
    height: 100,
    cornerRadius: 30,
    url: '/image/leafer.jpg'
})

leafer.add(group)

group.add([image, eraser])
```

ts

```
// #擦除功能 [将路径设为橡皮擦 (App)]
import { App, Group, Path, Image } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const group = new Group({ x: 100, y: 100 })

const eraser = new Path({
    x: 10,
    y: 10,
    scaleX: 0.08,
    scaleY: 0.08,
    path: 'M945.344 586.304c-13.056-93.44-132.48-98.048-132.48-98.048 0-29.888-39.808-47.424-39.808-47.424L201.664 440.832c-36.736 0-42.112 51.264-42.112 51.264 7.68 288 181.44 382.976 181.44 382.976l299.456 0c42.88-31.36 101.888-122.56 101.888-122.56 9.216 3.072 72.768-0.832 97.984-6.144C865.6 740.992 958.336 679.68 945.344 586.304zM365.568 825.28c-145.472-105.664-130.944-328.576-130.944-328.576l80.448 0c-44.416 126.4 43.648 285.696 55.872 307.904C383.232 826.816 365.568 825.28 365.568 825.28zM833.472 694.272c-37.568 22.272-65.152 7.68-65.152 7.68 39.04-54.4 42.112-159.296 42.112-159.296 6.848 2.304 12.288-26.048 61.312 23.744C920.768 616.128 871.04 672.064 833.472 694.272z M351.68 129.856c0 0-119.424 72.832-44.416 140.928 75.008 68.16 68.16 93.44 24.512 153.216 0 0 81.92-41.344 71.168-104.192s-89.6-94.208-72.768-137.792C347.136 138.304 351.68 129.856 351.68 129.856z M615.232 91.648c0 0-119.488 72.832-44.352 140.928 74.944 68.16 68.032 93.44 24.448 153.216 0 0 81.984-41.344 71.232-104.192-10.688-62.784-89.6-94.208-72.832-137.792C610.624 100.032 615.232 91.648 615.232 91.648z M491.136 64c0 0-74.304 6.144-88.128 78.144C389.248 214.144 435.968 240.96 471.936 276.992 507.904 312.96 492.608 380.352 452.032 427.904c0 0 72.768-25.344 89.6-94.976 16.832-69.76-17.344-94.272-52.8-134.784C453.312 157.504 456.64 83.968 491.136 64z',
    fill: 'black',
    eraser: true
})

const image = new Image({
    width: 100,
    height: 100,
    cornerRadius: 30,
    url: '/image/leafer.jpg'
})

app.tree.add(group)

group.add([image, eraser])
```
