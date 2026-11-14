// one blur shader run twice with per-pass uniforms (horizontal, vertical)
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const blurShader = `
precision highp float;
uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 offset;
uniform vec2 direction;
uniform float radius;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec2 texel = direction * radius / resolution;
    vec4 c = texture(src, uv) * 0.227027;
    c += texture(src, uv + texel * 1.0) * 0.316216;
    c += texture(src, uv - texel * 1.0) * 0.316216;
    c += texture(src, uv + texel * 2.0) * 0.070270;
    c += texture(src, uv - texel * 2.0) * 0.070270;
    outColor = c;
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('testcard', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // A function uniform is read every frame, so the slider needs no re-add.
  let radius = 3;
  const r = (): number => (ctx.preview ? 3 + 3 * Math.sin(performance.now() / 700) : radius);
  await vfx.add(img, {
    shader: [
      { frag: blurShader, target: 'blurH', uniforms: { direction: [1, 0], radius: r } },
      { frag: blurShader, uniforms: { direction: [0, 1], radius: r } },
    ],
  });
  if (stage.bar) slider(stage.bar, 'radius (px per tap)', 0, 10, 0.1, radius, (v) => (radius = v));
  stage.say('Same shader, two passes: direction [1, 0] then [0, 1]');
  return () => stage.dispose();
};

export default mount;
