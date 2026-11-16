<!-- source: https://www.leaferjs.com/ui/en/plugin/in/animate/options/autoplay.html -->

# Autoplay 

## Key Property 

### autoplay: `boolean` 

Whether to autoplay the animation. Default is `true`.

## Belongs to 

### Animate Class 

## Example 

### Disable autoplay, and play on rect click 

animateAnimate

ts

```
// #动画 - 不自动播放，监听点击 rect 再播放 [autoplay（animate）]
import { Leafer, Rect, PointerEvent } from 'leafer-ui'
import '@leafer-in/animate' // 导入动画插件

const leafer = new Leafer({ view: window })

const rect = Rect.one({ fill: '#32cd79' }, 0, 100, 50, 50)

leafer.add(rect)

const animate = rect.animate(
    { x: 500 }, // style keyframe
    {
        duration: 2,
        autoplay: false // 不自动播放
    } // options
)

// 监听点击 rect 开始动画
rect.on(PointerEvent.TAP, () => {
    animate.play()
})
```

ts

```
// #动画 - 不自动播放，监听点击 rect 再播放 [autoplay（Animate）]
import { Leafer, Rect, PointerEvent } from 'leafer-ui'
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

// 监听点击 rect 开始动画
rect.on(PointerEvent.TAP, () => {
    animate.play()
})
```
