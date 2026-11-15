// Two 3D scenes whose cameras follow each other: drag one and the other turns with it
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { linspace, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

type Eye = { x: number; y: number; z: number };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const axis = linspace(-3, 3, 36);
  const grid = (f: (x: number, y: number) => number): number[][] => axis.map((y) => axis.map((x) => f(x, y)));
  await Plotly.newPlot(
    stage.div,
    [
      { type: 'surface', x: axis, y: axis, z: grid((x, y) => Math.sin(x) * Math.cos(y)), colorscale: 'Viridis', showscale: false, scene: 'scene' },
      { type: 'surface', x: axis, y: axis, z: grid((x, y) => (x * x - y * y) / 6), colorscale: 'Portland', showscale: false, scene: 'scene2' },
    ],
    {
      template: stage.template,
      margin: { l: 0, r: 0, t: 0, b: 0 },
      scene: { domain: { x: [0, 0.5] }, camera: { eye: { x: 1.6, y: 1.6, z: 0.9 } } },
      scene2: { domain: { x: [0.5, 1] }, camera: { eye: { x: 1.6, y: 1.6, z: 0.9 } } },
    },
    stage.config,
  );

  if (stage.bar) {
    let linked = true;
    let busy = false;
    toggle(stage.bar, 'link the cameras', true, (on) => (linked = on));
    // The relayout event names the scene whose camera moved; copy its eye to the other.
    stage.div.on('plotly_relayout', ((ev: Record<string, unknown>) => {
      if (!linked || busy) return;
      for (const [from, to] of [['scene', 'scene2'], ['scene2', 'scene']] as const) {
        const eye = ev[`${from}.camera`] as { eye?: Eye } | undefined;
        if (!eye?.eye) continue;
        busy = true;
        void relayout(stage.div, { [`${to}.camera.eye`]: eye.eye }).then(() => { busy = false; });
      }
    }) as never);
  }
  orbit(stage, { radius: 2.4, scenes: ['scene', 'scene2'] });
  return () => stage.dispose();
};

export default mount;
