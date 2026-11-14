// a static vec3 tint and a per-frame function uniform
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const shader = `
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
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll the page: the picture slides with it.' });
  const img = await picture('poster', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));
  await vfx.add(img, {
    shader,
    uniforms: {
      tint: [1, 0.4, 0.8], // static vec3
      // A function runs every frame while the element is drawn. A card cannot be
      // scrolled, so there it reads a slow sine instead of window.scrollY.
      scroll: ctx.preview ? () => Math.sin(performance.now() / 900) * 0.2 : () => window.scrollY / window.innerHeight,
    },
  });
  stage.say('uniforms: { tint: [1, 0.4, 0.8], scroll: () => window.scrollY / window.innerHeight }');
  return () => stage.dispose();
};

export default mount;
