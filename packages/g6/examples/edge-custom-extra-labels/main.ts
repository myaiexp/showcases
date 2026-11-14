// A Line subclass that draws extra text at each end, driven by startLabelText and endLabelText
import { ExtensionCategory, Graph, Line, register, subStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = NonNullable<Parameters<Line['render']>[0]>;
type Container = NonNullable<Parameters<Line['render']>[1]>;

class LabelEdge extends Line {
  override render(attributes: Attrs = this.parsedAttributes as Attrs, container: Container = this): void {
    super.render(attributes);
    this.drawEndLabel(attributes, container, 'start');
    this.drawEndLabel(attributes, container, 'end');
  }

  protected drawEndLabel(attributes: Attrs, container: Container, type: 'start' | 'end'): void {
    const key = type === 'start' ? 'startLabel' : 'endLabel';
    const [x, y] = this.getEndpoints(attributes)[type === 'start' ? 0 : 1];
    const fontStyle = { x, y, dx: type === 'start' ? 15 : -15, fontSize: 16, fill: 'gray', textBaseline: 'middle' as const, textAlign: type };
    const style = subStyleProps<Record<string, unknown>>(attributes, key);
    // upsert with false removes the shape, so clearing the text clears the label.
    this.upsert(`label-${type}`, 'text', style.text ? { ...fontStyle, ...style } : false, container);
  }
}

register(ExtensionCategory.EDGE, 'showcase-edge-extra-label', LabelEdge);

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
            { id: 'node-0', style: { x: 40, y: 100 } },
            { id: 'node-1', style: { x: 260, y: 100 } },
          ],
          edges: [{ id: 'e', source: 'node-0', target: 'node-1' }],
        },
        edge: { type: 'showcase-edge-extra-label', style: { startArrow: true, endArrow: true, stroke: '#F6BD16', startLabelText: 'start', endLabelText: 'end' } },
        behaviors: ['drag-element'],
      }),
    );
    await graph.render();
    const set = async (on: boolean): Promise<void> => {
      graph.updateEdgeData([{ id: 'e', style: { startLabelText: on ? 'start' : '', endLabelText: on ? 'end' : '' } }]);
      await graph.draw();
    };
    if (stage.bar) toggle(stage.bar, 'end labels', true, (v) => void set(v));
    else stage.every(1400, (i) => set(i % 2 === 1));
  });

export default mount;
