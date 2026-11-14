// A persistent animation: an edge subclass loops lineDashOffset from onCreate (ant line)
import { ExtensionCategory, Graph, Line, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// Module variable read by onCreate: lets the sliders restyle the next graph instance.
let duration = 500;

class AntLine extends Line {
  // Runs once, when the edge is created; the animation then repeats until the graph is destroyed.
  onCreate(): void {
    this.shapeMap['key']!.animate([{ lineDashOffset: 20 }, { lineDashOffset: 0 }], { duration, iterations: Infinity });
  }
}
register(ExtensionCategory.EDGE, 'showcase-animation-ant-line', AntLine);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    duration = 500;
    const build = (dash: number) =>
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: {
          nodes: [
            { id: 'node-1', style: { x: 40, y: 100 } },
            { id: 'node-2', style: { x: 260, y: 100 } },
          ],
          edges: [{ source: 'node-1', target: 'node-2', style: { lineDash: [dash, dash] } }],
        },
        node: { style: { size: 24, fill: '#5B8FF9' } },
        edge: { type: 'showcase-animation-ant-line', style: { lineWidth: 3, stroke: '#61DDAA' } },
      });
    let graph = stage.keep(build(10));
    await graph.render();

    // duration is read when the edge is created, so a change rebuilds the graph.
    const rebuild = async (dash: number): Promise<void> => {
      graph.destroy();
      graph = stage.keep(build(dash));
      await graph.render();
    };
    if (stage.bar) {
      let dash = 10;
      slider(stage.bar, 'cycle duration (ms)', [150, 2000, 50], duration, (v) => ((duration = v), void rebuild(dash)));
      slider(stage.bar, 'lineDash size', [4, 30, 1], dash, (v) => ((dash = v), void rebuild(dash)));
    }
  });

export default mount;
