<!-- source: https://www.leaferjs.com/ui/en/reference/UI/size.html -->

# size 

The width and height size properties of an element.

## Key Properties 

### width: `number` 

The width of the element. Only some elements support direct assignment.

For unsupported elements and Groups, use resizeWidth() to adjust the width, and use boxBounds to get the actual width.

### height: `number` 

The height of the element. Only some elements support direct assignment.

For unsupported elements and Groups, use resizeHeight() to adjust the height, and use boxBounds to get the actual height.

## Read-only Properties 

### isAutoWidth: `boolean` 

Whether the width is auto-sized.

### isAutoHeight: `boolean` 

Whether the height is auto-sized.

## Belongs to 

### UI Element 

## Example 

### Create a rectangle and set width and height 

LeaferApp

ts

```
// #创建 Rect [绘制矩形 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79'
})

leafer.add(rect)
```

ts

```
// #创建 Rect [绘制矩形 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79',
    editable: true
})

app.tree.add(rect)
```

### Resize Group without using scale 

LeaferApp

ts

```
// #调整 Group 大小，不使用 scale 属性 (Leafer)
import { Leafer, Group, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/resize' // 导入 resize 插件

const leafer = new Leafer({ view: window })

const group = new Group({
    children: [
        new Rect({
            width: 100,
            height: 100,
            fill: '#32cd79',
            draggable: true
        }),
        new Ellipse({
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            innerRadius: 0.5,
            fill: "#FEB027"
        })
    ]
})

leafer.add(group)

setTimeout(() => {

    // resize group
    group.resizeWidth(200)  
    group.resizeHeight(200)

}, 1000)
```

ts

```
// #调整 Group 大小，不使用 scale 属性 (App)
import { App, Group, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/resize' // 导入 resize 插件

const app = new App({ view: window, editor: {} })

const group = new Group({
    children: [
        new Rect({
            width: 100,
            height: 100,
            fill: '#32cd79',
            draggable: true
        }),
        new Ellipse({
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            innerRadius: 0.5,
            fill: "#FEB027"
        })
    ]
})

app.tree.add(group)

setTimeout(() => {

    // resize group
    group.resizeWidth(200)  
    group.resizeHeight(200)

}, 1000)
```
