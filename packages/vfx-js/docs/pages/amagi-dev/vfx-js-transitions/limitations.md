<!-- source: https://amagi.dev/vfx-js-transitions/limitations -->

# Limitations

## Browser support

Transitions run in any browser with WebGL. How VFX-JS captures the content depends on the browser.

### With HTML-in-Canvas

The browser draws the element into the canvas itself, with `drawElementImage`, so the capture matches the page. HTML-in-Canvas is still experimental: it is in Chrome Canary, or in Chrome with `chrome://flags/#canvas-draw-element` on.

### Without it

Safari, Firefox and Chrome by default use dom-to-canvas. VFX-JS clones the element, copies its computed styles onto the clone, and draws the clone as an SVG image. This is a workaround, and it can't match the page exactly. Some content doesn't make it into the capture:

* `::before` and `::after`. The clone has no stylesheets.
* Web fonts and CSS background images. An SVG image can't load other files, so text falls back to a local font.
* Cross-origin images served without CORS.
* The content of `<canvas>`, `<video>` and `<iframe>`.
* Content inside shadow roots.

The SVG renderer can also draw some CSS differently from the page. Safari, for example, draws `box-shadow` wrong in the capture. These gaps show only during a run; the page itself is plain DOM before and after.

## Layout of the target

With HTML-in-Canvas, VFX-JS wraps the target in a `<canvas>` during a run and copies the target's box onto it once. The target needs a layout that the canvas can copy:

* Its width doesn't depend on its content. It fills its parent or has a fixed width. A `width: auto` target held in by `max-width` is not supported.
* Its height comes from its content or its own CSS, not from a stretching flex or grid parent.
* The styles that size or place it don't change during the run.
* Its styles don't depend on its parent or its element type. Rules like `.layout > main` or `:nth-child()` stop matching while it is wrapped.

If the target can't meet these, put the layout on a plain wrapper and let the target fill it.

## Reduced motion

VFX-JS doesn't check `prefers-reduced-motion`. Set `duration` to 0 to cut without animation.

main.ts

```
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const t = vfx.addTransition(el, {
  transition: Swipe,
  duration: reduce ? 0 : 0.6,
});
```

## keepPlaying

With `keepPlaying`, VFX-JS moves the old content into a hidden canvas next to the container and captures it every frame. That has costs and side effects.

### One more capture per frame

The old and new content are both captured during the run. Without HTML-in-Canvas, the run uses a snapshot as usual.

### Some selectors stop matching the old content

The hidden canvas holds a copy of the container without its `id`, outside its parent. Rules that reach the old content through `#id`, ancestors (`.layout > main .card`) or siblings don't apply during the run, so it may look different. The hidden canvas also sits next to the container, which can break sibling selectors like `main + footer` for a moment.

### What keeps running depends on the framework

* React: the old page stays mounted, with its state and effects.
* Nuxt and SvelteKit: the old page's DOM keeps playing (CSS animations, videos), but Vue and Svelte stop updating it.
* Astro and `show()`: the old nodes keep running as they are.

### Function opts can't turn it on

With `run(cb, () => opts)`, the spec is known only after `cb`, which is too late to keep the old nodes. Set `keepPlaying` on the container; the function can still turn it off.

### Set it on the component

In React, Nuxt and SvelteKit, set `keepPlaying` on `<VFXTransition>`. A page or link spec can turn it off but not on. The pages then sit in a `display: contents` div, so `.target > .page` needs `.target > div > .page`. Turning it on or off remounts the shown page.

### Framework notes

* Nuxt: `<NuxtPage>` must be a direct child of `<VFXTransition>`, and each page needs one root element. It replaces your own page transition.
* Vue Router: each page needs one root element, and `<RouterView>` must be a direct child of `<VFXTransition>`. Each path change remounts the page, even with the same component. It replaces your own `<Transition>`.
* SvelteKit: each path change remounts the page and its nested layouts.
* `useVFXTransition` doesn't hand the old page over. Call `ctx.keepPlaying()` yourself.

## Other limits

### Nested VFX elements freeze

VFX elements inside the container stop during a run and show their plain content.

### `<body>` can't be the target

Target the router outlet instead, like `<main>`.

### Size changes aren't animated

If the new content has a different size, the box stays at the old size during the run and jumps afterwards.

### One pending click spec per page

All `<VFXTransition>`s on the page share it.

### autoReverse needs the Navigation API

Without `navigation.currentEntry`, back plays like any other navigation, with no reverse. After a reload or in a new tab, no spec is stored yet, so the first back plays its own spec too.

### On back, the stored spec wins

With `autoReverse`, back plays the spec that entered the page, even after `setNextTransition()`.

### Reduced motion cuts

With `prefers-reduced-motion: reduce`, every run cuts to the new content.

### Browser swipes cut

A phone animates a swipe back or forward on its own. The run then cuts to the new page instead of playing a second animation. Browsers without `hasUAVisualTransition` play it as usual.

### No multi-page navigation

Cross-document navigation isn't supported. With Turbo or htmx, call core `run(cb)` by hand.

Next**All presets →**
