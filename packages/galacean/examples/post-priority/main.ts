// PostProcess.priority decides which global volume wins
import { BloomEffect, PostProcess } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await postDemo(el, ctx, { hint: 'Volume A (intensity 0.2) and volume B (intensity 3).' });
  const say = caption(stage);
  const a = root.createChild('A').addComponent(PostProcess);
  const b = root.createChild('B').addComponent(PostProcess);
  for (const [post, intensity] of [[a, 0.2], [b, 3]] as const) {
    const bloom = post.addEffect(BloomEffect);
    bloom.threshold.value = 0.4;
    bloom.intensity.value = intensity;
  }
  const set = (winner: 'A' | 'B'): void => {
    a.priority = winner === 'A' ? 10 : 0;
    b.priority = winner === 'B' ? 10 : 0;
    const blended = stage.scene.postProcessManager.getBlendEffect(BloomEffect);
    say(`priority: ${winner} = 10, other = 0   applied intensity ${(blended?.intensity.value ?? 0).toFixed(2)}`);
  };
  if (stage.preview) steps(root, 2.4, 2, (i) => set(i === 0 ? 'A' : 'B'));
  else {
    set('A');
    select(stage.bar, 'higher priority', ['A', 'B'] as const, set);
  }
  return stage.dispose;
};

export default mount;
