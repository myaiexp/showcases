// VFX-JS example: a persistent pass reads its own last frame by its target name
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';

// The first pass moves the letters and keeps the brighter of now and 95% of before.
const trailFrag = `
precision highp float;
uniform sampler2D src;
uniform sampler2D trail; // last frame of this pass
uniform vec2 resolution;
uniform vec2 offset;
uniform vec4 viewport;
uniform float time;
out vec4 outColor;

vec2 toBuffer(vec2 uv) {
    return (uv * resolution + (offset - viewport.xy)) / viewport.zw;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec2 moved = uv - vec2(sin(time * 1.7) * 0.25, cos(time * 2.3) * 0.25);
    vec4 now = (moved.x < 0. || moved.x > 1. || moved.y < 0. || moved.y > 1.) ? vec4(0) : texture(src, moved);
    outColor = max(now, texture(trail, toBuffer(uv)) * 0.95);
}
`;

// The display pass tints the trail by age (older = bluer).
const displayFrag = `
precision highp float;
uniform sampler2D trail;
uniform vec2 resolution;
uniform vec2 offset;
uniform vec4 viewport;
out vec4 outColor;

vec2 toBuffer(vec2 uv) {
    return (uv * resolution + (offset - viewport.xy)) / viewport.zw;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 c = texture(trail, toBuffer(uv));
    outColor = vec4(mix(vec3(0.2, 0.4, 1.0), vec3(1.0, 0.9, 0.6), c.a * c.a) * c.a, c.a);
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const title = headline('Trail');
  title.style.fontSize = ctx.preview ? '36px' : '64px';
  stage.root.append(title);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(title, {
    overflow: ctx.preview ? 30 : 60,
    shader: [{ frag: trailFrag, target: 'trail', persistent: true }, { frag: displayFrag }],
  });
  stage.say('{ target: "trail", persistent: true } reads its own last frame as trail');
  return () => stage.dispose();
};

export default mount;
