// devicePixelRatio sets the canvas backing resolution; read at construction
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rebuildable } from '../../shared/graph-basics.ts';

const RATIOS = ['0.5', '1', '2', '3'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let ratio = 1;
    const live = rebuildable(
      stage,
      () =>
        new Graph({
          container: stage.container,
          theme: 'dark',
          data: { nodes: [{ id: 'A', style: { x: 0, y: 0 } }, { id: 'B', style: { x: 90, y: 30 } }], edges: [{ source: 'A', target: 'B' }] },
          node: { style: { size: 40, labelText: (d) => `dpr ${ratio} ${d.id}`, labelFontSize: 14 } },
          autoFit: 'center',
          devicePixelRatio: ratio,
        }),
    );
    await live.rebuild();

    const out = stage.bar ? readout(el) : null;
    const show = (): void => {
      const c = stage.container.querySelector('canvas');
      if (out && c) out.textContent = `backing store ${c.width} x ${c.height}px for a ${c.clientWidth} x ${c.clientHeight}px box`;
    };
    const set = async (v: number): Promise<void> => {
      ratio = v;
      await live.rebuild();
      show();
    };

    if (stage.bar) {
      select(stage.bar, 'devicePixelRatio', RATIOS, '1', (v) => void set(Number(v)));
      show();
    } else {
      stage.every(1600, (i) => set(Number(RATIOS[i % RATIOS.length])));
    }
  });

export default mount;
