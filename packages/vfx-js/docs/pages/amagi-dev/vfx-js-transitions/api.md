<!-- source: https://amagi.dev/vfx-js-transitions/api -->

# API Reference

Core works on any element. The React bindings wrap it for routers. Presets live in `@vfx-js/transitions`. Vue, Svelte and Astro have the same pieces under their own names; see Getting Started.

## vfx.addTransition(element, opts?)

From `@vfx-js/core`. Returns a `TransitionHandle` at once. It touches no DOM until the first run.

core

```
import { VFX } from "@vfx-js/core";
import { Swipe } from "@vfx-js/transitions";

const vfx = new VFX();
const t = vfx.addTransition(el, { transition: Swipe, duration: 0.6 });
```

**`transition: TransitionClass | Transition`**:   A class, or an instance to use as is. Defaults to Crossfade. Core makes one instance of a class per container.

**`params: object`**:   Constructor params for the class. Typed from the class. Not used with an instance.

**`duration: number`**:   Seconds. Defaults to 0.6. 0 cuts without animation.

**`reverse: boolean`**:   Play backwards. readFrom and readTo swap in the shader.

**`ease: "smoothstep" | "linear" | (x) => t`**:   How t follows progress. Defaults to the transition's ease, then smoothstep.

**`overflow: true | number`**:   Room to draw outside the element. true for the whole canvas, a number for CSS px on every side. Defaults to the transition's overflow.

**`keepPlaying: boolean`**:   Keep capturing the old content during the run, so its animations and videos keep playing. Costs one more capture per frame. show() and <VFXTransition> (React, Nuxt, Vue Router, SvelteKit, Astro) hand the old content over; with run(), call ctx.keepPlaying() in cb. See Limitations for caveats. Defaults to false.

**`keepWrapped: boolean`**:   Keep the element wrapped between runs. Saves the wrap cost on frequent runs.

**`waitFor: "media" | "none" | (el) => Promise<void>`**:   What to wait for before the new capture. "media" waits for images, videos and fonts, up to about 300 ms.

**`autoReverse: boolean`**:   On back, play the spec that entered the page, reversed. Forward plays it again. Needs the Navigation API. show() ignores it.

**`slideSpec: (slide) => RunOpts | undefined`**:   How each slide enters with show(). Its fields go over the container's; show() opts go over it.

## TransitionHandle

A new `run` during a run drops the old one. Its callback still runs, so no DOM change is lost.

**`show(slide, opts?)`**:   Shows one direct child and hides the others. slide is an element, an index or a selector. remove: true removes the others instead.

**`run(cb, opts?)`**:   Snapshots the element, calls cb to change the DOM, and plays the transition. Resolves when the animation ends. cb gets a ctx; with keepPlaying, call ctx.keepPlaying(oldNodes) before you drop them. ctx.keepPlaying(nodes, onReturn) puts them back when the run ends instead of removing them.

**`cancel()`**:   Ends the current run and shows the live content.

**`destroy()`**:   Cancels and stops tracking the element.

**`running`**:   True while a run is in flight.

## RunOpts

Each field comes from the first level that sets it: the run, then the container, then the transition (for `ease` and `overflow`).

run

```
t.run(() => render(next), { transition: Glitch, reverse: true });
t.run(() => render(next), { transition: Swipe, params: { direction: "up" } });
t.run((ctx) => {
  ctx.keepPlaying([...el.children]);
  render(next);
}, { keepPlaying: true });
```

**`transition, params, duration, reverse, ease, overflow, keepPlaying`**:   Same as the container options. A run's value wins.

**`params`**:   Merge per key, run over container. A run with its own transition drops the container's params.

**`opts as a function`**:   Called once after cb resolves, so the spec can depend on the new content. It can turn keepPlaying off but not on; set keepPlaying on the container.

## <VFXTransition>

From `@vfx-js/react`. Wrap the router outlet once. Next.js users import it from `@vfx-js/react/next`, where `pageKey` defaults to the pathname.

layout.tsx

```
<VFXTransition pageKey={pathname} transition={Crossfade} duration={0.6}>
  {children}
</VFXTransition>
```

**`pageKey: string | number`**:   Changes per page, e.g. the pathname. A new key starts a run.

**`fullscreen: boolean`**:   Defaults to true: the target is 100dvh tall and scrolls inside. false lets your CSS size it.

**`className, style`**:   Go on the inner div, which is the transition target.

**`...addTransition options`**:   transition, duration, ease, overflow and the rest, as defaults for every run.

## <TransitionIn> and useTransitionIn

The incoming page says how it enters. Only the spec at mount counts. Use the component in Server Components and the hook in client components. From a Server Component, pass the class and plain `params`.

page.tsx

```
<TransitionIn transition={Glitch} params={{ amount: 1.5 }} />
// or, in a client component:
useTransitionIn({ transition: Glitch });
```

## transition(spec)

Returns an `onClick` that stores the spec for the next run. It wins over the page's `<TransitionIn>` and expires after about 10 s. It ignores modified and non-left clicks.

link.tsx

```
<Link href="/about" onClick={transition({ transition: Glitch })}>About</Link>
```

## useVFXTransition(opts?)

For containers you render yourself, like tabs. `run` wraps `cb` in `startTransition` and starts after React commits.

tabs.tsx

```
const { ref, run } = useVFXTransition({ transition: Swipe });

<div ref={ref}>{tab}</div>

await run(() => setTab(next), { reverse: true });
```

## setNextTransition(spec)

For navigation from code. Like a click spec, it wins over the page.

navigate.ts

```
setNextTransition({ transition: Zoom });
router.push("/next");
```

## useTransitionInstance(Class, params?)

Makes one instance and keeps it while the class and params stay equal. Params compare shallowly, so an inline object is fine. New params make a new instance, which applies from the next run. To change a run while it plays, set `fx.params` on the instance.

slider.tsx

```
const fx = useTransitionInstance(Glitch, { amount: 1 });

<VFXTransition pageKey={pathname} transition={fx}>{children}</VFXTransition>
<input type="range" onChange={(e) => (fx.params = { amount: +e.target.value })} />
```

## Transition

What every preset is: an effect object with a few defaults. Write one as a class. An instance runs in one container at a time; pass the class to share it. See Custom for examples.

**`name?: string`**:   A name for logs.

**`ease?: TransitionEase`**:   The t this transition expects. A spec's ease wins.

**`overflow?: true | number`**:   Room outside the element. A spec's overflow wins.

**`start(run), update(ctx), render(ctx), end()`**:   Effect hooks for a run, plus init and dispose. render also runs while the old content is held.

## ShaderTransition

From `@vfx-js/core`. A base class for one shader. It wraps your `frag` with a prelude and a `main`, and holds the old content before the run.

**`name: string`**:   A name for logs.

**`frag: string`**:   GLSL that defines vec4 transition(vec2 uv, float t).

**`params: P`**:   Set by the constructor. Change it any time.

**`uniforms(ctx): TransitionUniforms`**:   Uniforms for this frame. Read this.params here.

**`ease?, overflow?`**:   Defaults. A spec's value wins.

Pick**A preset →**Try**Playground →**
