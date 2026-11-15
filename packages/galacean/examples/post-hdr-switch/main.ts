// Camera.enableHDR keeps values above 1 alive for tonemapping and bloom
import { BloomEffect, PostProcess, TonemappingEffect, TonemappingMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { postDemo } from '../../shared/post-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root, camera } = await postDemo(el, ctx, { hint: 'camera.enableHDR with ACES tonemapping and bloom.' });
  const say = caption(stage);
  const post = root.createChild('post').addComponent(PostProcess);
  post.addEffect(TonemappingEffect).mode.value = TonemappingMode.ACES;
  const bloom = post.addEffect(BloomEffect);
  bloom.threshold.value = 0.7;
  bloom.intensity.value = 1.5;
  const set = (hdr: boolean): void => {
    camera.enableHDR = hdr;
    say(`enableHDR = ${hdr}`);
  };
  if (stage.preview) steps(root, 2.4, 2, (i) => set(i === 0));
  else {
    set(true);
    checkbox(stage.bar, 'camera.enableHDR', true, set);
  }
  return stage.dispose;
};

export default mount;
