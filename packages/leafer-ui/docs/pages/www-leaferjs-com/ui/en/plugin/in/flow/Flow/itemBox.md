<!-- source: https://www.leaferjs.com/ui/en/plugin/in/flow/Flow/itemBox.html -->

# Box Type 

## Key Properties 

### itemBox: `'box'` | `'stroke'` 

Specifies which box type of child elements is used for layout. Default is `box`.

## Belongs To 

### Flow Element 

## Example 

### Layout using child element's box type 

ts

```
// #自动布局 - 盒类型 [采用子元素的 box 盒类型布局]
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    itemBox: 'box', // 采用子元素的 box 盒类型布局
    fill: '#676',
    width: 100,
    height: 100,
    children: [
        new Box({ fill: '#FF4B4B', stroke: 'black', strokeWidth: 4, strokeAlign: 'center', children: [{ tag: 'Text', text: '1', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 20 }] }),
        new Box({ fill: '#FEB027', stroke: 'black', strokeWidth: 4, strokeAlign: 'center', children: [{ tag: 'Text', text: '2', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 40 }] }),
        new Box({ fill: '#79CB4D', stroke: 'black', strokeWidth: 4, strokeAlign: 'center', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }] })
    ],
})

leafer.add(flow)
```

### Layout using child element's stroke box type (including stroke) 

ts

```
// #自动布局 - 盒类型 [采用子元素的 stroke 盒类型布局（包含描边）]
import { Leafer, Box } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'  // 导入自动布局插件

const leafer = new Leafer({ view: window })

const flow = new Flow({
    itemBox: 'stroke', // 采用子元素的 stroke 盒类型布局（包含描边）
    fill: '#676',
    width: 100,
    height: 100,
    children: [
        new Box({ fill: '#FF4B4B', stroke: 'black', strokeWidth: 4, strokeAlign: 'center', children: [{ tag: 'Text', text: '1', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 20 }] }),
        new Box({ fill: '#FEB027', stroke: 'black', strokeWidth: 4, strokeAlign: 'center', children: [{ tag: 'Text', text: '2', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 40 }] }),
        new Box({ fill: '#79CB4D', stroke: 'black', strokeWidth: 4, strokeAlign: 'center', children: [{ tag: 'Text', text: '3', fill: 'white', textAlign: 'center', verticalAlign: 'middle', width: 25, height: 30 }] })
    ],
})

leafer.add(flow)
```
