// A surface trace from a grid of elevations: Mt Bruno, turning slowly in cards
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('api_docs/mt_bruno_elevation.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });

  // Each CSV column 0..23 is one row of the z grid; surface needs z only.
  const z: string[][] = [];
  for (let i = 0; i < 24; i++) z.push(unpack(rows, String(i)));

  await Plotly.newPlot(
    stage.div,
    [{ z, type: 'surface', showscale: !stage.preview }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Mt Bruno Elevation' },
      margin: stage.preview ? { l: 0, r: 0, t: 0, b: 0 } : { l: 0, r: 0, b: 20, t: 60 },
      scene: { camera: { eye: { x: 1.6, y: 1.6, z: 0.9 } } },
    },
    stage.config,
  );

  // Cards orbit the camera around the vertical axis.
  if (stage.preview) {
    stage.every(80, (i) => {
      const a = 0.785 + i * 0.02;
      void Plotly.relayout(stage.div, { 'scene.camera.eye': { x: 2.2 * Math.cos(a), y: 2.2 * Math.sin(a), z: 0.9 } });
    });
  }

  return () => stage.dispose();
};

export default mount;
