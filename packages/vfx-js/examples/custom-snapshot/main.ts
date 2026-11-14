// ctx.blit copies the input into a render target, ctx.clear empties it
import { VFX } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { liveVideo } from '../../shared/video.ts';
import { SnapshotEffect } from './snapshot-effect.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const video = await liveVideo(stage, ctx.preview ? 200 : 420);
  stage.root.append(video);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const fx = new SnapshotEffect();
  await vfx.add(video, { effect: fx });

  const snap = (): void => {
    fx.snap();
    stage.say('ctx.blit(ctx.src, shot): the frame is copied into a render target; its left half stays frozen.');
  };
  const clear = (): void => {
    fx.clear();
    stage.say('ctx.clear(shot): the buffer is emptied and the video plays through again.');
  };
  if (stage.bar) {
    button(stage.bar, 'Snapshot (ctx.blit)', snap);
    button(stage.bar, 'Clear (ctx.clear)', clear);
    stage.say('Press Snapshot to freeze a frame beside the live video.');
  } else {
    stage.cycle(['snap', 'hold', 'clear', 'hold'] as const, 1800, (step) => {
      if (step === 'snap') snap();
      else if (step === 'clear') clear();
    });
  }
  return () => stage.dispose();
};

export default mount;
