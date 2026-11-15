# AntV L7 2.29.1 traps

Found while building this gallery. Read before building an example, and add to it. "Docs"
means the vendored pages under `docs/repo/site/docs/`.

## Stage, network, cards

- Every Scene gets `logoVisible: false`: the default logo is an image from alipayobjects.com.
  Hand the scene to `await stage.ready(scene)` before adding layers. It waits for 'loaded',
  and on dispose destroys the scene and frees its WebGL context, which `scene.destroy()`
  never does (browsers cap live contexts, and the gallery mounts and unmounts cards).
  L7 logs a "context lost" warning when that happens; it is expected.
- No network anywhere, cards or full views. Draw on `shared/world.ts` (Natural Earth via
  world-atlas) instead of a basemap; generate data in code instead of the docs' CDN JSON;
  give `scene.addImage` data: URLs drawn in code (`shared/images.ts`). Polygon shapes
  `water` and `ocean` load a texture from alipayobjects.com: never use them. Raster tile
  layers and MVT sources fetch: feed tiles through a custom hook (`Scene.addProtocol`,
  `getCustomData`) with tiles made in code, never a URL. The MapTheme control's thumbnails
  are remote images; it stays out.
- Cards have no pointer. Animate with `stage.every()`/`stage.frame()` or layer `animate`,
  or fake input with `stage.ghost(scene)`: `move`/`moveTo` (mousemove → hover), `click`
  (Hammer tap for layer clicks plus a DOM click for the scene's), `dblclick`, `drag`. The
  ghost has no right button: send a DOM `contextmenu` to `.l7-canvas-container` by hand.
- L7 drops a pick while another pick or render is running, so never move and click in the
  same tick. Per-frame camera moves (`setZoomAndCenter` in `stage.frame`) on a clustered
  source re-cluster every frame and can leave a card blank: step the zoom on a timer.
- Marker, Popup and the controls come from @antv/l7-component, whose `browser` field is a
  UMD bundle with no ESM exports; `vite.config.ts` aliases it to its es build.
- Each mousemove creating a new Popup (as the quickstart does) stacks popups: remove the old
  one first, or reuse one.

## Scene

- Scene mouse events (`scene.on('mousemove' | 'click' | …)`) are the map engine's events:
  `{ point: {x, y}, lngLat, originalEvent }`, with no `x`/`y` of their own. Layer events
  (`layer.on('click')`) are L7's: `{ x, y, lngLat, feature, featureId }`. Errors thrown in a
  scene handler are caught and logged as "Error in map event handler".
- `scene.once(type)` for map events (click, mousemove, moveend, …) never fires: it lands on
  an emitter the map engine doesn't feed. Use on + off. 'maploaded' is never emitted.
- `getPickedLayer()` is set by the async pick that follows a pointer move: read it later
  (a timer), not inside the scene's own mousemove handler.
- `scene.addImage` returns a Promise: await it before adding a layer that uses the image.
  `removeImage` only empties the registry (hasImage turns false); icons already drawn stay.
  Image ids must not reuse shape names (`circle`, …).
- `scene.map` is typed `unknown`; type the fragment you call. DebugService: the docs'
  `serEnable` is `setEnable`; `IDebugService` omits `renderDebug`, `on`, `off` (the class has
  them). The layer event is `inited`, not `initiated`.

## Layers in general

- Style mapping: `style({ opacity: 'v' })` (style_encode.en.md) is not a mapping and leaves
  the layer invisible; only `{ field, value }` works. Mappable keys: point `stroke`,
  `offsets`, `opacity`, `rotation`, `anchor`, `textOffset`, `textAnchor`; line `stroke`,
  `offsets`, `opacity`, `thetaOffset`; polygon `opacity` and the extrusion keys.
  `strokeWidth` and `strokeOpacity` are not mappable, though layer_style.en.md lists them.
- Changing a polygon's `{ field, value }` opacity mapping after init, or back to a plain
  number, blanks the layer: re-feed the data with `setData` instead.
- `getClusters(zoom)` and `getClustersLeaves(id)` return a plain array of features, not a
  FeatureCollection; cluster features carry `cluster_id` and `point_count`. Cluster options
  are `clusterOptions` (docs: clusterOption); maxZoom defaults to 20 (docs: 16).
- Scales: `pow` is spelled `'power'`; `log`, `sequential`, `clamp` and diverging's `neutral`
  work. A cat scale with a fixed domain reuses its colours for unlisted categories unless
  `unknown` is set. `color('nothing')` (not a field, not a colour) draws nothing.
- The getScale snippet in layer_interaction.en.md has n1/n2 swapped: the domain follows data
  order. `getLegend`/`getLegendItems` return nothing until the render after a mapping change
  (read ~150 ms later); `legend:color` events arrive filled.
- `setActive`/`setSelect` throw before the layer has initialised: call them after `inited`.
- Masks: templates must be added to the scene (`visible: false` hides them and they still
  cut). `maskOperation` is read from each template, not the masked layer, and is the reverse
  of the docs' wording: `'and'` keeps the overlap, `'or'` the union. `disableMask()` (and
  removing the last template) makes the layer vanish, since its `mask` config is latched:
  also `updateLayerConfig({ mask: false })`. mask_method.en.md's enableMask snippet calls
  disableMask by mistake.

## Point layers

- Size is a radius in px. Column size [w, l, h] (or [w, h] = [w, w, h]) is in projected units
  that grow with zoom (~1 per px at zoom 3.4); map-distance values cover the screen.
- opacityLinear dir `'up'` fades columns toward the top. The default `dot` model blends
  additively, so overlaps glow. Marker's `anchor` is a string enum in the types: cast.

## Line layers

- Style `arrow` ({enable, arrowWidth, …}) is read by no model. `borderWidth`/`borderColor`
  and `linearDir` work only on shape('line'), not arcs. Walls have no dashArray.
- Great circles across ±180° draw a straight band over the map (`shared/line-data.ts`
  `NO_DATELINE` avoids them).
- Units: wall size 40 is a sensible wall at zoom 3–4 (2000 fills the screen; with
  heightfixed ~3e6). Line size [w, h] and raisingHeight lift ~100 visibly. Flowline
  arrowheads are large: sizes 3–4 read best.

## Components

- Marker: the getter is `getLnglat()` (docs: getLngLat); pass `setLnglat` an object (its
  IPoint type rejects a tuple). Options (anchor, offsets) are read at construction only.
- MarkerLayer `clusterOption.element` gets one GeoJSON feature: `point_count`, `point_sum`, …
  are in `feature.properties`, as strings. A one-point cluster returns the original marker.
- LayerPopup: `title`, `customContent`, `formatField`, `formatValue` get the feature's
  properties (a JSON row is its own properties); `getValue` gets the raw feature. With
  `customContent` set, `fields` is ignored. `trigger` also takes touchstart/touchend.
- LayerSwitch builds its popper only with layers or options; without `layers` it lists every
  layer, `basemap-*` included. `popperTrigger: 'click'` closes on a pointerdown outside.
- Pressing a control's button from a card: dispatch `new MouseEvent('click', {bubbles:
  false})` on the button (a bubbling synthetic click would reach the card's link).
- Control `setOptions`: an undefined value falls back to the default; position and className
  apply live.
- ExportImage / `exportPng` export the layers only, on transparency. Pass
  `preserveDrawingBuffer` to the Scene, not the Map. The Logo control is a fixed 89×16 px box
  that stretches its image.

## Sources

- A Source emits only `'update'` (`{ type: 'inited' | 'update' }`); `source.on('inited')` never
  fires. `updateClusterData(zoom)` swaps data silently: emit `'update'` yourself to redraw.
- Tiles: the method is `reloadTilebyId` (docs: reloadTileById); `source.tileset` exists once the
  layer has initialised. With `getCustomData` the URL is never fetched; `callback(err)` leaves
  a hole and does not retry.

## Tiles

- Tiles are served from code with `Scene.addProtocol` (`shared/tile-serve.ts`; MVT encoded by
  hand in `shared/tile-mvt.ts`). Give the source a bare `name://x` URL: L7 appends
  `/{z}/{x}/{y}` itself, and a template with placeholders doubles them. Protocols are
  page-wide, so each example uses its own name.
- A `.color('id', [...])` field scale is rebuilt per vector tile, so colours differ between
  tiles: use a callback. Translucent fills double-blend where tile buffers overlap. A
  PointLayer on a geojsonvt source draws nothing (polygons and lines work; points on mvt work).

## Image and raster layers

- `setData` on a live ImageLayer races its texture upload: add a new layer and remove the old
  one on `inited`.
- `clampLow`/`clampHigh` are inverted against the docs: `false` hides cells outside the domain,
  `true` (the default) paints them in the end colour; clampHigh falls back to clampLow.
- Linear ramp `positions` are normalised by the domain: a position outside it throws in
  addColorStop. `format(data, bands)` must return one `{rasterData, width, height}` per band
  (missing bands read as zeros, silently). Operations: `['-', a, b]` is a − b, a function
  operation returns `{ rasterData }`, `{type: 'rgb'}` needs 0–255 bands, `log10` is ln.
- Plane terrain's `rgb2height(r, g, b)` gets 0–255 bytes.

## Other layers and experiments

- CityBuildingLayer draws nothing in any variant tried; post-processing passes
  (`enableMultiPassRenderer`, pass.en.md, custom passes too) throw "reading 'r'" and the layer
  draws nothing. Neither is in the gallery.
- Earth: `Scene`/`EarthLayer` import from `@antv/l7`; `rotateY` lives on
  `scene.getMapService()` and takes `{ force, reg }` (the docs' `{ option }` wrapper is
  ignored). Point layers on Earth draw nothing; fly lines work.
- SIMPLE coordinates: `setCenter` and `ghost.moveTo` still take geographic values (convert with
  `shared/exp-simple.ts` `toLngLat`); `mapSize: 1000` spans the world width.
- The canvas layer's `ctx` is typed RenderingContext: cast to CanvasRenderingContext2D.

## Polygon layers

- `shape('circle' | 'dot' | <icon>)` on a PolygonLayer builds a point model but draws
  nothing; the column shapes (cylinder, …) do draw, at each polygon's centroid, and
  `shape('name', 'text')` labels work. `calculateCentroid` throws "当前数据不支持标注" for
  some coordinate shapes.
- Extrude: `topsurface: false` on the plain shader discards every face (with `pickLight:
  true` it removes only the roofs); `sidesurface` needs `pickLight: true`.
- `heightfixed: true` heights are in the map's own scale: ~300 per floor at zoom 11, and they
  double per zoom level.

## Heatmap layers

- `angle` is in radians (0 to ~6.3 is a full turn), not degrees.
- Grid/hexagon transform `size: 250000` gives 40–100 px cells at zoom 3.5; the docs' 15000–20000
  is far too small for continent-scale data. Aggregated fields are named after the method
  (`count`, `sum`, `max`, `min`, `mean`).
- `.source(data)` without a parser needs GeoJSON points; a plain array draws nothing.
  `shape('heatmap3D')` works: anything but exactly `'heatmap'` takes the 3D branch.

## TypeScript

- tsconfig has noUncheckedIndexedAccess: guard indexed reads. Chained layer calls return
  `ILayer`. Where an L7 type is wrong for documented behaviour, cast only that fragment and
  say why.
