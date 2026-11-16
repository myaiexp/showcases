<!-- source: https://www.leaferjs.com/ui/en/guide/plugin/state.html -->

# Interaction States 

You can add interaction states to elements just like CSS, such as hover, press, focus, selected, and disabled.

It also supports adding transition effects, and you can define complex custom element or game states using state for dynamic switching at any time.

Note

You must install the interaction state plugin to use this feature. The transition effect requires the animation plugin.

Alternatively, you can install leafer-game, which already includes both interaction state and animation plugins.

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

## Next Step 

### Motion Path 
