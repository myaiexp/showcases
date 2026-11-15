// PostProcess.getEffect and each effect's enabled flag
import { BloomEffect, PostProcess, TonemappingEffect, TonemappingMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await postDemo(el, ctx, { hint: 'post.getEffect(BloomEffect).enabled and post.getEffect(TonemappingEffect).enabled.' });
  const say = caption(stage);
  const post = root.createChild('post').addComponent(PostProcess);
  post.addEffect(BloomEffect);
  post.addEffect(TonemappingEffect);
  post.getEffect(BloomEffect).threshold.value = 0.5;
  post.getEffect(BloomEffect).intensity.value = 2;
  post.getEffect(TonemappingEffect).mode.value = TonemappingMode.ACES;
  const set = (bloom: boolean, tone: boolean): void => {
    post.getEffect(BloomEffect).enabled = bloom;
    post.getEffect(TonemappingEffect).enabled = tone;
    say(`Bloom ${bloom ? 'on' : 'off'}   Tonemapping ${tone ? 'on' : 'off'}`);
  };
  if (stage.preview) steps(root, 2, 4, (i) => set(i % 2 === 1, i >= 2));
  else {
    let bloom = true;
    let tone = true;
    set(bloom, tone);
    checkbox(stage.bar, 'Bloom', bloom, (v) => set((bloom = v), tone));
    checkbox(stage.bar, 'Tonemapping', tone, (v) => set(bloom, (tone = v)));
  }
  return stage.dispose;
};

export default mount;
