// Atomic line shape (x1, y1, x2, y2) with lineWidth, lineCap and lineDash
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps> & { angle?: number; length?: number; cap?: 'butt' | 'round' | 'square'; dash?: number[] };
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

class LineShapeNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { angle = 0, length = 100, cap = 'butt', dash = [], stroke, lineWidth } = attributes;
    const r = (angle * Math.PI) / 180;
    const [dx, dy] = [(Math.cos(r) * length) / 2, (Math.sin(r) * length) / 2];
    return this.upsert(
      'key',
      'line',
      { x1: -dx, y1: -dy, x2: dx, y2: dy, stroke, lineWidth, lineCap: cap, lineDash: dash },
      container,
    );
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-line', LineShapeNode);

const CAPS = ['butt', 'round', 'square'] as const;
const DASHES = { solid: [], '8 6': [8, 6], '2 8': [2, 8], '16 4 2 4': [16, 4, 2, 4] } as const;
type Dash = keyof typeof DASHES;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const v = { angle: -20, length: 160, cap: 'butt' as (typeof CAPS)[number], dash: 'solid' as Dash };
    const style = () => ({
      angle: v.angle,
      length: v.length,
      cap: v.cap,
      dash: [...DASHES[v.dash]],
      size: 160,
      stroke: '#F08BB4',
      lineWidth: 10,
    });
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 150, y: 100, ...style() } }] },
        node: { type: 'showcase-shape-line' },
      }),
    );
    await graph.render();

    const apply = async (): Promise<void> => {
      graph.updateNodeData([{ id: 'a', style: style() }]);
      await graph.draw();
    };
    if (stage.bar) {
      slider(stage.bar, 'angle', [-90, 90, 1], v.angle, (x) => ((v.angle = x), void apply()));
      slider(stage.bar, 'length', [40, 220, 1], v.length, (x) => ((v.length = x), void apply()));
      select(stage.bar, 'lineCap', CAPS, v.cap, (x) => ((v.cap = x), void apply()));
      select(stage.bar, 'lineDash', Object.keys(DASHES) as Dash[], v.dash, (x) => ((v.dash = x), void apply()));
    } else {
      const dashes = Object.keys(DASHES) as Dash[];
      stage.every(900, (i) => {
        v.angle = -40 + ((i * 25) % 80);
        v.dash = dashes[i % dashes.length]!;
        v.cap = CAPS[i % 3]!;
        return apply();
      });
    }
  });

export default mount;
