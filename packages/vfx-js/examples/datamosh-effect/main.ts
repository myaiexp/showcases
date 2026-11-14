// VFX-JS: DatamoshEffect on a moving video, switched on and off with enable()
import { VFX } from '@vfx-js/core';
import { DatamoshEffect } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { paramSliders } from '../../shared/fx-params.ts';
import { createStage } from '../../shared/stage.ts';
import { liveVideo } from '../../shared/video.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the video, or the button, to stop or start the mosh.' });
  const video = await liveVideo(stage, ctx.preview ? 200 : 420);
  stage.root.append(video);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // The effect passes the video through untouched until enable(); then it holds a
  // motion-compensated copy of the last frame, so new motion smears old pixels around.
  const mosh = new DatamoshEffect({ blockSize: 16, dup: 2 });
  await vfx.add(video, { effect: mosh });

  const toggle = (on: boolean): void => {
    if (on) mosh.enable();
    else mosh.disable();
    stage.say(on ? 'mosh on: stale pixels are dragged along by new motion' : 'mosh off: the video passes through');
  };

  if (stage.bar) {
    button(stage.bar, 'Start / stop', () => toggle(!mosh.enabled));
    video.addEventListener('click', () => toggle(!mosh.enabled));
    video.style.cursor = 'pointer';
    paramSliders(stage.bar, mosh.params, [
      ['blockSize', 4, 48, 2],
      ['dup', 0, 8, 1],
      ['healRate', 0, 0.2, 0.005],
    ]);
    select(
      stage.bar,
      'view',
      [
        ['output', 'output'],
        ['motion', 'motion'],
        ['residual', 'residual'],
      ] as const,
      (v) => (mosh.params.view = v),
    );
    toggle(true);
  } else {
    // Cards cannot be clicked: mosh for a few seconds, heal, repeat.
    stage.play(async (wait) => {
      toggle(false);
      await wait(1500);
      toggle(true);
      await wait(4500);
    });
  }
  return () => stage.dispose();
};

export default mount;
