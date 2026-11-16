<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/Animate/seek.html -->

# Seek 

## Key Methods 

### seek ( time: `number` | `IPercentData`, includeDelay?: `boolean` ) 

Jump to a specified time position. Supports setting an exact time (in seconds) or a percentage (relative to the total duration).

Setting the `includeDelay` parameter means the main `delay` time is included in the total duration when seeking.

## Belongs to 

### Animate Class 

## Examples 

### Seek using seconds 

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

### Seek using percentage 

ts

```
// #动画 - 通过 seek() 方法定位跳转动画 [百分比]
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

    animate.seek({ type: 'percent', value: 0.25 }) // = 2 * 0.25

}, 1000)
```
