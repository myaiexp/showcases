<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/Animate/state.html -->

# State 

## Key Properties (Read-only) 

### started: `boolean` 

Whether the animation has started.

### running: `boolean` 

Whether the animation is currently playing.

### completed: `boolean` 

Whether the animation has completed.

### destroyed: `boolean` 

Whether the animation has been destroyed.

## Belongs to 

### Animate Class 

## Example 

ts

```
// #动画 - 打印动画完成状态
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

// 打印动画完成状态
setTimeout(() => {

    console.log(animate.completed)

}, 2100)
```
