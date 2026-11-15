// BloomEffect.scatter sets the diffusion range of the bloom
import { BloomEffect, PostProcess } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await postDemo(el, ctx, { hint: 'scatter 0 to 1.' });
  const say = caption(stage);
  const bloom = root.createChild('post').addComponent(PostProcess).addEffect(BloomEffect);
  bloom.threshold.value = 0.5;
  bloom.intensity.value = 2;
  const set = (v: number): void => {
    bloom.scatter.value = v;
    say(`scatter ${bloom.scatter.value.toFixed(2)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => set(0.5 + 0.45 * Math.sin(t * 0.8)));
  else {
    set(0.7);
    slider(stage.bar, 'scatter', 0, 1, 0.01, 0.7, set);
  }
  return stage.dispose;
};

export default mount;
