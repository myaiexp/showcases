<!-- source: https://www.leaferjs.com/ui/en/plugin/in/box/ -->

# Box Element 

Adds Box capabilities to basic elements, allowing them to contain child elements.

## Install Plugin 

You need to install the box plugin to use it. Click here to visit the Github repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/box
```

sh

```
pnpm add @leafer-in/box
```

sh

```
yarn add @leafer-in/box
```

sh

```
bun add @leafer-in/box
```

Or include via script tag and access plugin features using the global variable `LeaferIN.box`.

box.minbox

html

```
<script src="https://unpkg.com/@leafer-in/box@2.3.4/dist/box.min.js"></script>
<script>
  const { ImageBox } = LeaferIN.box
</script>
```

html

```
<script src="https://unpkg.com/@leafer-in/box@2.3.4/dist/box.js"></script>
<script>
  const { ImageBox } = LeaferIN.box
</script>
```

## Elements 

### ImageBox 

### EllipseBox 

### PolygonBox 

### StarBox 

### PathBox 

## Examples 

### Create ImageBox 

LeaferApp

ts

```
// #创建 ImageBox [标准创建 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'
import { ImageBox } from '@leafer-in/box' // 导入box插件

const leafer = new Leafer({ view: window })


const box = new ImageBox({
    width: 100,
    height: 100,
    url: '/image/leafer.jpg',
    draggable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    draggable: true
})

leafer.add(box)
box.add(circle)
```

ts

```
// #创建 ImageBox [标准创建 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import { ImageBox } from '@leafer-in/box' // 导入box插件

const app = new App({ view: window, editor: {} })

const box = new ImageBox({
    width: 100,
    height: 100,
    url: '/image/leafer.jpg',
    hitChildren: false, // 阻止直接选择子元素（防止父子选择冲突，可双击进入组内选择子元素）
    editable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    editable: true
})

app.tree.add(box)
box.add(circle)
```

### Create EllipseBox 

LeaferApp

ts

```
// #创建 EllipseBox [标准创建 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'
import { EllipseBox } from '@leafer-in/box' // 导入box插件

const leafer = new Leafer({ view: window })

const box = new EllipseBox({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: '#FF4B4B',
    draggable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    draggable: true
})

leafer.add(box)
box.add(circle)
```

ts

```
// #创建 EllipseBox [标准创建 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import { EllipseBox } from '@leafer-in/box' // 导入box插件

const app = new App({ view: window, editor: {} })

const box = new EllipseBox({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: '#FF4B4B',
    hitChildren: false, // 阻止直接选择子元素（防止父子选择冲突，可双击进入组内选择子元素）
    editable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    editable: true
})

app.tree.add(box)
box.add(circle)
```

### Create PolygonBox 

LeaferApp

ts

```
// #创建 PolygonBox [标准创建 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'
import { PolygonBox } from '@leafer-in/box' // 导入box插件

const leafer = new Leafer({ view: window })


const box = new PolygonBox({
    width: 100,
    height: 100,
    sides: 5,
    fill: '#FF4B4B',
    draggable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    draggable: true
})

leafer.add(box)
box.add(circle)
```

ts

```
// #创建 PolygonBox [标准创建 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import { PolygonBox } from '@leafer-in/box' // 导入box插件

const app = new App({ view: window, editor: {} })

const box = new PolygonBox({
    width: 100,
    height: 100,
    sides: 5,
    fill: '#FF4B4B',
    hitChildren: false, // 阻止直接选择子元素（防止父子选择冲突，可双击进入组内选择子元素）
    editable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    editable: true
})

app.tree.add(box)
box.add(circle)
```

### Create StarBox 

LeaferApp

ts

```
// #创建 StarBox [标准创建 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'
import { StarBox } from '@leafer-in/box' // 导入box插件

const leafer = new Leafer({ view: window })


const box = new StarBox({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    corners: 8,
    cornerRadius: 5,
    fill: '#FF4B4B',
    draggable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    draggable: true
})

leafer.add(box)
box.add(circle)
```

ts

```
// #创建 StarBox [标准创建 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import { StarBox } from '@leafer-in/box' // 导入box插件

const app = new App({ view: window, editor: {} })

const box = new StarBox({
    width: 100,
    height: 100,
    innerRadius: 0.5,
    corners: 8,
    cornerRadius: 5,
    fill: '#FF4B4B',
    hitChildren: false, // 阻止直接选择子元素（防止父子选择冲突，可双击进入组内选择子元素）
    editable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    editable: true
})

app.tree.add(box)
box.add(circle)
```

### Create PathBox 

LeaferApp

ts

```
// #创建 PathBox [标准创建 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'
import { PathBox } from '@leafer-in/box' // 导入box插件

const leafer = new Leafer({ view: window })


const box = new PathBox({
    path: 'X 0 0 100 100 30 P 50 50 25',
    windingRule: 'evenodd',
    fill: '#FF4B4B',
    draggable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    draggable: true
})

leafer.add(box)
box.add(circle)
```

ts

```
// #创建 PathBox [标准创建 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import { PathBox } from '@leafer-in/box' // 导入box插件

const app = new App({ view: window, editor: {} })

const box = new PathBox({
    path: 'X 0 0 100 100 30 P 50 50 25',
    windingRule: 'evenodd',
    fill: '#FF4B4B',
    hitChildren: false, // 阻止直接选择子元素（防止父子选择冲突，可双击进入组内选择子元素）
    editable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    editable: true
})

app.tree.add(box)
box.add(circle)
```
