<!-- source: https://amagi.dev/vfx-js-transitions/how-it-works -->

# How It Works

before

```
<main class="outlet">
  <PageA />
</main>
```

run(cb)

run

```
<canvas layoutsubtree>
  <main class="outlet">
    <PageB />
  </main>
</canvas>
```

The snapshot of A is `readFrom`, the live capture of B is `readTo`. The shader mixes them on the VFX canvas while the real DOM is already B. With `keepPlaying`, A keeps playing: its nodes move to a hidden canvas that is captured every frame.

t = 1

after

```
<main class="outlet">
  <PageB />
</main>
```

1. **Snapshot.** VFX-JS captures the element's current content into a texture. The old page is held on screen.
2. **Swap.** Your callback changes the DOM. Any change works: a router swap, setState, innerHTML. With slides already in the DOM, show(slide) writes it for you.
3. **Capture.** After images, videos and fonts load, VFX-JS captures the new content.
4. **Shade.** A fragment shader mixes the two textures while t goes from 0 to 1.

## The DOM stays DOM

At rest the element is your plain markup. VFX-JS wraps it only while a run is in flight, then unwraps it. Text stays selectable, links stay clickable, and screen readers see the real page.

With html-in-canvas the capture uses `drawElementImage`. Without it, VFX-JS falls back to dom-to-canvas, a workaround that misses some content. See Browser support.

## Easing

Your shader gets `t` from 0 to 1, eased with smoothstep by default. Set `ease` to `"linear"` or a function `(x) => t` to change it. A spec's `ease` wins over the transition's own.

`TransitionEffect` hooks get both the eased `ctx.progress.t` and the linear `ctx.progress.x`, plus `ctx.deltaTime` in seconds.

With `reverse: true`, `readFrom` and `readTo` swap and t plays backward. You only write the forward animation.

## Fixed size, shared box

Give the target a fixed size: a viewport-sized outlet, a tab panel with a height, a slide stage. Old and new content then share one box, and the shader only mixes pixels.

Pages can still scroll *inside* the box. This site does that: the outlet is fixed and each page scrolls on its own.

style.css

```
.outlet {
  height: 100dvh;
  overflow: hidden;
}
.page {
  height: 100%;
  overflow-y: auto;
}
```

## Which spec wins

Each field of a run is picked in this order:

1. The `RunOpts` passed to `run()`
2. The options from `addTransition` or the component props
3. For `ease` and `overflow`, the transition's own value, then the default

A run that sets its own `transition` drops the container's `params`, so they never reach the wrong class.

With a router `<VFXTransition>`, the run's `RunOpts` is one whole spec: a link spec or `setNextTransition()` if set, else the incoming page's `<TransitionIn>`. The two are not merged.

spec.ts

```
const t = vfx.addTransition(outlet, { transition: Crossfade });

// Keep a spec in a variable and pass it to run().
const back = { transition: Swipe, reverse: true };

t.run(swap, back);
t.run(swap, { duration: 2 }); // Crossfade, 2 s
```

Next**Limitations →**Build**Your own shader →**
