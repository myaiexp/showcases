<!-- source: https://www.leaferjs.com/ui/en/plugin/in/motion-text/ -->

# Motion Text 

Motion Text — Easily create text that follows a motion path.

## 📆 Changelog 

The final version before open-sourcing was v1.0.0-beta.2. View the changelog.

## 📦 Install the Plugin (Open Source) 

The `motion-text` plugin is required to use this feature. Visit the GitHub repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/motion-text
```

sh

```
pnpm add @leafer-in/motion-text
```

sh

```
yarn add @leafer-in/motion-text
```

sh

```
bun add @leafer-in/motion-text
```

Alternatively, you can include it using a `<script>` tag and access the plugin through the global variable `LeaferIN.motionText`.

motion-text.minmotion-text

html

```
<script src="https://unpkg.com/@leafer-in/motion-text@2.3.4/dist/motion-text.min.js"></script>

<script>
  const {} = LeaferIN.motionText
</script>
```

html

```
<script src="https://unpkg.com/@leafer-in/motion-text@2.3.4/dist/motion-text.js"></script>

<script>
  const {} = LeaferIN.motionText
</script>
```

## Examples 

### Motion Text 

ts

```
// #Motion Text [运动文本]
import { Group, App, Line, Text } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件
import '@leafer-in/motion-path' // 导入运动路径插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/motion-text' // 导入运动文本插件 

const app = new App({ view: window, tree: { type: 'viewport' } })

const group = new Group()

const path = new Line({
    x: 100,
    y: 100,
    motionPath: true, // 设置为运动路径，该 Group 内的其他元素都可以沿此路径运动
    points: [0, 90, 100, 60, 200, 80, 300, 40, 375, 50, 450, 10, 550, 90, 550, 90],
    curve: 0.4,
    fill: '#32cd79',
})


const text = new Text({
    fill: '#32cd79',
    text: 'Welcome to LeaferJS',
    letterSpacing: 1,
    motion: 0,
    motionText: true, // 设为运动文本，沿着路径排列 
    motionAround: 'bottom',  // 路径在文本下方
    animation: { // 沿 path 运动至 100%
        style: { motion: { type: "percent", value: 1 } },
        duration: 3,
        easing: 'linear',
        loop: true
    }
})

group.add(path)
group.add(text)

app.tree.add(group)
```

### Text Around a Circle 

ts

```
// #Motion Text [环绕圆形]
import { Group, App, Ellipse, Text } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/text-editor' // 导入文本编辑插件 
import '@leafer-in/viewport' // 导入视口插件 (可选)
import '@leafer-in/motion-path' // 导入运动路径插件

import '@leafer-in/motion-text' // 导入运动文本插件

const app = new App({ view: window, editor: {} })

const group = new Group({ hitChildren: false, editable: true })

const path = new Ellipse({
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    fill: "#32cd79",
    motionPath: true, // 设置为运动路径，该 Group 内的其他元素都可以沿此路径运动
    editable: true
})

const text = new Text({
    text: 'Welcome to PxGrow',
    fontSize: 20,
    fill: '#32cd79',
    editable: true,
    motion: { type: 'percent', value: 0.75 }, // 运动位置
    motionText: true, // 设为运动文本，沿着路径排列
    motionAround: 'bottom'  // 路径在文本下方
})

group.add(path)
group.add(text)

app.tree.add(group)
```
