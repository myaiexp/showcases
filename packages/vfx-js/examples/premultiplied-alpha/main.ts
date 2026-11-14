// output is premultiplied alpha, so transparent pixels need rgb * a
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';

// A soft orange glow around the letters, written two ways.
const glow = (premultiply: boolean): string => `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
out vec4 outColor;

vec4 readSrc(vec2 uv) {
    if (uv.x < 0. || uv.x > 1. || uv.y < 0. || uv.y > 1.) return vec4(0);
    return texture(src, uv);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    float a = 0.0;
    for (int i = 0; i < 12; i++) {
        float ang = float(i) / 12.0 * 6.2831;
        a += readSrc(uv + vec2(cos(ang), sin(ang)) * vec2(0.03, 0.12)).a;
    }
    a = a / 12.0 * (0.7 + 0.3 * sin(time * 3.0));
    vec3 orange = vec3(1.0, 0.55, 0.1);
    vec4 text = readSrc(uv);
    ${premultiply ? 'vec4 halo = vec4(orange * a, a);' : 'vec4 halo = vec4(orange, a); // rgb not scaled by a'}
    outColor = text + halo * (1.0 - text.a);
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const wrong = headline('rgb');
  const right = headline('rgb·a');
  for (const h of [wrong, right]) h.style.fontSize = ctx.preview ? '34px' : '64px';
  stage.root.append(wrong, right);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(wrong, { shader: glow(false), overflow: 20 });
  await vfx.add(right, { shader: glow(true), overflow: 20 });
  stage.say('Left: vec4(orange, a) brightens the whole halo. Right: vec4(orange * a, a) fades it');
  return () => stage.dispose();
};

export default mount;
