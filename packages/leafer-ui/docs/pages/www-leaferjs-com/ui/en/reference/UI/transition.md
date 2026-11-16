<!-- source: https://www.leaferjs.com/ui/en/reference/UI/transition.html -->

# transition 

Transition effect.

Unlike CSS, it can only be used for element state transitions, such as state, hoverStyle, pressStyle ...

In addition, element methods like move() and set() support animation transition parameters. Text also supports count animation and typewriter animation.

Note

You need to install the animation plugin to use this feature, or directly install leafer-game (which already includes the animation plugin).

## Key Properties 

### transition: `ITranstion` 

State transition / enter state transition, defaults to true. See animation options for details.

ts

```
// Transition options: number represents duration, string represents easing, object represents animation options
type ITransition = boolean | number | IAnimateEasingName | IAnimateOptions
```

Learn more about animation option properties.

ts

```
// Animation options
interface IAnimateOptions {
  easing?: IAnimateEasing // easing function, default is ease

  delay?: number // delay time in seconds, default is 0
  duration?: number // animation duration in seconds, default is 0.2
  ending?: IAnimateEnding // animation end state, can be from, to, default auto

  reverse?: boolean // whether to reverse animation from to to -> from, default false
  swing?: boolean | number // whether to play swing loop, can set count (number of times reaching "to")

  loop?: boolean | number // whether to loop animation, can set number of loops, default false
  loopDelay?: number // delay time before next loop, default 0

  speed?: number // playback speed multiplier, higher means faster, default 1

  join?: boolean // whether to include previous element state as from keyframe
  autoplay?: boolean // whether to autoplay

  attrs?: string[] // list of element attributes involved in transition animation, default is all
  event?: IAnimateEvents // event listener
}
```

### transitionOut: `ITranstion` 

Transition effect when exiting state, uses transition if not set.

## Belongs To 

### UI Elements 

## Example 

### Button with transition effect 

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
