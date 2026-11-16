<!-- source: https://www.leaferjs.com/ui/en/plugin/in/stroke-sides/ -->

# Stroke Sides 

Easily control each side of a rectangle independently.

## Changelog 

The final version before open-sourcing was v1.0.0. View the changelog.

## 📦 Install the Plugin (Open Source) 

The `stroke-sides` plugin is required to use this feature. Visit the GitHub repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/stroke-sides
```

sh

```
pnpm add @leafer-in/stroke-sides
```

sh

```
yarn add @leafer-in/stroke-sides
```

sh

```
bun add @leafer-in/stroke-sides
```

Alternatively, you can include it using a `<script>` tag and access the plugin through the global variable `LeaferIN.strokeSides`.

stroke-sides.minstroke-sides

html

```
<script src="https://unpkg.com/@leafer-in/stroke-sides@2.3.4/dist/stroke-sides.min.js"></script>

<script>
  const {} = LeaferIN.strokeSides
</script>
```

html

```
<script src="https://unpkg.com/@leafer-in/stroke-sides@2.3.4/dist/stroke-sides.js"></script>

<script>
  const {} = LeaferIN.strokeSides
</script>
```

## Stroke Properties 

Elements such as Rect, Box, and Frame support this property.

### strokeWidth: `IFourNumber` 

Stroke width. Each of the four sides can be configured independently. The default value is `0`.

ts

```
strokeWidth: [20, 10, 20, 10] // [top, right, bottom, left]
strokeWidth: [20, 10, 20] // [top, (right-left), bottom]
strokeWidth: [20, 10] // [(top-bottom), (right-left)]
strokeWidth: 20 // all
```

## Examples 

### Create a Rect Element with Independent Strokes 

ts

```
// #独立边框 [创建独立边框的 Rect 元素]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/stroke-sides' // 导入独立边框插件

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: '#32cd79',
    stroke: '#000',
    cornerRadius: 20,
    strokeWidth: [5, 0, 5, 10], // [top, right, bottom, left]
    editable: true
})

app.tree.add(rect)
```
