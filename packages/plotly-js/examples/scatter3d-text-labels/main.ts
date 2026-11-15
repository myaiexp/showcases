// scatter3d mode 'markers+text': labels placed in space with a textposition select
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const POSITIONS = ['top center', 'bottom center', 'middle left', 'middle right', 'top left', 'bottom right'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  // The eight corners of a cube, each labelled with its coordinates.
  const corners = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [i & 1, (i >> 1) & 1, (i >> 2) & 1]);

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scatter3d',
        mode: 'markers+text',
        x: corners.map((c) => c[0]!),
        y: corners.map((c) => c[1]!),
        z: corners.map((c) => c[2]!),
        text: corners.map((c) => `(${c.join(',')})`),
        textposition: 'top center',
        textfont: { size: stage.preview ? 9 : 13, color: '#fbbf24' },
        marker: { size: 6, color: '#60a5fa' },
        hoverinfo: 'text',
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.7, y: 1.7, z: 1 } } } },
    stage.config,
  );

  const apply = (p: string): void => void restyle(stage.div, { textposition: p });
  if (stage.bar) select(stage.bar, 'textposition', POSITIONS, 'top center', apply);
  else stage.every(1800, (i) => apply(POSITIONS[i % POSITIONS.length]!));
  orbit(stage, { radius: 2.6, height: 1 });
  return () => stage.dispose();
};

export default mount;
