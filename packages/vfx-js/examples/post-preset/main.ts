// a preset as a post effect turns every element on the canvas grey
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { postScene } from '../../shared/post-scene.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  // A post effect runs over the whole VFX canvas after every element is drawn.
  const vfx = stage.own(new VFX({ ...stage.vfxOpts, postEffect: { shader: 'grayscale' } }));
  await postScene(stage, vfx);
  stage.say('postEffect: { shader: "grayscale" } over a sinewave picture and a rainbow headline');
  return () => stage.dispose();
};

export default mount;
