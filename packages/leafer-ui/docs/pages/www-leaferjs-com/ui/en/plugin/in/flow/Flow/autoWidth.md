<!-- source: https://www.leaferjs.com/ui/en/plugin/in/flow/Flow/autoWidth.html -->

# Auto Width 

## Key Properties 

### autoWidth: `number` 

Auto width weight. Distributes remaining width to this element (ignores `width`), similar to Flex grow / shrink. Default is 0.

When set to a value greater than 0, the element will automatically expand its width. Usually set to 1. Supports setting the width as a percentage.

ts

```
interface IUnitData {
  type: 'percent' ｜ 'px'
  value: number
}

rect.autoWidth = {
  type: 'percent',
  value: 0.5, // 50%
}
```

## Belongs To 

### UI Element 

## Example 

### Auto Width 

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

### Auto Width and Height 

ts

```
// #自动布局 - 自动宽度 [自动宽度和高度]
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
            autoWidth: 1, // 自动宽度和高度
            autoHeight: 1,
            fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }]
        })
    ],
})

leafer.add(flow)
```

### Auto Width supports percentage values 

ts

```
// #自动布局 - 自动宽高 [使用百分比]
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    fill: '#676',
    width: 100,
    height: 100,
    children: [
        new Box({
            autoWidth: { type: 'percent', value: 0.8 }, // 80% 父元素宽度
            autoHeight: { type: 'percent', value: 0.8 }, // 80% 父元素高度
            fill: '#79CB4D', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }]
        })
    ],
})

leafer.add(flow)
```
