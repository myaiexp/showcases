// FieldValue lookups: datum, group, parent, indirect and level
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

// Pre-faceted data: each outer row holds mids, and each mid holds leaves.
const leaf = (k: number, v: number, pick: string) => ({ k, v, pick });
const TREE = [
  {
    id: 'A', tint: '#ff9f43', ox: 0,
    mids: [
      { name: 'a1', xo: 8, p1: 6, p2: 40, leaves: [leaf(0, 5, 'p1'), leaf(1, 3, 'p2'), leaf(2, 6, 'p1')] },
      { name: 'a2', xo: 100, p1: 6, p2: 40, leaves: [leaf(0, 2, 'p2'), leaf(1, 6, 'p1'), leaf(2, 4, 'p2')] },
    ],
  },
  {
    id: 'B', tint: '#2ecc71', ox: 210,
    mids: [
      { name: 'b1', xo: 8, p1: 4, p2: 20, leaves: [leaf(0, 4, 'p2'), leaf(1, 6, 'p2'), leaf(2, 2, 'p1')] },
      { name: 'b2', xo: 100, p1: 30, p2: 8, leaves: [leaf(0, 6, 'p1'), leaf(1, 1, 'p2'), leaf(2, 5, 'p1')] },
    ],
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 150,
    padding: 5,

    signals: [{ name: 'k', value: 6, bind: { input: 'range', min: 3, max: 8, step: 1, name: 'bar scale' } }],
    data: [{ name: 'tree', values: TREE }],

    marks: [
      {
        type: 'group',
        // Pre-faceted: each outer group is backed by one TREE row and gets its `mids` array as local data.
        from: { facet: { name: 'mids', data: 'tree', field: 'mids' } },
        encode: { update: { x: { field: 'ox' }, width: { value: 200 }, height: { value: 140 }, stroke: { field: 'tint' } } },
        marks: [
          {
            type: 'group',
            from: { facet: { name: 'leaves', data: 'mids', field: 'leaves' } },
            encode: { update: { x: { field: 'xo' }, y: { value: 6 }, width: { value: 90 }, height: { value: 128 }, stroke: { value: '#667' } } },
            marks: [
              {
                type: 'rect',
                from: { data: 'leaves' },
                encode: {
                  update: {
                    // Indirect lookup: the leaf's `pick` names a field of the parent (mid) datum.
                    x: { field: { parent: { datum: 'pick' } } },
                    // {datum} is the plain lookup, here with the slider as a multiplier.
                    width: { field: 'v', mult: { signal: 'k' } },
                    y: { field: 'k', mult: 34, offset: 6 },
                    // {group} reads a property of the enclosing group item: its height.
                    height: { field: { group: 'height' }, mult: 0.2 },
                    // level 2 skips the mid and reads the outer row, two groups up.
                    fill: { field: { parent: 'tint', level: 2 } },
                  },
                },
              },
              {
                type: 'text',
                encode: { update: { x: { value: 4 }, y: { value: 120 }, fontSize: { value: 10 }, text: { field: { parent: 'name' } } } },
              },
            ],
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'k', [3, 8, 5, 7, 6], 1200);
  return () => stage.dispose();
};

export default mount;
