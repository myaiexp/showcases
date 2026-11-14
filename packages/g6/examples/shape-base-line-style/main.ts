// Common shape props: lineWidth, lineDash, lineDashOffset and lineCap on a rect
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps>;
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

class StrokeRectNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    // Every common prop below is passed straight through to the G rect.
    const { fill, stroke, lineWidth, lineDash, lineDashOffset, lineCap } = attributes;
    return this.upsert(
      'key',
      'rect',
      { x: -70, y: -40, width: 140, height: 80, radius: 10, fill, stroke, lineWidth, lineDash, lineDashOffset, lineCap },
      container,
    );
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-stroke-rect', StrokeRectNode);

const DASHES = { '12 8': [12, 8], '4 6': [4, 6], '20 6 4 6': [20, 6, 4, 6] } as const;
type Dash = keyof typeof DASHES;
const CAPS = ['butt', 'round', 'square'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { width: 6, dash: '12 8' as Dash, offset: 0, cap: 'butt' as (typeof CAPS)[number] };
    const style = () => ({
      size: [140, 80] as [number, number],
      fill: '#16213a',
      stroke: '#F6BD16',
      lineWidth: v.width,
      lineDash: [...DASHES[v.dash]],
      lineDashOffset: v.offset,
      lineCap: v.cap,
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, ...style() } }] },
        node: { type: 'showcase-shape-stroke-rect' },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: style() }]);
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'lineWidth', [1, 16, 1], v.width, (x) => ((v.width = x), void apply()));
      select(stage.bar, 'lineDash', Object.keys(DASHES) as Dash[], v.dash, (x) => ((v.dash = x), void apply()));
      slider(stage.bar, 'lineDashOffset', [0, 40, 1], v.offset, (x) => ((v.offset = x), void apply()));
      select(stage.bar, 'lineCap', CAPS, v.cap, (x) => ((v.cap = x), void apply()));
    } else {
      stage.every(120, (i) => {
        v.offset = -i * 2;
        if (i % 20 === 0) v.cap = CAPS[(i / 20) % 3]!;
        return apply();
      });
    }
  });

export default mount;
