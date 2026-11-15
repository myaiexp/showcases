// getCurrentAnimatorState(layer) reports the playing state
import type { Mount } from '@/types.ts';
import { tick, steps } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, buttons, rig } from '../../shared/model-kit.ts';

const NAMES = ['Idle', 'Walk', 'Run', 'Jump'] as const;

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, animator, say, root } = r;
  animator.play('Idle');
  const go = (name: string): void => animator.crossFadeInFixedDuration(name, 0.6);
  if (stage.preview) steps(root, 2, NAMES.length, (i) => go(NAMES[i]!));
  else buttons(stage, NAMES, go);
  tick(root, () => {
    // Undefined until the first update has run.
    const state = animator.getCurrentAnimatorState(0);
    if (state) say(`getCurrentAnimatorState(0).name = "${state.name}"\nclip length ${state.clip.length.toFixed(2)} s, speed ${state.speed}`);
  });
  return stage.dispose;
};

export default mount;
