// VFX-JS: HalftoneEffect on a <video>, redrawn from every new frame
import { VFX } from '@vfx-js/core';
import { HalftoneEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { createStage } from '../../shared/stage.ts';
import { liveVideo } from '../../shared/video.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const video = await liveVideo(stage, ctx.preview ? 200 : 420);
  stage.root.append(video);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // A <video> is a valid target like an <img>: VFX-JS uploads its current frame each tick,
  // so the effect always sees the moving picture. The video here plays a canvas animation
  // drawn in code.
  const halftone = new HalftoneEffect({
    mode: 'cmyk',
    gridSize: ctx.preview ? 5 : 8,
    background: [0.97, 0.95, 0.88, 1],
  });
  await vfx.add(video, { effect: halftone });

  if (stage.bar) {
    paramSliders(stage.bar, halftone.params, [
      ['gridSize', 3, 24, 1],
      ['dotSize', 0.3, 1.6, 0.05],
      ['angle', 0, 90, 1],
    ]);
    stage.say('A CMYK dot screen over a playing video: the dots change with every frame.');
  } else {
    stage.say('CMYK halftone on a playing video');
  }
  return () => stage.dispose();
};

export default mount;
