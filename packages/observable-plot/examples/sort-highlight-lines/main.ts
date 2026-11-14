// Sort option on lines: a boolean sort draws highlighted lines on top
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, type Row } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const bls = await csv('bls-metro-unemployment.csv');
  const isMI = (d: Row): boolean => /, MI /.test(d.division);
  return mountPlot<{ sorted: boolean }>(el, ctx, {
    initial: { sorted: true },
    render: ({ sorted }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Unemployment (%)' },
        color: { domain: [false, true], range: ['#ccc', 'red'] },
        marks: [
          Plot.ruleY([0]),
          Plot.line(bls, { x: 'date', y: 'unemployment', z: 'division', sort: sorted ? isMI : undefined, stroke: isMI }),
        ],
      }),
    step: ({ sorted }) => ({ sorted: !sorted }),
    controls: (bar, live) => {
      toggle(bar, 'sort: highlighted series last', live.state.sorted, (sorted) => live.set({ sorted }));
    },
  });
};

export default mount;
