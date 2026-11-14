// collapsedMarkerType: child-count, descendant-count or node-count on a collapsed combo
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { nested } from '../../shared/combo-data.ts';

const TYPES = ['child-count', 'descendant-count', 'node-count'] as const;
type MarkerType = (typeof TYPES)[number];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = nested();
    // Collapse the outer combo: its child is combo1, its descendants add node1 and node2.
    data.combos![1]!.style = { collapsed: true };
    const style = (type: MarkerType, marker: boolean) => ({
      collapsedSize: 44,
      collapsedMarker: marker,
      collapsedMarkerType: type,
      collapsedMarkerFontSize: 14,
      labelText: (d: { id: string }) => d.id,
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data,
        node: { style: { fill: '#7e3feb' } },
        combo: { style: style('child-count', true) },
        behaviors: ['collapse-expand'],
      }),
    );
    await graph.render();
    let type: MarkerType = 'child-count';
    let marker = true;
    const apply = async (): Promise<void> => {
      graph.setCombo({ style: style(type, marker) });
      await graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'collapsedMarkerType', TYPES, type, (v) => ((type = v), void apply()));
      toggle(stage.bar, 'collapsedMarker', marker, (v) => ((marker = v), void apply()));
    } else {
      stage.every(1400, (i) => ((type = TYPES[i % 3]!), apply()));
    }
  });

export default mount;
