// sankey overflow: fixed node height makes a tall diagram, scroll bars keep it readable
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { rng } from '../../shared/components-data.ts';

const r = rng(31);
const SOURCES = Array.from({ length: 12 }, (_, i) => `Source ${i + 1}`);
const TARGETS = ['Team A', 'Team B', 'Team C'];
const LINKS = SOURCES.flatMap((source) => TARGETS.filter(() => r() > 0.45).map((target) => ({ source, target, value: Math.round(5 + r() * 25) })));

const NODES = [...new Set(LINKS.flatMap((l) => [l.source, l.target]))].map((nodeName) => ({ nodeName }));
const MODES = ['scroll', 'scroll-y', 'hidden'];

const mount: Mount = (el, ctx) =>
  mountLive<{ overflow: string; height: number }>(el, ctx, {
    initial: { overflow: 'scroll', height: 40 },
    mode: 'rebuild',
    previewMs: 1800,
    step: (s) => ({ overflow: s.overflow === 'scroll' ? 'hidden' : 'scroll' }),
    build: (s, preview) =>
      ({
        type: 'sankey',
        data: [{ id: 'd', values: [{ nodes: NODES, links: LINKS }] }],
        categoryField: 'nodeName',
        valueField: 'value',
        sourceField: 'source',
        targetField: 'target',
        nodeKey: 'nodeName',
        nodeWidth: 14,
        nodeGap: 8,
        // A fixed height per node, whatever the region; overflow decides what happens to the excess.
        nodeHeight: preview ? 18 : s.height,
        overflow: s.overflow,
        link: { style: { fillOpacity: 0.45 } },
        label: { visible: true, style: { fontSize: preview ? 8 : 11 } },
      }) as never,
    controls: (bar, live) => {
      select(bar, 'overflow', MODES, (v) => live.set({ overflow: v }));
      slider(bar, 'nodeHeight', [10, 80, 5], live.state.height, (v) => live.set({ height: v }));
    },
  });

export default mount;
