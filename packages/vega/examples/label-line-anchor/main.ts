// With line marks inside group marks, lineAnchor picks the start or the end of each line
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(12);
  const values = ['ash', 'birch', 'cedar', 'elm'].flatMap((c, k) =>
    Array.from({ length: 10 }, (_, x) => ({ c, x, y: 20 + k * 22 + Math.round((rand() - 0.5) * 12 + x * (k - 1.5) * 1.5) })),
  );

  const spec: Spec = {
    width: 360,
    height: 220,
    padding: { left: 60, right: 60, top: 5, bottom: 5 },
    autosize: 'none',
    signals: [{ name: 'lineAnchor', value: 'end', bind: { input: 'radio', options: ['start', 'end'] } }],
    data: [{ name: 'table', values }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 9], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 120], range: 'height' },
      { name: 'color', type: 'ordinal', domain: ['ash', 'birch', 'cedar', 'elm'], range: { scheme: 'category10' } },
    ],
    axes: [{ orient: 'bottom', scale: 'x', tickCount: 10 }],
    marks: [
      {
        // The base mark is the group: one line per facet, one label per line.
        name: 'lines',
        type: 'group',
        from: { facet: { name: 'series', data: 'table', groupby: 'c' } },
        marks: [
          {
            type: 'line',
            from: { data: 'series' },
            encode: {
              enter: {
                x: { scale: 'x', field: 'x' },
                y: { scale: 'y', field: 'y' },
                stroke: { scale: 'color', field: 'c' },
                strokeWidth: { value: 2 },
              },
            },
          },
        ],
      },
      {
        type: 'text',
        from: { data: 'lines' },
        encode: { enter: { text: { field: 'datum.c' }, fontSize: { value: 12 }, fill: { value: '#ddd' } } },
        transform: [
          {
            type: 'label',
            lineAnchor: { signal: 'lineAnchor' },
            anchor: ['left', 'right'],
            offset: [6],
            size: [{ signal: 'width' }, { signal: 'height' }],
            padding: 60,
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'lineAnchor', ['start', 'end'], 1800);
  return () => stage.dispose();
};

export default mount;
