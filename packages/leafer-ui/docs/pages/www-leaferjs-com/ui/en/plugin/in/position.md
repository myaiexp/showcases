<!-- source: https://www.leaferjs.com/ui/en/plugin/in/position/ -->

# position 

Position layout — positions an element relative to its parent using directional alignment or edge offsets.

Automatically updates the element's `x`, `y`, `width`, and `height` properties. The parent must be a Box or Frame element with width and height properties.

## Install the Plugin 

The position plugin must be installed to use this feature. Visit the GitHub repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/position
```

sh

```
pnpm add @leafer-in/position
```

sh

```
yarn add @leafer-in/position
```

sh

```
bun add @leafer-in/position
```

Alternatively, include the plugin using a script tag and access its functionality through the global variable `LeaferIN.position`.

position.minposition

html

```
<script src="https://unpkg.com/@leafer-in/position@2.3.4/dist/position.min.js"></script>
```

html

```
<script src="https://unpkg.com/@leafer-in/position@2.3.4/dist/position.js"></script>
```

## Next Steps 

### position Property 

## Examples 

### Display at the Center of the Parent 

ts

```
// #position 布局 [在父级的居中位置显示]
import { Leafer, Frame, Rect } from 'leafer-ui'
import '@leafer-in/position' // 导入 position 插件

const leafer = new Leafer({ view: window, fill: '#333' })

const frame = new Frame({
    x: 100,
    y: 100,
    width: 300,
    height: 300
})

const rect = new Rect({
    position: 'center', // 在父级的居中位置显示，会自动修改元素的 x、y 属性
    fill: '#32cd79',
})

leafer.add(frame)
frame.add(rect)
```

### 20px from All Four Edges of the Parent 

ts

```
// #position 布局 [距离父级四周各20px]
import { Leafer, Frame, Rect } from 'leafer-ui'
import '@leafer-in/position' // 导入 position 插件

const leafer = new Leafer({ view: window, fill: '#333' })

const frame = new Frame({
    x: 100,
    y: 100,
    width: 300,
    height: 300
})

const rect = new Rect({
    position: { top: 20, left: 20, right: 20, bottom: 20 }, // 距离父级四周各20px, 会自动修改元素的 x、y、width、height 属性
    fill: '#32cd79',
})

leafer.add(frame)
frame.add(rect)
```

### 20px from the Left and Right Edges of the Parent 

ts

```
// #position 布局 [距离父级左右边缘各20px]
import { Leafer, Frame, Rect } from 'leafer-ui'
import '@leafer-in/position' // 导入 position 插件

const leafer = new Leafer({ view: window, fill: '#333' })

const frame = new Frame({
    x: 100,
    y: 100,
    width: 300,
    height: 300
})

const rect = new Rect({
    position: { left: 20, right: 20 }, // 距离父级左右边缘各20px, 会自动修改元素的 x、width 属性
    fill: '#32cd79',
})

leafer.add(frame)
frame.add(rect)
```

### 20px from the Top and Bottom Edges of the Parent 

ts

```
// #position 布局 [距离父级上下边缘各20px]
import { Leafer, Frame, Rect } from 'leafer-ui'
import '@leafer-in/position' // 导入 position 插件

const leafer = new Leafer({ view: window, fill: '#333' })

const frame = new Frame({
    x: 100,
    y: 100,
    width: 300,
    height: 300
})

const rect = new Rect({
    position: { top: 20, bottom: 20 }, // 距离父级上下边缘各20px, 会自动修改元素的 y、height 属性
    fill: '#32cd79',
})

leafer.add(frame)
frame.add(rect)
```

### 20px from the Right Edge of the Parent 

ts

```
// #position 布局 [距离父级右边20px]
import { Leafer, Frame, Rect } from 'leafer-ui'
import '@leafer-in/position' // 导入 position 插件

const leafer = new Leafer({ view: window, fill: '#333' })

const frame = new Frame({
    x: 100,
    y: 100,
    width: 300,
    height: 300
})

const rect = new Rect({
    position: { right: 20 }, // 距离父级右边20px, 会自动修改元素的 x 属性
    fill: '#32cd79',
})

leafer.add(frame)
frame.add(rect)
```

### 20px from the Bottom Edge of the Parent 

ts

```
// #position 布局 [距离父级底部20px]
import { Leafer, Frame, Rect } from 'leafer-ui'
import '@leafer-in/position' // 导入 position 插件

const leafer = new Leafer({ view: window, fill: '#333' })

const frame = new Frame({
    x: 100,
    y: 100,
    width: 300,
    height: 300
})

const rect = new Rect({
    position: { bottom: 20 }, // 距离父级底部20px, 会自动修改元素的 y 属性
    fill: '#32cd79',
})

leafer.add(frame)
frame.add(rect)
```

### 20% from the Bottom Edge of the Parent 

ts

```
// #position 布局 [距离父级底部 20%]
import { Leafer, Frame, Rect } from 'leafer-ui'
import '@leafer-in/position' // 导入 position 插件

const leafer = new Leafer({ view: window, fill: '#333' })

const frame = new Frame({
    x: 100,
    y: 100,
    width: 300,
    height: 300
})

const rect = new Rect({
    position: { bottom: { value: 0.2, type: 'percent' } },  // 距离父级底部 20%, 会自动修改元素的 y 属性
    fill: '#32cd79',
})

leafer.add(frame)
frame.add(rect)
```

### Display at the Bottom of the Specified ID Element 

ts

```
// #position 布局 [在指定id元素的底部位置显示]
import { Leafer, Frame, Rect } from 'leafer-ui'
import '@leafer-in/position' // 导入 position 插件
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window, fill: '#333' })

const frame = new Frame({
    x: 100,
    y: 100,
    width: 500,
    height: 300
})

const rect = new Rect({
    position: { id: 'rect2', align: 'bottom' }, // 在指定 rect2 元素的底部位置显示，会自动修改元素的 x、y 属性
    fill: '#32cd79',
    zIndex: 1
})

leafer.add(frame)
frame.add(rect)

const rect2 = new Rect({
    id: 'rect2',
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    fill: '#FEB027',
    cornerRadius: [0, 20, 20, 0],
    draggable: true
})

frame.add(rect2)
```

### 20px from All Four Edges of the Specified ID Element 

ts

```
// #position 布局 [距离指定id元素四周各20px]
import { Leafer, Frame, Rect } from 'leafer-ui'
import '@leafer-in/position' // 导入 position 插件
import '@leafer-in/find' // 导入查找元素插件

const leafer = new Leafer({ view: window, fill: '#333' })

const frame = new Frame({
    x: 100,
    y: 100,
    width: 500,
    height: 300
})

const rect = new Rect({
    position: { id: 'rect2', top: 20, left: 20, right: 20, bottom: 20 }, // 距离 rect2 元素四周各20px, 会自动修改元素的 x、y、width、height 属性
    fill: '#32cd79',
    zIndex: 1
})

leafer.add(frame)
frame.add(rect)

const rect2 = new Rect({
    id: 'rect2',
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    fill: '#FEB027',
    cornerRadius: [0, 20, 20, 0],
    draggable: true
})

frame.add(rect2)
```
