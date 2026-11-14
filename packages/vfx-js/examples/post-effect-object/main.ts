// an @vfx-js/effects effect as the post effect (bloom over everything)
import { VFX } from '@vfx-js/core';
import { BloomEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { postScene } from '../../shared/post-scene.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const bloom = new BloomEffect({ threshold: 0.3, intensity: 3 });
  const vfx = stage.own(new VFX({ ...stage.vfxOpts, postEffect: { effect: bloom } }));
  await postScene(stage, vfx, 'city');
  if (stage.bar) {
    slider(stage.bar, 'intensity', 0, 8, 0.1, bloom.params.intensity, (v) => (bloom.params.intensity = v));
    slider(stage.bar, 'threshold', 0, 1, 0.01, bloom.params.threshold, (v) => (bloom.params.threshold = v));
  }
  stage.say('postEffect: { effect: new BloomEffect() } blooms every element at once');
  return () => stage.dispose();
};

export default mount;
