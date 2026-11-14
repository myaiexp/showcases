// JPEG quality through encoderOptions, with the payload size shown
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { dataUrlBytes, imageBox } from '../../shared/fr-kit.ts';
import { dataset } from '../../shared/data.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: await dataset('cluster'),
        node: { style: { size: 8 }, palette: { field: 'cluster', color: 'tableau' } },
        edge: { style: { stroke: '#8896b3', lineWidth: 0.6 } },
        layout: { type: 'd3-force' },
        autoFit: 'view',
      }),
    );
    await graph.render();
    const show = imageBox(stage, el);
    const exportAt = async (q: number) => {
      const url = await graph.toDataURL({ type: 'image/jpeg', encoderOptions: q });
      show(url, `encoderOptions: ${q}\npayload: ${dataUrlBytes(url)} bytes`);
    };
    await exportAt(0.9);

    if (stage.bar) {
      slider(stage.bar, 'encoderOptions', [0.05, 1, 0.05], 0.9, (q) => void exportAt(q));
    } else {
      const qs = [0.9, 0.5, 0.1];
      stage.every(1500, (i) => exportAt(qs[i % qs.length]!));
    }
  });

export default mount;
