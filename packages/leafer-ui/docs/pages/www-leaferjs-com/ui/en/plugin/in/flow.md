<!-- source: https://www.leaferjs.com/ui/en/plugin/in/flow/ -->

# Flow Element 

Automatic layout (flow) element. Similar to Flexbox, it enables fast and intuitive layout of content.

Inheritance

Flow  >  Box  >  UI

  

Box / Frame elements also support auto layout properties (requires installing this plugin).

Currently not fully adapted for the graphic editor. Frequent changes in auto layout elements may affect performance; optimizations will be added later.

## Install Plugin 

You need to install the flow plugin and resize plugin to use it. Visit Github repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/flow
npm install @leafer-in/resize
```

sh

```
pnpm add @leafer-in/flow
pnpm add @leafer-in/resize
```

sh

```
yarn add @leafer-in/flow
yarn add @leafer-in/resize
```

sh

```
bun add @leafer-in/flow
bun add @leafer-in/resize
```

Or include via script tag and access plugin features through the global variable `LeaferIN.flow`.

flow.minflow

html

```
<script src="https://unpkg.com/@leafer-in/flow@2.3.4/dist/flow.min.js"></script>
<script src="https://unpkg.com/@leafer-in/resize@2.3.4/dist/resize.min.js"></script>
<script>
  const { Flow } = LeaferIN.flow
</script>
```

html

```
<script src="https://unpkg.com/@leafer-in/flow@2.3.4/dist/flow.js"></script>
<script src="https://unpkg.com/@leafer-in/resize@2.3.4/dist/resize.js"></script>
<script>
  const { Flow } = LeaferIN.flow
</script>
```

## Key Properties 

| Name | Description |
| --- | --- |
| flow | Layout direction: enables auto layout and optionally sets axis direction x or y (default x) |
| flowWrap | Auto wrap: whether to enable wrapping (default: no wrap) |
| flowAlign | Alignment: alignment of child elements (default: top-left) |
| gap | Gap: spacing between child elements (default: 0) |
| padding | Padding: container inner spacing (default: 0) |
| itemBox | Box type: which box type of children to use (default box) |

## Child Layout Properties in Flow 

| Name | Description |
| --- | --- |
| inFlow | Join layout: whether element participates in auto layout (default: yes) |
| autoWidth | Auto width: distribute remaining width (ignores width, like Flex grow/shrink) |
| autoHeight | Auto height: distribute remaining height (ignores height, like Flex grow/shrink) |
| widthRange | Width constraint: limits autoWidth range |
| heightRange | Height constraint: limits autoHeight range |
| lockRatio | Lock ratio: whether to preserve aspect ratio when using auto sizing |

## Inheritance 

### Flow  >  Box  >  UI 

## Examples 

### Auto layout 

ts

```
// #自动布局
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    fill: '#676',
    width: 100,
    height: 100,
    children: [
        new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '1', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 20 }] }),
        new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '2', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 40 }] }),
        new Box({ fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }] })
    ],
})

leafer.add(flow)
```

### Auto wrap along X axis 

ts

```
// #自动布局 - 自动换行 [沿 X 轴自动换行]
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    flowWrap: true, // 沿 X 轴自动换行
    gap: { x: 0, y: 10 },
    fill: '#676',
    width: 100,
    height: 100,
    children: [
        new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '1', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 20 }] }),
        new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '2', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 40 }] }),
        new Box({ fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }] }),
        new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '4', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 20 }] }),
        new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '5', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 40 }] }),
        new Box({ fill: '#79CB4D', children: [{ tag: 'Text', text: '6', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }] })
    ],
})

leafer.add(flow)
```

### Center alignment 

ts

```
// #自动布局 - 对齐内容 [居中对齐]
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    flowAlign: 'center', // 居中对齐
    fill: '#676',
    width: 100,
    height: 100,
    children: [
        new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '1', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 20 }] }),
        new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '2', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 40 }] }),
        new Box({ fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }] })
    ],
})

leafer.add(flow)
```

### Fixed numeric gap 

ts

```
// #自动布局 - 子元素间距 [固定数值的间距]
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    gap: 5, // 固定数值的间距
    fill: '#676',
    width: 100,
    height: 100,
    children: [
        new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '1', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 20 }] }),
        new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '2', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 40 }] }),
        new Box({ fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }] })
    ],
})

leafer.add(flow)
```

### Set padding 

ts

```
// #自动布局 - 内边距
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    padding: 5, // 内边距
    fill: '#676',
    width: 100,
    height: 100,
    children: [
        new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '1', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 20 }] }),
        new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '2', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 40 }] }),
        new Box({ fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }] })
    ],
})

leafer.add(flow)
```

### Element excluded from auto layout 

ts

```
// #自动布局 - 子元素不加入自动布局 
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    fill: '#676',
    width: 100,
    height: 100,
    children: [
        new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '1', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 20 }] }),
        new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '2', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 40 }] }),
        new Box({ fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }] }),
        new Box({
            inFlow: false,  // 元素不加入自动布局，通过坐标定位
            x: 50, y: 110, fill: '#FF4B4B', around: 'top', children: [{ tag: 'Text', text: 'false', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 30, height: 20 }]
        })

    ],
})

leafer.add(flow)
```

### Auto width 

ts

```
// #自动布局 - 自动宽度 [自动宽度（填充剩余宽度）]
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    fill: '#676',
    width: 100,
    height: 100,
    children: [
        new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '1', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 20 }] }),
        new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '2', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 40 }] }),
        new Box({
            autoWidth: 1, // 自动宽度（填充剩余宽度）
            fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }]
        })
    ],
})

leafer.add(flow)
```

### Auto height 

ts

```
// #自动布局 - 自动高度 [自动高度（填充剩余高度）]
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    flow: 'y',
    fill: '#676',
    width: 100,
    height: 100,
    children: [
        new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '1', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 20, height: 25 }] }),
        new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '2', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 40, height: 25 }] }),
        new Box({
            autoHeight: 1, // 自动高度（填充剩余高度）
            fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 30, height: 25 }]
        })
    ],
})

leafer.add(flow)
```

### Combined properties 

ts

```
// #自动布局
import { Leafer, Rect, Star, Ellipse } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    flow: 'y',
    gap: { x: 'auto', y: 20 },
    flowAlign: { content: 'top', x: 'from' },
    flowWrap: true,
    x: 100,
    y: 100,
    width: 260,
    height: 260,
    fill: '#333'
})

const rect = new Rect({ fill: 'red' })
const star = new Star({ fill: 'green', x: 800, height: 100 })
const ellipse = new Ellipse({ fill: 'blue' })
flow.add([rect, star, ellipse])

leafer.add(flow)
```
