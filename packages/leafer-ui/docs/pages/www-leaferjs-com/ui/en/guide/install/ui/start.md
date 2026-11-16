<!-- source: https://www.leaferjs.com/ui/en/guide/install/ui/start.html -->

# leafer-ui 

### web version    worker version    node version    mini-program version 

## 

Runs in Web environments and is mobile-friendly.

It is built on top of the cross-platform core package.

## Installation 

Make sure you have installed Node.js.

When using plugins, it is recommended to also install the cross-platform core package to avoid version mismatch issues.

npmpnpmyarnbun

sh

```
npm install leafer-ui

# When using plugins, it is recommended to also install the cross-platform core package to avoid version mismatch issues
npm install leafer-ui @leafer-ui/core @leafer-ui/draw
```

sh

```
pnpm add leafer-ui

# When using plugins, it is recommended to also install the cross-platform core package to avoid version mismatch issues
pnpm add leafer-ui @leafer-ui/core @leafer-ui/draw
```

sh

```
yarn add leafer-ui

# When using plugins, it is recommended to also install the cross-platform core package to avoid version mismatch issues
yarn add leafer-ui @leafer-ui/core @leafer-ui/draw
```

sh

```
bun add leafer-ui

# When using plugins, it is recommended to also install the cross-platform core package to avoid version mismatch issues
bun add leafer-ui @leafer-ui/core @leafer-ui/draw
```

We also provide a Playground environment and a create-leafer CLI tool to help you quickly try the official examples.

#### Or use via script tag 

You can also use LeaferUI by importing CDN files via script tags (can also be downloaded locally). See example.

Note

Image / PointerEvent / DragEvent conflict with browser global variables, so aliases must be used.

web.minwebmodule.minmodule

html

```
<script src="https://unpkg.com/leafer-ui@2.2.0/dist/web.min.js"></script>
<script>
  const { Leafer } = LeaferUI // global variable containing all leafer-ui features

  // Image, PointerEvent, and DragEvent conflict with browser globals, use aliases instead
  const { MyImage, MyPointerEvent, MyDragEvent } = LeaferUI

  // ...
</script>
```

html

```
<script src="https://unpkg.com/leafer-ui@2.2.0/dist/web.js"></script>
<script>
  const { Leafer } = LeaferUI // global variable containing all leafer-ui features

  // Image, PointerEvent, and DragEvent conflict with browser globals, use aliases instead
  const { MyImage, MyPointerEvent, MyDragEvent } = LeaferUI

  // ...
</script>
```

html

```
<script type="module">
  import { Leafer } from 'https://unpkg.com/leafer-ui@2.2.0/dist/web.module.min.js'
  // ...
</script>
```

html

```
<script type="module">
  import { Leafer } from 'https://unpkg.com/leafer-ui@2.2.0/dist/web.module.js'
  // ...
</script>
```

## Updates 

Learn how to quickly update versions.

## Browser Support 

Requires ES2015 support.

Browsers

Chrome >= 51

Firefox >= 53

Safari >= 10

Edge >= 79

Opera >= 36

IE is not supported

## create-leafer CLI Tool 

### Quickly create a Vue + Leafer project 

### Quickly integrate Leafer into your project 

### Install and upgrade plugins in your project 

## Playground Environment 

### If you want to run official examples directly, use the Playground environment. 

## Getting Started 

Create an interactive engine that fits the window size and allows dragging rectangles directly.

index.ts

ts

```
import { Leafer, Rect } from 'leafer-ui'

const leafer = new Leafer({ view: window })

const rect = new Rect({
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    fill: '#32cd79',
    cornerRadius: [50, 80, 0, 80],
    draggable: true
})

leafer.add(rect)
```

### Import via script tag 

index.html

html

```
<!doctype html>
<html>
  <head>
    <title>Demo | Leafer UI</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <script src="https://unpkg.com/leafer-ui@2.1.8/dist/web.min.js"></script>
  </head>
  <body></body>
  <script>
    var leafer = new LeaferUI.Leafer({ view: window })

    var rect = new LeaferUI.Rect({
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      fill: '#32cd79',
      cornerRadius: [50, 80, 0, 80],
      draggable: true,
    })

    leafer.add(rect)
  </script>
</html>
```

## Next Step 

### Performance Testing 
