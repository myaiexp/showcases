// setTheme((prev) => next) with getTheme() printed after every switch
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

const BACKGROUND: Record<string, string> = { dark: '#000000', light: '#ffffff' };

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: {
          nodes: Array.from({ length: 7 }, (_, i) => ({ id: `n${i}` })),
          edges: Array.from({ length: 6 }, (_, i) => ({ source: `n${i}`, target: `n${i + 1}` })),
        },
        node: { style: { labelText: (d) => d.id, labelPlacement: 'bottom' } },
        layout: { type: 'circular', radius: 70 },
      }),
    );
    await graph.render();

    const out = stage.bar ? readout(el) : null;
    const flip = async (): Promise<void> => {
      // The callback gets the current theme name and returns the next one.
      graph.setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
      const now = String(graph.getTheme());
      stage.container.style.background = BACKGROUND[now] ?? '#000';
      if (out) out.textContent = `graph.getTheme() => ${JSON.stringify(now)}`;
      await graph.render();
    };
    if (stage.bar) {
      button(stage.bar, 'setTheme(prev => …)', () => void flip());
      if (out) out.textContent = `graph.getTheme() => ${JSON.stringify(graph.getTheme())}`;
    } else stage.every(1800, flip);
  });

export default mount;
