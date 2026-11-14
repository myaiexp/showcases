// Arc diagram of Les Miserables: arrows with sweep orient each undirected bulge
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { miserables } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const sweeps = ['-y', '+y', '-x', '+x', '1', '-1', '0'] as const;
type Sweep = (typeof sweeps)[number];
const sweepValue = (s: Sweep): number | '-y' | '+y' | '-x' | '+x' => (s === '1' || s === '-1' || s === '0' ? Number(s) : s);

const mount: Mount = async (el, ctx) => {
  const full = await miserables();
  // A card shows the first 30 characters only: 77 dots do not fit in 200px.
  const keep = new Set(full.nodes.slice(0, 30).map((n) => n.id));
  const data = ctx.preview
    ? { ...full, nodes: full.nodes.filter((n) => keep.has(n.id)), links: full.links.filter((l) => keep.has(l.source) && keep.has(l.target)) }
    : full;
  const samegroup = ({ source, target }: { source: string; target: string }): number | null => {
    const a = data.groups.get(source);
    return a === data.groups.get(target) ? (a ?? null) : null;
  };
  return mountPlot(el, ctx, {
    initial: { sweep: '-y' as Sweep },
    render: ({ sweep }, { width, height, preview }) =>
      Plot.plot({
        width,
        height: height ?? 1080,
        marginLeft: preview ? 20 : 100,
        axis: null,
        x: { domain: [0, 1] },
        color: { domain: d3.range(10), unknown: '#ccc' },
        marks: [
          Plot.dot(data.nodes, { x: 0, y: 'id', fill: 'group', sort: { y: 'fill' } }),
          preview ? null : Plot.text(data.nodes, { x: 0, y: 'id', text: 'id', textAnchor: 'end', dx: -6, fill: 'group' }),
          // bend: 90 with headLength 0 draws semicircles; sweep picks the side they bulge to.
          Plot.arrow(data.links, { x: 0, y1: 'source', y2: 'target', sweep: sweepValue(sweep), bend: 90, headLength: 0, stroke: samegroup, sort: samegroup, reverse: true }),
        ],
      }),
    step: (_s, i) => ({ sweep: sweeps[i % sweeps.length] }),
    previewMs: 2000,
    controls: (bar, live) => select(bar, 'sweep', sweeps, live.state.sweep, (sweep) => live.set({ sweep })),
  });
};

export default mount;
