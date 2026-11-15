// Auto Rotate recipe: globes turning at 0.002, 0.005 and 0.01 radians a frame
import createGlobe from 'cobe';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const STEPS = [0.002, 0.005, 0.01];
const NAMES = ['subtle', 'default', 'fast'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: STEPS.map((s, i) => `${NAMES[i]}: phi += ${s}`),
    maxSize: 300,
    hint: 'phi grows by a fixed step each frame; update({ phi }) draws it.',
  });

  const globes = stage.panes.map((pane) =>
    stage.own(
      createGlobe(pane.canvas, {
        devicePixelRatio: stage.dpr,
        width: pane.width,
        height: pane.height,
        phi: 0,
        theta: 0.25,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [1, 0.5, 0.2],
        glowColor: [0.2, 0.2, 0.25],
        markers: [{ location: [37.78, -122.44], size: 0.05 }],
      }),
      pane,
    ),
  );

  let speed = 1;
  const phis = STEPS.map(() => 0);
  stage.loop(() => {
    globes.forEach((globe, i) => {
      phis[i]! += STEPS[i]! * speed; // Adjust speed as needed
      globe.update({ phi: phis[i]! });
    });
  });

  if (stage.bar) {
    slider(stage.bar, 'Speed multiplier', 0, 3, 0.1, 1, (v) => (speed = v), (v) => `${v.toFixed(1)}x`);
  }
  return stage.dispose;
};

export default mount;
