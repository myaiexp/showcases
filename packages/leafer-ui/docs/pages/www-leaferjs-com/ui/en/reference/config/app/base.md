<!-- source: https://www.leaferjs.com/ui/en/reference/config/app/base.html -->

# Application & Engine Configuration 

### Basic     Viewport Type     Canvas     Pointer     Multi-touch     Touch     Wheel     Pan View     Zoom View 

## 

Basic configuration for initializing App and Leafer.

## Key Properties 

### start: `boolean` 

Whether to automatically start the engine. Default is `true`.

After starting, you can manually control rendering using app.stop() and app.start().

## Render & Layout Properties 

When the engine is running, changes to leafer.config take effect immediately.

### maxFPS: `number` 

Sets the maximum rendering frame rate. By default, it matches the display refresh rate (usually 60 FPS, up to 120 FPS).

Lowering FPS can reduce performance cost. It is recommended to use values divisible by 60, such as 30, 20, or 15.

Note

In the App structure, this must be set on the config of child Leafer layers such as `ground`, `tree`, and `sky`.

### usePartRender: `boolean` 

Whether to enable partial rendering. Default is `true`.

Note

In the App structure, this must be set on the config of child Leafer layers such as `ground`, `tree`, and `sky`.

### useCellRender: `boolean` 

Whether to enable cell-based rendering. Default is `false`.

This can optimize scenarios with a large amount of repeated overlapping content. It is currently a reserved feature and requires future plugin support.

Note

In the App structure, this must be set on the config of child Leafer layers such as `ground`, `tree`, and `sky`.

### usePartLayout: `boolean` 

Whether to enable partial layout. Default is `true`.

Note

In the App structure, this must be set on the config of child Leafer layers such as `ground`, `tree`, and `sky`.

### trackChanges: `boolean` 

Whether to track element changes. The default is `true`.

When set to `false`, the element will no longer generate or dispatch `PropertyEvent` or `ChildEvent` events. This can significantly reduce performance overhead and is well suited for scenarios such as games and industrial applications where change history is not required.

Note

In the App structure, this must be set on the config of child Leafer layers such as `ground`, `tree`, and `sky`.

## Interaction Properties 

When the engine is running, changes to app.config take effect immediately.

Note

In the App structure, these can only be set on the config of the App instance.

### mobile: `boolean` 

Whether to optimize for mobile devices (e.g. disabling hover events). The editor can configure gesture control elements.

### cursor: `boolean` 

Whether to enable cursor support. Default is `true`.

### keyEvent: `boolean` 

Whether to enable keyboard events. Default is `true`.

## Pixel Alignment 

### pointSnap: `boolean` 

Align logical pixels: rounds coordinates during dragging to avoid fractional values.

Changes take effect immediately when modifying app.config.

### pixelSnap: `boolean` 

Align physical pixels: prevents blurring caused by fractional coordinates for centered lines or images.

This does not modify element data. Instead, it rounds pixel values during rendering after applying `pixelRatio`. For 1px centered lines, rounding may cause a 0.5px offset.

To further improve image sharpness, you can also configure the config.smooth property.

Changes take effect immediately when modifying leafer.config / app.tree.config.

## Examples 

### Manual Start 

When creating a large number of elements asynchronously, manually calling `start()` after creation can improve performance.

LeaferApp

ts

```
// #应用与引擎配置 - 手动启动应用 [Leafer]
import { Leafer } from 'leafer-ui'

const leafer = new Leafer({
    view: window,
    start: false
})

// async create leafs ...

leafer.start()
```

ts

```
// #应用与引擎配置 - 手动启动应用 [App]
import { App } from 'leafer-ui'

const app = new App({
    view: window,
    tree: {},
    start: false
})

// async create leafs ...

app.start()
```

### Disable Partial Rendering 

LeaferApp

ts

```
// #应用与引擎配置 - 关闭局部渲染 [Leafer]
import { Leafer, Rect, Debug } from 'leafer-ui'

const leafer = new Leafer({
    view: window,
    usePartRender: false
})

Debug.showRepaint = true

leafer.add(Rect.one({ fill: '#32cd79', draggable: true }, 100, 100))
```

ts

```
// #应用与引擎配置 - 关闭局部渲染 [App]
import { App, Rect, Debug } from 'leafer-ui'

const app = new App({
    view: window,
    tree: { usePartRender: false }
})

Debug.showRepaint = true

app.tree.add(Rect.one({ fill: '#32cd79', draggable: true }, 100, 100))
```
