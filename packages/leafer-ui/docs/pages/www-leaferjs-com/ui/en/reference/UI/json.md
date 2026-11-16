<!-- source: https://www.leaferjs.com/ui/en/reference/UI/json.html -->

# JSON 

Import and export JSON objects / strings.

Note

The App element does not currently support direct import/export.

You can export `app.tree` as JSON, then import it via `app.tree.set({ children: json.children })`.

## Export 

### toJSON ( options?: `IJSONOptions` ): `IUIInputData` 

Export a JSON object.

ts

```
interface IJSONOptions {
  matrix?: boolean
}
```

ts

```
// #导出 JSON (Leafer)
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: '#32cd79',
    draggable: true
})

leafer.add(rect)

const json = leafer.toJSON() 

console.log(json) // {"tag":"Leafer","width":1273,"height":877,"pixelRatio":2,"hittable":true,"children":[{"tag":"Rect","x":100,"y":100,"width":100,"height":100,"fill":"#32cd79","draggable":true}]}
```

### toString ( options?: `IJSONOptions` ): `string` 

Export a JSON string.

ts

```
interface IJSONOptions {
  matrix?: boolean
}
```

## Auxiliary Properties 

### skipJSON: `boolean` 

Whether the child element should be skipped during JSON export.

ts

```
rect.skipJSON = true
```

### childlessJSON: `boolean` 

Whether to prevent exporting child elements when exporting JSON (usually used for custom elements). Defaults to `false`.

ts

```
group.childlessJSON = true
```

## Import 

### Creation Method 

LeaferApp

ts

```
// #创建元素 [使用 JSON (Leafer)]
import { Leafer } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const json = { "tag": 'Group', "x": 20, "y": 20, "children": [{ "tag": "Rect", "x": 100, "y": 100, "width": 100, "height": 100, "fill": "#32cd79", "draggable": true }] }

leafer.add(json)
```

ts

```
// #创建元素 [使用 JSON (App)]
import { App } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const json = { "tag": 'Group', "x": 20, "y": 20, "children": [{ "tag": "Rect", "x": 100, "y": 100, "width": 100, "height": 100, "fill": "#32cd79", "draggable": true }] }

app.tree.add(json)
```

LeaferApp

ts

```
// #Leafer 导入 JSON (Leafer)
import { Leafer } from 'leafer-ui'

const json = { "tag": "Leafer", "width": 1273, "height": 877, "pixelRatio": 2, "hittable": true, "children": [{ "tag": "Rect", "x": 100, "y": 100, "width": 100, "height": 100, "fill": "#32cd79", "draggable": true }] }

new Leafer({ view: window }, json)
```

ts

```
// #Leafer 导入 JSON (App)
import { App } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const json = { "tag": "Leafer", "width": 1273, "height": 877, "pixelRatio": 2, "hittable": true, "children": [{ "tag": "Rect", "x": 100, "y": 100, "width": 100, "height": 100, "fill": "#32cd79", "draggable": true }] }

const app = new App({ view: window, editor: {} })
app.tree.set(json)
```

### set Method 

LeaferApp

ts

```
// #修改数据 [使用 JSON (Leafer)]
import { Group, Leafer } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const group = new Group()

leafer.add(group)

const json = { "x": 20, "y": 20, "children": [{ "tag": "Rect", "x": 100, "y": 100, "width": 200, "height": 200, "fill": "#32cd79", "draggable": true }] }

group.set(json)
```

ts

```
// #修改数据 [使用 JSON (App)]
import { Group, App } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const group = new Group()

app.tree.add(group)

const json = { "x": 20, "y": 20, "children": [{ "tag": "Rect", "x": 100, "y": 100, "width": 200, "height": 200, "fill": "#32cd79", "draggable": true }] }

group.set(json)
```

## Belongs to 

### UI Element 
