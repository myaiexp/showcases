<!-- source: https://www.leaferjs.com/ui/en/plugin/in/flow/Flow/heightRange.html -->

# Height Constraint 

## Key Properties 

### heightRange: `IRangeSize` 

Limits the height range affected by `autoHeight`.

ts

```
interface IRangeSize {
  min?: number
  max?: number
}
```

## Belongs To 

### UI Element 

## Example 

ts

```
// #自动布局 - 自动高度 [限制高度范围]
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
            autoHeight: 1,
            heightRange: { min: 20, max: 40 },   // 限制自动高度的范围
            fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 30, height: 25 }]
        })
    ],
})

leafer.add(flow)
```
