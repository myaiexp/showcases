// A nested group updates a top-level signal with push: outer, and keeps its own local signal
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const cells = ['p', 'q'].flatMap((panel) => [1, 2, 3].map((n) => ({ panel, name: `${panel}${n}`, n })));

  const spec: Spec = {
    width: 420,
    height: 170,
    padding: 5,

    // A top-level signal, readable everywhere...
    signals: [{ name: 'hovered', value: 'none' }],

    data: [
      { name: 'panels', values: [{ panel: 'p' }, { panel: 'q' }] },
      { name: 'cells', values: cells },
    ],
    scales: [{ name: 'gx', type: 'band', domain: ['p', 'q'], range: 'width', padding: 0.1 }],

    marks: [
      line("'hovered (outer signal): ' + hovered", 4),
      {
        type: 'group',
        from: { facet: { name: 'mine', data: 'cells', groupby: 'panel' } },
        encode: {
          update: {
            x: { scale: 'gx', field: 'panel' },
            width: { scale: 'gx', band: 1 },
            y: { value: 30 },
            height: { value: 130 },
            stroke: { value: '#666' },
          },
        },
        signals: [
          // ...updated from inside each group: push "outer" targets the existing signal
          // instead of defining a new one, so it takes no value or update of its own.
          { name: 'hovered', push: 'outer', on: [{ events: 'rect:mouseover', update: 'datum.name' }] },
          // A new nested signal exists only inside its group, one value per group instance.
          { name: 'local', value: '-', on: [{ events: 'rect:mouseover', update: 'datum.n' }] },
        ],
        marks: [
          {
            type: 'rect',
            from: { data: 'mine' },
            encode: {
              enter: { width: { value: 38 }, height: { value: 50 }, y: { value: 36 } },
              update: {
                x: { signal: '8 + (datum.n - 1) * 46' },
                fill: [{ test: 'datum.name === hovered', value: 'orange' }, { value: 'steelblue' }],
              },
            },
          },
          {
            type: 'text',
            encode: {
              enter: { fill: { value: '#ddd' }, fontSize: { value: 12 }, x: { value: 8 }, y: { value: 10 } },
              update: { text: { signal: "'local n: ' + local" } },
            },
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);

  // Cards: the pretend pointer sweeps over the six cells.
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const gx = view.scale('gx');
    stage.every(650, (i) => {
      const k = i % 6;
      const panel = k < 3 ? 'p' : 'q';
      ghost.move(gx(panel) + 8 + (k % 3) * 46 + 19, 30 + 36 + 25);
    });
  }
  return () => stage.dispose();
};

export default mount;
