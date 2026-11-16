# Leafer UI traps

Found while building the gallery against leafer-ui 2.3.4 and its `@leafer-in/*` plugins (all
2.3.4). Add to this list when you hit something new.

## Stage and lifecycle

- Build on `shared/stage.ts`: `stage.own(new Leafer({ view: stage.view, ... }))` (or `new App`)
  right after construction. `stage.own()` destroys the engine on unmount.
- `leafer.destroy()` waits a `setTimeout` before it runs; the stage calls `destroy(true)`, the
  synchronous form, and then empties the pane. Never call `destroy()` yourself on an owned engine:
  use `stage.release(engine)` to rebuild one.
- `view` is the pane div; the engine adds its canvas inside it and auto-sizes to it (ResizeObserver
  on the div) unless `width`/`height` are given. A view that already has children gets an
  absolutely positioned canvas. Never pass `view: window` (the docs' form): that covers the page.
- The docs place shapes in a full window around (100, 100) and 100 to 600 px wide. A card is
  about 260 × 200: rescale the docs' coordinates for cards (`stage.preview`), or zoom the view
  (`@leafer-in/view`'s `leafer.zoom('fit')`) only when the example is not about zoom or scale.
- The pane is light paper (`PAPER`): the docs' defaults are drawn for a white page (black text,
  the editor's blue, Frame's white fill). Pass `paper: 'transparent'` when the engine has a `fill`.

## Cards and input

- Cards have no pointer. Drive the engine with `stage.ghost(engine)`: it calls
  `engine.interaction.pointerMove/Down/Up` (the docs' Simulate Interaction page), shows a dot,
  and never dispatches DOM events, so other cards never see them. Points are pane pixels.
  Wrap a card's steps in `script(stage, async () => { ... await stage.wait(ms) ... })`, which loops
  until unmount; `stage.wait()` rejects on dispose and ends the script quietly.
- Every engine listens for `keydown`/`keyup` on the whole document, and the editor moves its
  selection on arrow keys. `stage.own()` sets `interaction.config.keyEvent = false` in cards, so
  the reader's keys never reach them; `ghost.key(code)` lets one key through.
- An element `emit()` fires a single event without hit testing; the ghost goes through hit
  testing, hover, drag thresholds and taps like a real pointer. Prefer the ghost when the example
  is about interaction.
- Pointer events on `window` (`pointermove`, `pointerup`) are only handled by the engine that saw
  the press or whose canvas is the target, so full views do not interfere with each other.

## No network

- The docs load `/image/leafer.jpg`, `/image/arrows.png`, `cursor.svg`, `/video/forest.mp4` and
  `/film/color.gif` from their own site. Use `shared/images.ts` (`photo()`, `arrows()`,
  `cursorSvg()`, `BROKEN_IMAGE`, `LEAF_SVG`): data: URLs painted in code.
  `test/leafer-ui-offline.test.ts` fails any `url: '...'` literal that is not a data: URL, and any
  http(s) URL.

## Page-wide state

- Plugins patch the shared classes when imported (`import '@leafer-in/editor'`), for every engine
  on the page. That is harmless, but an example must import every plugin it uses itself: never
  rely on another example having loaded it.
- `@registerUI()` registers a class under its `__tag` in the page-wide `UICreator.list`; a
  repeated tag logs `repeat:<tag>` and replaces the earlier class, so JSON and `UICreator.get()`
  in another example would build the wrong class. Give custom elements a `__tag` (and class name)
  unique to the example, e.g. `StarBadgeRect`, and register at module level, never in `mount()`.
- `Debug`, `Platform`, `Plugin`, `ImageManager`, `Keyboard`, and the static config objects
  (`EditorConfig`-style defaults, `Leafer.config`) are page-wide. An example that changes one
  restores it on cleanup (`stage.onDispose`).
- The repo's tsconfig has no `experimentalDecorators`, and Leafer's decorators (`@registerUI()`,
  `@dataProcessor`, `@boundsType`) are the legacy kind. Use the docs' JS forms instead:
  `Custom.registerUI()`, `Custom.registerData(CustomData)`, `Custom.addAttr('left', 0, boundsType)`.

## Custom elements and API drift (2.3.4)

- The tsconfig has `noImplicitOverride`: custom classes need `override` on `get __tag`,
  `__updatePath`, `__updateBoxBounds`, `__drawHitPath`, `__draw`, and on data-class members.
  Custom attributes are `declare` fields; `registerData` needs `Data as never`.
- In the docs but not in 2.3.4: `aliasType` (not exported), `Image.load()` (not in the types),
  `Group.resizeChildren` (only Box and Frame read it), percent sizes (`width: '70%'` on a Rect in
  a Box gives NaN and draws nothing). `leafer.find(fn)` callbacks return an `IAnswer` (0 to 3),
  not a boolean.
- `canvas.draw()` leaves the Canvas element's context transformed: clear with
  `canvas.canvas?.clear()`, not `context.clearRect`, or the redraw smears.
- The editor's resize handles sit exactly on the selection's corners: aim a ghost drag at
  `bounds.x + width, bounds.y + height`.
- Shared helpers: `shared/shapes.ts` (`size`, `mid`, `drive`, `pick`, `toggle`, `caption`) gives a
  control in the full view and a sweep or cycle in a card.

## Engine config and input (2.3.4)

- `interaction.wheel(data)` exists at runtime once `@leafer-in/viewport` is imported but is missing
  from the `IInteraction` type; `shared/basics.ts` `fakeWheel` casts and calls it for cards.
  Fake integer wheel deltas fail the trackpad check that `zoomMode: true` relies on: cards use
  `zoomMode: 'mouse'`.
- `Debug.showRepaint` is page-wide and flashes every card on screen: draw `RenderEvent.END`'s
  `e.renderBounds` in a sky layer instead.
- `leafer.config.pointer/move/wheel/zoom` are optional in the types (use `!`); `robot.x/y` may be
  undefined, so write `robot.x = (robot.x ?? 0) + n`.
- `DragEvent` and `PointerEvent` from leafer-ui shadow the DOM types: an example handling native
  DOM events must not import them under those names.
- A `<pre>` in an example inherits the page's dark `pre` style: reset background, border, padding
  and colour inline.
- Vite fully reloads the page the first time a plugin is imported, so a page left open loses its
  state mid-run: re-open it before judging.
- Shared helpers: `shared/basics.ts` (`sizer` scales docs coordinates to the pane, `fakeWheel`,
  `wheelTour`, `hoverLoop`, `dragToAndFro`, `cycle`), `export-view.ts` (export result panel),
  `sprites.ts` (a 20-frame arrow sprite sheet for Robot).

## Data and layout (2.3.4)

- `position: { id }` needs `@leafer-in/find` as well as `@leafer-in/position` (it logs "please
  install and import plugin" and does nothing otherwise). The position plugin lays out on the next
  frame: read `x`/`y`/`width`/`height` about 80 ms after assigning `position`.
- `proxyData` has no getter until a framework adapter defines one; the data-proxy examples install
  a plain-Proxy adapter on `UI.prototype`, reference-counted on globalThis so it comes off only
  with the last of them. Restore in a microtask after dispose: the destroying engine still calls
  `setProxyAttr`.
- Types reject two documented forms: `rect.path = null` (use `null as never`) and
  `getInnerPoint(p, null, true)` (pass `undefined`).
- `caxi js` / `caxi eval` time out after 60 s: probe at most about 25 examples per call.

## Animation, events and utilities (2.3.4)

- `killAnimate()`, and an `animate(...)` that replaces a running one, jump the element to its end
  style. To stop mid-way use `rect.animate()?.kill(false)` or `anim.pause()`. A second
  `rect.animate()` call stacks into an `AnimateList` unless the first is killed; `animate()` with
  no argument returns the last one even if it completed, and `.time` is undefined before it starts.
- `animation.attrs` limits which keys interpolate; other keys of the style jump at start and end.
- `motionPrecision` changes only how a distance on a Bézier is solved, not `getMotionTotal()`;
  it shows on a very uneven curve.
- `PointerEvent.MENU` comes from `interaction.menu(data)` (the browser's contextmenu); a ghost
  right-click gives only down and up, so a card calls `menu()` itself.
- `PointerEvent.changeName` and `Resource.set` keys are page-wide: change names only in the full
  view and restore on dispose; give resources unique keys and `Resource.remove` them on dispose.
- `changeAttr` rewrites the shared data class: subclass first, `registerData` its own data class,
  then `changeAttr` on the subclass.
- `Group` already has `selected`; a plugin class needs other member names. Constructor parameter
  properties are not allowed (`erasableSyntaxOnly`).
- The Leafer config has no `rotation`/`scale`: set them after construction. `pick()` can return
  a result with no `target`.
- `Matrix.toOuterPoint`/`toInnerPoint` return void: pass the output point as the second
  argument. `box.getFitMatrix(region)` fits the region into the box, not the box into the region.
- The dev server's example glob can stop seeing new example folders ("No such example"):
  `touch src/registry.ts` refreshes it.
- Shared helpers: `event-kit.ts` (event log, lanes, `probe`), `motion-kit.ts`, `math-kit.ts`.

## Appearance and interaction (2.3.4)

- `blur` and `backgroundBlur` are empty stubs in `@leafer-ui/effect` (the docs say planned).
- Leafer writes cursors as an unquoted CSS `url(...)`: escape `'`, `(` and `)` in data URLs
  (`images.ts` `cursorSvg()` does).
- `interaction.pointerUp()` with no data fires `pointer.up` only on the leafer (no `drag.end`, no
  tap for other buttons): always pass the release point.
- With `@leafer-in/color` loaded, `hsl()` strings with a fractional hue do not render in a solid
  paint: round the hue. `{ r, g, b }` colour objects need `{ type: 'solid', color }`.
- A Text `boxStyle` with a `fill` already makes the padding hit, hiding `hitBox`.
- A disabled element ignores `hoverStyle`/`pressStyle`/`focusStyle`.
- A `mask` or `eraser` Group is one mask or eraser for all its children. `source-*` and
  `destination-*` blend modes act on everything drawn before: isolate each pair in a Group with
  `blendMode: 'normal'`.
- `shapes.ts` `drive()` sweeps from the minimum; for several sliders in a card use
  `appearance.ts` `knobs()`, which swings around the starting values.
- Shared helpers: `appearance.ts` (stripes backdrop, `cells`, `note`, `knobs`),
  `interaction-demo.ts` (`tryDrag`, `tour`, `logLines`, `visit`).

## Auto layout and the animate plugin (2.3.4)

- `hoverStyle` (and every interactive state) needs `@leafer-in/state`; `@leafer-in/animate` does
  not pull it in.
- `flow: 'x-reverse'`/`'y-reverse'` and `flowWrap: 'reverse'` only reverse the order; the flow
  still starts top-left. A Flow with no `width`/`height` is auto-sized: give both when sweeping.
- `AnimateEasing.register(name, factory)` takes `(value) => (t) => number`; the registry is
  page-wide, so delete the name from `AnimateEasing.list` on dispose. A shared options object
  needs `satisfies IAnimateOptions` (a literal infers `easing: string`).
- A ghost `move()` onto an element sets hover until the next pointer event: call `ghost.leave()`
  to end it. `seek(time, true)` counts the delay as part of the timeline.
- Shared helpers: `flow-kit.ts`, `forms-kit.ts` (the docs' five call forms of an animate option
  side by side), `animate-kit.ts`.

## Graphic editor (2.3.4)

- `editor.select(app.tree.children)` passes the live array: the multi-select proxy joins
  `tree.children` and the box goes stale after `removeItem`. Pass a copy (`[rect1, rect2]`).
- Ghost moves carry no modifier keys, but the editor reads Ctrl/Alt/Shift during a drag: use
  `editor-kit.ts` `holding()` / `dragWith()`, which add the keys to every pointer move.
- Custom `EditTool`/`InnerEditor` classes: the base constructor calls `onCreate()`, so a plain field
  is reset afterwards; write `declare point: Box`. `Rect.setEditOuter()`/`setEditInner()` rewrite
  the shared data class: subclass with its own data class first (as for `changeAttr`).
- Inner-editor config is keyed by the editor's tag (`editor: { TextEditor: { selectAll: false } }`).
  The text inner editor adds window listeners until it closes: call
  `app.editor.closeInnerEditor()` in `stage.onDispose`.
- `getEditTool('LineEditTool').config` is undefined. A string `moveable`/`resizeable`/`rotateable`
  (`'gesture'`) only adds touch gestures; `resizeable: false` turns corners into rotate handles.
  `IShortcutKeysCheck` hooks need `!!event.altKey`.
- A handle's `cursor` is a quoted data URL: strip the quotes before using it in an `<img>`.
- Keep browser probes to 12-15 card mounts per eval (memory cap).
- Shared helpers: `editor-kit.ts` (card layout, `pair`/`trio`/`solo`, `spot`, `watch`, `actions`,
  `variants`, `tune`, `pull`, `holding`/`dragWith`, `cursorTile`).

## Official plugins (2.3.4)

- `new App({ view })` with no `editor` needs `tree: {}`, or `app.tree` is undefined.
- A draggable Box's drag wins over a child's `DragEvent.START` with `e.stop()`: a dot that starts
  a Linker drag needs a non-draggable box. A Linker with no `endPoint` draws nothing;
  `createStartPoint`/`createEndPoint` assign the point, `createLinkerPoint` only returns data.
  `ILinkerPointData` comes from `leafer-ui`.
- Arrow heads registered on `PathArrow.list` are page-wide: unique names, deleted on dispose.
  `HTMLText.addUnicodeEntity` has no remove (names persist); restore any
  `HTMLText.prototype.decodeText` override on dispose.
- Robot treats any truthy `loop` as forever (a count is not honoured).
- Shared helper: `plugin-kit.ts` (view replay, text-editor typing into `editDom`, linker boxes,
  scroller content, robot frames).
