# cosmos.gl traps

Found while building this gallery. Read before building an example, and add to it.

- Graph.destroy() destroys the luma.gl device it made, but luma's device.destroy() never
  loses the WebGL context. Chrome keeps about 16 live contexts and then drops the oldest,
  which blanks other cards. So every example passes the documented third constructor
  argument, `stage.device()`, a device the stage creates on its own canvas and frees on
  cleanup (graph first, then device, then WEBGL_lose_context).
- cosmos.gl 3.6 declares luma.gl ~9.3 as a peer, but luma.gl throws when two versions load
  on one page, and deck.gl's gallery pins 9.4.2. cosmos.gl runs on that one copy.
- spaceSize is deprecated but still places the origin: gravity pulls toward (2048, 2048) at
  the default 4096. shared/data.ts centres every layout there (`CENTER`), so positions need
  no rescale and the force layout starts from where the data says.
- Data arrays are kept by reference: change one, pass it to its setter again, then render().
- Cards have no pointer. cosmos.gl reads pointer events off its canvas, so shared/ghost.ts
  dispatches them there (with a visible dot): hover, click and context-menu callbacks fire
  as with a mouse. Drags and wheel zoom go through d3 and are not faked: drive those with
  the matching API (zoom, setPinnedPoints, …) on a timer.
- fitViewOnInit fits once, at fitViewDelay, to the positions at that moment. A layout that
  then spreads or shrinks leaves the frame: cards call stage.refit(graph), full views can
  call graph.fitView() later. With rescalePositions, tiny input spreads over the space first.
- getPointPositions() and ghost.toPoint() read back from the GPU and stall it: fine on a
  timer, never every frame.
- Settings read only at construction (randomSeed, attribution) need a new Graph: build it with
  shared/rebuild.ts, which reuses one stage device (Graph.destroy() leaves an external device
  alone) and so never opens another WebGL context. Call fitView() on the rebuilt graph.
- setConfig() puts every omitted key back to its default, enableSimulation (true) included: a
  graph that was static starts relaxing. Use setConfigPartial() for live changes.
- A NaN in a per-point or per-link array (colors, sizes, shapes, stroke widths) means "use the
  config default"; the library resolves it at draw time. Headless software GL draws few frames,
  so a 700 ms transition can still look half done in a screenshot.
- Hover, click and context-menu picking go to a point first: a point's pick area is wider than
  it is drawn, so a link between two close points can never be hit. Link examples use a sparse,
  fixed layout (static-layouts.ts `web`) and cards aim the ghost at the middle of long links.
- d3-zoom keeps its transform on the canvas element, and a rebuilt graph reuses the device's
  canvas, so it starts from the previous graph's pan: call shared/reset-zoom.ts before build().
- spaceToScreenRadius converts a point radius, not a world distance: it ignores the zoom unless
  scalePointsOnZoom is on. enableZoom: false only blocks wheel, double-click and pinch; dragging
  still pans, and zoom()/fitView() still work.
- The per-call `enableSimulation` argument defaults to true for fitView, fitViewBy* and
  zoomToPointByIndex (the docs are right), but setZoomLevel()/zoom() pass nothing and follow the
  enableSimulationDuringZoom config. Wheel zoom (userDriven) always follows the config.
- fitViewByPointPositions takes a plain number[], not a Float32Array, in the type definitions.
- Cards fake a mouse drag with shared/fake-drag.ts (mousedown on the canvas, then window moves),
  and the held right button with shared/right-hold.ts (pointermove with buttons = 2).
- A position transition needs a first render behind it (the first render snaps), so examples that
  move points wait for `await graph.ready` before the second setPointPositions + render(). With
  the simulation running that second render also auto-pauses it, and a point-count change under
  transitionDuration > 0 does too: growing graphs set transitionDuration: 0.
- NaN-position (absent) points are left out of fitView and the init fit: a graph that starts with
  empty slots frames only the filled ones, so use fitViewOnInit: false and fitViewByPointPositions.
- findPointsInRect/Polygon, getSampledLinkPositionsMap and getTrackedPointPositionsArray read
  synchronously (no nonBlocking form for the last two): call them on a timer, not every frame.
- enableDrag defaults to false, so a host-driven drag needs no switch-off, but enableZoom must be
  false or the same drag pans the view. A headless Graph (`new Graph(null, …)`) still needs the
  stage device; its view-dependent calls (fitView, zoom) do nothing, so draw it on a plain 2D canvas.
- showFPSMonitor keeps the render loop running (it never idles). To see on-demand rendering, count
  `device.beginRenderPass` calls on the example's own device (and put it back on cleanup).
- Headless Chrome (SwiftShader) is slow enough that the gallery benches most cards; check a
  card by importing its main.ts and mounting it with { preview: true } by hand.
