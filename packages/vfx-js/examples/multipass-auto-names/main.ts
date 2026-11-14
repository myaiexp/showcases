// VFX-JS example: middle passes without a target are named pass0, pass1, ...
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const header = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
out vec4 outColor;
`;

// Pass 0 (no target, so "pass0"): a pixelated copy.
const pixelate = `${header}
void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    float n = 24.0;
    outColor = texture(src, (floor(uv * n) + 0.5) / n);
}
`;

// Pass 1 (no target, so "pass1"): src is pass0; shift its hue channels.
const swap = `${header}
void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    outColor = texture(src, uv).brga;
}
`;

// Last pass: reads both middle buffers by their automatic names.
const show = `
precision highp float;
uniform sampler2D pass0;
uniform sampler2D pass1;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    float t = 0.5 + 0.5 * sin(time * 1.5);
    outColor = mix(texture(pass0, uv), texture(pass1, uv), step(uv.y, t));
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('flowers', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(img, { shader: [{ frag: pixelate }, { frag: swap }, { frag: show }] });
  stage.say('Bottom: pass1 (channels swapped), top: pass0 (pixelated)');
  return () => stage.dispose();
};

export default mount;
