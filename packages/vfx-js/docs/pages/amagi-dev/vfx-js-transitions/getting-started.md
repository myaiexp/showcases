<!-- source: https://amagi.dev/vfx-js-transitions/getting-started -->

# Getting Started

Works in any browser with WebGL. Without HTML-in-Canvas, which is still experimental in Chrome, VFX-JS captures the page with a workaround that misses some content. See Browser support.

### Next.js

Put <VFXTransition> from @vfx-js/react/next around the layout's children. It is a client component, so the layout stays a Server Component. Each page picks its transition with <TransitionIn>.

$ npm i @vfx-js/core @vfx-js/react @vfx-js/transitions

app/layout.tsx

```
import { VFXTransition } from "@vfx-js/react/next";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <VFXTransition duration={0.8}>{children}</VFXTransition>
      </body>
    </html>
  );
}
```

app/about/page.tsx

```
import { TransitionIn } from "@vfx-js/react";
import { Glitch } from "@vfx-js/transitions";

export default function About() {
  return (
    <>
      <TransitionIn transition={Glitch} />
      <h1>About</h1>
    </>
  );
}
```

* The target fills the viewport height and pages scroll inside it. Pass fullscreen={false} to size it with your own CSS, e.g. under a header.
* A Server Component can't pass onClick to Link. Wrap the link in a small client component.
* Preset classes cross from a Server Component as-is. Pass options as plain params, e.g. <TransitionIn transition={Swipe} params={{ direction: "up" }} />. Make instances with useTransitionInstance in a client component.
* loading.tsx shows its fallback as soon as the path changes, so the transition lands on the skeleton.
* Back plays the same spec as forward. Pass autoReverse to play the spec that entered the page, reversed. It needs the Navigation API.

Next**How it works →**Try**All presets →**
