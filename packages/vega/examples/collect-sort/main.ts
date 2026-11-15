// Collect sort: order a data stream with a multi-field comparator, and read the order from a band scale
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const rand = rng(61);
const names = ['Ash', 'Birch', 'Cedar', 'Dogwood', 'Elm', 'Fir', 'Gum', 'Hazel', 'Iron', 'Juniper'];
const rows = names.map((name, i) => ({ name, group: ['north', 'south', 'east'][i % 3], score: Math.round(10 + rand() * 80) }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 320,
    height: 220,
    padding: 5,
    signals: [
      { name: 'by', value: 'score', bind: { input: 'select', options: ['score', 'name'] } },
      { name: 'dir', value: 'descending', bind: { input: 'select', options: ['ascending', 'descending'] } },
    ],
    data: [
      { name: 'rows', values: rows },
      {
        name: 'sorted',
        source: 'rows',
        // Multi-criteria: first by group (ascending), ties broken by the chosen field and direction.
        transform: [{ type: 'collect', sort: { field: ['group', { signal: 'by' }], order: ['ascending', { signal: 'dir' }] } }],
      },
    ],
    scales: [
      // A band scale's domain follows the order of the collected data.
      { name: 'y', type: 'band', domain: { data: 'sorted', field: 'name' }, range: 'height', padding: 0.15 },
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'color', type: 'ordinal', domain: ['north', 'south', 'east'], range: ['steelblue', 'orange', 'seagreen'] },
    ],
    axes: [{ orient: 'left', scale: 'y' }, { orient: 'bottom', scale: 'x' }],
    legends: [{ fill: 'color', orient: 'right', title: 'group' }],
    title: { text: { signal: "'sort: group ascending, then ' + by + ' ' + dir" }, color: '#ddd' },
    marks: [
      {
        type: 'rect',
        from: { data: 'sorted' },
        encode: {
          update: {
            y: { scale: 'y', field: 'name' },
            height: { scale: 'y', band: 1 },
            x: { value: 0 },
            x2: { scale: 'x', field: 'score' },
            fill: { scale: 'color', field: 'group' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const combos = [['score', 'descending'], ['score', 'ascending'], ['name', 'ascending'], ['name', 'descending']];
    stage.every(1500, async (i) => {
      const [b, d] = combos[i % combos.length]!;
      view.signal('by', b).signal('dir', d);
      await view.runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
