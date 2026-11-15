// animator.play(state, layer, normalizedTimeOffset) starts part way in
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, animator, say } = r;
  const start = (offset: number): void => {
    // layerIndex 0, then the normalized start time: 0.5 is half way through the clip.
    animator.play('Walk', 0, offset);
    say(`animator.play("Walk", 0, ${offset.toFixed(2)})`);
  };
  start(0);
  if (stage.preview) {
    let n = 0;
    tick(r.root, (_dt, t) => {
      const k = Math.floor(t / 1.5);
      if (k !== n) {
        n = k;
        start((k % 4) * 0.25);
      }
    });
  } else slider(stage.bar, 'normalizedTimeOffset', 0, 1, 0.05, 0, start);
  return stage.dispose;
};

export default mount;
