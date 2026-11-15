// Animator.speed scales every clip; negative plays backwards
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, animator, say, root } = r;
  animator.play('Walk');
  const set = (v: number): void => {
    animator.speed = v;
    say(`animator.speed = ${v.toFixed(2)}`);
  };
  set(1);
  if (stage.preview) tick(root, (_dt, t) => set([1, 2.5, 0.4, -1][Math.floor(t / 2) % 4]!));
  else slider(stage.bar, 'speed', -2, 3, 0.05, 1, set);
  return stage.dispose;
};

export default mount;
