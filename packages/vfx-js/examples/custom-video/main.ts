// ctx.wrapTexture on a video that is not in the page, uploaded every frame
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sweep } from '../../shared/fx-params.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';
import { liveVideo } from '../../shared/video.ts';
import { VideoBlendEffect } from './video-blend-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const width = ctx.preview ? 200 : 420;
  // The video is only a texture source: it is never appended to the page.
  const video = await liveVideo(stage, width);
  const img = await picture('flowers', width);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const blend = new VideoBlendEffect(video, { amount: 0.5 });
  await vfx.add(img, { effect: blend });

  if (stage.bar) {
    slider(stage.bar, 'params.amount', 0, 1, 0.01, blend.params.amount, (v) => (blend.params.amount = v));
    stage.say('The picture is the element; the video is wrapped in init() and uploaded again every frame.');
  } else {
    stage.frame((t) => (blend.params.amount = sweep(t, 0, 1, 5)));
    stage.say('A video, wrapped as a texture, sweeping over a picture');
  }
  return () => stage.dispose();
};

export default mount;
