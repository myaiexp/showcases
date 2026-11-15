// sankey arrangement (snap, perpendicular, freeform, fixed) with explicit node.x / node.y
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, select } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const x0 = [0.2, 0.1, 0.5, 0.7, 0.3, 0.5];
  const y0 = [0.7, 0.5, 0.2, 0.4, 0.2, 0.3];

  const trace: Data = {
    type: 'sankey',
    arrangement: 'snap',
    node: { label: ['A', 'B', 'C', 'D', 'E', 'F'], x: x0, y: y0, pad: 10 },
    link: { source: [0, 0, 1, 2, 5, 4, 3, 5], target: [5, 3, 4, 3, 0, 2, 2, 3], value: [1, 2, 1, 1, 1, 1, 1, 2] },
  };

  await Plotly.newPlot(
    stage.div,
    [trace],
    { template: stage.template, title: stage.preview ? undefined : { text: 'Sankey with manually positioned node' } },
    stage.config,
  );

  const scatter = (): void => {
    const r = (): number => 0.05 + Math.random() * 0.9;
    void restyle(stage.div, { 'node.x': [x0.map(r)], 'node.y': [y0.map(r)] });
  };
  if (stage.bar) {
    select(stage.bar, 'arrangement', ['snap', 'perpendicular', 'freeform', 'fixed'], 'snap', (a) => void restyle(stage.div, { arrangement: a }));
    button(stage.bar, 'Scatter nodes', scatter);
    button(stage.bar, 'Reset positions', () => void restyle(stage.div, { 'node.x': [x0], 'node.y': [y0] }));
  }
  if (stage.preview) stage.every(1400, scatter);

  return () => stage.dispose();
};

export default mount;
