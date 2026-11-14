<!-- source: https://amagi.dev/vfx-js/ai/ -->

Your system asks for reduced motion, so
VFX-JS draws nothing. Demos on this site
show plain HTML.

# Use with AI

Coding agents can add VFX-JS effects and write shaders for you. Give them
the docs first, so they use the current API.

## Install the skill

The VFX-JS skill works with Claude Code, Codex, Cursor and other agents
that read skills. Run this in your project:

Terminal

```
npx skills add fand/vfx-js
```

The agent reads it when a task needs it. It covers every package (core,
React, Vue, Svelte, Astro, effects, transitions), the shader presets,
custom shaders, the Effect API, transitions, and common pitfalls.
The source is
skills/vfx-js
on GitHub.

## llms.txt

No skill support? Give the agent one of these files.

* llms.txt: a short overview, a quick
  start, and links to each part of the docs.
* llms-full.txt: the whole skill in
  one file. Paste it into a chat, or point the agent to the URL.

Prompt

```
Read https://amagi.dev/vfx-js/llms-full.txt first.
Then add a glitch effect to the hero image with @vfx-js/core.
```

## Prompts that work

Name the package, the element, and the effect. Say what should happen
on scroll or hover.

Image hover

```
Use @vfx-js/react to add an rgbShift effect to the product images in ProductCard.
Make the shift stronger while the mouse is over the image. Use a uniform function that reads a ref.
```




Text intro

```
Make the h1 on the landing page glitch in when it scrolls into view, then settle.
Use @vfx-js/core with a custom shader driven by enterProgress. Give it 50 px of overflow.
```




Effect chain

```
Add PixelateEffect, then BloomEffect from @vfx-js/effects to the background video.
Make one VFX for the page and new Effect instances per element.
```




Vue / Nuxt

```
In this Nuxt app, put a halftone effect on every image in the blog post body with the v-vfx directive from @vfx-js/vue.
Images come from our CDN; make sure CORS works.
```

## Write a shader with AI

1. Describe the look in words. Ask for a VFX-JS custom shader.
2. Paste the GLSL into `vfx.add(el, { shader })`.
3. Look at it in the browser. Tell the agent what to change.

Prompt

```
Write a VFX-JS custom shader for vfx.add.
The image ripples like water around the mouse.
Use the built-in mouse and time uniforms. GLSL ES 3.0.
```

The agent returns something like this:

GLSL

```
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform vec2 mouse; // same space as gl_FragCoord
uniform float time;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;

    // Rings that move out from the mouse and fade with distance.
    vec2 fromMouse = gl_FragCoord.xy - mouse;
    float d = length(fromMouse);
    float wave = sin(d * 0.05 - time * 6.0) * exp(-d * 0.004);

    uv += normalize(fromMouse + 0.001) * wave * 0.03;
    outColor = texture(src, uv);
}
```




main.ts

```
// rippleShader holds the GLSL above as a string.
await vfx.add(img, { shader: rippleShader, wrap: "clamp" });
```

Move the mouse over the image:

The agent can use `time`, `mouse`,
`resolution`, `offset`,
`intersection`, `enterProgress` and more. See
Uniforms and timing for the
full list, and Custom Shaders for
multipass and post effects.

## Check the result

The agent writes the code but can't watch it run. Look for these.

**Console errors**:   A shader that fails to compile makes vfx.add reject with the GL error log and the full source. Catch it with .catch(console.error) and paste the log back to the agent.

**A blank element**:   Usually the shader failed, the image is blocked by CORS, or the element has zero size.

**Cut-off effect**:   A shader draws only inside the element unless you set overflow. Effects set their own room with outputRect, or a pad param on built-in ones.
    See Overflow.

**Stale text**:   Text and other elements are captured once. The agent must call vfx.update(el) after the content changes.
    See Element capture.

**Many VFX instances**:   Each VFX has its own WebGL context. Ask for one per page, made in client code.
    See Limits.

**Screenshots**:   Agents can't see the canvas. Ask for a Playwright script that takes a screenshot. Headless browsers need WebGL on.
