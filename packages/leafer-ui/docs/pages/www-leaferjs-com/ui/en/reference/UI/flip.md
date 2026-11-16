<!-- source: https://www.leaferjs.com/ui/en/reference/UI/flip.html -->

# flip 

Mirror / flip an element.

## Core Method 

### flip(axis: `'x'` | `'y'`, transition?: `ITranstion`) 

Flip (mirror) the element along a given axis in the **world coordinate system**.

The `transition` parameter enables animated transitions via the animation system.

ts

```
// Flip along X axis
rect.flip('x')

// With animation transition
rect.flip('x', true)

rect.flip('x', 2) // 2-second transition
```

## Belongs to 

### UI Element 

## Examples 

### Flip along X axis 

LeaferApp

ts

```
// #通过 flip() 镜像元素 [无动画过渡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' })

leafer.add(rect)

setTimeout(() => {

    // 按 X 轴镜像元素
    rect.flip('x') 

}, 1000)
```

ts

```
// #通过 flip() 镜像元素 [无动画过渡 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' })

app.tree.add(rect)

setTimeout(() => {

    // 按 X 轴镜像元素
    rect.flip('x') 

}, 1000)
```

### Flip along X axis with transition animation 

LeaferApp

ts

```
// #通过 flip() 镜像元素 [有动画过渡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' })

leafer.add(rect)

setTimeout(() => {

    // 按 X 轴镜像元素
    rect.flip('x', true) 

}, 1000)
```

ts

```
// #通过 flip() 镜像元素 [有动画过渡 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/animate' // 导入动画插件

const app = new App({ view: window, editor: {} })

const rect = Rect.one({ fill: '#32cd79' })

app.tree.add(rect)

setTimeout(() => {

    // 按 X 轴镜像元素
    rect.flip('x', true) 

}, 1000)
```
