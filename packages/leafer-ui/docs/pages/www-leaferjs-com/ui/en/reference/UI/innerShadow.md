<!-- source: https://www.leaferjs.com/ui/en/reference/UI/innerShadow.html -->

# innerShadow 

The inner shadow of an element.

## Key Property 

### innerShadow: `ShadowEffect` | `ShadowEffect`[] 

Inner shadow. Multiple inner shadows can be stacked.

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
  scaleFixed?: 'zoom-in' | false // Whether to keep the original scale during zooming; "zoom-in" means it is fixed only when zooming in (still scales down when zooming out)
}
```

## Belongs to 

### UI Element 

## Example 

### Draw inner shadow 

LeaferApp

ts

```
// #内阴影 (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    cornerRadius: 30,
    fill: '#32cd79',
    innerShadow: {
        x: 10,
        y: 5,
        blur: 20,
        color: '#FF0000AA'
    }
})

leafer.add(rect)
```

ts

```
// #内阴影 (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    cornerRadius: 30,
    fill: '#32cd79',
    innerShadow: {
        x: 10,
        y: 5,
        blur: 20,
        color: '#FF0000AA'
    }
})

app.tree.add(rect)
```
