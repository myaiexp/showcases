<!-- source: https://www.leaferjs.com/ui/en/guide/plugin/editor.html -->

# Graphics Editor 

The graphics editor is an interesting example that uses an App-based architecture. It supports moving, scaling, rotating, and skewing, as well as multi-selection, marquee selection, grouping, locking, and layer control. It also supports configurable styles, custom editing tools, and inner editors.

Note

You must install the graphics editor plugin to use this feature, or install leafer-editor directly (which already includes all related editor plugins).

editorimplementation principle

ts

```
// #App结构 - 图形编辑器 [editor]
import { App, Frame, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    fill: '#333',
    editor: {},  //  配置 editor 会自动创建并添加 app.editor 实例、tree 层、sky 层
})

app.tree.add(Frame.one({ // 页面内容
    children: [
        Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100)
    ]
}, 100, 100, 500, 600))
```

ts

```
// #App结构 - 图形编辑器 [实现原理]
import { App, Leafer, Frame, Rect } from 'leafer-ui'
import { Editor } from '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({ view: window, fill: '#333' }) 

app.add(app.tree = new Leafer({ type: 'design' })) // 添加 tree 层
app.add(app.sky = new Leafer())  // 添加 sky 层

app.tree.add(Frame.one({ // 页面内容
    children: [
        Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100),
        Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100)
    ]
}, 100, 100, 500, 600))

app.sky.add(app.editor = new Editor()) // 添加图形编辑器，用于选中元素进行编辑操作
```

## Congratulations 🎉 

You have completed the overview of common scenario plugins. Next, you will learn several important advanced concepts.

## Next Step 

### Create App 

  

### Using in frontend frameworks 

Vue

React

### Using in server-side rendering 

Nuxt.js

VitePress

Next.js
