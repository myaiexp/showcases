// A custom node with a clickable button shape that counts presses
import { ExtensionCategory, Graph, Rect, register, type IElementEvent, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = NonNullable<Parameters<Rect['render']>[0]>;
type Container = NonNullable<Parameters<Rect['render']>[1]>;

// A function in node.style is called as a datum callback, so the press handler cannot travel
// as a style field; the mount on screen sets it here instead.
let onPress: ((id: string) => void) | null = null;

class ClickableNode extends Rect {
  override render(attributes: Attrs = this.parsedAttributes as Attrs, container: Container = this): void {
    super.render(attributes, container);
    const btn = this.upsert('button', 'rect', { x: 55, y: -10, width: 20, height: 20, radius: 10, fill: '#1890ff', cursor: 'pointer' }, container);
    // upsert returns the same shape on every render, so bind the listener only once.
    const flagged = btn as unknown as { __bound?: boolean };
    if (btn && !flagged.__bound) {
      flagged.__bound = true;
      btn.addEventListener('click', (e: IElementEvent) => {
        e.stopPropagation(); // keep the click from also reaching the node
        onPress?.(this.id);
      });
    }
  }
}

register(ExtensionCategory.NODE, 'showcase-node-clickable', ClickableNode);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = stage.bar ? readout(el) : null;
    const bump = (id: string): void => {
      const n = Number(graph.getNodeData(id).data?.clicks ?? 0) + 1;
      graph.updateNodeData([{ id, data: { clicks: n } }]);
      void graph.draw();
      if (log) log.textContent = `button on ${id} pressed, ${n} so far`;
    };
    onPress = bump;
    stage.onCleanup(() => (onPress = null));
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'node1', style: { x: 120, y: 60 }, data: { clicks: 0 } }] },
        node: {
          type: 'showcase-node-clickable',
          style: {
            size: [150, 40],
            fill: '#7FFFD4',
            stroke: '#5CACEE',
            lineWidth: 2,
            radius: 5,
            labelText: (d: NodeData) => `clicks: ${d.data?.clicks}`,
            labelFill: '#222',
            labelPlacement: 'center',
            labelOffsetX: -12,
          },
        },
      }),
    );
    await graph.render();

    if (log) log.textContent = 'Press the blue button on the node.';
    // A card has no pointer, so the timer presses the button for it.
    else stage.every(900, () => bump('node1'));
  });

export default mount;
