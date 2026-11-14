// An update animation limited to the stroke field, with a duration and easing
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

const COLORS = ['#5B8FF9', '#F5222D', '#52C41A', '#FAAD14'];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: rows(3, { gap: 50 }),
        edge: {
          style: { lineWidth: 6, stroke: COLORS[0], lineDash: [] },
          // Only the stroke tweens over a second; other changed fields jump straight to the new value.
          animation: { update: [{ fields: ['stroke'], duration: 1000, easing: 'linear' }] },
        },
      }),
    );
    await graph.render();
    let k = 0;
    const recolor = async (): Promise<void> => {
      k++;
      graph.updateEdgeData(graph.getEdgeData().map((d, j) => ({ id: String(d.id), style: { stroke: COLORS[(k + j) % COLORS.length], lineWidth: k % 2 ? 6 : 12 } })));
      await graph.draw();
    };
    if (stage.bar) button(stage.bar, 'change stroke and lineWidth', () => void recolor());
    else stage.every(1600, recolor);
  });

export default mount;
