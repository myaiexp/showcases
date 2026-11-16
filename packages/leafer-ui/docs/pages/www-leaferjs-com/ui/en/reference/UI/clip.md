<!-- source: https://www.leaferjs.com/ui/en/reference/UI/clip.html -->

# clip 

Clip content that exceeds width and height.

Box and Frame support clipping via `overflow`.

Text supports clipping via `textOverflow`.

In addition, you can quickly clip images using the `clip` mode in image fill.

## Key Properties 

### overflow: `IOverflow` 

Set `overflow` to `hide` to clip the content of a Box.

ts

```
type IOverflow = 'show' | 'hide'
```

### textOverflow: `IOverflow` ｜ `string` 

Set `overflow` to `hide` to hide Text content that exceeds fixed width and height, or customize the ellipsis content.

ts

```
type IOverflow = 'show' | 'hide'

// Custom ellipsis content

text.textOverflow = '...'
```

## Belongs to 

### UI Elements 

## Examples 

### Clip content exceeding width and height 

LeaferApp

ts

```
// #创建 Box [隐藏超出宽高的内容 (Leafer)]
import { Leafer, Box, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window, fill: '#333' })

const box = new Box({
    width: 100,
    height: 100,
    fill: '#FF4B4B',
    overflow: 'hide'
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
// #创建 Box [隐藏超出宽高的内容 (App)]
import { App, Box, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {}, fill: '#333' })

const box = new Box({
    width: 100,
    height: 100,
    fill: '#FF4B4B',
    overflow: 'hide',
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

### Quickly clip images 

LeaferApp

ts

```
// #图案填充 [clip 裁剪模式 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'image',
        url: '/image/leafer.jpg',
        mode: 'clip',
        offset: { x: -40, y: -90 },
        scale: { x: 1.1, y: 1.1 },
        rotation: 20
    }
})

leafer.add(rect)
```

ts

```
// #图案填充 [clip 裁剪模式 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: {
        type: 'image',
        url: '/image/leafer.jpg',
        mode: 'clip',
        offset: { x: -40, y: -90 },
        scale: { x: 1.1, y: 1.1 },
        rotation: 20
    }
})

app.tree.add(rect)
```
