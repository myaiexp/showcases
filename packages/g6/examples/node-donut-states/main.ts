// Donut nodes in each built-in state, with halo, badges and ports
import { Graph, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const STATES = ['active', 'selected', 'highlight', 'inactive', 'disabled'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        animation: false,
        data: {
          nodes: [{ id: 'default' }, { id: 'halo' }, { id: 'badges' }, { id: 'ports' }, ...STATES.map((s) => ({ id: s, states: [s] }))],
        },
        node: {
          type: 'donut',
          style: {
            size: 60,
            fill: '#DB9D0D',
            innerR: 14,
            donuts: (d: NodeData) =>
              d.id === 'halo'
                ? [{ value: 50, color: 'red' }, { value: 150, color: 'green' }, { value: 100, color: 'blue' }]
                : d.id === 'active'
                  ? [{ value: 150, fill: 'pink', stroke: '#fff', lineWidth: 1 }, { value: 250, stroke: '#fff', lineWidth: 1 }, { value: 200, stroke: '#fff', lineWidth: 1 }]
                  : d.id === 'default'
                    ? [1, 2, 3]
                    : [100, 200, 100, 200],
            labelText: (d: NodeData) => d.id,
            halo: (d: NodeData) => d.id === 'halo',
            badges: (d: NodeData) =>
              d.id === 'badges'
                ? [
                    { text: 'A', placement: 'right-top' },
                    { text: 'Important', placement: 'right' },
                    { text: 'Notice', placement: 'right-bottom' },
                  ]
                : [],
            badgeFontSize: 8,
            badgePadding: [1, 4],
            portR: 3,
            ports: (d: NodeData) =>
              d.id === 'ports' ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }] : [],
          },
        },
        layout: { type: 'grid', cols: 3 },
      }),
    );
    await graph.render();

    const setState = (s: string): Promise<void> => graph.setElementState('default', s === 'none' ? [] : [s]);
    if (stage.bar) select(stage.bar, 'state of "default"', ['none', ...STATES] as const, 'none', (v) => void setState(v));
    else stage.every(1300, (i) => setState(['none', ...STATES][i % 6]!));
  });

export default mount;
