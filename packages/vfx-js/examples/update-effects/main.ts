// VFX-JS: vfx.updateEffects swaps an element's chain in place
import { VFX } from '@vfx-js/core';
import { BloomEffect, DatamoshEffect, PixelateEffect, ScanlineEffect, type DatamoshParams } from '@vfx-js/effects';
import type { Effect } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { liveVideo } from '../../shared/video.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const video = await liveVideo(stage, ctx.preview ? 200 : 420);
  stage.root.append(video);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  // All four instances are made once. A chain is a list of them: updateEffects(video, list)
  // initialises the ones that are new, disposes the ones that left and leaves the rest
  // alone, so the datamosh keeps its smear while effects come and go around it.
  const mosh = new DatamoshEffect({ blockSize: 16, dup: 2 } satisfies Partial<DatamoshParams>);
  const pool: [string, Effect][] = [
    ['datamosh', mosh],
    ['pixelate', new PixelateEffect({ size: 8 })],
    ['scanline', new ScanlineEffect({ spacing: 4 })],
    ['bloom', new BloomEffect({ threshold: 0.2, intensity: 4, pad: ctx.preview ? 30 : 80 })],
  ];
  const on = new Set(['datamosh']);
  mosh.enable();
  await vfx.add(video, { effect: [mosh] });

  const apply = async (): Promise<void> => {
    const names = pool.filter(([n]) => on.has(n)).map(([n]) => n);
    await vfx.updateEffects(video, pool.filter(([n]) => on.has(n)).map(([, e]) => e));
    stage.say(`updateEffects: [${names.join(', ')}]`);
  };

  if (stage.bar) {
    for (const [name] of pool) {
      checkbox(stage.bar, name, on.has(name), (v) => {
        if (v) on.add(name);
        else on.delete(name);
        void apply();
      });
    }
    stage.say('updateEffects: [datamosh]');
  } else {
    const steps = [['datamosh'], ['datamosh', 'scanline'], ['datamosh', 'pixelate', 'bloom'], ['datamosh', 'bloom']];
    stage.cycle(steps, 2500, (names) => {
      on.clear();
      for (const n of names) on.add(n);
      void apply();
    });
  }
  return () => stage.dispose();
};

export default mount;
