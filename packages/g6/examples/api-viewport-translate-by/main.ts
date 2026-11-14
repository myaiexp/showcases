// graph.translateBy: relative pan in 50 px steps
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { fmt, gridData, hud } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [4, 3, 50] : [6, 4, 70];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 90, 70),
        node: { style: { size: 18 } },
        edge: { style: { stroke: '#4a5a78' } },
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    const by = async (dx: number, dy: number) => {
      await graph.translateBy([dx, dy], { duration: 350 });
      show(`translateBy([${dx}, ${dy}])  position ${fmt(graph.getPosition())}`);
    };
    show(`position ${fmt(graph.getPosition())}`);

    if (stage.bar) {
      button(stage.bar, 'left', () => void by(-50, 0));
      button(stage.bar, 'right', () => void by(50, 0));
      button(stage.bar, 'up', () => void by(0, -50));
      button(stage.bar, 'down', () => void by(0, 50));
    } else {
      const steps: [number, number][] = [[40, 0], [0, 30], [-40, 0], [0, -30]];
      stage.every(900, (i) => by(...steps[i % steps.length]!));
    }
  });

export default mount;
