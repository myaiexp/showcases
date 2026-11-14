// Sankey link.style.fill: a gradient from source colour to target colour
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, COLORS, budgetFlat } from '../../shared/flow-data.ts';

interface LinkDatum {
  source?: string;
  target?: string;
  datum?: { source?: string; target?: string };
}

/** Looks up the colours of both ends of a link, whichever way the datum carries them. */
const gradient = (d: LinkDatum): object => {
  const src = d.source ?? d.datum?.source ?? '';
  const dst = d.target ?? d.datum?.target ?? '';
  return {
    gradient: 'linear',
    x0: 0, y0: 0.5, x1: 1, y1: 0.5,
    stops: [
      { offset: 0, color: COLORS[src] ?? '#888' },
      { offset: 1, color: COLORS[dst] ?? '#888' },
    ],
  };
};

const mount: Mount = (el, ctx) =>
  mountLive<{ opacity: number }>(el, ctx, {
    initial: { opacity: 0.7 },
    build: ({ opacity }, preview) =>
      asSpec({
        type: 'sankey',
        data: [{ id: 'data', values: budgetFlat() }],
        categoryField: 'nodeName',
        valueField: 'value',
        sourceField: 'source',
        targetField: 'target',
        nodeKey: 'nodeName',
        nodeGap: preview ? 6 : 10,
        nodeWidth: 12,
        minNodeHeight: 4,
        label: { visible: true, style: { fontSize: preview ? 8 : 11 } },
        nodeAlign: 'justify',
        node: { style: { fill: (d: { nodeName?: string; name?: string; datum?: { nodeName?: string } }) => COLORS[d.nodeName ?? d.datum?.nodeName ?? d.name ?? ''] ?? '#888' } },
        link: { style: { fill: gradient, fillOpacity: opacity } },
      }),
    controls: (bar, live) => {
      slider(bar, 'opacity', [0.1, 1, 0.05], 0.7, (v) => live.set({ opacity: v }));
    },
    step: (_s, i) => ({ opacity: [0.7, 0.25, 1, 0.5][i % 4] as number }),
    previewMs: 1600,
  });

export default mount;
