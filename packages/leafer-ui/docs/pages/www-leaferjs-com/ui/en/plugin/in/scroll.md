<!-- source: https://www.leaferjs.com/ui/en/plugin/in/scroll/ -->

# ScrollBar Element 

Infinite canvas scrollbar. It shows horizontal and vertical scrollbars when needed, and supports switching between light/dark themes or custom styles.

Inheritance

ScrollBar  >  Group  >  UI

## Install Plugin 

You need to install the scroll plugin to use it. Visit Github repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/scroll
```

sh

```
pnpm add @leafer-in/scroll
```

sh

```
yarn add @leafer-in/scroll
```

sh

```
bun add @leafer-in/scroll
```

Or include via script tag and access plugin features through the global variable `LeaferIN.scroll`.

scroll.minscroll

html

```
<script src="https://unpkg.com/@leafer-in/scroll@2.3.4/dist/scroll.min.js"></script>
<script>
  const { ScrollBar } = LeaferIN.scroll
</script>
```

html

```
<script src="https://unpkg.com/@leafer-in/scroll@2.3.4/dist/scroll.js"></script>
<script>
  const { ScrollBar } = LeaferIN.scroll
</script>
```

## Key Properties 

### config: `IScrollBarConfig` 

Scrollbar configuration, which can be passed as the second parameter when creating a ScrollBar instance.

ts

```
interface IScrollBarConfig {
  theme?: IScrollBarTheme // theme style
  padding?: IFourNumber // canvas padding on all four sides
  minSize?: number // minimum scrollbar size, default is 10
}

type IScrollBarTheme = 'light' | 'dark' | IBoxInputData
```

## Key Methods 

### changeTheme ( theme: `IScrollBarTheme` ) 

Change theme or apply custom styles.

### update ( ) 

Update the scrollbar.

## Scroll Range Limitation 

Engine config config.move.scroll = 'limit' can restrict scrolling to content areas.

## Inheritance 

### ScrollBar  >  Group  >  UI 

## Example 

### Default theme 

The `light` theme is suitable for light canvas backgrounds.

ts

```
// #滚动条 [默认主题]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件
import { ScrollBar } from '@leafer-in/scroll' // 导入滚动条插件

const app = new App({ view: window, editor: {} })

new ScrollBar(app)  // [!code hl:1]  // = app.sky.add(new ScrollBar(app.tree))

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 500, 100))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 650, 2400))
```

### Dark theme 

The `dark` theme is suitable for dark canvas backgrounds.

ts

```
// #滚动条 [暗黑主题]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件
import { ScrollBar } from '@leafer-in/scroll' // 导入滚动条插件

const app = new App({ view: window, fill: '#000', editor: {} })

new ScrollBar(app, { theme: 'dark' })  

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 500, 100))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 650, 2400))
```

### Custom style 

ts

```
// #滚动条 [自定义样式]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件
import { ScrollBar } from '@leafer-in/scroll' // 导入滚动条插件

const app = new App({ view: window, fill: '#000', editor: {} })

new ScrollBar(app, { theme: { fill: '#32cd79' } })  

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 500, 100))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 650, 2400))
```

### Change theme 

ts

```
// #滚动条 [修改主题]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件
import { ScrollBar } from '@leafer-in/scroll' // 导入滚动条插件

const app = new App({ view: window, fill: '#000', editor: {} })

const scroll = new ScrollBar(app, { theme: 'dark' })

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 500, 100))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 650, 2400))

setTimeout(() => {

    scroll.changeTheme('light') 

}, 1000)
```

### Canvas padding 

Padding supports fourNumber

ts

```
// #滚动条 [设置画布 padding]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件
import { ScrollBar } from '@leafer-in/scroll' // 导入滚动条插件

const app = new App({ view: window, editor: {} })

const scroll = new ScrollBar(app, { padding: 100 }) 

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 500, 100))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 650, 2400))


setTimeout(() => {

    scroll.config.padding = 0
    scroll.update()

}, 1000)
```
