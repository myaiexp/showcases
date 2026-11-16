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

## Free drawing

- v7 has no default `freeDrawingBrush`: set `canvas.freeDrawingBrush = new PencilBrush(canvas)`
  before `isDrawingMode = true`. There is no eraser brush (`EraserBrush` is not exported).
- CircleBrush and SprayBrush hand `path:created` a `Group`, not a `Path`. PencilBrush sets
  `affectStroke = true` on its own Shadow.
- `limitedToCanvasSize` compares scene points with the canvas pixel size: no `scene` fit.
- `ghost.stroke` sends no modifier keys; pan cards use a plain-drag mode instead of Alt.

## Customization

- `lockSkewingX` blocks the top and bottom handles, `lockSkewingY` the side ones; skewing is
  Shift + a side handle (`altActionKey`).
- `canvas.clipPath` and `overlayColor` draw over the controls unless `controlsAboveOverlay`.
- `minScaleLimit` applies on the next scaleX/scaleY set: re-set the scale after changing it.
- The interactive constructor reads `InteractiveFabricObject.ownDefaults`: changing defaults
  means mutating that object's keys in place and restoring them in a `finally`.
- `hasRotatingPoint` / `rotatingPointOffset` (part 4) are gone; the `mtr` control replaced them.

## Zoom and pan

- Part 5 reads `opt.e.offsetX`; v7 gives `opt.viewportPoint`. `setViewportTransform` keeps
  `vptCoords` current, so the guide's in-place `vpt[4]` edits plus a refresh aren't needed.
- `zoomToPoint` / `setZoom` overwrite `vpt[0]` and `vpt[3]`, destroying a rotated viewport:
  rebuild the matrix and call `setViewportTransform`.
- `calcViewportBoundaries` maps only two corners back to the scene, so under a rotated
  viewport `vptCoords` misses most of the view and off-screen culling hides visible objects:
  `skipOffscreen: false`.
- A pan handler sets `skipTargetFind` (and `selection = false`) in `mouse:down:before`, so an
  Alt-drag over a shape pans; undo both on `mouse:up`.
- Ghost points are scene points: in a card that moves the view, convert fixed screen spots
  with `sceneAt` / `wheelAt` from `shared/zoom-world.ts`.

## Clip paths

- The clip-path guides assume a top-left origin: their `top: -40, left: -40` offsets become
  centre coordinates in v7.
- Changing a `clipPath` (size, position, text, `inverted`) doesn't invalidate the parent's
  cache: `obj.set('dirty', true)` after each change. A clipPath isn't a canvas object, so
  `canvas.dispose()` doesn't abort its animations: abort them in `stage.onDispose`.
- `canvas.clipPath` is placed by its own origin (centre) and drawn through the
  viewportTransform, so zoom scales it.

## Controls

- Control positions are cached in `oCoords`: `setCoords()` after changing a Control's x, y,
  offset or size, or the object's size.
- `obj.clone()` rebuilds the default controls: re-assign custom ones on the copy.
- `touchCornerSize` / `touchSizeX/Y` apply to touch events only (the guide's `touchSize` is
  gone); mouse hit-testing, and so the ghost, uses the corner size.
- `Control.render` is a prototype method: assign `controlsUtils.renderCircleControl` to one
  control's `render`, `delete control.render` to restore it.
- `changeHeight` and `createPathControls` exist in 7.4.0 but have no docs page.

## Transformations

- `setCenterPoint` / `setRelativeCenterPoint` (transformations.md) don't exist in 7.4.0: use
  `setXY`, `setRelativeXY`, `setPositionByOrigin`, `getCenterPoint`.
- `sendPointToPlane(p, from, to)`: a plane's matrix maps its own points to the viewport, so
  `(scenePoint, vpt)` gives viewport pixels and `(scenePoint, undefined,
  obj.calcTransformMatrix())` object-local coordinates.
- `group.add(obj)` reads the object's position in the group's plane, so it jumps: call
  `util.sendObjectToPlane(obj, undefined, group.calcTransformMatrix())` first (and back
  before `remove`).
- `o.set(qrDecompose(m))` no longer moves the object (translateX/Y aren't properties): use
  `util.applyTransformToObject`. `composeMatrix` lives on `util`, not the top level.
