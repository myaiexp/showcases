// A custom node whose extra shape follows the selected state in node.state
import { ExtensionCategory, Graph, Rect, register, type IElementEvent } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = NonNullable<Parameters<Rect['render']>[0]> & { holeFill?: string };
type Container = NonNullable<Parameters<Rect['render']>[1]>;

// The class only reads holeFill; which state sets it is decided in node.state, not here.
class SelectableNode extends Rect {
  override render(attributes: Attrs = this.parsedAttributes as Attrs, container: Container = this): void {
    super.render(attributes, container);
    this.upsert('hole', 'rect', { x: 25, y: -10, radius: 10, width: 20, height: 20, fill: attributes.holeFill }, container);
  }
}

register(ExtensionCategory.NODE, 'showcase-node-selectable', SelectableNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node-1', style: { x: 120, y: 60 } }] },
        node: {
          type: 'showcase-node-selectable',
          style: { size: [120, 60], radius: 6, fill: '#7FFFD4', stroke: '#5CACEE', lineWidth: 2, holeFill: '#fff' },
          state: { selected: { holeFill: 'orange' } },
        },
      }),
    );
    await graph.render();

    if (stage.bar) {
      const log = readout(el);
      log.textContent = 'Click the node.';
      let on = false;
      graph.on('node:click', (e: IElementEvent) => {
        on = !on;
        void graph.setElementState(e.target.id, on ? ['selected'] : []);
        log.textContent = on ? 'state: selected' : 'state: none';
      });
      button(stage.bar, 'clear state', () => ((on = false), void graph.setElementState('node-1', [])));
    } else {
      stage.every(1000, (i) => graph.setElementState('node-1', i % 2 ? [] : ['selected']));
    }
  });

export default mount;
