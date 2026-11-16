<!-- source: https://www.leaferjs.com/ui/en/plugin/in/text-editor/ -->

# TextEditor 

Text editor. Double-click a Text element to enter edit mode.

Inheritance

TextEditor  >  InnerEditor

## Supported Platforms 

Currently only supported on web (PC).

## Install Plugin 

You need to install the text-editor plugin and the graphic editor plugin to use it. Visit Github repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/text-editor
```

sh

```
pnpm add @leafer-in/text-editor
```

sh

```
yarn add @leafer-in/text-editor
```

sh

```
bun add @leafer-in/text-editor
```

Or include via script tag and access plugin features through the global variable `LeaferIN.textEditor`.

text-editor.mintext-editor

html

```
<script src="https://unpkg.com/@leafer-in/text-editor@2.3.4/dist/text-editor.min.js"></script>
<script>
  const { TextEditor } = LeaferIN.textEditor
</script>
```

html

```
<script src="https://unpkg.com/@leafer-in/text-editor@2.3.4/dist/text-editor.js"></script>
<script>
  const { TextEditor } = LeaferIN.textEditor
</script>
```

## Key Properties 

### config: `ITextEditorConfig` 

Text editor configuration.

After opening the text editor, you can access the instance via `app.editor.innerEditor`.

ts

```
interface ITextEditorConfig {
  selectAll: boolean // whether to auto-select all text, default is true
}

// configure text editor
app.editor.getInnerEditor('TextEditor').config.selectAll = false
```

### editDom: `HTMLDivElement` 

Editable DOM element overlaid on the canvas (used as a temporary replacement for text).

Default CSS class name: `'leafer-text-editor'`.

## Inheritance 

### TextEditor  >  InnerEditor 

## Examples 

### Normal text 

### Italic bold 

### Convert to lowercase 

### Multi-line text 

ts

```
// #文本编辑器
import { App, Text } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件  
import '@leafer-in/viewport' // 导入视口插件（可选）
import '@leafer-in/text-editor' // 导入文本编辑插件

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Text.one({
    text: 'Action is the proper fruit of knowledge.',
    editable: true, fill: '#FFE04B', fontSize: 16,
}, 100, 100, 100))
```

### Change font 

### Letter spacing 

### Line height 

## Center alignment 

### Clipped text 

### Convert to uppercase 
