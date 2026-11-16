<!-- source: https://www.leaferjs.com/ui/en/guide/install/game/start.html -->

# leafer-game 

Based on leafer-ui, this package introduces plugins including Robot, interaction state, animation, motion path, and element search, making it suitable for game scenarios.

## 

### web version     worker version     node version     mini program version 

## 

Runs in a Web environment and is adapted for mobile devices.

## Installation 

npmpnpmyarnbun

sh

```
npm install leafer-game
```

sh

```
pnpm add leafer-game
```

sh

```
yarn add leafer-game
```

sh

```
bun add leafer-game
```

We also provide a Playground environment and a create-leafer CLI tool to help you quickly try the official examples.

#### Or import via script tag 

web.minwebmodule.minmodule

html

```
<script src="https://unpkg.com/leafer-game@2.3.4/dist/web.min.js"></script>
<script>
  const { Leafer, Robot, Animate } = LeaferUI
  // ...
</script>
```

html

```
<script src="https://unpkg.com/leafer-game@2.3.4/dist/web.js"></script>
<script>
  const { Leafer, Robot, Animate } = LeaferUI
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
  } from 'https://unpkg.com/leafer-game@2.3.4/dist/web.module.min.js'
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
  } from 'https://unpkg.com/leafer-game@2.3.4/dist/web.module.js'
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

If you want to run official examples directly, use the Playground environment.

## Get started 

Try the game example below—no need to install plugins separately.

Hold the arrow keys to move the arrow.

ts

```
// #创建 Robot 游戏元素 [leafer-game]
import { Leafer, Robot, KeyEvent } from 'leafer-game'

const leafer = new Leafer({ view: window })

const robot = new Robot({
    robot: { url: '/image/arrows.png', size: { width: 100, height: 100 }, total: 20 },
    actions: {  // 预设游戏动作（通过动作帧）
        up: 0, // 静止向上的箭头（ 编号为0的动作帧）
        right: 5,
        down: 10,
        left: 15,
        arrowUp: [0, 1, 2, 3, 4], // 动态向上的箭头（循环播放编号为 1-4 的动作帧）
        arrowRight: [5, 6, 7, 8, 9],
        arrowDown: [10, 11, 12, 13, 14],
        arrowLeft: [15, 16, 17, 18, 19]
    },
    action: 'right' // 设置动作：静止向右的箭头
})

leafer.add(robot)

// 监听方向键进行交互

let speed = 5

leafer.on(KeyEvent.DOWN, (e: KeyEvent) => {
    speed++
    switch (e.code) { // 动态的方向箭头
        case 'ArrowUp':
            robot.action = 'arrowUp'
            robot.y -= speed
            break
        case 'ArrowDown':
            robot.action = 'arrowDown'
            robot.y += speed
            break
        case 'ArrowLeft':
            robot.action = 'arrowLeft'
            robot.x -= speed
            break
        case 'ArrowRight':
            robot.action = 'arrowRight'
            robot.x += speed
            break
    }
})

leafer.on(KeyEvent.UP, (e: KeyEvent) => {
    speed = 5
    switch (e.code) { // 静态的方向箭头
        case 'ArrowUp':
            robot.action = 'up'
            break
        case 'ArrowDown':
            robot.action = 'down'
            break
        case 'ArrowLeft':
            robot.action = 'left'
            break
        case 'ArrowRight':
            robot.action = 'right'
            break
    }
})
```
