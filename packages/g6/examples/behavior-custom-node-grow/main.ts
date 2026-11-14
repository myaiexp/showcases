// A custom behavior with enable, a step option, an onGrow callback and a clean destroy
import { BaseBehavior, ExtensionCategory, Graph, NodeEvent, register } from '@antv/g6';
import type { BaseBehaviorOptions, IPointerEvent, RuntimeContext } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { cell, lattice } from '../../shared/behavior-data.ts';
import { simClick } from '../../shared/behavior-sim.ts';
import { readout, slider, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

interface NodeGrowOptions extends BaseBehaviorOptions {
  step: number;
  max: number;
  onGrow?: (id: string, size: number) => void;
}

class NodeGrow extends BaseBehavior<NodeGrowOptions> {
  static defaultOptions: Partial<NodeGrowOptions> = { step: 6, max: 60 };

  constructor(context: RuntimeContext, options: NodeGrowOptions) {
    super(context, Object.assign({}, NodeGrow.defaultOptions, options));
    this.bind();
  }

  private bind() {
    this.context.graph.on(NodeEvent.CLICK, this.grow);
  }

  private grow = (event: IPointerEvent) => {
    // A behavior is switched off by its enable option, which updateBehavior can flip.
    if (this.destroyed || !this.options.enable) return;
    const { graph } = this.context;
    const id = (event.target as { id: string }).id;
    const size = Number(graph.getElementRenderStyle(id).size ?? 32);
    const next = size + this.options.step > this.options.max ? 24 : size + this.options.step;
    graph.updateNodeData([{ id, style: { size: next } }]);
    void graph.draw();
    this.options.onGrow?.(id, next);
  };

  public override destroy() {
    this.context.graph.off(NodeEvent.CLICK, this.grow);
    super.destroy();
  }
}

register(ExtensionCategory.BEHAVIOR, 'showcase-behavior-node-grow', NodeGrow);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = stage.bar ? readout(el) : null;
    if (log) log.textContent = 'Click a node to grow it; at the maximum it shrinks back.';
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: lattice(4, 3, 64),
        node: { style: { size: 24 } },
        behaviors: [
          {
            type: 'showcase-behavior-node-grow',
            key: 'grow',
            enable: true,
            step: 6,
            onGrow: (id: string, size: number) => {
              if (log) log.textContent = `${id} is now ${size}px`;
            },
          },
        ],
        autoFit: 'center',
      }),
    );
    await graph.render();
    if (stage.bar) {
      toggle(stage.bar, 'enable', true, (enable) => graph.updateBehavior({ key: 'grow', enable }));
      slider(stage.bar, 'step', [2, 20, 1], 6, (step) => graph.updateBehavior({ key: 'grow', step }));
    } else {
      const spots = [cell(0, 1, 64), cell(1, 2, 64), cell(2, 0, 64), cell(1, 1, 64)];
      stage.every(500, (i) => simClick(stage, graph, spots[i % spots.length]!));
    }
  });

export default mount;
