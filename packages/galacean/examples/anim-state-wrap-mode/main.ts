// WrapMode.Once stops on the last frame, WrapMode.Loop starts over; the default state is Loop
import { WrapMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/anim-kit.ts';
import { robotGlb } from '../../shared/gltf-models.ts';
import { NOOP, rig } from '../../shared/model-kit.ts';

const mount: Mount = async (el, ctx) => {
  const r = await rig(el, ctx, robotGlb);
  if (!r) return NOOP;
  const { stage, animator, say, root } = r;
  const play = (mode: WrapMode): void => {
    const state = animator.findAnimatorState('Wave');
    state.wrapMode = mode;
    animator.play('Wave');
    say(`wrapMode = ${mode === WrapMode.Once ? 'Once' : 'Loop'} (default ${animator.findAnimatorState('Idle').wrapMode === WrapMode.Loop ? 'Loop' : 'Once'})`);
  };
  cycle(stage, root, [['WrapMode.Once', () => play(WrapMode.Once)], ['WrapMode.Loop', () => play(WrapMode.Loop)]], 4);
  return stage.dispose;
};

export default mount;
