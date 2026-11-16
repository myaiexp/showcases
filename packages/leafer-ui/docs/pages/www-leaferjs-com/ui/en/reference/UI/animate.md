<!-- source: https://www.leaferjs.com/ui/en/reference/UI/animate.html -->

# Animate 

Animation methods support delay, looping, and seek, and can be used to create transition animations, swing animations, keyframe animations, and path animations.

In addition, element methods such as move() and set() support animation transition parameters. Text also supports count animations and typewriter animations.

Note

You need to install the animation plugin to use this feature, or directly install leafer-game (which already includes the animation plugin).

## Key Methods 

### animate ( keyframe?: `IUIInputData` | `IKeyframe`[] | `IAnimation`, options?: `ITranstion` ) : `Animate` 

Executes an animation method and returns an animation instance.

Keyframe object.

ts

```
// Keyframe object
type IKeyframe = IUIInputData | IAnimateKeyframe

interface IAnimateKeyframe {
  style: IUIInputData // element style

  easing?: IAnimateEasing // easing function for this keyframe
  delay?: number // delay time for this keyframe
  duration?: number // fixed duration for this keyframe (overrides autoDuration)

  swing?: number // number of swing cycles (times reaching "to"), from -> to -> from -> to ..., default 0
  loop?: number // loop count, default 0

  // Distribute remaining time:
  // (total duration - sum of fixed durations) / total weight * current weight
  autoDelay?: number // weight for auto delay, default 0
  autoDuration?: number // weight for auto duration, default 1
}
```

Transition options.

ts

```
// Transition options: object = animation config, number = duration, string = easing
type ITransition = IAnimateOptions | IAnimateEasingName | number
```

Learn more about animation option properties.

ts

```
// Animation options
interface IAnimateOptions {
  easing?: IAnimateEasing // easing function, default: ease

  delay?: number // delay time in seconds, default: 0
  duration?: number // duration in seconds, default: 0.2
  ending?: IAnimateEnding // final state: from, to, or auto (default)

  reverse?: boolean // reverse animation (to -> from), default: false
  swing?: boolean | number // swing loop (number of "to" hits), default: false

  loop?: boolean | number // loop playback, default: false
  loopDelay?: number // delay between loops, default: 0

  speed?: number // playback speed multiplier, default: 1

  join?: boolean // include current state as "from" keyframe
  autoplay?: boolean // auto start

  attrs?: string[] // properties to animate (default: all)
  event?: IAnimateEvents // animation events
}
```

### animate(): `Animate` 

Get the currently running animation instance.

### killAnimate() 

Stop the current animation.

## Belongs to 

### UI Elements 

## Example 

### Swing Loop Animation 

LeaferApp

ts

```
// #动画方法 [摇摆动画 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = new Rect({ y: 100, cornerRadius: 50, fill: '#32cd79' })

leafer.add(rect)

rect.animate(  
    { x: 500, cornerRadius: 0 }, // style keyframe
    {
        duration: 1,
        swing: true // 摇摆循环播放
    } // options
)
```

ts

```
// #动画方法 [摇摆动画 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/animate' // 导入动画插件

const app = new App({ view: window, editor: {} })

const rect = new Rect({ y: 100, cornerRadius: 50, fill: '#32cd79' })

app.tree.add(rect)

rect.animate(  
    { x: 500, cornerRadius: 0 }, // style keyframe
    {
        duration: 1,
        swing: true // 摇摆循环播放
    } // options
)
```

### Color Transition Animation 

LeaferApp

ts

```
// #动画方法 [颜色过渡 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = new Rect({ y: 100, cornerRadius: 50, fill: '#32cd79' })

leafer.add(rect)

rect.animate(  
    { x: 500, cornerRadius: 0, fill: '#ffcd00' }, // style keyframe
    {
        duration: 1,
        swing: true // 摇摆循环播放
    } // options
)
```

ts

```
// #动画方法 [颜色过渡 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/animate' // 导入动画插件

const app = new App({ view: window, editor: {} })

const rect = new Rect({ y: 100, cornerRadius: 50, fill: '#32cd79' })

app.tree.add(rect)

rect.animate(  
    { x: 500, cornerRadius: 0, fill: '#ffcd00' }, // style keyframe
    {
        duration: 1,
        swing: true // 摇摆循环播放
    } // options
)
```

### Keyframe Animation 

LeaferApp

ts

```
// #动画方法 [关键帧动画 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 50, y: 100, cornerRadius: 50, fill: '#32cd79', around: 'center' })

leafer.add(rect)

rect.animate(  
    [
        { style: { x: 150, scaleX: 2, fill: '#ffcd00' }, duration: 0.5 },  // animate keyframe
        { style: { x: 50, scaleX: 1, fill: '#ffcd00' }, duration: 0.2 },
        { style: { x: 550, cornerRadius: 0, fill: '#ffcd00' }, delay: 0.1, easing: 'bounce-out' },
        { x: 50, rotation: -720, cornerRadius: 50 } // style keyframe
    ],
    {
        duration: 3, // 自动分配剩余的时长给未设置 duration 的关键帧： (3 - 0.5 - 0.2 - 0.1) / 2 
        loop: true,
        join: true //  加入动画前的元素状态作为 from 关键帧
    } // options
)
```

ts

```
// #动画方法 [关键帧动画 (App)]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

import '@leafer-in/animate' // 导入动画插件

const app = new App({ view: window, editor: {} })

const rect = new Rect({ x: 50, y: 100, cornerRadius: 50, fill: '#32cd79', around: 'center' })

app.tree.add(rect)

rect.animate(  
    [
        { style: { x: 150, scaleX: 2, fill: '#ffcd00' }, duration: 0.5 },  // animate keyframe
        { style: { x: 50, scaleX: 1, fill: '#ffcd00' }, duration: 0.2 },
        { style: { x: 550, cornerRadius: 0, fill: '#ffcd00' }, delay: 0.1, easing: 'bounce-out' },
        { x: 50, rotation: -720, cornerRadius: 50 } // style keyframe
    ],
    {
        duration: 3, // 自动分配剩余的时长给未设置 duration 的关键帧： (3 - 0.5 - 0.2 - 0.1) / 2 
        loop: true,
        join: true //  加入动画前的元素状态作为 from 关键帧
    } // options
)
```
