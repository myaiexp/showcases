// clipStartTime and clipEndTime trim a state to a normalized part of its clip
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/anim-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const RANGES: [number, number][] = [[0, 1], [0, 0.5], [0.5, 1], [0.25, 0.4]];

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, animator, say, root } = r;
  const state = animator.findAnimatorState('Walk');
  const use = ([start, end]: [number, number]): void => {
    state.clipStartTime = start;
    state.clipEndTime = end;
    animator.play('Walk');
    say(`clipStartTime ${start}, clipEndTime ${end}`);
  };
  cycle(stage, root, RANGES.map((range) => [`${range[0]} to ${range[1]}`, () => use(range)] as const), 2.4);
  return stage.dispose;
};

export default mount;
