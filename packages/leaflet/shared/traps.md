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
- Cards: no `map.locate()` (permission prompt), no `setFullscreen()` (needs a gesture, and it
  would take over the page). Full views run those from a button.
- `stage.css` recolours Leaflet's chrome dark (container background, bar buttons, layers control,
  attribution, scale, popups, tooltips). `.leaflet-div-icon` keeps its default white box.

## Page-wide state

- **Class defaults are page-wide.** `Marker.mergeOptions()`, `DefaultIcon.defaultOptions`,
  `Class.include()`, `addInitHook()` on a Leaflet class change every map on the page, every card
  included. Subclass first and change the subclass (`class Pin extends Marker {}`,
  `Pin.mergeOptions({...})`), as the extending tutorial does.

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
