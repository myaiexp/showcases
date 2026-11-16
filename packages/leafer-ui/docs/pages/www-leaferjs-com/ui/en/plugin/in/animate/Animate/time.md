<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/Animate/time.html -->

# Timing 

## Key Properties (Read-only) 

### duration: `number` 

Total duration of the animation (excluding delay and loop time).

### time: `number` 

Elapsed playback time (relative to duration, excluding delay and loop time).

### looped: `number` 

Number of completed loops (count).

## Belongs to 

### Animate Class 

## Example 

ts

```
// #动画 - 打印动画已经播放的时长
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

// 打印动画已经播放的时长
setTimeout(() => {

    console.log(animate.time)

}, 500)
```
