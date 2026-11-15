// restyle with an array value: each listed trace takes the next entry in turn
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const CASES = ['[0, 1]: red, green', 'omitted: alternate over all'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const bars = (k: number) => ({ type: 'bar' as const, y: [2, 3, 1, 4].map((v) => v + k * 0.4), name: `trace ${k}`, marker: { color: '#6b7280' } });

  await Plotly.newPlot(stage.div, [0, 1, 2, 3].map(bars), { template: stage.template, showlegend: !stage.preview }, stage.config);

  const apply = async (c: (typeof CASES)[number]): Promise<void> => {
    await Plotly.restyle(stage.div, { 'marker.color': '#6b7280' });
    if (c === CASES[0]) {
      // restyle the first trace's marker color 'red' and the second's 'green'
      await Plotly.restyle(stage.div, { 'marker.color': ['red', 'green'] }, [0, 1]);
    } else {
      // alternate between red and green for all traces (note omission of traces)
      await Plotly.restyle(stage.div, { 'marker.color': ['red', 'green'] });
    }
  };

  if (stage.bar) select(stage.bar, 'traceIndices', CASES, CASES[0], (c) => void apply(c));
  await apply(CASES[0]);
  if (stage.preview) stage.every(1600, (i) => void apply(CASES[i % 2]!));

  return () => stage.dispose();
};

export default mount;
