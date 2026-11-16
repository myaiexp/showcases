<!-- source: https://www.leaferjs.com/ui/en/guide/life/render.html -->

# Render Lifecycle 

From element creation to completed rendering, a series of steps occur including data changes, render requests, layout, and rendering—forming a complete rendering lifecycle.

  
  

## Example 

Different states in the lifecycle are notified through events such as ChildEvent, PropertyEvent, WatchEvent, LayoutEvent, and RenderEvent. You can also listen to these events via the Leafer engine to implement your own product logic.

### Listen to render events 

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

## Congratulations 🎉 

You have completed the quick start guide and can now begin exploring product development with LeaferJS.

  
 You may continue reading:

🍉 Learn how to use applications, engines, elements, properties & methods, events, and the core library.

🍊 Discover official and community plugins that can greatly improve productivity.

### Using in frontend frameworks 

Vue

React

### Using in server-side rendering 

Nuxt.js

VitePress

Next.js
