// cone.sizemode, sizeref and anchor decide how big each cone is and where it sits on its point
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const ANCHORS = ['tip', 'tail', 'cm', 'center'] as const;
const MODES = ['absolute', 'scaled'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'cone',
        x: [1, 2, 3],
        y: [1, 2, 3],
        z: [1, 2, 3],
        u: [1, 0, 0],
        v: [0, 3, 0],
        w: [0, 0, 2],
        sizemode: 'absolute',
        sizeref: 2,
        anchor: 'tip',
        colorbar: { x: 0, xanchor: 'right' },
        showscale: !stage.preview,
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { domain: { x: [0, 1] }, camera: { eye: { x: -1.57, y: 1.36, z: 0.58 } } } },
    stage.config,
  );

  if (stage.bar) {
    const bar = stage.bar;
    select(bar, 'anchor', ANCHORS, 'tip', (a) => void restyle(stage.div, { anchor: a }));
    select(bar, 'sizemode', MODES, 'absolute', (m) => void restyle(stage.div, { sizemode: m }));
    slider(bar, 'sizeref', [0.1, 4, 0.1], 2, (v) => void restyle(stage.div, { sizeref: v }));
  } else {
    stage.every(1300, (i) => void restyle(stage.div, { anchor: ANCHORS[i % 4]!, sizeref: 1 + (i % 3) }));
  }
  orbit(stage, { radius: 3, height: 0.8, start: 2.4 });
  return () => stage.dispose();
};

export default mount;
