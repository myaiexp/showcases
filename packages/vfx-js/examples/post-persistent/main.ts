// a persistent post effect reads its previous output as `backbuffer`
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { postScene } from '../../shared/post-scene.ts';
import { createStage } from '../../shared/stage.ts';

// Each frame keeps a faded copy of the last one: moving parts leave ghosts.
const shader = `
precision highp float;
uniform sampler2D src;
uniform sampler2D backbuffer; // the previous output (persistent: true)
uniform vec2 resolution;
uniform vec2 offset;
uniform float decay;
out vec4 outColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - offset) / resolution;
    vec4 now = texture(src, uv);
    vec4 before = texture(backbuffer, uv) * decay;
    outColor = max(now, before);
}
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  let decay = 0.92;
  const vfx = stage.own(
    new VFX({ ...stage.vfxOpts, postEffect: { shader, persistent: true, uniforms: { decay: () => decay } } }),
  );
  await postScene(stage, vfx, 'flowers');
  if (stage.bar) slider(stage.bar, 'decay', 0, 0.99, 0.01, decay, (v) => (decay = v));
  stage.say('persistent: true; outColor = max(src, backbuffer × decay)');
  return () => stage.dispose();
};

export default mount;
