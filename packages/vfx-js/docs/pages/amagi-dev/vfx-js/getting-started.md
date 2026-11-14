<!-- source: https://amagi.dev/vfx-js/getting-started/ -->

Your system asks for reduced motion, so
VFX-JS draws nothing. Demos on this site
show plain HTML.

# Getting Started

VFX-JS draws HTML elements with WebGL shaders. You pick an element and a
shader. The element keeps its place in the layout.

## Install

Install the core package from npm:

Terminal

```
npm i @vfx-js/core
```

Without a bundler, load it from a CDN (esm.sh or jsDelivr). This works in CodePen too.

index.html

```
<script type="module">
    import { VFX } from "https://esm.sh/@vfx-js/core";
    // or: "https://cdn.jsdelivr.net/npm/@vfx-js/core/+esm"

    const vfx = new VFX();
    vfx.add(document.querySelector("img"), { shader: "glitch", overflow: 100 });
</script>
```

## Your first effect

Make one `VFX` and pass an element to `vfx.add`.

main.ts

```
import { VFX } from "@vfx-js/core";

const vfx = new VFX();
const img = document.querySelector("img");
await vfx.add(img, { shader: "glitch", overflow: 100 });
```

This is the result:

* `shader` takes a preset name like `"glitch"`,
  `"rgbShift"` or `"rainbow"`, or your own
  GLSL. See Effects for the full list.
* `overflow` lets the effect draw outside the element, in
  pixels.
* Make one `VFX` per page and reuse it. Each one has its
  own WebGL canvas.
* `vfx.add` is async. Await it before you call
  `vfx.remove` on the same element.
* Text and other elements are captured once. Call
  `vfx.update(el)` after their content changes.
* `new VFX()` throws when WebGL is not available. Wrap it in
  `try` / `catch` so the page still works as plain
  HTML.
* When the user prefers reduced motion, VFX-JS draws nothing. They see
  the plain HTML.

## Options

The second argument of `vfx.add` takes these options:

| Option | Value | What it does |
| --- | --- | --- |
| `shader` | preset name | GLSL | VFXPass[] | The shader to draw the element with. |
| `effect` | Effect | Effect[] | Effects from @vfx-js/effects or your own, in place of shader. |
| `uniforms` | { name: value | () => value } | Values for your shader. A function runs every frame. |
| `overflow` | px | [top, right, bottom, left] | true | Draw outside the element. true is fullscreen. Shader only. |
| `overlay` | true | number | Keep the original element visible, or set its opacity. |
| `intersection` | { threshold, leaveThreshold, rootMargin, duration } | When the element enters and leaves the viewport, and how long the enter and leave take. |
| `zIndex` | number | Draw order inside the canvas. |
| `wrap` | "repeat" | "clamp" | "mirror" | Texture wrap mode. Default is repeat. |

See VFXProps in the API reference
for all options and defaults.

## Frameworks

Bindings for React, Vue, Svelte and Astro wrap the same
`vfx.add` options. Components on one page share one canvas.

Install

```
npm i @vfx-js/core @vfx-js/react
```




App.tsx

```
import { VFXImg, VFXSpan, VFXVideo } from "@vfx-js/react";

export function App() {
    return (
        <>
            <VFXImg src="cat.png" alt="" shader="rgbShift" />
            <VFXVideo src="clip.mp4" autoPlay muted loop playsInline shader="halftone" />
            <VFXSpan shader="rainbow">Hello</VFXSpan>
        </>
    );
}
```

* Every vfx.add option is a prop: shader, effect, uniforms, overflow, ...
* No provider needed. All components share one canvas.
* Works with Next.js App Router and React Router.

Install

```
npm i @vfx-js/core @vfx-js/vue
```




App.vue

```
<script setup lang="ts">
import { vVfx } from "@vfx-js/vue";
</script>

<template>
    <img v-vfx="{ shader: 'rgbShift' }" src="cat.png" alt="" />
    <h1 v-vfx="{ shader: 'glitch', overflow: 30 }">Hello</h1>
</template>
```

* The directive value is the same object as vfx.add options. null removes the effect.
* Register it for the whole app with app.directive("vfx", vVfx).
* Works with SSR (Nuxt). No <ClientOnly> needed.

Install

```
npm i @vfx-js/core @vfx-js/svelte
```




App.svelte

```
<script lang="ts">
    import { vfx } from "@vfx-js/svelte";
    let shader = $state("rgbShift");
</script>

<img {@attach vfx({ shader: "rgbShift" })} src="cat.png" alt="" />
<h1 {@attach vfx(() => ({ shader }))}>Hello</h1>
```

* Needs Svelte 5.29 or later.
* Pass a getter for options that change.
* Works with SvelteKit.

Install

```
npm i @vfx-js/core @vfx-js/astro
```




index.astro

```
---
import { VFXImg, VFXSpan } from "@vfx-js/astro";
---

<VFXImg src="/cat.png" alt="" shader="rgbShift" />
<VFXSpan shader="glitch" overflow={30}>Hello</VFXSpan>
```

* Needs Astro 5 or later. No framework island.
* Props must fit in HTML: preset names, GLSL strings, plain numbers.
* Register functions and multipass shaders with registerVFX from @vfx-js/astro/client.
