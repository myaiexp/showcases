<!-- source: https://www.leaferjs.com/ui/en/guide/install/editor/start.html -->

# leafer-editor 

Based on leafer-ui, this package introduces plugins including graphics editor, text editor, viewport, view control, scrollbar, arrow, HTML, element search, export elements, and scale-fixed plugin, making it suitable for online graphics editing scenarios.

## 

### web version     worker version     node version     mini program version 

## 

Runs in a Web environment and is adapted for mobile devices.

## Installation 

npmpnpmyarnbun

sh

```
npm install leafer-editor
```

sh

```
pnpm add leafer-editor
```

sh

```
yarn add leafer-editor
```

sh

```
bun add leafer-editor
```

We also provide a Playground environment and a create-leafer CLI tool to help you quickly try the official examples.

#### Or import via script tag 

web.minwebmodule.minmodule

html

```
<script src="https://unpkg.com/leafer-editor@2.2.0/dist/web.min.js"></script>
<script>
  const { Leafer, Editor, Arrow } = LeaferUI
  // ...
</script>
```

html

```
<script src="https://unpkg.com/leafer-editor@2.2.0/dist/web.js"></script>
<script>
  const { Leafer, Editor, Arrow } = LeaferUI
  // ...
</script>
```

html

```
<script type="module">
  import {
    Leafer,
    Editor,
    Arrow,
  } from 'https://unpkg.com/leafer-editor@2.2.0/dist/web.module.min.js'
  // ...
</script>
```

html

```
<script type="module">
  import {
    Leafer,
    Editor,
    Arrow,
  } from 'https://unpkg.com/leafer-editor@2.2.0/dist/web.module.js'
  // ...
</script>
```

## Update 

Learn how to quickly update versions.

## Usage 

The usage, global variables, and leafer-ui are consistent. You only need to change the package name to run the official example code.

## create-leafer CLI tool 

### Directly create a Vue + Leafer project 

### Quickly integrate Leafer into an existing project 

### Install or upgrade plugins in your project 

## Playground environment 

### If you want to run official example code directly, you can use the Playground environment. 

## Get started 

Try the graphics editing example below—no need to install plugins separately.

ts

```
// #图形编辑器 [引入leafer-editor]
import { App, Rect } from 'leafer-editor'

const app = new App({
    view: window,
    editor: {} // 会自动创建 editor实例、tree层、sky层
})

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100))
```
