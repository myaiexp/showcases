# Leaflet 2 traps

Found while building the gallery on `leaflet@2.0.0-beta.4`. Read before building an example, and
add to it when something bites.

## Setup every example follows

- **Build on `createStage`** (`stage.ts`): `const map = stage.own(new LeafletMap(stage.box, {...}))`.
  `stage.own` calls `map.remove()` on cleanup, which drops the map's listeners, its
  ResizeObserver and its panes. Timers go through `stage.every/after/wait/cycle`.
- **Import `LeafletMap`, not `Map`.** `Map` is exported too, but it shadows the built-in `Map` in
  the module (the docs say the same).
- **No network, in cards or full views.** Never `new TileLayer(url)` or `new WMSTileLayer(url)`:
  even an unresolvable host is a request. Use `LocalTileLayer` / `LocalWMSTileLayer`
  (`local-tiles.ts`), which are the real classes with `getTileUrl` answered by the pretend server
  in `tile-server.ts`:
  - XYZ: `https://tiles.example/{z}/{x}/{y}.png`, any subdomain (`{s}.tiles.example`), an optional
    style segment `https://tiles.example/{style}/{z}/{x}/{y}.png` (dark, light, terrain, vintage,
    night, grid; grid draws each tile's border and z/x/y), `{r}` → `@2x` for 512px tiles, and
    `?layers=labels,coast,...` for a transparent layer of only those parts.
  - TMS: `https://tms.example/{z}/{x}/{y}.png` with `tms: true` (rows counted from the bottom).
  - WMS: `https://wms.example/ows` with `layers` from ocean, land, coast, borders, graticule,
    labels, tilegrid; `styles` a style name; CRS EPSG:3857, EPSG:3395, EPSG:4326 (1.1.1 and 1.3.0
    axis orders both honoured); `transparent: true` leaves out the ocean.
  - Failures: `down.tiles.example` fails every tile; zoom > 18, rows/columns outside the world,
    unknown styles and other hosts fail too. A failed tile fires `tileerror` and shows
    `errorTileUrl` exactly as a 404 would.
  - `layer.requestUrl(coords)` returns the URL Leaflet built (what a real server would get); show
    it when the example is about URLs.
  - Attribution: `LAND_ATTRIBUTION`.
- **Images and data** come from `data.ts`: the tutorials' leaf icons, baseball marker, Newark 1922
  map and Ur-Quan Masters star map as inline data URLs, and the tutorials' GeoJSON files
  (`statesData()`, `euCountries()`, `denverSample()`). For other images draw a canvas and use
  `canvas.toDataURL()`. A video for `VideoOverlay`: a `<video>` whose `srcObject` is a
  `canvas.captureStream()`, `muted`.
- **Cards have `pointer-events: none`.** Fake input with `ghost(map)` (`ghost.ts`): it dispatches
  real DOM pointer and click events at map points, so Leaflet's own event handling runs. Pass the
  target element for layers: `g.click(latlng, circle.getElement())`, `g.over(latlng,
  marker.getElement())`. Map-level events go to the container (the default target). Remove it on
  cleanup (`stage.onDispose(() => g.remove())`).
- A card is an `<a>`: a scripted click anywhere inside it opens the example, even if propagation
  stops (link activation is decided from the event path). `ghost()` stops and `preventDefault()`s
  untrusted click, dblclick and contextmenu at the map container, after Leaflet's own listeners
  there have run. A card that dispatches clicks creates a ghost first.
- Marker drags and key presses on a marker's icon: `markerInput(stage, map, ghost)`
  (`marker-input.ts`). It and `gestures()` share one drag queue (`drag-lane.ts`).
- More card input in `gestures(stage, map, ghost)` (`gestures.ts`): dblclick, wheel, keys, drag,
  shift box-drag, touch long-press. Synthetic pointerdown/move/up drive `Draggable` (Leaflet skips
  `setPointerCapture` for untrusted events); drags share one page-wide queue because `Draggable`
  allows one drag per page. `KeyboardHandler` listens only after the container gets `focus`, so
  `key()` sends a FocusEvent first. `tapHold` ignores `pointerType: 'mouse'`.
- Cards: no `map.locate()` (permission prompt), no `setFullscreen()` (needs a gesture, and it
  would take over the page). Full views run those from a button.
- `stage.css` recolours Leaflet's chrome dark (container background, bar buttons, layers control,
  attribution, scale, popups, tooltips). `.leaflet-div-icon` keeps its default white box.

## Page-wide state

- **Class defaults are page-wide.** `Marker.mergeOptions()`, `DefaultIcon.defaultOptions`,
  `Class.include()`, `addInitHook()` on a Leaflet class change every map on the page, every card
  included. Subclass first and change the subclass (`class Pin extends Marker {}`,
  `Pin.mergeOptions({...})`), as the extending tutorial does. `KeyboardHandler.keys` is static
  too: an example that rebinds it restores it on cleanup.

## Options: read once or live

- Read when the map is created, so changing them needs a new map: `zoomAnimation`,
  `fadeAnimation`, `markerZoomAnimation`, `trackResize`.
- Read each time they're used, so assigning `map.options.x` works: inertia and wheel options,
  `keyboardPanDelta`, `worldCopyJump`, `doubleClickZoom` (each dblclick), `closePopupOnClick`
  (when a popup opens), `zoomAnimationThreshold`, `maxBoundsViscosity` (when a drag starts).
- Also live: `zoomSnap`, `zoomDelta`, `wheelPxPerZoomLevel` (the zoom handlers re-read them).
- `map.remove()` then `new LeafletMap(sameBox)` works; own the current map with
  `stage.own({remove: () => map?.remove()})`.
- `map.getPanes()` includes `mapPane`, the parent of the others.
- `euCountries()` (map-panes tutorial data) includes Russia, so its `getBounds()` is nearly the
  whole world: fit Europe by hand.
- `map.on()` is typed per event name: loop over an array of names rather than passing a
  space-separated string.
- A map `dblclick` also runs `doubleClickZoom`: a card cycle that sends one resets the view.
- Zoom-control buttons can be pressed in cards with `.click()` on `.leaflet-control-zoom-in`.
- `unbindPopup()` only removes the listeners: an open popup stays open, so `closePopup()` first.
- Leaflet ignores a click that comes right after a drag (until the next pointerdown): after a
  scripted drag, open a popup by method, not with a ghost click.
- `autoClose` is read from the popup already open when the next one opens.
- A popup or non-sticky tooltip on a path opens at its `getCenter()`; a clicked path's popup
  opens at the click point.
- A card fits markers plus popups or tooltips at about zoom 7, not 8.
- `marker.getIcon()` is typed `Icon`: cast to `DefaultIcon` to read `color`. A subclass's
  `static defaultOptions` needs tuple types (`as PointTuple`). `marker.dragging` may be undefined.
- `DivIcon` sets inline width and height from `iconSize`; CSS can't override `[0, 0]`. `bgPos`
  only sets `background-position`: the image comes from the icon's CSS class.
- `riseOnHover` is wired when the icon is created: toggling it needs the marker re-added.
- A popup opening near a card's edge autoPans the map and can push other markers out of view.
- Tile events (`tileloadstart`, `loading`…) fire synchronously inside `addTo()` when the map
  already has a view: attach listeners before `addTo`. `tile-urls.ts` has helpers for showing
  requested URLs (`onRequest`, `countTiles`, `shortUrl`, `wmsLines`).
- Tile layer options read when the layer is added: `updateWhenIdle`, `updateInterval`,
  `className`, `crs` (rebuild the layer). Read live: `maxNativeZoom`/`minNativeZoom` (then
  `redraw()`), `uppercase`, `zIndex`, `opacity`.
- A custom `createTile` is async only if it declares `done`: `createTile(coords: Coords, done:
  DoneCallback)`. In GridLayer's `tileloadstart`, read `e.tile`: it isn't in the container yet.
  An overriding `onRemove` returns `void`.
- `tileSize: 512` against the pretend server needs a literal `@2x` in the URL (`{r}` is empty at
  pixel ratio 1), with `zoomOffset: -1` and `minZoom: 1`. The WMS server always answers PNG.
- `.lf-map` has `flex: 1`: an example that sets the map box's width also sets `flex: none`.
- In a card, `stage.log()` writes the caption, so a `stage.say()` in a cycle overwrites it.

## Leaflet 2 behaviour worth knowing

- `new LatLng(null)` and `new Point(null)` throw; `LatLng.validate()` tells you first.
- `new Circle(latlng, {radius})`: a radius as the second argument throws.
- `zoomIn()`, `panBy()` etc. build on where a running animation is heading: two quick
  `zoomIn()` calls zoom two levels.
- Events are `pointer*`, not `mouse*`: listening to `mouseover` logs an error and never runs.
- A Canvas renderer's `<canvas>` has `pointer-events: none`; the map finds the path under the
  pointer itself, so listen on the layers or the map, never on the canvas element.
- The map's world data (`world.ts`) loads with a top-level await: the first example that
  imports `local-tiles.ts` waits for both Natural Earth scales to parse.
