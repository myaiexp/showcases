// theme: 'dark', 'light' or false; setOptions swaps the theme on a live graph
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { ring } from '../../shared/graph-basics.ts';

type Name = 'dark' | 'light' | 'none';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(8, 'n', 80),
        node: { style: { size: 24, labelText: (d) => d.id } },
        autoFit: 'view',
      }),
    );
    await graph.render();

    // 'none' is theme: false. Colours of existing elements change on the next draw.
    const apply = async (name: Name): Promise<void> => {
      graph.setOptions({ theme: name === 'none' ? false : name });
      await graph.draw();
    };

    if (stage.bar) select(stage.bar, 'theme', ['dark', 'light', 'none'] as const, 'dark', (v) => void apply(v));
    else {
      const order: Name[] = ['light', 'none', 'dark'];
      stage.every(1800, (i) => apply(order[i % 3]!));
    }
  });

export default mount;
