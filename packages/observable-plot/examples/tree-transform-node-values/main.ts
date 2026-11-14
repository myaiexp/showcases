// Named node values: name, path, depth, height, internal
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const paths = [
  'Chaos/Gaia/Mountains',
  'Chaos/Gaia/Pontus',
  'Chaos/Gaia/Uranus',
  'Chaos/Eros',
  'Chaos/Erebus',
  'Chaos/Tartarus',
];
const VALUES = ['node:name', 'node:path', 'node:depth', 'node:height', 'node:internal', 'node:external'] as const;
type Value = (typeof VALUES)[number];

const mount: Mount = (el, ctx) =>
  mountPlot<{ value: Value }>(el, ctx, {
    initial: { value: 'node:depth' },
    render: ({ value }, { width, height }) =>
      Plot.plot({
        width,
        height: height ?? 200,
        axis: null,
        margin: 20,
        marginRight: value === 'node:path' ? 220 : 120,
        marks: [
          // On a link, node:* names the child and parent:* the parent node.
          Plot.link(paths, Plot.treeLink({ stroke: 'node:depth', strokeOpacity: 0.8 })),
          Plot.dot(paths, Plot.treeNode({ fill: 'node:height' })),
          Plot.text(paths, Plot.treeNode({ text: value, dx: 7 })),
        ],
        color: { scheme: 'Cool' },
      }),
    step: (_s, i) => ({ value: VALUES[i % VALUES.length] ?? 'node:name' }),
    previewMs: 1800,
    controls: (bar, live) => {
      select(bar, 'text', VALUES, live.state.value, (value) => live.set({ value }));
    },
  });

export default mount;
