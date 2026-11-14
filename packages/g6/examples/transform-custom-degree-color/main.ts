// Custom transform: beforeDraw derives a fill from each node's degree without touching the data
import { BaseTransform, ExtensionCategory, Graph, register, type DrawData } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { hubGraph } from '../../shared/transform-data.ts';

const COLORS = ['#5B8FF9', '#61DDAA', '#F6BD16', '#E86452'];

class DegreeColor extends BaseTransform {
  override beforeDraw(input: DrawData): DrawData {
    const { model } = this.context;
    // The transform edits what is about to be drawn: the model's own data stays as it was.
    input.add.nodes.forEach((node, id) => {
      const degree = model.getRelatedEdgesData(id).length;
      node.style = { ...node.style, fill: COLORS[Math.min(degree, COLORS.length) - 1] ?? COLORS[0] };
    });
    return input;
  }
}
register(ExtensionCategory.TRANSFORM, 'showcase-transform-degree-color', DegreeColor);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'view',
        padding: 24,
        data: hubGraph(),
        node: { style: { size: 22, labelText: (d) => d.id, labelPlacement: 'bottom' } },
        edge: { style: { stroke: '#4a5a7a' } },
        layout: { type: 'force', preventOverlap: true, nodeSize: 40 },
        transforms: ['showcase-transform-degree-color'],
      }),
    );
    await graph.render();

    // beforeDraw only sees nodes that are being added, so toggling rebuilds them with a fresh render.
    const setOn = async (on: boolean): Promise<void> => {
      graph.setTransforms(on ? ['showcase-transform-degree-color'] : []);
      graph.setData(hubGraph());
      await graph.render();
    };
    if (stage.bar) toggle(stage.bar, 'degree-color transform', true, (v) => void setOn(v));
    else stage.every(2200, (i) => setOn(i % 2 === 0));
  });

export default mount;
