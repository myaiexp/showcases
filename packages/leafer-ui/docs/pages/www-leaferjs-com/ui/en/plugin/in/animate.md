<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/ -->

# Animate Class 

Animation class with rich animation capabilities. Supports delay, looping, and seek. Can be used to create transition animations, swing animations, keyframe animations, path animations, and scrolling animations.

Supports creating animations via animation, transition, animate() method, and Animate instance.

In addition, methods like move() and set() support adding animation transition parameters. Text also supports count animation and typewriter animation.

Inheritance

Animate  >  Eventer

## Install Plugin 

You need to install the animate plugin and the color plugin to use it. Click here to visit the Github repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/animate
npm install @leafer-in/color
```

sh

```
pnpm add @leafer-in/animate
pnpm add @leafer-in/color
```

sh

```
yarn add @leafer-in/animate
yarn add @leafer-in/color
```

sh

```
bun add @leafer-in/animate
bun add @leafer-in/color
```

Or include via script tag and access plugin features using the global variable LeaferIN.animate.

animate.minanimate

html

```
<script src="https://unpkg.com/@leafer-in/animate@2.3.4/dist/animate.min.js"></script>
<script src="https://unpkg.com/@leafer-in/color@2.3.4/dist/color.min.js"></script>
<script>
  const { Animate } = LeaferIN.animate
</script>
```

html

```
<script src="https://unpkg.com/@leafer-in/animate@2.3.4/dist/animate.js"></script>
<script src="https://unpkg.com/@leafer-in/color@2.3.4/dist/color.js"></script>
<script>
  const { Animate } = LeaferIN.animate
</script>
```

## Key Properties (Read-only) 

### target: `UI` ｜ `Object` 

The target element of the animation. Supports plain objects.

## Animation Option Properties 

Can be passed as initialization options when creating an animation. When accessed as properties of an Animate instance, they are read-only.

| Name | Description |
| --- | --- |
| easing | Easing: the easing function of the animation, default is ease |
| delay | Delay: the delay duration before the animation starts |
| duration | Duration: total duration of the animation (excluding delay and loop time) |
| speed | Speed: playback speed multiplier. A 10s animation with speed 5 plays in 2s |
| reverse | Reverse: whether to reverse animation from to -> from |
| loop | Loop: whether to loop playback, can set count |
| loopDelay | Loop delay: delay time before the next loop starts |
| swing | Swing loop: whether to swing playback, can set the number of times reaching to |
| ending | Ending style: style at animation end, from means start style, to means end style |
| join | Join keyframe: whether to include the element’s pre-animation state as from |
| jump | Jump first frame: whether to jump to the first frame before delay |
| autoplay | Autoplay: whether to autoplay, default is true |
| attrs | Transition attributes: list of element attributes participating in animation, default is all |
| event | Event: animation event listener object |

## More Properties 

| Name | Description |
| --- | --- |
| Timing |  |
| duration | Total duration of the animation (excluding delay and loop time) |
| time | Elapsed time (relative to duration, excluding delay and loop time) |
| looped | Number of completed loops (count) |
| State |  |
| started | Whether the animation has started |
| running | Whether the animation is currently playing |
| completed | Whether the animation is completed |
| destroyed | Whether the animation is destroyed |
| Style |  |
| style | Current animation style |
| fromStyle | Style of the from frame |
| toStyle | Style of the to frame |
| endingStyle | Style at the end state |
| frames | Computed keyframe list used internally |
| keyframes | Original keyframe list |

## Key Methods 

| Name | Description |
| --- | --- |
| play() | Play animation |
| pause() | Pause animation |
| stop() | Stop animation: force complete and pause |
| seek() | Seek animation: jump to a specific time (seconds) or percentage |
| kill() | Kill animation: force complete and destroy |
| destroy() | Destroy animation: immediately destroy without completing, stays at current state |

## Events 

Animation events, listened via on().

| Name | Description |
| --- | --- |
| AnimateEvent | Animation event |

## Examples 

### Swing Loop Animation 

ts

```
// #创建动画实例  [摇摆动画]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = new Rect({ y: 100, cornerRadius: 50, fill: '#32cd79' })

leafer.add(rect)

new Animate(  
    rect,
    { x: 500, cornerRadius: 0 }, // style keyframe
    {
        duration: 1,
        swing: true // 摇摆循环播放
    } // options
)
```

### Color Transition Animation 

ts

```
// #创建动画实例 [颜色过渡]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = new Rect({ y: 100, cornerRadius: 50, fill: '#32cd79' })

leafer.add(rect)

new Animate(  
    rect,
    { x: 500, cornerRadius: 0, fill: '#ffcd00' }, // style keyframe
    {
        duration: 1,
        swing: true // 摇摆循环播放
    } // options
)
```

### Keyframe Animation 

ts

```
// #创建动画实例 [关键帧动画]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 50, y: 100, cornerRadius: 50, fill: '#32cd79', around: 'center' })

leafer.add(rect)

new Animate(  
    rect,
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

### Pause Animation 

ts

```
// #动画 - 通过 pause() 方法暂停动画
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

const animate = new Animate(
    rect,
    { x: 500 }, // style keyframe
    {
        duration: 2
    } // options
)

// 通过 pause() 方法暂停动画
setTimeout(() => {

    animate.pause()

}, 500)
```

### Seek Animation 

ts

```
// #动画 - 通过 seek() 方法定位跳转动画 [数值（秒数）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

const animate = new Animate(
    rect,
    { x: 500 }, // style keyframe
    {
        duration: 2,
        autoplay: false // 不自动播放
    } // options
)

// 通过 seek() 方法定位跳转动画
setTimeout(() => {

    animate.seek(0.5)

}, 1000)
```

### Listen to Animation Events via on() 

Supports listening and removing events like elements, and also supports passing event listener object during initialization.

animateAnimate

ts

```
// #动画 - 通过 on() 监听动画事件 [event（animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate, AnimateEvent } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

const animate = rect.animate(
    { x: 500 }, // style keyframe
    { duration: 2 } // options
)

// 监听动画事件
animate.on(AnimateEvent.PLAY, () => { // 动画创建
    console.log('play')
})

animate.on(AnimateEvent.UPDATE, (animate: Animate) => { // 更新中...
    console.log(animate.style.x)
})

animate.on(AnimateEvent.COMPLETED, () => { // 动画已完成
    console.log('completed')
})
```

ts

```
// #动画 - 通过 on() 监听动画事件 [event（Animate）]
import { Leafer, Rect } from 'leafer-ui'
import { Animate, AnimateEvent } from '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

const animate = new Animate(
    rect,
    { x: 500 }, // style keyframe
    { duration: 2 } // options
)

// 监听动画事件
animate.on(AnimateEvent.PLAY, () => { // 动画创建
    console.log('play')
})

animate.on(AnimateEvent.UPDATE, (animate: Animate) => { // 更新中...
    console.log(animate.style.x)
})

animate.on(AnimateEvent.COMPLETED, () => { // 动画已完成
    console.log('completed')
})
```
