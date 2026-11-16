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
