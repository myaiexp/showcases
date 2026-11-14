<!-- source: https://amagi.dev/vfx-js/shaders/ -->

Your system asks for reduced motion, so
VFX-JS draws nothing. Demos on this site
show plain HTML.

# Custom Shaders

Pass a GLSL fragment shader as `shader`. VFX-JS runs it over the
element's box, every frame.

## GLSL template

main.ts

```
const shader = `
precision highp float;
uniform sampler2D src;   // the element
uniform vec2 resolution; // element size, physical px
uniform vec2 offset;     // element origin, physical px
uniform float time;      // seconds
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    uv.x += sin(uv.y * 20.0 + time) * 0.02;
    outColor = texture(src, uv);
}
`;

await vfx.add(el, { shader }).catch(console.error);
```

* `uv` is element space: (0, 0) is bottom-left, (1, 1) is
  top-right.
* Shaders are GLSL ES 3.0 by default. VFX-JS adds
  `#version 300 es` for you. Write `out vec4` and
  `texture()`.
* Output is premultiplied alpha. For transparent pixels, multiply
  `rgb` by `a`.
* A shader that fails to compile makes `vfx.add` reject
  with the GL error log and the full source.

Older GLSL ES 1.0 shaders still work:

main.ts

```
// GLSL ES 1.0 is found from gl_FragColor, texture2D, varying or attribute.
// Or set it yourself:
await vfx.add(el, { shader: oldShader, glslVersion: "100" });
```

## Built-in uniforms

VFX-JS sets these for you. Declare only the ones you use. The full list
is in Uniforms and timing.

| Uniform | Use it for |
| --- | --- |
| `src` | The element texture. |
| `resolution, offset` | Element size and origin in physical px. Use them to get uv. |
| `time` | Seconds since the element was added. |
| `mouse` | Mouse position, same space as gl\_FragCoord. |
| `intersection` | How much of the element is in the viewport, 0 to 1. |
| `enterProgress, leaveProgress` | Enter and leave transitions, 0 to 1. Good for scroll reveals. |
| `enterTime, leaveTime` | Seconds since the element entered or left the viewport. |

## Custom uniforms

Pass your own values in `uniforms`. A function runs every
frame while the element is drawn, so use one for values that change.

| JS value | GLSL type |
| --- | --- |
| `1` | `float` |
| `[1, 2]` | `vec2` |
| `[1, 0, 0]` | `vec3` |
| `[1, 0, 0, 1]` | `vec4` |
| `new Float32Array(16)` | `vec4 arr[4] or float arr[16]` |

Booleans are not supported. Use `0` and `1`.

main.ts

```
vfx.add(logo, {
    shader,
    uniforms: {
        tint: [1, 0.4, 0.8],                           // static vec3
        scroll: () => window.scrollY / window.innerHeight, // every frame
    },
});
```




GLSL

```
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
uniform float scroll; // from a function, every frame
uniform vec3 tint;    // a static value
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    uv.x = fract(uv.x + scroll + time * 0.1);
    vec4 color = texture(src, uv);
    outColor = vec4(color.rgb * tint, color.a);
}
```

Scroll the page. The logo slides with it:

## Overflow

A shader draws only inside the element unless you set
`overflow`. There, `uv` goes below 0 and above 1.
The texture is empty outside the element, but `wrap` defaults
to `"repeat"`. Check `uv` before you read
`src`, or set `wrap: "clamp"`.

main.ts

```
vfx.add(el, { shader, overflow: 50, wrap: "clamp" });
```

See Overflow in How it
Works for a diagram.

## Backbuffer

Set `backbuffer: true` to read the previous frame as
`uniform sampler2D backbuffer`. Use it for trails and other
feedback effects.

main.ts

```
vfx.add(logo, { shader, backbuffer: true, overflow: 60 });
```




GLSL

```
precision highp float;
uniform sampler2D src;
uniform sampler2D backbuffer;
uniform vec2 resolution;
uniform vec2 offset;
uniform vec4 viewport;
uniform float time;
out vec4 outColor;

vec4 readSrc(vec2 uv) {
    if (uv.x < 0. || uv.x > 1. || uv.y < 0. || uv.y > 1.) return vec4(0);
    return texture(src, uv);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;

    // Move the element in a circle.
    vec2 shift = vec2(cos(time * 2.0), sin(time * 2.0)) * 0.12;
    vec4 color = readSrc(uv - shift);

    // The backbuffer covers the element plus overflow.
    vec2 bufferUv = (gl_FragCoord.xy - viewport.xy) / viewport.zw;
    // Fade the last frame and shift its color.
    vec4 prev = texture(backbuffer, bufferUv) * vec4(0.9, 0.8, 0.96, 0.96);

    outColor = max(color, prev);
}
```

The backbuffer covers the element plus its overflow, so read it with
`viewport`, not `offset` and
`resolution`.

## Multipass

Pass an array of passes to `shader`. Each pass writes to a
buffer named by `target`. Later passes read it as
`uniform sampler2D <target>`. The last pass draws to the
screen.

main.ts

```
vfx.add(img, {
    shader: [
        { frag: copyFrag, target: "image" }, // keep the element as "image"
        { frag: blurFrag, target: "blur" },  // src here is the previous pass
        { frag: glowFrag },                  // the last pass draws to the screen
    ],
});
```




glowFrag

```
precision highp float;
uniform sampler2D image; // the "image" target
uniform sampler2D blur;  // the "blur" target
uniform vec2 resolution;
uniform vec2 offset;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 glow = texture(blur, uv) * vec4(0.3, 0.8, 1.0, 1.0) * 2.0;
    outColor = texture(image, uv) + glow;
}
```

* In the first pass, `src` is the element. In later
  passes, it is the previous pass. Give a pass a
  `target` to read it again later.
* A middle pass without `target` gets `pass0`,
  `pass1`, and so on.
* `persistent: true` keeps a buffer across frames. The
  pass reads its own last frame by its target name.
* `float: true` stores values outside 0..1, like velocity.
  `size` fixes the buffer size, for small simulations.

VFXPass

```
type VFXPass = {
    frag: string;
    vert?: string;
    target?: string;          // buffer name; later passes read uniform sampler2D <target>
    persistent?: boolean;     // keep across frames; read the last frame by its name
    float?: boolean;          // 32-bit float buffer, for data outside 0..1
    size?: [number, number];  // fixed buffer size in px
    uniforms?: VFXUniforms;   // per-pass uniforms
    glslVersion?: "100" | "300 es";
};
```




main.ts

```
// A persistent pass reads its own last frame by its target name.
shader: [
    { frag: trailFrag, target: "trail", persistent: true },
    { frag: displayFrag },
]
```




trailFrag

```
// Other declarations as in the template.
uniform sampler2D src;
uniform sampler2D trail; // last frame of this pass

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    outColor = max(texture(src, uv), texture(trail, uv) * 0.95);
}
```

With `overflow`, buffers cover more than the element. See
MULTIPASS.md
for how to read them, and for more examples.

## Post effects

A post effect runs over the whole VFX canvas, after all elements are
drawn. Set it with the `postEffect` option of
`new VFX()`. It takes a preset, your own GLSL, passes, or
effects.

main.ts

```
const vfx = new VFX({
    postEffect: { shader: "grayscale" },
});

// Your own shader. src is the whole canvas, and offset is 0.
const vfx2 = new VFX({
    postEffect: {
        shader: `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float amount;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 color = texture(src, uv);
    outColor = vec4(mix(color.rgb, 1.0 - color.rgb, amount), color.a);
}
`,
        uniforms: { amount: () => mouseX / window.innerWidth },
    },
});
```




main.ts

```
// Multipass works the same way.
new VFX({ postEffect: [{ frag: passA, target: "a" }, { frag: passB }] });

// Or use effects from @vfx-js/effects.
new VFX({ postEffect: { effect: new BloomEffect() } });
```

* `src` is the whole canvas. `time` counts from
  when the VFX started.
* `persistent: true` gives the previous output as
  `backbuffer`.
* It only sees what VFX-JS draws, not the rest of the page. There is
  no live demo here, since it would change every demo on this page.
