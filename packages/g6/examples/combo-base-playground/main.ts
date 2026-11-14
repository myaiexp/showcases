// The BaseCombo online experience: collapsed, collapsedSize and the collapsed marker
import { Graph, type ComboOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { nested } from '../../shared/combo-data.ts';

const TYPES = ['child-count', 'descendant-count', 'node-count'] as const;
interface Opts {
  collapsed: boolean;
  size: number;
  marker: boolean;
  fontSize: number;
  type: (typeof TYPES)[number];
}
const comboOf = (o: Opts): ComboOptions => ({
  style: {
    labelText: (d) => d.id,
    labelPadding: [1, 10],
    labelFill: '#fff',
    labelBackground: true,
    labelBackgroundRadius: 4,
    labelBackgroundFill: '#7e3feb',
    padding: 16,
    // The docs apply the collapse options to combo2 only.
    collapsed: (d) => (d.id === 'combo2' ? o.collapsed : false),
    collapsedSize: o.size,
    collapsedMarker: o.marker,
    collapsedMarkerFontSize: o.fontSize,
    collapsedMarkerType: o.type,
  },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const o: Opts = { collapsed: false, size: 32, marker: true, fontSize: 12, type: 'child-count' };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: nested(),
        node: { style: { fill: '#7e3feb' } },
        combo: comboOf(o),
        behaviors: ['collapse-expand', 'drag-element'],
        animation: true,
      }),
    );
    await graph.render();
    const apply = async (): Promise<void> => {
      graph.setCombo(comboOf(o));
      await graph.draw();
    };
    if (stage.bar) {
      toggle(stage.bar, 'collapsed (combo2)', o.collapsed, (v) => ((o.collapsed = v), void apply()));
      slider(stage.bar, 'collapsedSize', [0, 100, 1], o.size, (v) => ((o.size = v), void apply()));
      toggle(stage.bar, 'collapsedMarker', o.marker, (v) => ((o.marker = v), void apply()));
      slider(stage.bar, 'collapsedMarkerFontSize', [12, 20, 1], o.fontSize, (v) => ((o.fontSize = v), void apply()));
      select(stage.bar, 'collapsedMarkerType', TYPES, o.type, (v) => ((o.type = v), void apply()));
    } else {
      stage.every(1500, (i) => ((o.collapsed = i % 2 === 1), (o.type = TYPES[(i >> 1) % 3]!), apply()));
    }
  });

export default mount;
