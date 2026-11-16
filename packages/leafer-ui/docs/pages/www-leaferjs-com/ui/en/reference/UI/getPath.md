<!-- source: https://www.leaferjs.com/ui/en/reference/UI/getPath.html -->

# getPath 

Get the numeric path.

## Key Method 

### getPath ( curve?: `boolean`, pathForRender?: `boolean`): `IPathCommandData` 

Gets the numeric path of the element (Canvas drawing commands).

`curve` indicates whether to convert the path into curve commands (M, L, C, Z). `pathForRender` indicates whether to get the final rendered path (including corner radius properties).

### asPath ( curve?: `boolean`, pathForRender?: `boolean`): `IPathCommandData` 

Forcibly convert the element into a path. Equivalent to `rect.path = rect.getPath()`. You can learn more about the implementation in path priority mode.

## Belongs to 

### UI Element 

## Example 

### Get the numeric path of an element 

LeaferApp

ts

```
// #获取元素的数字路径 (Leafer)
import { Leafer, Ellipse } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    startAngle: -60,
    endAngle: 180,
    innerRadius: 0.5,
    fill: "#32cd79"
})

leafer.add(ellipse)

// 打印数字路径
console.log(ellipse.getPath())
```

ts

```
// #获取元素的数字路径 (App)
import { App, Ellipse } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, editor: {} })

const ellipse = new Ellipse({
    width: 100,
    height: 100,
    startAngle: -60,
    endAngle: 180,
    innerRadius: 0.5,
    fill: "#32cd79"
})

app.tree.add(ellipse)

// 打印数字路径
console.log(ellipse.getPath())
```
