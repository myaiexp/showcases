<!-- source: https://www.leaferjs.com/ui/en/reference/UI/getPathString.html -->

# getPathString 

Get a string path (SVG path).

## Key Property 

### getPathString ( curve?: `boolean`, pathForRender?: `boolean`, toFixed?: `number`): `IPathString` 

Gets the string path of the element (Canvas drawing commands, including non-SVG drawing commands).

`curve` indicates whether to convert the path into SVG curve commands (M, L, C, Z). `pathForRender` indicates whether to get the final rendered path (including corner radius properties).

`toFixed` is used to set the number of decimal places to keep.

## Belongs to 

### UI Element 

## Example 

### Get the string path of an element 

LeaferApp

ts

```
// #获取元素的字符串路径 (Leafer)
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

// 打印 svg 路径字符串
console.log(ellipse.getPathString(true))
```

ts

```
// #获取元素的字符串路径 (App)
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

// 打印 svg 路径字符串
console.log(ellipse.getPathString(true))
```
