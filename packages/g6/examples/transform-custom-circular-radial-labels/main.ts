// Custom transform: afterLayout rotates each label along its ray from a circular layout's centre
import { BaseTransform, ExtensionCategory, Graph, register, type RuntimeContext } from '@antv/g6';
import type { BaseTransformOptions } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

// The circular layout does not expose its centre, so layout and transform share this constant.
const CENTER: [number, number] = [150, 120];

interface Options extends BaseTransformOptions {
  offset?: number;
}

class CircularRadialLabels extends BaseTransform<Options> {
  static defaultOptions: Partial<Options> = { offset: 5 };

  constructor(context: RuntimeContext, options: Options) {
    super(context, { ...CircularRadialLabels.defaultOptions, ...options });
  }

  override afterLayout(): void {
    const { graph, model } = this.context;
    for (const datum of model.getData().nodes ?? []) {
      const nodeId = String(datum.id);
      const node = this.context.element?.getElement(nodeId);
      if (!node || !node.isVisible()) continue;
      const x = Number(datum.style?.x ?? 0) - CENTER[0];
      const y = Number(datum.style?.y ?? 0) - CENTER[1];
      const radian = x || y ? Math.atan2(y, x) : 0;
      const isLeft = Math.abs(radian) > Math.PI / 2;
      const size = graph.getElementRenderStyle(nodeId).size as number | number[];
      const offset = (Array.isArray(size) ? size[0]! : size) / 2 + (this.options.offset ?? 5);
      model.updateNodeData([
        {
          id: nodeId,
          style: {
            labelTextAlign: isLeft ? 'right' : 'left',
            labelTextBaseline: 'middle',
            // Move out along the ray, then turn the text to read outward (flipped on the left side).
            labelTransform: [
              ['translate', offset * Math.cos(radian), offset * Math.sin(radian)],
              ['rotate', (isLeft ? radian + Math.PI : radian) * (180 / Math.PI)],
            ],
          },
        },
      ]);
    }
    void graph.draw();
  }
}
register(ExtensionCategory.TRANSFORM, 'showcase-transform-circular-radial-labels', CircularRadialLabels);

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: {
          nodes: ['1', '2', '3', '4', '5', '6', '7', '8'].map((id) => ({ id })),
          edges: ['1', '2', '3', '4', '5', '6', '7', '8'].map((id, i, all) => ({ source: id, target: all[(i + 1) % all.length]! })),
        },
        node: { style: { size: 14, fill: '#9270CA', labelText: (d) => `label ${d.id}`, labelFontSize: 11 } },
        edge: { style: { stroke: '#4a5a7a' } },
        layout: { type: 'circular', center: CENTER, radius: stage.preview ? 50 : 80, preLayout: false }, // a pre-layout would skip afterLayout
        transforms: [{ key: 'labels', type: 'showcase-transform-circular-radial-labels', offset: 5 }],
      }),
    );
    await graph.render();

    const setOffset = async (offset: number): Promise<void> => {
      graph.updateTransform({ key: 'labels', offset });
      await graph.render();
    };
    if (stage.bar) slider(stage.bar, 'offset', [0, 30, 1], 5, (v) => void setOffset(v));
    else stage.every(1300, (i) => setOffset(i % 2 ? 16 : 4));
  });

export default mount;
