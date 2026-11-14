// minimap containerStyle and maskStyle: CSS on the thumbnail and its mask
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { dataset } from '../../shared/data.ts';

const LOOKS: Record<string, { containerStyle: Partial<CSSStyleDeclaration>; maskStyle: Partial<CSSStyleDeclaration> }> = {
  slate: {
    containerStyle: { background: '#111827', border: '1px solid #374151', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,.6)' },
    maskStyle: { background: 'rgba(23,131,255,0.25)', border: '1px solid #1783ff' },
  },
  light: {
    containerStyle: { background: '#ffffff', border: '1px solid #ddd', borderRadius: '2px' },
    maskStyle: { background: 'rgba(0,0,0,0.1)', border: '1px solid #aaa' },
  },
  warm: {
    containerStyle: { background: '#2a1a12', border: '2px solid #f08f56', borderRadius: '12px' },
    maskStyle: { background: 'rgba(240,143,86,0.3)', border: '1px dashed #f08f56' },
  },
};

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const data = await dataset('cluster');
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data,
        node: { style: { size: stage.preview ? 7 : 14 }, palette: { field: 'cluster' } },
        edge: { style: { stroke: '#8b9baf88' } },
        layout: { type: 'circular', radius: stage.preview ? 60 : 150 },
        behaviors: ['drag-canvas', 'zoom-canvas'],
        autoFit: 'center',
        plugins: [{ type: 'minimap', key: 'minimap', className: 'showcase-minimap', size: stage.preview ? [100, 66] : [240, 160], ...LOOKS.slate }],
      }),
    );
    await graph.render();
    await graph.zoomTo(1.6);

    const names = Object.keys(LOOKS);
    if (stage.bar) {
      select(stage.bar, 'look', names, 'slate', (n) => graph.updatePlugin({ key: 'minimap', ...LOOKS[n] }));
    } else {
      stage.every(1300, async (i) => {
        graph.updatePlugin({ key: 'minimap', ...LOOKS[names[i % names.length]!] });
        await graph.translateBy([i % 2 ? 40 : -40, 0], { duration: 800 });
      });
    }
  });

export default mount;
