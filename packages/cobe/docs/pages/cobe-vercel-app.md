<!-- source: https://cobe.vercel.app/ -->

# COBE

San Francisco

New York

Tokyo

London

Sydney

Cape Town

Dubai

Paris

São Paulo

SF → Tokyo

NYC → London

COBE v2

1 / 13

COBE: The 5KB WebGL globe

GitHub/@shuding/Tech Details →

`Add cobe@latest (https://cobe.vercel.app) to my app.`Copy

## Usage

```
import createGlobe from 'cobe'

const globe = createGlobe(canvas, {
  devicePixelRatio: 2,
  width: 600 * 2,
  height: 600 * 2,
  phi: 0,
  theta: 0.2,
  dark: 0,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [1, 1, 1],
  markerColor: [0.2, 0.4, 1],
  glowColor: [1, 1, 1],
  markers: [
    { location: [37.78, -122.44], size: 0.03, id: 'sf' },
    { location: [40.71, -74.01], size: 0.03, id: 'nyc' },
  ],
  arcs: [
    { from: [37.78, -122.44], to: [40.71, -74.01] },
  ],
  arcColor: [0.3, 0.5, 1],
  arcWidth: 0.5,
  arcHeight: 0.3,
})

// Animate the globe
let phi = 0
function animate() {
  phi += 0.005
  globe.update({ phi })
  requestAnimationFrame(animate)
}
animate()
```

Works with any framework: React, Vue, Svelte, or vanilla JS.

## API

`createGlobe(canvas, options)` returns an object with `update()` and `destroy()` methods.

### Options

`width`numberrequired

Canvas width in pixels (use width \* 2 for retina)

`height`numberrequired

Canvas height in pixels (use height \* 2 for retina)

`phi`numberrequired

Horizontal rotation angle in radians (0 to 2π)

`theta`numberrequired

Vertical tilt angle in radians (-π/2 to π/2)

`dark`numberrequired

Land darkness: 0 = light mode, 1 = dark mode

`diffuse`numberrequired

Diffuse lighting intensity (typically 0.5 to 3)

`mapSamples`numberrequired

Number of dots rendering the map (1000 to 100000)

`mapBrightness`numberrequired

Brightness of land dots (1 to 20)

`mapBaseBrightness`number

Base brightness for ocean areas (0 to 1)

`baseColor`[r,g,b]

Globe base color, values 0-1 (e.g. [1, 1, 1] = white)

`markerColor`[r,g,b]

Default marker color, values 0-1

`glowColor`[r,g,b]

Atmospheric glow color around the globe

`markers`Marker[]

{ location: [lat, lon], size, color?, id? }

`arcs`Arc[]

{ from: [lat, lon], to: [lat, lon], color?, id? }

`arcColor`[r,g,b]

Default arc color, values 0-1

`arcWidth`number

Arc line thickness (0.1 to 2)

`arcHeight`number

Arc curve height above globe (0.1 to 0.5)

`markerElevation`number

Marker height above surface (0 to 0.2)

`scale`number

Globe scale multiplier (default 1)

`offset`[x,y]

Pixel offset from center [x, y]

`opacity`number

Globe opacity (0 to 1)

`devicePixelRatio`number

Pixel density (use 2 for retina displays)

`context`WebGLContextAttributes

WebGL context options (antialias, alpha, etc.)

### Returned Methods

`update(state)`function

Updates globe state and triggers a re-render. Pass any options to update.

`destroy()`function

Releases WebGL context and stops rendering. Call when unmounting.

## Recipes

```
const globe = createGlobe(canvas, { phi: 0, ... })

let phi = 0
function animate() {
  phi += 0.005 // Adjust speed as needed
  globe.update({ phi })
  requestAnimationFrame(animate)
}
animate()
```

Call `globe.update()` in a `requestAnimationFrame` loop for continuous rotation. Use smaller values (0.001-0.003) for subtle movement, larger values (0.01+) for faster spins.

## Markers & Arcs

```
markers: [
  // Basic marker
  { location: [37.78, -122.44], size: 0.03 },
  // With custom color (RGB 0-1)
  { location: [51.51, -0.13], size: 0.05, color: [1, 0, 0] },
  // With id for CSS anchoring
  { location: [35.68, 139.65], size: 0.04, id: 'tokyo' }
]
```

Place dots on the globe using `[latitude, longitude]`. Size is relative to globe radius (0.01-0.1). Colors override the global `markerColor`.

## Custom Labels

Use CSS Anchor Positioning to attach labels, tooltips, or any DOM element to markers and arcs.

```
// 1. Define markers with IDs
const markers = [
  { id: 'sf', location: [37.78, -122.44], label: 'San Francisco' },
  { id: 'tokyo', location: [35.68, 139.65], label: 'Tokyo' },
]

// 2. Pass to COBE (label is your custom property)
createGlobe(canvas, {
  markers: markers.map(m => ({
    location: m.location, size: 0.03, id: m.id
  })),
})

// 3. Render labels anchored to markers
{markers.map(m => (
  <div
    key={m.id}
    className="marker-label"
    style={{
      positionAnchor: `--cobe-${m.id}`,
      opacity: `var(--cobe-visible-${m.id}, 0)`
    }}
  >
    {m.label}
  </div>
))}
```

```
.marker-label {
  position: absolute;
  bottom: anchor(top);
  left: anchor(center);
  translate: -50% 0;
  margin-bottom: 8px;
  padding: 0.25rem 0.5rem;
  background: #1a1a1a;
  color: #fff;
  font-size: 0.75rem;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.3s;
}
```

COBE creates `--cobe-{id}` anchor and `--cobe-visible-{id}` visibility variable for each marker with an ID. The visibility is 1 when facing the camera, 0 when hidden.

## Playground

Experiment with different options in real-time. Adjust the controls below to see how they affect the globe.

San Francisco

New York

London

Tokyo

Sydney

Singapore

Dubai

São Paulo

Cape Town

phi `0.00`

theta `0.20`

ThemeDefault (Light)Dark ModeMinimalNeon

MarkersWorld CitiesUS OfficesFlight RoutesData Centers

dark `0.00`

diffuse `1.2`

mapSamples `16000`

mapBrightness `6.0`

mapBaseBrightness `0.00`

scale `1.00`

offset[0] `0`

offset[1] `0`

markerSize `0.040`

markerElevation `0.00`

arcHeight `0.25`

arcWidth `0.40`

Show Arcs

Auto Rotate
