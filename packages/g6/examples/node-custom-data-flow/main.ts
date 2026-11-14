// A custom node reading data two ways: style attributes and graph.getNodeData
import { ExtensionCategory, Graph, Rect, register, type NodeData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { avatar } from '../../shared/images.ts';

type Attrs = NonNullable<Parameters<Rect['render']>[0]> & { iconUrl?: string; userName?: string };
type Container = NonNullable<Parameters<Rect['render']>[1]>;

// Set by the mount that is on screen, so render() can report what it saw.
let report: ((info: string) => void) | null = null;

class DataFlowNode extends Rect {
  // Method 2: the raw datum through the graph, keyed by this element's id.
  get nodeData(): NodeData {
    return this.context.graph.getNodeData(this.id);
  }
  get data(): Record<string, unknown> {
    return (this.nodeData.data as Record<string, unknown>) || {};
  }

  override render(attributes: Attrs = this.parsedAttributes as Attrs, container: Container = this): void {
    // Method 1: attributes holds the style after the node.style functions have run.
    report?.(`attributes: userName=${attributes.userName}\nraw data:   name=${String(this.data.name)}, role=${String(this.data.role)}`);
    super.render(attributes, container);
    if (attributes.iconUrl) {
      this.upsert('icon', 'image', { x: -34, y: -12, width: 22, height: 22, src: attributes.iconUrl }, container);
    }
    if (attributes.userName) {
      this.upsert('username', 'text', { x: 14, y: 0, text: attributes.userName, fontSize: 10, fill: '#9aa7c7', textAlign: 'center', textBaseline: 'middle' }, container);
    }
  }
}

register(ExtensionCategory.NODE, 'showcase-node-data-flow', DataFlowNode);

const PEOPLE = [
  { name: 'Zhang San', role: 'Developer', i: 0 },
  { name: 'Li Si', role: 'Designer', i: 3 },
  { name: 'Wang Wu', role: 'Manager', i: 5 },
];

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const log = stage.bar ? readout(el) : null;
    if (log) report = (s) => (log.textContent = s);
    stage.onCleanup(() => (report = null));

    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'user1', style: { x: 140, y: 70 }, data: { name: PEOPLE[0]!.name, role: PEOPLE[0]!.role, icon: avatar(PEOPLE[0]!.i) } }] },
        node: {
          type: 'showcase-node-data-flow',
          style: {
            size: [120, 44],
            fill: '#f0f9ff',
            stroke: '#0ea5e9',
            lineWidth: 1,
            radius: 4,
            // Map data fields into style fields; the class sees them as attributes.iconUrl / userName.
            iconUrl: (d: NodeData) => String(d.data?.icon),
            userName: (d: NodeData) => String(d.data?.name),
            labelText: (d: NodeData) => String(d.data?.role),
            labelPlacement: 'center',
            labelFontSize: 12,
            labelFill: '#0369a1',
            labelOffsetY: 12,
          },
        },
      }),
    );
    await graph.render();

    stage.every(1500, (i) => {
      const p = PEOPLE[i % PEOPLE.length]!;
      graph.updateNodeData([{ id: 'user1', data: { name: p.name, role: p.role, icon: avatar(p.i) } }]);
      return graph.draw();
    });
  });

export default mount;
