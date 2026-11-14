// setTheme and getTheme: switch the built-in light and dark themes on a live graph
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Name = 'dark' | 'light';
// G6 5.1.1 does not paint theme.background on the canvas: the example sets its own box colour.
const BACKGROUND: Record<Name, string> = { dark: '#000000', light: '#ffffff' };

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: ['a', 'b', 'c', 'd', 'e'].map((id, i) => ({ id, combo: i > 2 ? 'g' : undefined, data: { group: i % 3 } })),
          edges: [
            { source: 'a', target: 'b' },
            { source: 'b', target: 'c' },
            { source: 'c', target: 'd' },
            { source: 'd', target: 'e' },
          ],
          combos: [{ id: 'g' }],
        },
        node: { style: { labelText: (d) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { endArrow: true } },
        combo: { style: { labelText: 'combo' } },
        layout: { type: 'grid', cols: 3 },
      }),
    );
    await graph.render();

    const setTheme = async (name: Name): Promise<void> => {
      graph.setTheme(name);
      stage.container.style.background = BACKGROUND[name];
      // setTheme only stores the name; the elements pick it up on the next render.
      await graph.render();
    };
    if (stage.bar) select(stage.bar, 'theme', ['dark', 'light'] as const, 'dark', (v) => void setTheme(v));
    else stage.every(1800, (i) => setTheme(i % 2 ? 'dark' : 'light'));
  });

export default mount;
