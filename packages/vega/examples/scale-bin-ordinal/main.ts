// Bin-ordinal scale: bin transform output feeds a colour scale and a legend with bin labels
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps, rng } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(11);
  const values = Array.from({ length: 150 }, () => ({ v: Math.round((rand() + rand() + rand()) * 333) / 10 }));

  const spec: Spec = {
    width: 420, height: 200, padding: 5,
    signals: [{ name: 'maxbins', value: 8, bind: { input: 'range', min: 4, max: 20, step: 1 } }],
    data: [
      {
        name: 'input', values,
        transform: [
          { type: 'extent', field: 'v', signal: 'extent' },
          // The bin transform's signal output is a bin specification: start, stop, step.
          { type: 'bin', field: 'v', extent: { signal: 'extent' }, maxbins: { signal: 'maxbins' }, signal: 'bins' },
        ],
      },
      {
        name: 'hist', source: 'input',
        transform: [
          { type: 'bin', field: 'v', extent: { signal: 'extent' }, maxbins: { signal: 'maxbins' }, as: ['b0', 'b1'] },
          { type: 'aggregate', groupby: ['b0', 'b1'] },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [{ signal: 'bins.start' }, { signal: 'bins.stop' }], range: 'width' },
      { name: 'y', type: 'linear', domain: { data: 'hist', field: 'count' }, nice: true, range: 'height' },
      { name: 'color', type: 'bin-ordinal', bins: { signal: 'bins' }, range: { scheme: 'greens' } },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', grid: true, gridOpacity: 0.2 }],
    legends: [{ fill: 'color', type: 'symbol', orient: 'right', title: 'bin' }],
    marks: [{
      type: 'rect', from: { data: 'hist' },
      encode: { update: {
        x: { scale: 'x', field: 'b0' }, x2: { scale: 'x', field: 'b1', offset: -1 },
        y: { scale: 'y', field: 'count' }, y2: { scale: 'y', value: 0 }, fill: { scale: 'color', field: 'b0' },
      } },
    }],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ maxbins: 8 }, { maxbins: 5 }, { maxbins: 14 }, { maxbins: 10 }], 1600);
  return () => stage.dispose();
};

export default mount;
