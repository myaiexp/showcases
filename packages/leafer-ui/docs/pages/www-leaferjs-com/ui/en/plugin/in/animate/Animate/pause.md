<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/Animate/pause.html -->

# Pause 

## Key Methods 

### pause ( ) 

Pause the animation.

## Belongs to 

### Animate Class 

## Example 

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
