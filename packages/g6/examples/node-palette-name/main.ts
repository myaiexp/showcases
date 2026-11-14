// node.palette as a registered name (tableau, spectral...), by id, with invert
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const NAMES = ['tableau', 'spectral', 'oranges', 'blues'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const state = { color: 'tableau' as string, invert: false };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: { nodes: Array.from({ length: 10 }, (_, i) => ({ id: `node-${i}` })) },
        layout: { type: 'grid', cols: 5 },
        node: { style: { size: 30 }, palette: { type: 'group', color: state.color, invert: state.invert } },
      }),
    );
    await graph.render();

    // With no field given the palette groups by id, so every node gets the next colour.
    const apply = async (): Promise<void> => {
      graph.setNode({ style: { size: 30 }, palette: { type: 'group', color: state.color, invert: state.invert } });
      await graph.draw();
    };

    if (stage.bar) {
      select(stage.bar, 'palette', NAMES, 'tableau', (v) => ((state.color = v), void apply()));
      toggle(stage.bar, 'invert', false, (v) => ((state.invert = v), void apply()));
    } else {
      stage.every(1300, (i) => {
        state.color = NAMES[i % NAMES.length]!;
        state.invert = i % 8 >= 4;
        return apply();
      });
    }
  });

export default mount;
