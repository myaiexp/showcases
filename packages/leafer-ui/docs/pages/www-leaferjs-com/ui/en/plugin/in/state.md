<!-- source: https://www.leaferjs.com/ui/en/plugin/in/state/ -->

# Interaction States 

Enable elements to support interactive state styles such as hover, press, focus, selected, and disabled.

## Install Plugin 

You need to install the state plugin to use it. Visit Github repository.

npmpnpmyarnbun

sh

```
npm install @leafer-in/state
```

sh

```
pnpm add @leafer-in/state
```

sh

```
yarn add @leafer-in/state
```

sh

```
bun add @leafer-in/state
```

Or include via script tag and access plugin features through the global variable `LeaferIN.state`.

state.minstate

html

```
<script src="https://unpkg.com/@leafer-in/state@2.3.4/dist/state.min.js"></script>
```

html

```
<script src="https://unpkg.com/@leafer-in/state@2.3.4/dist/state.js"></script>
```

## Demo 

Button interaction effect

ts

```
// #交互状态 [按钮效果 (Leafer)]
import { Leafer, Rect } from 'leafer-ui'
import '@leafer-in/state' // 导入交互状态插件

const leafer = new Leafer({ view: window })

const rect = new Rect({
    width: 100,
    height: 100,
    fill: 'rgba(50,205,121, 0.7)',
    cornerRadius: 30,
    hoverStyle: { fill: 'rgba(50,205,121, 0.8)' },
    pressStyle: { fill: 'rgba(50,205,121, 1)' },
    cursor: 'pointer'
})

leafer.add(rect)
```

## Next Steps 

### Hover State Style 

### Press State Style 

### Focus State Style 

### Selected State Style 

### Disabled State Style 
