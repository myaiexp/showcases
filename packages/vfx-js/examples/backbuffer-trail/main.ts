// backbuffer: true feeds the previous frame back in for a colour trail
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';

const shader = `
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
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const logo = headline('Trail');
  stage.root.append(logo);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(logo, { shader, backbuffer: true, overflow: 60 });
  stage.say('backbuffer: true; read it with (gl_FragCoord.xy - viewport.xy) / viewport.zw');
  return () => stage.dispose();
};

export default mount;
