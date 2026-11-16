<!-- source: https://www.leaferjs.com/ui/en/reference/UI/pick.html -->

# pick 

Pick elements by a coordinate point (simulate cursor picking elements).

## Key Method 

### pick ( hitPoint: `IPointData`, options?: `IPickOptions` ): `IPickResult` 

Pick an element based on a world coordinate point. Supports penetration path detection, and returns the target element and its path.

ts

```
interface IPickOptions {
  hitRadius?: number // Pick radius, default is 0
  through?: boolean // Whether to return through-path results, default is false
  findList?: ILeaf[] // Pick from a specified list of elements
  exclude?: ILeafList // Exclude specified elements
  ignoreHittable?: boolean // Ignore element's hittable property, default is false
}

interface IPickResult {
  target: ILeaf // The picked target element
  path: ILeafList // Picking path, usually used for event bubbling
  throughPath?: ILeafList // Through path, used to find underlying elements covered by the target
}
```

## Belongs to 

### Group 

## Example 

### Pick element by point 

LeaferApp

ts

```
// #通过 point 拾取元素 (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79' })

leafer.add(rect1)
leafer.add(rect2)

console.log(
    leafer.pick({ x: 10, y: 10 }) // [!code hl] // {taget: rect2, path: [rect2, leafer]}
)
```

ts

```
// #通过 point 拾取元素 (App)
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const rect1 = new Rect({ id: 'block', fill: '#32cd79' })
const rect2 = new Rect({ fill: '#32cd79' })

app.tree.add(rect1)
app.tree.add(rect2)

console.log(
    app.pick({ x: 10, y: 10 }) // [!code hl] // {taget: rect2, path: [rect2, tree, app]}
)
```
