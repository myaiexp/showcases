// background colours the canvas and the exported image; read at construction
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { rebuildable, ring } from '../../shared/graph-basics.ts';

const COLORS = { navy: '#0b1b3a', plum: '#2a1238', forest: '#10301f', rust: '#3a1c10' } as const;
type Name = keyof typeof COLORS;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let color: Name = 'navy';
    const live = rebuildable(
      stage,
      () =>
        new Graph({
          container: stage.container,
          theme: 'dark',
          data: ring(8, 'n', 70),
          node: { style: { size: 22 } },
          autoFit: 'center',
          background: COLORS[color],
        }),
    );
    await live.rebuild();

    if (stage.bar) {
      select(stage.bar, 'background', Object.keys(COLORS) as Name[], color, (v) => ((color = v), void live.rebuild()));
      // The same colour fills the exported picture.
      const img = document.createElement('img');
      img.alt = 'Exported canvas';
      img.style.cssText = 'display:block;margin-top:8px;max-width:220px;border:1px solid #334';
      el.append(img);
      stage.onCleanup(() => img.remove());
      button(stage.bar, 'toDataURL()', async () => {
        img.src = (await live.graph?.toDataURL()) ?? '';
      });
    } else {
      const names = Object.keys(COLORS) as Name[];
      stage.every(1600, (i) => ((color = names[i % names.length]!), live.rebuild()));
    }
  });

export default mount;
