// The docs' TickTockLayout: a timer drives onTick, stop() resolves the layout
import { BaseLayout, ExtensionCategory, Graph, register } from '@antv/g6';
import type { BaseLayoutOptions, GraphData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

interface TickTockLayoutOptions extends BaseLayoutOptions {
  onTick: (data: GraphData) => void;
}

class TickTockLayout extends BaseLayout<TickTockLayoutOptions> {
  public id = 'showcase-layout-tick-tock';

  private tickCount = 0;

  private data?: GraphData;

  private timer?: number;

  private resolve?: () => void;

  async execute(data: GraphData, options: TickTockLayoutOptions): Promise<GraphData> {
    const { onTick } = { ...this.options, ...options };

    this.tickCount = 0;
    this.data = data;

    const promise = new Promise<void>((resolve) => {
      this.resolve = resolve;
    });

    this.timer = window.setInterval(() => {
      onTick(this.simulateTick());
      if (this.tickCount === 10) this.stop();
    }, 200);

    await promise;

    return this.simulateTick();
  }

  simulateTick = (): GraphData => {
    const x = this.tickCount++ % 2 === 0 ? 50 : 150;

    return {
      nodes: (this.data?.nodes || []).map((node, index) => ({
        id: node.id,
        style: { x, y: (index + 1) * 30 },
      })),
    };
  };

  override tick = (): GraphData => this.simulateTick();

  override stop = (): void => {
    clearInterval(this.timer);
    this.resolve?.();
  };
}

register(ExtensionCategory.LAYOUT, 'showcase-layout-tick-tock', TickTockLayout);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        animation: true,
        autoFit: 'view',
        padding: 30,
        data: { nodes: [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }, { id: 'node-5' }] },
        node: { style: { size: 20, labelText: (d) => d.id, labelPlacement: 'right', labelFill: '#fff', labelFontSize: 9 } },
        layout: { type: 'showcase-layout-tick-tock' },
      }),
    );
    // The layout owns a setInterval of its own: stop it when the example goes away.
    stage.onCleanup(() => graph.stopLayout());
    graph.render();

    if (stage.bar) button(stage.bar, 'layout() again', () => graph.layout());
    else stage.every(5000, () => graph.layout());
  });

export default mount;
