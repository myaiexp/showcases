<!-- source: https://amagi.dev/vfx-js/how-it-works/ -->

Your system asks for reduced motion, so
VFX-JS draws nothing. Demos on this site
show plain HTML.

# How it Works

VFX-JS draws your elements with WebGL, on one canvas over the page. When
you call `vfx.add(el)`:

1. **Capture.** VFX-JS copies the element into a WebGL texture.
2. **Hide.** It sets the element's opacity to 0. The element keeps its box in the layout.
3. **Track.** Every frame, it reads the element's position and size.
4. **Draw.** It runs the shader in that box, on one canvas over the page.

## The DOM stays DOM



* `new VFX()` adds one `<canvas>` to
  `<body>`, or to the `wrapper` you pass.
  It has `pointer-events: none` and
  `z-index: 9999` by default.
* The element stays where it is. Only its `opacity` changes.
  A video gets 0.0001, not 0, to avoid jank frames.
  `addHTML` wraps the element in a canvas instead.
* Clicks, links, text selection, focus and screen readers still use
  the real element. CSS layout and animations still move it, and the
  effect follows.

This button is drawn by a shader. Click it.

The click reaches the real button. The handler then calls
`vfx.update(button)`, because text is captured once.
See Element capture.

main.ts

```
vfx.add(el, { shader: "rgbShift" });               // hide the element (default)
vfx.add(el, { shader: "rgbShift", overlay: true }); // keep it visible
vfx.add(el, { shader: "rgbShift", overlay: 0.5 });  // set its opacity

vfx.remove(el); // stop drawing and restore the opacity
```

## Element capture

Each element type becomes a texture in its own way. This decides when
you need `vfx.update(el)`.

| Element | How it is captured | After a change |
| --- | --- | --- |
| `<img>` | Loaded once, after the image loads. A .gif URL plays frame by frame. | Call update(img) after you change src. |
| `<video>` | Read again every frame. VFX-JS waits for canplay first. | Nothing to do. |
| `<canvas>` | Copied once, when added. | Call update(canvas) after you draw. |
| Text and other elements | Drawn to an image through SVG <foreignObject>, once. | Call update(el) after the content changes. A window resize that changes its size captures it again. |
| `addHTML(el)` | html-in-canvas. The browser paints the element into a canvas each time it changes. | Live. Falls back to the text path where not supported. |

main.ts

```
import { supportsHtmlInCanvas } from "@vfx-js/core";

// Text is a snapshot. Capture it again after a change.
label.textContent = "Saved";
await vfx.update(label);

// html-in-canvas keeps the capture live: hover, inputs, CSS animations.
if (supportsHtmlInCanvas()) {
    await vfx.addHTML(card, { shader: "rgbShift" });
}
```

* html-in-canvas is a new browser API. Today it works only in Chrome
  behind `chrome://flags/#canvas-draw-element`.
  `addHTML` logs a warning and uses the text path where it
  is missing.
* `addHTML` wraps the element in a
  `<canvas>` and copies its box onto it once. The
  element's width must not depend on its content: it fills its
  parent or has a fixed width. Its height must come from its
  content or its own CSS, not from a stretching parent. The styles
  that size or place it must not change while it is wrapped, and
  its styles must not depend on its parent or element type. If an
  element can't meet these, put the layout on a plain wrapper and
  let the element fill it.
* Images and videos from another origin need CORS, or WebGL cannot
  read them.

## Overflow

A shader draws only inside the element's box. To draw outside it, for
glow or glitch, give it more room.



* With a shader, set `overflow`. In the extra area,
  `uv` goes below 0 and above 1.
* The texture has nothing outside the element, but
  `wrap` defaults to `"repeat"`. Check
  `uv` before you read `src` there, or set
  `wrap: "clamp"`.
* Effects ignore `overflow`. Each effect sets its own room
  with `outputRect`. In an effect, `uvContent`
  is 0..1 over the element, and the rest is padding.

main.ts

```
vfx.add(el, { shader, overflow: 50 });               // 50 px on every side
vfx.add(el, { shader, overflow: [0, 100, 200, 0] }); // top, right, bottom, left
vfx.add(el, { shader, overflow: true });             // the whole canvas

// Effects ignore overflow. Some built-in effects, like BloomEffect, take a pad param.
vfx.add(el, { effect: new BloomEffect({ pad: 100 }) });
```

Code that reads the extra area is in
Custom Shaders and Custom Effects.

## Scroll and visibility

* Every frame, VFX-JS checks each element's box, plus its overflow,
  against the viewport. Elements out of view are skipped. They cost
  no GPU time.
* The canvas is a bit bigger than the viewport (10% on each side by
  default) and moves with the page. So fast scrolling does not show
  a gap. Set `scrollPadding` to change it, or
  `false` for a fixed canvas.
* The `intersection` option sets when the element counts
  as "in view": `threshold` (0 to 1) and
  `rootMargin`, like `IntersectionObserver`.
  `leaveThreshold` sets when it leaves (default:
  `threshold`). `duration` sets the enter and
  leave time in seconds (default: 1).
* The visible ratio divides by the smaller of the element size and
  the viewport size, on each axis. So an element taller than the
  viewport can still reach 1.
* This drives the `intersection`,
  `enterProgress`, `leaveProgress`,
  `enterTime` and `leaveTime` uniforms.

Scroll this image in and out. It fades in when it enters and out when
it leaves, and color fills in as more of it is in view.

shader.frag

```
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float intersection;  // 0..1, how much of the element is in view
uniform float enterProgress; // 0..1 after it enters
uniform float leaveProgress; // 0..1 after it leaves
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 color = texture(src, uv);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    // Color fills in from the left as more of the element is in view.
    float colored = step(uv.x, intersection);
    color.rgb = mix(vec3(gray), color.rgb, colored);

    // Fade in on enter, out on leave. Turns back if you scroll back mid-way.
    outColor = color * enterProgress * (1.0 - leaveProgress);
}
```




main.ts

```
vfx.add(img, {
    shader,
    // Enter when half of it is in view, and leave when less than half is.
    intersection: { threshold: 0.5, duration: 0.8 },
});
```

## Uniforms and timing

VFX-JS sets these uniforms for each element. Declare only the ones you
use.

| Uniform | Meaning |
| --- | --- |
| `sampler2D src` | The element texture. |
| `vec2 resolution` | Element size in physical px. |
| `vec2 offset` | Element origin in the render target, physical px. |
| `vec4 viewport` | Render target rect (x, y, w, h) in physical px. |
| `float time` | Seconds since the element was added. |
| `vec2 mouse` | Mouse position in render target px, same space as gl\_FragCoord. |
| `float intersection` | How much of the element is in the viewport, 0 to 1. |
| `float enterTime` | Seconds since the element entered the viewport. |
| `float leaveTime` | Seconds since the element left the viewport. |
| `float enterProgress` | Enter transition, 0 to 1. Plays backward if the element leaves mid-way. |
| `float leaveProgress` | Leave transition, 0 to 1. Stays 0 until enter finishes. |
| `bool autoCrop` | The autoCrop option. Default true. |
| `sampler2D backbuffer` | The previous frame. Needs backbuffer: true. |

* `uv = (gl_FragCoord.xy - offset) / resolution` gives
  element space: (0, 0) is bottom-left, (1, 1) is top-right.
* Use `enterProgress` and `leaveProgress` for
  enter and leave animations. They turn back smoothly when the user
  scrolls back mid-way. Use `enterTime` and
  `leaveTime` for animations timed in seconds.
* Your own `uniforms` can be functions. They run every
  frame, only while the element is drawn.
* Effects get the same values on `ctx`:
  `ctx.time`, `ctx.deltaTime`,
  `ctx.mouse`, `ctx.intersection`,
  `ctx.enterProgress`, `ctx.leaveProgress`,
  `ctx.enterTime`, `ctx.leaveTime`.

`time` comes from the VFX clock, not the wall clock. You
can pause it, slow it down, or pin it for stable screenshots.

main.ts

```
const vfx = new VFX({ autoplay: false });
await vfx.add(el, { shader });

vfx.setTime(1.5); // pin the clock to 1.5 s
vfx.render();     // draw one frame

vfx.timeScale = 0.5; // half speed. 0 pauses, negative runs backward.
vfx.play();
```

## Limits

* Browser only, and WebGL is required. `new VFX()` throws
  without it. `VFX.init()` returns `null` instead.
  Either way the page stays plain HTML.
* With `prefers-reduced-motion: reduce`, VFX-JS draws
  nothing. Elements stay plain HTML, and transitions cut. It is
  checked once, when `VFX` is created.
* All effects draw on one canvas, at one z-index. Page content cannot
  sit between two effects. Use the `zIndex` option to order
  effects inside the canvas.
* The canvas does not know about CSS clipping. An element hidden by a
  parent's `overflow: hidden` or a scroll box is still
  drawn.
* VFX-JS owns the element's inline `opacity` while it is
  added. Use `overlay` instead of setting it yourself.
* Text, other elements and `<canvas>` are snapshots.
  Call `vfx.update(el)` after they change.
* Each `VFX` has its own WebGL context. Make one per page
  and reuse it.
* `shader` and `effect` can't be used together.
  Make a new `Effect` instance for each element.
