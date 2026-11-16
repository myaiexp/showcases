<!-- source: https://www.leaferjs.com/ui/en/plugin/in/flow/Flow/widthRange.html -->

# Width Constraint 

## Key Properties 

### widthRange: `IRangeSize` 

Limits the width range affected by `autoWidth`.

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
// #自动布局 - 自动宽度 [限制宽度范围]
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
            autoWidth: 1,
            widthRange: { min: 20, max: 40 },   // 限制自动宽度的范围
            fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }]
        })
    ],
})

leafer.add(flow)
```
