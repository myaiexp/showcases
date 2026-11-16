<!-- source: https://www.leaferjs.com/ui/en/plugin/in/bg-runner/ -->

# BackgroundRunner 

A background rendering plugin that keeps animations rendering continuously even after switching to another browser tab.

Supports disabling background rendering and setting the maximum rendering frame rate.

## Changelog 

The final version before open-sourcing was v1.0.1. View the changelog.

## 📦 Install the Plugin (Open Source) 

The `bg-runner` plugin is required to use this feature. Visit the GitHub repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/bg-runner
```

sh

```
pnpm add @leafer-in/bg-runner
```

sh

```
yarn add @leafer-in/bg-runner
```

sh

```
bun add @leafer-in/bg-runner
```

Alternatively, you can include it using a `<script>` tag and access the plugin through the global variable `LeaferIN.bgRunner`.

bg-runner.minbg-runner

html

```
<script src="https://unpkg.com/@leafer-in/bg-runner@2.3.4/dist/bg-runner.min.js"></script>

<script>
  const { BackgroundRunner } = LeaferIN.bgRunner
</script>
```

html

```
<script src="https://unpkg.com/@leafer-in/bg-runner@2.3.4/dist/bg-runner.js"></script>

<script>
  const { BackgroundRunner } = LeaferIN.bgRunner
</script>
```

## Electron: Continue Running When Minimized 

Make sure renderer backgrounding is disabled:

ts

```
const { app, BrowserWindow } = require('electron')

app.commandLine.appendSwitch('disable-renderer-backgrounding')

app.commandLine.appendSwitch('disable-background-timer-throttling')

app.commandLine.appendSwitch('disable-backgrounding-occluded-windows')
```

Also disable Chromium's background throttling:

ts

```
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    backgroundThrottling: false, // 🔥 Important
  },
})
```

## Examples 

### Keep Rendering Animations After Switching to Another Browser Tab 

ts

```
// #后台运行 [切换浏览器tab标签页后，后台仍持续渲染动画]
import { Leafer, Rect, RenderEvent, Text } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件 
import '@leafer-in/bg-runner' // 导入后台运行插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    fill: '#32cd79',
    animation: {
        style: { x: 500, cornerRadius: 50, fill: '#ffcd00' }, // style keyframe
        duration: 1,
        swing: true // 摇摆循环播放
    }
})

leafer.add(rect)

const text = new Text({ x: 100, y: 200, fontSize: 50, fill: 'gray' })
leafer.add(text)
leafer.add(new Text({ x: 10, y: 280, fontSize: 20, fill: 'gray', text: '切换浏览器tab标签页，查看渲染次数变化' }))

let count = 1

// 切换浏览器tab标签页，查看渲染次数变化
leafer.on(RenderEvent.START, () => {
    text.text = count++
})
```

### Control the Maximum Rendering Frame Rate 

ts

```
// #后台运行 [控制最大渲染帧]
import { Leafer, Rect, RenderEvent, Text } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件 
import { BackgroundRunner } from '@leafer-in/bg-runner' // 导入后台运行插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    fill: '#32cd79',
    animation: {
        style: { x: 500, cornerRadius: 50, fill: '#ffcd00' }, // style keyframe
        duration: 1,
        swing: true // 摇摆循环播放
    }
})

leafer.add(rect)

const text = new Text({ x: 100, y: 200, fontSize: 50, fill: 'gray' })
leafer.add(text)
leafer.add(new Text({ x: 10, y: 280, fontSize: 20, fill: 'gray', text: '切换浏览器tab标签页，查看渲染次数变化' }))

let count = 1

// 切换浏览器tab标签页，查看渲染次数变化
leafer.on(RenderEvent.START, () => {
    text.text = count++
})

BackgroundRunner.maxFPS = 10 // 控制最大渲染帧，默认为60帧
```

### Disable Background Rendering 

ts

```
// #后台运行 [禁用后台渲染]
import { Leafer, Rect, RenderEvent, Text } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件
import { BackgroundRunner } from '@leafer-in/bg-runner' // 导入后台运行插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    fill: '#32cd79',
    animation: {
        style: { x: 500, cornerRadius: 50, fill: '#ffcd00' }, // style keyframe
        duration: 1,
        swing: true // 摇摆循环播放
    }
})

leafer.add(rect)

const text = new Text({ x: 100, y: 200, fontSize: 50, fill: 'gray' })
leafer.add(text)
leafer.add(new Text({ x: 10, y: 280, fontSize: 20, fill: 'gray', text: '切换浏览器tab标签页，查看渲染次数变化' }))

let count = 1

// 切换浏览器tab标签页，查看渲染次数变化
leafer.on(RenderEvent.START, () => {
    text.text = count++
})

BackgroundRunner.disabled = true // 禁用后台渲染
```
