// Extent: the [min, max] of a field lands in a signal, and the data passes through unchanged
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { reshuffle } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const make = (n: number): object[] => {
  const rand = rng(70 + n);
  return Array.from({ length: 24 }, (_, i) => ({ i, v: Math.round(15 + rand() * 70) }));
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 5,
    data: [
      {
        name: 'readings',
        values: make(0),
        // `signal` publishes [min, max] as `range`; the rows themselves are untouched.
        transform: [{ type: 'extent', field: 'v', signal: 'range' }],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [-1, 24], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x', title: 'index' }, { orient: 'left', scale: 'y' }],
    title: { text: { signal: "'extent = [' + range[0] + ', ' + range[1] + ']'" }, color: '#ddd' },
    marks: [
      {
        type: 'rect',
        encode: {
          update: {
            x: { value: 0 },
            x2: { signal: 'width' },
            y: { scale: 'y', signal: 'range[1]' },
            y2: { scale: 'y', signal: 'range[0]' },
            fill: { value: 'steelblue' },
            fillOpacity: { value: 0.18 },
          },
        },
      },
      {
        type: 'symbol',
        from: { data: 'readings' },
        encode: {
          update: {
            x: { scale: 'x', field: 'i' },
            y: { scale: 'y', field: 'v' },
            fill: { value: 'orange' },
            size: { value: 50 },
          },
        },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { value: 0 },
            x2: { signal: 'width' },
            y: { scale: 'y', signal: 'range[0]' },
            stroke: { value: '#8cf' },
          },
        },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { value: 0 },
            x2: { signal: 'width' },
            y: { scale: 'y', signal: 'range[1]' },
            stroke: { value: '#8cf' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  reshuffle(stage, view, 'readings', make, 1800);
  return () => stage.dispose();
};

export default mount;
