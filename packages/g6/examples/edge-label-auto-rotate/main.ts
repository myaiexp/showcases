// labelAutoRotate: the label turns to follow the edge, or stays horizontal
import { Graph, type EdgeOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { diagonal } from '../../shared/edge-data.ts';

const edgeOf = (rotate: boolean): EdgeOptions => ({
  style: { stroke: '#5CACEE', labelText: 'Auto Rotate', labelAutoRotate: rotate, labelFill: '#69B1FF', labelFontWeight: 'bold', labelPlacement: 'center' },
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: diagonal(),
        edge: edgeOf(true),
      }),
    );
    await graph.render();
    const set = async (v: boolean): Promise<void> => {
      graph.setEdge(edgeOf(v));
      await graph.draw();
    };
    if (stage.bar) toggle(stage.bar, 'labelAutoRotate', true, (v) => void set(v));
    else stage.every(1400, (i) => set(i % 2 === 0));
  });

export default mount;
