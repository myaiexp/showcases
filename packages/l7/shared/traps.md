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
