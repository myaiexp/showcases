// A custom plugin with its own option that toggles graph animation
import { BasePlugin, ExtensionCategory, Graph, GraphEvent, register } from '@antv/g6';
import type { BasePluginOptions, RuntimeContext } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

interface AutoSwitchAnimationOptions extends BasePluginOptions {
  maxLength: number;
}

class AutoSwitchAnimation extends BasePlugin<AutoSwitchAnimationOptions> {
  static defaultOptions: Partial<AutoSwitchAnimationOptions> = { maxLength: 1000 };

  constructor(context: RuntimeContext, options: AutoSwitchAnimationOptions) {
    super(context, Object.assign({}, AutoSwitchAnimation.defaultOptions, options));
    context.graph.on(GraphEvent.BEFORE_RENDER, this.switchAnimation);
  }

  // An arrow property keeps `this` when G6 calls it as a listener.
  private switchAnimation = (): void => {
    const { graph } = this.context;
    graph.setOptions({ animation: graph.getNodeData().length < this.options.maxLength });
  };

  override destroy(): void {
    this.context.graph.off(GraphEvent.BEFORE_RENDER, this.switchAnimation);
    super.destroy();
  }
}

register(ExtensionCategory.PLUGIN, 'showcase-plugin-auto-switch-animation', AutoSwitchAnimation);

const ring = (n: number): { nodes: { id: string }[]; edges: { source: string; target: string }[] } => ({
  nodes: Array.from({ length: n }, (_, i) => ({ id: `n${i}` })),
  edges: Array.from({ length: n }, (_, i) => ({ source: `n${i}`, target: `n${(i + 1) % n}` })),
});

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    let count = 4;
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: ring(count),
        node: { style: { fill: '#7e3feb', size: 18 } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'circular' },
        autoFit: 'view',
        padding: 24,
        plugins: [{ type: 'showcase-plugin-auto-switch-animation', key: 'auto', maxLength: 8 }],
      }),
    );
    await graph.render();

    const redraw = async (): Promise<void> => {
      graph.setData(ring(count));
      await graph.render();
    };
    if (stage.bar) {
      const out = readout(el);
      const show = (): void => {
        out.textContent = `${count} nodes, animation ${String(graph.getOptions().animation)}`;
      };
      show();
      slider(stage.bar, 'maxLength', [4, 20, 1], 8, (maxLength) => graph.updatePlugin({ key: 'auto', maxLength }));
      button(stage.bar, 'add 2 nodes', async () => {
        count += 2;
        await redraw();
        show();
      });
      button(stage.bar, 'remove 2 nodes', async () => {
        count = Math.max(4, count - 2);
        await redraw();
        show();
      });
    } else {
      // Grows past maxLength (8), where the ring stops animating, then starts over.
      stage.every(1400, async () => {
        count = count >= 12 ? 4 : count + 2;
        await redraw();
      });
    }
  });

export default mount;
