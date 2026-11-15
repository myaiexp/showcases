// Sample: reservoir sampling keeps at most `size` rows of the stream
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const rand = rng(251);
const points = Array.from({ length: 400 }, () => ({ x: rand() * 100, y: rand() * 100 }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 300,
    height: 220,
    padding: 5,
    signals: [{ name: 'size', value: 50, bind: { input: 'range', min: 5, max: 400, step: 5 } }],
    data: [
      { name: 'all', values: points },
      { name: 'picked', source: 'all', transform: [{ type: 'sample', size: { signal: 'size' } }] },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y' }],
    title: { text: { signal: "length(data('picked')) + ' of ' + length(data('all')) + ' rows sampled'" }, color: '#ddd' },
    marks: [
      {
        type: 'symbol',
        from: { data: 'all' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, fill: { value: '#445' }, size: { value: 14 } } },
      },
      {
        type: 'symbol',
        from: { data: 'picked' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, fill: { value: 'orange' }, size: { value: 46 } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'size', [10, 40, 100, 250, 400, 25], 1300);
  return () => stage.dispose();
};

export default mount;
