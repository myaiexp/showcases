# Fabric.js traps by topic (7.4.0)

The general list (v7 vs the guides, page-wide state, cleanup, cards) is at the top of
`stage.ts`. Topic lists live here, plus the headers of `filter-demo.ts` (filters),
`text.ts` (text) and `colors.ts` (Color). Add to them as you find more.

## Events and selection

- `discardActiveObject()` and `setActiveObject()` don't repaint: call `requestRenderAll()`.
- Intro part 2's `object:selected` is gone since v4: use `selection:created` / `updated`.
- Cancelling `dragover` is what allows a DOM drop on the canvas; fabric never calls
  `preventDefault` itself. A card can send synthetic `DragEvent`s, and `MouseEvent`s with
  `button: 2`, straight to `canvas.upperCanvasEl` (no document listeners involved).
- `ActiveSelection` stacking is per instance (`new ActiveSelection([], { canvas,
  multiSelectionStacking })`); never set `ActiveSelection.ownDefaults`.

## Groups and layout managers

- `new Group(objects)` positions members around the group centre (the guide's top-left
  default is v5). Take objects off the canvas first, or they draw twice; `removeAll()`
  returns them with the group's transform applied, ready for `canvas.add()`.
- `group.add()` / `insertAt()` read the object's `left`/`top` as scene coordinates.
- `instanceof Group` is also true for an `ActiveSelection`.
- `set()` on a member does not re-fit the group: add, remove, a drag in an interactive
  group or `triggerLayout()` does. `FixedLayout` keeps its size for add, remove and drags,
  but `triggerLayout()` re-measures.
- `ClipPathLayout` needs the `clipPath` in the Group constructor options.
- `layout:before` / `layout:after` don't fire for the first layout (listeners attach after).
- A custom `LayoutStrategy` that moves members skips `object_modifying` in
  `shouldPerformLayout`, or it fights the drag; centre the arrangement on 0. Only the
  modified/modifying layout contexts carry `trigger`.
- `util.qrDecompose(obj.calcTransformMatrix())` gives a member's combined transform.

## Serialization

- `loadFromJSON` doesn't repaint: `requestRenderAll()` after the await.
- An image that fails to load is dropped silently unless the reviver returns a stand-in for
  the `error` case (v7.3). `loadFromDatalessJSON` is gone; `toDatalessJSON` remains, and
  `Path.fromObject` without `path` builds an empty Path.
- `config.NUM_FRACTION_DIGITS` is page-wide and also rounds `toSVG`: set and restore it in
  `try`/`finally` around each export.
- `static customProperties = [...]` makes `toObject` and `clone` carry extra properties.

## SVG

- `loadSVGFromString` / `loadSVGFromURL` return promises (no callback). The URL form swallows
  fetch and parse errors and resolves empty; `objects` can hold `null` entries.
- The parser reviver is `(element, object)`, called after the object is built.
- `canvas.toSVG()`'s default `viewBox` follows the viewportTransform: with the stage `scene`
  option the SVG is in scene units and shows the letterbox.

## Subclassing

- Class syntax replaces `createClass`, `callSuper`, `initialize` and `_fromObject`;
  `fromObject` is inherited when the constructor takes the options. `getDefaults` is static.
- Typed `static ownDefaults` on a subclass clashes with the base's: override
  `static getDefaults()` and pass defaults through `super({ ...defaults, ...options })`.
- Declare subclass fields with `declare` (an initialiser runs after `super()` and wipes the
  value); overrides need `override`. New constructor options need a cast.
- A custom property drawn in `_render` belongs in `static cacheProperties`, or `set()`
  redraws a stale bitmap. Drawing outside `width` × `height` is clipped by the cache.
- `constructor.name` is minified in the build; use the class's `static type`.
