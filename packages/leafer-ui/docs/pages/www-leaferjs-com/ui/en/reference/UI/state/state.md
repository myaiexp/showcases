<!-- source: https://www.leaferjs.com/ui/en/reference/UI/state/state.html -->

# state 

Element states allow you to predefine complex UI or game states and switch between them at any time. Supports transition effects.

Box / Group can use the button property to automatically sync interaction states to child elements.

Note

You need to install the state plugin to use this feature.

## State Priority 

State style override order (from lowest to highest):

state < selected < focus < hover < press < disabled

## Key Properties 

### states: `IStates` 

A predefined state list represented as a key-value object.

Each state can define all element styles, including animations and interaction styles such as hover.

ts

```
interface IStates {
  [state: string]: IUIInputData
}
```

### state: `string` 

The current state of the element. The state name corresponds to a key in `states`. Default is empty.

### button: `boolean` 

Whether the element is a button. Default is `false`.

Buttons cannot be nested. When enabled, child elements will automatically sync interaction states such as `state`, `hover`, `press`, etc.

## Belongs To 

### UI Element 

## Examples 

### Toggle element state on click 

state.tsstate.tsLeaferApp

ts

```
// #自定义状态 [切换状态 (Leafer)] 
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/state' // 导入交互状态插件
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79',
    cornerRadius: 30,
    origin: 'center',
    states: { // 自定义状态列表
        color: { fill: '#FEB027' },
        rotate: { animation: { keyframes: [{ rotation: 45 }, { rotation: 135, scale: 1.2 }], duration: 1, swing: true } }
    },
    state: 'color', // 设置状态
    transition: 1
})

leafer.add(rect)

rect.on('click', () => { // 点击切换状态
    rect.state = rect.state === 'color' ? 'rotate' : 'color'
})
```

ts

```
// #自定义状态 [切换状态 (App)] 
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/state' // 导入交互状态插件
import '@leafer-in/animate' // 导入动画插件

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: '#32cd79',
    cornerRadius: 30,
    origin: 'center',
    states: { // 自定义状态列表
        color: { fill: '#FEB027' },
        rotate: { animation: { keyframes: [{ rotation: 45 }, { rotation: 135, scale: 1.2 }], duration: 1, swing: true } }
    },
    state: 'color', // 设置状态
    transition: 1
})

app.tree.add(rect)

rect.on('click', () => { // 点击切换状态
    rect.state = rect.state === 'color' ? 'rotate' : 'color'
})
```

### Button with synced hover state 

LeaferApp

ts

```
// #过渡效果 [按钮交互 (Leafer)]
import { Leafer, Box } from 'leafer-ui'
import '@leafer-in/state' // 导入交互状态插件
import '@leafer-in/animate' // 导入动画插件  

const leafer = new Leafer({ view: window })

const box = new Box({
    x: 100,
    y: 100,
    fill: '#32cd79',
    cornerRadius: 5,
    origin: 'center', // 从中心缩放

    button: true, // 标记为按钮，子元素 Text 将自动同步交互状态
    hoverStyle: { // 鼠标hover状态
        fill: '#FF4B4B',
        scale: 1.5,
        cornerRadius: 20,
    },
    pressStyle: { // 鼠标按下状态
        fill: '#FEB027',
        scale: 1.1,
        transitionOut: 'bounce-out' // 退出状态时的过渡方式
    },

    children: [{
        tag: 'Text',
        text: 'Button',
        fontSize: 16,
        fontWeight: 'bold',
        padding: [10, 20],
        fill: 'rgba(0,0,0,0.5)',
        hoverStyle: { fill: 'black' } // 鼠标 hover 到 button 上的状态
    }]
})

leafer.add(box)
```

ts

```
// #过渡效果 [按钮交互 (App)]
import { App, Box } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/state' // 导入交互状态插件
import '@leafer-in/animate' // 导入动画插件  

const app = new App({ view: window, editor: {} })

const box = new Box({
    x: 100,
    y: 100,
    fill: '#32cd79',
    cornerRadius: 5,
    origin: 'center', // 从中心缩放

    button: true, // 标记为按钮，子元素 Text 将自动同步交互状态
    hoverStyle: { // 鼠标hover状态
        fill: '#FF4B4B',
        scale: 1.5,
        cornerRadius: 20,
    },
    pressStyle: { // 鼠标按下状态
        fill: '#FEB027',
        scale: 1.1,
        transitionOut: 'bounce-out' // 退出状态时的过渡方式
    },

    children: [{
        tag: 'Text',
        text: 'Button',
        fontSize: 16,
        fontWeight: 'bold',
        padding: [10, 20],
        fill: 'rgba(0,0,0,0.5)',
        hoverStyle: { fill: 'black' } // 鼠标 hover 到 button 上的状态
    }]
})

app.tree.add(box)
```
