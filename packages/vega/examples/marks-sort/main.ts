// A mark-level sort comparator reorders drawing, so overlaps stack differently
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 220, padding: 5,
    signals: [{ name: 'order', value: 'ascending', bind: { input: 'radio', options: ['ascending', 'descending'] } }],
    data: [{
      name: 'discs',
      values: [[90, 80, 60], [150, 100, 52], [210, 70, 44], [260, 120, 38], [120, 150, 30], [190, 140, 24], [300, 90, 28], [330, 150, 36]]
        .map(([x, y, r], i) => ({ i, x, y, r })),
    }],
    scales: [{ name: 'c', type: 'ordinal', domain: { data: 'discs', field: 'i' }, range: { scheme: 'tableau10' } }],
    marks: [
      {
        type: 'symbol',
        from: { data: 'discs' },
        // The comparator runs over mark items after encoding; "datum." reaches the data.
        sort: { field: 'datum.r', order: { signal: 'order' } },
        encode: {
          update: {
            x: { field: 'x' }, y: { field: 'y' },
            size: { signal: 'datum.r * datum.r * 4' },
            fill: { scale: 'c', field: 'i' }, fillOpacity: { value: 0.9 },
            stroke: { value: '#fff' }, strokeWidth: { value: 1.5 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  cycle(stage, view, 'order', ['ascending', 'descending'], 1700);
  return () => stage.dispose();
};

export default mount;
