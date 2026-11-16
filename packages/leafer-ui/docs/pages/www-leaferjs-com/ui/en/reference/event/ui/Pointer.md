<!-- source: https://www.leaferjs.com/ui/en/reference/event/ui/Pointer.html -->

# PointerEvent 

Pointer events for mouse, pen, and touch input, supporting context menu events.

When native PointerEvent is not available, fallback priority for native events is:

PointerEvent > TouchEvent > MouseEvent

Inheritance

PointerEvent  >  UIEvent  >  Event

  

When imported via a `<script>` tag, use the alias **MyPointerEvent** instead.

## New Features 

### Only one of multiple tap events is triggered 

When listening to `tap`, `double_tap`, and `long_press` / `long_tap` simultaneously, only the most appropriate one is triggered by default. This behavior can be configured to trigger multiple events.

### Paired event triggering 

After an element triggers `pointer.down`, it is guaranteed to trigger `pointer.up`, avoiding mismatched pairs caused by dragging or event cancellation.

### New properties 

left, middle, right, spaceKey.

### Context menu 

PointerEvent.MENU

## Event Names 

### Basic Events 

### PointerEvent.DOWN 

Pointer down event.

`pointer.down`

### PointerEvent.MOVE 

Pointer move event.

`pointer.move`

### PointerEvent.UP 

Pointer up event.

`pointer.up`

### PointerEvent.OVER 

Over event.

`pointer.over`

### PointerEvent.OUT 

Out event.

`pointer.out`

### PointerEvent.ENTER 

Enter event.

`pointer.enter`

### PointerEvent.LEAVE 

Leave event.

`pointer.leave`

### Composite Events 

### PointerEvent.TAP 

Tap event.

`tap`

### PointerEvent.DOUBLE\_TAP 

Double tap event.

`double_tap`

### PointerEvent.LONG\_PRESS 

Long press event (triggered during press).

`long_press`

### PointerEvent.LONG\_TAP 

Long tap event (triggered immediately after release following a long press).

`long_tap`

### PointerEvent.CLICK 

Click event. Recommended to use `tap` instead.

`click`

### PointerEvent.DOUBLE\_CLICK 

Double click event. Recommended to use `double_tap` instead.

`double_click`

## Context Menu 

### PointerEvent.MENU 

Context menu event, equivalent to HTML `contextmenu`, triggered on press.

`pointer.menu`

### PointerEvent.MENU\_TAP 

Context menu tap event, triggered on release.

`pointer.menu_tap`

## Key Properties 

### x: `number` 

X position in the world coordinate system.

### y: `number` 

Y position in the world coordinate system.

### width: `number` 

Width of the contact area.

### height: `number` 

Height of the contact area.

### pointerType: `string` 

Type of input device:

* "mouse"
* "pen"
* "touch"

### multiTouch: `boolean` 

Whether the event is from multi-touch input. Requires enabling app.config.pointer.touch (except in mini program environments).

### pressure: `number` 

Pressure value, range: 0–1.

### tangentialPressure?: `number` 

Tangential pressure for pen input, range: -1 to 1.

Only available when `pointerType` is 'pen'.

### tiltX?: `number` 

Angle between the plane formed by the pen and the y-axis and the y-z plane. Range: -90 to 90.

### tiltY?: `number` 

Angle between the plane formed by the pen and the x-axis and the x-z plane. Range: -90 to 90.

### twist?: `number` 

Clockwise rotation angle of the pen around its main axis. Range: 0–359 degrees.

### isCancel: `boolean` 

Whether this is a canceled `PointerEvent.UP` event (triggered by native `pointer.cancel` or other cancellation).

## Auxiliary Properties 

### dragging: `boolean` 

Whether currently in dragging state (only for PointerEvent.MOVE).

### moving: `boolean` 

Whether currently moving the viewport (only for PointerEvent.MOVE).

## Coordinate Conversion Methods 

Conversion methods for `x`, `y`.

### getPagePoint ( ): `IPointData` 

Get position in page coordinate system.

### getBoxPoint ( relative?: `UI`): `IPointData` 

Get position relative to the box coordinate system of a given element. Defaults to the current listener if `relative` is not provided.

### getInnerPoint ( relative?: `UI`): `IPointData` 

Get position relative to the inner coordinate system of a given element. Defaults to the current listener if `relative` is not provided.

### getLocalPoint ( relative?: `UI`): `IPointData` 

Get position relative to the local coordinate system of a given element. Defaults to the current listener if `relative` is not provided.

## Inherited Events 

### PointerEvent  >  UIEvent  >  Event 

## Example 

### Only one of multiple tap events is triggered 

When listening to `tap`, `double_tap`, and `long_tap`, only one will be triggered by default.

ts

```
// #监听点击事件 [多种点击事件同时只触发一个]
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({
    view: window
})

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

rect.on(PointerEvent.TAP, () => {
    console.log('tap')
})

rect.on(PointerEvent.DOUBLE_TAP, () => {
    console.log('double_tap')
})

rect.on(PointerEvent.LONG_TAP, () => {
    console.log('long_tap')
})

rect.on(PointerEvent.LONG_PRESS, () => {
    console.log('long_press')
})
```

### Dispatch multiple tap events simultaneously 

Set `pointer.tapMore` to true, and `tap`, `double_tap`, and `long_tap` will all be triggered.

ts

```
// #监听点击事件 [同时派发多种点击事件]
import { Leafer, Rect, PointerEvent } from 'leafer-ui'

const leafer = new Leafer({
    view: window,
    pointer: {
        tapMore: false // 配置同时派发多种点击事件
    }
})

const rect = new Rect({ x: 100, y: 100, fill: '#32cd79', draggable: true })

leafer.add(rect)

rect.on(PointerEvent.TAP, () => {
    console.log('tap')
})

rect.on(PointerEvent.DOUBLE_TAP, () => {
    console.log('double_tap')
})

rect.on(PointerEvent.LONG_TAP, () => {
    console.log('long_tap')
})

rect.on(PointerEvent.LONG_PRESS, () => {
    console.log('long_press')
})
```

### Show context menu in graphic editor 

editor-menu.tseditor-menu.js

ts

```
// #图形编辑器 [右键菜单]
import { App, Rect, PointerEvent } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Rect.one({ name: 'rect1', editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({ name: 'rect2', editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100))

app.on(PointerEvent.MENU, (e: PointerEvent) => {

    if (app.editor.single) {

        // 单选元素 - 右键菜单
        const { element } = app.editor
        showMenu(element.name, e.origin.x, e.origin.y)

    } else if (app.editor.multiple) {

        // 多选元素 - 右键菜单
        showMenu('多个元素', e.origin.x, e.origin.y)

    } else {

        showMenu('没有选中', e.origin.x, e.origin.y)

    }
})

// 模拟显示菜单
function showMenu(name: string, x: number, y: number) {
    const div = document.createElement('div')
    div.setAttribute('style', `position:absolute; left:${x}px; top:${y}px; width:100px; height:150px; background-color:#e3e3e3; border-radius:10px; font-size: 14px;`)
    div.innerHTML = `<div style="padding:5px 10px;border-bottom: 1px solid #999">显示菜单</div><div style="padding:5px 10px;border-bottom: 1px solid #999">${name}</div>`
    document.body.appendChild(div)
    window.addEventListener('pointerdown', () => div.remove())
}
```

js

```
// #图形编辑器 [右键菜单]
import { App, Rect, PointerEvent } from 'leafer-ui'
import '@leafer-in/editor' // 导入图形编辑器插件
import '@leafer-in/viewport' // 导入视口插件 (可选)

const app = new App({
    view: window,
    editor: {}
})

app.tree.add(Rect.one({ name: 'rect1', editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 100, 100))
app.tree.add(Rect.one({ name: 'rect2', editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 300, 100))

app.on(PointerEvent.MENU, (e) => {

    if (app.editor.single) {

        // 单选元素 - 右键菜单
        const { element } = app.editor
        showMenu(element.name, e.origin.x, e.origin.y)

    } else if (app.editor.multiple) {

        // 多选元素 - 右键菜单
        showMenu('多个元素', e.origin.x, e.origin.y)

    } else {

        showMenu('没有选中', e.origin.x, e.origin.y)

    }
})

// 模拟显示菜单
function showMenu(name, x, y) {
    const div = document.createElement('div')
    div.setAttribute('style', `position:absolute; left:${x}px; top:${y}px; width:100px; height:150px; background-color:#e3e3e3; border-radius:10px; font-size: 14px;`)
    div.innerHTML = `<div style="padding:5px 10px;border-bottom: 1px solid #999">显示菜单</div><div style="padding:5px 10px;border-bottom: 1px solid #999">${name}</div>`
    document.body.appendChild(div)
    window.addEventListener('pointerdown', () => div.remove())
}
```
