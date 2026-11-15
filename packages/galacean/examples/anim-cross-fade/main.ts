// animator.crossFade(state, normalizedDuration) blends from the current pose into the next state
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, buttons, rig } from '../../shared/model-kit.ts';
import { steps } from '../../shared/gfx-kit.ts';

const NAMES = ['Idle', 'Walk', 'Run'] as const;

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, animator, say, root } = r;
  animator.play('Idle');
  let duration = 0.5;
  const go = (name: string): void => {
    animator.crossFade(name, duration);
    say(`animator.crossFade("${name}", ${duration.toFixed(2)})`);
  };
  if (stage.preview) steps(root, 2, NAMES.length, (i) => go(NAMES[i]!));
  else {
    say('pick a state to crossFade to');
    buttons(stage, NAMES, go);
    slider(stage.bar, 'normalizedDuration', 0.05, 1, 0.05, duration, (v) => (duration = v));
  }
  return stage.dispose;
};

export default mount;
