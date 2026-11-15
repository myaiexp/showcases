// Ten engine-design axes, lines coloured by a reversed Jet scale, with a brushed block height
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, toggle } from '../../shared/controls.ts';
import { engineBlock } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

const scales = ['Jet', 'Viridis', 'Portland', 'Electric', 'Blues'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  // The docs read this from a third-party CSV; engineBlock() generates a seeded table of the same columns.
  const d = engineBlock();
  const col = (k: string): number[] => d[k] ?? [];

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'parcoords',
        line: { showscale: true, reversescale: true, colorscale: 'Jet', cmin: -4000, cmax: -100, color: col('colorVal') },
        dimensions: [
          { constraintrange: [100000, 150000], range: [32000, 227900], label: 'Block height', values: col('blockHeight') },
          { range: [0, 700000], label: 'Block width', values: col('blockWidth') },
          { label: 'Cylinder material', tickvals: [0, 0.5, 1, 2, 3], ticktext: ['A', 'AB', 'B', 'Y', 'Z'], values: col('cycMaterial') },
          { label: 'Block material', tickvals: [0, 1, 2, 3], range: [-1, 4], values: col('blockMaterial') },
          { range: [134, 3154], label: 'Total weight', visible: true, values: col('totalWeight') },
          { range: [9, 19984], label: 'Assembly penalty weight', values: col('assemblyPW') },
          { range: [49000, 568000], label: 'Height st width', values: col('HstW') },
          { range: [-28000, 196430], label: 'Min height width', values: col('minHW') },
          { range: [98453, 501789], label: 'Min width diameter', values: col('minWD') },
          { range: [1417, 107154], label: 'RF block', values: col('rfBlock') },
        ],
      },
    ],
    { template: stage.template, margin: stage.preview ? { l: 16, r: 16, t: 30, b: 14 } : { l: 60, r: 60, t: 80, b: 40 } },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'line.colorscale', scales, 'Jet', (v) => void restyle(stage.div, { 'line.colorscale': v }));
    toggle(stage.bar, 'line.reversescale', true, (v) => void restyle(stage.div, { 'line.reversescale': v }));
  } else {
    stage.every(140, (i) => {
      const lo = 60000 + 50000 * (1 + Math.sin(i / 10));
      void restyle(stage.div, { 'dimensions[0].constraintrange': [[lo, lo + 40000]] }, [0]);
    });
  }

  return () => stage.dispose();
};

export default mount;
