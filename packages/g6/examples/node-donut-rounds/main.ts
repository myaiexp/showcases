// Donut rings from DonutRound objects: value, color, fill, stroke, lineWidth
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        data: {
          nodes: [
            { id: 'colors', style: { x: 60, y: 70, donuts: [{ value: 50, color: 'red' }, { value: 150, color: 'green' }, { value: 100, color: 'blue' }] } },
            { id: 'outlined', style: { x: 180, y: 70, donuts: [{ value: 150, fill: 'pink', stroke: '#fff', lineWidth: 1 }, { value: 250, stroke: '#fff', lineWidth: 1 }, { value: 200, stroke: '#fff', lineWidth: 1 }] } },
            { id: 'ring-style', style: { x: 300, y: 70, donuts: [100, 200, 100, 200], donutLineWidth: 2, donutStroke: '#0b1020', donutPalette: 'spectral' } },
          ],
        },
        node: {
          type: 'donut',
          style: { size: 80, fill: '#DB9D0D', innerR: 20, labelText: (d) => d.id, labelFill: '#d9e2ff' },
        },
      }),
    );
    await graph.render();

    // innerR here is in px (the docs' gallery uses 20); the other pages use a % string.
    const setInner = async (r: number): Promise<void> => {
      graph.updateNodeData(['colors', 'outlined', 'ring-style'].map((id) => ({ id, style: { innerR: r } })));
      await graph.draw();
    };

    if (stage.bar) slider(stage.bar, 'innerR (px)', [0, 38, 1], 20, (v) => void setInner(v));
    else stage.every(1000, (i) => setInner([20, 30, 8, 36][i % 4]!));
  });

export default mount;
