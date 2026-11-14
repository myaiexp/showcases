// A discrete palette is a colour array: register it, then use its name in node.palette
import { ExtensionCategory, Graph, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// Hex, rgb() and colour names are all accepted in one array.
register(ExtensionCategory.PALETTE, 'showcase-theme-neon', ['#ff2e93', 'rgb(0, 229, 255)', 'lime', '#ffd400']);
register(ExtensionCategory.PALETTE, 'showcase-theme-earth', ['#8d6e63', '#a1887f', 'darkolivegreen', 'rgb(210, 180, 140)']);

const NAMES = ['showcase-theme-neon', 'showcase-theme-earth'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const palette = (color: string) => ({ type: 'group' as const, field: 'category', color });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: { nodes: Array.from({ length: 12 }, (_, i) => ({ id: `node-${i}`, data: { category: 'ABCD'[i % 4] } })) },
        layout: { type: 'grid', cols: 6 },
        node: { style: { size: 30, labelText: (d) => String(d.data?.category), labelPlacement: 'bottom' }, palette: palette(NAMES[0]) },
      }),
    );
    await graph.render();

    const setPalette = async (name: string): Promise<void> => {
      graph.setNode({ style: { size: 30, labelText: (d) => String(d.data?.category), labelPlacement: 'bottom' }, palette: palette(name) });
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'registered palette', NAMES, NAMES[0], (v) => void setPalette(v));
    else stage.every(1400, (i) => setPalette(NAMES[i % 2]!));
  });

export default mount;
