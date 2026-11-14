// VFX-JS: effect chain, an array of effects where each reads the one before
import { VFX } from '@vfx-js/core';
import { BloomEffect, PixelateEffect, ScanlineEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { paramSliders, sweep } from '../../shared/fx-params.ts';
import { createStage } from '../../shared/stage.ts';
import { liveVideo } from '../../shared/video.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const video = await liveVideo(stage, ctx.preview ? 200 : 420);
  stage.root.append(video);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // The chain from the docs: pixelate the video, draw scanlines on the pixels, then bloom
  // the result. Order matters. overflow does not apply to effects, so the bloom brings its
  // own room outside the video through pad.
  const pixelate = new PixelateEffect({ size: 10 });
  const scan = new ScanlineEffect({ spacing: 5 });
  const bloom = new BloomEffect({ threshold: 0.01, intensity: ctx.preview ? 4 : 10, pad: ctx.preview ? 30 : 100 });
  await vfx.add(video, { effect: [pixelate, scan, bloom] });

  if (stage.bar) {
    paramSliders(stage.bar, pixelate.params, [['size', 2, 40, 1]]);
    paramSliders(stage.bar, scan.params, [['spacing', 2, 16, 1]]);
    paramSliders(stage.bar, bloom.params, [
      ['threshold', 0, 1, 0.01],
      ['intensity', 0, 20, 0.5],
    ]);
    stage.say('PixelateEffect, then ScanlineEffect, then BloomEffect: each one draws what the one before it left.');
  } else {
    stage.frame((t) => {
      pixelate.params.size = Math.round(sweep(t, 4, 16, 6));
      stage.say(`pixelate size ${pixelate.params.size}, then scanlines, then bloom`);
    });
  }
  return () => stage.dispose();
};

export default mount;
