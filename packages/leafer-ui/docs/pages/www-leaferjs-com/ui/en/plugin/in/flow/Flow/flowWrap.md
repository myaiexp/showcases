<!-- source: https://www.leaferjs.com/ui/en/plugin/in/flow/Flow/flowWrap.html -->

# Auto Wrap 

## Key Properties 

### flowWrap: `IFlowWrap` 

Whether to enable automatic wrapping. Default is no wrapping.

ts

```
type IFlowWrap = boolean | 'reverse' // reverse means reversed row order
```

## Belongs To 

### Flow Element 

## Example 

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

### Auto wrap along X axis (reverse row order) 

ts

```
// #自动布局 - 自动换行 [沿 X 轴自动换行（颠倒行顺序）]
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    flowWrap: 'reverse', // 沿 X 轴自动换行（颠倒行顺序）
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

### Auto wrap along Y axis 

ts

```
// #自动布局 - 自动换行 [沿 Y 轴自动换行]
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    flow: 'y', // 沿 Y 轴自动换行
    flowWrap: true,
    gap: { x: 10, y: 0 },
    fill: '#676',
    width: 100,
    height: 100,
    children: [
        new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '1', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 20, height: 25 }] }),
        new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '2', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 40, height: 25 }] }),
        new Box({ fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 30, height: 25 }] }),
        new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '4', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 20, height: 25 }] }),
        new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '5', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 40, height: 25 }] }),
        new Box({ fill: '#79CB4D', children: [{ tag: 'Text', text: '6', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 30, height: 25 }] })
    ],
})

leafer.add(flow)
```

### Auto wrap along Y axis (reverse row order) 

ts

```
// #自动布局 - 自动换行 [沿 Y 轴自动换行（颠倒行顺序）]
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    flow: 'y-reverse', // 沿 Y 轴自动换行（颠倒行顺序）
    flowWrap: true,
    gap: { x: 10, y: 0 },
    fill: '#676',
    width: 100,
    height: 100,
    children: [
        new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '1', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 20, height: 25 }] }),
        new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '2', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 40, height: 25 }] }),
        new Box({ fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 30, height: 25 }] }),
        new Box({ fill: '#FF4B4B', children: [{ tag: 'Text', text: '4', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 20, height: 25 }] }),
        new Box({ fill: '#FEB027', children: [{ tag: 'Text', text: '5', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 40, height: 25 }] }),
        new Box({ fill: '#79CB4D', children: [{ tag: 'Text', text: '6', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 30, height: 25 }] })
    ],
})

leafer.add(flow)
```
