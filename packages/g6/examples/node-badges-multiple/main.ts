// Several badges at once, coloured from badgePalette in order
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const PALETTES = {
  default: ['#7E92B5', '#F4664A', '#FFBE3A'],
  cool: ['#1783FF', '#00C9C9', '#7863FF'],
  warm: ['#F08F56', '#D580FF', '#E86452'],
} as const;
type PaletteName = keyof typeof PALETTES;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const style: { badgePalette: string[]; badgeFontSize: number } = { badgePalette: [...PALETTES.default], badgeFontSize: 7 };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node1' }] },
        node: {
          style: {
            size: 40,
            fill: '#5B8FF9',
            badge: true,
            badges: [
              { text: 'A', placement: 'right-top' },
              { text: 'Important', placement: 'right' },
              { text: 'Notice', placement: 'right-bottom' },
            ],
            ...style,
          },
        },
      }),
    );
    await graph.render();

    const apply = async (patch: Partial<typeof style>): Promise<void> => {
      Object.assign(style, patch);
      graph.updateNodeData([{ id: 'node1', style: { ...style } }]);
      await graph.draw();
    };

    if (stage.bar) {
      select(stage.bar, 'badgePalette', Object.keys(PALETTES) as PaletteName[], 'default', (v) => void apply({ badgePalette: [...PALETTES[v]] }));
      slider(stage.bar, 'badgeFontSize', [5, 16, 1], 7, (v) => void apply({ badgeFontSize: v }));
    } else {
      const names = Object.keys(PALETTES) as PaletteName[];
      stage.every(1200, (i) => apply({ badgePalette: [...PALETTES[names[i % 3]!]], badgeFontSize: 7 + (i % 2) * 3 }));
    }
  });

export default mount;
