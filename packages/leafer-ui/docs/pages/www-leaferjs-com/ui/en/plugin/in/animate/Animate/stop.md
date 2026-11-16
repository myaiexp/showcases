<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/Animate/stop.html -->

# Stop 

## Key Methods 

### stop ( ) 

Stop the animation.

## Belongs to 

### Animate Class 

## Example 

ts

```
// #动画 - 通过 stop() 方法停止并完成动画
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

// 通过 stop() 方法停止并完成动画
setTimeout(() => {

    animate.stop()

}, 500)
```
