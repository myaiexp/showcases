// parcats options: line shape, sortpaths, bundlecolors and arrangement (Titanic)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack, unpackNum } from '../../shared/data.ts';
import { select, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('titanic.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'parcats',
        dimensions: [
          { values: unpack(rows, 'Pclass'), categoryorder: 'category ascending', label: 'Class' },
          { values: unpack(rows, 'Sex'), label: 'Gender' },
          { values: unpack(rows, 'Survived'), label: 'Outcome', categoryarray: ['0', '1'], ticktext: ['perished', 'survived'] },
        ],
        line: { color: unpackNum(rows, 'Survived'), colorscale: [[0, 'lightsteelblue'], [1, 'mediumseagreen']], shape: 'linear' },
        bundlecolors: true,
        sortpaths: 'forward',
        arrangement: 'perpendicular',
        labelfont: { size: 14 },
      },
    ],
    { template: stage.template },
    stage.config,
  );

  const set = (key: string, v: unknown): void => void Plotly.restyle(stage.div, { [key]: v });
  if (stage.bar) {
    select(stage.bar, 'line.shape', ['linear', 'hspline'] as const, 'linear', (v) => set('line.shape', v));
    select(stage.bar, 'sortpaths', ['forward', 'backward'] as const, 'forward', (v) => set('sortpaths', v));
    toggle(stage.bar, 'bundlecolors', true, (v) => set('bundlecolors', v));
    select(stage.bar, 'arrangement', ['perpendicular', 'freeform', 'fixed'] as const, 'perpendicular', (v) => set('arrangement', v));
  } else {
    stage.every(1300, (i) => {
      set('line.shape', i % 2 ? 'hspline' : 'linear');
      set('sortpaths', i % 4 < 2 ? 'forward' : 'backward');
      set('bundlecolors', i % 3 !== 0);
    });
  }

  return () => stage.dispose();
};

export default mount;
