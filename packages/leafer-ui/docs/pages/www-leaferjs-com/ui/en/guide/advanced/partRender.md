<!-- source: https://www.leaferjs.com/ui/en/guide/advanced/partRender.html -->

# Partial Rendering 

The engine improves canvas redraw efficiency through partial rendering. When there are tens of thousands of elements on a page, only the changed regions are updated.

The changed regions are formed by combining the render bounds (bounding box) of elements before and after changes.

  
  

## Disable partial rendering 

When it is not possible to determine element bounds—such as for editing frames or background grid Leafer layers—you can disable partial rendering.

AppLeafer

ts

```
// #应用与引擎配置 - 关闭局部渲染 [App]
import { App, Rect, Debug } from 'leafer-ui'

const app = new App({
    view: window,
    tree: { usePartRender: false }
})

Debug.showRepaint = true

app.tree.add(Rect.one({ fill: '#32cd79', draggable: true }, 100, 100))
```

ts

```
// #应用与引擎配置 - 关闭局部渲染 [Leafer]
import { Leafer, Rect, Debug } from 'leafer-ui'

const leafer = new Leafer({
    view: window,
    usePartRender: false
})

Debug.showRepaint = true

leafer.add(Rect.one({ fill: '#32cd79', draggable: true }, 100, 100))
```

## Disable partial layout 

When most elements in a scene are dynamic, you can disable partial layout to prevent performance loss caused by tracking too many element changes.

Example scene: https://benchmark.leaferjs.com/leafer/?scene=dynamic

AppLeafer

ts

```
// #应用与引擎配置 - 关闭局部布局 [App]
import { App, Rect, Debug } from 'leafer-ui'

const app = new App({
    view: window,
    tree: { usePartLayout: false }
})

Debug.showRepaint = true

app.tree.add(Rect.one({ fill: '#32cd79', draggable: true }, 100, 100))
```

ts

```
// #应用与引擎配置 - 关闭局部布局 [Leafer]
import { Leafer, Rect, Debug } from 'leafer-ui'

const leafer = new Leafer({
    view: window,
    usePartLayout: false
})

Debug.showRepaint = true

leafer.add(Rect.one({ fill: '#32cd79', draggable: true }, 100, 100))
```

For game and industrial applications, you can further improve performance by disabling element change tracking through the `trackChanges` configuration, which significantly reduces performance overhead.

## Next Step 

Next, you will learn several important **lifecycle concepts**, which completes the basic introduction.

### Lifecycle 

  

### Usage in frontend frameworks 

Vue

React

### Usage in server-side rendering 

Nuxt.js

VitePress

Next.js
