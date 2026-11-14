// Markers on the link mark: a reviewer matrix drawn as arrows between people
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const MARKERS = ['arrow', 'arrow-reverse', 'circle', 'dot', 'tick', 'none'] as const;
type MarkerName = (typeof MARKERS)[number];

const people = ['Jacob', 'Olivia', 'Mia', 'Noah', 'Ava', 'Mason', 'Emma'];
// Who reviewed whose code (the Shorthand page's matrix).
const pairs: [string, string][] = [
  ['Jacob', 'Olivia'], ['Mia', 'Noah'], ['Noah', 'Ava'], ['Ava', 'Mason'], ['Olivia', 'Noah'], ['Jacob', 'Emma'],
  ['Ava', 'Noah'], ['Noah', 'Jacob'], ['Olivia', 'Ava'], ['Mason', 'Emma'], ['Jacob', 'Mia'], ['Emma', 'Jacob'],
];
const pos = new Map(people.map((p, i) => [p, { x: Math.cos((i / people.length) * 2 * Math.PI), y: Math.sin((i / people.length) * 2 * Math.PI) }]));
const links = pairs.map(([a, b]) => ({ from: a, x1: pos.get(a)!.x, y1: pos.get(a)!.y, x2: pos.get(b)!.x, y2: pos.get(b)!.y }));
const nodes = people.map((p) => ({ name: p, ...pos.get(p)! }));

const mount: Mount = (el, ctx) =>
  mountPlot<{ marker: MarkerName }>(el, ctx, {
    initial: { marker: 'arrow' },
    render: ({ marker }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? `markerEnd: ${marker}` : undefined,
        aspectRatio: 1,
        axis: null,
        inset: 24,
        marks: [
          Plot.link(links, { x1: 'x1', y1: 'y1', x2: 'x2', y2: 'y2', curve: 'bump-x', stroke: 'from', markerEnd: marker }),
          Plot.dot(nodes, { x: 'x', y: 'y', fill: 'currentColor', r: 3 }),
          preview ? null : Plot.text(nodes, { x: 'x', y: 'y', text: 'name', dy: -12 }),
        ],
      }),
    step: (_s, i) => ({ marker: MARKERS[i % MARKERS.length] }),
    previewMs: 1700,
    controls: (bar, live) => {
      select(bar, 'markerEnd', MARKERS, live.state.marker, (marker) => live.set({ marker }));
    },
  });

export default mount;
