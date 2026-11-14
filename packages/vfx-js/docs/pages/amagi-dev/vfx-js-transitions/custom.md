<!-- source: https://amagi.dev/vfx-js-transitions/custom -->

# Custom Transitions

A transition is a class. Most are one fragment of GLSL that defines `vec4 transition(vec2 uv, float t)`. VFX-JS adds the prelude, the textures and `main`.

## ShaderTransition

Extend it and set a `name` and the `frag`. Params come in through the constructor and are typed. Turn them into uniforms in `uniforms()`, which runs every frame. Use the class anywhere a preset goes.

`readFrom` and `readTo` swap when `reverse` is true, so write only the forward animation.

wipe.ts

```
import { ShaderTransition } from "@vfx-js/core";

export class Wipe extends ShaderTransition<{ softness?: number }> {
  name = "wipe";
  frag = `
uniform float softness;
vec4 transition(vec2 uv, float t) {
  float m = smoothstep(t - softness, t + softness, uv.x);
  return mix(readTo(uv), readFrom(uv), m);
}
`;
  uniforms() {
    return { softness: this.params.softness ?? 0.05 };
  }
}

t.run(swap, { transition: Wipe, params: { softness: 0.1 } });
```

## What the prelude gives you

**`readFrom(p)`**:   The content you leave, with premultiplied alpha. Transparent black outside [0, 1].

**`readTo(p)`**:   The content you enter, with premultiplied alpha. Return premultiplied color too.

**`inRange(p)`**:   Whether p is inside [0, 1]. Guard with it when you wrap or shift uv, so a container overflow doesn't draw outside the element.

**`t`**:   Progress, 0 → 1, eased (smoothstep by default).

**`resolution`**:   Element size in physical px.

**`time`**:   Seconds since VFX-JS started.

**`reverse`**:   1.0 when playing in reverse. You rarely need it.

## Draw outside the box

By default a transition draws only inside the element. Set `overflow` to `true` for the whole canvas, or a number for CSS px on every side. Then `uv` goes below 0 and above 1 outside the element.

The run's options win over the class's own value. This site passes `overflow: 0` on the page outlet, so zooms never cover the header.

zoom.ts

```
export class Zoom extends ShaderTransition {
  name = "zoom";
  overflow = true as const;
  frag = `
vec4 transition(vec2 uv, float t) {
  vec2 uv1 = (uv - 0.5) * (1.0 - t) + 0.5;
  vec2 uv2 = (uv - 0.5) / (t * 0.999 + 0.001) + 0.5;
  vec4 to = inRange(uv) ? readTo(fract(uv2)) : vec4(0.0);
  return mix(readFrom(uv1), to, t);
}
`;
}
```

## Hooks

A transition is also an effect, so it gets the effect hooks plus a few for the run. Some looks need more than one shader, like a datamosh or a pixel sort. For those, write a class that implements `Transition` directly.

**`constructor(params)`**:   Core calls new Class(params) once per container. Later runs with the same class and equal params reuse the instance.

**`init(ctx), dispose()`**:   When the instance joins and leaves a container.

**`start(run)`**:   Once per run, while the old content is held.

**`update(ctx)`**:   Every frame while the animation plays. Read ctx.progress: t is eased, x is linear.

**`render(ctx)`**:   Every frame of the run. ctx.from is the old content, ctx.src the new one. Pass the input through while ctx.holding.

**`end()`**:   Once when the run ends, is dropped or is cancelled.

**`ctx.cut()`**:   Ends the run now and shows the new content.

## State lives on the instance

Each container gets its own instance of a class, so keep per-run state on `this`. Call `super.start(run)` when you override `start` on a `ShaderTransition`.

flash.ts

```
import { ShaderTransition, type TransitionRun } from "@vfx-js/core";

export class Flash extends ShaderTransition {
  name = "flash";
  frag = `
uniform vec3 tint;
vec4 transition(vec2 uv, float t) {
  vec4 c = mix(readFrom(uv), readTo(uv), t);
  return c + vec4(tint * sin(t * 3.141593), 0.0) * c.a;
}
`;
  #tint: [number, number, number] = [1, 1, 1];

  start(run: TransitionRun) {
    super.start(run);
    // A new color on every run.
    this.#tint = [Math.random(), Math.random(), Math.random()];
  }
  uniforms() {
    return { tint: this.#tint };
  }
}
```

## Build on an effect

A class that implements `Transition` can extend any effect from `@vfx-js/effects`. They follow the Effect API. The effect sees the new content as `ctx.src` and the old one as `ctx.from`.

sort-in.ts

```
import type { Transition, TransitionEffectContext } from "@vfx-js/core";
import { PixelSortEffect } from "@vfx-js/effects";

// The new content sorts out of streaks.
export class SortIn extends PixelSortEffect implements Transition {
  name = "sort-in";
  constructor() {
    super({ range: [1, 1] });
  }
  start() {
    this.params.range[0] = 1;
  }
  update(ctx: TransitionEffectContext) {
    this.params.range[0] = ctx.progress.t;
  }
}
```
