// a post effect inverts the canvas by an amount read from the pointer
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { standInPointer } from '../../shared/pointer.ts';
import { postScene } from '../../shared/post-scene.ts';
import { createStage } from '../../shared/stage.ts';

// Your own shader. src is the whole canvas, and offset is 0.
const shader = `
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
`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer left and right across the stage.' });
  // amount: how far across the stage the pointer is (the docs use the window width).
  let amount = 0;
  const onMove = (e: PointerEvent): void => {
    const r = stage.root.getBoundingClientRect();
    amount = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
  };
  window.addEventListener('pointermove', onMove);
  stage.onDispose(() => window.removeEventListener('pointermove', onMove));

  const vfx = stage.own(new VFX({ ...stage.vfxOpts, postEffect: { shader, uniforms: { amount: () => amount } } }));
  await postScene(stage, vfx, 'city');
  standInPointer(stage, stage.root, (t) => [0.5 + 0.5 * Math.sin(t * 1.2), 0.5]);
  stage.say('uniforms: { amount: () => pointer x across the stage }');
  return () => stage.dispose();
};

export default mount;
