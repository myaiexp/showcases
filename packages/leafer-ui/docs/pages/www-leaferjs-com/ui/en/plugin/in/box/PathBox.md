<!-- source: https://www.leaferjs.com/ui/en/plugin/in/box/PathBox.html -->

# PathBox Element 

An element that combines the features of both Path and Box. It also supports adding child elements inside.

  

Inheritance

PathBox  >  Path, Box  >  Group, Rect   >  UI

Note

You must install the box plugin to use this feature.

## Example 

### Create PathBox 

LeaferApp

ts

```
// #创建 PathBox [标准创建 (Leafer)]
import { Leafer, Ellipse } from 'leafer-ui'
import { PathBox } from '@leafer-in/box' // 导入box插件

const leafer = new Leafer({ view: window })


const box = new PathBox({
    path: 'X 0 0 100 100 30 P 50 50 25',
    windingRule: 'evenodd',
    fill: '#FF4B4B',
    draggable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    draggable: true
})

leafer.add(box)
box.add(circle)
```

ts

```
// #创建 PathBox [标准创建 (App)]
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import { PathBox } from '@leafer-in/box' // 导入box插件

const app = new App({ view: window, editor: {} })

const box = new PathBox({
    path: 'X 0 0 100 100 30 P 50 50 25',
    windingRule: 'evenodd',
    fill: '#FF4B4B',
    hitChildren: false, // 阻止直接选择子元素（防止父子选择冲突，可双击进入组内选择子元素）
    editable: true
})

const circle = new Ellipse({
    x: 60,
    y: 60,
    width: 50,
    height: 50,
    fill: '#FEB027',
    editable: true
})

app.tree.add(box)
box.add(circle)
```
