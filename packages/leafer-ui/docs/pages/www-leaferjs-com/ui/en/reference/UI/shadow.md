<!-- source: https://www.leaferjs.com/ui/en/reference/UI/shadow.html -->

# shadow 

The outer shadow of an element.

## Key Property 

### shadow: `ShadowEffect` | `ShadowEffect`[] 

Outer shadow. Supports multiple shadow stacking and `boxShadow` effects.

ts

```
interface ShadowEffect {
  x: number
  y: number
  blur: number
  spread?: number
  color: Color
  blendMode?: BlendMode
  visible?: boolean
  scaleFixed?: 'zoom-in' | false // whether shadow keeps fixed scale when zooming; "zoom-in" means fixed only when zooming in (still scales down when zooming out)
  box?: boolean // behaves like CSS3 boxShadow; only renders shadow outside the shape
}
```

## Belongs to 

### UI Element 

## Example 

### Render shadow 

LeaferApp

ts

```
// #外阴影 [drop-shadow (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    cornerRadius: 30,
    fill: 'rgba(50,205,121,0.7)',
    shadow: {
        x: 10,
        y: -10,
        blur: 20,
        color: '#FF0000AA'
    }
})

leafer.add(rect)
```

ts

```
// #外阴影 [drop-shadow (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    cornerRadius: 30,
    fill: 'rgba(50,205,121,0.7)',
    shadow: {
        x: 10,
        y: -10,
        blur: 20,
        color: '#FF0000AA'
    }
})

app.tree.add(rect)
```

### Render boxShadow effect 

LeaferApp

ts

```
// #外阴影 [box-shadow (Leafer)]
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    cornerRadius: 30,
    fill: 'rgba(50,205,121,0.7)',
    shadow: {
        x: 10,
        y: -10,
        blur: 20,
        color: '#FF0000AA',
        box: true // box-shadow
    }
})

leafer.add(rect)
```

ts

```
// #外阴影 [box-shadow (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    cornerRadius: 30,
    fill: 'rgba(50,205,121,0.7)',
    shadow: {
        x: 10,
        y: -10,
        blur: 20,
        color: '#FF0000AA',
        box: true // box-shadow
    }
})

app.tree.add(rect)
```

### Shadow does not scale with canvas zoom 

ts

```
// #图形编辑器 [背景为透明方格的画板]
import { App, Frame, Rect, Platform } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    fill: '#333',
    editor: {},  //  配置 editor 会自动创建并添加 app.editor 实例、tree 层、sky 层
})

// 平铺的透明方格
const svg = Platform.toURL(
    `<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
<rect x="0" y="0" width="5" height="5" fill="#FFF"/><rect x="5" y="0" width="5" height="5" fill="#CCC"/>
<rect x="0" y="5" width="5" height="5" fill="#CCC"/><rect x="5" y="5" width="5" height="5" fill="#FFF"/>
</svg>`, 'svg',)


app.tree.add(Frame.one({ // 背景为透明方格的画板
    fill: {
        type: 'image',
        url: svg,
        mode: 'repeat',
        scaleFixed: 'zoom-in' // true // 固定平铺图比例，不随画布缩放
    },
    shadow: {
        x: 0,
        y: 3,
        blur: 15,
        color: '#0009',
        scaleFixed: 'zoom-in' // 固定阴影比例，不随画布放大
    },
    children: [
        Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100)
    ]
}, 100, 100, 500, 600))
```
