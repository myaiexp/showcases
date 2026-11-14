// Halos shown only in custom hover and selected states, set by pointer events
import { Graph, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';
import { nested } from '../../shared/combo-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: nested(),
        node: { style: { fill: '#7e3feb' } },
        combo: {
          style: { halo: false, labelText: (d) => d.id, fill: '#999', fillOpacity: 0.1 },
          state: {
            hover: { halo: true, haloStroke: '#FF7A00', haloLineWidth: 10, haloStrokeOpacity: 0.4 },
            selected: { halo: true, haloStroke: '#52C41A', haloLineWidth: 6, haloStrokeOpacity: 0.6 },
          },
        },
      }),
    );
    await graph.render();
    if (stage.bar) {
      const hover = new Set<string>();
      const selected = new Set<string>();
      const sync = (id: string): void => void graph.setElementState(id, [...(hover.has(id) ? ['hover'] : []), ...(selected.has(id) ? ['selected'] : [])]);
      graph.on('combo:pointerenter', (e: IElementEvent) => (hover.add(e.target.id), sync(e.target.id)));
      graph.on('combo:pointerleave', (e: IElementEvent) => (hover.delete(e.target.id), sync(e.target.id)));
      graph.on('combo:click', (e: IElementEvent) => (selected.has(e.target.id) ? selected.delete(e.target.id) : selected.add(e.target.id), sync(e.target.id)));
    } else {
      const seq: Record<string, string[]>[] = [
        { combo1: ['hover'], combo2: [] },
        { combo1: ['selected'], combo2: ['hover'] },
        { combo1: [], combo2: ['selected'] },
        { combo1: ['hover', 'selected'], combo2: ['selected'] },
      ];
      stage.every(1000, (i) => graph.setElementState(seq[i % seq.length]!));
    }
  });

export default mount;
