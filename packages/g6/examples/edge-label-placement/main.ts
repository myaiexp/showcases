// labelPlacement: start, center, end or a ratio from 0 to 1 along the edge
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rows } from '../../shared/edge-data.ts';

const edgeOf = (placement: 'start' | 'center' | 'end' | number): EdgeOptions => ({
  style: { stroke: '#5CACEE', labelText: String(placement), labelPlacement: placement, labelBackground: true, labelFontSize: 11 },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: rows(1, { gap: 0, top: 60 }),
        edge: edgeOf('start'),
      }),
    );
    await graph.render();
    const set = async (p: 'start' | 'center' | 'end' | number): Promise<void> => {
      graph.setEdge(edgeOf(p));
      await graph.draw();
    };
    if (stage.bar) {
      select(stage.bar, 'labelPlacement', ['start', 'center', 'end'] as const, 'start', (v) => void set(v));
      slider(stage.bar, 'ratio (number placement)', [0, 1, 0.05], 0.5, (v) => void set(v));
    } else {
      const steps = ['start', 0.25, 'center', 0.75, 'end'] as const;
      stage.every(900, (i) => set(steps[i % steps.length]!));
    }
  });

export default mount;
