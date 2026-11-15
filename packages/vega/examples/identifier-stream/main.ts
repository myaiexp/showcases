// Identifier: every new row gets a unique id from one counter shared by all datasets in the view
import { changeset } from 'vega';
import type { Mark, Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { rowsOf } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const stream = (name: string, source: string) => ({
    name,
    values: [{ tag: `${source}0` }, { tag: `${source}1` }],
    transform: [{ type: 'identifier' as const, as: 'id' }],
  });
  const column = (data: string, x: number, title: string, fill: string): Mark[] => [
    {
      type: 'text',
      encode: { enter: { x: { value: x }, y: { value: 0 }, text: { value: title }, fill: { value: '#aaa' }, fontWeight: { value: 'bold' } } },
    },
    {
      type: 'rect',
      from: { data },
      encode: {
        update: {
          x: { value: x },
          y: { signal: '20 + (datum._r - 1) * 26' },
          width: { value: 150 },
          height: { value: 22 },
          fill: { value: fill },
          fillOpacity: { value: 0.35 },
        },
      },
    },
    {
      type: 'text',
      from: { data },
      encode: {
        update: {
          x: { value: x + 8 },
          y: { signal: '20 + (datum._r - 1) * 26 + 11' },
          text: { signal: "'id ' + datum.id + '  ' + datum.tag" },
          baseline: { value: 'middle' },
          fill: { value: '#eee' },
        },
      },
    },
  ];

  const spec: Spec = {
    width: 330,
    height: 170,
    padding: 5,
    data: [
      stream('left', 'L'),
      stream('right', 'R'),
      rowsOf('lrows', 'left', 6),
      rowsOf('rrows', 'right', 6),
    ],
    marks: [...column('lrows', 0, 'dataset left', 'steelblue'), ...column('rrows', 180, 'dataset right', 'orange')],
  };

  const view = await stage.render(spec);

  // Rows arrive alternately; ids keep counting across both datasets. Only the 6 newest rows are kept.
  let count = 0;
  const live: Record<string, string[]> = { left: ['L0', 'L1'], right: ['R0', 'R1'] };
  const add = async (name: 'left' | 'right'): Promise<void> => {
    const tag = `${name === 'left' ? 'L' : 'R'}${++count}`;
    const queue = live[name]!;
    queue.push(tag);
    const cs = changeset().insert({ tag });
    if (queue.length > 6) {
      const old = queue.shift();
      cs.remove((d: { tag: string }) => d.tag === old);
    }
    view.change(name, cs);
    await view.runAsync();
  };
  if (stage.preview) stage.every(900, (i) => add(i % 3 === 0 ? 'right' : 'left'));
  else if (stage.bar) {
    button(stage.bar, 'Add to left', () => void add('left'));
    button(stage.bar, 'Add to right', () => void add('right'));
  }
  return () => stage.dispose();
};

export default mount;
