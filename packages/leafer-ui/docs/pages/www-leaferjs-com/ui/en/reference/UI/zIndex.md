<!-- source: https://www.leaferjs.com/ui/en/reference/UI/zIndex.html -->

# zIndex 

The stacking order of an element within its parent. It is slightly different from HTML’s z-index.

## Key Properties 

### zIndex: `number` 

The stacking order of the element within its parent, defaults to 0.

## Belongs To 

### UI Elements 

## Example 

### Adjust the display order of rectangles 

LeaferApp

ts

```
// #调整元素在父元素中的层叠顺序 (Leafer)
import { Leafer, Group, Rect, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79',
    draggable: true
})

const ellipse = new Ellipse({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: "#FEB027"
})

leafer.add(new Group({ children: [rect, ellipse] }))

setTimeout(() => {

    // 调整矩形的显示顺序
    rect.zIndex = 1

}, 1000)
```

ts

```
// #调整元素在父元素中的层叠顺序 (App)
import { App, Group, Rect, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79',
    draggable: true
})

const ellipse = new Ellipse({
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    innerRadius: 0.5,
    fill: "#FEB027"
})

app.tree.add(new Group({ children: [rect, ellipse] }))

setTimeout(() => {

    // 调整矩形的显示顺序
    rect.zIndex = 1

}, 1000)
```
