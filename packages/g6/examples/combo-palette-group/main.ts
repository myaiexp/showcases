// combo.palette with type group: combos of one data.category share a fill
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const SCHEMES: Record<string, string[]> = {
  docs: ['#1783FF', '#F08F56', '#D580FF', '#00C9C9', '#7863FF'],
  warm: ['#FF7875', '#FFA940', '#FFC53D', '#FF85C0', '#F5222D'],
  cool: ['#36CFC9', '#4096FF', '#597EF7', '#9254DE', '#13C2C2'],
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 20,
        data: {
          combos: Array.from({ length: 8 }, (_, i) => ({ id: `combo-${i}`, data: { category: 'ABCDE'[i % 5] } })),
        },
        layout: { type: 'grid', cols: 4 },
        combo: {
          style: { fillOpacity: 0.5, collapsedSize: 36, labelText: (d) => String(d.data?.category), labelPlacement: 'center', labelFill: '#fff' },
          palette: { type: 'group', field: 'category', color: SCHEMES.docs! },
        },
      }),
    );
    await graph.render();
    const names = Object.keys(SCHEMES);
    const set = async (name: string): Promise<void> => {
      graph.setCombo({
        style: { fillOpacity: 0.5, collapsedSize: 36, labelText: (d: { data?: { category?: unknown } }) => String(d.data?.category), labelPlacement: 'center', labelFill: '#fff' },
        palette: { type: 'group', field: 'category', color: SCHEMES[name]! },
      });
      await graph.draw();
    };
    if (stage.bar) select(stage.bar, 'palette.color', names, names[0]!, (v) => void set(v));
    else stage.every(1500, (i) => set(names[i % names.length]!));
  });

export default mount;
