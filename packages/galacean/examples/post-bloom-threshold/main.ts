// BloomEffect.threshold: how bright a pixel must be to bloom
import { BloomEffect, PostProcess } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await postDemo(el, ctx, { hint: 'threshold 0 to 1.5, default 0.9.' });
  const say = caption(stage);
  const bloom = root.createChild('post').addComponent(PostProcess).addEffect(BloomEffect);
  bloom.intensity.value = 1.5;
  const set = (v: number): void => {
    bloom.threshold.value = v;
    say(`threshold ${bloom.threshold.value.toFixed(2)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => set(0.95 - 0.9 * (0.5 + 0.5 * Math.sin(t * 0.8))));
  else {
    set(0.9);
    slider(stage.bar, 'threshold', 0, 1.5, 0.01, 0.9, set);
  }
  return stage.dispose;
};

export default mount;
