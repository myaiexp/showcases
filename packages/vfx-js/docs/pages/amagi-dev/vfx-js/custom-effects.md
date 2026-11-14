<!-- source: https://amagi.dev/vfx-js/custom-effects/ -->

Your system asks for reduced motion, so
VFX-JS draws nothing. Demos on this site
show plain HTML.

# Custom Effects

An effect is a class with a few hooks. It can draw many passes, keep
buffers across frames, use your own textures, and draw outside the
element. Every effect in
@vfx-js/effects is built this way.

For a single shader, Custom Shaders is
simpler. Use an effect when you want to reuse it, chain it, or share it as
a package.

## The Effect interface

Every member is optional.

Effect

```
interface Effect {
    enabled?: boolean;
    init?(ctx: EffectContext): void | Promise<void>;
    update?(ctx: EffectContext): void;
    render?(ctx: EffectContext): void;
    dispose?(): void;
    outputRect?(dims: EffectDims): [x, y, w, h] | undefined;
}
```

Pass an instance as `effect` to `vfx.add`. The
types come from `@vfx-js/core`.

main.ts

```
import { VFX } from "@vfx-js/core";
import { WaveEffect } from "./wave-effect";

const vfx = new VFX();
await vfx.add(img, { effect: new WaveEffect() });

// An array runs as a chain. Each effect reads the one before.
await vfx.add(img, { effect: [new WaveEffect(), new TrailEffect()] });
```

`shader` and `effect` don't mix. If you set both,
`effect` wins.

## Lifecycle hooks

| Hook | When and what |
| --- | --- |
| `init(ctx)` | Once, when the effect is added. Make render targets and wrap textures here. Can be async; vfx.add waits for it. |
| `update(ctx)` | Every frame, before render. Change state here. ctx.draw does nothing here. |
| `render(ctx)` | Every frame. Draw with ctx.draw and ctx.blit. Without render, the input passes through. |
| `dispose()` | Once, when the element is removed. Drop your references. |
| `outputRect(dims)` | The rect this effect draws into. Omit it to keep the input size. |
| `enabled` | Set false to skip render. Checked every frame. init and update still run. |

Every hook gets the same `ctx`. Its fields change every
frame:

| Field | Value |
| --- | --- |
| `time, deltaTime` | Seconds since start, and since the last frame. |
| `src` | The input texture: the element, or the effect before. |
| `target` | This effect's output. null means the canvas. |
| `dims` | Sizes in px. See below. |
| `mouse, mouseViewport` | Mouse in element px and canvas px, bottom-left origin. |
| `intersection, enterProgress, leaveProgress, enterTime, leaveTime` | Scroll position and timing, like in shaders. |
| `uniforms` | The uniforms option of vfx.add, evaluated every frame. |
| `resolution, pixelRatio` | Canvas size in physical px, and the pixel ratio. |
| `gl` | The raw WebGL2 context. |

This effect uses `update` and `render`.
`update` eases a value toward `params.amount`.
`render` draws a wave with it. Move the slider:

wave-effect.ts

```
import type { Effect, EffectContext } from "@vfx-js/core";

const frag = `#version 300 es
precision highp float;
in vec2 uvContent;
out vec4 outColor;
uniform sampler2D src;
uniform vec4 srcRectUv;
uniform float time;
uniform float amount;

void main() {
    vec2 uv = uvContent;
    uv.x += sin(uv.y * 12.0 + time * 3.0) * 0.04 * amount;
    if (uv.x < 0.0 || uv.x > 1.0) {
        outColor = vec4(0);
        return;
    }
    // Map element uv to src uv.
    outColor = texture(src, srcRectUv.xy + uv * srcRectUv.zw);
}
`;

export type WaveParams = {
    amount: number;
};

export class WaveEffect implements Effect {
    params: WaveParams;
    #amount = 0;

    constructor(params: Partial<WaveParams> = {}) {
        this.params = { amount: 1, ...params };
    }

    update(ctx: EffectContext) {
        // Ease toward params.amount, so changes look smooth.
        const k = 1 - Math.exp(-ctx.deltaTime * 8);
        this.#amount += (this.params.amount - this.#amount) * k;
    }

    render(ctx: EffectContext) {
        ctx.draw({
            frag,
            uniforms: { src: ctx.src, time: ctx.time, amount: this.#amount },
            target: ctx.target,
        });
    }
}
```

amount

## Drawing

Draw in `render` with `ctx.draw`. It runs a
fragment shader over a quad. Pass `ctx.src` as a uniform to
read the input, and set `target: ctx.target` to write the
output.

EffectContext

```
ctx.draw({
    frag,                // GLSL ES 3.0 fragment shader
    vert,                // optional; the default gives uv, uvContent, uvSrc
    uniforms,            // numbers, arrays, textures, render targets
    target,              // ctx.target, or a render target
    blend,               // "premultiplied" | "none" | "additive" | "normal"
    geometry,            // ctx.quad (default) or your own geometry
    swap,                // persistent targets: false keeps the same buffer
});

ctx.blit(source, target); // copy a texture
ctx.clear(target);        // clear a render target
```

The default vertex shader gives three `in vec2` values,
all 0..1:

| Name | Range |
| --- | --- |
| `uvSrc` | 0..1 over src. Use it to read src as is. |
| `uvContent` | 0..1 over the element. Outside 0..1 is the padding. |
| `uv` | 0..1 over the whole output, padding included. |

In a chain, `src` can be bigger than the element, when the
effect before has padding. To move pixels around, work in
`uvContent` and map it to src with `srcRectUv`,
like the effects in `@vfx-js/effects` do:

GLSL

```
uniform vec4 srcRectUv; // set for you

vec4 readSrc(vec2 p) { // p: element uv
    if (p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0) return vec4(0);
    return texture(src, srcRectUv.xy + p * srcRectUv.zw);
}
```

### Render targets

Make render targets in `init` and reuse them every frame.
Draw to one, then pass it as a uniform to read it in the next draw.
VFX-JS frees them when the effect is removed.

EffectContext

```
ctx.createRenderTarget({
    size,        // [w, h] physical px; omit to follow the output size
    float,       // float buffer, for values outside 0..1
    persistent,  // two buffers: read the last frame, write the next
    wrap,        // "clamp" (default) | "repeat" | "mirror"
    filter,      // "linear" (default) | "nearest"
    mipmap,      // true | "manual"
});
```

A `persistent` target has two buffers. As a uniform, it
reads the last frame. As a target, it writes the next one. They swap
after each draw.

### Drawing outside the element

The `overflow` option does not apply to effects. Return a
bigger rect from `outputRect` instead. It is
`[x, y, w, h]` in physical px, relative to the element's
bottom-left corner. Return `dims.canvasRect` to cover the
whole canvas.

| dims | Value |
| --- | --- |
| `element, elementPixel` | Element size in CSS px and physical px. |
| `canvas, canvasPixel` | Canvas size in CSS px and physical px. |
| `pixelRatio` | Device pixel ratio. |
| `contentRect` | The element rect: [0, 0, w, h]. |
| `srcRect` | The rect of src: the output rect of the effect before. |
| `canvasRect` | The canvas rect, relative to the element. |

This effect keeps a trail in a persistent target, and pads its output
by 60px so the trail can leave the element:

trail-effect.ts

```
import type {
    Effect,
    EffectContext,
    EffectDims,
    EffectRenderTarget,
} from "@vfx-js/core";

const trailFrag = `#version 300 es
precision highp float;
in vec2 uv;
in vec2 uvContent;
out vec4 outColor;
uniform sampler2D src;
uniform sampler2D prev;
uniform vec4 srcRectUv;
uniform vec2 shift;

vec4 readSrc(vec2 p) {
    if (p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0) return vec4(0);
    return texture(src, srcRectUv.xy + p * srcRectUv.zw);
}

void main() {
    vec4 color = readSrc(uvContent - shift);
    // Fade the last frame and shift its color.
    vec4 last = texture(prev, uv) * vec4(0.9, 0.8, 0.96, 0.96);
    outColor = max(color, last);
}
`;

const copyFrag = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 outColor;
uniform sampler2D buffer;

void main() {
    outColor = texture(buffer, uv);
}
`;

export class TrailEffect implements Effect {
    #buffer: EffectRenderTarget | null = null;

    init(ctx: EffectContext) {
        // Keeps the last frame. Follows the output size.
        this.#buffer = ctx.createRenderTarget({ persistent: true });
    }

    render(ctx: EffectContext) {
        if (!this.#buffer) {
            return;
        }
        const t = ctx.time * 2;
        ctx.draw({
            frag: trailFrag,
            uniforms: {
                src: ctx.src,
                prev: this.#buffer, // read: last frame
                shift: [Math.cos(t) * 0.12, Math.sin(t) * 0.12],
            },
            target: this.#buffer, // write: this frame
        });
        ctx.draw({
            frag: copyFrag,
            uniforms: { buffer: this.#buffer },
            target: ctx.target,
        });
    }

    // Draw 60 CSS px outside the element on every side.
    outputRect(dims: EffectDims) {
        const pad = 60 * dims.pixelRatio;
        const [, , w, h] = dims.contentRect;
        return [-pad, -pad, w + pad * 2, h + pad * 2] as const;
    }

    dispose() {
        this.#buffer = null;
    }
}
```

## Textures

`ctx.src` and your own textures are
`EffectTexture` handles. Pass them as uniforms. Use
`width` and `height` for their size in px.

`ctx.wrapTexture` turns an image, canvas, video,
`ImageBitmap`, `OffscreenCanvas` or
`WebGLTexture` into a texture. Call it once in
`init`.

my-effect.ts

```
init(ctx: EffectContext) {
    this.image = ctx.wrapTexture(imageElement);
    this.video = ctx.wrapTexture(videoElement); // updates every frame
}

render(ctx: EffectContext) {
    ctx.draw({ frag, uniforms: { src: ctx.src, image: this.image }, target: ctx.target });
}
```

* Videos and canvases upload every frame. Other sources upload once.
  Change this with `autoUpdate`.
* With `autoUpdate: false`, call
  `texture.update()` after the source changes. It uploads
  again on the next draw.
* Call `texture.dispose()` when you replace a texture.
  The rest are freed when the effect is removed.
* A `WebGLTexture` needs `size`, and
  `update()` does nothing for it.

This effect tints the element with an 8×4 canvas. The canvas changes
only on click, so it skips the upload on other frames. Click the logo:

tile-effect.ts

```
import type { Effect, EffectContext, EffectTexture } from "@vfx-js/core";

const frag = `#version 300 es
precision highp float;
in vec2 uvSrc;
in vec2 uvContent;
out vec4 outColor;
uniform sampler2D src;
uniform sampler2D tiles;

void main() {
    vec4 color = texture(src, uvSrc);
    vec3 tint = texture(tiles, uvContent).rgb;
    outColor = vec4(color.rgb * tint, color.a);
}
`;

export class TileEffect implements Effect {
    #canvas = document.createElement("canvas");
    #texture: EffectTexture | null = null;

    constructor() {
        this.#canvas.width = 8;
        this.#canvas.height = 4;
        this.#paint();
    }

    init(ctx: EffectContext) {
        // A canvas updates every frame by default. Turn it off.
        this.#texture = ctx.wrapTexture(this.#canvas, {
            autoUpdate: false,
            filter: "nearest",
        });
    }

    /** Paint new colors, then upload them once. */
    shuffle() {
        this.#paint();
        this.#texture?.update();
    }

    render(ctx: EffectContext) {
        if (!this.#texture) {
            return;
        }
        ctx.draw({
            frag,
            uniforms: { src: ctx.src, tiles: this.#texture },
            target: ctx.target,
        });
    }

    dispose() {
        this.#texture?.dispose();
        this.#texture = null;
    }

    #paint() {
        const c = this.#canvas.getContext("2d");
        if (!c) {
            return;
        }
        for (let x = 0; x < this.#canvas.width; x++) {
            for (let y = 0; y < this.#canvas.height; y++) {
                c.fillStyle = `hsl(${Math.random() * 360} 90% 65%)`;
                c.fillRect(x, y, 1, 1);
            }
        }
    }
}
```

## Params

Keep settings in a public `params` object and read it in
`render`. Then you can change them any time, with no
re-init. The effects in `@vfx-js/effects` work this way. The
slider in the wave demo sets
`params.amount`.

main.ts

```
export class WaveEffect implements Effect {
    params: WaveParams;

    constructor(params: Partial<WaveParams> = {}) {
        this.params = { amount: 1, ...params };
    }

    render(ctx: EffectContext) {
        // Read params every frame.
        ctx.draw({ frag, uniforms: { amount: this.params.amount /* ... */ } });
    }
}

const wave = new WaveEffect({ amount: 0.5 });
await vfx.add(img, { effect: wave });

slider.oninput = () => {
    wave.params.amount = slider.valueAsNumber;
};
```

To change the chain itself, toggle `enabled` or call
`vfx.updateEffects`:

main.ts

```
// Turn one effect off and on. It keeps its buffers.
wave.enabled = false;

// Swap the chain. Effects you keep keep their state.
await vfx.updateEffects(img, [wave, new TrailEffect()]);
```

## As a post effect

Effects also run over the whole canvas, after all elements are drawn.
Pass them as `postEffect.effect` to `new VFX()`.

main.ts

```
import { VFX } from "@vfx-js/core";
import { VignetteEffect } from "@vfx-js/effects";

const vfx = new VFX({
    postEffect: { effect: new VignetteEffect({ intensity: 0.8 }) },
});

// An array works too.
new VFX({ postEffect: { effect: [new WaveEffect(), new VignetteEffect()] } });
```

* `src` is the whole canvas.
* There is no element, so `dims.element` is the canvas
  size and `contentRect` is `canvasRect`.
* No live demo here, since it would change every demo on this page.

## Tips

* Effects keep state, so don't share one instance between elements.
  Use a factory.

main.ts

```
// One instance per element.
const makeEffect = () => new WaveEffect({ amount: 0.5 });

for (const img of document.querySelectorAll("img")) {
    vfx.add(img, { effect: makeEffect() });
}
```

* Render targets, wrapped textures and geometries are freed for you.
  In `dispose`, drop your references.
* Things you make with `ctx.gl` are yours. Free them in
  `dispose`, and rebuild them in
  `ctx.onContextRestored(cb)`.
* Use `ctx.dims` for sizes. Don't read DOM sizes in
  `render`.
* `ctx.draw` in `update` is ignored. Draw in
  `render`.
* For bigger examples, read
  packages/effects/src.
  `hue-shift.ts` and `pixelate.ts` are short.
  `bloom.ts` uses render targets and
  `outputRect`.
