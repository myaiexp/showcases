<!-- source: https://www.leaferjs.com/ui/en/reference/event/basic/Resize.html -->

# RenderEvent 

Render event.

To understand the event trigger order, please refer to the render lifecycle diagram.

Inheritance

RenderEvent  >  Event

## Key Properties 

### renderBounds: `IBounds` 

Render region.

### renderOptions: `IRenderOptions` 

Render options.

### times: `number` 

Render count (the index of this render within the current render cycle).

## Event Names 

### RenderEvent.REQUEST 

Request render.

`render.request`

### RenderEvent.START 

Start a new render cycle.

`render.start`

### RenderEvent.BEFORE 

Before a single render pass.

`render.before`

### RenderEvent.RENDER 

Single render pass (may occur multiple times).

`render`

### RenderEvent.AFTER 

After a single render pass.

`render.after`

### RenderEvent.AGAIN 

Prepare for another render pass.

`render.again`

### RenderEvent.END 

End of the render cycle.

`render.end`

## Request Render / Animation Frame 

A cross-platform method similar to `window.requestAnimationFrame`, typically running at 60 FPS.

ts

```
// #请求渲染/动画帧
import { Platform } from 'leafer-ui'

// 1. 请求一次渲染帧，等同于 window.requestAnimateFrame
Platform.requestRender(() => {
    console.log('动画帧')
})

// 2. 循环请求渲染帧，实现连续动画
function animate() {

    // 执行动画逻辑...

    // 调用Platform.requestRender方法，实现循环
    Platform.requestRender(animate)
}

// 启动动画循环
animate()
```

## Inherited Events 

### RenderEvent  >  Event 

## Example 

ts

```
// #监听渲染事件
import { Leafer, Rect, RenderEvent } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

leafer.on(RenderEvent.BEFORE, function () {
    // render before (Layout has ended)
})
```
