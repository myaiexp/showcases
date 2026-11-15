// BloomEffect.intensity scales the strength of the glow
import { BloomEffect, PostProcess } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await postDemo(el, ctx, { hint: 'intensity 0 to 4.' });
  const say = caption(stage);
  const bloom = root.createChild('post').addComponent(PostProcess).addEffect(BloomEffect);
  bloom.threshold.value = 0.5;
  const set = (v: number): void => {
    bloom.intensity.value = v;
    say(`intensity ${bloom.intensity.value.toFixed(2)}`);
  };
  if (stage.preview) tick(root, (_dt, t) => set(2 + 2 * Math.sin(t * 0.9)));
  else {
    set(1.5);
    slider(stage.bar, 'intensity', 0, 4, 0.05, 1.5, set);
  }
  return stage.dispose;
};

export default mount;
