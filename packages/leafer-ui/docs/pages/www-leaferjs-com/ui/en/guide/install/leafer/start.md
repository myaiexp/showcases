<!-- source: https://www.leaferjs.com/ui/en/guide/install/leafer/start.html -->

# leafer 

Full bundle (98KB min+gzip), includes leafer-ui and all `@leafer-in/*` plugin packages, making management and upgrades easier.

You can reduce bundle size by using importing sub-packages, while still keeping official examples directly usable. Please also check the notes!

## 

### web version    worker version    node version    mini-program version 

## 

Runs in Web environments and supports mobile devices.

## Installation 

npmpnpmyarnbun

sh

```
npm install leafer
```

sh

```
pnpm add leafer
```

sh

```
yarn add leafer
```

sh

```
bun add leafer
```

We also provide a Playground environment and a create-leafer CLI tool to help you quickly try the official examples.

#### Or use via script tag 

web.minwebmodule.minmodule

html

```
<script src="https://unpkg.com/leafer@2.3.4/dist/web.min.js"></script>
<script>
  const { Leafer, Editor, Robot, Animate } = LeaferUI
  // ...
</script>
```

html

```
<script src="https://unpkg.com/leafer@2.3.4/dist/web.js"></script>
<script>
  const { Leafer, Editor, Robot, Animate } = LeaferUI
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
  } from 'https://unpkg.com/leafer@2.3.4/dist/web.module.min.js'
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
  } from 'https://unpkg.com/leafer@2.3.4/dist/web.module.js'
  // ...
</script>
```

## Updates 

Learn how to quickly update versions.

## Usage 

The usage, global API, and behavior are consistent with leafer-ui. You only need to change the package name (no need to import plugins), and all official examples will work directly.

## Import sub-packages 

You can import sub-packages to include only leafer-ui and required plugins, avoiding unnecessary bundle size.

1. When using `npm` or `yarn`, you can directly import sub-packages like leafer-ui and `@leafer-in/*`.
2. When using `bun`, sub-package importing is not supported yet.
3. When using `pnpm`, you must manually hoist sub-packages to make them importable.

Add one of the following configurations to `.npmrc` or `pnpm-workspace.yaml`:

.npmrcpnpm-workspace.yaml

sh

```
public-hoist-pattern[]=leafer-ui
public-hoist-pattern[]=@leafer-in/*
```

yaml

```
hoist-pattern:
  - leafer-ui
  - @leafer-in/*
```

When using import sub-packages, you must NOT import the `leafer` package, otherwise bundle size reduction will not work.

## Playground environment 

### If you want to run official examples directly, use the Playground environment. 

## Getting started 

leaferimport sub-packages

ts

```
// #图形编辑器 [简洁创建]
import { App, Rect } from 'leafer' // 自动导入 leafer-ui 和所有插件

const app = new App({
    view: window,
    editor: {}  //  配置 editor 会自动创建并添加 app.editor 实例、tree 层、sky 层
})

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100))
```

ts

```
// #图形编辑器 [简洁创建]
import { App, Rect } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}  //  配置 editor 会自动创建并添加 app.editor 实例、tree 层、sky 层
})

app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100))
```
