<!-- source: https://www.leaferjs.com/ui/en/reference/UI/animation.html -->

# Animation 

Animation properties support delay, looping, and seek, and can be used to create transition animations, swing animations, keyframe animations, and path animations.

In addition, element methods such as move() and set() support animation transition parameters. Text also supports count animations and typewriter animations.

Note

You need to install the animation plugin to use this feature, or directly install leafer-game (which already includes the animation plugin).

## Key Properties 

### animation： `IAnimation` | `IAnimation`[] 

Animation / entrance animation, supports multiple animations stacking.

ts

```
type IAnimation = IStyleAnimation | IKeyframesAnimation

// Style transition animation
interface IStyleAnimation extends IAnimateOptions {
  style: IUIInputData // element style
  // ...animation options
}
```

Learn more about animation option properties.

ts

```
// Animation options
interface IAnimateOptions {
  easing?: IAnimateEasing // easing function, default: ease

  delay?: number // delay time in seconds, default: 0
  duration?: number // animation duration in seconds, default: 0.2
  ending?: IAnimateEnding // final state of animation: from/to/auto (default)

  reverse?: boolean // reverse animation (to -> from), default: false
  swing?: boolean | number // swing loop playback (number of times reaching "to"), default: false

  loop?: boolean | number // loop playback, default: false
  loopDelay?: number // delay between loops, default: 0

  speed?: number // playback speed multiplier, default: 1

  join?: boolean // include element's pre-animation state as "from" keyframe
  autoplay?: boolean // auto play

  attrs?: string[] // properties included in animation (default: all)
  event?: IAnimateEvents // animation events
}
```

Keyframe animation.

ts

```
// Keyframe animation
interface IKeyframesAnimation extends IAnimateOptions {
  keyframes: IKeyframe[] // list of keyframes
  // ...animation options
}

// Keyframe object
type IKeyframe = IUIInputData | IAnimateKeyframe

interface IAnimateKeyframe {
  style: IUIInputData // element style

  easing?: IAnimateEasing // easing for this keyframe
  delay?: number // delay for this keyframe
  duration?: number // fixed duration for this keyframe (overrides autoDuration)

  swing?: number // swing count (times reaching "to"), from -> to -> from -> to ..., default 0
  loop?: number // loop count, default 0

  // Distribute remaining time:
  // (total duration - fixed keyframe durations) / total weight * current weight
  autoDelay?: number // weight for auto delay, default 0
  autoDuration?: number // weight for auto duration, default 1
}
```

### animationOut： `IAnimation` | `IAnimation`[] 

Exit animation, supports multiple animations stacking. Triggered when the element is removed or when visible becomes 0.

## Belongs to 

### UI Elements 

## Examples 

### Entrance and Exit Animations 

Can be used to build page transition effects and element enter/leave effects.

LeaferApp

ts

```
// #动画样式 [入场和出场动画 (Leafer)]
import { Group, Leafer, Frame } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const page1 = new Frame({
    x: 300,
    y: 100,
    width: 150,
    height: 100,
    fill: '#FEB027',
    animation: { // 入场动画
        keyframes: [{ opacity: 0, offsetX: -150 }, { opacity: 1, offsetX: 0 }],
        duration: 0.8
    },
    animationOut: { // 出场动画
        style: { opacity: 0, offsetX: 150 },
        duration: 0.8
    }
})

const page2 = page1.clone({ fill: '#32cd79' }) // 克隆 page 并重新设置fill

const group = new Group({ children: [page1] })

leafer.add(group)

// 切换页面, 自动执行入场、出场动画
setInterval(() => {

    if (page1.parent) {
        group.add(page2)
        page1.remove()
    } else {
        group.add(page1)
        page2.remove()
    }

}, 2000)
```

ts

```
// #动画样式 [入场和出场动画 (App)]
import { Group, App, Frame } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/animate' // 导入动画插件

const app = new App({ view: window, editor: {} })

const page1 = new Frame({
    x: 300,
    y: 100,
    width: 150,
    height: 100,
    fill: '#FEB027',
    animation: { // 入场动画
        keyframes: [{ opacity: 0, offsetX: -150 }, { opacity: 1, offsetX: 0 }],
        duration: 0.8
    },
    animationOut: { // 出场动画
        style: { opacity: 0, offsetX: 150 },
        duration: 0.8
    }
})

const page2 = page1.clone({ fill: '#32cd79' }) // 克隆 page 并重新设置fill

const group = new Group({ children: [page1] })

app.tree.add(group)

// 切换页面, 自动执行入场、出场动画
setInterval(() => {

    if (page1.parent) {
        group.add(page2)
        page1.remove()
    } else {
        group.add(page1)
        page2.remove()
    }

}, 2000)
```

### Swing Loop Animation 

LeaferApp

ts

```
// #动画样式 [摇摆动画 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    y: 100,
    cornerRadius: 50,
    fill: '#32cd79',
    animation: {
        style: { x: 500, cornerRadius: 0 }, // style keyframe
        // options
        duration: 1,
        swing: true
    }
})

leafer.add(rect)
```

ts

```
// #动画样式 [摇摆动画 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/animate' // 导入动画插件

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    y: 100,
    cornerRadius: 50,
    fill: '#32cd79',
    animation: {
        style: { x: 500, cornerRadius: 0 }, // style keyframe
        // options
        duration: 1,
        swing: true
    }
})

app.tree.add(rect)
```

### Color Transition Animation 

LeaferApp

ts

```
// #动画样式 [颜色过渡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    y: 100,
    cornerRadius: 50,
    fill: '#32cd79',
    animation: {
        style: { x: 500, cornerRadius: 0, fill: '#ffcd00' }, // style keyframe
        duration: 1,
        swing: true // 摇摆循环播放
    }
})

leafer.add(rect)
```

ts

```
// #动画样式 [颜色过渡 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/animate' // 导入动画插件

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    y: 100,
    cornerRadius: 50,
    fill: '#32cd79',
    animation: {
        style: { x: 500, cornerRadius: 0, fill: '#ffcd00' }, // style keyframe
        duration: 1,
        swing: true // 摇摆循环播放
    }
})

app.tree.add(rect)
```

### Keyframe Animation 

LeaferApp

ts

```
// #动画样式 [关键帧动画 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    x: 50,
    y: 100,
    cornerRadius: 50,
    fill: '#32cd79',
    around: 'center',
    animation: {
        keyframes: [
            { style: { x: 150, scaleX: 2, fill: '#ffcd00' }, duration: 0.5 },  // animate keyframe
            { style: { x: 50, scaleX: 1, fill: '#ffcd00' }, duration: 0.2 },
            { style: { x: 550, cornerRadius: 0, fill: '#ffcd00' }, delay: 0.1, easing: 'bounce-out' },
            { x: 50, rotation: -720, cornerRadius: 50 } // style keyframe
        ],
        duration: 3, // 自动分配剩余的时长给未设置 duration 的关键帧： (3 - 0.5 - 0.2 - 0.1) / 2 
        loop: true,
        join: true //  加入动画前的元素状态作为 from 关键帧
    }
})

leafer.add(rect)
```

ts

```
// #动画样式 [关键帧动画 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/animate' // 导入动画插件

const app = new App({ view: window, editor: {} })

const rect = new Rect({
    x: 50,
    y: 100,
    cornerRadius: 50,
    fill: '#32cd79',
    around: 'center',
    animation: {
        keyframes: [
            { style: { x: 150, scaleX: 2, fill: '#ffcd00' }, duration: 0.5 },  // animate keyframe
            { style: { x: 50, scaleX: 1, fill: '#ffcd00' }, duration: 0.2 },
            { style: { x: 550, cornerRadius: 0, fill: '#ffcd00' }, delay: 0.1, easing: 'bounce-out' },
            { x: 50, rotation: -720, cornerRadius: 50 } // style keyframe
        ],
        duration: 3, // 自动分配剩余的时长给未设置 duration 的关键帧： (3 - 0.5 - 0.2 - 0.1) / 2 
        loop: true,
        join: true //  加入动画前的元素状态作为 from 关键帧
    }
})

app.tree.add(rect)
```

### Dashed Arrow Animation 

ts

```
// #动画样式 [虚线箭头动画]
import { Leafer } from 'leafer-ui'
import { Arrow } from '@leafer-in/arrow' // 导入箭头插件
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const arrow = new Arrow({
    x: 100,
    y: 100,
    stroke: '#32cd79',
    strokeWidth: 5,
    dashPattern: [10, 10], // 绘制虚线
    dashOffset: 0,
    animation: { // 虚线动画
        style: { dashOffset: -20 },
        easing: 'linear',
        duration: 0.5,
        loop: true,
    }
})

leafer.add(arrow)
```
