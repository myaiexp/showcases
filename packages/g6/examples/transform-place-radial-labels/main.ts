// place-radial-labels transform: labels turn and move along the rays of a radial layout
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { radialTree } from '../../shared/transform-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: stage.preview ? 36 : 60,
        data: radialTree(),
        node: { style: { size: 10, fill: '#5B8FF9', labelText: (d) => d.id, labelFontSize: 11 } },
        edge: { style: { stroke: '#4a5a7a' } },
        // The transform reads the first root as the centre, so the layout must be radial.
        layout: { type: 'radial', unitRadius: stage.preview ? 40 : 70, preventOverlap: false },
        transforms: [{ key: 'radial-labels', type: 'place-radial-labels', offset: 5 }],
      }),
    );
    await graph.render();

    const setOffset = async (offset: number): Promise<void> => {
      graph.updateTransform({ key: 'radial-labels', offset });
      await graph.render();
    };
    if (stage.bar) slider(stage.bar, 'offset', [0, 30, 1], 5, (v) => void setOffset(v));
    else stage.every(1300, (i) => setOffset(i % 2 ? 14 : 2));
  });

export default mount;
