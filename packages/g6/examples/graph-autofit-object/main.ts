// autoFit as an object: when and direction in options, plus the fit animation timing
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type When = 'overflow' | 'always';
type Direction = 'x' | 'y' | 'both';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let when: When = 'always';
    let direction: Direction = 'both';
    let duration = 800;

    // Content far wider than it is tall, so 'x' and 'y' fit differently.
    const nodes = Array.from({ length: 9 }, (_, i) => ({
      id: `n${i}`,
      style: { x: i * 90, y: (i % 3) * 20 },
    }));
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: {
          nodes,
          edges: nodes.slice(1).map((n, i) => ({ source: `n${i}`, target: n.id })),
        },
        node: { style: { size: 24, labelText: (d) => d.id } },
        autoFit: { type: 'view', options: { when, direction }, animation: { duration, easing: 'ease-in-out' } },
      }),
    );
    await graph.render();

    // Each render() fits again with the current object; the zoom starts from 1 so it is visible.
    const refit = async (): Promise<void> => {
      await graph.zoomTo(1, false);
      graph.setOptions({
        autoFit: { type: 'view', options: { when, direction }, animation: { duration, easing: 'ease-in-out' } },
      });
      await graph.render();
    };

    if (stage.bar) {
      select(stage.bar, 'when', ['always', 'overflow'] as const, when, (v) => ((when = v), void refit()));
      select(stage.bar, 'direction', ['both', 'x', 'y'] as const, direction, (v) => ((direction = v), void refit()));
      slider(stage.bar, 'duration', [0, 2000, 100], duration, (v) => (duration = v));
      button(stage.bar, 'Fit again', () => void refit());
    } else {
      const dirs: Direction[] = ['x', 'y', 'both'];
      stage.every(2200, (i) => ((direction = dirs[i % 3]!), refit()));
    }
  });

export default mount;
