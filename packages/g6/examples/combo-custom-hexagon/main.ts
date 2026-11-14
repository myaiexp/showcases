// A custom hexagon combo on BaseCombo, with its own collapse button and click handler
import { BaseCombo, type BaseComboStyleProps, ExtensionCategory, Graph, register } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseComboStyleProps>;
type Cmd = (string | number)[];

// Round button outlines: a minus when expanded, a plus when collapsed.
const collapse = (x: number, y: number, r: number): Cmd[] => [['M', x - r, y], ['a', r, r, 0, 1, 0, r * 2, 0], ['a', r, r, 0, 1, 0, -r * 2, 0], ['M', x - r + 4, y], ['L', x + r - 4, y]];
const expand = (x: number, y: number, r: number): Cmd[] => [...collapse(x, y, r), ['M', x, y - r + 4], ['L', x, y + r - 4]];

class HexagonCombo extends BaseCombo {
  protected getKeyPath(attributes: Attrs): Cmd[] {
    const [width = 0, height = 0] = this.getKeySize(attributes);
    const size = Math.min(width, height) + 10;
    const points = Array.from({ length: 6 }, (_, i) => [(size / 2) * Math.cos((Math.PI / 3) * i), (size / 2) * Math.sin((Math.PI / 3) * i)]);
    return [['M', points[0]![0]!, points[0]![1]!], ...points.slice(1).map((p): Cmd => ['L', p[0]!, p[1]!]), ['Z']];
  }

  protected override getKeyStyle(attributes: Attrs) {
    return {
      ...super.getKeyStyle(attributes),
      d: this.getKeyPath(attributes),
      fill: attributes.collapsed ? '#FF9900' : '#F04864',
      fillOpacity: attributes.collapsed ? 0.5 : 0.2,
      stroke: '#54BECC',
      lineWidth: 2,
    };
  }

  protected drawKeyShape(attributes: Attrs, container: Parameters<BaseCombo['render']>[1] & object) {
    return this.upsert('key', 'path', this.getKeyStyle(attributes) as never, container);
  }

  protected drawCollapseButton(attributes: Attrs): void {
    const [width = 0] = this.getKeySize(attributes);
    const r = 8;
    const x = width / 2 + r;
    const d = attributes.collapsed ? expand(x, 0, r) : collapse(x, 0, r);
    const hit = this.upsert('hit-area', 'circle', { cx: x, r, fill: '#fff', cursor: 'pointer' }, this);
    this.upsert('button', 'path', { stroke: '#54BECC', d, cursor: 'pointer', lineWidth: 1.4 }, hit as never);
  }

  override render(attributes: Attrs = this.parsedAttributes as Attrs, container: Parameters<BaseCombo['render']>[1] & object = this): void {
    super.render(attributes, container);
    this.drawCollapseButton(attributes);
  }

  onCreate(): void {
    this.shapeMap['hit-area']!.addEventListener('click', () => {
      const { graph } = this.context;
      if (!this.attributes.collapsed) void graph.collapseElement(this.id);
      else void graph.expandElement(this.id);
    });
  }
}

register(ExtensionCategory.COMBO, 'showcase-combo-hexagon', HexagonCombo);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 30,
        data: {
          nodes: [
            { id: 'node1', combo: 'combo1', style: { x: 60, y: 70 } },
            { id: 'node2', combo: 'combo1', style: { x: 100, y: 110 } },
            { id: 'node3', combo: 'combo2', style: { x: 220, y: 70 } },
            { id: 'node4', combo: 'combo2', style: { x: 250, y: 110 } },
          ],
          combos: [
            { id: 'combo1', data: { label: 'Hexagon 1' } },
            { id: 'combo2', data: { label: 'Hexagon 2' }, style: { collapsed: true } },
          ],
        },
        node: { style: { fill: '#91d5ff', stroke: '#1890ff', lineWidth: 1 } },
        combo: { type: 'showcase-combo-hexagon', style: { padding: 20, labelText: (d) => String(d.data?.label), labelPlacement: 'top' } },
        // The class draws its own button, so only dragging is needed here.
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();
    if (stage.preview) {
      stage.every(1500, async (i) => {
        const id = i % 4 < 2 ? 'combo1' : 'combo2';
        if (i % 2) await graph.expandElement(id);
        else await graph.collapseElement(id);
      });
    }
  });

export default mount;
