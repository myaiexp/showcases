// combo.palette as a registered palette name: fills assigned by combo id
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const NAMES = ['tableau', 'spectral', 'blues'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: { combos: Array.from({ length: 8 }, (_, i) => ({ id: `combo-${i}` })) },
        layout: { type: 'grid', cols: 4 },
        combo: { style: { fillOpacity: 0.5, collapsedSize: 36 }, palette: 'tableau' },
      }),
    );
    await graph.render();
    const set = async (name: string): Promise<void> => {
      graph.setCombo({ style: { fillOpacity: 0.5, collapsedSize: 36 }, palette: name });
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'palette', NAMES, 'tableau', (v) => void set(v));
    else stage.every(1500, (i) => set(NAMES[i % 3]!));
  });

export default mount;
