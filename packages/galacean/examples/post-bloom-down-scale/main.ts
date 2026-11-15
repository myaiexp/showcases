// BloomEffect.downScale: BloomDownScaleMode.Half or Quarter
import { BloomDownScaleMode, BloomEffect, PostProcess } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await postDemo(el, ctx, { hint: 'BloomDownScaleMode.Half or Quarter.' });
  const say = caption(stage);
  const bloom = root.createChild('post').addComponent(PostProcess).addEffect(BloomEffect);
  bloom.threshold.value = 0.5;
  bloom.intensity.value = 2;
  const set = (mode: 'Half' | 'Quarter'): void => {
    bloom.downScale.value = BloomDownScaleMode[mode];
    say(`downScale ${mode}`);
  };
  if (stage.preview) steps(root, 2.4, 2, (i) => set(i === 0 ? 'Half' : 'Quarter'));
  else {
    set('Half');
    select(stage.bar, 'downScale', ['Half', 'Quarter'] as const, set);
  }
  return stage.dispose;
};

export default mount;
