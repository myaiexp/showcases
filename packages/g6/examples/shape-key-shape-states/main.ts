// State styles land on the keyShape only: the extra ring ignores the selected state
import { BaseNode, ExtensionCategory, Graph, register, type BaseNodeStyleProps } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';

type Attrs = Required<BaseNodeStyleProps>;
type Container = NonNullable<Parameters<BaseNode['render']>[1]>;

class RingNode extends BaseNode {
  protected drawKeyShape(attributes: Attrs, container: Container) {
    const { fill, stroke, lineWidth } = attributes;
    // A separate shape drawn from fixed style: node states do not reach it.
    this.upsert('ring', 'circle', { cx: 0, cy: 0, r: 40, fill: 'none', stroke: '#8c8c8c', lineWidth: 2, lineDash: [3, 4] }, container);
    return this.upsert('key', 'circle', { cx: 0, cy: 0, r: 26, fill, stroke, lineWidth }, container);
  }
}
register(ExtensionCategory.NODE, 'showcase-shape-ring-node', RingNode);

const STATES = ['none', 'selected', 'active', 'highlight'] as const;

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        autoFit: 'center',
        data: { nodes: [{ id: 'a', style: { x: 110, y: 100 } }, { id: 'b', style: { x: 210, y: 100 } }] },
        node: {
          type: 'showcase-shape-ring-node',
          style: { size: 80, fill: '#5B8FF9', stroke: '#9DB8FF', lineWidth: 2 },
          state: {
            selected: { fill: '#F6BD16', stroke: '#ffffff', lineWidth: 5 },
            active: { fill: '#E86452', lineWidth: 4 },
            highlight: { fill: '#61DDAA', stroke: '#ffffff', lineWidth: 3 },
          },
        },
      }),
    );
    await graph.render();

    const setState = async (s: (typeof STATES)[number]): Promise<void> => {
      await graph.setElementState({ a: s === 'none' ? [] : [s], b: s === 'none' ? [] : [s] });
    };
    if (stage.bar) select(stage.bar, 'state on both nodes', STATES, 'none', (v) => void setState(v));
    else stage.every(1200, (i) => setState(STATES[i % STATES.length]!));
  });

export default mount;
