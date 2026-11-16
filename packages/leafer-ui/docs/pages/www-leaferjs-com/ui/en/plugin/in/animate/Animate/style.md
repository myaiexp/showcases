<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/Animate/style.html -->

# Style 

## Key Properties (Read-only) 

### style: `IUIInputData` 

Current animation state style.

### fromStyle: `IUIInputData` 

Style of the from frame.

### toStyle: `IUIInputData` 

Style of the to frame.

### endingStyle: `IUIInputData` 

Ending state style.

### frames: `IComputedKeyframe` [] 

Computed keyframe list used internally by the animation.

### keyframes: `IKeyframe`[] 

Original animation keyframes list.

ts

```
type IKeyframe = IUIInputData | IAnimateKeyframe

interface IAnimateKeyframe {
  style: IUIInputData // element style

  easing?: IAnimateEasing // easing function for this keyframe
  delay?: number // delay time for this keyframe
  duration?: number // fixed duration for this keyframe, overrides autoDuration

  swing?: number // swing count (times reaching to), from -> to, to -> from -> to ..., default 0
  loop?: number // loop count, default 0

  // remaining time allocation:
  // (total duration - sum of fixed durations) / total weight * current weight
  autoDelay?: number // weight for auto delay, default 0
  autoDuration?: number // weight for auto duration, default 1
}
```

## Belongs to 

### Animate Class 

## Example 

ts

```
// #动画 - 打印动画当前状态样式
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

// 打印动画当前状态样式
setTimeout(() => {

    console.log(animate.style)

}, 500)
```
