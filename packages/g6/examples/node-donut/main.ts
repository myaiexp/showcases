// Donut node: donuts as plain numbers, donutPalette, innerR and size
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const PALETTES = { custom: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'], tableau: 'tableau', spectral: 'spectral' } as const;
type PaletteName = keyof typeof PALETTES;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: {
          nodes: [
            {
              id: 'node1',
              style: {
                fill: 'transparent',
                size: 60,
                // Numbers are shares of the ring: 30, 30, 20, 20 of 100.
                donuts: [30, 30, 20, 20],
                donutPalette: [...PALETTES.custom],
              },
            },
          ],
        },
        node: { type: 'donut' },
        plugins: [{ type: 'grid-line', size: 30 }],
      }),
    );
    await graph.render();

    const update = async (style: Record<string, unknown>): Promise<void> => {
      graph.updateNodeData([{ id: 'node1', style }]);
      await graph.draw();
    };

    if (stage.bar) {
      slider(stage.bar, 'size', [20, 120, 1], 60, (v) => void update({ size: v }));
      // innerR is a percentage string of the outer radius, as the docs' panel sends it.
      slider(stage.bar, 'innerR (%)', [0, 95, 1], 50, (v) => void update({ innerR: `${v}%` }));
      select(stage.bar, 'donutPalette', Object.keys(PALETTES) as PaletteName[], 'custom', (v) => {
        const p = PALETTES[v];
        void update({ donutPalette: typeof p === 'string' ? p : [...p] });
      });
    } else {
      const sets = [[30, 30, 20, 20], [60, 10, 10, 20], [10, 10, 10, 70], [25, 25, 25, 25]];
      stage.every(1200, (i) => update({ donuts: sets[i % 4]!, innerR: `${[50, 30, 70, 50][i % 4]}%` }));
    }
  });

export default mount;
