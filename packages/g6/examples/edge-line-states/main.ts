// A line edge in each built-in state, with label, arrow and badge, on a radial layout
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const STATES = ['active', 'selected', 'highlight', 'inactive', 'default'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: ['node1', 'node2', 'node3', 'node4', 'node5', 'node6'].map((id) => ({ id })),
          edges: [
            { id: 'line-default', source: 'node1', target: 'node2' },
            { id: 'line-active', source: 'node1', target: 'node3', states: ['active'] },
            { id: 'line-selected', source: 'node1', target: 'node4', states: ['selected'] },
            { id: 'line-highlight', source: 'node1', target: 'node5', states: ['highlight'] },
            { id: 'line-inactive', source: 'node1', target: 'node6', states: ['inactive'] },
          ],
        },
        node: { style: { size: 14 } },
        edge: {
          type: 'line',
          style: {
            labelText: (d) => d.id,
            labelFontSize: 9,
            labelBackground: true,
            endArrow: true,
            // Text badge in place of the docs' iconfont glyph, which would need a CSS fetch.
            badgeText: '!',
            badgeFontSize: 8,
            badgeBackgroundWidth: 12,
            badgeBackgroundHeight: 12,
          },
        },
        layout: { type: 'radial', unitRadius: 90, linkDistance: 90 },
      }),
    );
    await graph.render();
    // Give every edge the chosen state, to compare the five looks one at a time.
    const all = async (s: (typeof STATES)[number]): Promise<void> => {
      const ids = graph.getEdgeData().map((d) => String(d.id));
      await graph.setElementState(Object.fromEntries(ids.map((id) => [id, s === 'default' ? [] : [s]])));
    };
    if (stage.bar) select(stage.bar, 'state on every edge', STATES, 'default', (v) => void all(v));
    else stage.every(1200, (i) => all(STATES[i % STATES.length]!));
  });

export default mount;
