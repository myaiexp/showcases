// graph.translateTo: absolute pan, the same target twice is a no-op
import { Graph } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, select, slider } from '../../shared/controls.ts';
import { fmt, gridData, hud } from '../../shared/fr-kit.ts';
import { mountGraph } from '../../shared/graph.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const [cols, rows, gap] = stage.preview ? [4, 3, 50] : [6, 4, 70];
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: gridData(cols, rows, gap, 60, 50),
        node: { style: { size: 18 } },
        edge: { style: { stroke: '#4a5a78' } },
      }),
    );
    await graph.render();
    const show = hud(stage, el);
    const to = async (x: number, y: number, easing = 'ease-in-out') => {
      await graph.translateTo([x, y], { duration: 800, easing });
      show(`translateTo([${x}, ${y}])  position ${fmt(graph.getPosition())}`);
    };
    show(`position ${fmt(graph.getPosition())}`);

    if (stage.bar) {
      let x = 100;
      let y = 80;
      let easing = 'ease-in-out';
      slider(stage.bar, 'x', [-200, 400, 10], x, (v) => (x = v));
      slider(stage.bar, 'y', [-100, 300, 10], y, (v) => (y = v));
      select(stage.bar, 'easing', ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'] as const, 'ease-in-out', (v) => (easing = v));
      button(stage.bar, 'translateTo', () => void to(x, y, easing));
    } else {
      const spots: [number, number][] = [[60, 20], [10, 50], [90, 10], [0, 0]];
      stage.every(1400, (i) => to(...spots[i % spots.length]!));
    }
  });

export default mount;
