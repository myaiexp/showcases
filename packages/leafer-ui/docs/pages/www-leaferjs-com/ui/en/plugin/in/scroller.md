<!-- source: https://www.leaferjs.com/ui/en/plugin/in/scroller/ -->

# Scroller Element 

A scrollbar for Box and Frame elements. Set the overflow property to `'scroll'` to enable it.

Inheritance

Scroller  >  Group

## Changelog 

The final version before open-sourcing was v1.0.1. View the changelog.

## 📦 Install the Plugin (Open Source) 

The `scroller` plugin is required to use this feature. Visit the GitHub repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/scroller
```

sh

```
pnpm add @leafer-in/scroller
```

sh

```
yarn add @leafer-in/scroller
```

sh

```
bun add @leafer-in/scroller
```

Alternatively, you can include it using a `<script>` tag and access the plugin through the global variable `LeaferIN.scroller`.

scroller.minscroller

html

```
<script src="https://unpkg.com/@leafer-in/scroller@2.3.4/dist/scroller.min.js"></script>

<script>
  const { Scroller } = LeaferIN.scroller
</script>
```

html

```
<script src="https://unpkg.com/@leafer-in/scroller@2.3.4/dist/scroller.js"></script>

<script>
  const { Scroller } = LeaferIN.scroller
</script>
```

## Examples 

### Quick Start 

ts

```
// #Box滚动条 [快速创建]
import { Leafer, Rect, Box } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/state' // 导入交互状态插件 (可选)
import '@leafer-in/animate' // 导入动画插件 (可选)

import '@leafer-in/scroller' // 导入Box滚动条插件

const leafer = new Leafer({
    view: window,
    fill: '#333',
})

const box = Box.one({ // 鼠标 hover 时显示滚动条
    fill: 'white',
    overflow: 'scroll', // 溢出时滚动显示内容
    children: [
        Rect.one({ draggable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ draggable: true, fill: '#32cd79' }, 300, 550),
        Rect.one({ draggable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 200, 1000)
    ]
}, 100, 100, 500, 600)

leafer.add(box)
```

### Dark Mode 

ts

```
// #Box滚动条 [夜晚模式]
import { Leafer, Rect, Box } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/state' // 导入交互状态插件 (可选)
import '@leafer-in/animate' // 导入动画插件 (可选)

import '@leafer-in/scroller' // 导入Box滚动条插件

const leafer = new Leafer({
    view: window,
    fill: '#333',
})

const box = Box.one({
    fill: '#111',
    overflow: 'scroll',
    scrollConfig: { theme: 'dark' }, // 夜晚模式下的滚动条显示效果
    children: [
        Rect.one({ draggable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ draggable: true, fill: '#32cd79' }, 300, 550),
        Rect.one({ draggable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 200, 1000)
    ]
}, 100, 100, 500, 600)

leafer.add(box)
```

### Configure Colors and Cursor 

ts

```
// #Box滚动条 [配置颜色和光标]
import { Leafer, Rect, Box } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/state' // 导入交互状态插件 (可选)
import '@leafer-in/animate' // 导入动画插件 (可选)

import '@leafer-in/scroller' // 导入Box滚动条插件

const leafer = new Leafer({
    view: window,
    fill: '#333',
})

const box = Box.one({
    fill: 'white',
    overflow: 'scroll',
    scrollConfig: { style: { fill: 'blue', cursor: 'pointer' } }, // 滚动条配置颜色和光标
    children: [
        Rect.one({ draggable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ draggable: true, fill: '#32cd79' }, 300, 550),
        Rect.one({ draggable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 200, 1000)
    ]
}, 100, 100, 500, 600)

leafer.add(box)
```

### Scrollbar Without Rounded Corners 

ts

```
// #Box滚动条 [无圆角的滚动条]
import { Leafer, Rect, Box } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/state' // 导入交互状态插件 (可选)
import '@leafer-in/animate' // 导入动画插件 (可选)

import '@leafer-in/scroller' // 导入Box滚动条插件

const leafer = new Leafer({
    view: window,
    fill: '#333',
})

const box = Box.one({
    fill: 'white',
    overflow: 'scroll',
    scrollConfig: { size: 10, cornerRadius: 0, endsMargin: 0, sideMargin: 0 }, // 无圆角的滚动条效果
    children: [
        Rect.one({ draggable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ draggable: true, fill: '#32cd79' }, 300, 550),
        Rect.one({ draggable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 200, 1000)
    ]
}, 100, 100, 500, 600)

leafer.add(box)
```

### Keep Visible 

ts

```
// #Box滚动条 [保持显示]
import { Leafer, Rect, Box } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/state' // 导入交互状态插件 (可选)
import '@leafer-in/animate' // 导入动画插件 (可选)

import '@leafer-in/scroller' // 导入Box滚动条插件

const leafer = new Leafer({
    view: window,
    fill: '#333',
})

const box = Box.one({
    fill: 'white',
    overflow: 'scroll',
    scrollConfig: { hideOnActionEnd: false }, // 离开滚动区域后，不自动隐藏滚动条
    children: [
        Rect.one({ draggable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ draggable: true, fill: '#32cd79' }, 300, 550),
        Rect.one({ draggable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 200, 1000)
    ]
}, 100, 100, 500, 600)

leafer.add(box)
```

### Allow Scrolling Only by Dragging the Scrollbar 

ts

```
// #Box滚动条 [只允许拖拽滚动条进行滚动内容]
import { Leafer, Rect, Box } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/state' // 导入交互状态插件 (可选)
import '@leafer-in/animate' // 导入动画插件 (可选)

import '@leafer-in/scroller' // 导入Box滚动条插件

const leafer = new Leafer({
    view: window,
    fill: '#333',
})

const box = Box.one({
    fill: 'white',
    overflow: 'scroll',
    scrollConfig: { scrollType: 'drag' }, // 只允许拖拽滚动条进行滚动内容，鼠标滚动不生效
    children: [
        Rect.one({ draggable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ draggable: true, fill: '#32cd79' }, 300, 550),
        Rect.one({ draggable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 200, 1000)
    ]
}, 100, 100, 500, 600)

leafer.add(box)
```

### Scale the Scrollbar with the View 

ts

```
// #Box滚动条 [跟随视图放大滚动条]
import { Leafer, Rect, Box } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/state' // 导入交互状态插件 (可选)
import '@leafer-in/animate' // 导入动画插件 (可选)

import '@leafer-in/scroller' // 导入Box滚动条插件

const leafer = new Leafer({
    view: window,
    fill: '#333',
    type: 'design'
})

const box = Box.one({
    fill: 'white',
    overflow: 'scroll',
    scrollConfig: { scaleFixed: false }, // 跟随视图放大滚动条
    children: [
        Rect.one({ draggable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ draggable: true, fill: '#32cd79' }, 300, 550),
        Rect.one({ draggable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 200, 1000)
    ]
}, 100, 100, 500, 600)

leafer.add(box)
```

### Coexist with the View Scrollbar 

ts

```
// #Box滚动条 [与视图滚动条共存]
import { App, Rect, Box } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/state' // 导入交互状态插件 (可选)
import '@leafer-in/animate' // 导入动画插件 (可选)

import { ScrollBar } from '@leafer-in/scroll' // 导入视图滚动条 (可选，后期会被 scroller 插件替代)
import '@leafer-in/scroller' // 导入Box滚动条插件


const app = new App({
    view: window,
    fill: '#333',
    move: { holdSpaceKey: true },
    tree: { type: 'document' },
    sky: {}
})

new ScrollBar(app)

const box = Box.one({
    fill: 'white',
    overflow: 'scroll',  // 滚动元素到顶部或底部时，才允许滚动视图（与html中的div滚动逻辑一致）
    children: [
        Rect.one({ draggable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ draggable: true, fill: '#32cd79' }, 300, 550),
        Rect.one({ draggable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 200, 1000)
    ]
}, 100, 100, 500, 600)

app.tree.add(box)


app.tree.add(Rect.one({ draggable: true, fill: '#32cd79' }, 300, 2000))
```

### Prevent Default View Scrolling When Coexisting with the View Scrollbar 

ts

```
// #Box滚动条 [与视图滚动条共存时，阻止默认视图滚动]
import { App, Rect, Box } from 'leafer-ui'
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/state' // 导入交互状态插件 (可选)
import '@leafer-in/animate' // 导入动画插件 (可选)

import { ScrollBar } from '@leafer-in/scroll' // 导入视图滚动条 (可选，后期会被 scroller 插件替代)
import '@leafer-in/scroller' // 导入Box滚动条插件


const app = new App({
    view: window,
    fill: '#333',
    tree: { type: 'document' },
    sky: {}
})

new ScrollBar(app)

const box = Box.one({
    fill: 'white',
    overflow: 'scroll',
    scrollConfig: { stopDefault: true }, //  滚动元素时，阻止默认视图滚动
    children: [
        Rect.one({ draggable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ draggable: true, fill: '#32cd79' }, 300, 550),
        Rect.one({ draggable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 200, 1000)
    ]
}, 100, 100, 500, 600)

app.tree.add(box)


app.tree.add(Rect.one({ draggable: true, fill: '#32cd79' }, 300, 2000))
```
