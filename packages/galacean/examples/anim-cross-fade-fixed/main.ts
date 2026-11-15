// crossFadeInFixedDuration takes the blend time in seconds, whatever the clip's length
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { steps } from '../../shared/gfx-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, buttons, rig } from '../../shared/model-kit.ts';

const NAMES = ['Walk', 'Run', 'Jump', 'Idle'] as const;

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, animator, say, root } = r;
  animator.play('Idle');
  let seconds = 0.8;
  const go = (name: string): void => {
    animator.crossFadeInFixedDuration(name, seconds);
    say(`crossFadeInFixedDuration("${name}", ${seconds.toFixed(2)} s)`);
  };
  if (stage.preview) steps(root, 2, NAMES.length, (i) => go(NAMES[i]!));
  else {
    say('pick a state to crossFade to');
    buttons(stage, NAMES, go);
    slider(stage.bar, 'seconds', 0.1, 2, 0.05, seconds, (v) => (seconds = v), (v) => `${v.toFixed(2)} s`);
  }
  return stage.dispose;
};

export default mount;
