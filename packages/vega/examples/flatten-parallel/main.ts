// Flatten parallel arrays: several array fields unrolled together, the shorter padded with null
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { reshuffle, rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const make = (n: number): object[] => {
  const rand = rng(100 + n);
  return ['alpha', 'beta'].map((key, i) => {
    const count = 2 + Math.floor(rand() * 3) + (n + i) % 2;
    return {
      key,
      foo: Array.from({ length: count }, (_, j) => j + 1 + i * 5),
      bar: 'ABCDEFG'.slice(0, Math.max(1, count - 1 - ((n + i) % 2))).split(''),
    };
  });
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 220,
    height: 120,
    padding: 5,
    data: [
      { name: 'nested', values: make(0) },
      {
        name: 'flat',
        source: 'nested',
        // The longest array wins: missing entries of the shorter one come out as null.
        transform: [{ type: 'flatten', fields: ['foo', 'bar'] }],
      },
      rowsOf('rows', 'flat', 12),
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 11], range: 'width' },
      { name: 'y', type: 'point', domain: ['alpha', 'beta'], range: 'height', padding: 0.6 },
    ],
    axes: [{ orient: 'left', scale: 'y' }, { orient: 'bottom', scale: 'x', title: 'foo', tickMinStep: 1 }],
    marks: [
      {
        type: 'symbol',
        from: { data: 'flat' },
        encode: {
          update: {
            x: { scale: 'x', field: 'foo' },
            y: { scale: 'y', field: 'key' },
            size: { value: 420 },
            // A null bar leaves the circle hollow.
            fill: { signal: "isValid(datum.bar) ? 'steelblue' : 'transparent'" },
            stroke: { value: 'steelblue' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'flat' },
        encode: {
          update: {
            x: { scale: 'x', field: 'foo' },
            y: { scale: 'y', field: 'key' },
            text: { field: 'bar' },
            align: { value: 'center' },
            baseline: { value: 'middle' },
            fill: { value: '#fff' },
          },
        },
      },
      ...tableMarks('rows', [{ field: 'key', width: 50 }, { field: 'foo', width: 36 }, { field: 'bar' }]),
    ],
  };

  const view = await stage.render(spec);
  reshuffle(stage, view, 'nested', make, 2000);
  return () => stage.dispose();
};

export default mount;
