// A custom behavior class: click empty canvas to add a node, with a configurable fill
import { BaseBehavior, CanvasEvent, ExtensionCategory, Graph, register } from '@antv/g6';
import type { BaseBehaviorOptions, IPointerEvent, RuntimeContext } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { simClick } from '../../shared/behavior-sim.ts';
import { readout, select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

interface ClickAddNodeOptions extends BaseBehaviorOptions {
  fill: string;
}

class ClickAddNode extends BaseBehavior<ClickAddNodeOptions> {
  static defaultOptions: Partial<ClickAddNodeOptions> = { fill: 'red' };
  private count = 0;

  constructor(context: RuntimeContext, options: ClickAddNodeOptions) {
    super(context, Object.assign({}, ClickAddNode.defaultOptions, options));
    this.context.graph.on(CanvasEvent.CLICK, this.addNode);
  }

  private addNode = (event: IPointerEvent) => {
    const { graph } = this.context;
    // The docs read layerX/layerY; the client position through getCanvasByClient also holds up when panned or zoomed.
    const [x, y] = graph.getCanvasByClient([event.client.x, event.client.y]);
    graph.addNodeData([{ id: `showcase-added-${this.count++}`, style: { x, y, fill: this.options.fill } }]);
    void graph.draw();
  };

  // Unbind in destroy, or the listener outlives the behavior.
  public override destroy() {
    this.context.graph.off(CanvasEvent.CLICK, this.addNode);
    super.destroy();
  }
}

// register() is page-wide: a unique, prefixed name, registered once when the module loads.
register(ExtensionCategory.BEHAVIOR, 'showcase-behavior-click-add-node', ClickAddNode);

const colors = ['red', 'black', 'blue', 'green', 'yellow', 'purple'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: { nodes: [] },
        behaviors: [{ type: 'showcase-behavior-click-add-node', key: 'add', fill: 'red' }],
        plugins: [{ type: 'grid-line', size: 30 }],
      }),
    );
    await graph.render();
    if (stage.bar) {
      readout(el).textContent = 'Click the empty canvas to add a node.';
      select(stage.bar, 'fill', colors, 'red', (fill) => graph.updateBehavior({ key: 'add', fill }));
    } else {
      const spots: [number, number][] = [[60, 50], [150, 120], [220, 60], [100, 150], [200, 150], [40, 120]];
      stage.every(700, async (i) => {
        if (i % 8 === 0) {
          graph.setData({ nodes: [] });
          await graph.render();
          return;
        }
        graph.updateBehavior({ key: 'add', fill: colors[i % colors.length] });
        await simClick(stage, graph, graph.getCanvasByViewport(spots[i % spots.length]!));
      });
    }
  });

export default mount;
