// from.facet splits one data set across group marks with local partitions
import type { Spec } from 'vega';
import { changeset } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(5);
  let t = 0;
  const names = ['north', 'south', 'east'];
  const step = (): { s: string; t: number; y: number }[] => {
    t += 1;
    return names.map((s, i) => ({ s, t, y: Math.round(50 + 30 * Math.sin(t / (3 + i)) + (rand() - 0.5) * 16) }));
  };
  const first = Array.from({ length: 20 }, step).flat();

  const spec: Spec = {
    width: 450, height: 200, padding: 5,
    data: [{ name: 'table', values: first }],
    scales: [{ name: 'g', type: 'band', domain: { data: 'table', field: 's' }, range: 'width', paddingInner: 0.08 }],
    marks: [
      {
        type: 'group',
        from: {
          // The facet makes a data set called "part" inside each group, and
          // gives the group's own datum the aggregate (mean of y, as "avg").
          facet: { name: 'part', data: 'table', groupby: 's', aggregate: { fields: ['y'], ops: ['mean'], as: ['avg'] } },
        },
        encode: {
          update: {
            x: { scale: 'g', field: 's' },
            width: { scale: 'g', band: 1 },
            height: { signal: 'height' },
            stroke: { value: '#445' },
          },
        },
        scales: [
          { name: 'x', type: 'linear', domain: { data: 'part', field: 't' }, range: 'width', zero: false },
          { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
        ],
        marks: [
          {
            type: 'line',
            from: { data: 'part' },
            encode: {
              update: {
                x: { scale: 'x', field: 't' }, y: { scale: 'y', field: 'y' },
                stroke: { value: 'steelblue' }, strokeWidth: { value: 2 },
              },
            },
          },
          {
            type: 'rule',
            encode: {
              update: {
                x: { value: 0 }, x2: { signal: 'width' },
                y: { scale: 'y', field: { parent: 'avg' } },
                stroke: { value: 'orange' }, strokeDash: { value: [4, 3] },
              },
            },
          },
          {
            type: 'text',
            encode: {
              update: {
                x: { signal: 'width / 2' }, y: { value: 12 }, align: { value: 'center' },
                text: { signal: "parent.s + ' (mean ' + format(parent.avg, '.1f') + ')'" },
                fontSize: { value: 12 },
              },
            },
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);

  const advance = (): Promise<unknown> => {
    const rows = step();
    return view.change('table', changeset().insert(rows).remove((d: { t: number }) => d.t <= t - 20)).runAsync();
  };
  if (stage.preview) stage.every(500, () => void advance());
  if (stage.bar) button(stage.bar, 'Next reading', () => void advance());
  return () => stage.dispose();
};

export default mount;
