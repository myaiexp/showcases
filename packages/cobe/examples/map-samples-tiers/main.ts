// Performance recipe: mapSamples 8000, 16000 and 40000 with update() times
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const TIERS = [
  { samples: 8000, note: 'mobile / low-end' },
  { samples: 16000, note: 'good balance' },
  { samples: 40000, note: 'hero sections' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: TIERS.map((t) => `mapSamples ${t.samples}`),
    maxSize: 300,
    hint: 'Timings are CPU milliseconds spent inside update(); the GPU draws asynchronously, so they are only a hint.',
  });

  const globes = stage.panes.map((pane, i) =>
    stage.own(
      createGlobe(pane.canvas, {
        devicePixelRatio: stage.dpr, // capped at 2, as the recipe advises
        width: pane.width,
        height: pane.height,
        phi: 0,
        theta: 0.25,
        dark: 1,
        diffuse: 1.2,
        mapSamples: TIERS[i]!.samples,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [1, 0.5, 0.2],
        glowColor: [0.2, 0.2, 0.25],
      }),
      pane,
    ),
  );

  const avg = TIERS.map(() => 0);
  let phi = 0;
  stage.loop(() => {
    phi += 0.004;
    globes.forEach((globe, i) => {
      const t0 = performance.now();
      globe.update({ phi });
      avg[i] = avg[i]! * 0.9 + (performance.now() - t0) * 0.1;
      const cap = stage.panes[i]!.caption;
      if (cap && !stage.preview) cap.textContent = `mapSamples ${TIERS[i]!.samples} (${TIERS[i]!.note}): ${avg[i]!.toFixed(2)} ms in update()`;
    });
  });

  return stage.dispose;
};

export default mount;
